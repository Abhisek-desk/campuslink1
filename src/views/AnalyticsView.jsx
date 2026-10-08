import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, } from 'recharts';
import { GraduationCap, } from 'lucide-react';
const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];
export const AnalyticsView = ({ analytics }) => {
    if (!analytics)
        return <div className="p-8 text-xs text-slate-500">Loading analytics...</div>;
    const { kpi, branch_placement, conversion_trend, salary_distribution, top_recruiters } = analytics;
    return (<div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Placement Command Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Season 2026 institutional metrics, hiring velocity, CTC distribution, and branch performance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
            Placement Rate: 74.4%
          </span>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-medium text-slate-500 mb-1">Average CTC Package</div>
          <div className="text-2xl font-extrabold text-slate-900">{kpi.avg_package}</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">+14.2% vs 2025 season</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-medium text-slate-500 mb-1">Highest CTC Secured</div>
          <div className="text-2xl font-extrabold text-indigo-600">{kpi.highest_package}</div>
          <div className="text-[11px] text-slate-500 mt-1">QuantumEdge High-Freq Systems</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-medium text-slate-500 mb-1">Offers-to-Student Ratio</div>
          <div className="text-2xl font-extrabold text-slate-900">1.21x</div>
          <div className="text-[11px] text-indigo-600 font-medium mt-1">Multiple offer candidates: 32</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-medium text-slate-500 mb-1">Active Enterprise Recruiters</div>
          <div className="text-2xl font-extrabold text-emerald-700">48 Partners</div>
          <div className="text-[11px] text-slate-500 mt-1">5 Tier-1 priority drives active</div>
        </div>
      </div>

      {/* Row 1: Conversion Trend & Salary Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Placement Conversion Line Chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Hiring Velocity & Funnel Conversion</h2>
              <p className="text-[11px] text-slate-500">Cumulative progression across placement milestones</p>
            </div>
            <span className="text-xs font-mono font-semibold text-slate-600">Monthly</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversion_trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}/>
                <Line type="monotone" dataKey="registered" stroke="#94a3b8" strokeWidth={2} name="Registered"/>
                <Line type="monotone" dataKey="assessed" stroke="#6366f1" strokeWidth={2} name="Assessed"/>
                <Line type="monotone" dataKey="shortlisted" stroke="#f59e0b" strokeWidth={2} name="Shortlisted"/>
                <Line type="monotone" dataKey="offered" stroke="#10b981" strokeWidth={3} name="Offered"/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Salary CTC Distribution */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Salary Tier Distribution (CTC)</h2>
              <p className="text-[11px] text-slate-500">Student count grouped by annual package bracket</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salary_distribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                <XAxis dataKey="range" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false}/>
                <Tooltip formatter={(value) => [`${value} Offers`, 'Offer Count']} contentStyle={{
            backgroundColor: '#1e293b',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '11px',
            border: 'none',
        }}/>
                <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} barSize={36}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Branch Comparison & Recruiter Hiring Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Branch-wise Department Details */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Academic Department Performance</h2>
              <p className="text-[11px] text-slate-500">Placement percentage vs eligible cohort</p>
            </div>
          </div>

          <div className="space-y-3">
            {branch_placement.map((b) => (<div key={b.branch} className="p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-1.5">
                  <span className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-indigo-600"/>
                    <span>{b.branch}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500 font-normal">
                      {b.placed} / {b.eligible} Placed
                    </span>
                    <span className="font-mono text-indigo-700">{b.rate}%</span>
                  </div>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div className={`h-full rounded-full ${b.rate >= 75 ? 'bg-emerald-500' : b.rate >= 60 ? 'bg-indigo-600' : 'bg-amber-500'}`} style={{ width: `${b.rate}%` }}/>
                </div>
              </div>))}
          </div>
        </div>

        {/* Corporate Recruiter Hiring Metrics */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Corporate Hiring Velocity</h2>
              <p className="text-[11px] text-slate-500">Offers extended by primary institutional partners</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 bg-slate-50">
                  <th className="py-2.5 px-3 font-semibold">Company</th>
                  <th className="py-2.5 px-3 font-semibold">Industry</th>
                  <th className="py-2.5 px-3 font-semibold">Offers</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Avg Package</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {top_recruiters.map((r) => (<tr key={r.name} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">{r.name}</td>
                    <td className="py-2.5 px-3 text-slate-600">{r.industry}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-indigo-600">{r.hires}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-700 text-right">
                      {r.avgCtc}
                    </td>
                  </tr>))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>);
};
