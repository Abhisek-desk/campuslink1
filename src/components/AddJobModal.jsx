import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Building,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
} from 'lucide-react';
import { api } from '../api';

const SAMPLE_JD = `GOOGLE INDIA - SOFTWARE ENGINEER (CAMPUS 2026)
CTC: ₹18.0 LPA | Locations: Bangalore / Hyderabad
Eligibility: B.Tech CSE, IT, ECE with CGPA >= 8.0 and no active backlogs.

Job Overview:
We are seeking high-caliber undergraduate engineers passionate about high-scale distributed systems, algorithm design, and reliable cloud services.

Key Requirements:
- Solid programming proficiency in Python, C++, or Java (>= 80%)
- Strong foundation in Data Structures, Algorithms, and System Design (>= 80%)
- Experience with Git, Linux environments, and Cloud fundamentals (AWS/GCP) (>= 70%)
- Strong communication and analytical problem solving skills.`;

export const AddJobModal = ({ isOpen, onClose, onJobCreated }) => {
  const [jobText, setJobText] = useState('');
  const [parsing, setParsing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [job, setJob] = useState({
    company_name: 'Google India',
    title: 'Software Engineer',
    description: 'Design and implement scalable distributed services and algorithm pipelines.',
    minimum_cgpa: 8.0,
    ctc: '₹18.0 LPA',
    vacancies: 8,
    deadline: '2026-11-20',
    required_skills: [
      { name: 'Python', min_proficiency: 80 },
      { name: 'SQL', min_proficiency: 75 },
      { name: 'Git', min_proficiency: 70 },
    ],
  });

  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillProf, setNewSkillProf] = useState(70);

  if (!isOpen) return null;

  const handleParseWithAI = async () => {
    if (!jobText.trim()) {
      setError('Please enter job description text to parse.');
      return;
    }
    setParsing(true);
    setError('');
    try {
      const data = await api.parseJobWithAI(jobText);
      setJob({
        company_name: data.company_name || 'Tech Partner',
        title: data.title || 'Software Trainee',
        description: data.description || '',
        minimum_cgpa: data.minimum_cgpa || 7.0,
        ctc: data.ctc || '₹8.0 LPA',
        vacancies: data.vacancies || 10,
        deadline: '2026-11-30',
        required_skills: Array.isArray(data.required_skills) && data.required_skills.length > 0
          ? data.required_skills
          : [{ name: 'Python', min_proficiency: 70 }, { name: 'SQL', min_proficiency: 70 }],
      });
      setSuccess('Job details successfully extracted by AI! Customize below and publish.');
    } catch (err) {
      setError('AI extraction failed, please verify details manually.');
    } finally {
      setParsing(false);
    }
  };

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    setJob((prev) => ({
      ...prev,
      required_skills: [...prev.required_skills, { name: newSkillName.trim(), min_proficiency: Number(newSkillProf) }],
    }));
    setNewSkillName('');
  };

  const handleRemoveSkill = (name) => {
    setJob((prev) => ({
      ...prev,
      required_skills: prev.required_skills.filter((s) => s.name !== name),
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const res = await api.createJob(job);
      setSuccess('Job posted! Live matching algorithms activated.');
      setTimeout(() => {
        if (onJobCreated) onJobCreated(res);
        onClose();
      }, 700);
    } catch (err) {
      setError(err.message || 'Failed to post job.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-slate-900 dark:text-slate-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 pb-4 bg-gradient-to-r from-indigo-900 to-slate-900 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-lg bg-indigo-600 text-white">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              Recruiter Hub · AI Drive Posting
            </span>
          </div>
          <h2 className="text-xl font-bold text-white">Post New Corporate Job Description</h2>
          <p className="text-xs text-indigo-200">
            Paste raw JD text to automatically extract required skills and initiate candidate matching.
          </p>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {error && (
            <div className="p-3 text-xs rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="p-3 text-xs rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* AI JD Parser Box */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>AI Job Description Parser</span>
              </span>
              <button
                type="button"
                onClick={() => setJobText(SAMPLE_JD)}
                className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Insert Sample Google JD
              </button>
            </div>
            <textarea
              rows={3}
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              placeholder="Paste raw JD or recruitment email to autofill parameters..."
              className="w-full p-2.5 text-xs font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
            <button
              type="button"
              disabled={parsing}
              onClick={handleParseWithAI}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{parsing ? 'Extracting with AI...' : 'Autofill Parameters with AI'}</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={job.company_name}
                  onChange={(e) => setJob({ ...job, company_name: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Job Designation *
                </label>
                <input
                  type="text"
                  required
                  value={job.title}
                  onChange={(e) => setJob({ ...job, title: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  CTC Package
                </label>
                <input
                  type="text"
                  value={job.ctc}
                  onChange={(e) => setJob({ ...job, ctc: e.target.value })}
                  placeholder="₹12.0 LPA"
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Minimum CGPA Cutoff
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={job.minimum_cgpa}
                  onChange={(e) => setJob({ ...job, minimum_cgpa: parseFloat(e.target.value) || 7.0 })}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Role Description
              </label>
              <textarea
                rows={2}
                value={job.description}
                onChange={(e) => setJob({ ...job, description: e.target.value })}
                className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>

            {/* Required Skills */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Required Technical Skills & Benchmarks
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {job.required_skills.map((s) => (
                  <span
                    key={s.name}
                    className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
                  >
                    <span className="font-semibold">{s.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">≥ {s.min_proficiency}%</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(s.name)}
                      className="hover:text-rose-600 ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="Add skill (e.g. AWS, React, Docker)"
                  className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
                <input
                  type="number"
                  min="40"
                  max="100"
                  value={newSkillProf}
                  onChange={(e) => setNewSkillProf(e.target.value)}
                  className="w-20 px-2 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-center font-bold"
                  title="Benchmark threshold %"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{saving ? 'Publishing Drive...' : 'Publish Job & Run Matching'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
