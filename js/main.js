// =============================================================================
// KAILASA MARI M - PORTFOLIO MAIN APPLICATION LOGIC
// =============================================================================

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderPortfolio();
  initNavigation();
  initResumeHandlers();
  initContactForm();
  logSystemStatus();
});

// -----------------------------------------------------------------------------
// 1. THEME SWITCHER (Dark / Light with LocalStorage)
// -----------------------------------------------------------------------------
function initTheme() {
  const toggleBtn = document.getElementById("themeToggleBtn");
  const storedTheme = localStorage.getItem("theme");
  
  if (storedTheme) {
    document.documentElement.setAttribute("data-theme", storedTheme);
  } else {
    // Default to dark theme
    document.documentElement.setAttribute("data-theme", "dark");
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      updateThemeIcon(next);
    });
    updateThemeIcon(document.documentElement.getAttribute("data-theme"));
  }
}

function updateThemeIcon(theme) {
  const sunIcon = document.getElementById("sunIcon");
  const moonIcon = document.getElementById("moonIcon");
  if (sunIcon && moonIcon) {
    if (theme === "light") {
      sunIcon.style.display = "none";
      moonIcon.style.display = "block";
    } else {
      sunIcon.style.display = "block";
      moonIcon.style.display = "none";
    }
  }
}

// -----------------------------------------------------------------------------
// 2. POPULATE & SYNC PORTFOLIO DATA
// -----------------------------------------------------------------------------
function renderPortfolio() {
  if (typeof PORTFOLIO_DATA === "undefined") {
    console.error("PORTFOLIO_DATA not found. Ensure portfolio-data.js is loaded first.");
    return;
  }

  const { personal, socialLinks, education, skills, projects, achievements } = PORTFOLIO_DATA;

  // Personal & Hero details
  const nameEls = document.querySelectorAll(".hero-name-target");
  nameEls.forEach(el => el.textContent = personal.name);

  const roleEls = document.querySelectorAll(".hero-role-target");
  roleEls.forEach(el => el.textContent = personal.role);

  const locationEls = document.querySelectorAll(".hero-location-target");
  locationEls.forEach(el => el.textContent = personal.location);

  const emailLinks = document.querySelectorAll(".email-link-target");
  emailLinks.forEach(el => {
    el.href = `mailto:${personal.email}`;
    el.textContent = personal.email;
  });

  const phoneEls = document.querySelectorAll(".phone-target");
  phoneEls.forEach(el => {
    el.href = `tel:${personal.phone.replace(/\s+/g, '')}`;
    el.textContent = personal.phone;
  });

  // Render Social / Developer Profile Links
  renderSocialLinks(socialLinks);

  // Render Education
  renderEducation(education);

  // Render Skills
  renderSkills(skills);

  // Render Projects
  renderProjects(projects);

  // Render Achievements
  renderAchievements(achievements);
}

// Render Social Links
function renderSocialLinks(links) {
  const container = document.getElementById("socialLinksContainer");
  if (!container) return;

  const icons = {
    linkedin: `<svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`,
    github: `<svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
    leetcode: `<svg viewBox="0 0 24 24"><path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863 0-.714.235-1.397.702-1.864l4.332-4.364c.467-.467 1.112-.662 1.824-.662s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.697-2.607c-.971-.97-2.261-1.47-3.762-1.47-1.5 0-2.79.5-3.762 1.47l-4.332 4.364c-.971.97-1.47 2.28-1.47 3.795s.5 2.825 1.47 3.795l4.332 4.364c.971.97 2.261 1.47 3.762 1.47 1.5 0 2.79-.5 3.762-1.47l2.697-2.607c.514-.514.496-1.365-.039-1.901-.535-.535-1.386-.553-1.9.038zM10.822 13.5h9.756c.745 0 1.35-.605 1.35-1.35s-.605-1.35-1.35-1.35h-9.756c-.745 0-1.35.605-1.35 1.35s.605 1.35 1.35 1.35z"/></svg>`,
    email: `<svg viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l9.515 7.709 9.515-7.711v11.819h-19.03z"/></svg>`
  };

  container.innerHTML = Object.entries(links).map(([key, data]) => {
    const isMail = key === "email";
    const targetAttr = isMail ? "" : 'target="_blank" rel="noopener noreferrer"';
    return `
      <a href="${data.url}" 
         class="social-icon-link" 
         data-platform="${key}" 
         aria-label="${data.ariaLabel}" 
         title="${data.label}: ${data.url}"
         ${targetAttr}>
        ${icons[key] || ""}
      </a>
    `;
  }).join("");
}

