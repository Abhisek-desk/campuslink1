import React, { useState } from 'react';
import { MapPin, AlertTriangle, CheckCircle, Sparkles, ArrowRight, RotateCcw, Building2, CalendarCheck2, } from 'lucide-react';
import { api } from '../api';
export const SchedulingView = ({ drives, conflicts, onRefreshData, onNavigateOffers, }) => {
    const [resolving, setResolving] = useState(false);
    const [resolutionSuccess, setResolutionSuccess] = useState(null);
    const activeConflict = conflicts[0];
    const handleApplyResolution = async () => {
        if (!activeConflict)
            return;
        setResolving(true);
        setResolutionSuccess(null);
        try {
            const res = await api.resolveConflict(activeConflict.suggested_resolution.target_drive_id, activeConflict.suggested_resolution.new_start_time, activeConflict.suggested_resolution.new_end_time);
            setResolutionSuccess(res.message);
            onRefreshData();
        }
        catch (err) {
            console.error('Failed to resolve conflict:', err);
        }
        finally {
            setResolving(false);
        }
    };
    const handleResetConflict = async () => {
        try {
            await api.resetDemoData();
            setResolutionSuccess(null);
            onRefreshData();
        }
        catch (err) {
            console.error('Failed to reset conflict:', err);
        }
    };
    return (<div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Placement Drive Scheduling & Conflict Detection
            </h1>
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
              Conflict-Aware
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Automated calendar orchestration preventing candidate interview collisions and lab overlap.
          </p>
        </div>

        <button onClick={handleResetConflict} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors self-start sm:self-auto" title="Reset to initial conflict state for demonstration">
          <RotateCcw className="w-3.5 h-3.5"/>
          <span>Reset Conflict Scenario</span>
        </button>
      </div>

      {/* SECTION 14: CONFLICT RESOLUTION SUCCESS TOAST OR ACTIVE CONFLICT CARD */}
      {resolutionSuccess && (<div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl shadow-sm flex items-start justify-between gap-3 animate-in fade-in">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 mt-0.5">
              <CheckCircle className="w-5 h-5"/>
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                Resolution Applied Successfully
              </div>
              <p className="text-xs text-emerald-900 mt-0.5 font-medium">
                {resolutionSuccess}
              </p>
              <div className="text-[11px] text-emerald-700 mt-1">
                DataSphere has been moved to 14:00–16:00. Aarav Sharma’s schedule collision is resolved! An update notification was sent to candidate and recruiters.
              </div>
            </div>
          </div>

          <button onClick={() => setResolutionSuccess(null)} className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold">
            Dismiss
          </button>
        </div>)}

      {/* Active Conflict Banner (Section 14 requirement) */}
      {activeConflict && !resolutionSuccess && (<div className="p-6 bg-gradient-to-br from-rose-50 via-white to-rose-50/50 border-2 border-rose-300 rounded-2xl shadow-md space-y-4 animate-in slide-in-from-top-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-rose-200/60 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-rose-600 text-white shadow-sm">
                <AlertTriangle className="w-5 h-5"/>
              </span>
              <div>
                <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">
                  🔴 Scheduling Conflict Detected
                </span>
                <h2 className="text-base font-bold text-slate-900 mt-0.5">
                  Candidate Overlap Collision on {activeConflict.date}
                </h2>
              </div>
            </div>

            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200 self-start md:self-auto">
              Severity: High
            </span>
          </div>

          {/* Conflict Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Overlapping Drives */}
            <div className="p-4 rounded-xl bg-white border border-rose-200 space-y-2.5">
              <div className="text-xs font-bold text-slate-700 uppercase">
                Colliding Placement Drives
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900">
                      {activeConflict.drive1.company_name} ({activeConflict.drive1.role})
                    </span>
                    <div className="text-[11px] text-slate-500">{activeConflict.drive1.venue}</div>
                  </div>
                  <span className="font-mono font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {activeConflict.time_range_1}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-rose-900">
                      {activeConflict.drive2.company_name} ({activeConflict.drive2.role})
                    </span>
                    <div className="text-[11px] text-rose-700">{activeConflict.drive2.venue}</div>
                  </div>
                  <span className="font-mono font-bold text-rose-900 bg-white px-2 py-0.5 rounded border border-rose-200">
                    {activeConflict.time_range_2}
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-rose-800 font-semibold pt-1">
                Time Overlap: 11:00 AM – 12:00 PM (60 min collision)
              </div>
            </div>

            {/* Affected Student Info */}
            <div className="p-4 rounded-xl bg-white border border-rose-200 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-slate-700 uppercase mb-2">
                  Affected Candidate
                </div>

                {activeConflict.affected_students.map((st) => (<div key={st.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{st.name}</span>
                      <span className="text-[10px] font-mono text-slate-500">{st.branch}</span>
                    </div>
                    <p className="text-xs text-rose-700 font-medium mt-1 leading-snug">
                      "{st.name} is shortlisted for two placement drives at overlapping times."
                    </p>
                  </div>))}
              </div>

              {/* Suggested Resolution Box (Section 14) */}
              <div className="mt-3 p-3 rounded-xl bg-indigo-50 border border-indigo-200">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600"/>
                  <span>Suggested Resolution</span>
                </div>
                <div className="text-xs text-indigo-950 font-medium">
                  {activeConflict.suggested_resolution.description}
                </div>
              </div>
            </div>
          </div>

          {/* Action Button: Apply Suggested Resolution */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="text-xs text-slate-500">
              Applying resolution updates the database schedule and dispatches live notification to candidate.
            </div>

            <button onClick={handleApplyResolution} disabled={resolving} className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 flex-shrink-0">
              {resolving ? (<span>Re-scheduling drives...</span>) : (<>
                  <CalendarCheck2 className="w-4 h-4"/>
                  <span>Apply Suggested Resolution</span>
                </>)}
            </button>
          </div>
        </div>)}

      {/* SECTION 13: UPCOMING DRIVES SCHEDULE TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Upcoming Placement Drives</h2>
            <p className="text-xs text-slate-500">
              Master schedule across computing labs and interview interview halls
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700">
            {drives.length} Drives Registered
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 bg-slate-50">
                <th className="py-3 px-4 font-semibold">Company</th>
                <th className="py-3 px-4 font-semibold">Role</th>
                <th className="py-3 px-3 font-semibold">Date</th>
                <th className="py-3 px-3 font-semibold">Time Slot</th>
                <th className="py-3 px-4 font-semibold">Venue</th>
                <th className="py-3 px-3 font-semibold text-center">Candidates</th>
                <th className="py-3 px-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {drives.map((d) => {
            const isConflict = conflicts.some((c) => c.drive1.id === d.id || c.drive2.id === d.id) &&
                !resolutionSuccess;
            return (<tr key={d.id} className={`hover:bg-slate-50 transition-colors ${isConflict ? 'bg-rose-50/40' : ''}`}>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-indigo-600"/>
                        <span>{d.company_name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-800 font-semibold">{d.role}</td>
                    <td className="py-3.5 px-3 font-mono font-medium text-slate-700">
                      {d.date}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${isConflict
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-slate-100 text-slate-800'}`}>
                        {d.start_time} – {d.end_time}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400"/>
                        <span>{d.venue}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono font-bold text-slate-800">
                      {d.candidates_count}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      {isConflict ? (<span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          <AlertTriangle className="w-3 h-3 text-rose-600"/>
                          <span>Conflict</span>
                        </span>) : (<span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle className="w-3 h-3 text-emerald-600"/>
                          <span>Scheduled</span>
                        </span>)}
                    </td>
                  </tr>);
        })}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>
            Venue and lab slots checked against university campus resource registry.
          </span>
          {onNavigateOffers && (<button onClick={onNavigateOffers} className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1">
              <span>Proceed to Offer Tracking</span>
              <ArrowRight className="w-3.5 h-3.5"/>
            </button>)}
        </div>
      </div>
    </div>);
};
