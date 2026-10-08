import React, { useState } from 'react';
import { CheckCircle, Clock, XCircle, Building2, } from 'lucide-react';
import { api } from '../api';
export const OffersView = ({ offers, onRefreshOffers, isAdmin, }) => {
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [updatingId, setUpdatingId] = useState(null);
    const handleUpdateStatus = async (offerId, newStatus) => {
        setUpdatingId(offerId);
        try {
            await api.updateOfferStatus(offerId, newStatus);
            onRefreshOffers();
        }
        catch (err) {
            console.error('Failed to update offer status:', err);
        }
        finally {
            setUpdatingId(null);
        }
    };
    const filteredOffers = offers.filter((o) => filterStatus === 'ALL' || o.status === filterStatus);
    const acceptedCount = offers.filter((o) => o.status === 'Accepted').length;
    const pendingCount = offers.filter((o) => o.status === 'Pending').length;
    const declinedCount = offers.filter((o) => o.status === 'Declined').length;
    return (<div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Offer Tracking & Placement Records
            </h1>
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              Live Database
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Corporate placement letters, CTC packages, acceptance confirmations, and joining dates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
            Total Offers: {offers.length}
          </span>
        </div>
      </div>

      {/* Top Stat Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-medium text-slate-500 mb-1">Total Extended</div>
          <div className="text-2xl font-extrabold text-slate-900">{offers.length}</div>
          <div className="text-[11px] text-slate-500 mt-1">Across 5 recruiters</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-medium text-emerald-600 mb-1">Accepted Offers</div>
          <div className="text-2xl font-extrabold text-emerald-700">{acceptedCount}</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">Confirmed joinings</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-medium text-amber-600 mb-1">Pending Decisions</div>
          <div className="text-2xl font-extrabold text-amber-700">{pendingCount}</div>
          <div className="text-[11px] text-amber-600 font-medium mt-1">Awaiting candidate sign-off</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-medium text-slate-500 mb-1">Declined / Deferred</div>
          <div className="text-2xl font-extrabold text-slate-700">{declinedCount}</div>
          <div className="text-[11px] text-slate-500 mt-1">Higher offer pursuits</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="text-xs font-bold text-slate-700">Filter By Status</div>
        <div className="flex items-center gap-1.5">
          {['ALL', 'Accepted', 'Pending', 'Declined', 'Deferred'].map((st) => (<button key={st} onClick={() => setFilterStatus(st)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${filterStatus === st
                ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {st === 'ALL' ? 'All Offers' : st}
            </button>))}
        </div>
      </div>

      {/* SECTION 16: OFFER MANAGEMENT TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 bg-slate-50">
                <th className="py-3 px-4 font-semibold">Student Name</th>
                <th className="py-3 px-4 font-semibold">Company</th>
                <th className="py-3 px-4 font-semibold">Role</th>
                <th className="py-3 px-3 font-semibold">CTC Package</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-3 font-semibold">Joining Date</th>
                {isAdmin && <th className="py-3 px-4 font-semibold text-right">Update Status</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOffers.length === 0 ? (<tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No offers found in this view.
                  </td>
                </tr>) : (filteredOffers.map((o) => {
            const isUpdating = updatingId === o.id;
            return (<tr key={o.id} className="hover:bg-slate-50 transition-colors">
                      {/* Student */}
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {o.student_name}
                      </td>

                      {/* Company */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2 font-semibold text-slate-800">
                          <Building2 className="w-4 h-4 text-indigo-600"/>
                          <span>{o.company}</span>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="py-3.5 px-4 text-slate-700 font-medium">{o.role}</td>

                      {/* CTC */}
                      <td className="py-3.5 px-3 font-mono font-bold text-slate-900">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {o.ctc}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-3">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold ${o.status === 'Accepted'
                    ? 'bg-emerald-100 text-emerald-800'
                    : o.status === 'Pending'
                        ? 'bg-amber-100 text-amber-800'
                        : o.status === 'Declined'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-slate-100 text-slate-800'}`}>
                          {o.status === 'Accepted' && <CheckCircle className="w-3 h-3 text-emerald-600"/>}
                          {o.status === 'Pending' && <Clock className="w-3 h-3 text-amber-600"/>}
                          {o.status === 'Declined' && <XCircle className="w-3 h-3 text-rose-600"/>}
                          <span>{o.status}</span>
                        </span>
                      </td>

                      {/* Joining Date */}
                      <td className="py-3.5 px-3 font-mono text-slate-600">
                        {o.joining_date ? (<span>{o.joining_date}</span>) : (<span className="text-slate-400">—</span>)}
                      </td>

                      {/* Status Update Action (Section 16 requirement) */}
                      {isAdmin && (<td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <select value={o.status} disabled={isUpdating} onChange={(e) => handleUpdateStatus(o.id, e.target.value)} className="px-2 py-1 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium">
                              <option value="Pending">Pending</option>
                              <option value="Accepted">Accepted</option>
                              <option value="Declined">Declined</option>
                              <option value="Deferred">Deferred</option>
                            </select>
                          </div>
                        </td>)}
                    </tr>);
        }))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>
            Database changes synchronize immediately with student candidate portals.
          </span>
          <span className="font-medium text-slate-700">
            {filteredOffers.length} offer records active
          </span>
        </div>
      </div>
    </div>);
};
