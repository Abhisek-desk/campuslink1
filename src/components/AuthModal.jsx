import React, { useState } from 'react';
import {
  X,
  Lock,
  Mail,
  User,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Building,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react';

export const AuthModal = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialTab = 'login',
  canClose = true,
}) => {
  const [tab, setTab] = useState(initialTab); // 'login' | 'signup'
  const [role, setRole] = useState('student'); // 'student' | 'admin' | 'recruiter'
  
  // Login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Signup fields
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupBranch, setSignupBranch] = useState('CSE');
  const [signupStudentId, setSignupStudentId] = useState('');
  const [signupCgpa, setSignupCgpa] = useState('8.2');
  const [signupGradYear, setSignupGradYear] = useState('2026');
  const [signupCompany, setSignupCompany] = useState('');

  // States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  // Handle Sign In
  const handleLogin = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
          role,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      setSuccessMsg(`Welcome back, ${data.user.name}!`);
      setTimeout(() => {
        onLoginSuccess(data.user);
        if (canClose) onClose();
      }, 500);
    } catch (err) {
      setError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Quick Demo Login for Judges / Evaluators
  const handleQuickDemoLogin = async (demoRole) => {
    setLoading(true);
    setError('');

    let email = 'student@campuslink.com';
    if (demoRole === 'admin') email = 'admin@campuslink.com';
    if (demoRole === 'recruiter') email = 'recruiter@campuslink.com';

    try {
      const res = await fetch('/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role: demoRole }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Demo login failed');

      onLoginSuccess(data.user);
      if (canClose) onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Sign Up
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    if (!signupName.trim() || !signupEmail.trim() || !signupPassword) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/signup/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: signupName,
          email: signupEmail,
          password: signupPassword,
          role,
          branch: signupBranch,
          student_id: signupStudentId || `CS2022-${Math.floor(100 + Math.random() * 900)}`,
          cgpa: parseFloat(signupCgpa) || 8.0,
          graduation_year: parseInt(signupGradYear) || 2026,
          company_name: signupCompany,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      setSuccessMsg('Account registered successfully! Redirecting...');
      setTimeout(() => {
        onLoginSuccess(data.user);
        if (canClose) onClose();
      }, 700);
    } catch (err) {
      setError(err.message || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-slate-900 dark:text-slate-100 transition-colors">
        {/* Top Header */}
        <div className="relative p-6 pb-4 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white">
          {canClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold shadow-sm">
              CL
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white">
                CAMPUSLINK
              </span>
              <span className="ml-2 text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                AI Powered
              </span>
            </div>
          </div>

          <h2 className="text-xl font-bold tracking-tight text-white">
            {tab === 'login' ? 'Sign in to your account' : 'Create candidate or officer account'}
          </h2>
          <p className="text-xs text-indigo-200 mt-0.5">
            Campus-to-Corporate Placement Management & Analytics Platform
          </p>

          {/* Tab Selector */}
          <div className="grid grid-cols-2 gap-1 p-1 mt-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => {
                setTab('login');
                setError('');
              }}
              className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                tab === 'login'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('signup');
                setError('');
              }}
              className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                tab === 'signup'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-4">
          {error && (
            <div className="p-3 text-xs rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 text-xs rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Role Selection Pills */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Select Your Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                  role === 'student'
                    ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-bold ring-1 ring-indigo-500'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span className="text-xs">Student</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                  role === 'admin'
                    ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-bold ring-1 ring-indigo-500'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs">Placement Cell</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('recruiter')}
                className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                  role === 'recruiter'
                    ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-bold ring-1 ring-indigo-500'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs'
                }`}
              >
                <Building className="w-4 h-4" />
                <span className="text-xs">Recruiter</span>
              </button>
            </div>
          </div>

          {/* Quick Demo Logins for Judges */}
          {tab === 'login' && (
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <span>⚡ 1-Click Demo Login</span>
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold lowercase">
                  for judges
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleQuickDemoLogin('admin')}
                  className="px-2 py-1.5 rounded-lg text-left text-xs bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:border-indigo-400 hover:shadow-xs transition-all font-medium flex items-center justify-between"
                >
                  <span className="truncate">👨‍💼 Dr. Verma (Admin)</span>
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleQuickDemoLogin('student')}
                  className="px-2 py-1.5 rounded-lg text-left text-xs bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:border-indigo-400 hover:shadow-xs transition-all font-medium flex items-center justify-between"
                >
                  <span className="truncate">🎓 Aarav (Student)</span>
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleQuickDemoLogin('recruiter')}
                  className="px-2 py-1.5 rounded-lg text-left text-xs bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:border-indigo-400 hover:shadow-xs transition-all font-medium flex items-center justify-between"
                >
                  <span className="truncate">🏢 Google Recruiter</span>
                </button>
              </div>
            </div>
          )}

          {/* Form: LOGIN */}
          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder={
                      role === 'admin'
                        ? 'admin@campuslink.com'
                        : role === 'recruiter'
                        ? 'recruiter@campuslink.com'
                        : 'student@campuslink.com'
                    }
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password (or click 1-Click Demo)"
                    className="w-full pl-9 pr-9 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Form: SIGN UP */
            <form onSubmit={handleSignup} className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="e.g. Aditi Rao"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="e.g. aditi.rao@campuslink.com"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Create a secure password"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Student specific fields */}
              {role === 'student' && (
                <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Roll / Student ID
                    </label>
                    <input
                      type="text"
                      value={signupStudentId}
                      onChange={(e) => setSignupStudentId(e.target.value)}
                      placeholder="e.g. CS2022-099"
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Engineering Branch
                    </label>
                    <select
                      value={signupBranch}
                      onChange={(e) => setSignupBranch(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    >
                      <option value="CSE">CSE</option>
                      <option value="IT">IT</option>
                      <option value="ECE">ECE</option>
                      <option value="AIDS">AI & Data Science</option>
                      <option value="MECH">Mechanical</option>
                      <option value="CIVIL">Civil</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Current CGPA
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      value={signupCgpa}
                      onChange={(e) => setSignupCgpa(e.target.value)}
                      placeholder="8.4"
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Graduation Year
                    </label>
                    <input
                      type="number"
                      value={signupGradYear}
                      onChange={(e) => setSignupGradYear(e.target.value)}
                      placeholder="2026"
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    />
                  </div>
                </div>
              )}

              {/* Recruiter specific fields */}
              {role === 'recruiter' && (
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Company / Organization Name
                  </label>
                  <input
                    type="text"
                    required
                    value={signupCompany}
                    onChange={(e) => setSignupCompany(e.target.value)}
                    placeholder="e.g. Microsoft India, Amazon, TCS"
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Create Account & Enter Platform</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="text-center pt-2">
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {tab === 'login' ? "Don't have an account yet?" : 'Already registered?'}
              <button
                type="button"
                onClick={() => {
                  setTab(tab === 'login' ? 'signup' : 'login');
                  setError('');
                }}
                className="ml-1 font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                {tab === 'login' ? 'Sign up here' : 'Sign in here'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
