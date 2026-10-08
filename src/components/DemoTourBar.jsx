import React from 'react';
import { ChevronRight, ChevronLeft, X, } from 'lucide-react';
export const DEMO_STEPS = [
    {
        step: 1,
        title: 'Login as Placement Officer',
        role: 'admin',
        view: 'dashboard',
        description: 'Authenticate as Placement Officer (Dr. Suresh Verma, admin@campuslink.com) to access the central placement administrative operations.',
        highlightText: 'Current role is set to Placement Officer.',
    },
    {
        step: 2,
        title: 'Command Dashboard & Predictive At-Risk Model',
        role: 'admin',
        view: 'dashboard',
        description: 'Inspect live placement metrics: 500 total students, 372 placement ready, 186 offers, 154 placed students, branch-wise conversions, and the At-Risk student predictive table.',
        highlightText: 'Check the 43 at-risk students flagged with actionable remediation recommendations.',
    },
    {
        step: 3,
        title: 'Student Profile & Dynamic AI Readiness Score',
        role: 'admin',
        view: 'students',
        description: 'Examine Aarav Sharma’s profile. Note the dynamic AI Employability Score (84/100 or 78/100), circular gauge, score breakdown, positive factors, improvement areas, and AI recommendation.',
        highlightText: 'Notice skills with visual proficiency meters and complete academic records.',
    },
    {
        step: 4,
        title: 'AI Recruiter Matching & Explainability',
        role: 'admin',
        view: 'matching',
        description: 'Open the AI-Assisted Matching Engine for TechNova (Software Engineer). Observe Aarav Sharma at the top rank (94% match). Click "View Match Explanation" to inspect the explainable AI factors.',
        highlightText: 'Transparent breakdown: Eligibility 20%, Skills 35%, Projects 15%, Certs 10%, Assessment 10%, Readiness 10%.',
    },
    {
        step: 5,
        title: 'Simulated Placement Drives',
        role: 'admin',
        view: 'drives',
        description: 'View the 3 featured corporate drives: TechNova (SDE, Min CGPA 7.0), DataSphere (Data Analyst, Min CGPA 7.2), and CloudWorks (Cloud Engineer, Min CGPA 7.0).',
        highlightText: 'Each drive shows requirements, schedule, venue, and shortlisted candidate cohorts.',
    },
    {
        step: 6,
        title: 'Drive Scheduling & 1-Click Conflict Resolution',
        role: 'admin',
        view: 'scheduling',
        description: 'Demonstrate conflict-aware scheduling. Aarav Sharma is double-booked on 20 Oct (TechNova 10:00–12:00 vs DataSphere 11:00–13:00). Click "Apply Suggested Resolution" to resolve it live!',
        highlightText: 'Resolves overlapping slot by shifting DataSphere to 14:00–16:00 and dispatches an instant notification.',
    },
    {
        step: 7,
        title: 'Offer Tracking & Corporate CTC Management',
        role: 'admin',
        view: 'offers',
        description: 'Review offer pipeline across companies. Update offer status (Accepted, Pending, Declined, Deferred) and manage candidate joining dates.',
        highlightText: 'Real-time database updates for TechNova ₹8.5 LPA, DataSphere ₹7.5 LPA, CloudWorks ₹9.0 LPA.',
    },
    {
        step: 8,
        title: 'Placement Analytics & Intelligence',
        role: 'admin',
        view: 'analytics',
        description: 'Review conversion funnel, branch-wise placement percentages (CSE 82%, IT 78%, ECE 65%, EEE 54%), salary tier distribution, and recruiter hiring count metrics.',
        highlightText: 'Dynamic metrics synchronized from the student matching and offer lifecycle.',
    },
    {
        step: 9,
        title: 'Student Experience (Aarav Sharma)',
        role: 'student',
        view: 'student-portal',
        description: 'Switch to Student View (Aarav Sharma). Experience the student portal with employability score, target skill gaps, recommended jobs (94% TechNova, 76% DataSphere), upcoming drives, and offer acceptance.',
        highlightText: 'A personalized career dashboard built on explainable AI guidance.',
    },
];
export const DemoTourBar = ({ currentStepIndex, onSetStep, onClose, }) => {
    const currentStep = DEMO_STEPS[currentStepIndex];
    return (<aside aria-label="Demo Presentation Guide" className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-indigo-800/50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Step Info */}
          <div className="flex items-start md:items-center gap-3">
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-indigo-500 text-white text-xs font-bold flex-shrink-0 shadow-sm">
              {currentStep.step}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-200 uppercase tracking-wider">
                  Step {currentStep.step} of 9
                </span>
                <span className="text-slate-400">·</span>
                <h2 className="text-xs font-semibold text-white">{currentStep.title}</h2>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-400/20 text-indigo-300 font-mono">
                  Role: {currentStep.role === 'admin' ? 'Placement Officer' : 'Student'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 max-w-3xl leading-snug">
                {currentStep.description}
              </p>
            </div>
          </div>

          {/* Stepper Controls */}
          <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
            <button onClick={() => onSetStep(Math.max(0, currentStepIndex - 1))} disabled={currentStepIndex === 0} className="px-2.5 py-1 text-xs rounded border border-slate-700 bg-slate-800/80 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-colors">
              <ChevronLeft className="w-3.5 h-3.5"/>
              <span>Prev</span>
            </button>

            <span className="text-xs text-slate-400 px-1 font-mono">
              {currentStepIndex + 1}/9
            </span>

            <button onClick={() => onSetStep(Math.min(DEMO_STEPS.length - 1, currentStepIndex + 1))} disabled={currentStepIndex === DEMO_STEPS.length - 1} className="px-3 py-1 text-xs font-semibold rounded bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 shadow-sm transition-colors">
              <span>Next Step</span>
              <ChevronRight className="w-3.5 h-3.5"/>
            </button>

            <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors ml-1" title="Close Tour Guide">
              <X className="w-4 h-4"/>
            </button>
          </div>
        </div>

        {/* Mini Step Pills */}
        <div className="hidden sm:flex items-center gap-1.5 mt-2 pt-2 border-t border-indigo-900/40 overflow-x-auto">
          {DEMO_STEPS.map((s, idx) => (<button key={s.step} onClick={() => onSetStep(idx)} className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors whitespace-nowrap ${idx === currentStepIndex
                ? 'bg-indigo-500 text-white font-bold'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}>
              {s.step}. {s.title.split(' ')[0]}
            </button>))}
        </div>
      </div>
    </aside>);
};
