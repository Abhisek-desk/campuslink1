import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;
app.use(express.json());
// 20 Realistic Seeded Students
let students = [
    {
        id: 's1',
        name: 'Aarav Sharma',
        email: 'student@campuslink.com',
        student_id: 'CS2022-041',
        branch: 'CSE',
        graduation_year: 2026,
        cgpa: 8.4,
        backlog_count: 0,
        skills: [
            { name: 'Python', proficiency: 90 },
            { name: 'Django', proficiency: 80 },
            { name: 'SQL', proficiency: 80 },
            { name: 'Git', proficiency: 75 },
            { name: 'AWS', proficiency: 40 },
            { name: 'Docker', proficiency: 30 },
            { name: 'JavaScript', proficiency: 70 },
            { name: 'React', proficiency: 65 },
        ],
        projects: [
            {
                title: 'CampusLink Microservices Portal',
                description: 'Full-stack placement automation platform built with Django and React with MySQL storage.',
                technologies: ['Python', 'Django', 'SQL', 'React'],
            },
            {
                title: 'FinTrack AI Budget Engine',
                description: 'Predictive expense forecasting application using Python stats models and Postgres.',
                technologies: ['Python', 'SQL', 'FastAPI'],
            },
            {
                title: 'GitInsight Code Metrics',
                description: 'CLI tool to parse git history and calculate developer velocity.',
                technologies: ['Python', 'Git'],
            },
        ],
        certifications: ['AWS Certified Cloud Practitioner', 'HackerRank Python (Gold)', 'Meta Backend Developer Spec'],
        assessment: { aptitude: 82, technical: 88, interview: 68, communication: 74 },
        shortlistedDrives: ['d1', 'd2'], // Conflict trigger!
    },
    {
        id: 's2',
        name: 'Riya Das',
        email: 'riya.das@campuslink.com',
        student_id: 'IT2022-019',
        branch: 'IT',
        graduation_year: 2026,
        cgpa: 8.7,
        backlog_count: 0,
        skills: [
            { name: 'Python', proficiency: 85 },
            { name: 'SQL', proficiency: 90 },
            { name: 'Excel', proficiency: 85 },
            { name: 'Power BI', proficiency: 80 },
            { name: 'Tableau', proficiency: 75 },
            { name: 'Pandas', proficiency: 85 },
        ],
        projects: [
            {
                title: 'E-Commerce Churn Intelligence',
                description: 'Customer churn analytics dashboard using PowerBI and SQL on 2M transaction records.',
                technologies: ['Python', 'SQL', 'Power BI'],
            },
            {
                title: 'Healthcare Patient Inflow Dashboard',
                description: 'Visual hospital occupancy analysis with automated Excel and SQL data pipelines.',
                technologies: ['SQL', 'Excel', 'Tableau'],
            },
        ],
        certifications: ['Microsoft Certified: Power BI Data Analyst Associate', 'Google Data Analytics Certificate'],
        assessment: { aptitude: 85, technical: 86, interview: 78, communication: 82 },
        shortlistedDrives: ['d2'],
    },
    {
        id: 's3',
        name: 'Rahul Kumar',
        email: 'rahul.k@campuslink.com',
        student_id: 'CS2022-088',
        branch: 'CSE',
        graduation_year: 2026,
        cgpa: 7.8,
        backlog_count: 0,
        skills: [
            { name: 'Linux', proficiency: 85 },
            { name: 'AWS', proficiency: 80 },
            { name: 'Docker', proficiency: 75 },
            { name: 'Networking', proficiency: 70 },
            { name: 'Kubernetes', proficiency: 60 },
            { name: 'Python', proficiency: 65 },
        ],
        projects: [
            {
                title: 'Multi-Region Kubernetes CI/CD Pipeline',
                description: 'Automated deployment on AWS EKS with ArgoCD, Docker containerization and Prometheus monitoring.',
                technologies: ['AWS', 'Docker', 'Linux', 'Networking'],
            },
            {
                title: 'Secure Cloud VPC Bastion Host',
                description: 'Infrastructure as Code setup with Linux hardening and subnet routing.',
                technologies: ['Linux', 'Networking', 'AWS'],
            },
        ],
        certifications: ['AWS Solutions Architect Associate', 'Docker Certified Associate'],
        assessment: { aptitude: 75, technical: 80, interview: 72, communication: 70 },
        shortlistedDrives: ['d3'],
    },
    {
        id: 's4',
        name: 'Priya Singh',
        email: 'priya.s@campuslink.com',
        student_id: 'ECE2022-014',
        branch: 'ECE',
        graduation_year: 2026,
        cgpa: 7.2,
        backlog_count: 1,
        skills: [
            { name: 'Python', proficiency: 60 },
            { name: 'SQL', proficiency: 55 },
            { name: 'C++', proficiency: 70 },
            { name: 'Embedded C', proficiency: 65 },
        ],
        projects: [
            {
                title: 'IoT Smart Campus Metering',
                description: 'Sensor data ingestion using MQTT and Python backend.',
                technologies: ['Python', 'C++'],
            },
        ],
        certifications: ['Embedded Systems Essentials'],
        assessment: { aptitude: 65, technical: 58, interview: 55, communication: 62 },
        shortlistedDrives: [],
    },
    {
        id: 's5',
        name: 'Aarav Kumar',
        email: 'aarav.k@campuslink.com',
        student_id: 'ME2022-052',
        branch: 'Mechanical',
        graduation_year: 2026,
        cgpa: 6.2,
        backlog_count: 2,
        skills: [
            { name: 'Python', proficiency: 40 },
            { name: 'SQL', proficiency: 35 },
            { name: 'AutoCAD', proficiency: 85 },
        ],
        projects: [
            {
                title: 'Thermal CAD Simulation',
                description: 'Simulating heat dissipation on brake disc assemblies.',
                technologies: ['AutoCAD', 'MATLAB'],
            },
        ],
        certifications: ['Certified SOLIDWORKS Associate'],
        assessment: { aptitude: 48, technical: 42, interview: 40, communication: 50 },
        shortlistedDrives: [],
    },
    {
        id: 's6',
        name: 'Ananya Iyer',
        email: 'ananya.i@campuslink.com',
        student_id: 'CS2022-012',
        branch: 'CSE',
        graduation_year: 2026,
        cgpa: 9.1,
        backlog_count: 0,
        skills: [
            { name: 'Python', proficiency: 92 },
            { name: 'Django', proficiency: 88 },
            { name: 'SQL', proficiency: 85 },
            { name: 'Git', proficiency: 85 },
            { name: 'Docker', proficiency: 70 },
            { name: 'React', proficiency: 80 },
        ],
        projects: [
            {
                title: 'Distributed Task Queue Engine',
                description: 'Python & Redis based distributed job execution broker with fault tolerance.',
                technologies: ['Python', 'Django', 'SQL', 'Docker'],
            },
        ],
        certifications: ['AWS Solutions Architect', 'Meta Full Stack Specialization'],
        assessment: { aptitude: 90, technical: 92, interview: 88, communication: 86 },
        shortlistedDrives: ['d1'],
    },
    {
        id: 's7',
        name: 'Vikram Joshi',
        email: 'vikram.j@campuslink.com',
        student_id: 'IT2022-077',
        branch: 'IT',
        graduation_year: 2026,
        cgpa: 8.1,
        backlog_count: 0,
        skills: [
            { name: 'Python', proficiency: 80 },
            { name: 'SQL', proficiency: 85 },
            { name: 'Excel', proficiency: 90 },
            { name: 'Power BI', proficiency: 85 },
            { name: 'R', proficiency: 60 },
        ],
        projects: [
            {
                title: 'Supply Chain Bottleneck Analysis',
                description: 'Comprehensive KPI dashboards tracking vendor fulfillment latency.',
                technologies: ['Power BI', 'SQL', 'Excel'],
            },
        ],
        certifications: ['Google Advanced Data Analytics'],
        assessment: { aptitude: 82, technical: 80, interview: 75, communication: 78 },
        shortlistedDrives: ['d2'],
    },
    {
        id: 's8',
        name: 'Neha Nair',
        email: 'neha.n@campuslink.com',
        student_id: 'CS2022-063',
        branch: 'CSE',
        graduation_year: 2026,
        cgpa: 7.9,
        backlog_count: 0,
        skills: [
            { name: 'Linux', proficiency: 80 },
            { name: 'AWS', proficiency: 85 },
            { name: 'Docker', proficiency: 80 },
            { name: 'Networking', proficiency: 75 },
            { name: 'Terraform', proficiency: 65 },
        ],
        projects: [
            {
                title: 'Zero-Downtime Blue/Green Deployer',
                description: 'Automated AWS ECS deployment with CloudWatch metrics trigger.',
                technologies: ['AWS', 'Docker', 'Linux'],
            },
        ],
        certifications: ['HashiCorp Certified Terraform Associate', 'AWS SysOps Administrator'],
        assessment: { aptitude: 78, technical: 84, interview: 76, communication: 75 },
        shortlistedDrives: ['d3'],
    },
    {
        id: 's9',
        name: 'Aditya Patel',
        email: 'aditya.p@campuslink.com',
        student_id: 'CS2022-031',
        branch: 'CSE',
        graduation_year: 2026,
        cgpa: 8.6,
        backlog_count: 0,
        skills: [
            { name: 'Python', proficiency: 88 },
            { name: 'Django', proficiency: 82 },
            { name: 'SQL', proficiency: 80 },
            { name: 'Git', proficiency: 80 },
            { name: 'FastAPI', proficiency: 75 },
        ],
        projects: [
            {
                title: 'OmniChannel Inventory Manager',
                description: 'High throughput REST API for retail stock management with Django ORM.',
                technologies: ['Python', 'Django', 'SQL'],
            },
        ],
        certifications: ['Python Institute PCAP'],
        assessment: { aptitude: 84, technical: 85, interview: 80, communication: 82 },
        shortlistedDrives: ['d1'],
    },
    {
        id: 's10',
        name: 'Sneha Kulkarni',
        email: 'sneha.k@campuslink.com',
        student_id: 'IT2022-044',
        branch: 'IT',
        graduation_year: 2026,
        cgpa: 7.6,
        backlog_count: 0,
        skills: [
            { name: 'Python', proficiency: 75 },
            { name: 'SQL', proficiency: 78 },
            { name: 'Excel', proficiency: 80 },
            { name: 'Power BI', proficiency: 70 },
        ],
        projects: [
            {
                title: 'Retail Store Sales Predictor',
                description: 'Linear regression model forecasting quarterly revenue spikes.',
                technologies: ['Python', 'SQL', 'Excel'],
            },
        ],
        certifications: ['Data Science with Python - IBM'],
        assessment: { aptitude: 76, technical: 72, interview: 70, communication: 75 },
        shortlistedDrives: [],
    },
    {
        id: 's11',
        name: 'Devendra Verma',
        email: 'dev.v@campuslink.com',
        student_id: 'CS2022-095',
        branch: 'CSE',
        graduation_year: 2026,
        cgpa: 7.4,
        backlog_count: 0,
        skills: [
            { name: 'Linux', proficiency: 75 },
            { name: 'AWS', proficiency: 70 },
            { name: 'Docker', proficiency: 65 },
            { name: 'Networking', proficiency: 68 },
            { name: 'Bash', proficiency: 80 },
        ],
        projects: [
            {
                title: 'Automated SysAdmin Backup Engine',
                description: 'Bash scripts backing up MySQL dumps to AWS S3 with rotation.',
                technologies: ['Linux', 'AWS', 'Bash'],
            },
        ],
        certifications: ['Red Hat Certified Enterprise Application Developer'],
        assessment: { aptitude: 72, technical: 74, interview: 68, communication: 65 },
        shortlistedDrives: ['d3'],
    },
    {
        id: 's12',
        name: 'Tanvi Mehra',
        email: 'tanvi.m@campuslink.com',
        student_id: 'ECE2022-081',
        branch: 'ECE',
        graduation_year: 2026,
        cgpa: 8.3,
        backlog_count: 0,
        skills: [
            { name: 'Python', proficiency: 80 },
            { name: 'SQL', proficiency: 75 },
            { name: 'Git', proficiency: 70 },
            { name: 'Django', proficiency: 65 },
        ],
        projects: [
            {
                title: 'Smart Home Gateway Service',
                description: 'Django web console managing connected Zigbee and Wi-Fi node status.',
                technologies: ['Python', 'Django', 'SQL'],
            },
        ],
        certifications: ['Python Data Structures - Univ of Michigan'],
        assessment: { aptitude: 80, technical: 76, interview: 74, communication: 80 },
        shortlistedDrives: ['d1'],
    },
    {
        id: 's13',
        name: 'Rohan Deshmukh',
        email: 'rohan.d@campuslink.com',
        student_id: 'EEE2022-029',
        branch: 'EEE',
        graduation_year: 2026,
        cgpa: 6.8,
        backlog_count: 1,
        skills: [
            { name: 'Python', proficiency: 50 },
            { name: 'SQL', proficiency: 45 },
            { name: 'MATLAB', proficiency: 80 },
            { name: 'Simulink', proficiency: 75 },
        ],
        projects: [
            {
                title: 'Grid Frequency Stablization Simulation',
                description: 'MATLAB controller simulation against sudden industrial load spikes.',
                technologies: ['MATLAB', 'Simulink'],
            },
        ],
        certifications: ['Power Systems Simulation'],
        assessment: { aptitude: 60, technical: 52, interview: 48, communication: 58 },
        shortlistedDrives: [],
    },
    {
        id: 's14',
        name: 'Kavya Sunder',
        email: 'kavya.s@campuslink.com',
        student_id: 'CS2022-057',
        branch: 'CSE',
        graduation_year: 2026,
        cgpa: 8.9,
        backlog_count: 0,
        skills: [
            { name: 'Python', proficiency: 88 },
            { name: 'Django', proficiency: 85 },
            { name: 'SQL', proficiency: 85 },
            { name: 'Git', proficiency: 82 },
            { name: 'Docker', proficiency: 75 },
        ],
        projects: [
            {
                title: 'Automated Student Grade Ledger',
                description: 'High-security multi-tenant school ERP with row-level security in PostgreSQL.',
                technologies: ['Python', 'Django', 'SQL', 'Git'],
            },
        ],
        certifications: ['AWS Developer Associate'],
        assessment: { aptitude: 88, technical: 86, interview: 84, communication: 88 },
        shortlistedDrives: ['d1'],
    },
    {
        id: 's15',
        name: 'Karan Malhotra',
        email: 'karan.m@campuslink.com',
        student_id: 'IT2022-033',
        branch: 'IT',
        graduation_year: 2026,
        cgpa: 7.7,
        backlog_count: 0,
        skills: [
            { name: 'Python', proficiency: 78 },
            { name: 'SQL', proficiency: 82 },
            { name: 'Excel', proficiency: 80 },
            { name: 'Power BI', proficiency: 75 },
            { name: 'Git', proficiency: 65 },
        ],
        projects: [
            {
                title: 'Fintech Credit Risk Scoring Model',
                description: 'Evaluating loan default probabilities using historical banking records.',
                technologies: ['Python', 'SQL', 'Power BI'],
            },
        ],
        certifications: ['Alteryx Foundational Micro-Credential'],
        assessment: { aptitude: 79, technical: 75, interview: 71, communication: 72 },
        shortlistedDrives: ['d2'],
    },
    {
        id: 's16',
        name: 'Meera Nambiar',
        email: 'meera.n@campuslink.com',
        student_id: 'CS2022-104',
        branch: 'CSE',
        graduation_year: 2026,
        cgpa: 8.5,
        backlog_count: 0,
        skills: [
            { name: 'Linux', proficiency: 82 },
            { name: 'AWS', proficiency: 80 },
            { name: 'Docker', proficiency: 85 },
            { name: 'Networking', proficiency: 78 },
            { name: 'Kubernetes', proficiency: 70 },
        ],
        projects: [
            {
                title: 'Serverless Event Stream Architecture',
                description: 'AWS Lambda, SQS and DynamoDB processing 10,000 sensor pulses/min.',
                technologies: ['AWS', 'Docker', 'Linux', 'Networking'],
            },
        ],
        certifications: ['AWS Certified Solutions Architect Associate', 'CKA: Certified Kubernetes Administrator'],
        assessment: { aptitude: 82, technical: 86, interview: 80, communication: 82 },
        shortlistedDrives: ['d3'],
    },
    {
        id: 's17',
        name: 'Harshvardhan Rao',
        email: 'harsh.r@campuslink.com',
        student_id: 'ECE2022-049',
        branch: 'ECE',
        graduation_year: 2026,
        cgpa: 6.9,
        backlog_count: 1,
        skills: [
            { name: 'Python', proficiency: 58 },
            { name: 'SQL', proficiency: 50 },
            { name: 'C', proficiency: 75 },
            { name: 'Linux', proficiency: 60 },
        ],
        projects: [
            {
                title: 'Microcontroller Traffic Controller',
                description: 'Adaptive green light duration calculated using IR vehicle sensors.',
                technologies: ['C', 'Linux'],
            },
        ],
        certifications: ['IoT Embedded Specialist'],
        assessment: { aptitude: 62, technical: 56, interview: 50, communication: 60 },
        shortlistedDrives: [],
    },
    {
        id: 's18',
        name: 'Shreya Chatterjee',
        email: 'shreya.c@campuslink.com',
        student_id: 'IT2022-088',
        branch: 'IT',
        graduation_year: 2026,
        cgpa: 8.2,
        backlog_count: 0,
        skills: [
            { name: 'Python', proficiency: 80 },
            { name: 'SQL', proficiency: 85 },
            { name: 'Excel', proficiency: 88 },
            { name: 'Power BI', proficiency: 82 },
            { name: 'Tableau', proficiency: 70 },
        ],
        projects: [
            {
                title: 'SaaS Churn & Expansion Matrix',
                description: 'Cohort retention analysis tracking MRR net changes across tiers.',
                technologies: ['SQL', 'Power BI', 'Excel'],
            },
        ],
        certifications: ['Google Data Analytics Professional'],
        assessment: { aptitude: 81, technical: 80, interview: 76, communication: 79 },
        shortlistedDrives: ['d2'],
    },
    {
        id: 's19',
        name: 'Manish Tiwari',
        email: 'manish.t@campuslink.com',
        student_id: 'CS2022-022',
        branch: 'CSE',
        graduation_year: 2026,
        cgpa: 7.1,
        backlog_count: 0,
        skills: [
            { name: 'Python', proficiency: 70 },
            { name: 'Django', proficiency: 65 },
            { name: 'SQL', proficiency: 68 },
            { name: 'Git', proficiency: 65 },
        ],
        projects: [
            {
                title: 'Hostel Complaint Ticketing Portal',
                description: 'Django web portal with email notification when tickets update status.',
                technologies: ['Python', 'Django', 'SQL'],
            },
        ],
        certifications: ['Full Stack Web Bootcamp'],
        assessment: { aptitude: 70, technical: 68, interview: 62, communication: 64 },
        shortlistedDrives: [],
    },
    {
        id: 's20',
        name: 'Pooja Bhatt',
        email: 'pooja.b@campuslink.com',
        student_id: 'ME2022-019',
        branch: 'Mechanical',
        graduation_year: 2026,
        cgpa: 6.4,
        backlog_count: 2,
        skills: [
            { name: 'Python', proficiency: 35 },
            { name: 'Excel', proficiency: 60 },
            { name: 'ANSYS', proficiency: 75 },
        ],
        projects: [
            {
                title: 'Aerodynamic Winglet CFD Analysis',
                description: 'Simulating drag coefficient reductions using ANSYS Fluent.',
                technologies: ['ANSYS', 'Excel'],
            },
        ],
        certifications: ['Autodesk Certified Professional'],
        assessment: { aptitude: 52, technical: 45, interview: 42, communication: 54 },
        shortlistedDrives: [],
    },
];
// 5 Recruiters
let recruiters = [
    { id: 'r1', company_name: 'TechNova', industry: 'Enterprise SaaS & Cloud', hires_count: 42 },
    { id: 'r2', company_name: 'DataSphere', industry: 'Data Analytics & FinTech', hires_count: 36 },
    { id: 'r3', company_name: 'CloudWorks', industry: 'Cloud Infrastructure & DevOps', hires_count: 28 },
    { id: 'r4', company_name: 'Apex Systems', industry: 'Digital Engineering & AI', hires_count: 31 },
    { id: 'r5', company_name: 'QuantumEdge', industry: 'Financial Software & Trading', hires_count: 17 },
];
// 6 Jobs
let jobs = [
    {
        id: 'j1',
        recruiter_id: 'r1',
        company_name: 'TechNova',
        title: 'Software Engineer',
        description: 'Build mission-critical backend microservices with high reliability, scalable APIs, and clean data modeling.',
        minimum_cgpa: 7.0,
        required_skills: [
            { name: 'Python', min_proficiency: 70 },
            { name: 'Django', min_proficiency: 70 },
            { name: 'SQL', min_proficiency: 70 },
            { name: 'Git', min_proficiency: 60 },
        ],
        ctc: '₹8.5 LPA',
        deadline: '2026-10-18',
        vacancies: 15,
    },
    {
        id: 'j2',
        recruiter_id: 'r2',
        company_name: 'DataSphere',
        title: 'Data Analyst',
        description: 'Transform enterprise datasets into high-impact operational intelligence, automated dashboards, and statistical models.',
        minimum_cgpa: 7.2,
        required_skills: [
            { name: 'Python', min_proficiency: 70 },
            { name: 'SQL', min_proficiency: 75 },
            { name: 'Excel', min_proficiency: 70 },
            { name: 'Power BI', min_proficiency: 70 },
        ],
        ctc: '₹7.5 LPA',
        deadline: '2026-10-19',
        vacancies: 12,
    },
    {
        id: 'j3',
        recruiter_id: 'r3',
        company_name: 'CloudWorks',
        title: 'Cloud Engineer',
        description: 'Architect, automate and monitor distributed systems on AWS and containerized Linux infrastructure.',
        minimum_cgpa: 7.0,
        required_skills: [
            { name: 'Linux', min_proficiency: 70 },
            { name: 'AWS', min_proficiency: 70 },
            { name: 'Docker', min_proficiency: 65 },
            { name: 'Networking', min_proficiency: 65 },
        ],
        ctc: '₹9.0 LPA',
        deadline: '2026-10-20',
        vacancies: 8,
    },
    {
        id: 'j4',
        recruiter_id: 'r4',
        company_name: 'Apex Systems',
        title: 'Full Stack Developer',
        description: 'Design and deploy modern responsive web apps with React frontend and Python/Node backend systems.',
        minimum_cgpa: 7.0,
        required_skills: [
            { name: 'React', min_proficiency: 65 },
            { name: 'Python', min_proficiency: 65 },
            { name: 'SQL', min_proficiency: 65 },
            { name: 'Git', min_proficiency: 60 },
        ],
        ctc: '₹8.0 LPA',
        deadline: '2026-10-22',
        vacancies: 10,
    },
    {
        id: 'j5',
        recruiter_id: 'r5',
        company_name: 'QuantumEdge',
        title: 'DevOps Specialist',
        description: 'Build automated continuous integration, container orchestration, and telemetry clusters.',
        minimum_cgpa: 7.5,
        required_skills: [
            { name: 'Linux', min_proficiency: 75 },
            { name: 'Docker', min_proficiency: 70 },
            { name: 'AWS', min_proficiency: 75 },
            { name: 'Python', min_proficiency: 60 },
        ],
        ctc: '₹10.5 LPA',
        deadline: '2026-10-25',
        vacancies: 6,
    },
    {
        id: 'j6',
        recruiter_id: 'r2',
        company_name: 'DataSphere',
        title: 'Business Intelligence Associate',
        description: 'Build executive reporting dashboards and KPI pipelines with SQL, Excel, and Power BI.',
        minimum_cgpa: 6.8,
        required_skills: [
            { name: 'Excel', min_proficiency: 75 },
            { name: 'Power BI', min_proficiency: 65 },
            { name: 'SQL', min_proficiency: 65 },
        ],
        ctc: '₹6.5 LPA',
        deadline: '2026-10-28',
        vacancies: 8,
    },
];
// 3 Placement Drives with a Deliberate Scheduling Conflict between TechNova and DataSphere on 20 Oct!
let drives = [
    {
        id: 'd1',
        job_id: 'j1',
        company_name: 'TechNova',
        role: 'Software Engineer',
        date: '2026-10-20',
        start_time: '10:00',
        end_time: '12:00',
        venue: 'Computing Lab 1 (Block B)',
        candidates_count: 25,
        status: 'SCHEDULED',
    },
    {
        id: 'd2',
        job_id: 'j2',
        company_name: 'DataSphere',
        role: 'Data Analyst',
        date: '2026-10-20',
        start_time: '11:00', // Overlaps with TechNova 10:00 - 12:00!
        end_time: '13:00',
        venue: 'Analytics Lab 2 (Block A)',
        candidates_count: 20,
        status: 'SCHEDULED',
    },
    {
        id: 'd3',
        job_id: 'j3',
        company_name: 'CloudWorks',
        role: 'Cloud Engineer',
        date: '2026-10-21',
        start_time: '10:00',
        end_time: '12:00',
        venue: 'Computing Lab 1 (Block B)',
        candidates_count: 18,
        status: 'SCHEDULED',
    },
];
// Seeded Offers
let offers = [
    {
        id: 'o1',
        student_id: 's1',
        student_name: 'Aarav Sharma',
        company: 'TechNova',
        role: 'Software Engineer',
        ctc: '₹8.5 LPA',
        status: 'Accepted',
        joining_date: '2026-06-15',
    },
    {
        id: 'o2',
        student_id: 's2',
        student_name: 'Riya Das',
        company: 'DataSphere',
        role: 'Data Analyst',
        ctc: '₹7.5 LPA',
        status: 'Pending',
        joining_date: '2026-07-01',
    },
    {
        id: 'o3',
        student_id: 's3',
        student_name: 'Rahul Kumar',
        company: 'CloudWorks',
        role: 'Cloud Engineer',
        ctc: '₹9.0 LPA',
        status: 'Accepted',
        joining_date: '2026-06-20',
    },
    {
        id: 'o4',
        student_id: 's6',
        student_name: 'Ananya Iyer',
        company: 'TechNova',
        role: 'Software Engineer',
        ctc: '₹8.5 LPA',
        status: 'Accepted',
        joining_date: '2026-06-15',
    },
    {
        id: 'o5',
        student_id: 's8',
        student_name: 'Neha Nair',
        company: 'CloudWorks',
        role: 'Cloud Engineer',
        ctc: '₹9.0 LPA',
        status: 'Deferred',
        joining_date: '2026-08-01',
    },
    {
        id: 'o6',
        student_id: 's7',
        student_name: 'Vikram Joshi',
        company: 'DataSphere',
        role: 'Data Analyst',
        ctc: '₹7.5 LPA',
        status: 'Declined',
        joining_date: '2026-07-01',
    },
];
// Seeded Notifications
let notifications = [
    {
        id: 'n1',
        student_id: 's1',
        message: '🎉 Congratulations! You have received an offer from TechNova (₹8.5 LPA SDE).',
        date: 'Today, 09:30 AM',
        is_read: false,
        type: 'offer',
    },
    {
        id: 'n2',
        student_id: 's1',
        message: '⚠️ Notice: You have been shortlisted for TechNova & DataSphere on 20 Oct. Drive times are being synchronized.',
        date: 'Yesterday, 04:15 PM',
        is_read: false,
        type: 'schedule',
    },
    {
        id: 'n3',
        student_id: 's1',
        message: '✅ You have been shortlisted for TechNova Campus Drive (Software Engineer).',
        date: '2 days ago',
        is_read: true,
        type: 'shortlist',
    },
    {
        id: 'n4',
        student_id: 's1',
        message: '📋 Document verification deadline for placement cycle 2026 is approaching.',
        date: '3 days ago',
        is_read: true,
        type: 'info',
    },
];
// ==========================================
// CORE ALGORITHMS (DYNAMIC & EXPLAINABLE)
// ==========================================
// 1. AI Readiness Calculation
function calculateStudentReadiness(student) {
    // Academic (20%): CGPA out of 10, penalized by backlogs
    const academicScore = Math.max(0, Math.min(100, (student.cgpa / 10) * 100 - (student.backlog_count || 0) * 15));
    
    // Technical Skills (25%): average of top skills
    const skillsList = Array.isArray(student.skills) && student.skills.length > 0 ? student.skills : [];
    const avgTechProficiency = skillsList.length > 0
        ? skillsList.reduce((acc, s) => acc + (s.proficiency || 70), 0) / skillsList.length
        : 65;
    
    // Projects (15%): scale based on portfolio depth (1 = 70%, 2 = 85%, 3+ = 100%)
    const projectCount = Array.isArray(student.projects) ? student.projects.length : 0;
    const projectScore = projectCount === 0 ? 45 : Math.min(100, 55 + projectCount * 22);

    // Certifications (10%): (1 = 70%, 2 = 85%, 3+ = 100%)
    const certCount = Array.isArray(student.certifications) ? student.certifications.length : 0;
    const certScore = certCount === 0 ? 45 : Math.min(100, 55 + certCount * 22);

    // Assessment telemetry (30% total): Aptitude (10%), Mock Interview (10%), Communication (10%)
    const aptitudeScore = student.assessment?.aptitude || 78;
    const interviewScore = student.assessment?.interview || 72;
    const communicationScore = student.assessment?.communication || 75;

    const weightedTotal = academicScore * 0.2 +
        avgTechProficiency * 0.25 +
        projectScore * 0.15 +
        certScore * 0.1 +
        aptitudeScore * 0.1 +
        interviewScore * 0.1 +
        communicationScore * 0.1;

    const finalScore = Math.max(25, Math.min(99, Math.round(weightedTotal)));
    let status = 'NOT READY';
    if (finalScore >= 80)
        status = 'HIGHLY EMPLOYABLE';
    else if (finalScore >= 60)
        status = 'READY';
    else if (finalScore >= 40)
        status = 'DEVELOPING';
    else
        status = 'NOT READY';

    // Explainability breakdown factors
    const positiveFactors = [];
    const improvementAreas = [];
    // Positive factor derivation
    const strongSkills = student.skills.filter((s) => s.proficiency >= 75);
    if (strongSkills.length > 0) {
        positiveFactors.push(`Strong proficiency in ${strongSkills.map((s) => s.name).slice(0, 3).join(', ')}`);
    }
    if (student.cgpa >= 8.0) {
        positiveFactors.push(`High academic consistency with CGPA ${student.cgpa.toFixed(1)}`);
    }
    else if (student.cgpa >= 7.0 && student.backlog_count === 0) {
        positiveFactors.push(`Zero active backlogs with healthy CGPA (${student.cgpa.toFixed(1)})`);
    }
    if (student.projects.length >= 2) {
        positiveFactors.push(`Solid project portfolio with ${student.projects.length} documented technical projects`);
    }
    if (student.assessment.aptitude >= 75) {
        positiveFactors.push(`Above average aptitude percentile (${student.assessment.aptitude}%)`);
    }
    if (student.certifications.length >= 1) {
        positiveFactors.push(`Industry certifications verified (${student.certifications[0]})`);
    }
    // Improvement areas derivation
    const lowSkills = student.skills.filter((s) => s.proficiency < 60);
    if (lowSkills.length > 0) {
        improvementAreas.push(`${lowSkills.map((s) => s.name).slice(0, 2).join(' and ')} proficiency is below target threshold`);
    }
    if (student.assessment.interview < 70) {
        improvementAreas.push(`Mock interview score is moderate (${student.assessment.interview}%) — needs more live coding practice`);
    }
    if (student.assessment.communication < 75) {
        improvementAreas.push(`Communication score can improve (${student.assessment.communication}%) for corporate client interaction`);
    }
    if (student.backlog_count > 0) {
        improvementAreas.push(`Active backlogs (${student.backlog_count}) restrict eligibility for select tier-1 recruiters`);
    }
    if (student.projects.length < 2) {
        improvementAreas.push('Expand project portfolio with end-to-end production architecture');
    }
    // AI Recommendation summary string
    let recommendation = '';
    if (finalScore >= 80) {
        recommendation = 'Ready for Tier-1 corporate drives. Prioritize system design, leadership behavioral rounds, and competitive offer negotiation.';
    }
    else if (finalScore >= 60) {
        recommendation = `Focus on ${improvementAreas[0] ? improvementAreas[0].toLowerCase() : 'strengthening core fundamentals'} to elevate status to Highly Employable.`;
    }
    else if (finalScore >= 40) {
        recommendation = 'Intensive boot camp recommended: build at least 2 full-stack projects and complete mock technical interviews weekly.';
    }
    else {
        recommendation = 'Urgent academic and foundational technical intervention required before next placement window.';
    }
    return {
        score: finalScore,
        status,
        breakdown: {
            academic: Math.round(academicScore),
            technical: Math.round(avgTechProficiency),
            projects: Math.round(projectScore),
            certifications: Math.round(certScore),
            aptitude: Math.round(aptitudeScore),
            interview: Math.round(interviewScore),
            communication: Math.round(communicationScore),
        },
        positiveFactors,
        improvementAreas,
        recommendation,
    };
}
// 2. Skill Gap Analysis for Target Roles
const ROLE_SKILL_BENCHMARKS = {
    'Software Engineer': [
        { name: 'Python', requiredProficiency: 70 },
        { name: 'Django', requiredProficiency: 70 },
        { name: 'SQL', requiredProficiency: 70 },
        { name: 'Git', requiredProficiency: 60 },
        { name: 'Docker', requiredProficiency: 60 },
    ],
    'Data Analyst': [
        { name: 'Python', requiredProficiency: 70 },
        { name: 'SQL', requiredProficiency: 75 },
        { name: 'Excel', requiredProficiency: 70 },
        { name: 'Power BI', requiredProficiency: 70 },
        { name: 'Tableau', requiredProficiency: 60 },
    ],
    'Cloud Engineer': [
        { name: 'Linux', requiredProficiency: 70 },
        { name: 'AWS', requiredProficiency: 70 },
        { name: 'Docker', requiredProficiency: 65 },
        { name: 'Networking', requiredProficiency: 65 },
        { name: 'Kubernetes', requiredProficiency: 60 },
    ],
    'Full Stack Developer': [
        { name: 'React', requiredProficiency: 70 },
        { name: 'JavaScript', requiredProficiency: 75 },
        { name: 'Python', requiredProficiency: 70 },
        { name: 'SQL', requiredProficiency: 65 },
        { name: 'Git', requiredProficiency: 65 },
    ],
};
function analyzeSkillGaps(student, targetRole) {
    const benchmarks = ROLE_SKILL_BENCHMARKS[targetRole] || ROLE_SKILL_BENCHMARKS['Software Engineer'];
    const comparison = benchmarks.map((bench) => {
        const existing = student.skills.find((s) => s.name.toLowerCase() === bench.name.toLowerCase());
        const current = existing ? existing.proficiency : 0;
        let status = 'Gap';
        if (current >= bench.requiredProficiency + 10)
            status = 'Strong';
        else if (current >= bench.requiredProficiency)
            status = 'Met';
        else
            status = 'Gap';
        return {
            skill: bench.name,
            current,
            required: bench.requiredProficiency,
            gap: Math.max(0, bench.requiredProficiency - current),
            status,
        };
    });
    // Actionable preparation recommendations based on identified gaps
    const gapItems = comparison.filter((c) => c.status === 'Gap');
    const recommendations = [];
    gapItems.forEach((item) => {
        if (item.skill === 'Docker') {
            recommendations.push('Learn Docker fundamentals, multi-stage Dockerfiles, and compose configurations.');
        }
        else if (item.skill === 'AWS') {
            recommendations.push('Study core AWS compute (EC2, Lambda) and storage (S3) architectures on free-tier.');
        }
        else if (item.skill === 'Power BI') {
            recommendations.push('Build 2 interactive Power BI report dashboards with DAX measures and published filters.');
        }
        else if (item.skill === 'Tableau') {
            recommendations.push('Practice visual analytics and LOD expressions using Tableau Public datasets.');
        }
        else if (item.skill === 'Kubernetes') {
            recommendations.push('Deploy microservices using Minikube or Kind pods with service ingresses.');
        }
        else if (item.skill === 'Linux') {
            recommendations.push('Master Linux shell automation, process management, and permission hardening.');
        }
        else if (item.skill === 'Git') {
            recommendations.push('Practice Git branching, interactive rebasing, merge conflict resolution, and PR workflows.');
        }
        else {
            recommendations.push(`Deepen hands-on practice in ${item.skill} through guided case studies.`);
        }
    });
    if (recommendations.length === 0) {
        recommendations.push('All benchmark skills met! Focus on system design and company-specific interview archives.');
    }
    recommendations.push('Complete 2 portfolio projects demonstrating the combined role tech stack.');
    recommendations.push('Schedule a mock technical interview with placement peer mentors.');
    return {
        targetRole,
        comparison,
        totalGaps: gapItems.length,
        recommendations,
    };
}
// 3. AI-Assisted Matching Algorithm (Section 10)
// Eligibility (20%), Skill Match (35%), Project Relevance (15%), Certification Match (10%), Assessment (10%), Readiness (10%)
function calculateMatch(student, job) {
    // Eligibility: CGPA threshold, backlogs
    const cgpaOk = student.cgpa >= job.minimum_cgpa;
    let eligibilityScore = 0;
    if (cgpaOk && student.backlog_count === 0)
        eligibilityScore = 100;
    else if (cgpaOk && student.backlog_count > 0)
        eligibilityScore = 70;
    else if (student.cgpa >= job.minimum_cgpa - 0.3)
        eligibilityScore = 50;
    else
        eligibilityScore = 20;
    // Skill Match (35%):
    let matchedSkillsCount = 0;
    let skillProficiencySum = 0;
    const positiveSkillFactors = [];
    const skillGaps = [];
    job.required_skills.forEach((req) => {
        const stSkill = student.skills.find((s) => s.name.toLowerCase() === req.name.toLowerCase());
        if (stSkill) {
            if (stSkill.proficiency >= req.min_proficiency) {
                matchedSkillsCount++;
                skillProficiencySum += 100;
                positiveSkillFactors.push(`${req.name} skill strongly matches (${stSkill.proficiency}% vs req ${req.min_proficiency}%)`);
            }
            else {
                const partial = (stSkill.proficiency / req.min_proficiency) * 100;
                skillProficiencySum += partial;
                skillGaps.push(`${req.name} (${stSkill.proficiency}%) is below required ${req.min_proficiency}%`);
            }
        }
        else {
            skillGaps.push(`Missing required skill: ${req.name}`);
        }
    });
    const skillMatchScore = job.required_skills.length > 0 ? skillProficiencySum / job.required_skills.length : 50;
    // Project Relevance (15%):
    const requiredSkillNames = job.required_skills.map((s) => s.name.toLowerCase());
    const matchingProjects = student.projects.filter((p) => p.technologies.some((tech) => requiredSkillNames.includes(tech.toLowerCase())));
    let projectScore = 0;
    if (matchingProjects.length >= 2)
        projectScore = 100;
    else if (matchingProjects.length === 1)
        projectScore = 75;
    else if (student.projects.length > 0)
        projectScore = 40;
    else
        projectScore = 10;
    // Certification Match (10%):
    const hasCert = student.certifications.some((cert) => requiredSkillNames.some((sk) => cert.toLowerCase().includes(sk)));
    const certScore = hasCert ? 100 : student.certifications.length > 0 ? 60 : 20;
    // Assessment Score (10%):
    const avgAssessment = (student.assessment.aptitude +
        student.assessment.technical +
        student.assessment.interview +
        student.assessment.communication) /
        4;
    // Student Readiness (10%):
    const readiness = calculateStudentReadiness(student).score;
    // Weighted Combination
    const weights = {
        eligibility: 0.2,
        skill: 0.35,
        project: 0.15,
        cert: 0.1,
        assessment: 0.1,
        readiness: 0.1,
    };
    const finalScore = Math.round(eligibilityScore * weights.eligibility +
        skillMatchScore * weights.skill +
        projectScore * weights.project +
        certScore * weights.cert +
        avgAssessment * weights.assessment +
        readiness * weights.readiness);
    // Status Category
    let status = 'Skill Gap';
    let recommendationLabel = 'Needs Improvement';
    if (finalScore >= 80) {
        status = 'Recommended';
        recommendationLabel = 'Highly Recommended';
    }
    else if (finalScore >= 65) {
        status = 'Consider';
        recommendationLabel = 'Consider with Interview Review';
    }
    else {
        status = 'Skill Gap';
        recommendationLabel = 'Skill Gap Detected';
    }
    // Why explanation list
    const whyPoints = [];
    if (student.cgpa >= job.minimum_cgpa) {
        whyPoints.push(`CGPA ${student.cgpa.toFixed(1)} exceeds required minimum ${job.minimum_cgpa.toFixed(1)}`);
    }
    whyPoints.push(...positiveSkillFactors.slice(0, 3));
    if (matchingProjects.length > 0) {
        whyPoints.push(`Relevant project found: "${matchingProjects[0].title}"`);
    }
    if (student.assessment.technical >= 75) {
        whyPoints.push(`High technical assessment score (${student.assessment.technical}%)`);
    }
    return {
        student_id: student.id,
        student_name: student.name,
        student_branch: student.branch,
        student_cgpa: student.cgpa,
        job_id: job.id,
        company_name: job.company_name,
        job_title: job.title,
        match_score: finalScore,
        readiness_score: readiness,
        eligible: student.cgpa >= job.minimum_cgpa && student.backlog_count === 0,
        status,
        recommendationLabel,
        explanation: {
            overall_match: `${finalScore}% — ${recommendationLabel}`,
            why: whyPoints,
            skill_gaps: skillGaps,
            weights,
            components: {
                eligibilityScore: Math.round(eligibilityScore),
                skillMatchScore: Math.round(skillMatchScore),
                projectScore: Math.round(projectScore),
                certScore: Math.round(certScore),
                assessmentScore: Math.round(avgAssessment),
                readinessScore: readiness,
            },
        },
    };
}
// 4. Conflict Detection Algorithm
function detectDriveConflicts() {
    const conflicts = [];
    // Check all pairs of drives for time overlap
    for (let i = 0; i < drives.length; i++) {
        for (let j = i + 1; j < drives.length; j++) {
            const d1 = drives[i];
            const d2 = drives[j];
            if (d1.date === d2.date) {
                // Convert HH:mm to minutes
                const toMin = (t) => {
                    const [h, m] = t.split(':').map(Number);
                    return h * 60 + m;
                };
                const start1 = toMin(d1.start_time);
                const end1 = toMin(d1.end_time);
                const start2 = toMin(d2.start_time);
                const end2 = toMin(d2.end_time);
                // Overlap condition
                if (Math.max(start1, start2) < Math.min(end1, end2)) {
                    // Find students shortlisted for both
                    const overlappingStudents = students.filter((s) => s.shortlistedDrives.includes(d1.id) && s.shortlistedDrives.includes(d2.id));
                    if (overlappingStudents.length > 0) {
                        conflicts.push({
                            conflict_id: `conf-${d1.id}-${d2.id}`,
                            drive1: d1,
                            drive2: d2,
                            date: d1.date,
                            time_range_1: `${d1.start_time} - ${d1.end_time}`,
                            time_range_2: `${d2.start_time} - ${d2.end_time}`,
                            affected_students: overlappingStudents.map((s) => ({
                                id: s.id,
                                name: s.name,
                                email: s.email,
                                branch: s.branch,
                            })),
                            message: `${overlappingStudents[0].name} is scheduled for two placement drives at overlapping times.`,
                            suggested_resolution: {
                                target_drive_id: d2.id,
                                company_name: d2.company_name,
                                new_start_time: '14:00',
                                new_end_time: '16:00',
                                description: `Move ${d2.company_name} drive to afternoon slot: 14:00 - 16:00 (prevents overlap with ${d1.company_name}).`,
                            },
                        });
                    }
                }
            }
        }
    }
    return conflicts;
}
// ==========================================
// REST API ENDPOINTS
// ==========================================

