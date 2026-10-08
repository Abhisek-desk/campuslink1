import React from 'react';
import { LayoutDashboard, Users, Target, Briefcase, Sparkles, Calendar, Clock, Award, BarChart3, RotateCcw, Database, AlertTriangle, UserCheck, } from 'lucide-react';
export const Sidebar = ({ currentView, onNavigate, user, hasConflict, onResetDemo, }) => {
    const isAdmin = user.role === 'Placement Officer';
    const adminNavItems = [
        { id: 'dashboard', label: 'Command Dashboard', icon: LayoutDashboard },
        { id: 'students', label: 'Students Directory', icon: Users },
        { id: 'skill-gap', label: 'Skill Gap Analysis', icon: Target },
        { id: 'recruiters', label: 'Recruiters & Jobs', icon: Briefcase },
        { id: 'matching', label: 'AI Matching Engine', icon: Sparkles, badge: 'AI' },
        { id: 'drives', label: 'Placement Drives', icon: Calendar, badge: '3 Drives' },
        {
            id: 'scheduling',
            label: 'Scheduling & Conflicts',
            icon: Clock,
            alert: hasConflict,
        },
        { id: 'offers', label: 'Offer Tracking', icon: Award },
        { id: 'analytics', label: 'Placement Analytics', icon: BarChart3 },
    ];
    const studentNavItems = [
        { id: 'student-portal', label: 'Student Command Hub', icon: LayoutDashboard },
        { id: 'students', label: 'My AI Readiness Profile', icon: UserCheck },
        { id: 'skill-gap', label: 'Skill Gap & Roadmap', icon: Target },
        { id: 'matching', label: 'Recommended Jobs', icon: Sparkles, badge: 'AI' },
        { id: 'drives', label: 'Upcoming Drives', icon: Calendar },
        { id: 'offers', label: 'My Offers & CTC', icon: Award },
    ];
    const items = isAdmin ? adminNavItems : studentNavItems;
    return (<aside className="w-64 bg-slate-900 text-slate-300 flex flex-col flex-shrink-0 min-h-[calc(100vh-61px)]">
      {/* Role Context Header */}
      <div className="px-5 py-4 border-b border-slate-800">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Active Workspace
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-sm font-semibold text-white">
            {isAdmin ? 'Placement Operations' : 'Student Career Portal'}
          </span>
          <span className={`w-2 h-2 rounded-full ${isAdmin ? 'bg-indigo-400' : 'bg-emerald-400'}`}/>
        </div>
        <div className="text-xs text-slate-400 mt-0.5 truncate">
          {isAdmin ? 'Campus Admin Suite' : `${user.name} (${user.student_id || 'CSE'})`}
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {items.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (<button key={item.id} onClick={() => onNavigate(item.id)} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${isActive
                    ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`}/>
                <span>{item.label}</span>
              </div>

              {item.badge && (<span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  {item.badge}
                </span>)}

              {item.alert && (<span className="flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse">
                  <AlertTriangle className="w-3 h-3 text-rose-400"/>
                  Conflict
                </span>)}
            </button>);
        })}
      </nav>

      {/* Database / Engine Health Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/60 space-y-3">
        <div className="space-y-1.5 text-[11px]">
          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-emerald-400"/>
              <span>Database</span>
            </span>
            <span className="font-mono text-emerald-400 font-semibold">MySQL (Active)</span>
          </div>

          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400"/>
              <span>Matching Engine</span>
            </span>
            <span className="font-mono text-indigo-300 font-medium">Weighted v2.4</span>
          </div>
        </div>

        <button onClick={onResetDemo} className="w-full flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-md border border-slate-700 transition-colors" title="Reset database to initial conflict state for demonstration">
          <RotateCcw className="w-3.5 h-3.5"/>
          <span>Reset Demo Data</span>
        </button>
      </div>
    </aside>);
};
