// =============================================================================
// PORTFOLIO CONFIGURATION & DATA SOURCE
// =============================================================================
// All content is directly synchronized with Kailasa Mari M's Resume.
// Update profile URLs, resume file paths, or project links in this file anytime.

const PORTFOLIO_DATA = {
  personal: {
    name: "KAILASA MARI M",
    role: "Electronics & Communication Engineering Student | Full Stack & AI Developer",
    tagline: "Building scalable microservices, intelligent AI solutions, and robust web applications.",
    email: "kailasamari@gmail.com",
    phone: "+91 63698 11217",
    location: "Thoothukudi, Tamil Nadu, India",
    // Resume file configuration:
    // Place your 'My_Resume.docx' or 'My_Resume.pdf' into the 'public' folder.
    resumeFile: "public/My_Resume.docx",
    resumeDownloadName: "Kailasa_Mari_Resume.docx"
  },

  socialLinks: {
    linkedin: {
      url: "https://www.linkedin.com/in/kailasamari",
      label: "LinkedIn",
      ariaLabel: "View Kailasa Mari's LinkedIn Profile"
    },
    github: {
      url: "https://github.com/Kailash18-Tech",
      label: "GitHub",
      ariaLabel: "View Kailasa Mari's GitHub Profile"
    },
    leetcode: {
      url: "https://leetcode.com/u/kailash_Tech/",
      label: "LeetCode",
      ariaLabel: "View Kailasa Mari's LeetCode Profile"
    },
    email: {
      url: "mailto:kailasamari@gmail.com",
      label: "Email",
      ariaLabel: "Send an email to kailasamari@gmail.com"
    }
  },

  education: [
    {
      degree: "B.E, Electronics and Communication Engineering",
      institution: "Karpagam College of Engineering, Coimbatore, India",
      period: "Expected Apr 2028",
      score: "CGPA: 8.4 / 10.00",
      type: "undergraduate",
      coursework: [
        "Data Structures",
        "Algorithms",
        "Database Management Systems",
        "OOPS"
      ]
    },
    {
      degree: "HSC (Higher Secondary Certificate)",
      institution: "St.Xavier’s Hr.Sec.School, Palayamkottai, Tirunelveli, India",
      period: "Apr 2024",
      score: null,
      type: "school"
    },
    {
      degree: "SSLC (Secondary School Leaving Certificate)",
      institution: "St.Xavier’s Hr.Sec.School, Palayamkottai, Tirunelveli, India",
      period: "Apr 2022",
      score: null,
      type: "school"
    }
  ],

  skills: {
    "Programming Languages": ["Java", "C++"],
    "Web Technologies": ["React.js", "JavaScript", "HTML", "CSS"],
    "Frameworks & Architecture": ["Spring Boot", "Microservices", "REST APIs"],
    "Databases": ["Oracle", "MongoDB"],
    "Developer Tools": ["Git", "GitHub", "Postman"],
    "AI / Machine Learning": ["Python", "TensorFlow", "FastAPI"]
  },

  projects: [
    {
      id: "cropcare-ai",
      title: "CropCare AI – AI-Powered Agricultural Platform",
      status: "Featured Project",
      technologies: [
        "React.js",
        "Java 21",
        "Spring Boot",
        "Microservices",
        "Oracle",
        "MongoDB",
        "Python",
        "TensorFlow",
        "FastAPI"
      ],
      highlights: [
        "Developed a microservices-based agricultural platform using Spring Boot, Eureka Service Discovery, and API Gateway with JWT authentication and role-based access control.",
        "Built a React.js frontend with crop disease detection, soil recommendations, mandi prices, weather updates, and government schemes.",
        "Integrated an EfficientNetB0 deep learning model using TensorFlow and FastAPI, achieving 94.62% test accuracy for crop disease detection."
      ],
      // Links remain null until verified URL is supplied by user
      githubUrl: null, 
      liveUrl: null,
      githubPlaceholderText: "Repository URL pending user input",
      livePlaceholderText: "Deployment link pending user input"
    },
    {
      id: "project-placeholder",
      isPlaceholder: true,
      title: "[Second Project – Ready for Your Details]",
      status: "Editable Placeholder",
      technologies: [
        "[Add Technology 1]",
        "[Add Technology 2]",
        "[Add Technology 3]"
      ],
      highlights: [
        "[Add primary feature, architecture, or system design detail here]",
        "[Add frontend/backend capabilities, APIs, or database implementation]",
        "[Add performance results, user impact, or test coverage metric]"
      ],
      githubUrl: null,
      liveUrl: null,
      githubPlaceholderText: "Repository URL pending",
      livePlaceholderText: "Live Demo URL pending"
    }
  ],

  achievements: [
    {
      title: "Data Structures & Algorithms",
      badge: "Competitive Programming",
      details: "Solved 200+ problems across LeetCode.",
      metric: "LeetCode Contest Rating: 1473"
    },
    {
      title: "Google AI Essentials",
      badge: "Certification",
      details: "Comprehensive certification covering AI tool usage, productivity workflows, and responsible AI practices."
    },
    {
      title: "Google Prompting Essentials",
      badge: "Certification",
      details: "Comprehensive certification covering prompt design, data analysis, and advanced prompting techniques for complex tasks."
    }
  ]
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = PORTFOLIO_DATA;
}