// Seeded Users Store
let users = [
    {
        id: 'u-admin',
        name: 'Dr. Suresh Verma',
        email: 'admin@campuslink.com',
        password: 'password123',
        role: 'Placement Officer',
        avatar: 'SV',
        department: 'Training & Placement Cell',
    },
    {
        id: 's1',
        name: 'Aarav Sharma',
        email: 'student@campuslink.com',
        password: 'password123',
        role: 'Student',
        student_id: 'CS2022-041',
        branch: 'CSE',
        avatar: 'AS',
    },
    {
        id: 'u-recruiter-1',
        name: 'Priya Sundaram',
        email: 'recruiter@campuslink.com',
        password: 'password123',
        role: 'Corporate Recruiter',
        avatar: 'PS',
        company_name: 'TechNova Solutions',
    },
];

// Auth: Available Demo Users
app.get('/api/auth/users/', (req, res) => {
    res.json(users.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role, avatar: u.avatar, company_name: u.company_name })));
});

// Auth: Login Endpoint
app.post(['/api/auth/login/', '/api/login/'], (req, res) => {
    const { email, password, role } = req.body;

    // Fast-path role switcher or admin login
    if (role === 'admin' || (email && email.toLowerCase() === 'admin@campuslink.com')) {
        const adminUser = users.find(u => u.role === 'Placement Officer') || users[0];
        return res.json({
            user: adminUser,
            token: 'demo-admin-jwt-token',
        });
    }

    if (role === 'recruiter' || (email && email.toLowerCase() === 'recruiter@campuslink.com')) {
        const recUser = users.find(u => u.role === 'Corporate Recruiter') || users[2];
        return res.json({
            user: recUser,
            token: 'demo-recruiter-jwt-token',
        });
    }

    // Try finding by email in users list
    let matchedUser = users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
    
    // Check in students list if not found
    if (!matchedUser && email) {
        const studentMatch = students.find(s => s.email.toLowerCase() === email.toLowerCase());
        if (studentMatch) {
            matchedUser = {
                id: studentMatch.id,
                name: studentMatch.name,
                email: studentMatch.email,
                role: 'Student',
                student_id: studentMatch.student_id,
                branch: studentMatch.branch,
                avatar: studentMatch.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase(),
            };
        }
    }

    if (matchedUser) {
        return res.json({
            user: matchedUser,
            token: `token-${matchedUser.id}`,
        });
    }

    // Default to Aarav Sharma if role is student or demo fallback
    const student = students[0];
    return res.json({
        user: {
            id: student.id,
            name: student.name,
            email: student.email,
            role: 'Student',
            student_id: student.student_id,
            branch: student.branch,
            avatar: 'AS',
        },
        token: 'demo-student-jwt-token',
    });
});

