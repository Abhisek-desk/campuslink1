import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, Lightbulb, Sparkles, } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, } from 'recharts';
import { api } from '../api';
export const SkillGapView = ({ students, initialStudentId, onNavigateMatching, }) => {
    const [selectedStudentId, setSelectedStudentId] = useState(initialStudentId || (students[0]?.id || 's1'));
    const [targetRole, setTargetRole] = useState('Software Engineer');
    const [gapData, setGapData] = useState(null);
    const [loading, setLoading] = useState(false);
    const currentStudent = students.find((s) => s.id === selectedStudentId) || students[0];
    useEffect(() => {
        if (currentStudent) {
            loadGaps(currentStudent.id, targetRole);
        }
    }, [selectedStudentId, targetRole]);
    const loadGaps = async (studentId, role) => {
        setLoading(true);
        try {
            const data = await api.getSkillGaps(studentId, role);
            setGapData(data);
        }
        catch (err) {
            console.error('Failed to load skill gaps:', err);
        }
        finally {
            setLoading(false);
        }
    };
    const chartData = gapData?.comparison.map((item) => ({
        name: item.skill,
        'Current Proficiency': item.current,
        'Required Benchmark': item.required,
        status: item.status,
    })) || [];
    return (<div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              AI Skill Gap Analysis
            </h1>
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
              Benchmark v2.4
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Compare candidate competency levels against real corporate job profiles to generate tailored upskilling roadmaps.
          </p>
        </div>

        {onNavigateMatching && (<button onClick={onNavigateMatching} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors">
            <Sparkles className="w-3.5 h-3.5"/>
            <span>Test Recruiter Matching</span>
          </button>)}
      </div>

      {/* Selectors Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Candidate Selector */}
        <div className="flex-1">
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Candidate Profile
          </label>
          <select value={selectedStudentId} onChange={(e) => setSelectedStudentId(e.target.value)} className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {students.map((st) => (<option key={st.id} value={st.id}>
                {st.name} ({st.student_id}) — {st.branch} · CGPA {st.cgpa.toFixed(1)}
              </option>))}
          </select>
        </div>

        {/* Target Job Role Dropdown (Section 8 requirement) */}
        <div className="w-full md:w-72">
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Target Job Role
          </label>
          <select value={targetRole} onChange={(e) => setTargetRole(e.target.value)} className="w-full px-3 py-2 text-xs border border-indigo-200 rounded-lg bg-indigo-50/50 font-bold text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="Software Engineer">Software Engineer (TechNova)</option>
            <option value="Data Analyst">Data Analyst (DataSphere)</option>
            <option value="Cloud Engineer">Cloud Engineer (CloudWorks)</option>
            <option value="Full Stack Developer">Full Stack Developer (Apex Systems)</option>
          </select>
        </div>
      </div>

      {loading || !gapData ? (<div className="p-12 text-center text-slate-500 text-xs">
          Computing skill matrix against {targetRole}...
        </div>) : (<>
          {/* Comparison Matrix & Side-by-Side Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Table: Skill | Current | Required | Status (Section 8) */}
            <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      Competency Matrix: {targetRole}
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Evaluated against corporate placement criteria
                    </p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded border ${gapData.totalGaps === 0
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                    {gapData.totalGaps === 0
                ? 'All Criteria Met'
                : `${gapData.totalGaps} Skill Gaps Found`}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 bg-slate-50">
                        <th className="py-2.5 px-3 font-semibold">Skill</th>
                        <th className="py-2.5 px-3 font-semibold">Current</th>
                        <th className="py-2.5 px-3 font-semibold">Required</th>
                        <th className="py-2.5 px-3 font-semibold text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {gapData.comparison.map((row) => (<tr key={row.skill} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3 px-3 font-bold text-slate-900">{row.skill}</td>
                          <td className="py-3 px-3 font-mono font-medium text-slate-700">
                            {row.current}%
                          </td>
                          <td className="py-3 px-3 font-mono text-slate-500">
                            {row.required}%
                          </td>
                          <td className="py-3 px-3 text-right">
                            {row.status === 'Strong' && (<span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                <CheckCircle className="w-3 h-3 text-emerald-600"/>
                                <span>Strong</span>
                              </span>)}
                            {row.status === 'Met' && (<span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                                <CheckCircle className="w-3 h-3 text-indigo-600"/>
                                <span>Met</span>
                              </span>)}
                            {row.status === 'Gap' && (<span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                                <AlertTriangle className="w-3 h-3 text-rose-600"/>
                                <span>Gap (-{row.gap}%)</span>
                              </span>)}
                          </td>
                        </tr>))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4 text-[11px] text-slate-500">
                Data benchmarked against past successful offers from recruiting partners.
              </div>
            </div>

            {/* Visual Side-by-Side Chart */}
            <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    Visual Gap Comparison
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    Side-by-side proficiency delta vs job requirement
                  </p>
                </div>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false}/>
                    <YAxis unit="%" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} domain={[0, 100]}/>
                    <Tooltip formatter={(value, name) => [`${value}%`, name]} contentStyle={{
                backgroundColor: '#1e293b',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '11px',
                border: 'none',
            }}/>
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}/>
                    <Bar dataKey="Current Proficiency" fill="#4f46e5" radius={[4, 4, 0, 0]}/>
                    <Bar dataKey="Required Benchmark" fill="#94a3b8" radius={[4, 4, 0, 0]}/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Section 8: Recommended Preparation Roadmap */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-indigo-600"/>
                <h2 className="text-base font-bold text-slate-900">
                  Recommended Preparation Roadmap
                </h2>
              </div>
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                Personalized for {currentStudent.name}
              </span>
            </div>

            <p className="text-xs text-slate-600">
              Follow these prioritized milestone actions to eliminate remaining skill gaps and maximize selection probability for {targetRole}:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {gapData.recommendations.map((rec, idx) => (<div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-start gap-3 hover:bg-white hover:shadow-sm transition-all">
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{rec}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Target completion: Within next 14 days
                    </div>
                  </div>
                </div>))}
            </div>
          </div>
        </>)}
    </div>);
};
