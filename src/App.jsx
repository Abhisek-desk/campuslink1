import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { AuthModal } from './components/AuthModal';
import { AIProfileBuilderModal } from './components/AIProfileBuilderModal';
import { AddJobModal } from './components/AddJobModal';
import { DashboardView } from './views/DashboardView';
import { StudentsView } from './views/StudentsView';
import { SkillGapView } from './views/SkillGapView';
import { AIMatchingView } from './views/AIMatchingView';
import { DrivesView } from './views/DrivesView';
import { SchedulingView } from './views/SchedulingView';
import { OffersView } from './views/OffersView';
import { AnalyticsView } from './views/AnalyticsView';
import { RecruitersView } from './views/RecruitersView';
import { StudentPortalView } from './views/StudentPortalView';
import { api } from './api';

export function App() {
  // Theme state: dark / light
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('campuslink-theme');
    if (saved) return saved;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  // Sync theme to document element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('campuslink-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Current logged in user session (Placement Officer by default)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('campuslink-user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      id: 'u-admin',
      name: 'Dr. Suresh Verma',
      email: 'admin@campuslink.com',
      role: 'Placement Officer',
      avatar: 'SV',
    };
  });

  // Modals state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [aiProfileModalOpen, setAiProfileModalOpen] = useState(false);
  const [studentForAIEdit, setStudentForAIEdit] = useState(null);
  const [addJobModalOpen, setAddJobModalOpen] = useState(false);

  const [currentView, setCurrentView] = useState(() => {
    if (user.role === 'Student') return 'student-portal';
    if (user.role === 'Corporate Recruiter') return 'recruiters';
    return 'dashboard';
  });
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  // App data state
  const [students, setStudents] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [drives, setDrives] = useState([]);
  const [offers, setOffers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [conflicts, setConflicts] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load all app data from API
  const refreshAllData = async () => {
    try {
      const [stData, jData, rData, dData, oData, nData, cData, aData] = await Promise.all([
        api.getStudents(),
        api.getJobs(),
        api.getRecruiters(),
        api.getDrives(),
        api.getOffers(),
        api.getNotifications(),
        api.getConflicts(),
        api.getDashboardAnalytics(),
      ]);
      setStudents(stData);
      setJobs(jData);
      setRecruiters(rData);
      setDrives(dData);
      setOffers(oData);
      setNotifications(nData);
      setConflicts(cData);
      setAnalytics(aData);
    } catch (err) {
      console.error('Error fetching data from API:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAllData();
  }, []);

  // Handle successful login or signup
  const handleLoginSuccess = (newUser) => {
    setUser(newUser);
    localStorage.setItem('campuslink-user', JSON.stringify(newUser));

    if (newUser.role === 'Student') {
      setCurrentView('student-portal');
    } else if (newUser.role === 'Corporate Recruiter') {
      setCurrentView('recruiters');
    } else {
      setCurrentView('dashboard');
    }
    refreshAllData();
  };

  // Switch demo roles
  const handleSwitchRole = (role) => {
    if (role === 'admin') {
      const adminUser = {
        id: 'u-admin',
        name: 'Dr. Suresh Verma',
        email: 'admin@campuslink.com',
        role: 'Placement Officer',
        avatar: 'SV',
      };
      setUser(adminUser);
      localStorage.setItem('campuslink-user', JSON.stringify(adminUser));
      setCurrentView('dashboard');
    } else {
      const aarav = students.find((s) => s.email === 'student@campuslink.com') || students[0];
      const studentUser = {
        id: aarav ? aarav.id : 's1',
        name: aarav ? aarav.name : 'Aarav Sharma',
        email: 'student@campuslink.com',
        role: 'Student',
        student_id: aarav ? aarav.student_id : 'CS2022-041',
        branch: aarav ? aarav.branch : 'CSE',
        avatar: 'AS',
      };
      setUser(studentUser);
      localStorage.setItem('campuslink-user', JSON.stringify(studentUser));
      setCurrentView('student-portal');
    }
  };

  const handleMarkNotificationRead = async (id) => {
    try {
      await api.markNotificationRead(id);
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await api.markAllNotificationsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetDemoData = async () => {
    try {
      await api.resetDemoData();
      await refreshAllData();
      alert('Demo data and scheduling conflict successfully re-primed!');
    } catch (err) {
      console.error(err);
    }
  };

  // AI Profile Builder trigger
  const handleOpenAIProfileBuilder = (studentToEdit = null) => {
    if (studentToEdit) {
      setStudentForAIEdit(studentToEdit);
    } else if (user.role === 'Student') {
      const current = students.find((s) => s.email === user.email || s.id === user.id) || students[0];
      setStudentForAIEdit(current);
    } else {
      setStudentForAIEdit(null);
    }
    setAiProfileModalOpen(true);
  };

  const handleProfileSaved = (savedStudent) => {
    refreshAllData();
    if (user.role === 'Student' && savedStudent) {
      setUser((prev) => ({
        ...prev,
        name: savedStudent.name,
        email: savedStudent.email,
        student_id: savedStudent.student_id,
        branch: savedStudent.branch,
      }));
    }
  };

  const handleJobCreated = () => {
    refreshAllData();
    setCurrentView('matching');
  };

  // Find student for student view
  const currentStudent = students.find((s) => s.email === user.email || s.id === user.id) || students[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col text-slate-900 dark:text-slate-100 font-sans antialiased transition-colors">
      {/* Top Navbar */}
      <Navbar
        user={user}
        onSwitchRole={handleSwitchRole}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        onMarkAllRead={handleMarkAllRead}
        conflicts={conflicts}
        onNavigate={(view) => setCurrentView(view)}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenAIProfileBuilder={() => handleOpenAIProfileBuilder()}
        onOpenAddJob={() => setAddJobModalOpen(true)}
      />

      {/* Main Workspace with Dark Sidebar */}
      <div className="flex flex-1">
        <Sidebar
          currentView={currentView}
          onNavigate={(view) => {
            setCurrentView(view);
            if (view !== 'students') {
              setSelectedStudentId(null);
            }
          }}
          user={user}
          hasConflict={conflicts.length > 0}
          onResetDemo={handleResetDemoData}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {loading ? (
            <div className="h-64 flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 gap-3">
              <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              <div className="text-xs font-medium">Connecting to CAMPUSLINK placement database...</div>
            </div>
          ) : (
            <>
              {currentView === 'dashboard' && (
                <DashboardView
                  analytics={analytics}
                  conflicts={conflicts}
                  onNavigate={(v) => setCurrentView(v)}
                  onSelectStudent={(id) => {
                    setSelectedStudentId(id);
                    setCurrentView('students');
                  }}
                />
              )}

              {currentView === 'students' && (
                <StudentsView
                  students={students}
                  selectedStudentId={selectedStudentId}
                  onSelectStudentId={(id) => setSelectedStudentId(id)}
                  onNavigateSkillGap={(studentId) => {
                    setSelectedStudentId(studentId);
                    setCurrentView('skill-gap');
                  }}
                  onNavigateMatching={() => setCurrentView('matching')}
                  onOpenAIProfileBuilder={handleOpenAIProfileBuilder}
                />
              )}

              {currentView === 'skill-gap' && (
                <SkillGapView
                  students={students}
                  initialStudentId={selectedStudentId || undefined}
                  onNavigateMatching={() => setCurrentView('matching')}
                />
              )}

              {currentView === 'recruiters' && (
                <RecruitersView
                  recruiters={recruiters}
                  jobs={jobs}
                  onNavigateMatching={(jobId) => setCurrentView('matching')}
                  onOpenAddJob={() => setAddJobModalOpen(true)}
                />
              )}

              {currentView === 'matching' && (
                <AIMatchingView
                  jobs={jobs}
                  onSelectStudent={(id) => {
                    setSelectedStudentId(id);
                    setCurrentView('students');
                  }}
                  onNavigateScheduling={() => setCurrentView('scheduling')}
                />
              )}

              {currentView === 'drives' && (
                <DrivesView
                  drives={drives}
                  jobs={jobs}
                  conflicts={conflicts}
                  onNavigateMatching={() => setCurrentView('matching')}
                  onNavigateScheduling={() => setCurrentView('scheduling')}
                />
              )}

              {currentView === 'scheduling' && (
                <SchedulingView
                  drives={drives}
                  conflicts={conflicts}
                  onRefreshData={refreshAllData}
                  onNavigateOffers={() => setCurrentView('offers')}
                />
              )}

              {currentView === 'offers' && (
                <OffersView
                  offers={offers}
                  onRefreshOffers={refreshAllData}
                  isAdmin={user.role === 'Placement Officer'}
                />
              )}

              {currentView === 'analytics' && <AnalyticsView analytics={analytics} />}

              {currentView === 'student-portal' && currentStudent && (
                <StudentPortalView
                  student={currentStudent}
                  readiness={{
                    score: currentStudent.readiness_score || 84,
                    status:
                      (currentStudent.readiness_score || 84) >= 80
                        ? 'HIGHLY EMPLOYABLE'
                        : 'READY',
                    breakdown: {
                      academic: 82,
                      technical: 85,
                      projects: 75,
                      certifications: 70,
                      aptitude: 80,
                      interview: 68,
                      communication: 74,
                    },
                    positiveFactors: [
                      'Strong Python and Django skills (80-90% proficiency)',
                      'Cumulative CGPA well above eligibility threshold (7.0)',
                      'Verified technical software projects in portfolio',
                      'Above-average aptitude and problem solving percentile',
                    ],
                    improvementAreas: [
                      'Cloud skills (AWS / Docker) need improvement',
                      'Mock technical interview performance is moderate',
                      'Corporate communication score can improve',
                    ],
                    recommendation:
                      'Focus on cloud fundamentals (AWS/Docker) and mock interview practice to improve placement readiness.',
                  }}
                  offers={offers}
                  drives={drives}
                  notifications={notifications}
                  onNavigateView={(v) => setCurrentView(v)}
                  onRefreshOffers={refreshAllData}
                  onOpenAIProfileBuilder={() => handleOpenAIProfileBuilder(currentStudent)}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <AIProfileBuilderModal
        isOpen={aiProfileModalOpen}
        onClose={() => setAiProfileModalOpen(false)}
        initialStudent={studentForAIEdit}
        onProfileSaved={handleProfileSaved}
      />

      <AddJobModal
        isOpen={addJobModalOpen}
        onClose={() => setAddJobModalOpen(false)}
        onJobCreated={handleJobCreated}
      />
    </div>
  );
}

export default App;