// Auth: Sign Up Endpoint
app.post('/api/auth/signup/', (req, res) => {
    const { name, email, password, role, branch, student_id, cgpa, graduation_year, company_name } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required.' });
    }

    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
        return res.status(400).json({ error: 'An account with this email already exists. Please log in.' });
    }

    const avatar = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U';
    const userRole = role === 'admin' ? 'Placement Officer' : role === 'recruiter' ? 'Corporate Recruiter' : 'Student';
    
    let createdUserId = `u-${Date.now()}`;

    // If student, create a full student profile in the database
    if (userRole === 'Student') {
        const newStudentId = `s${students.length + 1}`;
        createdUserId = newStudentId;

        const newStudent = {
            id: newStudentId,
            name: name.trim(),
            email: email.trim().toLowerCase(),
            student_id: student_id || `CS2022-${Math.floor(100 + Math.random() * 900)}`,
            branch: branch || 'CSE',
            graduation_year: Number(graduation_year) || 2026,
            cgpa: Number(cgpa) || 8.0,
            backlog_count: 0,
            skills: [
                { name: 'Python', proficiency: 80 },
                { name: 'SQL', proficiency: 75 },
                { name: 'Git', proficiency: 70 },
                { name: 'Problem Solving', proficiency: 75 },
            ],
            projects: [
                {
                    title: 'Academic Capstone Project',
                    description: 'Full-stack software application built with modern engineering workflows.',
                    technologies: ['Python', 'SQL', 'Git'],
                },
            ],
            certifications: ['Certified Student Developer'],
            assessment: { aptitude: 78, technical: 80, interview: 70, communication: 75 },
            shortlistedDrives: [],
        };
        students.push(newStudent);
    }

    const newUser = {
        id: createdUserId,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password || 'demo123',
        role: userRole,
        avatar,
        student_id: userRole === 'Student' ? (student_id || createdUserId) : undefined,
        branch: userRole === 'Student' ? (branch || 'CSE') : undefined,
        company_name: userRole === 'Corporate Recruiter' ? (company_name || 'Partner Org') : undefined,
    };

    users.push(newUser);

    res.status(201).json({
        user: newUser,
        token: `token-${newUser.id}`,
        message: 'Account successfully registered!',
    });
});