// Render Education
function renderEducation(eduList) {
  const container = document.getElementById("educationContainer");
  if (!container) return;

  container.innerHTML = eduList.map((item, index) => {
    const isFeatured = item.type === "undergraduate";
    return `
      <div class="edu-card ${isFeatured ? 'featured' : ''}">
        <div class="edu-card-top">
          <h3 class="edu-degree">${item.degree}</h3>
          <span class="edu-badge">${item.period}</span>
        </div>
        <p class="edu-school">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          ${item.institution}
        </p>
        ${item.score ? `<div class="edu-cgpa">${item.score}</div>` : ''}
        ${item.coursework ? `
          <div class="edu-coursework">
            <h4 class="coursework-title">Relevant Coursework</h4>
            <div class="tags-list">
              ${item.coursework.map(c => `<span class="tag-chip">${c}</span>`).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }).join("");
}

// Render Skills
function renderSkills(skillsObj) {
  const container = document.getElementById("skillsContainer");
  if (!container) return;

  const categoryIcons = {
    "Programming Languages": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
    "Web Technologies": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
    "Frameworks & Architecture": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`,
    "Databases": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`,
    "Developer Tools": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,
    "AI / Machine Learning": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>`
  };

  container.innerHTML = Object.entries(skillsObj).map(([cat, list]) => `
    <div class="skill-category-card">
      <div class="skill-cat-header">
        <div class="skill-cat-icon">
          ${categoryIcons[cat] || `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`}
        </div>
        <h3 class="skill-cat-title">${cat}</h3>
      </div>
      <div class="skills-pills">
        ${list.map(skill => `<span class="skill-pill">${skill}</span>`).join('')}
      </div>
    </div>
  `).join("");
}

// Render Projects
function renderProjects(projectsList) {
  const container = document.getElementById("projectsContainer");
  if (!container) return;

  container.innerHTML = projectsList.map(proj => {
    const isPlaceholder = proj.isPlaceholder;

    // Action button render based on strict accuracy requirements:
    // Only show live link if verified URL exists. Otherwise show clearly labeled editable placeholder.
    const repoBtn = proj.githubUrl 
      ? `<a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
           <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
           GitHub Repo
         </a>`
      : `<button class="btn btn-outline btn-sm btn-disabled" title="No public repository URL provided yet">
           <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
           Repo: ${proj.githubPlaceholderText}
         </button>`;

    const demoBtn = proj.liveUrl
      ? `<a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
           Live Demo
         </a>`
      : `<button class="btn btn-secondary btn-sm btn-disabled" title="No deployment URL provided yet">
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
           Demo: ${proj.livePlaceholderText}
         </button>`;

    return `
      <div class="project-card ${isPlaceholder ? 'placeholder-card' : 'featured-project'}">
        <div>
          <div class="project-top-meta">
            <span class="project-badge ${isPlaceholder ? 'placeholder-badge' : 'active-badge'}">
              ${proj.status}
            </span>
          </div>
          <h3 class="project-title">${proj.title}</h3>
          <ul class="project-highlights">
            ${proj.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
        </div>
        
        <div>
          <div class="project-tech-stack">
            ${proj.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
          <div class="project-actions">
            ${repoBtn}
            ${demoBtn}
          </div>
          ${!proj.githubUrl && !proj.liveUrl ? `
            <div class="action-status-note">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>URLs can be added to <code>portfolio-data.js</code> anytime</span>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }).join("");
}

// Render Achievements & Certifications
function renderAchievements(achievementsList) {
  const container = document.getElementById("achievementsContainer");
  if (!container) return;

  container.innerHTML = achievementsList.map(item => `
    <div class="achieve-card">
      <div>
        <div class="achieve-icon-wrapper">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
        </div>
        <span class="achieve-badge">${item.badge}</span>
        <h3 class="achieve-title">${item.title}</h3>
        <p class="achieve-desc">${item.details}</p>
      </div>
      ${item.metric ? `
        <div class="achieve-metric">
          <span>Official Metric</span>
          <strong>${item.metric}</strong>
        </div>
      ` : ''}
    </div>
  `).join("");
}

// -----------------------------------------------------------------------------
// 3. NAVIGATION & MOBILE MENU
// -----------------------------------------------------------------------------
function initNavigation() {
  const mobileToggle = document.getElementById("mobileNavToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-link");
  const header = document.querySelector(".site-header");

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      mobileToggle.setAttribute("aria-expanded", isOpen);
    });

    // Close mobile menu when a nav link is clicked
    navItems.forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        mobileToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Header scroll shadow effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Active section indicator on scroll
  const sections = document.querySelectorAll("section[id]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navItems.forEach(item => {
          if (item.getAttribute("href") === `#${id}`) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(sec => observer.observe(sec));
}

// -----------------------------------------------------------------------------
// 4. RESUME DOWNLOAD HANDLER & TOAST NOTIFICATION
// -----------------------------------------------------------------------------
function initResumeHandlers() {
  const resumeButtons = document.querySelectorAll(".resume-download-trigger");

  resumeButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      handleResumeDownload();
    });
  });
}

function handleResumeDownload() {
  const filePath = PORTFOLIO_DATA.personal.resumeFile;
  const fileName = PORTFOLIO_DATA.personal.resumeDownloadName;

  // Test fetch the file to confirm whether user has placed it in public/
  fetch(filePath, { method: "HEAD" })
    .then(response => {
      if (response.ok) {
        // File exists on server: initiate native download
        const downloadLink = document.createElement("a");
        downloadLink.href = filePath;
        downloadLink.download = fileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        showToast(
          "Download Started",
          `Downloading Kailasa Mari M's Resume (${fileName}).`,
          "success"
        );
      } else {
        // File is pending copy from OneDrive
        showToast(
          "Resume Setup Reminder",
          `Please place <strong>My_Resume.docx</strong> from OneDrive into <code>D:\\MyPortfolio\\public\\</code>. Once placed, clicks will immediately download it.`,
          "warning"
        );
      }
    })
    .catch(() => {
      // In local file protocol or fallback, attempt download anyway
      const downloadLink = document.createElement("a");
      downloadLink.href = filePath;
      downloadLink.download = fileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      showToast(
        "Downloading Resume",
        `Requested <strong>${fileName}</strong>. Ensure the file is placed in the <code>public/</code> folder.`,
        "info"
      );
    });
}

function showToast(title, message, type = "info") {
  let toast = document.getElementById("portfolioToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "portfolioToast";
    toast.className = "toast-notice";
    document.body.appendChild(toast);
  }

  const icons = {
    success: `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
    warning: `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
    info: `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
  };

  toast.innerHTML = `
    ${icons[type] || icons.info}
    <div class="toast-content">
      <h4>${title}</h4>
      <p>${message}</p>
    </div>
    <button class="toast-close" aria-label="Close notification">&times;</button>
  `;

  toast.classList.add("show");

  const closeBtn = toast.querySelector(".toast-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      toast.classList.remove("show");
    });
  }

  setTimeout(() => {
    toast.classList.remove("show");
  }, 6000);
}

// -----------------------------------------------------------------------------
// 5. CONTACT FORM & INTERACTIVE ACTIONS
// -----------------------------------------------------------------------------
function initContactForm() {
  const form = document.getElementById("contactForm");
  const copyBtn = document.getElementById("copyEmailBtn");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("formName").value;
      const email = document.getElementById("formEmail").value;
      const message = document.getElementById("formMessage").value;

      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Hi Kailasa Mari,\n\n${message}\n\nFrom:\n${name} (${email})`);
      const mailtoUrl = `mailto:${PORTFOLIO_DATA.personal.email}?subject=${subject}&body=${body}`;

      window.location.href = mailtoUrl;

      showToast(
        "Mail Client Opened",
        "Your message was prepared in your default email application.",
        "success"
      );
      form.reset();
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email).then(() => {
        showToast(
          "Email Copied!",
          `${PORTFOLIO_DATA.personal.email} copied to clipboard.`,
          "success"
        );
      }).catch(() => {
        showToast(
          "Copy Notice",
          `Please email directly at ${PORTFOLIO_DATA.personal.email}`,
          "info"
        );
      });
    });
  }
}

// -----------------------------------------------------------------------------
// 6. SYSTEM STATUS & LINK VERIFICATION LOG
// -----------------------------------------------------------------------------
function logSystemStatus() {
  console.group("🚀 Portfolio Configuration Status");
  console.log("Candidate Name:", PORTFOLIO_DATA.personal.name);
  console.log("Email:", PORTFOLIO_DATA.personal.email);
  console.log("Social Links:", PORTFOLIO_DATA.socialLinks);
  console.log("Resume File Config:", PORTFOLIO_DATA.personal.resumeFile);
  console.log("CropCare AI:", PORTFOLIO_DATA.projects[0]);
  console.log("Project 2 Status:", PORTFOLIO_DATA.projects[1].status);
  console.groupEnd();
}
