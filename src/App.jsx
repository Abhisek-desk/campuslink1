import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DemoTourBar, DEMO_STEPS } from './components/DemoTourBar';
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
    // Current logged in user session (Placement Officer by default)
    const [user, setUser] = useState({
        id: 'u-admin',
        name: 'Dr. Suresh Verma',
        email: 'admin@campuslink.com',
        role: 'Placement Officer',
        avatar: 'SV',
    });
    const [currentView, setCurrentView] = useState('dashboard');
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
    // 5-Minute Presentation Tour state
    // const [tourActive, setTourActive] = useState(true);
    // const [currentTourStep, setCurrentTourStep] = useState(0);
    // Load all app data from API
    const refreshAllData = async () => {
        try {
            const [stData, jData, rData, dData, oData, nData, cData, aData,] = await Promise.all([
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
        }
        catch (err) {
            console.error('Error fetching data from API:', err);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        refreshAllData();
    }, []);
    // Switch demo roles
    const handleSwitchRole = (role) => {
        if (role === 'admin') {
            setUser({
                id: 'u-admin',
                name: 'Dr. Suresh Verma',
                email: 'admin@campuslink.com',
                role: 'Placement Officer',
                avatar: 'SV',
            });
            setCurrentView('dashboard');
        }
        else {
            const aarav = students.find((s) => s.email === 'student@campuslink.com') || students[0];
            setUser({
                id: aarav ? aarav.id : 's1',
                name: aarav ? aarav.name : 'Aarav Sharma',
                email: 'student@campuslink.com',
                role: 'Student',
                student_id: aarav ? aarav.student_id : 'CS2022-041',
                branch: aarav ? aarav.branch : 'CSE',
                avatar: 'AS',
            });
            setCurrentView('student-portal');
        }
    };
    // Step change in Presentation Tour
    const handleSetTourStep = (stepIndex) => {
        setCurrentTourStep(stepIndex);
        const step = DEMO_STEPS[stepIndex];
        if (step) {
            if (step.role === 'student' && user.role !== 'Student') {
                handleSwitchRole('student');
            }
            else if (step.role === 'admin' && user.role !== 'Placement Officer') {
                handleSwitchRole('admin');
            }
            setCurrentView(step.view);
            if (step.view === 'students') {
                setSelectedStudentId('s1'); // Select Aarav Sharma directly
            }
        }
    };
    const handleMarkNotificationRead = async (id) => {
        try {
            await api.markNotificationRead(id);
            setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
        }
        catch (err) {
            console.error(err);
        }
    };
    const handleMarkAllRead = async () => {
        try {
            await api.markAllNotificationsRead();
            setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
        }
        catch (err) {
            console.error(err);
        }
    };
    const handleResetDemoData = async () => {
        try {
            await api.resetDemoData();
            await refreshAllData();
            alert('Demo data and scheduling conflict successfully re-primed!');
        }
        catch (err) {
            console.error(err);
        }
    };
    // Find student for student view
    const currentStudent = students.find((s) => s.email === user.email) || students[0];
    return (<div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans antialiased">
      {/* 5-Minute Tour Banner (Section 27) */}
      {/* {tourActive && (<DemoTourBar currentStepIndex={currentTourStep} onSetStep={handleSetTourStep} onClose={() => setTourActive(false)}/>)} */}

      {/* Top Navbar */}
      {/* tourActive={tourActive} */}
      <Navbar user={user} onSwitchRole={handleSwitchRole} notifications={notifications} onMarkNotificationRead={handleMarkNotificationRead} onMarkAllRead={handleMarkAllRead} conflicts={conflicts} onNavigate={(view) => setCurrentView(view)} onToggleDemoTour={() => setTourActive(!tourActive)} />

      {/* Main Workspace with Dark Sidebar */}
      <div className="flex flex-1">
        <Sidebar currentView={currentView} onNavigate={(view) => {
            setCurrentView(view);
            if (view !== 'students') {
                setSelectedStudentId(null);
            }
        }} user={user} hasConflict={conflicts.length > 0} onResetDemo={handleResetDemoData}/>

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {loading ? (<div className="h-64 flex flex-col items-center justify-center text-slate-500 gap-3">
              <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"/>
              <div className="text-xs font-medium">Connecting to CAMPUSLINK placement database...</div>
            </div>) : (<>
              {currentView === 'dashboard' && (<DashboardView analytics={analytics} conflicts={conflicts} onNavigate={(v) => setCurrentView(v)} onSelectStudent={(id) => {
                    setSelectedStudentId(id);
                    setCurrentView('students');
                }}/>)}

              {currentView === 'students' && (<StudentsView students={students} selectedStudentId={selectedStudentId} onSelectStudentId={(id) => setSelectedStudentId(id)} onNavigateSkillGap={(studentId) => {
                    setSelectedStudentId(studentId);
                    setCurrentView('skill-gap');
                }} onNavigateMatching={() => setCurrentView('matching')}/>)}

              {currentView === 'skill-gap' && (<SkillGapView students={students} initialStudentId={selectedStudentId || undefined} onNavigateMatching={() => setCurrentView('matching')}/>)}

              {currentView === 'recruiters' && (<RecruitersView recruiters={recruiters} jobs={jobs} onNavigateMatching={() => setCurrentView('matching')}/>)}

              {currentView === 'matching' && (<AIMatchingView jobs={jobs} onSelectStudent={(id) => {
                    setSelectedStudentId(id);
                    setCurrentView('students');
                }} onNavigateScheduling={() => setCurrentView('scheduling')}/>)}

              {currentView === 'drives' && (<DrivesView drives={drives} jobs={jobs} conflicts={conflicts} onNavigateMatching={() => setCurrentView('matching')} onNavigateScheduling={() => setCurrentView('scheduling')}/>)}

              {currentView === 'scheduling' && (<SchedulingView drives={drives} conflicts={conflicts} onRefreshData={refreshAllData} onNavigateOffers={() => setCurrentView('offers')}/>)}

              {currentView === 'offers' && (<OffersView offers={offers} onRefreshOffers={refreshAllData} isAdmin={user.role === 'Placement Officer'}/>)}

              {currentView === 'analytics' && (<AnalyticsView analytics={analytics}/>)}

              {currentView === 'student-portal' && currentStudent && (<StudentPortalView student={currentStudent} readiness={{
                    score: currentStudent.readiness_score || 84,
                    status: (currentStudent.readiness_score || 84) >= 80
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
                        'Cumulative CGPA 8.4 well above eligibility threshold (7.0)',
                        '3 verified technical software projects in portfolio',
                        'Above-average aptitude and problem solving percentile (82%)',
                    ],
                    improvementAreas: [
                        'Cloud skills (AWS 40%, Docker 30%) need improvement',
                        'Mock technical interview performance is moderate (68%)',
                        'Corporate communication score can improve (74%)',
                    ],
                    recommendation: 'Focus on cloud fundamentals (AWS/Docker) and mock interview practice to improve placement readiness.',
                }} offers={offers} drives={drives} notifications={notifications} onNavigateView={(v) => setCurrentView(v)} onRefreshOffers={refreshAllData}/>)}
            </>)}
        </main>
      </div>
    </div>);
}
export default App;
