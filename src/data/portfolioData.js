export const portfolioData = {
  hero: {
    name: "Ram Chandra Gupta",
    role: "Applied AI/ML Engineer",
    eyebrow: "LLM EVALUATION · RAG · APPLIED AI",
    headline: ["Building Intelligent", "Systems"],
    valueProposition:
      "I build and evaluate LLM systems, retrieval pipelines, and ML applications—combining Python, practical backend engineering, and measurable evaluation.",
    ctas: [
      { href: "#projects", label: "View Projects", variant: "glow" },
      { href: "/documents/ram-chandra-gupta-resume.pdf", label: "Download Resume", variant: "ghost", external: true },
      { href: "#contact", label: "Contact", variant: "ghost" }
    ],
    codeTitle: "AboutMe.ts",
    codeSnippet: [
      "const engineer = {",
      "  name: 'Ram Chandra Gupta',",
      "  focus: 'LLM Evaluation & RAG',",
      "  stack: ['Python', 'LangChain', 'Spring Boot'],",
      "  shipping: true,",
      "  motto: 'Ground answers. Measure outcomes.'",
      "};",
      "engineer.showcase();"
    ],
    highlights: [
      { value: "10k+", label: "Nepali Documents" },
      { value: "11k+", label: "RAG Text Chunks" },
      { value: "2", label: "AI/ML Internships" }
    ],
    focus: {
      label: "Current Focus",
      status: "Open to AI/ML roles",
      items: [
        { title: "LLM Evaluation", detail: "Reliability · Factuality · Consistency" },
        { title: "Grounded RAG", detail: "Retrieval · Context · Grounding" },
        { title: "Applied ML", detail: "Vision · Agents · Backend APIs" }
      ]
    }
  },
  about: {
    label: "Profile",
    title: "From Models to Measurable Systems",
    summary: [
      "I am Ram Chandra Gupta, a Computer Science undergraduate at Lovely Professional University (2023–2027), focused on applied AI, LLM evaluation, and machine learning engineering.",
      "At AirDawg Labs, I evaluated reasoning, instruction following, coding ability, and response consistency across AI models. At SkillCraft Technology, I built and evaluated computer vision and classical ML workflows.",
      "I enjoy grounding AI behavior in evidence: structured model evaluation, retrieval quality, clear error analysis, and software that makes ML useful in practice."
    ],
    metrics: [
      { value: "LLM", label: "Evaluation and quality assurance" },
      { value: "RAG", label: "Grounded retrieval systems" },
      { value: "ML", label: "Measurable model performance" }
    ]
  },
  experience: [
    {
      period: "Aug 2026",
      role: "AI Systems Evaluation Intern",
      company: "AirDawg Labs",
      bullets: [
        "Evaluated LLM outputs through structured testing, prompt engineering, and response-quality assessment for reliability, safety, and factual accuracy.",
        "Created evaluation prompts and benchmark scenarios covering reasoning, instruction following, coding ability, and response consistency across AI models.",
        "Documented evaluation findings, validated AI-generated training data, and collaborated with the AI operations team on production-scale AI data pipelines."
      ]
    },
    {
      period: "July 2025",
      role: "ML and Computer Vision Intern",
      company: "SkillCraft Technology",
      href: "https://github.com/Chandra142/SkillCraft_Internship",
      proofHref: "/documents/skillcraft-ml-certificate.pdf",
      bullets: [
        "Built Linear Regression (R² = 0.87), K-Means clustering, and SVM image classification workflows, with 92% classification accuracy and 95% hand-gesture recognition accuracy.",
        "Developed end-to-end pipelines with Python, Scikit-learn, OpenCV, Pandas, NumPy, and Matplotlib for preprocessing, training, evaluation, and visualization.",
        "Analyzed real-world datasets and model errors to improve performance, reliability, and analytical problem-solving."
      ]
    }
  ],
  skills: {
    groups: [
      {
        title: "AI & Machine Learning",
        items: ["Python", "LangChain", "RAG", "FAISS", "Hugging Face Transformers", "Scikit-learn", "OpenCV", "LLM Evaluation", "Prompt Engineering", "ReAct Agents"]
      },
      {
        title: "Backend & Application Development",
        items: ["Java", "Spring Boot", "REST APIs", "Microservices", "Spring Data JPA", "Hibernate", "Maven", "JDBC", "React"]
      },
      {
        title: "Cloud, Data & DevOps",
        items: ["AWS", "Docker", "GitHub Actions", "PostgreSQL", "MySQL", "Git", "GitHub", "Linux", "Postman"]
      },
      {
        title: "Computer Science Foundations",
        items: ["C++", "C", "Data Structures & Algorithms", "DBMS", "Operating Systems", "Computer Networks", "Object-Oriented Programming"]
      }
    ],
    marquee: ["Python", "LLM Evaluation", "RAG", "LangChain", "FAISS", "ReAct Agents", "Hugging Face", "Scikit-learn", "OpenCV", "Spring Boot", "Docker", "AWS"]
  },
  researchFocus: [
    {
      title: "Reliable LLM Systems",
      summary: "Structured evaluation of reasoning, instruction following, coding ability, consistency, and factual quality."
    },
    {
      title: "Grounded Retrieval & Agents",
      summary: "RAG pipelines, semantic search, tool execution, escalation decisions, and auditable agent workflows."
    },
    {
      title: "Applied ML Engineering",
      summary: "Computer vision and full-stack software developed with clear evaluation criteria and practical users in mind."
    }
  ],
  projects: [
    {
      title: "NepaGen — Nepali RAG System",
      period: "May 2026",
      description: "A Nepali question-answering system using LangChain, FAISS, Groq Llama-3.1, and Hugging Face Transformers to ground responses in a low-resource-language knowledge base.",
      stack: ["Python", "LangChain", "FAISS", "Hugging Face", "Groq", "React"],
      impact: "10,000+ documents · 11,000+ semantic chunks · MMR retrieval",
      href: "https://github.com/Chandra142/NepaGen-AI"
    },
    {
      title: "Oil Spill Detection",
      period: "Feb 2026",
      description: "A maritime anomaly-detection pipeline combining satellite imagery and AIS data with feature engineering, image preprocessing, SVM, and Random Forest models.",
      stack: ["Python", "Scikit-learn", "OpenCV", "Pandas", "Google Earth Engine"],
      impact: "91% precision · 88% recall on the evaluated dataset",
      href: "https://github.com/Chandra142/Oil-Spill-Detection",
      liveHref: "https://oil-spill-detection-nine.vercel.app/"
    },
    {
      title: "Autonomous Customer Support Agent",
      period: "Jun 2025",
      description: "A ReAct-style support agent that classifies tickets, retrieves order and knowledge-base context, executes tools, retries transient failures, and escalates low-confidence cases.",
      stack: ["Python", "ReAct", "Tool Calling", "Concurrency", "Audit Logging"],
      impact: "70% autonomous resolution: 14/20 tickets resolved, 6 safely escalated",
      href: "https://github.com/Chandra142/hackathon2026-Ram-Chandra-Gupta"
    },
    {
      title: "Ride Booking Microservices",
      period: "Jul 2026",
      description: "A Java Spring Boot backend spanning authentication, users, drivers, rides, payments, and notifications, with API Gateway routing and Eureka service discovery.",
      stack: ["Java", "Spring Boot", "Spring Cloud", "Redis", "PostgreSQL", "JWT"],
      impact: "Redis Geospatial driver discovery · JWT/RBAC · Flyway migrations · backend testing",
      href: "https://github.com/Chandra142/ride-booking"
    }
  ],
  achievements: [
    {
      period: "2025–2026",
      title: "Applied AI Hackathons",
      organization: "LPU Model Expo · KSOLVES Agentic AI",
      href: "https://drive.google.com/drive/folders/1-S5hukLtANi_jHrXHFLWrISIwMcp9Td7?usp=sharing",
      bullets: [
        "Participated in the Model Expo Machine Learning Hackathon at Lovely Professional University in January 2026.",
        "Completed the Agentic AI Hackathon organized by KSOLVES in October 2025."
      ]
    },
    {
      period: "Competitive Programming",
      title: "Algorithmic Problem Solving",
      organization: "CodeChef · Codeforces · LeetCode",
      href: "https://leetcode.com/u/Chandra142/",
      linkLabel: "LeetCode profile",
      bullets: [
        "Reached a 1600+ CodeChef rating and a 1400+ Codeforces rating through consistent practice and contests.",
        "Strengthened the data structures and algorithms foundations used in backend and ML engineering."
      ]
    },
    {
      period: "Ongoing",
      title: "Open Source Contributor",
      organization: "GitHub and Community Projects",
      href: "https://github.com/Chandra142",
      linkLabel: "GitHub profile",
      bullets: [
        "Contributed fixes and improvements to external projects, with multiple merged pull requests.",
        "Built experience reading unfamiliar codebases, collaborating through reviews, and shipping focused changes."
      ]
    }
  ],
  certifications: [
    {
      title: "Machine Learning Specialization",
      issuer: "Coursera · Stanford Online · DeepLearning.AI",
      period: "May 2026",
      href: "https://drive.google.com/drive/folders/1MCi7XBRGcpyRxcaneEVFgIikXJSZvYP8?usp=sharing"
    },
    {
      title: "Oracle AI Foundation & DBMS",
      issuer: "Oracle",
      period: "May 2025"
    },
    {
      title: "Cloud Computing",
      issuer: "NPTEL",
      period: "Mar 2025",
      href: "/documents/cloud-computing-certificate.pdf"
    },
    {
      title: "DSA Summer Bootcamp",
      issuer: "Lovely Professional University",
      period: "Jul 2025",
      href: "/assets/dsa-certificate.png"
    },
    {
      title: "Agentic AI Hackathon",
      issuer: "KSOLVES",
      period: "Oct 2025",
      href: "https://drive.google.com/file/d/1_4KJ1AbAvEOsZXNT48jp_6Fvsf8YPlcE/view"
    }
  ],
  education: [
    {
      period: "2023–2027",
      degree: "B.Tech in Computer Science and Engineering",
      institution: "Lovely Professional University",
      location: "Phagwara, Punjab"
    },
    {
      period: "2021–2022",
      degree: "Intermediate",
      institution: "Siddharth Public School",
      location: "Siddharth Nagar, Uttar Pradesh"
    },
    {
      degree: "High School",
      institution: "St. Thomas English School"
    }
  ],
  contact: {
    title: "Let's Build Reliable AI",
    summary: "Open to applied AI/ML roles, LLM evaluation opportunities, internships, and collaborations on practical intelligent systems.",
    email: "ramcgupta.ml@gmail.com",
    phone: "+91 89281 50149",
    location: "Siddharth Nagar, Uttar Pradesh",
    links: [
      { label: "GitHub", href: "https://github.com/Chandra142" },
      { label: "LinkedIn", href: "https://linkedin.com/in/chandra142/" },
      { label: "LeetCode", href: "https://leetcode.com/u/Chandra142/" },
      { label: "Kaggle", href: "https://www.kaggle.com/ramchandra142/" }
    ]
  }
};
