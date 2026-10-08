import React, { useState } from 'react';
import { Search, ChevronRight, Sparkles, Plus } from 'lucide-react';
import { StudentProfileView } from './StudentProfileView';

export const StudentsView = ({
  students,
  onNavigateSkillGap,
  onNavigateMatching,
  selectedStudentId,
  onSelectStudentId,
  onOpenAIProfileBuilder,
}) => {
  const [search, setSearch] = useState('');
  const [branchFilter, setBranchFilter] = useState('ALL');
  const [readinessFilter, setReadinessFilter] = useState('ALL');
  const [activeStudentId, setActiveStudentId] = useState(selectedStudentId || null);

  React.useEffect(() => {
    if (selectedStudentId !== undefined) {
      setActiveStudentId(selectedStudentId);
    }
  }, [selectedStudentId]);

  const activeStudent = students.find((s) => s.id === activeStudentId);

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.student_id.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchesBranch = branchFilter === 'ALL' || s.branch === branchFilter;
    let matchesReadiness = true;
    if (readinessFilter === 'HIGH') matchesReadiness = (s.readiness_score || 0) >= 80;
    else if (readinessFilter === 'READY')
      matchesReadiness = (s.readiness_score || 0) >= 60 && (s.readiness_score || 0) < 80;
    else if (readinessFilter === 'DEVELOPING')
      matchesReadiness = (s.readiness_score || 0) >= 40 && (s.readiness_score || 0) < 60;
    else if (readinessFilter === 'AT_RISK')
      matchesReadiness = (s.readiness_score || 0) < 40 || s.backlog_count > 0;
    return matchesSearch && matchesBranch && matchesReadiness;
  });

  if (activeStudent) {
    const readiness = {
      score: activeStudent.readiness_score || 78,
      status:
        (activeStudent.readiness_score || 78) >= 80
          ? 'HIGHLY EMPLOYABLE'
          : (activeStudent.readiness_score || 78) >= 60
          ? 'READY'
          : (activeStudent.readiness_score || 78) >= 40
          ? 'DEVELOPING'
          : 'NOT READY',
      breakdown: {
        academic: Math.round((activeStudent.cgpa / 10) * 100 - activeStudent.backlog_count * 15),
        technical: Math.round(
          activeStudent.skills.reduce((a, b) => a + b.proficiency, 0) /
            (activeStudent.skills.length || 1)
        ),
        projects: Math.min(100, activeStudent.projects.length * 35),
        certifications: Math.min(100, activeStudent.certifications.length * 35),
        aptitude: activeStudent.assessment.aptitude,
        interview: activeStudent.assessment.interview,
        communication: activeStudent.assessment.communication,
      },
      positiveFactors: [
        `Strong proficiency in ${
          activeStudent.skills
            .filter((s) => s.proficiency >= 75)
            .map((s) => s.name)
            .slice(0, 3)
            .join(', ') || 'core fundamentals'
        }`,
        activeStudent.cgpa >= 7.5
          ? `CGPA ${activeStudent.cgpa.toFixed(1)} exceeds competitive baseline`
          : 'Eligible academic standing',
        `Completed ${activeStudent.projects.length} verified technical portfolio projects`,
        `Aptitude percentile score at ${activeStudent.assessment.aptitude}%`,
      ],
      improvementAreas: [
        activeStudent.skills.find((s) => s.proficiency < 60)
          ? `${activeStudent.skills.find((s) => s.proficiency < 60)?.name} skills need improvement`
          : 'Advanced cloud and microservice patterns need deeper practice',
        `Mock interview performance is moderate (${activeStudent.assessment.interview}%)`,
        `Communication score (${activeStudent.assessment.communication}%) can improve for corporate interviews`,
      ],
      recommendation:
        activeStudent.readiness_score && activeStudent.readiness_score >= 80
          ? 'Target Tier-1 corporate engineering drives. Focus on leadership principles and system design.'
          : 'Focus on cloud fundamentals and mock interview practice to improve placement readiness.',
    };

    return (
      <StudentProfileView
        student={activeStudent}
        readiness={readiness}
        onBack={() => {
          setActiveStudentId(null);
          if (onSelectStudentId) onSelectStudentId(null);
        }}
        onNavigateSkillGap={() => onNavigateSkillGap(activeStudent.id)}
        onNavigateMatching={onNavigateMatching}
        onOpenAIProfileBuilder={onOpenAIProfileBuilder}
      />
    );
  }

  return (
    <div className="space-y-6 text-slate-900 dark:text-slate-100">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Student Readiness Directory
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Candidate profiles analyzed dynamically for technical depth, academic metrics, and placement readiness.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onOpenAIProfileBuilder && (
            <button
              onClick={() => onOpenAIProfileBuilder()}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-sm transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>+ Add Student (AI Parser)</span>
            </button>
          )}

          <div className="text-xs font-semibold px-3 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            Total Students: {students.length}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between transition-colors">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search student name, ID (e.g. CS2022-041), email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Branch filter */}
          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="ALL">All Branches</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
            <option value="AIDS">AIDS</option>
            <option value="Mechanical">Mechanical</option>
          </select>

          {/* Readiness filter */}
          <select
            value={readinessFilter}
            onChange={(e) => setReadinessFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="ALL">All Readiness Levels</option>
            <option value="HIGH">Highly Employable (80+)</option>
            <option value="READY">Ready (60 - 79)</option>
            <option value="DEVELOPING">Developing (40 - 59)</option>
            <option value="AT_RISK">At Risk / Backlogs</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60">
                <th className="py-3 px-4 font-semibold">Student Name & ID</th>
                <th className="py-3 px-3 font-semibold">Branch</th>
                <th className="py-3 px-3 font-semibold">CGPA</th>
                <th className="py-3 px-3 font-semibold">Backlogs</th>
                <th className="py-3 px-3 font-semibold">AI Employability Score</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500 dark:text-slate-400">
                    No students match the criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((st) => {
                  const score = st.readiness_score || 75;
                  const isReady = score >= 60;
                  const isHigh = score >= 80;
                  return (
                    <tr
                      key={st.id}
                      onClick={() => {
                        setActiveStudentId(st.id);
                        if (onSelectStudentId) onSelectStudentId(st.id);
                      }}
                      className="hover:bg-indigo-50/40 dark:hover:bg-slate-800/60 cursor-pointer transition-colors group"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {st.name}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                          {st.student_id} · {st.email}
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{st.branch}</span>
                      </td>
                      <td className="py-3.5 px-3 font-mono font-bold text-slate-800 dark:text-slate-200">
                        {st.cgpa.toFixed(1)}
                      </td>
                      <td className="py-3.5 px-3">
                        {st.backlog_count === 0 ? (
                          <span className="text-emerald-700 dark:text-emerald-400 font-semibold">0</span>
                        ) : (
                          <span className="text-rose-700 dark:text-rose-400 font-bold bg-rose-50 dark:bg-rose-950/60 px-1.5 py-0.5 rounded border border-rose-200 dark:border-rose-900">
                            {st.backlog_count}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                isHigh
                                  ? 'bg-emerald-500'
                                  : isReady
                                  ? 'bg-indigo-600'
                                  : 'bg-amber-500'
                              }`}
                              style={{ width: `${score}%` }}
                            />
                          </div>
                          <span className="font-mono font-bold text-slate-900 dark:text-white">
                            {score} / 100
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                            isHigh
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                              : isReady
                              ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300'
                              : score >= 40
                              ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                              : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300'
                          }`}
                        >
                          {isHigh
                            ? 'HIGHLY EMPLOYABLE'
                            : isReady
                            ? 'READY'
                            : score >= 40
                            ? 'DEVELOPING'
                            : 'NOT READY'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveStudentId(st.id);
                            if (onSelectStudentId) onSelectStudentId(st.id);
                          }}
                          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors inline-flex items-center gap-1"
                        >
                          <span>Inspect Profile</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>
            Displaying {filteredStudents.length} of {students.length} students
          </span>
          <span className="text-[11px]">Click any student to view full explainable score</span>
        </div>
      </div>
    </div>
  );
};
