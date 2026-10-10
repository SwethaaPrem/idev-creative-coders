export interface Project {
  id: string;
  title: string;
  category: string;
  /** One plain-language sentence for non-technical visitors, shown before the technical `description`. */
  plain: string;
  description: string;
  technologies: string[];
  number: string;
  status: "Completed" | "Ongoing";
  metrics?: { label: string; value: string }[];
  content: {
    overview: string;
    problem: string;
    objective: string;
    solution: string;
    architecture: string;
    features: string[];
    process: string;
    results: string;
  };
}

export const projects: Project[] = [
  {
    id: "ss-agencies",
    number: "01",
    status: "Completed",
    title: "Pain and Hardware Industry Billing Platform",
    category: "Billing Platform / Payments",
    plain: "A billing system that helps a business send invoices and get paid, with every payment recorded automatically.",
    description: "A premium digital invoicing and billing portal designed to automate client billing, invoice settlements, and real-time ledger accounting.",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe API", "Vercel", "Tailwind CSS"],
    metrics: [
      { label: "Transaction Volume", value: "₹12.4Cr+" },
      { label: "API Response", value: "< 150ms" },
      { label: "Security Scale", value: "PCI-DSS L1" }
    ],
    content: {
      overview: "SS Agencies required a unified payments hub to simplify accounting reconciliations and reduce payment validation windows from hours to milliseconds.",
      problem: "Traditional agency client billings require manual verification of bank transfer receipts and wire inputs. This manual process introduces accounting inconsistencies, delays project milestones, and limits transactional transparency.",
      objective: "Develop a cryptographically audited payments web platform with custom invoice settle actions, banking APIs, and a double-entry ledger database.",
      solution: "We built a React portal linked to a secure Node.js ledger API. We integrated Stripe API endpoints with custom webhooks, enabling automated client receipt notifications and instant account settlements.",
      architecture: "A React-based UI hosted on Vercel communicating with an Express server on AWS, leveraging PostgreSQL for raw transaction records and Redis for cached financial statements.",
      features: [
        "Real-time double-entry accounting ledger",
        "Automated invoice mapping and Stripe settle integration",
        "Cross-border settlement handles with multi-currency support",
        "Secure TLS cryptographically signed database logs",
        "Role-based permissions (Auditor, Accountant, Operator)"
      ],
      process: "We conducted detailed ledger compliance mapping, developed strict payment retry handlers, structured relational Postgres schemas for financial integrity, and deployed the frontend to Vercel for low-latency worldwide delivery.",
      results: "The platform successfully automated settlements for over 8,500 active billing transactions, processing over ₹12.4Cr in volume with zero transaction errors."
    }
  },
  {
    id: "fintech-startup",
    number: "02",
    status: "Ongoing",
    title: "Fintech Startup Platform",
    category: "Fintech / Banking API / Core Ledger",
    plain: "A platform for moving money across borders, built so every transaction is recorded accurately and securely.",
    description: "An enterprise fintech platform currently in active development, offering cross-border remittances, core banking API integrations, and audited ledger databases.",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe API", "Vercel", "Tailwind CSS"],
    metrics: [
      { label: "Current Phase", value: "In Beta" },
      { label: "Ledger Speed", value: "< 120ms" },
      { label: "Security Scale", value: "PCI-DSS L1" }
    ],
    content: {
      overview: "An ongoing fintech product engineered to automate payment distributions, facilitate cross-border remittances, and maintain cryptographically signed ledgers for modern financial enterprises.",
      problem: "Traditional cross-border payment pipelines are slow, expensive, and difficult to reconcile. Modern businesses need real-time double-entry ledgers that settle instantly without relying on delayed manual batches.",
      objective: "Create a highly secure, PCI-DSS compliant fintech core engine that supports instant currency exchange, merchant settlement triggers, and high-frequency ledger operations.",
      solution: "We are designing a distributed ledger network using Node.js and PostgreSQL with strict WAL logging. The user interface, built in React and hosted on Vercel, utilizes optimized caching to render live balances instantly.",
      architecture: "React SPA client, Node.js cluster api, double-entry ledgers on PostgreSQL with replication, and Redis cache layer.",
      features: [
        "Real-time double-entry transaction ledgers",
        "Stripe settlement hooks and currency exchange support",
        "Cryptographically signed database records",
        "Comprehensive developer API controls and webhooks"
      ],
      process: "Currently in active development. We have finalized the relational database schema, benchmarked the ledger API throughput, and are currently optimizing the transaction queue handlers.",
      results: "Active beta phase. The system has processed simulation trials with zero ledger variances under high concurrency."
    }
  },
  {
    id: "smart-traffic",
    number: "03",
    status: "Completed",
    title: "Smart Traffic Management System",
    category: "AI / Computer Vision / Web Dashboard",
    plain: "Cameras and software that spot vehicles, predict traffic jams and show city operators what is happening live.",
    description: "An intelligent traffic monitoring platform designed to detect vehicles, analyze traffic conditions, predict congestion, and visualize real-time traffic insights.",
    technologies: ["Python", "OpenCV", "YOLO", "Machine Learning", "Web Dashboard"],
    metrics: [
      { label: "Congestion Reduced", value: "24%" },
      { label: "Detection Accuracy", value: "98.2%" },
      { label: "Response Rate", value: "Real-time" }
    ],
    content: {
      overview: "Urban congestion is a growing global challenge. The Smart Traffic Management System leverages state-of-the-art computer vision to analyze live feed data, dynamically forecast traffic bottlenecks, and provide city operators with real-time insight dashboards to optimize lane usage and signal timing.",
      problem: "Traditional traffic sensing relies on inductive loops or static timers that do not adapt to variable flow. This leads to extended wait times, high carbon emissions, and delayed emergency response services during peak hours.",
      objective: "Build an end-to-end, edge-compatible solution that accurately measures vehicle density, classifies traffic components (cars, buses, bikes), predicts upcoming bottlenecks, and exposes control controls to urban operators through a web panel.",
      solution: "We deployed YOLO-based detector modules optimized to run at high frame rates on edge devices. These feed traffic metrics into a predictive ML model that analyzes temporal patterns. The results are aggregated on a low-latency dashboard powered by React and real-time WebSockets.",
      architecture: "The architecture splits between Edge (Python + OpenCV + YOLOv8 running on NVIDIA Jetson), the cloud backend (FastAPI handling WebSocket aggregation and ML queuing), and the web client (React dashboard displaying traffic flows on interactive vector grids).",
      features: [
        "Real-time vehicle detection and multilane tracking",
        "Vehicle classification (Car, SUV, Bus, Truck, Bicycle)",
        "Dynamic queue length estimation at intersections",
        "Predictive congestion alerts using LSTM models",
        "Interactive analytics and report export options"
      ],
      process: "We started by training custom YOLO weights on urban traffic datasets under varied weather and lighting configurations. Next, we optimized inference using TensorRT. Lastly, we built the React dashboard, implementing canvas overlays to display vehicle bounding boxes directly on active streams.",
      results: "Piloted at three major intersections, the system helped reduce average travel delay times by 24% by allowing adaptive signal adjustments. The detection engine maintains an average 98.2% tracking accuracy even during night and rain conditions."
    }
  },
  {
    id: "receipt-processing",
    number: "04",
    status: "Completed",
    title: "AI-Powered Receipt Processing",
    category: "AI / AWS / Automation",
    plain: "Upload a photo of a receipt and the system reads it and files the details for you.",
    description: "An automated receipt processing system that extracts information from uploaded receipts and organizes structured data using cloud-based AI services.",
    technologies: ["AWS", "Textract", "Lambda", "S3", "DynamoDB", "API Gateway"],
    metrics: [
      { label: "Processing Speed", value: "< 2.5s" },
      { label: "Accuracy Rate", value: "99.1%" },
      { label: "Manual Effort Cut", value: "85%" }
    ],
    content: {
      overview: "Managing expense validation manually is prone to human error and scaling inefficiencies. This system provides a fully serverless API that processes digital receipts, extracts key transaction details (vendor, date, items, tax, total), and transforms raw images into clean, structured accounting database records.",
      problem: "A major retail distributor spent dozens of manual hours weekly typing up printed and digital receipts. Inconsistent layouts, crumpled paper, and low-contrast mobile photographs made optical character recognition (OCR) highly inaccurate.",
      objective: "Develop a highly scalable, serverless ingestion system that converts receipt images into validated JSON structures with high precision, mapping fields to custom internal accounting structures.",
      solution: "We engineered an AWS serverless pipeline. S3 buckets trigger Lambda functions that forward images to AWS Textract's specialized Expense API. The output is processed through a cleaning algorithm to correct formatting mistakes, store structures in DynamoDB, and notify accounting apps.",
      architecture: "Client uploads are securely routed via AWS API Gateway using signed URLs directly to S3. A Lambda worker handles preprocessing, triggers AWS Textract asynchronous jobs, runs post-extraction schema mapping, and updates DynamoDB. CloudWatch monitors execution health.",
      features: [
        "Direct-to-S3 secure uploads using pre-signed URLs",
        "Automatic skew, rotation, and illumination correction",
        "Intelligent extraction of key-value pairs (Total, Tax, Merchant)",
        "Itemized table extraction for detail-level matching",
        "Automatic flagging of duplicate receipts or suspicious edits"
      ],
      process: "We designed a micro-frontend upload component and mapped it to a serverless AWS backend. We tuned Lambda memory allocations to minimize cold starts. We added a custom NLP validation layer to match merchant names against clean database records.",
      results: "The client transitioned from manual spreadsheet entry to an automated workflow, processing invoices in less than 2.5 seconds. Expense verification efficiency increased by 85% while reducing structural invoice errors to near-zero."
    }
  },
  {
    id: "internal-developer-platform",
    number: "05",
    status: "Completed",
    title: "Internal Developer Platform",
    category: "Software / Developer Tools",
    plain: "A one-stop tool that lets software teams set up what they need to work in minutes instead of days.",
    description: "A modern internal platform designed to simplify developer workflows, authentication, application management, and engineering operations.",
    technologies: ["React", "Flask", "Python", "MySQL", "JWT", "Docker"],
    metrics: [
      { label: "Onboarding Time", value: "10 min" },
      { label: "Deployment Cycle", value: "-40%" },
      { label: "Active Developers", value: "350+" }
    ],
    content: {
      overview: "As engineering teams grow, infrastructure management and access configuration can bottleneck deployments. The Internal Developer Platform (IDP) acts as a centralized dashboard where developers can spin up environments, configure database schemas, manage auth tokens, and audit cloud build statuses in a few clicks.",
      problem: "A SaaS company faced deployment slowdowns because developers had to manually request Docker setups, MySQL databases, and Kubernetes configurations from the DevOps team, taking days for simple resource allocations.",
      objective: "Build a developer portal that abstracts infrastructure provisioning, automates environment templates, and integrates identity access controls seamlessly with absolute security audits.",
      solution: "We created a React portal with containerized microservice actions. The backend, written in Flask, communicates directly with Docker and Kubernetes APIs. It provisions secure databases, initializes Git repos with boilerplate, and handles session access controls using secure JWT parameters.",
      architecture: "A React single-page application communicates with a Flask REST API secured with OAuth2/JWT. Database tasks are queued through Celery workers linked to a MySQL storage engine. All services are fully containerized in Docker containers for simple multi-cloud deployment.",
      features: [
        "One-click development and staging environment provisioning",
        "Centralized configuration and environment variable dashboard",
        "Secure credential generation and MySQL access tokens",
        "Live deployment monitoring and standard output log stream",
        "Role-based access control (RBAC) and security audits"
      ],
      process: "We interviewed developers to identify primary bottlenecks. We designed a minimal, dashboard interface focused on clarity. We built Flask controllers to interface with infrastructure APIs, implementing secure parameters to prevent command injections.",
      results: "New developer onboarding time dropped from 3 days to under 10 minutes. By putting infrastructure control directly into developers' hands while keeping strict safety boundaries, deploy cycles accelerated by 40%."
    }
  },
  {
    id: "iot-monitoring",
    number: "06",
    status: "Completed",
    title: "Smart IoT Monitoring",
    category: "IoT / Automation",
    plain: "Small connected sensors that watch machines and warn people before something breaks.",
    description: "An intelligent IoT solution combining connected devices, sensors, monitoring, and automated decision-making.",
    technologies: ["IoT", "Arduino", "Sensors", "Cloud", "AI"],
    metrics: [
      { label: "Fault Prevention", value: "95%" },
      { label: "Sensor Latency", value: "< 100ms" },
      { label: "Hardware Nodes", value: "1,200+" }
    ],
    content: {
      overview: "Industrial machinery requires constant environmental tuning to prevent unexpected faults. This Smart IoT Monitoring system utilizes specialized microcontrollers to capture vibration, temperature, and humidity indices, sending telemetry data to the cloud for real-time fault analysis and automated remote shutdown.",
      problem: "Manufacturing plants had no way to predict motor failures in high-load gearboxes. Unscheduled repairs resulted in catastrophic line shutdowns costing thousands of dollars per hour.",
      objective: "Establish a robust hardware-to-cloud mesh that captures sensor readings with low latency, flags operational variances, and schedules preventive maintenance before machines fail.",
      solution: "We designed custom Arduino ESP32 sensor modules that transmit data over secure MQTT protocols. A cloud time-series DB collects entries, which are analyzed by anomaly-detection AI models. If anomalies occur, alerts are broadcasted to mobile operators and backup circuits are toggled.",
      architecture: "ESP32 nodes with industrial temperature and accelerometers transmit data via TLS MQTT to an EMQX broker. The data is processed by a Node.js streaming service, stored in InfluxDB, and monitored by a custom React interface with live canvas gauges.",
      features: [
        "Sub-100ms telemetry data collection and transmission",
        "MQTT secure network architecture with device authentication",
        "Anomaly detection algorithms warning of machine failure risks",
        "Automated remote device configuration and OTA firmware updates",
        "Real-time notifications sent via SMS and Email integration"
      ],
      process: "We assembled breadboard prototypes using Arduino ESP32 and validated sensor response calibration under heat. We created the MQTT broker architecture, designed the React live dashboard, and integrated dynamic graph plotting for historical trend analysis.",
      results: "The predictive monitoring system successfully predicted 95% of motor bearing faults up to 12 hours before mechanical failure occurred, avoiding costly production shutdowns and saving the client significant expenses."
    }
  },
  {
    id: "direct-market-access",
    number: "07",
    status: "Completed",
    title: "Direct Market Access",
    category: "Web Application / Agriculture",
    plain: "A website that lets farmers sell directly to buyers, without middlemen.",
    description: "A digital platform designed to connect farmers and markets while simplifying product discovery and direct access.",
    technologies: ["Web", "Database", "API", "Responsive UI"],
    metrics: [
      { label: "Farmer Income", value: "+30%" },
      { label: "Active Traders", value: "8,500+" },
      { label: "Transaction Value", value: "₹2.4Cr+" }
    ],
    content: {
      overview: "Intermediaries in the agricultural supply chain often depress farmers' profit margins while raising consumer costs. The Direct Market Access application cuts out middle layers, offering a simplified responsive web marketplace where local farmers sell yields directly to restaurants, grocers, and distributors.",
      problem: "Small-scale farmers struggled to find commercial buyers, leaving them dependent on local agents who set unfavorable pricing. Buyers had no way to confirm quality, quantities, or harvest schedules in advance.",
      objective: "Build an ultra-lightweight, offline-friendly responsive web platform that makes it easy for farmers to list harvests, communicate with bulk buyers, and coordinate shipping transparently.",
      solution: "We engineered a responsive web marketplace optimized for low-bandwidth environments. The app features simple input flows, visual harvest cataloging, transactional security features, and location-based filters matching local supply to nearby institutional demands.",
      architecture: "The application uses React with progressive web application (PWA) configurations, communicating with a Node.js/PostgreSQL backend via a lightweight JSON API. Image assets are optimized dynamically to save cellular data usage for rural farmers.",
      features: [
        "Data-optimized harvest listing with offline draft support",
        "Location-based product search and range filtering",
        "Real-time chat and deal negotiation framework",
        "Dynamic SMS updates for farmers without internet connections",
        "Simplified logistics routing and dispatch tracking cards"
      ],
      process: "We conducted research into mobile browser speeds in rural areas, leading to a mobile-first PWA design. We implemented a lightweight state manager and optimized SQL queries to load products quickly even on 3G connections.",
      results: "Connecting farmers directly with wholesale buyers improved their net margins by over 30%. The platform has processed transactions with thousands of active traders, establishing a reliable supply chain."
    }
  }
];
