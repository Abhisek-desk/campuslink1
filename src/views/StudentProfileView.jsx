import React, { useState } from 'react';
import { api } from '../api';
import {
  Loader2,
  Award,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Briefcase,
  Sparkles,
  ArrowLeft,
  Edit3,
} from 'lucide-react';

export const StudentProfileView = ({
  student,
  readiness,
  onBack,
  onNavigateSkillGap,
  onNavigateMatching,
  onOpenAIProfileBuilder,
}) => {
  const [ai, setAi] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  const generateAI = async () => {
    setAiLoading(true);
    setAiError('');
    try {
      setAi(await api.getAIReadiness(student.id));
    } catch (e) {
      setAiError('Could not generate AI insights. Please try again.');
    } finally {
      setAiLoading(false);
    }
  };

  // Circular progress calculation
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (readiness.score / 100) * circumference;

  // Status badge coloring
  const getStatusBadge = (status) => {
    switch (status) {
      case 'HIGHLY EMPLOYABLE':
        return {
          bg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
          dot: 'bg-emerald-500',
          iconText: '🟢',
        };
      case 'READY':
        return {
          bg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
          dot: 'bg-emerald-500',
          iconText: '🟢',
        };
      case 'DEVELOPING':
        return {
          bg: 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800',
          dot: 'bg-amber-500',
          iconText: '🟡',
        };
      default:
        return {
          bg: 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800',
          dot: 'bg-rose-500',
          iconText: '🔴',
        };
    }
  };

  const statusStyle = getStatusBadge(readiness.status);

  return (
    <div className="space-y-6 max-w-6xl mx-auto text-slate-900 dark:text-slate-100">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Back to students list"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {student.name}
              </h1>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-semibold">
                {student.student_id}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              <span>{student.branch} Engineering</span>
              <span>·</span>
              <span>Graduation Class of {student.graduation_year}</span>
              <span>·</span>
              <span>{student.email}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* AI Detail Parser & Editor Button */}
          {onOpenAIProfileBuilder && (
            <button
              onClick={() => onOpenAIProfileBuilder(student)}
              className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-sm transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Update Details With AI</span>
            </button>
          )}

          {onNavigateSkillGap && (
            <button
              onClick={onNavigateSkillGap}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Skill Gap Analysis</span>
            </button>
          )}

          {onNavigateMatching && (
            <button
              onClick={onNavigateMatching}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white shadow-sm transition-colors flex items-center gap-1.5 border border-slate-700"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Match Drives</span>
            </button>
          )}
        </div>
      </div>

      {/* Row 1: SECTION 6 & 7 — AI READINESS SCORE & EXPLAINABLE FACTORS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Section 6: AI Employability Score Prominent Card (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase">
                  AI Employability Engine
                </span>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">AI Readiness Score</h2>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${statusStyle.bg}`}>
                <span className={`w-2 h-2 rounded-full ${statusStyle.dot}`} />
                <span>{readiness.status}</span>
              </span>
            </div>

            {/* Circular Progress Indicator */}
            <div className="flex items-center justify-center my-4">
              <div className="relative flex items-center justify-center">
                <svg className="w-36 h-36 transform -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r={radius}
                    stroke="currentColor"
                    className="text-slate-100 dark:text-slate-800"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r={radius}
                    stroke={
                      readiness.score >= 80
                        ? '#10b981'
                        : readiness.score >= 60
                        ? '#6366f1'
                        : readiness.score >= 40
                        ? '#f59e0b'
                        : '#ef4444'
                    }
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>

                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {readiness.score}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">/ 100</span>
                </div>
              </div>
            </div>

            <div className="text-center text-xs text-slate-500 dark:text-slate-400 mb-4">
              Dynamic algorithm calculated from academic, skills, projects, and assessment telemetry.
            </div>
          </div>

          {/* Breakdown bars */}
          <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
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
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3 text-xs">
                  <span className="text-slate-600 dark:text-slate-400 truncate w-40">{item.label}</span>
                  <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden mx-2">
                    <div
                      className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full"
                      style={{ width: `${Math.min(100, item.value)}%` }}
                    />
                  </div>
                  <span className="font-mono font-bold text-slate-900 dark:text-white w-10 text-right">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 7: Explainable AI Readiness (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-5 transition-colors">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Why this score?</h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Explainable AI reasoning factors driving this candidate's employability evaluation
            </p>

            {/* Positive Factors */}
            <div className="mt-4 space-y-2">
              <div className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Positive Strengths (High Impact)</span>
              </div>
              <div className="bg-emerald-50/50 dark:bg-emerald-950/40 rounded-xl p-3 border border-emerald-100 dark:border-emerald-900/50 space-y-2">
                {readiness.positiveFactors.map((factor, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-emerald-950 dark:text-emerald-200 font-medium">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                    <span>{factor}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Improvement Areas */}
            <div className="mt-4 space-y-2">
              <div className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Identified Improvement Areas</span>
              </div>
              <div className="bg-amber-50/50 dark:bg-amber-950/40 rounded-xl p-3 border border-amber-100 dark:border-amber-900/50 space-y-2">
                {readiness.improvementAreas.map((area, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-amber-950 dark:text-amber-200 font-medium">
                    <span className="text-amber-600 dark:text-amber-400 font-bold">⚠</span>
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Recommendation Quote Box */}
          <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 rounded-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 dark:text-indigo-300 mb-1">
              <Lightbulb className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>AI Placement Recommendation</span>
            </div>
            <p className="text-xs text-indigo-950 dark:text-indigo-200 font-medium leading-relaxed italic">
              "{readiness.recommendation}"
            </p>
          </div>
        </div>
      </div>

      {/* AI Readiness Insights (Groq) */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">AI Readiness Deep Insights</h2>
          </div>
          <button
            onClick={generateAI}
            disabled={aiLoading}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 disabled:opacity-60 flex items-center gap-2 shadow-xs"
          >
            {aiLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{ai ? 'Regenerate Analysis' : 'Run Deep AI Analysis'}</span>
          </button>
        </div>
        {aiError && <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">{aiError}</p>}
        {!ai && !aiLoading && !aiError && (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Click above to generate personalised readiness insights, interview tips, and action plan from Groq LLM.
          </p>
        )}
        {ai && (
          <div className="space-y-4">
            <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">{ai.summary}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-50/50 dark:bg-emerald-950/40 rounded-xl p-3 border border-emerald-100 dark:border-emerald-900/50 space-y-1.5">
                <div className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase">Strengths</div>
                {(ai.strengths || []).map((t, i) => (
                  <div key={i} className="text-xs text-emerald-950 dark:text-emerald-200">✓ {t}</div>
                ))}
              </div>
              <div className="bg-amber-50/50 dark:bg-amber-950/40 rounded-xl p-3 border border-amber-100 dark:border-amber-900/50 space-y-1.5">
                <div className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase">Gaps</div>
                {(ai.gaps || []).map((t, i) => (
                  <div key={i} className="text-xs text-amber-950 dark:text-amber-200">⚠ {t}</div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Action Plan</div>
              {(ai.action_plan || []).map((p, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between gap-3 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5"
                >
                  <span className="text-slate-800 dark:text-slate-200">
                    {i + 1}. {p.step}
                  </span>
                  <span className="text-indigo-700 dark:text-indigo-400 font-semibold whitespace-nowrap">
                    {p.timeframe}
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Interview Tips</div>
              {(ai.interview_tips || []).map((t, i) => (
                <div key={i} className="text-xs text-slate-600 dark:text-slate-400">• {t}</div>
              ))}
            </div>
            <div className="text-[10px] text-slate-400">
              Source: {ai.source === 'groq' ? 'Groq AI' : 'Rule-based engine'}
              {ai.note ? ` (${ai.note})` : ''}
            </div>
          </div>
        )}
      </div>

      {/* Row 2: Academic Info & Assessment Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Cumulative CGPA</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">{student.cgpa.toFixed(2)}</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">Scale: 10.00 Max</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Active Backlogs</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">{student.backlog_count}</div>
          <div className={`text-[11px] font-medium mt-1 ${student.backlog_count === 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
            {student.backlog_count === 0 ? 'Eligible for all Tier-1 drives' : 'Restricts select drives'}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Technical Assessment</div>
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{student.assessment.technical}%</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Aptitude: {student.assessment.aptitude}%</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Mock Interview & HR</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">{student.assessment.interview}%</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Communication: {student.assessment.communication}%</div>
        </div>
      </div>

      {/* Row 3: Skills Proficiency Bars */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Technical Skills & Proficiency</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Evaluated through coding assessments, project contributions, and lab submissions
            </p>
          </div>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {student.skills.length} skills recorded
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {student.skills.map((sk) => {
            const filledBlocks = Math.round(sk.proficiency / 10);
            const emptyBlocks = 10 - filledBlocks;
            const blockVisual = '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);
            return (
              <div
                key={sk.name}
                className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors bg-slate-50/50 dark:bg-slate-800/40"
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                  <span>{sk.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-indigo-600 dark:text-indigo-400 tracking-wider text-[11px]">
                      {blockVisual}
                    </span>
                    <span className="font-mono">{sk.proficiency}%</span>
                  </div>
                </div>

                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      sk.proficiency >= 80
                        ? 'bg-emerald-500'
                        : sk.proficiency >= 60
                        ? 'bg-indigo-600'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${sk.proficiency}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 4: Projects & Certifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects (2 cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Portfolio Projects ({student.projects.length})
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-400">Verified github codebases</span>
          </div>

          <div className="space-y-3">
            {student.projects.map((proj, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">{proj.title}</h3>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Project #{idx + 1}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">{proj.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {proj.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications (1 col) */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Certifications</h2>
            <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>

          <div className="space-y-2.5">
            {student.certifications.map((cert, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-indigo-50/30 dark:bg-indigo-950/30 flex items-start gap-2.5"
              >
                <CheckCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-snug">{cert}</div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              Verified by the College Assessment & Placement Council.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
