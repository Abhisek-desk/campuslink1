import React from 'react';
import { Award, CheckCircle, AlertTriangle, Lightbulb, Briefcase, Sparkles, ArrowLeft, } from 'lucide-react';
export const StudentProfileView = ({ student, readiness, onBack, onNavigateSkillGap, onNavigateMatching, }) => {
    // Circular progress calculation
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (readiness.score / 100) * circumference;
    // Status badge coloring
    const getStatusBadge = (status) => {
        switch (status) {
            case 'HIGHLY EMPLOYABLE':
                return {
                    bg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
                    dot: 'bg-emerald-500',
                    iconText: '🟢',
                };
            case 'READY':
                return {
                    bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                    dot: 'bg-emerald-500',
                    iconText: '🟢',
                };
            case 'DEVELOPING':
                return {
                    bg: 'bg-amber-50 text-amber-800 border-amber-300',
                    dot: 'bg-amber-500',
                    iconText: '🟡',
                };
            default:
                return {
                    bg: 'bg-rose-50 text-rose-800 border-rose-300',
                    dot: 'bg-rose-500',
                    iconText: '🔴',
                };
        }
    };
    const statusStyle = getStatusBadge(readiness.status);
    return (<div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-3">
          {onBack && (<button onClick={onBack} className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors" title="Back to students list">
              <ArrowLeft className="w-5 h-5"/>
            </button>)}
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {student.name}
              </h1>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                {student.student_id}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600 mt-0.5">
              <span>{student.branch} Engineering</span>
              <span>·</span>
              <span>Graduation Class of {student.graduation_year}</span>
              <span>·</span>
              <span>{student.email}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onNavigateSkillGap && (<button onClick={onNavigateSkillGap} className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5"/>
              <span>Skill Gap Analysis</span>
            </button>)}
          {onNavigateMatching && (<button onClick={onNavigateMatching} className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5"/>
              <span>Match with Drives</span>
            </button>)}
        </div>
      </div>

      {/* Row 1: SECTION 6 & 7 — AI READINESS SCORE & EXPLAINABLE FACTORS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Section 6: AI Employability Score Prominent Card (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[11px] font-bold text-indigo-600 tracking-wider uppercase">
                  AI Employability Engine
                </span>
                <h2 className="text-base font-bold text-slate-900">AI Readiness Score</h2>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${statusStyle.bg}`}>
                <span className={`w-2 h-2 rounded-full ${statusStyle.dot}`}/>
                <span>{readiness.status}</span>
              </span>
            </div>

            {/* Circular Progress Indicator */}
            <div className="flex items-center justify-center my-4">
              <div className="relative flex items-center justify-center">
                <svg className="w-36 h-36 transform -rotate-90">
                  <circle cx="72" cy="72" r={radius} stroke="#f1f5f9" strokeWidth="10" fill="transparent"/>
                  <circle cx="72" cy="72" r={radius} stroke={readiness.score >= 80
            ? '#10b981'
            : readiness.score >= 60
                ? '#6366f1'
                : readiness.score >= 40
                    ? '#f59e0b'
                    : '#ef4444'} strokeWidth="10" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" fill="transparent" className="transition-all duration-1000 ease-out"/>
                </svg>

                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    {readiness.score}
                  </span>
                  <span className="text-xs font-semibold text-slate-600">/ 100</span>
                </div>
              </div>
            </div>

            <div className="text-center text-xs text-slate-600 mb-4">
              Dynamic algorithm calculated from academic, skills, projects, and assessment telemetry.
            </div>
          </div>

          {/* Breakdown bars */}
          <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Score Breakdown
            </div>

            <div className="space-y-1.5">
              {[
            { label: 'Academic Performance', value: readiness.breakdown.academic, weight: '20%' },
            { label: 'Technical Skills Depth', value: readiness.breakdown.technical, weight: '25%' },
            { label: 'Projects & Systems Portfolio', value: readiness.breakdown.projects, weight: '15%' },
            { label: 'Industry Certifications', value: readiness.breakdown.certifications, weight: '10%' },
            { label: 'Aptitude & Problem Solving', value: readiness.breakdown.aptitude, weight: '10%' },
            { label: 'Mock Technical Interview', value: readiness.breakdown.interview, weight: '10%' },
            { label: 'Corporate Communication', value: readiness.breakdown.communication, weight: '10%' },
        ].map((item) => (<div key={item.label} className="flex items-center justify-between gap-3 text-xs">
                  <span className="text-slate-600 truncate w-40">{item.label}</span>
                  <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden mx-2">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${Math.min(100, item.value)}%` }}/>
                  </div>
                  <span className="font-mono font-bold text-slate-900 w-10 text-right">
                    {item.value}%
                  </span>
                </div>))}
            </div>
          </div>
        </div>

        {/* Section 7: Explainable AI Readiness (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-indigo-600"/>
              <h2 className="text-base font-bold text-slate-900">Why this score?</h2>
            </div>
            <p className="text-xs text-slate-500">
              Explainable AI reasoning factors driving this candidate's employability evaluation
            </p>

            {/* Positive Factors */}
            <div className="mt-4 space-y-2">
              <div className="text-xs font-bold text-emerald-800 uppercase tracking-wide flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600"/>
                <span>Positive Strengths (High Impact)</span>
              </div>
              <div className="bg-emerald-50/50 rounded-xl p-3 border border-emerald-100 space-y-2">
                {readiness.positiveFactors.map((factor, idx) => (<div key={idx} className="flex items-start gap-2 text-xs text-emerald-950 font-medium">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{factor}</span>
                  </div>))}
              </div>
            </div>

            {/* Improvement Areas */}
            <div className="mt-4 space-y-2">
              <div className="text-xs font-bold text-amber-800 uppercase tracking-wide flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600"/>
                <span>Identified Improvement Areas</span>
              </div>
              <div className="bg-amber-50/50 rounded-xl p-3 border border-amber-100 space-y-2">
                {readiness.improvementAreas.map((area, idx) => (<div key={idx} className="flex items-start gap-2 text-xs text-amber-950 font-medium">
                    <span className="text-amber-600 font-bold">⚠</span>
                    <span>{area}</span>
                  </div>))}
              </div>
            </div>
          </div>

          {/* AI Recommendation Quote Box */}
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 mb-1">
              <Lightbulb className="w-4 h-4 text-indigo-600"/>
              <span>AI Placement Recommendation</span>
            </div>
            <p className="text-xs text-indigo-950 font-medium leading-relaxed italic">
              "{readiness.recommendation}"
            </p>
          </div>
        </div>
      </div>

      {/* Row 2: Academic Info & Assessment Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-medium text-slate-500 mb-1">Cumulative CGPA</div>
          <div className="text-2xl font-bold text-slate-900">{student.cgpa.toFixed(2)}</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">Scale: 10.00 Max</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-medium text-slate-500 mb-1">Active Backlogs</div>
          <div className="text-2xl font-bold text-slate-900">{student.backlog_count}</div>
          <div className={`text-[11px] font-medium mt-1 ${student.backlog_count === 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {student.backlog_count === 0 ? 'Eligible for all Tier-1 drives' : 'Restricts select drives'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-medium text-slate-500 mb-1">Technical Assessment</div>
          <div className="text-2xl font-bold text-indigo-600">{student.assessment.technical}%</div>
          <div className="text-[11px] text-slate-500 mt-1">Aptitude: {student.assessment.aptitude}%</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-medium text-slate-500 mb-1">Mock Interview & HR</div>
          <div className="text-2xl font-bold text-slate-900">{student.assessment.interview}%</div>
          <div className="text-[11px] text-slate-500 mt-1">Communication: {student.assessment.communication}%</div>
        </div>
      </div>

      {/* Row 3: Skills Proficiency Bars (Section 5 requirement) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Technical Skills & Proficiency</h2>
            <p className="text-xs text-slate-500">
              Evaluated through coding assessments, project contributions, and lab submissions
            </p>
          </div>
          <span className="text-xs font-medium text-slate-500">{student.skills.length} skills recorded</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {student.skills.map((sk) => {
            // Visual text bar: e.g. Python █████████░ 90%
            const filledBlocks = Math.round(sk.proficiency / 10);
            const emptyBlocks = 10 - filledBlocks;
            const blockVisual = '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);
            return (<div key={sk.name} className="p-3 rounded-xl border border-slate-100 hover:border-slate-300 transition-colors bg-slate-50/50">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-1.5">
                  <span>{sk.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-indigo-600 tracking-wider text-[11px]">
                      {blockVisual}
                    </span>
                    <span className="font-mono">{sk.proficiency}%</span>
                  </div>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${sk.proficiency >= 80
                    ? 'bg-emerald-500'
                    : sk.proficiency >= 60
                        ? 'bg-indigo-600'
                        : 'bg-amber-500'}`} style={{ width: `${sk.proficiency}%` }}/>
                </div>
              </div>);
        })}
        </div>
      </div>

      {/* Row 4: Projects & Certifications (Section 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects (2 cols) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Portfolio Projects ({student.projects.length})</h2>
            <span className="text-xs text-slate-500">Verified github codebases</span>
          </div>

          <div className="space-y-3">
            {student.projects.map((proj, idx) => (<div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xs font-bold text-slate-900">{proj.title}</h3>
                  <span className="text-[10px] font-mono text-slate-600">Project #{idx + 1}</span>
                </div>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{proj.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {proj.technologies.map((t) => (<span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                      {t}
                    </span>))}
                </div>
              </div>))}
          </div>
        </div>

        {/* Certifications (1 col) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Certifications</h2>
            <Award className="w-4 h-4 text-indigo-600"/>
          </div>

          <div className="space-y-2.5">
            {student.certifications.map((cert, idx) => (<div key={idx} className="p-3 rounded-xl border border-slate-100 bg-indigo-50/30 flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5"/>
                <div className="text-xs font-medium text-slate-800 leading-snug">{cert}</div>
              </div>))}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <div className="text-[11px] text-slate-500">
              Verified by the College Assessment & Placement Council.
            </div>
          </div>
        </div>
      </div>
    </div>);
};
