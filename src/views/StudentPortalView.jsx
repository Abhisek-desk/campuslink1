import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  CheckCircle,
  Award,
  Calendar,
  Bell,
  Check,
  ChevronRight,
  UserCheck,
} from 'lucide-react';
import { api } from '../api';

export const StudentPortalView = ({
  student,
  readiness,
  offers,
  drives,
  notifications,
  onNavigateView,
  onRefreshOffers,
  onOpenAIProfileBuilder,
}) => {
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStudentRecommendations();
  }, [student.id]);

  const loadStudentRecommendations = async () => {
    setLoading(true);
    try {
      const data = await api.getMatchingForStudent(student.id);
      setRecommendedJobs(data.recommended_jobs || []);
    } catch (err) {
      console.error('Failed to load student matches:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOfferDecision = async (offerId, decision) => {
    try {
      await api.updateOfferStatus(offerId, decision);
      onRefreshOffers();
    } catch (err) {
      console.error('Failed to update offer decision:', err);
    }
  };

  const studentOffers = offers.filter((o) => o.student_id === student.id);
  const studentNotifs = notifications.filter((n) => n.student_id === student.id);

  const isHigh = readiness.score >= 80;

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-slate-900 dark:text-slate-100">
      {/* Top Welcome Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-400/30">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Class of 2026 Career Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {student.name.split(' ')[0]} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Your placement profile is synchronized with corporate recruiters. You have{' '}
            <strong className="text-white">{studentOffers.length} offer letter</strong> and{' '}
            <strong className="text-white">upcoming placement drives</strong>.
          </p>

          {/* AI Details Trigger Button */}
          {onOpenAIProfileBuilder && (
            <div className="pt-2">
              <button
                onClick={() => onOpenAIProfileBuilder(student)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 border border-indigo-400/30"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>✨ Update Profile With AI Resume Builder</span>
              </button>
            </div>
          )}
        </div>

        {/* Readiness Highlight Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex items-center gap-4 flex-shrink-0">
          <div className="text-center">
            <div className="text-[11px] font-semibold text-indigo-200 uppercase tracking-wider">
              AI Readiness Score
            </div>
            <div className="text-4xl font-extrabold font-mono text-white mt-1">
              {readiness.score}
              <span className="text-lg font-normal text-slate-300">/100</span>
            </div>
            <div
              className={`inline-block mt-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                isHigh
                  ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/30'
                  : 'bg-indigo-500/30 text-indigo-200 border border-indigo-400/30'
              }`}
            >
              🟢 {readiness.status}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => onNavigateView('students')}
              className="px-3 py-2 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 transition-colors shadow-xs"
            >
              Deep Dive
            </button>
            {onOpenAIProfileBuilder && (
              <button
                onClick={() => onOpenAIProfileBuilder(student)}
                className="px-3 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors"
                title="Edit details with AI"
              >
                Edit (AI)
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Row 1: Recommended Jobs with Match % */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                AI Recommended Jobs & Recruiter Matches
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ranked by explainable multi-variable compatibility with your skillset and projects
            </p>
          </div>
          <button
            onClick={() => onNavigateView('matching')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
          >
            View all jobs →
          </button>
        </div>

        {/* Cards for 3 Drives / Jobs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {recommendedJobs.slice(0, 3).map((match) => (
            <div
              key={match.job_id}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                      {match.company_name}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {match.job_title}
                    </h3>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-base font-extrabold font-mono ${
                        match.match_score >= 80
                          ? 'text-emerald-700 dark:text-emerald-400'
                          : match.match_score >= 65
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      {match.match_score}%
                    </span>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                      AI Match
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Eligible (CGPA {student.cgpa.toFixed(1)})</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                    {match.explanation?.why?.[0] || 'Strong alignment with verified skillset.'}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-700/70 flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    match.match_score >= 80
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                      : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300'
                  }`}
                >
                  {match.status}
                </span>

                <button
                  onClick={() => onNavigateView('matching')}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 flex items-center gap-1"
                >
                  <span>Explanation</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Offers Action Center & Upcoming Drives */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Offers Action Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Your Placement Offers
              </h2>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {studentOffers.length} Record
            </span>
          </div>

          <div className="space-y-3">
            {studentOffers.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-500 dark:text-slate-400">
                No offers yet. Apply to upcoming drives above!
              </div>
            ) : (
              studentOffers.map((off) => (
                <div
                  key={off.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                        {off.company}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {off.role}
                      </h3>
                      <div className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">
                        {off.ctc} (Full Time)
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        off.status === 'Accepted'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                          : off.status === 'Pending'
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                          : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300'
                      }`}
                    >
                      {off.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/70 dark:border-slate-700/70 text-xs">
                    <span className="text-slate-500 dark:text-slate-400">
                      Joining: {off.joining_date || 'Tentative July 2026'}
                    </span>

                    {off.status === 'Pending' ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOfferDecision(off.id, 'Declined')}
                          className="px-3 py-1 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
                        >
                          Decline
                        </button>
                        <button
                          onClick={() => handleOfferDecision(off.id, 'Accepted')}
                          className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Accept Offer</span>
                        </button>
                      </div>
                    ) : (
                      <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>Decision Recorded</span>
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Drives & Notifications */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Upcoming Interview Drives
              </h2>
            </div>
            <button
              onClick={() => onNavigateView('scheduling')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800"
            >
              Check schedule →
            </button>
          </div>

          <div className="space-y-3">
            {drives.slice(0, 2).map((d) => (
              <div
                key={d.id}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {d.company_name} — {d.role || 'Software Engineering'}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {d.date} · {d.start_time} - {d.end_time} · {d.location || d.venue || 'Placement Lab 1'}
                  </div>
                </div>

                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  Shortlisted
                </span>
              </div>
            ))}
          </div>

          {/* Recent Student Notifications Preview */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-2 flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Recent Direct Alerts</span>
            </div>

            <div className="space-y-2">
              {studentNotifs.slice(0, 2).map((n) => (
                <div
                  key={n.id}
                  className="p-2.5 rounded-lg bg-indigo-50/40 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 text-xs text-slate-800 dark:text-slate-200"
                >
                  <div className="font-medium">{n.message}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{n.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
