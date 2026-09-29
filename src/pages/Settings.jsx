import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  Bell,
  Sliders,
  Shield,
  Key,
  Save,
  CheckCircle2
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Button from '../components/Button';
import { DIFFICULTY_LEVELS, INTERVIEW_TYPES, QUESTION_COUNT_OPTIONS } from '../utils/constants';
import { useToast } from '../context/ToastContext';

const Settings = () => {
  const { showToast } = useToast();

  const [defaultDifficulty, setDefaultDifficulty] = useState('medium');
  const [defaultType, setDefaultType] = useState('mixed');
  const [defaultCount, setDefaultCount] = useState(10);

  const [emailNotifs, setEmailNotifs] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);

  const [apiBaseUrl, setApiBaseUrl] = useState(import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api');
  const [aiKey, setAiKey] = useState('');

  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSettings = (e) => {
    e?.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast('Settings saved successfully!', 'success');
    }, 400);
  };

  return (
    <div className="flex min-h-screen bg-[#07090e]">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-10 space-y-8 overflow-y-auto max-w-5xl mx-auto">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-purple-400" /> Platform Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Configure default interview parameters, notifications, theme preferences, and API keys.
          </p>
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-6">
          {/* Interview Preferences */}
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/10 pb-3">
              <Sliders className="w-4 h-4 text-purple-400" /> Interview Default Preferences
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Default Difficulty</label>
                <select
                  value={defaultDifficulty}
                  onChange={(e) => setDefaultDifficulty(e.target.value)}
                  className="w-full glass-input rounded-xl px-3 py-2.5 bg-[#0b0f19]"
                >
                  {DIFFICULTY_LEVELS.map((d) => (
                    <option key={d.id} value={d.id}>{d.title}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Default Format</label>
                <select
                  value={defaultType}
                  onChange={(e) => setDefaultType(e.target.value)}
                  className="w-full glass-input rounded-xl px-3 py-2.5 bg-[#0b0f19]"
                >
                  {INTERVIEW_TYPES.map((t) => (
                    <option key={t.id} value={t.id}>{t.title}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Default Question Count</label>
                <select
                  value={defaultCount}
                  onChange={(e) => setDefaultCount(Number(e.target.value))}
                  className="w-full glass-input rounded-xl px-3 py-2.5 bg-[#0b0f19]"
                >
                  {QUESTION_COUNT_OPTIONS.map((c) => (
                    <option key={c} value={c}>{c} Questions</option>
                  ))}
                </select>
              </div>
            </div>
          </Card>

          {/* Notifications */}
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/10 pb-3">
              <Bell className="w-4 h-4 text-cyan-400" /> Notifications & Reminders
            </h3>

            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5 cursor-pointer">
                <div>
                  <span className="font-bold text-white block">Email Notifications</span>
                  <span className="text-slate-400 text-[11px]">Receive summary reports after completed interviews</span>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotifs}
                  onChange={(e) => setEmailNotifs(e.target.checked)}
                  className="rounded bg-slate-900 border-white/10 text-purple-600 focus:ring-purple-500 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5 cursor-pointer">
                <div>
                  <span className="font-bold text-white block">Interview Practice Reminders</span>
                  <span className="text-slate-400 text-[11px]">Get weekly practice prompts to keep skills sharp</span>
                </div>
                <input
                  type="checkbox"
                  checked={reminders}
                  onChange={(e) => setReminders(e.target.checked)}
                  className="rounded bg-slate-900 border-white/10 text-purple-600 focus:ring-purple-500 w-4 h-4"
                />
              </label>
            </div>
          </Card>

          {/* API Credentials */}
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/10 pb-3">
              <Key className="w-4 h-4 text-amber-400" /> API & Backend Credentials
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">API Base URL</label>
                <input
                  type="text"
                  value={apiBaseUrl}
                  onChange={(e) => setApiBaseUrl(e.target.value)}
                  className="w-full glass-input rounded-xl px-4 py-2.5 font-mono text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Custom AI Secret Key (Optional)</label>
                <input
                  type="password"
                  value={aiKey}
                  onChange={(e) => setAiKey(e.target.value)}
                  placeholder="sk-********************************"
                  className="w-full glass-input rounded-xl px-4 py-2.5 font-mono text-xs"
                />
              </div>
            </div>
          </Card>

          <div className="flex justify-end pt-2">
            <Button type="submit" variant="primary" icon={Save} isLoading={isSaving} size="lg">
              Save All Settings
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Settings;
