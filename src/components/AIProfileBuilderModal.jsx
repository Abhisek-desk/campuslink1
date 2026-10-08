import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Brain,
  Award,
  BookOpen,
  ArrowRight,
  RefreshCw,
  Lightbulb,
} from 'lucide-react';
import { api } from '../api';

const SAMPLE_RESUMES = {
  fullstack: `PRIYA SHARMA
Email: priya.s@campuslink.com | Phone: +91 9876543210
B.Tech Computer Science Engineering (Graduation: 2026) | CGPA: 8.65 / 10 | Backlogs: 0
Roll No: CS2022-114

TECHNICAL SKILLS:
Languages: Python, JavaScript, TypeScript, SQL, C++
Frameworks & Libraries: React, Node.js, Express, Django, Tailwind CSS, FastAPI
DevOps & Cloud: Docker, AWS (S3, EC2), Git, GitHub Actions, Linux
Databases: PostgreSQL, MongoDB, Redis

PROJECTS:
1. CloudCommerce: Distributed Microservices E-Commerce Platform
- Built scalable event-driven backend using Python FastAPI and React frontend.
- Deployed with Docker containers on AWS EC2 with Redis caching, reducing API latency by 45%.
2. Real-Time Collaborative Canvas
- Real-time whiteboard application with WebSockets, Node.js, and Canvas API.

CERTIFICATIONS:
- AWS Certified Cloud Practitioner
- HackerRank Python & Problem Solving (5 Stars)
- Meta Front-End Developer Specialization

ASSESSMENT & CO-CURRICULAR:
- Top 5% in College Coding Hackathon 2025
- Aptitude Percentile: 88% | Mock Technical Score: 86% | Communication: 82%`,

  datascience: `VIKRAM MENON
Email: vikram.m@campuslink.com | Phone: +91 9123456780
B.Tech AI & Data Science (Graduation: 2026) | CGPA: 8.8 / 10 | Backlogs: 0
Roll No: AIDS2022-052

TECHNICAL SKILLS:
Languages & Tools: Python, SQL, R, Excel (Advanced), Power BI, Tableau
Libraries: Pandas, NumPy, Scikit-Learn, PyTorch, Seaborn, Matplotlib
Core Domains: Machine Learning, Statistical Modeling, Predictive Analytics, EDA, ETL

PROJECTS:
1. Patient Readmission Predictive Engine
- Developed gradient boosting ML model in Python predicting 30-day hospital readmissions with 89% accuracy.
- Built interactive clinical risk dashboard in Power BI backed by PostgreSQL.
2. Market Basket Churn Intelligence
- Processed 1.5M transactions to find item associations using Apriori algorithm and Pandas.

CERTIFICATIONS:
- Google Data Analytics Professional Certificate
- IBM Machine Learning with Python Specialist
- Microsoft Certified: Power BI Data Analyst Associate`,

  devops: `ROHAN KULKARNI
Email: rohan.k@campuslink.com | Phone: +91 9988776655
B.Tech Information Technology (Graduation: 2026) | CGPA: 8.1 / 10 | Backlogs: 0
Roll No: IT2022-078

TECHNICAL SKILLS:
Cloud & Platforms: AWS (EC2, ECS, VPC, IAM), Linux (Ubuntu, RHEL), Docker, Kubernetes
CI/CD & IaC: Terraform, GitHub Actions, Jenkins, Ansible
Languages & Scripting: Bash, Python, Go, YAML
Monitoring: Prometheus, Grafana, CloudWatch

PROJECTS:
1. Automated Multi-Cloud Infrastructure Pipeline
- Architected zero-downtime CI/CD deployment pipelines using GitHub Actions, Docker, and AWS ECS.
- Automated Kubernetes cluster provisioning with Terraform modules.
2. Centralized Observability Stack
- Set up Prometheus & Grafana monitoring dashboards for 20+ microservices with automated Slack alerting.

CERTIFICATIONS:
- AWS Certified Solutions Architect - Associate
- Red Hat Certified System Administrator (RHCSA)`,
};

