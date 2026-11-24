# =============================================================================
# KAILASA MARI M - LOCAL DEVELOPMENT SERVER
# Robust static HTTP server powered by PowerShell & System.Net.HttpListener
# =============================================================================

param (
    [int]$Port = 8080
)

$baseDir = $PSScriptRoot
if (-not $baseDir) {
    $baseDir = (Get-Location).Path
}

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
} catch {
    Write-Host "[!] Could not bind to port $Port. Trying port 8081..." -ForegroundColor Yellow
    $Port = 8081
    $prefix = "http://localhost:$Port/"
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add($prefix)
    $listener.Start()
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  KAILASA MARI M - PORTFOLIO LOCAL SERVER RUNNING" -ForegroundColor Green
Write-Host "  URL: $prefix" -ForegroundColor White
Write-Host "  Serving from: $baseDir" -ForegroundColor Gray
Write-Host "  Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".docx" = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ".pdf"  = "application/pdf"
    ".txt"  = "text/plain; charset=utf-8"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()

        # Handle each connection safely inside try/catch so exceptions don't terminate server
        try {
            $request = $context.Request
            $response = $context.Response

            $rawPath = $request.Url.LocalPath.TrimStart('/')
            if ([string]::IsNullOrWhiteSpace($rawPath)) {
                $rawPath = "index.html"
            }

            # Normalize relative path and prevent directory traversal
            $filePath = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($baseDir, $rawPath))

            if (-not $filePath.StartsWith($baseDir, [System.StringComparison]::OrdinalIgnoreCase)) {
                $response.StatusCode = 403
                $response.Close()
                continue
            }

            $isHead = ($request.HttpMethod -eq "HEAD")

            if (Test-Path $filePath -PathType Leaf) {
                $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                $contentType = "application/octet-stream"
                if ($mimeTypes.ContainsKey($ext)) {
                    $contentType = $mimeTypes[$ext]
                }

                $response.ContentType = $contentType
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                $response.ContentLength64 = $bytes.Length

                # For docx and pdf, add Content-Disposition header
                if ($ext -eq ".docx" -or $ext -eq ".pdf") {
                    $fileName = [System.IO.Path]::GetFileName($filePath)
                    $response.AddHeader("Content-Disposition", "attachment; filename=`"$fileName`"")
                }

                $response.StatusCode = 200

                # Only write body if not a HEAD request
                if (-not $isHead) {
                    $response.OutputStream.Write($bytes, 0, $bytes.Length)
                }

                Write-Host "[$([DateTime]::Now.ToString('HH:mm:ss'))] 200 OK: $rawPath ($contentType)" -ForegroundColor Green
            } else {
                $response.StatusCode = 404
                $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $rawPath")
                $response.ContentType = "text/plain; charset=utf-8"
                $response.ContentLength64 = $msg.Length

                # Only write body if not a HEAD request
                if (-not $isHead) {
                    $response.OutputStream.Write($msg, 0, $msg.Length)
                }

                Write-Host "[$([DateTime]::Now.ToString('HH:mm:ss'))] 404 Not Found: $rawPath" -ForegroundColor Red
            }

            $response.Close()
        } catch {
            Write-Host "[$([DateTime]::Now.ToString('HH:mm:ss'))] Request error: $_" -ForegroundColor Yellow
            try { $context.Response.Close() } catch {}
        }
    }
} finally {
    $listener.Stop()
    $listener.Close()
    Write-Host "`nServer stopped." -ForegroundColor Yellow
}