// Students List & Details
app.get('/api/students/', (req, res) => {
    const data = students.map((s) => {
        const readiness = calculateStudentReadiness(s);
        return {
            ...s,
            readiness_score: readiness.score,
            readiness_status: readiness.status,
        };
    });
    res.json(data);
});

// Create or Upsert Student Profile
app.post('/api/students/', (req, res) => {
    const body = req.body;
    let index = -1;
    if (body.id) index = students.findIndex((s) => s.id === body.id);
    if (index === -1 && body.email) {
        index = students.findIndex((s) => s.email.toLowerCase() === body.email.toLowerCase());
    }

    if (index !== -1) {
        const existing = students[index];
        const updated = { ...existing, ...body, id: existing.id };
        if (body.cgpa !== undefined) updated.cgpa = Number(body.cgpa);
        if (body.backlog_count !== undefined) updated.backlog_count = Number(body.backlog_count);
        if (body.graduation_year !== undefined) updated.graduation_year = Number(body.graduation_year);
        const readiness = calculateStudentReadiness(updated);
        updated.readiness_score = readiness.score;
        updated.readiness_status = readiness.status;
        students[index] = updated;

        // Sync with users store
        const uIdx = users.findIndex(u => u.id === updated.id || u.email.toLowerCase() === updated.email.toLowerCase());
        if (uIdx !== -1) {
            users[uIdx].name = updated.name;
            users[uIdx].email = updated.email;
            users[uIdx].branch = updated.branch;
            users[uIdx].student_id = updated.student_id;
        }

        return res.json({ ...updated, readiness, readiness_score: readiness.score, readiness_status: readiness.status });
    }

    const newId = body.id || `s${students.length + 1}`;
    const newStudent = {
        id: newId,
        name: body.name || 'New Candidate',
        email: (body.email || `candidate-${Date.now()}@campuslink.com`).toLowerCase(),
        student_id: body.student_id || `CS2022-${Math.floor(100 + Math.random() * 900)}`,
        branch: body.branch || 'CSE',
        graduation_year: Number(body.graduation_year) || 2026,
        cgpa: Number(body.cgpa) || 8.0,
        backlog_count: Number(body.backlog_count) || 0,
        skills: Array.isArray(body.skills) && body.skills.length > 0 ? body.skills : [
            { name: 'Python', proficiency: 80 },
            { name: 'SQL', proficiency: 75 }
        ],
        projects: Array.isArray(body.projects) ? body.projects : [],
        certifications: Array.isArray(body.certifications) ? body.certifications : [],
        assessment: body.assessment || { aptitude: 75, technical: 80, interview: 70, communication: 75 },
        shortlistedDrives: body.shortlistedDrives || [],
    };

    const readiness = calculateStudentReadiness(newStudent);
    newStudent.readiness_score = readiness.score;
    newStudent.readiness_status = readiness.status;
    students.push(newStudent);

    res.status(201).json({ ...newStudent, readiness, readiness_score: readiness.score, readiness_status: readiness.status });
});

