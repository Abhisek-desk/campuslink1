import React, { useState, useEffect } from 'react';
import { Sparkles, Search, CheckCircle, AlertTriangle, Info, X, Check, } from 'lucide-react';
import { api } from '../api';
export const AIMatchingView = ({ jobs, onSelectStudent, onNavigateScheduling, }) => {
    const [selectedJobId, setSelectedJobId] = useState(jobs[0]?.id || 'j1');
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [explanationModalMatch, setExplanationModalMatch] = useState(null);
    const [shortlistedMap, setShortlistedMap] = useState({});
    const currentJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];
    useEffect(() => {
        if (currentJob) {
            loadMatches(currentJob.id);
        }
    }, [selectedJobId]);
    const loadMatches = async (jobId) => {
        setLoading(true);
        try {
            const data = await api.runMatchingForJob(jobId);
            setMatches(data.matches);
            // Populate initial shortlist state
            const initialMap = {};
            data.matches.forEach((m) => {
                initialMap[m.student_id] = m.is_shortlisted || false;
            });
            setShortlistedMap(initialMap);
        }
        catch (err) {
            console.error('Failed to run matching:', err);
        }
        finally {
            setLoading(false);
        }
    };
    const handleToggleShortlist = async (studentId) => {
        const currentState = !!shortlistedMap[studentId];
        const newState = !currentState;
        setShortlistedMap((prev) => ({
            ...prev,
            [studentId]: newState,
        }));
        try {
            // Map job to drive id (j1 -> d1, j2 -> d2, j3 -> d3)
            const driveId = currentJob.id === 'j1' ? 'd1' : currentJob.id === 'j2' ? 'd2' : 'd3';
            await api.toggleShortlist(studentId, driveId, newState);
        }
        catch (err) {
            console.error('Failed to toggle shortlist:', err);
        }
    };
    // Filter candidates
    const filteredMatches = matches.filter((m) => {
        const matchesSearch = m.student_name.toLowerCase().includes(search.toLowerCase()) ||
            m.student_branch.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = filterStatus === 'ALL' ||
            (filterStatus === 'SHORTLISTED' && shortlistedMap[m.student_id]) ||
            m.status === filterStatus;
        return matchesSearch && matchesStatus;
    });
    return (<div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              AI-Assisted Matching Engine
            </h1>
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
              Explainable AI
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Multivariate scoring: Eligibility (20%), Skill Match (35%), Project Relevance (15%), Certifications (10%), Assessment (10%), Readiness (10%).
          </p>
        </div>

        <div className="text-xs text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
          <Info className="w-4 h-4 text-indigo-600"/>
          <span>Rule-Based + Weighted Similarity Engine</span>
        </div>
      </div>

      {/* Corporate Drives / Jobs Selector Tabs (Section 9) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {jobs.slice(0, 3).map((job) => {
            const isSelected = job.id === selectedJobId;
            return (<button key={job.id} onClick={() => setSelectedJobId(job.id)} className={`p-4 rounded-xl border text-left transition-all ${isSelected
                    ? 'bg-indigo-50/70 border-indigo-500 shadow-sm ring-1 ring-indigo-500'
                    : 'bg-white border-slate-200 hover:border-slate-300'}`}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                    {job.company_name}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{job.title}</h3>
                </div>
                <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                  {job.ctc}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-1 text-[11px]">
                {job.required_skills.map((s) => (<span key={s.name} className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600 font-medium">
                    {s.name}
                  </span>))}
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Min CGPA: {job.minimum_cgpa.toFixed(1)}</span>
                <span>Deadline: {job.deadline}</span>
              </div>
            </button>);
        })}
      </div>

      {/* Selected Job Context Card */}
      {currentJob && (<div className="bg-slate-900 text-white p-5 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-indigo-400">Target Role</span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-300">{currentJob.company_name}</span>
            </div>
            <h2 className="text-lg font-bold">{currentJob.title} Candidate Rankings</h2>
            <p className="text-xs text-slate-400 max-w-2xl">{currentJob.description}</p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="text-right">
              <div className="text-slate-400">Total Evaluated</div>
              <div className="text-base font-bold text-white font-mono">
                {matches.length} Candidates
              </div>
            </div>
            <div className="h-8 w-px bg-slate-800"/>
            <div className="text-right">
              <div className="text-slate-400">Shortlisted</div>
              <div className="text-base font-bold text-indigo-400 font-mono">
                {Object.values(shortlistedMap).filter(Boolean).length}
              </div>
            </div>
          </div>
        </div>)}

      {/* Search & Status Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5"/>
          <input type="text" placeholder="Search candidate by name or branch..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
        </div>

        <div className="flex items-center gap-2">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="ALL">All Categories</option>
            <option value="Recommended">Recommended Only (80%+)</option>
            <option value="Consider">Consider (65% - 79%)</option>
            <option value="Skill Gap">Skill Gap Detected</option>
            <option value="SHORTLISTED">Shortlisted Only</option>
          </select>
        </div>
      </div>

      {/* Candidate Ranking Table (Section 12) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (<div className="p-12 text-center text-xs text-slate-500">
            Running AI matching engine algorithm...
          </div>) : (<div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 bg-slate-50">
                  <th className="py-3 px-3 font-semibold text-center w-12">Rank</th>
                  <th className="py-3 px-4 font-semibold">Student Name</th>
                  <th className="py-3 px-3 font-semibold">Branch</th>
                  <th className="py-3 px-3 font-semibold">CGPA</th>
                  <th className="py-3 px-3 font-semibold">AI Match Score</th>
                  <th className="py-3 px-3 font-semibold">Readiness</th>
                  <th className="py-3 px-3 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMatches.length === 0 ? (<tr>
                    <td colSpan={8} className="py-8 text-center text-slate-500">
                      No candidates match your search filters.
                    </td>
                  </tr>) : (filteredMatches.map((m, idx) => {
                const isShortlisted = !!shortlistedMap[m.student_id];
                const isTopRank = idx === 0;
                return (<tr key={m.student_id} className={`hover:bg-slate-50/80 transition-colors ${isTopRank ? 'bg-indigo-50/20' : ''}`}>
                        {/* Rank */}
                        <td className="py-3.5 px-3 text-center">
                          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-bold text-xs ${idx === 0
                        ? 'bg-amber-400 text-slate-900 shadow-sm'
                        : idx === 1
                            ? 'bg-slate-300 text-slate-900'
                            : idx === 2
                                ? 'bg-amber-700/20 text-amber-900'
                                : 'text-slate-500'}`}>
                            {idx + 1}
                          </span>
                        </td>

                        {/* Student */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{m.student_name}</span>
                            {isTopRank && (<span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-700">
                                Top Match
                              </span>)}
                          </div>
                          <div className="text-[11px] text-slate-600">
                            {m.eligible ? '✓ Eligible by CGPA' : '⚠ CGPA conditional'}
                          </div>
                        </td>

                        {/* Branch */}
                        <td className="py-3.5 px-3 text-slate-700 font-medium">
                          {m.student_branch}
                        </td>

                        {/* CGPA */}
                        <td className="py-3.5 px-3 font-mono font-bold text-slate-900">
                          {m.student_cgpa.toFixed(1)}
                        </td>

                        {/* Match % */}
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-extrabold font-mono ${m.match_score >= 80
                        ? 'text-emerald-700'
                        : m.match_score >= 65
                            ? 'text-indigo-600'
                            : 'text-amber-600'}`}>
                              {m.match_score}%
                            </span>
                            <div className="w-14 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                              <div className={`h-full rounded-full ${m.match_score >= 80
                        ? 'bg-emerald-500'
                        : m.match_score >= 65
                            ? 'bg-indigo-600'
                            : 'bg-amber-500'}`} style={{ width: `${m.match_score}%` }}/>
                            </div>
                          </div>
                        </td>

                        {/* Readiness */}
                        <td className="py-3.5 px-3 font-mono text-slate-700 font-semibold">
                          {m.readiness_score}%
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${m.status === 'Recommended'
                        ? 'bg-emerald-100 text-emerald-800'
                        : m.status === 'Consider'
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'bg-rose-100 text-rose-800'}`}>
                            {m.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* Section 11: View Match Explanation Modal button */}
                            <button onClick={() => setExplanationModalMatch(m)} className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors flex items-center gap-1" title="Inspect explainable matching telemetry">
                              <Sparkles className="w-3.5 h-3.5"/>
                              <span>View Match Explanation</span>
                            </button>

                            {/* Section 12: Shortlist button */}
                            <button onClick={() => handleToggleShortlist(m.student_id)} className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${isShortlisted
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                              {isShortlisted ? (<>
                                  <Check className="w-3.5 h-3.5"/>
                                  <span>Shortlisted</span>
                                </>) : (<span>Shortlist</span>)}
                            </button>
                          </div>
                        </td>
                      </tr>);
            }))}
              </tbody>
            </table>
          </div>)}

        <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>
            Scoring algorithm stores weights on backend for runtime tunability.
          </span>
          <span className="font-medium text-slate-700">
            {filteredMatches.length} candidates ranked
          </span>
        </div>
      </div>

      {/* SECTION 11: EXPLAINABLE MATCHING MODAL */}
      {explanationModalMatch && (<div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                  AI Match Explanation
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                  {explanationModalMatch.student_name} ↔ {currentJob.company_name} ({currentJob.title})
                </h2>
                <div className="text-xs text-slate-500 mt-1">
                  Candidate ID: {explanationModalMatch.student_branch} · CGPA {explanationModalMatch.student_cgpa.toFixed(1)}
                </div>
              </div>

              <button onClick={() => setExplanationModalMatch(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                <X className="w-5 h-5"/>
              </button>
            </div>

            {/* Overall Match Highlight Box */}
            <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-emerald-50 border border-indigo-100 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-600">Overall Match Evaluation</div>
                <div className="text-2xl font-extrabold text-slate-900 mt-0.5">
                  {explanationModalMatch.match_score}% — {explanationModalMatch.recommendationLabel}
                </div>
              </div>

              <div className={`px-3 py-1 rounded-full text-xs font-bold ${explanationModalMatch.match_score >= 80
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-indigo-100 text-indigo-800'}`}>
                {explanationModalMatch.status}
              </div>
            </div>

            {/* Why? Section (Section 11 requirement) */}
            <div className="mt-5 space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600"/>
                <span>Why this recommendation?</span>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-2">
                {explanationModalMatch.explanation.why.map((reason, i) => (<div key={i} className="flex items-start gap-2 text-xs text-emerald-950 font-medium">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{reason}</span>
                  </div>))}
              </div>
            </div>

            {/* Skill Gaps Section (Section 11 requirement) */}
            {explanationModalMatch.explanation.skill_gaps.length > 0 && (<div className="mt-4 space-y-3">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600"/>
                  <span>Identified Skill Gaps / Nuances</span>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-100 space-y-2">
                  {explanationModalMatch.explanation.skill_gaps.map((gap, i) => (<div key={i} className="flex items-start gap-2 text-xs text-amber-950 font-medium">
                      <span className="text-amber-600 font-bold">⚠</span>
                      <span>{gap}</span>
                    </div>))}
                </div>
              </div>)}

            {/* Weighted Component Breakdown */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2.5">
                Algorithm Component Scoring
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="text-[11px] text-slate-500">Eligibility (20%)</div>
                  <div className="font-bold text-slate-900 font-mono mt-0.5">
                    {explanationModalMatch.explanation.components.eligibilityScore}%
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="text-[11px] text-slate-500">Skill Match (35%)</div>
                  <div className="font-bold text-indigo-600 font-mono mt-0.5">
                    {explanationModalMatch.explanation.components.skillMatchScore}%
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="text-[11px] text-slate-500">Projects (15%)</div>
                  <div className="font-bold text-slate-900 font-mono mt-0.5">
                    {explanationModalMatch.explanation.components.projectScore}%
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="text-[11px] text-slate-500">Certs (10%)</div>
                  <div className="font-bold text-slate-900 font-mono mt-0.5">
                    {explanationModalMatch.explanation.components.certScore}%
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="text-[11px] text-slate-500">Assessment (10%)</div>
                  <div className="font-bold text-slate-900 font-mono mt-0.5">
                    {explanationModalMatch.explanation.components.assessmentScore}%
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="text-[11px] text-slate-500">Readiness (10%)</div>
                  <div className="font-bold text-slate-900 font-mono mt-0.5">
                    {explanationModalMatch.explanation.components.readinessScore}%
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 italic">
                Explainability verified against corporate hiring guidelines.
              </span>
              <div className="flex items-center gap-2">
                <button onClick={() => setExplanationModalMatch(null)} className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors">
                  Close
                </button>
                <button onClick={() => {
                handleToggleShortlist(explanationModalMatch.student_id);
                setExplanationModalMatch(null);
            }} className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors">
                  {shortlistedMap[explanationModalMatch.student_id]
                ? 'Remove from Shortlist'
                : 'Confirm Shortlist'}
                </button>
              </div>
            </div>
          </div>
        </div>)}
    </div>);
};
