export interface Service {
  number: string;
  title: string;
  /** Plain-language explanation for anyone, shown first. `description` carries the technical detail. */
  summary: string;
  description: string;
  technologies: string[];
  capabilities: string[];
}

export const services: Service[] = [
  {
    number: "01",
    title: "CUSTOM SOFTWARE",
    summary: "Tools built around the way your business actually works, so routine tasks take care of themselves.",
    description: "Business-specific software platforms designed around real workflows, automating processes and driving efficiency.",
    technologies: ["React", "Flask", "Python", "MySQL", "Java"],
    capabilities: [
      "Workflow Automation",
      "Internal Business Platforms",
      "Enterprise Systems",
      "Operational Dashboards"
    ]
  },
  {
    number: "02",
    title: "WEB APPLICATIONS",
    summary: "Websites and web apps that load quickly and look right on any screen.",
    description: "Modern, responsive, high-performance web applications built using advanced frontend layouts and scalable API layers.",
    technologies: ["React", "Next.js", "Node.js", "TypeScript"],
    capabilities: [
      "Single Page Apps (SPA)",
      "Server-Side Rendering (SSR)",
      "Custom SaaS Platforms",
      "Core Web Vitals Tuning"
    ]
  },
  {
    number: "03",
    title: "MOBILE APPLICATIONS",
    summary: "Apps for iPhone and Android that feel smooth and polished in your customers' hands.",
    description: "Fluid mobile experiences for iOS and Android, bringing native-grade performance and polished UX to users' hands.",
    technologies: ["React Native", "Flutter", "iOS & Android", "API Gateway"],
    capabilities: [
      "Cross-Platform Native Apps",
      "Biometric & Secure Auth",
      "Offline Sync Engines",
      "Push Notification Architectures"
    ]
  },
  {
    number: "04",
    title: "BACKEND & APIs",
    summary: "The behind-the-scenes engine that stores your data and connects your systems safely.",
    description: "Highly secure, high-throughput backend APIs designed to manage core transaction pipelines and integrate internal systems.",
    technologies: ["Node.js", "Spring Boot", "PostgreSQL", "Redis"],
    capabilities: [
      "RESTful & GraphQL APIs",
      "Double-Entry Ledgers",
      "Third-Party Integrations",
      "High Concurrency Caching"
    ]
  },
  {
    number: "05",
    title: "CLOUD & DEVOPS",
    summary: "Reliable online hosting and automatic updates, so what we build stays online as you grow.",
    description: "Resilient cloud infrastructure setup, serverless execution boundaries, and fully automated deployment workflows.",
    technologies: ["AWS", "Docker", "Terraform", "CI/CD Pipelines"],
    capabilities: [
      "Infrastructure as Code (IaC)",
      "Automated CI/CD Pipelines",
      "VPC & Container Clusters",
      "Automated Log Telemetry"
    ]
  },
  {
    number: "06",
    title: "CYBERSECURITY",
    summary: "Protection built in from the start, keeping accounts, data and systems safe.",
    description: "Security integrations across application code, user identities, API layers, and host container environments.",
    technologies: ["OAuth2 / IAM", "API Security", "Identity Validation", "Secure Coding"],
    capabilities: [
      "Identity & Access Management",
      "Secure System Boundaries",
      "Vulnerability Scans",
      "Penetration Testing Audits"
    ]
  },
  {
    number: "07",
    title: "AI & AUTOMATION",
    summary: "Smart features that read images, spot patterns and understand text, so repetitive work runs automatically.",
    description: "Intelligent features using computer vision, predictive forecasting models, and natural language processing.",
    technologies: ["Python", "OpenCV", "Machine Learning", "Generative AI"],
    capabilities: [
      "Computer Vision Systems",
      "Generative LLM Integrations",
      "Outlier & Anomaly Detection",
      "Predictive Data Pipelines"
    ]
  },
  {
    number: "08",
    title: "TECHNOLOGY CONSULTING",
    summary: "Honest technical advice: reviewing what you have and planning what to build next.",
    description: "Architectural design, system audits, scaling strategies, and technical advisory to align engineering with business goals.",
    technologies: ["Architecture Blueprints", "Auditing Tools", "Strategy", "System Design"],
    capabilities: [
      "System Architecture Audits",
      "Scaling Roadmaps",
      "Technology Stack Auditing",
      "Disaster Recovery Planning"
    ]
  }
];