// Update Student Profile
app.put(['/api/students/:id/', '/api/students/'], (req, res) => {
    const targetId = req.params.id || req.body.id;
    let index = -1;
    if (targetId) {
        index = students.findIndex((s) => s.id === targetId);
    }
    if (index === -1 && req.body.email) {
        index = students.findIndex((s) => s.email.toLowerCase() === req.body.email.toLowerCase());
    }

    if (index === -1) {
        // Fallback: create student if not found
        const newId = targetId || `s${students.length + 1}`;
        const created = {
            id: newId,
            name: req.body.name || 'Student Candidate',
            email: (req.body.email || 'student@campuslink.com').toLowerCase(),
            student_id: req.body.student_id || `CS2022-${Math.floor(100 + Math.random() * 900)}`,
            branch: req.body.branch || 'CSE',
            graduation_year: Number(req.body.graduation_year) || 2026,
            cgpa: Number(req.body.cgpa) || 8.0,
            backlog_count: Number(req.body.backlog_count) || 0,
            skills: Array.isArray(req.body.skills) ? req.body.skills : [],
            projects: Array.isArray(req.body.projects) ? req.body.projects : [],
            certifications: Array.isArray(req.body.certifications) ? req.body.certifications : [],
            assessment: req.body.assessment || { aptitude: 75, technical: 80, interview: 70, communication: 75 },
            shortlistedDrives: [],
        };
        const readiness = calculateStudentReadiness(created);
        created.readiness_score = readiness.score;
        created.readiness_status = readiness.status;
        students.push(created);
        return res.status(201).json({
            ...created,
            readiness,
            readiness_score: readiness.score,
            readiness_status: readiness.status,
            message: 'Student profile created!',
        });
    }

    const existing = students[index];
    const updated = {
        ...existing,
        ...req.body,
        id: existing.id,
    };

    if (req.body.cgpa !== undefined) updated.cgpa = Number(req.body.cgpa);
    if (req.body.backlog_count !== undefined) updated.backlog_count = Number(req.body.backlog_count);
    if (req.body.graduation_year !== undefined) updated.graduation_year = Number(req.body.graduation_year);

    const readiness = calculateStudentReadiness(updated);
    updated.readiness_score = readiness.score;
    updated.readiness_status = readiness.status;
    students[index] = updated;

    // Sync with users store
    const uIdx = users.findIndex(u => u.id === updated.id || u.email.toLowerCase() === updated.email.toLowerCase());
    if (uIdx !== -1) {
        users[uIdx].name = updated.name;
        users[uIdx].email = updated.email;
        users[uIdx].branch = updated.branch;
        users[uIdx].student_id = updated.student_id;
    }

    res.json({
        ...updated,
        readiness,
        readiness_score: readiness.score,
        readiness_status: readiness.status,
        message: 'Student profile updated successfully!',
    });
});


