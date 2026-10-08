import React, { useState } from 'react';
import {
  Bell,
  AlertTriangle,
  ChevronDown,
  Compass,
  Check,
  Sun,
  Moon,
  Sparkles,
  LogIn,
  LogOut,
  UserPlus,
  PlusCircle,
} from 'lucide-react';

export const Navbar = ({
  user,
  onSwitchRole,
  notifications,
  onMarkNotificationRead,
  onMarkAllRead,
  conflicts,
  onNavigate,
  theme,
  onToggleTheme,
  onOpenAuth,
  onOpenAIProfileBuilder,
  onOpenAddJob,
}) => {
  const [showNotifs, setShowNotifs] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 gap-2">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-600 text-white font-extrabold tracking-wider shadow-sm flex-shrink-0">
            CL
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-slate-900 dark:text-white text-base sm:text-lg">
                CAMPUSLINK
              </span>
              <span className="text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hidden sm:inline-block">
                AI Prototype
              </span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 hidden md:block">
              Campus-to-Corporate Placement & Analytics Platform
            </div>
          </div>
        </div>

        {/* Center Presentation Quick Tour & AI Shortcut Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Conflict Alert indicator (Visible demo feature) */}
          {conflicts.length > 0 && (
            <button
              onClick={() => onNavigate('scheduling')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-semibold hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors animate-pulse"
              title="Click to resolve scheduling conflict"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span className="hidden sm:inline">Conflict Detected ({conflicts.length})</span>
              <span className="sm:hidden font-bold">({conflicts.length})</span>
            </button>
          )}

          {/* AI Student Details Builder Button */}
          {onOpenAIProfileBuilder && (
            <button
              onClick={onOpenAIProfileBuilder}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm hover:from-indigo-700 hover:to-violet-700 transition-all border border-indigo-500/20"
              title="Add or update candidate details with AI resume parser"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add Details (AI)</span>
              <span className="sm:hidden">AI Profile</span>
            </button>
          )}

          {/* Quick Role Switcher Toggle */}
          <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => onSwitchRole('admin')}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                user.role === 'Placement Officer'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Placement Officer
            </button>
            <button
              onClick={() => onSwitchRole('student')}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                user.role === 'Student'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Student (Aarav)
            </button>
          </div>
        </div>

        {/* Right tools: Theme Toggle, Notifications & User profile */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* DARK / LIGHT THEME TOGGLE BUTTON */}
          <button
            onClick={onToggleTheme}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle dark/light theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 animate-in spin-in-90 duration-200" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 animate-in spin-in-90 duration-200" />
            )}
          </button>

          {/* Notification Bell Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifs(!showNotifs)}
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              aria-label="Open notifications"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifs && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1">
                <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 dark:text-white text-sm">
                      Notifications
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      ({notifications.length})
                    </span>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={onMarkAllRead}
                      className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-500">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => onMarkNotificationRead(notif.id)}
                        className={`p-3 text-xs cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors ${
                          !notif.is_read
                            ? 'bg-indigo-50/50 dark:bg-indigo-950/30 font-medium'
                            : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-slate-800 dark:text-slate-200 leading-snug">
                            {notif.message}
                          </p>
                          {!notif.is_read && (
                            <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 flex-shrink-0 mt-1" />
                          )}
                        </div>
                        <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                          {notif.date}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Account / Role dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold flex items-center justify-center text-xs border border-indigo-200 dark:border-indigo-800">
                {user.avatar || 'U'}
              </div>
              <div className="text-left hidden lg:block leading-tight">
                <div className="text-xs font-semibold text-slate-900 dark:text-white">
                  {user.name}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {user.role}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 hidden sm:block" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {user.name}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {user.email}
                  </div>
                  <div className="mt-1 inline-block text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    Role: {user.role}
                  </div>
                </div>

                {/* AI Detail Parser Action */}
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    if (onOpenAIProfileBuilder) onOpenAIProfileBuilder();
                  }}
                  className="w-full text-left px-3 py-2 text-xs rounded-xl flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 font-semibold"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Update Profile with AI</span>
                </button>

                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1 mt-1">
                  Demo Fast-Switch
                </div>
                <button
                  onClick={() => {
                    onSwitchRole('admin');
                    setShowUserMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs rounded-lg flex items-center justify-between ${
                    user.role === 'Placement Officer'
                      ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div>
                    <div>Dr. Suresh Verma</div>
                    <div className="text-[10px] text-slate-500">Placement Officer (Admin)</div>
                  </div>
                  {user.role === 'Placement Officer' && (
                    <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  )}
                </button>

                <button
                  onClick={() => {
                    onSwitchRole('student');
                    setShowUserMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs rounded-lg flex items-center justify-between ${
                    user.role === 'Student'
                      ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div>
                    <div>Aarav Sharma</div>
                    <div className="text-[10px] text-slate-500">Student (CSE · 2026)</div>
                  </div>
                  {user.role === 'Student' && (
                    <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  )}
                </button>

                {/* Login / Sign Up Modal Trigger */}
                <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      if (onOpenAuth) onOpenAuth();
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs rounded-lg flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <LogIn className="w-3.5 h-3.5 text-slate-500" />
                    <span>Sign In / Switch User</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
