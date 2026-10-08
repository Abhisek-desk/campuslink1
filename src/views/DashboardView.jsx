import React from 'react';
import { Users, CheckCircle, Calendar, Award, AlertTriangle, ArrowUpRight, ShieldAlert, Clock, Sparkles, } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from 'recharts';
export const DashboardView = ({ analytics, conflicts, onNavigate, onSelectStudent, }) => {
    if (!analytics) {
        return (<div className="p-8 text-center text-slate-500 text-sm">
        Loading placement analytics...
      </div>);
    }
    const { kpi, branch_placement, conversion_trend, top_recruiters, at_risk_students } = analytics;
    return (<div className="space-y-6">
      {/* Top Welcome & Summary Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Placement Command Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time pipeline intelligence, predictive readiness analytics, and placement operations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => onNavigate('matching')} className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors">
            <Sparkles className="w-3.5 h-3.5"/>
            <span>Launch AI Matching Engine</span>
          </button>
        </div>
      </div>

      {/* Visible Conflict Alert Banner if detected */}
      {conflicts.length > 0 && (<div className="p-4 bg-rose-50 border border-rose-200 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-rose-100 text-rose-700 mt-0.5">
              <AlertTriangle className="w-5 h-5"/>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-rose-800 tracking-wide uppercase">
                  🔴 Scheduling Conflict Detected
                </span>
                <span className="text-[11px] text-rose-600 font-medium">
                  {conflicts[0].date}
                </span>
              </div>
              <p className="text-xs text-rose-900 mt-0.5 font-medium">
                {conflicts[0].message}
              </p>
              <div className="text-[11px] text-rose-700 mt-0.5">
                Overlap: {conflicts[0].drive1.company_name} ({conflicts[0].time_range_1}) vs{' '}
                {conflicts[0].drive2.company_name} ({conflicts[0].time_range_2})
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-center">
            <button onClick={() => onNavigate('scheduling')} className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5"/>
              <span>Review & Resolve Conflict</span>
            </button>
          </div>
        </div>)}

      {/* Top KPI Cards (Section 17: Students 500, Ready 372, Active Drives 12, Offers 186, Placed 154, At Risk 43) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium text-slate-600">Total Students</span>
            <Users className="w-4 h-4 text-slate-400"/>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{kpi.total_students}</div>
          <div className="text-[11px] text-slate-500 mt-1">Batch 2026 registered</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-emerald-600 mb-2">
            <span className="text-xs font-medium text-slate-600">Placement Ready</span>
            <CheckCircle className="w-4 h-4 text-emerald-500"/>
          </div>
          <div className="text-2xl font-extrabold text-emerald-700">{kpi.placement_ready}</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">
            74.4% employability index
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-indigo-600 mb-2">
            <span className="text-xs font-medium text-slate-600">Active Drives</span>
            <Calendar className="w-4 h-4 text-indigo-500"/>
          </div>
          <div className="text-2xl font-extrabold text-indigo-700">{kpi.active_drives}</div>
          <div className="text-[11px] text-indigo-600 font-medium mt-1">3 priority drives today</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-blue-600 mb-2">
            <span className="text-xs font-medium text-slate-600">Total Offers</span>
            <Award className="w-4 h-4 text-blue-500"/>
          </div>
          <div className="text-2xl font-extrabold text-blue-700">{kpi.total_offers}</div>
          <div className="text-[11px] text-blue-600 font-medium mt-1">Avg {kpi.avg_package}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-teal-600 mb-2">
            <span className="text-xs font-medium text-slate-600">Students Placed</span>
            <CheckCircle className="w-4 h-4 text-teal-500"/>
          </div>
          <div className="text-2xl font-extrabold text-teal-700">{kpi.placed_students}</div>
          <div className="text-[11px] text-teal-600 font-medium mt-1">
            Highest {kpi.highest_package}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-rose-600 mb-2">
            <span className="text-xs font-medium text-slate-600">At-Risk Students</span>
            <ShieldAlert className="w-4 h-4 text-rose-500"/>
          </div>
          <div className="text-2xl font-extrabold text-rose-700">{kpi.at_risk_count}</div>
          <div className="text-[11px] text-rose-600 font-medium mt-1">Needs intervention</div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Placement Conversion Funnel Trend */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Placement Conversion Trend</h2>
              <p className="text-[11px] text-slate-500">
                Monthly student pipeline progression from registration to offers
              </p>
            </div>
            <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
              Season 2026
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={conversion_trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAssessed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOffered" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{
            backgroundColor: '#1e293b',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '11px',
            border: 'none',
        }}/>
                <Area type="monotone" dataKey="shortlisted" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorAssessed)" name="Shortlisted"/>
                <Area type="monotone" dataKey="offered" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorOffered)" name="Offers Accepted"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 mt-2 pt-3 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"/>
              <span className="text-slate-600">Shortlisted Candidates</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"/>
              <span className="text-slate-600">Confirmed Offers</span>
            </div>
          </div>
        </div>

        {/* Branch-wise Placement Rate (Section 17: CSE 82%, IT 78%, ECE 65%, EEE 54%) */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Branch-wise Placement Rate</h2>
              <p className="text-[11px] text-slate-500">
                Percentage of eligible students placed per academic department
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-600">Target: 75%+</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branch_placement} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                <XAxis dataKey="branch" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false}/>
                <YAxis unit="%" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} domain={[0, 100]}/>
                <Tooltip formatter={(value) => [`${value}% Placed`, 'Placement Rate']} contentStyle={{
            backgroundColor: '#1e293b',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '11px',
            border: 'none',
        }}/>
                <Bar dataKey="rate" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={34}/>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-5 gap-2 mt-2 pt-3 border-t border-slate-100 text-center">
            {branch_placement.map((b) => (<div key={b.branch} className="text-xs">
                <div className="font-bold text-slate-800">{b.rate}%</div>
                <div className="text-[10px] text-slate-600">{b.branch}</div>
              </div>))}
          </div>
        </div>
      </div>

      {/* Row 3: Top Recruiters & At-Risk Students Predictive Model */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Recruiters */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Top Hiring Partners</h2>
              <p className="text-[11px] text-slate-500">Corporate recruiters by offer volume</p>
            </div>
            <button onClick={() => onNavigate('recruiters')} className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
              View all
            </button>
          </div>

          <div className="space-y-3 mt-4">
            {top_recruiters.map((rec, idx) => (<div key={rec.name} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center text-xs border border-indigo-100">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{rec.name}</div>
                    <div className="text-[11px] text-slate-600">{rec.industry}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-slate-900">{rec.hires} offers</div>
                  <div className="text-[11px] text-emerald-600 font-medium">Avg {rec.avgCtc}</div>
                </div>
              </div>))}
          </div>
        </div>

        {/* Section 18: At-Risk Student Predictive Table (2 columns wide) */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900">
                  AI At-Risk Student Predictive Model
                </h2>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                  Prototype Model
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Lightweight predictive risk evaluation based on readiness, backlogs, and mock rejections
              </p>
            </div>
            <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
              43 Flagged for Action
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600 bg-slate-50">
                  <th className="py-2.5 px-3 font-semibold">Student</th>
                  <th className="py-2.5 px-3 font-semibold">Branch</th>
                  <th className="py-2.5 px-3 font-semibold">Risk Level</th>
                  <th className="py-2.5 px-3 font-semibold">Risk Score</th>
                  <th className="py-2.5 px-3 font-semibold">Main Reasons</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Recommended Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {at_risk_students.slice(0, 5).map((st) => (<tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-slate-900">
                      <button onClick={() => {
                if (onSelectStudent)
                    onSelectStudent(st.id);
                onNavigate('students');
            }} className="hover:text-indigo-600 hover:underline text-left font-bold">
                        {st.name}
                      </button>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">{st.branch}</td>
                    <td className="py-2.5 px-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${st.risk_level === 'HIGH'
                ? 'bg-rose-100 text-rose-800'
                : 'bg-amber-100 text-amber-800'}`}>
                        {st.risk_level}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-700">
                      {st.risk_score}%
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 max-w-xs truncate" title={st.main_reasons}>
                      {st.main_reasons}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button onClick={() => {
                if (onSelectStudent)
                    onSelectStudent(st.id);
                onNavigate('skill-gap');
            }} className="px-2 py-1 text-[11px] font-medium rounded text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors">
                        Remediation Plan
                      </button>
                    </td>
                  </tr>))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>
              Predictive factors: Mock interview scoring &lt;60%, backlogs &gt;0, and readiness gaps.
            </span>
            <button onClick={() => onNavigate('students')} className="font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
              <span>View all students</span>
              <ArrowUpRight className="w-3.5 h-3.5"/>
            </button>
          </div>
        </div>
      </div>
    </div>);
};