app.get('/api/students/:id/', (req, res) => {
    const student = students.find((s) => s.id === req.params.id);
    if (!student)
        return res.status(404).json({ error: 'Student not found' });
    const readiness = calculateStudentReadiness(student);
    res.json({
        ...student,
        readiness,
    });
});

app.get('/api/students/:id/readiness/', (req, res) => {
    const student = students.find((s) => s.id === req.params.id);
    if (!student)
        return res.status(404).json({ error: 'Student not found' });
    const readiness = calculateStudentReadiness(student);
    res.json(readiness);
});

// ---------- AI Engine (Groq with Multiple Fallbacks) ----------
async function askGroqJson(prompt) {
    const modelsToTry = [
        process.env.GROQ_MODEL || 'openai/gpt-oss-120b',
        'openai/gpt-oss-20b',
        'qwen/qwen3.8-27b',
    ];
    let lastError = null;

    for (const model of modelsToTry) {
        try {
            const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                },
                body: JSON.stringify({
                    model,
                    temperature: 0.3,
                    response_format: { type: 'json_object' },
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a campus placement and resume parsing AI engine. Reply ONLY with valid JSON matching the requested schema. Be precise, accurate, and concise.',
                        },
                        { role: 'user', content: prompt },
                    ],
                }),
            });

            if (!res.ok) {
                lastError = new Error(`Groq ${model} error ${res.status}: ${await res.text()}`);
                continue;
            }

            const data = await res.json();
            const raw = data.choices?.[0]?.message?.content ?? '{}';
            return JSON.parse(raw);
        } catch (err) {
            lastError = err;
        }
    }
    throw lastError || new Error('All Groq models failed');
}

function fallbackAIReadiness(readiness) {
    return {
        summary: readiness.recommendation,
        strengths: readiness.positiveFactors,
        gaps: readiness.improvementAreas,
        action_plan: readiness.improvementAreas.slice(0, 4).map((a, i) => ({
            step: a,
            timeframe: i < 2 ? 'Next 2 weeks' : 'Next 4 weeks',
        })),
        interview_tips: ['Revise core fundamentals for your top skills', 'Practice explaining your projects in 2 minutes'],
    };
}

// Fallback Resume Parser using rule-based NLP extraction
function fallbackParseResume(text) {
    const raw = text || '';
    const emailMatch = raw.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const email = emailMatch ? emailMatch[0] : 'student@campuslink.com';

    let name = 'Aditi Rao';
    const lines = raw.split('\n').map((l) => l.trim()).filter(Boolean);
    const nameLine = lines.find((l) => /^name[:\s]/i.test(l));
    if (nameLine) {
        name = nameLine.replace(/^name[:\s]+/i, '').trim();
    } else if (lines.length > 0 && lines[0].length < 35 && !/resume|cv|curriculum|profile/i.test(lines[0])) {
        name = lines[0];
    }

    let cgpa = 8.3;
    const cgpaMatch = raw.match(/(?:cgpa|gpa|pointer|percentage)[\s:=]*(\d(?:\.\d+)?)/i);
    if (cgpaMatch) {
        cgpa = parseFloat(cgpaMatch[1]);
        if (cgpa > 10) cgpa = parseFloat((cgpa / 10).toFixed(1));
    }

    let branch = 'CSE';
    if (/data\s*science|ai\s*&\s*ds/i.test(raw)) branch = 'AIDS';
    else if (/information\s*technology|\bit\b/i.test(raw)) branch = 'IT';
    else if (/electronics|ece/i.test(raw)) branch = 'ECE';
    else if (/mechanical/i.test(raw)) branch = 'MECH';
    else if (/civil/i.test(raw)) branch = 'CIVIL';
    else if (/computer\s*science|cse/i.test(raw)) branch = 'CSE';

    const rollMatch = raw.match(/(?:roll|id|student\s*id|reg(?:istration)?\s*no)[\s:=]*([a-zA-Z0-9-]+)/i);
    const student_id = rollMatch ? rollMatch[1].toUpperCase() : `${branch}2022-${Math.floor(100 + Math.random() * 900)}`;

    const techCatalog = [
        'Python', 'Java', 'C++', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'Django',
        'FastAPI', 'Spring Boot', 'SQL', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker',
        'Kubernetes', 'Git', 'Linux', 'Machine Learning', 'TensorFlow', 'PyTorch',
        'Power BI', 'Tableau', 'Excel', 'Pandas', 'HTML', 'CSS', 'Tailwind',
        'Next.js', 'Express', 'Redis', 'GraphQL', 'Android', 'Flutter'
    ];
    
    const detectedSkills = [];
    techCatalog.forEach((skill) => {
        const regex = new RegExp(`\\b${skill.replace('+', '\\+')}\\b`, 'i');
        if (regex.test(raw)) {
            const proficiency = 72 + Math.floor(Math.random() * 20);
            detectedSkills.push({ name: skill, proficiency });
        }
    });

    if (detectedSkills.length === 0) {
        detectedSkills.push(
            { name: 'Python', proficiency: 85 },
            { name: 'SQL', proficiency: 80 },
            { name: 'React', proficiency: 75 },
            { name: 'Git', proficiency: 70 }
        );
    }

    const projects = [
        {
            title: 'Campus Placement & Analytics Engine',
            description: 'Scalable web application automating candidate readiness, scheduling, and analytics.',
            technologies: detectedSkills.slice(0, 3).map((s) => s.name),
        },
        {
            title: 'Distributed Data Intelligence Pipeline',
            description: 'Automated data transformation service with interactive analytics and API integration.',
            technologies: detectedSkills.slice(1, 4).map((s) => s.name),
        },
    ];

    const certs = [];
    if (/aws|cloud/i.test(raw)) certs.push('AWS Certified Cloud Practitioner');
    if (/data|analytics/i.test(raw)) certs.push('Google Data Analytics Professional Certificate');
    if (/meta|backend/i.test(raw)) certs.push('Meta Professional Developer Certificate');
    if (certs.length === 0) certs.push('HackerRank Problem Solving (Gold)');

    return {
        name,
        email,
        student_id,
        branch,
        graduation_year: 2026,
        cgpa,
        backlog_count: 0,
        skills: detectedSkills,
        projects,
        certifications: certs,
        assessment: {
            aptitude: Math.min(95, Math.max(68, Math.round(cgpa * 10 - 2))),
            technical: Math.min(95, Math.max(70, Math.round(detectedSkills[0]?.proficiency || 82))),
            interview: 72,
            communication: 78,
        },
        summary: `Strong candidate from ${branch} with proven aptitude in ${detectedSkills.slice(0, 3).map((s) => s.name).join(', ')} and a consistent academic record (CGPA ${cgpa}).`,
        key_strengths: [
            `Strong grasp of ${detectedSkills[0]?.name || 'core technologies'} (${detectedSkills[0]?.proficiency || 85}% proficiency)`,
            `Consistent academic performance with CGPA ${cgpa} and zero backlogs`,
            `Hands-on project experience in ${branch} software development`,
        ],
        recommended_focus: 'Practice mock system design interviews and cloud containerization deployment.',
    };
}

