import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Trophy,
  HelpCircle,
  PlusCircle,
  ArrowRight,
  Eye,
  FileCheck,
  Zap,
  RotateCcw
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import ScoreCard from '../components/ScoreCard';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { useInterview } from '../context/InterviewContext';
import { formatDate, getScoreBadgeClass } from '../utils/helpers';

const Dashboard = () => {
  const { user } = useAuth();
  const { history } = useInterview();
  const navigate = useNavigate();

  const totalInterviews = history.length;
  const avgScore = totalInterviews > 0
    ? Math.round(history.reduce((acc, i) => acc + (i.score || 0), 0) / totalInterviews)
    : 0;
  const bestScore = totalInterviews > 0
    ? Math.max(...history.map((i) => i.score || 0))
    : 0;
  const totalQuestions = history.reduce((acc, i) => acc + (i.questionCount || 5), 0);

  return (
    <div className="flex min-h-screen bg-[#07090e]">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-10 space-y-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Good Morning, {user?.name?.split(' ')[0] || 'Candidate'} 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Ready to improve your interview performance today?
            </p>
          </div>

          <Button
            onClick={() => navigate('/create-interview')}
            variant="primary"
            icon={PlusCircle}
            size="md"
          >
            Start New AI Interview
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <ScoreCard
            title="Interviews Completed"
            value={totalInterviews}
            icon={CheckCircle2}
            color="purple"
            change="+2 this week"
          />
          <ScoreCard
            title="Average Score"
            value={`${avgScore}%`}
            icon={FileCheck}
            color="cyan"
            change="+5% growth"
          />
          <ScoreCard
            title="Best Score"
            value={`${bestScore}%`}
            icon={Trophy}
            color="emerald"
          />
          <ScoreCard
            title="Questions Answered"
            value={totalQuestions}
            icon={HelpCircle}
            color="blue"
          />
        </div>

        {/* Large Start Interview Banner */}
        <Card className="relative overflow-hidden bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-[#0b0f19] border-purple-500/40 p-8">
          <div className="absolute right-0 top-0 w-96 h-full bg-gradient-to-l from-purple-500/10 to-transparent pointer-events-none" />
          <div className="max-w-xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> AI Resume Assessment Active
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Start a New AI Interview
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Generate personalized interview questions based on your latest uploaded resume and target job role in under 60 seconds.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                onClick={() => navigate('/create-interview')}
                variant="primary"
                icon={ArrowRight}
              >
                Start Interview Now
              </Button>
              <Button
                onClick={() => navigate('/resume')}
                variant="secondary"
                icon={FileCheck}
              >
                Update Resume
              </Button>
            </div>
          </div>
        </Card>

        {/* Recent Interviews Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white tracking-tight">Recent Interviews</h3>
            <button
              onClick={() => navigate('/interviews')}
              className="text-xs font-semibold text-purple-400 hover:text-purple-300 hover:underline"
            >
              View All History
            </button>
          </div>

          <div className="glass-panel rounded-2xl overflow-hidden border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/90 text-slate-400 font-bold uppercase tracking-wider text-[11px] border-b border-white/10">
                  <tr>
                    <th className="py-3.5 px-6">Role</th>
                    <th className="py-3.5 px-6">Date</th>
                    <th className="py-3.5 px-6">Difficulty</th>
                    <th className="py-3.5 px-6">Score</th>
                    <th className="py-3.5 px-6">Status</th>
                    <th className="py-3.5 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {history.slice(0, 5).map((intv) => (
                    <tr key={intv.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 font-bold text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-400" />
                        {intv.role}
                      </td>
                      <td className="py-4 px-6 text-slate-400">{formatDate(intv.date)}</td>
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                          {intv.difficulty}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getScoreBadgeClass(intv.score)}`}>
                          {intv.score}%
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-emerald-400 font-medium">✓ Completed</span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Button
                          onClick={() => navigate(`/interview/${intv.id}/report`)}
                          variant="outline"
                          size="sm"
                          icon={Eye}
                        >
                          View Report
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
