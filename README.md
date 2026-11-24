# Kailasa Mari M - Professional Developer Portfolio

A modern, fast, responsive portfolio website for **KAILASA MARI M** (Electronics & Communication Engineering Student, Full Stack & AI Developer).

---

## 📁 Project Structure

```
D:\MyPortfolio\
├── index.html               # Main semantic HTML5 portfolio page
├── server.ps1               # Built-in PowerShell local web server (no npm/node required)
├── README.md                # Project documentation & configuration guide
├── css\
│   └── style.css            # Responsive dark/light theme styles, typography & grid
├── js\
│   ├── portfolio-data.js    # Single source of truth for resume details, links & projects
│   └── main.js              # Theme switcher, smooth scroll, mobile menu & resume download
└── public\
    ├── README.txt           # Instructions for placing your resume file
    └── My_Resume.docx       # Place your OneDrive resume file here!
```

---

## 📄 Adding Your Resume File

1. Open your OneDrive: `Kailasa Mari – Personal`
2. Download `My_Resume.docx` (or `My_Resume.pdf`)
3. Place a copy in:
   ```
   D:\MyPortfolio\public\My_Resume.docx
   ```
4. Both the **Hero Section** ("Download Resume") and **Navigation / Contact** links are pre-wired to serve and download this exact file.

> **Tip:** If your file is named `My_Resume.pdf` instead, simply open `js/portfolio-data.js` and set:
> ```js
> resumeFile: "public/My_Resume.pdf",
> resumeDownloadName: "Kailasa_Mari_Resume.pdf"
> ```

---

## 🚀 Running the Website Locally

You can run the portfolio locally in two ways:

### Option 1: Using the PowerShell Web Server (Recommended)
Open PowerShell in `D:\MyPortfolio` and run:
```powershell
.\server.ps1
```
Then visit:
```
http://localhost:8080/
```

### Option 2: Direct Browser Launch
Simply double click `index.html` or run:
```powershell
Start-Process "D:\MyPortfolio\index.html"
```

---

## 🔗 Verified Profiles & Links

| Platform | Configured URL | Status |
| :--- | :--- | :--- |
| **LinkedIn** | `https://www.linkedin.com/in/kailasamari` | Active & Verified |
| **GitHub** | `https://github.com/Kailash18-Tech` | Active & Verified |
| **LeetCode** | `https://leetcode.com/u/kailash_Tech/` | Active & Verified |
| **Email** | `mailto:kailasamari@gmail.com` | Active & Verified |

All URLs can be viewed and edited anytime inside `js/portfolio-data.js`.

---

## 🛠️ Updating Projects & Adding Details

- **CropCare AI**: Project highlights match your resume. Repository and Live Demo links are displayed with clear placeholder notes and will be activated once you provide your preferred URLs in `js/portfolio-data.js`.
- **Project 2**: An editable placeholder card is ready in `js/portfolio-data.js` under `projects[1]`. Simply replace the placeholder fields with your title, technologies, and bullet points.