// POST: AI Parse Resume / Extract Student Details from Text
app.post('/api/ai/parse-resume/', async (req, res) => {
    const { resume_text } = req.body;
    if (!resume_text || resume_text.trim().length === 0) {
        return res.status(400).json({ error: 'Please provide resume or profile text to analyze.' });
    }

    if (!process.env.GROQ_API_KEY) {
        const parsed = fallbackParseResume(resume_text);
        return res.json({ ...parsed, source: 'rule-based', note: 'GROQ_API_KEY not configured' });
    }

    const prompt = `You are a placement ATS & resume extraction assistant.
Extract the student's profile details from the resume/bio text below into a structured JSON object.

RESUME TEXT:
"""
${resume_text.slice(0, 4000)}
"""

REQUIREMENTS:
- "name": string (full name)
- "email": string
- "student_id": string (roll number / student ID if found, else reasonable format like "CS2022-XXX")
- "branch": string (e.g., "CSE", "IT", "ECE", "MECH", "CIVIL", "AIDS")
- "graduation_year": number (e.g., 2026)
- "cgpa": number (out of 10.0, e.g., 8.4)
- "backlog_count": number (default 0)
- "skills": array of objects [{"name": string, "proficiency": number from 40 to 95}] (extract 4 to 8 technical skills)
- "projects": array of objects [{"title": string, "description": string, "technologies": string[]}] (up to 3)
- "certifications": string[] (up to 3)
- "assessment": {"aptitude": number (60-95), "technical": number (60-95), "interview": number (60-90), "communication": number (60-95)}
- "summary": string (2-sentence executive summary)
- "key_strengths": string[] (3 bullet points)
- "recommended_focus": string (1 actionable piece of advice)

Return ONLY valid JSON matching this schema.`;

    try {
        const aiResult = await askGroqJson(prompt);
        // Validate required keys
        if (!aiResult.name || !Array.isArray(aiResult.skills)) {
            throw new Error('AI returned incomplete schema');
        }
        res.json({ ...aiResult, source: 'groq' });
    } catch (err) {
        console.error('Groq resume parse error, falling back:', err.message);
        const parsed = fallbackParseResume(resume_text);
        res.json({ ...parsed, source: 'rule-based-fallback', note: 'AI parsed via fallback NLP parser' });
    }
});

// POST: AI Parse Job Description (Recruiter helper)
app.post('/api/ai/parse-job/', async (req, res) => {
    const { job_text } = req.body;
    if (!job_text || job_text.trim().length === 0) {
        return res.status(400).json({ error: 'Please provide job description text.' });
    }

    const prompt = `Extract structured job opening details from the following job description.

JOB DESCRIPTION:
"""
${job_text.slice(0, 3000)}
"""

Return JSON with exact structure:
{
  "company_name": string,
  "title": string,
  "description": string (concise 2-sentence summary),
  "minimum_cgpa": number (default 7.0 if unstated),
  "ctc": string (e.g. "₹8.5 LPA"),
  "vacancies": number (default 10),
  "required_skills": [{"name": string, "min_proficiency": number (60 to 80)}],
  "eligible_branches": string[] (e.g. ["CSE", "IT", "ECE"])
}`;

    try {
        if (!process.env.GROQ_API_KEY) throw new Error('No Groq key');
        const aiResult = await askGroqJson(prompt);
        res.json({ ...aiResult, source: 'groq' });
    } catch (err) {
        // Fallback job parser
        res.json({
            company_name: 'Campus Partner Co',
            title: 'Graduate Software Engineer',
            description: job_text.slice(0, 180),
            minimum_cgpa: 7.0,
            ctc: '₹8.0 LPA',
            vacancies: 10,
            required_skills: [
                { name: 'Python', min_proficiency: 70 },
                { name: 'SQL', min_proficiency: 70 },
                { name: 'Git', min_proficiency: 65 },
            ],
            eligible_branches: ['CSE', 'IT', 'ECE'],
            source: 'rule-based-fallback',
        });
    }
});

app.post('/api/students/:id/ai-readiness/', async (req, res) => {
    const student = students.find((s) => s.id === req.params.id);
    if (!student)
        return res.status(404).json({ error: 'Student not found' });
    const readiness = calculateStudentReadiness(student);
    if (!process.env.GROQ_API_KEY) {
        return res.json({ ...fallbackAIReadiness(readiness), source: 'rule-based', note: 'GROQ_API_KEY not set' });
    }
    const prompt = `Evaluate this student's placement readiness.
Student: ${student.name}, ${student.branch}, graduating ${student.graduation_year}, CGPA ${student.cgpa}, backlogs ${student.backlog_count}.
Skills (proficiency/100): ${student.skills.map((s) => `${s.name} ${s.proficiency}`).join(', ')}.
Projects: ${(student.projects || []).map((p) => `${p.title} [${(p.technologies || []).join(', ')}]`).join('; ') || 'none'}.
Computed readiness score: ${readiness.score}/100 (${readiness.status}). Breakdown: ${JSON.stringify(readiness.breakdown)}.
Return JSON: {"summary": string (2-3 sentences), "strengths": string[3], "gaps": string[3], "action_plan": [{"step": string, "timeframe": string}] (4 items), "interview_tips": string[3]}`;
    try {
        const ai = await askGroqJson(prompt);
        res.json({ ...ai, source: 'groq' });
    }
    catch (err) {
        console.error(err);
        res.json({ ...fallbackAIReadiness(readiness), source: 'rule-based', note: 'Groq unavailable, showing rule-based insights' });
    }
});

app.get('/api/students/:id/skill-gaps/', (req, res) => {
    const student = students.find((s) => s.id === req.params.id);
    if (!student)
        return res.status(404).json({ error: 'Student not found' });
    const role = req.query.role || 'Software Engineer';
    const gaps = analyzeSkillGaps(student, role);
    res.json(gaps);
});

// Jobs List & Creation
app.get('/api/jobs/', (req, res) => {
    res.json(jobs);
});

app.post('/api/jobs/', (req, res) => {
    const { company_name, title, description, minimum_cgpa, required_skills, ctc, vacancies, deadline } = req.body;
    const newJob = {
        id: `j${jobs.length + 1}`,
        recruiter_id: `r${Date.now()}`,
        company_name: company_name || 'TechNova Corporate',
        title: title || 'Graduate Software Trainee',
        description: description || 'Responsible for software feature development and system quality.',
        minimum_cgpa: Number(minimum_cgpa) || 7.0,
        required_skills: Array.isArray(required_skills) && required_skills.length > 0 
            ? required_skills 
            : [{ name: 'Problem Solving', min_proficiency: 70 }, { name: 'Python', min_proficiency: 70 }],
        ctc: ctc || '₹7.5 LPA',
        deadline: deadline || '2026-11-30',
        vacancies: Number(vacancies) || 10,
    };
    jobs.unshift(newJob);

    // Also register an upcoming placement drive
    const newDrive = {
        id: `d${drives.length + 1}`,
        job_id: newJob.id,
        company_name: newJob.company_name,
        date: '2026-11-24',
        start_time: '10:00',
        end_time: '12:00',
        location: 'Campus Placement Lab 1',
        status: 'UPCOMING',
        shortlisted_count: 0,
        registered_count: students.length,
    };
    drives.unshift(newDrive);

    res.status(201).json({ job: newJob, drive: newDrive, message: 'Job and Drive created successfully!' });
});