export const AIProfileBuilderModal = ({
  isOpen,
  onClose,
  initialStudent = null,
  onProfileSaved,
}) => {
  const [mode, setMode] = useState('extract'); // 'extract' | 'edit'
  const [rawText, setRawText] = useState('');
  const [extracting, setExtracting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Structured Profile Data
  const [profile, setProfile] = useState({
    id: initialStudent?.id || '',
    name: initialStudent?.name || '',
    email: initialStudent?.email || '',
    student_id: initialStudent?.student_id || '',
    branch: initialStudent?.branch || 'CSE',
    graduation_year: initialStudent?.graduation_year || 2026,
    cgpa: initialStudent?.cgpa || 8.0,
    backlog_count: initialStudent?.backlog_count || 0,
    skills: initialStudent?.skills || [
      { name: 'Python', proficiency: 80 },
      { name: 'SQL', proficiency: 75 },
    ],
    projects: initialStudent?.projects || [],
    certifications: initialStudent?.certifications || [],
    assessment: initialStudent?.assessment || {
      aptitude: 75,
      technical: 80,
      interview: 70,
      communication: 75,
    },
    summary: '',
    key_strengths: [],
  });

  // Synchronize profile state when modal opens or initialStudent changes
  React.useEffect(() => {
    if (isOpen && initialStudent) {
      setProfile({
        id: initialStudent.id || '',
        name: initialStudent.name || '',
        email: initialStudent.email || '',
        student_id: initialStudent.student_id || '',
        branch: initialStudent.branch || 'CSE',
        graduation_year: initialStudent.graduation_year || 2026,
        cgpa: initialStudent.cgpa !== undefined ? Number(initialStudent.cgpa) : 8.0,
        backlog_count: initialStudent.backlog_count !== undefined ? Number(initialStudent.backlog_count) : 0,
        skills: Array.isArray(initialStudent.skills) && initialStudent.skills.length > 0 ? [...initialStudent.skills] : [],
        projects: Array.isArray(initialStudent.projects) ? [...initialStudent.projects] : [],
        certifications: Array.isArray(initialStudent.certifications) ? [...initialStudent.certifications] : [],
        assessment: initialStudent.assessment || { aptitude: 78, technical: 80, interview: 72, communication: 75 },
        summary: initialStudent.summary || '',
        key_strengths: initialStudent.key_strengths || [],
      });
    }
  }, [isOpen, initialStudent]);

  // New Skill / Project temp state
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillProf, setNewSkillProf] = useState(75);
  const [newCert, setNewCert] = useState('');

  if (!isOpen) return null;

  // Run AI Resume / Detail Extraction
  const handleExtractWithAI = async () => {
    if (!rawText.trim()) {
      setError('Please paste your resume, LinkedIn bio, or skills overview.');
      return;
    }

    setExtracting(true);
    setError('');
    setSuccess('');

    try {
      const data = await api.parseResumeWithAI(rawText);

      // Preserve current student id!
      const currentId = profile.id || initialStudent?.id || '';

      setProfile((prev) => ({
        ...prev,
        id: currentId,
        name: data.name || prev.name || 'Student Candidate',
        email: data.email || prev.email || 'student@campuslink.com',
        student_id: data.student_id || prev.student_id || 'CS2022-041',
        branch: data.branch || prev.branch || 'CSE',
        graduation_year: data.graduation_year || prev.graduation_year || 2026,
        cgpa: data.cgpa !== undefined ? Number(data.cgpa) : prev.cgpa,
        backlog_count: data.backlog_count !== undefined ? Number(data.backlog_count) : prev.backlog_count,
        skills: Array.isArray(data.skills) && data.skills.length > 0 ? data.skills : prev.skills,
        projects: Array.isArray(data.projects) && data.projects.length > 0 ? data.projects : prev.projects,
        certifications: Array.isArray(data.certifications) && data.certifications.length > 0 ? data.certifications : prev.certifications,
        assessment: data.assessment || prev.assessment,
        summary: data.summary || '',
        key_strengths: data.key_strengths || [],
      }));

      setMode('edit');
      setSuccess('Resume successfully parsed with AI! Review and customize your profile below.');
    } catch (err) {
      setError(err.message || 'AI parsing encountered an error. Please try again.');
    } finally {
      setExtracting(false);
    }
  };

  // Quick Sample Loader
  const loadSample = (key) => {
    setRawText(SAMPLE_RESUMES[key]);
    setError('');
  };

  // Add / Remove Skills
  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    if (profile.skills.some((s) => s.name.toLowerCase() === newSkillName.trim().toLowerCase())) {
      setError('This skill is already in your profile.');
      return;
    }
    setProfile((prev) => ({
      ...prev,
      skills: [...prev.skills, { name: newSkillName.trim(), proficiency: Number(newSkillProf) }],
    }));
    setNewSkillName('');
    setError('');
  };

  const handleRemoveSkill = (skillName) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.name !== skillName),
    }));
  };

  const handleSkillProfChange = (index, val) => {
    const updated = [...profile.skills];
    updated[index].proficiency = Number(val);
    setProfile((prev) => ({ ...prev, skills: updated }));
  };

  // AI Suggest in-demand skill
  const handleSuggestSkill = (skillName, prof = 80) => {
    if (profile.skills.some((s) => s.name.toLowerCase() === skillName.toLowerCase())) return;
    setProfile((prev) => ({
      ...prev,
      skills: [...prev.skills, { name: skillName, proficiency: prof }],
    }));
  };

  // Add Certification
  const handleAddCert = () => {
    if (!newCert.trim()) return;
    setProfile((prev) => ({
      ...prev,
      certifications: [...prev.certifications, newCert.trim()],
    }));
    setNewCert('');
  };

  const handleRemoveCert = (index) => {
    setProfile((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  // Calculate live preview readiness score
  const calcPreviewScore = () => {
    const academic = Math.max(0, Math.min(100, (profile.cgpa / 10) * 100 - (profile.backlog_count || 0) * 15));
    const avgTech = profile.skills.length > 0
      ? profile.skills.reduce((a, b) => a + (b.proficiency || 70), 0) / profile.skills.length
      : 65;
    const projCount = (profile.projects || []).length;
    const proj = projCount === 0 ? 45 : Math.min(100, 55 + projCount * 22);
    const certCount = (profile.certifications || []).length;
    const cert = certCount === 0 ? 45 : Math.min(100, 55 + certCount * 22);
    const apt = profile.assessment?.aptitude || 78;
    const tech = profile.assessment?.technical || 72;
    const comm = profile.assessment?.communication || 75;

    const total = academic * 0.2 + avgTech * 0.25 + proj * 0.15 + cert * 0.1 + apt * 0.1 + tech * 0.1 + comm * 0.1;
    const score = Math.max(25, Math.min(99, Math.round(total)));
    let status = 'NOT READY';
    if (score >= 80) status = 'HIGHLY EMPLOYABLE';
    else if (score >= 60) status = 'READY';
    else if (score >= 40) status = 'DEVELOPING';
    return { score, status };
  };

  const preview = calcPreviewScore();

  // Save profile to backend
  const handleSaveProfile = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const targetId = profile.id || initialStudent?.id || '';
      const payload = {
        ...profile,
        id: targetId,
      };

      let savedStudent;
      if (targetId) {
        savedStudent = await api.updateStudent(targetId, payload);
      } else {
        savedStudent = await api.createStudent(payload);
      }

      setSuccess('Profile successfully updated & synced with corporate matching engine!');
      if (onProfileSaved) {
        onProfileSaved(savedStudent);
      }
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (err) {
      setError(err.message || 'Failed to save profile details.');
    } finally {
      setSaving(false);
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-slate-900 dark:text-slate-100 flex flex-col max-h-[90vh]">
        {/* Modal Top Header */}
        <div className="p-6 pb-4 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white flex-shrink-0 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-lg bg-indigo-600 text-white">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              AI Student Profile Builder & Resume Extractor
            </span>
          </div>

          <h2 className="text-xl font-extrabold tracking-tight text-white">
            Add & Enhance Your Placement Details With AI
          </h2>
          <p className="text-xs text-indigo-200 mt-0.5">
            Extract skills, projects, and CGPA from your resume or customize them to maximize your employability score.
          </p>

          {/* Mode Switcher */}
          <div className="flex gap-2 mt-4">
            <button
              type="button"
              onClick={() => setMode('extract')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                mode === 'extract'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'bg-white/10 text-white/80 hover:text-white'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>1. AI Resume / Text Extractor</span>
            </button>

            <button
              type="button"
              onClick={() => setMode('edit')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                mode === 'edit'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'bg-white/10 text-white/80 hover:text-white'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>2. Review & Edit Structured Details</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {error && (
            <div className="p-3 text-xs rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3 text-xs rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* MODE 1: RESUME & BIO EXTRACTOR */}
          {mode === 'extract' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Paste Resume, LinkedIn Bio, or Raw Candidate Profile
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Our AI automatically detects skills, proficiencies, projects, CGPA, and department.
                  </p>
                </div>

                {/* 1-Click Sample Preloaders */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-semibold text-slate-400">Try sample:</span>
                  <button
                    type="button"
                    onClick={() => loadSample('fullstack')}
                    className="px-2 py-1 text-[11px] font-medium rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100"
                  >
                    Full-Stack
                  </button>
                  <button
                    type="button"
                    onClick={() => loadSample('datascience')}
                    className="px-2 py-1 text-[11px] font-medium rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100"
                  >
                    Data Science
                  </button>
                  <button
                    type="button"
                    onClick={() => loadSample('devops')}
                    className="px-2 py-1 text-[11px] font-medium rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100"
                  >
                    Cloud/DevOps
                  </button>
                </div>
              </div>

              <textarea
                rows={10}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Paste full resume text, academic marks, project descriptions, or technical competencies here..."
                className="w-full p-3.5 text-xs font-mono rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed resize-none"
              />

              <div className="flex items-center justify-between pt-1">
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Powered by Groq LLM & Multilingual ATS Parser</span>
                </div>

                <button
                  type="button"
                  disabled={extracting}
                  onClick={handleExtractWithAI}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {extracting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Parsing with AI...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Extract Details with AI</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* MODE 2: REVIEW & EDIT STRUCTURED DETAILS */}
          {mode === 'edit' && (
            <div className="space-y-6">
              {/* Live Employability Score Card Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 border border-indigo-200 dark:border-indigo-900 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
                    {preview.score}
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      Live Employability Score Preview
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                        {preview.score}/100
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        🟢 {preview.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                  <div>Skills: {profile.skills.length} · Projects: {profile.projects.length}</div>
                  <div>CGPA: {profile.cgpa} · Branch: {profile.branch}</div>
                </div>
              </div>

              {/* Basic Candidate Info Grid */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Academic & Personal Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Student / Roll ID
                    </label>
                    <input
                      type="text"
                      value={profile.student_id}
                      onChange={(e) => setProfile({ ...profile, student_id: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Branch / Department
                    </label>
                    <select
                      value={profile.branch}
                      onChange={(e) => setProfile({ ...profile, branch: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    >
                      <option value="CSE">Computer Science (CSE)</option>
                      <option value="IT">Information Technology (IT)</option>
                      <option value="ECE">Electronics (ECE)</option>
                      <option value="AIDS">AI & Data Science (AIDS)</option>
                      <option value="MECH">Mechanical (MECH)</option>
                      <option value="CIVIL">Civil (CIVIL)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Cumulative CGPA (0 - 10)
                    </label>
                    <input
                      type="number"
                      step="0.05"
                      min="0"
                      max="10"
                      value={profile.cgpa}
                      onChange={(e) => setProfile({ ...profile, cgpa: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Active Backlogs
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={profile.backlog_count}
                      onChange={(e) => setProfile({ ...profile, backlog_count: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    />
                  </div>
                </div>
              </div>

              {/* Skills Section with Proficiencies */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Extracted Technical Skills & Proficiencies ({profile.skills.length})
                  </h4>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-400">Add popular:</span>
                    {['Docker', 'AWS', 'React', 'FastAPI', 'SQL'].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleSuggestSkill(s, 75)}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-slate-700 dark:text-slate-300 font-medium"
                      >
                        +{s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Skill Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-48 overflow-y-auto p-1">
                  {profile.skills.map((skill, index) => (
                    <div
                      key={skill.name}
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                          <span className="truncate">{skill.name}</span>
                          <span className="text-indigo-600 dark:text-indigo-400 font-mono text-[11px]">
                            {skill.proficiency}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="30"
                          max="100"
                          value={skill.proficiency}
                          onChange={(e) => handleSkillProfChange(index, e.target.value)}
                          className="w-full accent-indigo-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer mt-1"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill.name)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
                        title="Remove skill"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Custom Skill input */}
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    placeholder="Add custom skill (e.g. PyTorch, Rust, Spring Boot)"
                    className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                  />
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={newSkillProf}
                    onChange={(e) => setNewSkillProf(e.target.value)}
                    className="w-16 px-2 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-center font-bold"
                    title="Proficiency percentage"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 font-bold text-xs hover:bg-indigo-100 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              {/* Projects List */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Documented Projects ({profile.projects.length})
                </h4>
                <div className="space-y-2">
                  {profile.projects.map((proj, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs space-y-1"
                    >
                      <div className="font-bold text-slate-900 dark:text-slate-100">
                        {proj.title}
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                        {proj.description}
                      </p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {(proj.technologies || []).map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Verified Certifications ({profile.certifications.length})
                </h4>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {profile.certifications.map((c, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 font-medium"
                    >
                      <Award className="w-3 h-3 text-indigo-500" />
                      <span>{c}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCert(idx)}
                        className="hover:text-rose-600 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newCert}
                    onChange={(e) => setNewCert(e.target.value)}
                    placeholder="Add certification (e.g. AWS Cloud Practitioner, Google Analytics)"
                    className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddCert()}
                  />
                  <button
                    type="button"
                    onClick={handleAddCert}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold"
                  >
                    Add Cert
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setMode('extract')}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  ← Back to Raw Resume
                </button>

                <button
                  type="button"
                  disabled={saving}
                  onClick={handleSaveProfile}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving Profile & Computing Readiness...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Save Profile & Recompute Readiness</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
