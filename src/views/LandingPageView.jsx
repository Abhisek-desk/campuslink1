import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Users,
  Target,
  Briefcase,
  Clock,
  Award,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Zap,
  GraduationCap,
  Building,
  Brain,
  Layers,
  TrendingUp,
  FileText,
  Search,
  ExternalLink,
} from 'lucide-react';

export const LandingPageView = ({
  onEnterApp,
  onSwitchRole,
  onOpenAuth,
  onOpenAIProfileBuilder,
  theme,
  onToggleTheme,
}) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black tracking-wider shadow-md">
              CL
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-lg text-slate-900 dark:text-white">
                  CAMPUSLINK
                </span>
                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  AI Prototype
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                Campus-to-Corporate Placement Platform
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              How It Works
            </a>
            <a href="#roles" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              User Portals
            </a>
            <a href="#architecture" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              AI Engine
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAuth}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Sign In
            </button>

            <button
              onClick={() => onEnterApp('dashboard')}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Launch Prototype</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
        {/* Glow Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Next-Gen Campus-to-Corporate Placement & Analytics</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Intelligent, Conflict-Free Placement Management{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600">
                Powered by AI
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Replace scattered spreadsheets and manual scheduling with automated student readiness scoring,
              explainable recruiter matching, real-time conflict-free drive scheduling, and predictive placement analytics.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onEnterApp('dashboard')}
                className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2"
              >
                <span>Launch Placement Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  onSwitchRole('student');
                  onEnterApp('student-portal');
                }}
                className="px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm border border-slate-200 dark:border-slate-800 shadow-sm transition-all flex items-center gap-2"
              >
                <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Try Student Portal</span>
              </button>

              <button
                onClick={onOpenAIProfileBuilder}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>AI Resume Parser</span>
              </button>
            </div>
          </div>

          {/* Live Metrics Strip */}
          <div className="mt-14 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                20+
              </div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Profiles Telemetry
              </div>
            </div>

            <div className="space-y-1 border-l border-slate-100 dark:border-slate-800">
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                94%
              </div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Match Accuracy
              </div>
            </div>

            <div className="space-y-1 border-l border-slate-100 dark:border-slate-800">
              <div className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400 font-mono">
                0
              </div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Drive Clashes
              </div>
            </div>

            <div className="space-y-1 border-l border-slate-100 dark:border-slate-800">
              <div className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 font-mono">
                ₹18.0 L
              </div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Top Package
              </div>
            </div>
          </div>

          {/* Interactive Feature Teaser Card */}
          <div className="mt-10 max-w-5xl mx-auto rounded-3xl bg-gradient-to-b from-slate-900 to-indigo-950 p-6 sm:p-8 text-white shadow-2xl border border-slate-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3 max-w-lg">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/20 px-2.5 py-1 rounded-full border border-indigo-400/30">
                  Explainable AI Decision Engine
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                  Not just "Shortlisted" or "Rejected" — Transparent Factor Explanations
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Every candidate-drive pairing receives an explainable multi-variable score calculated from CGPA,
                  verified skills, technical project depth, industry certifications, and mock assessments.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    🟢 Highly Employable (80+)
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                    🔵 Ready (60-79)
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-400/30">
                    🟡 Developing (40-59)
                  </span>
                </div>
              </div>

              {/* Right Mini Preview Card */}
              <div className="w-full md:w-80 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Candidate Assessment</span>
                  <span className="text-emerald-400 font-bold font-mono">87 / 100</span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[11px] text-slate-300">
                    <span>Technical Skills (Python, SQL)</span>
                    <span className="font-bold">85%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5">
                    <div className="bg-indigo-400 h-1.5 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[11px] text-slate-300">
                    <span>Academic Baseline (CGPA 8.4)</span>
                    <span className="font-bold">84%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5">
                    <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '84%' }} />
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-300">Status</span>
                  <span className="text-emerald-300 font-bold">🟢 HIGHLY EMPLOYABLE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 6 Core Modules Section */}
      <section id="features" className="py-16 sm:py-24 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-14">
            <h2 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              Core Placement Capabilities
            </h2>
            <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              End-to-End Campus Placement Lifecycle
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Profiling &rarr; Matching &rarr; Scheduling &rarr; Notifications &rarr; Offer Tracking &rarr; Predictive Analytics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Student Readiness Profiling */}
            <div className="p-6 rounded-3xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <Brain className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                1. Student Readiness Profiling
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Aggregates academic records, CGPA, backlogs, technical projects, certifications, and mock-interview scores
                into a real-time readiness index.
              </p>
            </div>

            {/* Card 2: Recruiter Matching */}
            <div className="p-6 rounded-3xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <Briefcase className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                2. Recruiter Requirement Matching
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Parses job descriptions with NLP to match skill stacks, CGPA thresholds, and branch criteria.
                Ranks candidate compatibility with explainable feedback.
              </p>
            </div>

            {/* Card 3: Conflict-Free Scheduling */}
            <div className="p-6 rounded-3xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                3. Conflict-Aware Drive Scheduling
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Detects overlapping drives, lab double-bookings, and students shortlisted for simultaneous drives.
                Resolves clashes automatically with one click.
              </p>
            </div>

            {/* Card 4: Offer Tracking */}
            <div className="p-6 rounded-3xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                4. Offer & Documentation Tracking
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Tracks the post-selection cycle: CTC package breakdown, bond documentation, PPO conversions, and student
                acceptance or deferral status.
              </p>
            </div>

            {/* Card 5: Predictive Analytics */}
            <div className="p-6 rounded-3xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                5. Command Dashboard & Analytics
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Branch-wise and skill-wise conversion rates, CTC package trends, and early automated escalation of at-risk
                students needing mentor support.
              </p>
            </div>

            {/* Card 6: Communication Automation */}
            <div className="p-6 rounded-3xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                6. Targeted Notification Automation
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Eliminates manual WhatsApp and email chains with targeted interview reminders, deadline warnings, and
                personalized student improvement tasks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Role-Based Portals Spotlight */}
      <section id="roles" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <h2 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              Built for Every Stakeholder
            </h2>
            <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Tailored Portals for Campus Hiring
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Placement Cell */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  Placement Cell Officers
                </h4>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">✓ Resolve scheduling conflicts with 1 click</li>
                  <li className="flex items-center gap-2">✓ Monitor macro university conversion metrics</li>
                  <li className="flex items-center gap-2">✓ Intervene early for at-risk unplaced students</li>
                  <li className="flex items-center gap-2">✓ Verify offer letters and CTC packages</li>
                </ul>
              </div>

              <button
                onClick={() => {
                  onSwitchRole('admin');
                  onEnterApp('dashboard');
                }}
                className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Enter Admin Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Students */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  Student Candidates
                </h4>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">✓ Extract skills automatically from raw resume</li>
                  <li className="flex items-center gap-2">✓ See explainable why/why-not match reasons</li>
                  <li className="flex items-center gap-2">✓ Personalized roadmap for target corporate roles</li>
                  <li className="flex items-center gap-2">✓ Accept or decline offer letters digitally</li>
                </ul>
              </div>

              <button
                onClick={() => {
                  onSwitchRole('student');
                  onEnterApp('student-portal');
                }}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Enter Student Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Corporate Recruiters */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                  <Building className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  Corporate Recruiters
                </h4>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">✓ Post JDs with automated AI skill extraction</li>
                  <li className="flex items-center gap-2">✓ Access pre-screened, verified candidate pools</li>
                  <li className="flex items-center gap-2">✓ Instant CGPA and skill proficiency filtering</li>
                  <li className="flex items-center gap-2">✓ Zero interview overlap with rival recruiters</li>
                </ul>
              </div>

              <button
                onClick={() => {
                  onSwitchRole('recruiter');
                  onEnterApp('recruiters');
                }}
                className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Enter Recruiter Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-10 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900 dark:text-white">CAMPUSLINK</span>
            <span>— AI-Powered Campus-to-Corporate Placement Platform</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Hackathon 2026 Prototype</span>
            <span>·</span>
            <button
              onClick={() => onEnterApp('dashboard')}
              className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >
              Open Dashboard &rarr;
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
