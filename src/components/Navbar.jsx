import React, { useState } from 'react';
import { Bell, AlertTriangle, ChevronDown, Compass, Check, } from 'lucide-react';
export const Navbar = ({ user, onSwitchRole, notifications, onMarkNotificationRead, onMarkAllRead, conflicts, onNavigate, onToggleDemoTour, tourActive, }) => {
    const [showNotifs, setShowNotifs] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const unreadCount = notifications.filter((n) => !n.is_read).length;
    return (<header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-600 text-white font-bold tracking-wider shadow-sm">
            CL
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-slate-900 text-lg">CAMPUSLINK</span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                AI Prototype
              </span>
            </div>
            <div className="text-xs text-slate-600 hidden sm:block">
              Campus-to-Corporate Placement & Analytics Platform
            </div>
          </div>
        </div>

        {/* Center Presentation Quick Tour Button */}
        <div className="flex items-center gap-3">
          {/* <button onClick={onToggleDemoTour} className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md border transition-all ${tourActive
            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
            : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'}`} title="Open 5-Minute Judge Demo Guide">
            <Compass className="w-3.5 h-3.5"/>
            <span>5-Min Demo Tour</span>
          </button> */}

          {/* Conflict Alert indicator (Visible demo feature) */}
          {conflicts.length > 0 && (<button onClick={() => onNavigate('scheduling')} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold hover:bg-rose-100 transition-colors animate-pulse" title="Click to resolve scheduling conflict">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600"/>
              <span>Conflict Detected ({conflicts.length})</span>
            </button>)}

          {/* Quick Role Switcher Toggle */}
          <div className="hidden md:flex items-center bg-slate-100 p-0.5 rounded-md border border-slate-200">
            <button onClick={() => onSwitchRole('admin')} className={`px-3 py-1 text-xs font-medium rounded transition-colors ${user.role === 'Placement Officer'
            ? 'bg-white text-slate-900 shadow-sm font-semibold'
            : 'text-slate-600 hover:text-slate-900'}`}>
              Placement Officer
            </button>
            <button onClick={() => onSwitchRole('student')} className={`px-3 py-1 text-xs font-medium rounded transition-colors ${user.role === 'Student'
            ? 'bg-white text-slate-900 shadow-sm font-semibold'
            : 'text-slate-600 hover:text-slate-900'}`}>
              Student (Aarav)
            </button>
          </div>
        </div>

        {/* Right tools: Notifications & User profile */}
        <div className="flex items-center gap-3">
          {/* Notification Bell Dropdown */}
          <div className="relative">
            <button onClick={() => setShowNotifs(!showNotifs)} className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors" aria-label="Open notifications">
              <Bell className="w-5 h-5"/>
              {unreadCount > 0 && (<span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>)}
            </button>

            {showNotifs && (<div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1">
                <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 text-sm">Notifications</span>
                    <span className="text-xs text-slate-500">({notifications.length})</span>
                  </div>
                  {unreadCount > 0 && (<button onClick={onMarkAllRead} className="text-xs font-medium text-indigo-600 hover:text-indigo-800">
                      Mark all read
                    </button>)}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (<div className="p-4 text-center text-xs text-slate-500">No notifications</div>) : (notifications.map((notif) => (<div key={notif.id} onClick={() => onMarkNotificationRead(notif.id)} className={`p-3 text-xs cursor-pointer hover:bg-slate-50 transition-colors ${!notif.is_read ? 'bg-indigo-50/50 font-medium' : ''}`}>
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-slate-800 leading-snug">{notif.message}</p>
                          {!notif.is_read && (<span className="w-2 h-2 rounded-full bg-indigo-600 flex-shrink-0 mt-1"/>)}
                        </div>
                        <div className="mt-1 text-[11px] text-slate-600">{notif.date}</div>
                      </div>)))}
                </div>
              </div>)}
          </div>

          {/* User Account / Role dropdown */}
          <div className="relative">
            <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-semibold flex items-center justify-center text-xs border border-indigo-200">
                {user.avatar}
              </div>
              <div className="text-left hidden lg:block leading-tight">
                <div className="text-xs font-semibold text-slate-900">{user.name}</div>
                <div className="text-[11px] text-slate-600">{user.role}</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-600"/>
            </button>

            {showUserMenu && (<div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 p-2 z-50">
                <div className="px-3 py-2 border-b border-slate-100 mb-1">
                  <div className="text-xs font-bold text-slate-900">{user.name}</div>
                  <div className="text-[11px] text-slate-600">{user.email}</div>
                  <div className="mt-1 inline-block text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                    Role: {user.role}
                  </div>
                </div>

                <div className="text-[11px] font-semibold text-slate-600 px-3 py-1 uppercase">Switch Demo Account</div>
                <button onClick={() => {
                onSwitchRole('admin');
                setShowUserMenu(false);
            }} className={`w-full text-left px-3 py-2 text-xs rounded flex items-center justify-between ${user.role === 'Placement Officer' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'hover:bg-slate-50'}`}>
                  <div>
                    <div>Dr. Suresh Verma</div>
                    <div className="text-[10px] text-slate-600">Placement Officer (Admin)</div>
                  </div>
                  {user.role === 'Placement Officer' && <Check className="w-4 h-4 text-indigo-600"/>}
                </button>

                <button onClick={() => {
                onSwitchRole('student');
                setShowUserMenu(false);
            }} className={`w-full text-left px-3 py-2 text-xs rounded flex items-center justify-between ${user.role === 'Student' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'hover:bg-slate-50'}`}>
                  <div>
                    <div>Aarav Sharma</div>
                    <div className="text-[10px] text-slate-600">Student (CSE · 2026)</div>
                  </div>
                  {user.role === 'Student' && <Check className="w-4 h-4 text-indigo-600"/>}
                </button>
              </div>)}
          </div>
        </div>
      </div>
    </header>);
};
