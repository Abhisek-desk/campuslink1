import React from 'react';
import { Sparkles, Plus, Briefcase, Building } from 'lucide-react';

export const RecruitersView = ({ recruiters, jobs, onNavigateMatching, onOpenAddJob }) => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Corporate Recruiters & Job Postings
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Institutional recruiting partnerships, active job descriptions, minimum CGPA bars, and hiring quotas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onOpenAddJob && (
            <button
              onClick={onOpenAddJob}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-sm transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>+ Post Job with AI</span>
            </button>
          )}

          <span className="text-xs font-semibold px-3 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            {recruiters.length} Corporate Partners · {jobs.length} Active Jobs
          </span>
        </div>
      </div>

      {/* Recruiters Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {recruiters.map((r) => (
          <div
            key={r.id}
            className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-colors"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold flex items-center justify-center text-sm border border-indigo-100 dark:border-indigo-900 mb-3">
                {r.company_name.slice(0, 2)}
              </div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">{r.company_name}</h2>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{r.industry}</div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Total Hires</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">{r.hires_count}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Jobs Catalog */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Active Job Postings</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Detailed requirements and candidate eligibility benchmarks
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                      {job.company_name}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{job.title}</h3>
                  </div>

                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    {job.ctc}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">{job.description}</p>

                {/* Skills requirements */}
                <div className="mt-3">
                  <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Benchmark Technical Skills
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {job.required_skills.map((s) => (
                      <span
                        key={s.name}
                        className="text-[11px] px-2 py-0.5 rounded bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600 font-medium"
                      >
                        {s.name} &gt;= {s.min_proficiency}%
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700/70 flex items-center justify-between text-xs">
                <div className="text-slate-500 dark:text-slate-400">
                  Min CGPA: <strong className="text-slate-900 dark:text-white">{job.minimum_cgpa.toFixed(1)}</strong> · Vacancies: {job.vacancies}
                </div>

                <button
                  onClick={() => onNavigateMatching(job.id)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-sm transition-colors flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Run AI Matching</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