// Recruiters List
app.get('/api/recruiters/', (req, res) => {
    res.json(recruiters);

});
// AI-Assisted Matching
app.post('/api/matching/run/', (req, res) => {
    const { job_id } = req.body;
    const targetJob = jobs.find((j) => j.id === job_id);
    if (!targetJob)
        return res.status(404).json({ error: 'Job not found' });
    const rankedCandidates = students
        .map((s) => calculateMatch(s, targetJob))
        .sort((a, b) => b.match_score - a.match_score);
    res.json({
        job: targetJob,
        total_candidates: rankedCandidates.length,
        matches: rankedCandidates,
    });
});
app.get('/api/matching/job/:jobId/', (req, res) => {
    const targetJob = jobs.find((j) => j.id === req.params.jobId);
    if (!targetJob)
        return res.status(404).json({ error: 'Job not found' });
    const rankedCandidates = students
        .map((s) => {
        const match = calculateMatch(s, targetJob);
        const isShortlisted = s.shortlistedDrives.includes(drives.find((d) => d.job_id === targetJob.id)?.id || '');
        return {
            ...match,
            is_shortlisted: isShortlisted,
        };
    })
        .sort((a, b) => b.match_score - a.match_score);
    res.json({
        job: targetJob,
        matches: rankedCandidates,
    });
});
app.get('/api/matching/student/:studentId/', (req, res) => {
    const student = students.find((s) => s.id === req.params.studentId);
    if (!student)
        return res.status(404).json({ error: 'Student not found' });
    const matchedJobs = jobs
        .map((j) => calculateMatch(student, j))
        .sort((a, b) => b.match_score - a.match_score);
    res.json({
        student,
        recommended_jobs: matchedJobs,
    });
});
// Candidate Shortlist toggle
app.post('/api/matching/shortlist/', (req, res) => {
    const { student_id, drive_id, shortlist } = req.body;
    const student = students.find((s) => s.id === student_id);
    if (!student)
        return res.status(404).json({ error: 'Student not found' });
    if (shortlist) {
        if (!student.shortlistedDrives.includes(drive_id)) {
            student.shortlistedDrives.push(drive_id);
            const drive = drives.find((d) => d.id === drive_id);
            if (drive) {
                notifications.unshift({
                    id: `notif-${Date.now()}`,
                    student_id: student.id,
                    message: `🔔 You have been shortlisted for ${drive.company_name} (${drive.role}).`,
                    date: 'Just now',
                    is_read: false,
                    type: 'shortlist',
                });
            }
        }
    }
    else {
        student.shortlistedDrives = student.shortlistedDrives.filter((id) => id !== drive_id);
    }
    res.json({ success: true, shortlistedDrives: student.shortlistedDrives });
});
// Placement Drives & Scheduling
app.get('/api/drives/', (req, res) => {
    res.json(drives);
});
app.post('/api/drives/', (req, res) => {
    const newDrive = {
        id: `d${drives.length + 1}`,
        ...req.body,
        status: 'SCHEDULED',
    };
    drives.push(newDrive);
    res.status(201).json(newDrive);
});
// Conflicts
app.get('/api/drives/:id/conflicts/', (req, res) => {
    const conflicts = detectDriveConflicts();
    const relevant = conflicts.filter((c) => c.drive1.id === req.params.id || c.drive2.id === req.params.id);
    res.json(relevant);
});
app.get('/api/conflicts/', (req, res) => {
    const conflicts = detectDriveConflicts();
    res.json(conflicts);
});
// Conflict Resolution
app.post('/api/drives/:id/resolve-conflict/', (req, res) => {
    const driveId = req.params.id;
    const targetDrive = drives.find((d) => d.id === driveId);
    if (!targetDrive)
        return res.status(404).json({ error: 'Drive not found' });
    // Update schedule
    targetDrive.start_time = req.body.new_start_time || '14:00';
    targetDrive.end_time = req.body.new_end_time || '16:00';
    // Add system notification for students
    notifications.unshift({
        id: `notif-${Date.now()}`,
        student_id: 's1',
        message: `✅ Drive Rescheduled: ${targetDrive.company_name} interview timing updated to ${targetDrive.start_time} - ${targetDrive.end_time}. Conflict resolved.`,
        date: 'Just now',
        is_read: false,
        type: 'schedule',
    });
    res.json({
        success: true,
        message: `Drive ${targetDrive.company_name} successfully rescheduled to ${targetDrive.start_time} - ${targetDrive.end_time}.`,
        updated_drive: targetDrive,
        remaining_conflicts: detectDriveConflicts(),
    });
});
// Offers Management
app.get('/api/offers/', (req, res) => {
    res.json(offers);
});
app.patch('/api/offers/:id/', (req, res) => {
    const offer = offers.find((o) => o.id === req.params.id);
    if (!offer)
        return res.status(404).json({ error: 'Offer not found' });
    if (req.body.status) {
        offer.status = req.body.status;
    }
    if (req.body.joining_date) {
        offer.joining_date = req.body.joining_date;
    }
    // Push notification if status changed by student
    notifications.unshift({
        id: `notif-${Date.now()}`,
        student_id: offer.student_id,
        message: `Offer from ${offer.company} is marked as ${offer.status}.`,
        date: 'Just now',
        is_read: false,
        type: 'offer',
    });
    res.json(offer);
});
// Notifications
app.get('/api/notifications/', (req, res) => {
    const studentId = req.query.student_id;
    if (studentId) {
        return res.json(notifications.filter((n) => n.student_id === studentId));
    }
    res.json(notifications);
});
app.patch('/api/notifications/:id/read', (req, res) => {
    const notif = notifications.find((n) => n.id === req.params.id);
    if (notif) {
        notif.is_read = true;
    }
    res.json({ success: true, notification: notif });
});
app.post('/api/notifications/mark-all-read', (req, res) => {
    notifications.forEach((n) => (n.is_read = true));
    res.json({ success: true });
});
// Analytics Dashboard Endpoint (Section 17 & 18)
app.get('/api/analytics/dashboard/', (req, res) => {
    const totalStudents = 500;
    const placementReady = students.filter((s) => calculateStudentReadiness(s).score >= 60).length;
    // Scaled for demo presentation
    const scaledReady = 372;
    const activeDrives = drives.length + 9;
    const totalOffers = 186;
    const placedStudents = 154;
    // At risk calculation: low readiness, backlogs, low interview
    const atRiskList = students
        .map((s) => {
        const read = calculateStudentReadiness(s);
        let riskScore = 0;
        const reasons = [];
        if (read.score < 50) {
            riskScore += 45;
            reasons.push('Low overall readiness score');
        }
        if (s.backlog_count > 0) {
            riskScore += 25;
            reasons.push(`${s.backlog_count} active backlogs`);
        }
        if (s.assessment.interview < 60) {
            riskScore += 20;
            reasons.push('Low mock interview score');
        }
        if (s.assessment.aptitude < 60) {
            riskScore += 15;
            reasons.push('Struggling in aptitude rounds');
        }
        let riskLevel = 'LOW';
        let action = 'Monitor regular milestone progress';
        if (riskScore >= 60) {
            riskLevel = 'HIGH';
            action = 'Assign 1-on-1 faculty mentor and recommend technical interview preparation';
        }
        else if (riskScore >= 35) {
            riskLevel = 'MEDIUM';
            action = 'Schedule communication bootcamp & project review';
        }
        return {
            id: s.id,
            name: s.name,
            branch: s.branch,
            cgpa: s.cgpa,
            risk_level: riskLevel,
            risk_score: Math.min(95, Math.max(15, riskScore)),
            main_reasons: reasons.slice(0, 3).join(', ') || 'Minor performance variance',
            recommended_action: action,
        };
    })
        .filter((item) => item.risk_level !== 'LOW')
        .sort((a, b) => b.risk_score - a.risk_score);
    const branchPlacement = [
        { branch: 'CSE', rate: 82, eligible: 160, placed: 131 },
        { branch: 'IT', rate: 78, eligible: 120, placed: 94 },
        { branch: 'ECE', rate: 65, eligible: 110, placed: 71 },
        { branch: 'EEE', rate: 54, eligible: 65, placed: 35 },
        { branch: 'Mechanical', rate: 46, eligible: 45, placed: 21 },
    ];
    const placementConversionTrend = [
        { month: 'Jul', registered: 480, assessed: 420, shortlisted: 120, offered: 35 },
        { month: 'Aug', registered: 495, assessed: 460, shortlisted: 210, offered: 82 },
        { month: 'Sep', registered: 500, assessed: 485, shortlisted: 320, offered: 145 },
        { month: 'Oct', registered: 500, assessed: 492, shortlisted: 380, offered: 186 },
    ];
    const salaryDistribution = [
        { range: '< 5 LPA', count: 18 },
        { range: '5 - 7 LPA', count: 52 },
        { range: '7 - 9 LPA', count: 74 },
        { range: '9 - 12 LPA', count: 32 },
        { range: '> 12 LPA', count: 10 },
    ];
    const topRecruiters = recruiters.map((r) => ({
        name: r.company_name,
        hires: r.hires_count,
        industry: r.industry,
        avgCtc: r.company_name === 'QuantumEdge' ? '10.5 LPA' : r.company_name === 'CloudWorks' ? '9.0 LPA' : '8.2 LPA',
    }));
    res.json({
        kpi: {
            total_students: totalStudents,
            placement_ready: scaledReady,
            active_drives: activeDrives,
            total_offers: totalOffers,
            placed_students: placedStudents,
            at_risk_count: 43,
            avg_package: '₹8.42 LPA',
            highest_package: '₹24.0 LPA',
        },
        branch_placement: branchPlacement,
        conversion_trend: placementConversionTrend,
        salary_distribution: salaryDistribution,
        top_recruiters: topRecruiters,
        at_risk_students: atRiskList,
        conflicts_count: detectDriveConflicts().length,
    });
});
// Reset / Re-seed endpoint for demo presentations
app.post('/api/demo/reset/', (req, res) => {
    // Reset DataSphere back to 11:00 to re-trigger conflict if needed
    const d2 = drives.find((d) => d.id === 'd2');
    if (d2) {
        d2.start_time = '11:00';
        d2.end_time = '13:00';
    }
    const s1 = students.find((s) => s.id === 's1');
    if (s1 && !s1.shortlistedDrives.includes('d2')) {
        s1.shortlistedDrives.push('d2');
    }
    res.json({ success: true, message: 'Demo environment reset with conflict primed.' });
});
// ==========================================
// VITE MIDDLEWARE SETUP & STATIC SERVING
// ==========================================
async function startServer() {
    const isProd = process.env.NODE_ENV === 'production';
    if (!isProd) {
        const { createServer: createViteServer } = await import('vite');
        const vite = await createViteServer({
            server: { middlewareMode: true },
            appType: 'spa',
        });
        app.use(vite.middlewares);
    }
    else {
        app.use(express.static(path.resolve(__dirname, 'dist')));
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
        });
    }
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`🚀 CAMPUSLINK server running on http://0.0.0.0:${PORT}`);
    });
}
if (!process.env.VERCEL) {
    startServer();
}
export default app;
