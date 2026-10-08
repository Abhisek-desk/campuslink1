import React from 'react';
import { Calendar, Clock, MapPin, ArrowRight, ShieldCheck, } from 'lucide-react';
export const DrivesView = ({ drives, jobs, conflicts, onNavigateMatching, onNavigateScheduling, }) => {
    return (<div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Placement Drives Hub
            </h1>
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
              Season 2026
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Featured enterprise recruitment drives and assessment schedules.
          </p>
        </div>

        <button onClick={onNavigateScheduling} className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto">
          <Clock className="w-3.5 h-3.5"/>
          <span>Open Drive Timetable & Conflicts</span>
        </button>
      </div>

      {/* Prominent Section 4: 3 Core Simulated Drives */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            Core Simulated Drives (Priority Partners)
          </h2>
          <span className="text-xs text-slate-500 font-medium">3 Active Drives</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Drive 1: TechNova - Software Engineer */}
          <div className="bg-white rounded-2xl border-2 border-indigo-100 hover:border-indigo-300 transition-all p-5 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                    Drive 1
                  </span>
                  <h3 className="text-base font-bold text-slate-900">TechNova</h3>
                  <div className="text-xs font-semibold text-slate-700">Software Engineer</div>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                  ₹8.5 LPA
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600"/>
                  <span>
                    Minimum CGPA: <strong className="text-slate-900 font-mono">7.0</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400"/>
                  <span>Date: 20 Oct 2026 (10:00 – 12:00)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400"/>
                  <span>Venue: Computing Lab 1 (Block B)</span>
                </div>
              </div>

              {/* Required Skills */}
              <div className="pt-2">
                <div className="text-[11px] font-bold text-slate-700 uppercase mb-1.5">
                  Required Skills:
                </div>
                <div className="flex flex-wrap gap-1">
                  {['Python', 'Django', 'SQL', 'Git'].map((s) => (<span key={s} className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                      {s}
                    </span>))}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                <strong className="text-slate-900 font-mono">25</strong> Candidates Shortlisted
              </div>
              <button onClick={() => onNavigateMatching('j1')} className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1">
                <span>Run Matching</span>
                <ArrowRight className="w-3.5 h-3.5"/>
              </button>
            </div>
          </div>

          {/* Drive 2: DataSphere - Data Analyst */}
          <div className="bg-white rounded-2xl border-2 border-indigo-100 hover:border-indigo-300 transition-all p-5 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                    Drive 2
                  </span>
                  <h3 className="text-base font-bold text-slate-900">DataSphere</h3>
                  <div className="text-xs font-semibold text-slate-700">Data Analyst</div>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                  ₹7.5 LPA
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600"/>
                  <span>
                    Minimum CGPA: <strong className="text-slate-900 font-mono">7.2</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400"/>
                  <span>
                    Date: 20 Oct 2026 ({drives.find((d) => d.id === 'd2')?.start_time} – {drives.find((d) => d.id === 'd2')?.end_time})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400"/>
                  <span>Venue: Analytics Lab 2 (Block A)</span>
                </div>
              </div>

              {/* Required Skills */}
              <div className="pt-2">
                <div className="text-[11px] font-bold text-slate-700 uppercase mb-1.5">
                  Required Skills:
                </div>
                <div className="flex flex-wrap gap-1">
                  {['Python', 'SQL', 'Excel', 'Power BI'].map((s) => (<span key={s} className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                      {s}
                    </span>))}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                <strong className="text-slate-900 font-mono">20</strong> Candidates Shortlisted
              </div>
              <button onClick={() => onNavigateMatching('j2')} className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1">
                <span>Run Matching</span>
                <ArrowRight className="w-3.5 h-3.5"/>
              </button>
            </div>
          </div>

          {/* Drive 3: CloudWorks - Cloud Engineer */}
          <div className="bg-white rounded-2xl border-2 border-indigo-100 hover:border-indigo-300 transition-all p-5 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                    Drive 3
                  </span>
                  <h3 className="text-base font-bold text-slate-900">CloudWorks</h3>
                  <div className="text-xs font-semibold text-slate-700">Cloud Engineer</div>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                  ₹9.0 LPA
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600"/>
                  <span>
                    Minimum CGPA: <strong className="text-slate-900 font-mono">7.0</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400"/>
                  <span>Date: 21 Oct 2026 (10:00 – 12:00)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400"/>
                  <span>Venue: Computing Lab 1 (Block B)</span>
                </div>
              </div>

              {/* Required Skills */}
              <div className="pt-2">
                <div className="text-[11px] font-bold text-slate-700 uppercase mb-1.5">
                  Required Skills:
                </div>
                <div className="flex flex-wrap gap-1">
                  {['Linux', 'AWS', 'Docker', 'Networking'].map((s) => (<span key={s} className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                      {s}
                    </span>))}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                <strong className="text-slate-900 font-mono">18</strong> Candidates Shortlisted
              </div>
              <button onClick={() => onNavigateMatching('j3')} className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1">
                <span>Run Matching</span>
                <ArrowRight className="w-3.5 h-3.5"/>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recruiter & Job Registry */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">All Registered Jobs & Openings</h2>
            <p className="text-xs text-slate-500">6 active recruitment requisitions this season</p>
          </div>
          <span className="text-xs text-slate-500">Total openings: 59 positions</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {jobs.map((j) => (<div key={j.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold text-indigo-600">{j.company_name}</span>
                  <h3 className="text-sm font-bold text-slate-900">{j.title}</h3>
                </div>
                <span className="text-xs font-mono font-bold text-slate-700">{j.ctc}</span>
              </div>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2">{j.description}</p>
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/60">
                <span>Min CGPA: {j.minimum_cgpa.toFixed(1)}</span>
                <span>Vacancies: {j.vacancies}</span>
                <button onClick={() => onNavigateMatching(j.id)} className="font-semibold text-indigo-600 hover:text-indigo-800">
                  View candidates →
                </button>
              </div>
            </div>))}
        </div>
      </div>
    </div>);
};
