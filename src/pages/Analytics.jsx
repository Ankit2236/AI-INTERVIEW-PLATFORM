import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Award,
  BookOpen,
  Sparkles,
  CheckCircle2,
  BrainCircuit
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import ScoreCard from '../components/ScoreCard';
import Card from '../components/Card';
import { RadarScoreChart, CategoryBarChart, ScoreProgressChart } from '../components/ChartCard';
import { useInterview } from '../context/InterviewContext';
import { formatDate } from '../utils/helpers';

const Analytics = () => {
  const { history } = useInterview();

  const totalInterviews = history.length;
  const avgScore = totalInterviews > 0
    ? Math.round(history.reduce((acc, i) => acc + (i.score || 0), 0) / totalInterviews)
    : 0;
  const highestScore = totalInterviews > 0
    ? Math.max(...history.map((i) => i.score || 0))
    : 0;

  // Chart data for progression line chart
  const progressLineData = history
    .map((intv) => ({
      date: formatDate(intv.date),
      score: intv.score || 70
    }))
    .reverse();

  // Aggregate Radar Data
  const aggregateRadar = [
    { subject: 'Technical Knowledge', A: 85, fullMark: 100 },
    { subject: 'Communication', A: 78, fullMark: 100 },
    { subject: 'Problem Solving', A: 88, fullMark: 100 },
    { subject: 'Resume Knowledge', A: 82, fullMark: 100 },
    { subject: 'Confidence', A: 76, fullMark: 100 },
  ];

  // Role performance breakdown
  const rolePerformanceData = [
    { category: 'Java Dev', score: 82 },
    { category: 'React Dev', score: 74 },
    { category: 'Full Stack', score: 69 },
    { category: 'Data Analyst', score: 88 },
  ];

  const recommendedTopics = [
    { topic: 'Java Collections & ConcurrentHashMap', priority: 'High', reason: 'Commonly tested in Java developer rounds' },
    { topic: 'SQL Window Functions & Indexing', priority: 'Medium', reason: 'Improves database query trade-off responses' },
    { topic: 'RESTful API Rate Limiting & Redis', priority: 'High', reason: 'Frequently asked system design follow-up' },
    { topic: 'React Fiber & Reconciliation Engine', priority: 'Medium', reason: 'Strengthens advanced frontend architectural answers' },
    { topic: 'System Design Microservice Trade-offs', priority: 'High', reason: 'Key indicator for mid/senior software engineer evaluation' },
  ];

  return (
    <div className="flex min-h-screen bg-[#07090e]">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-10 space-y-8 overflow-y-auto max-w-6xl mx-auto">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-cyan-400" /> Performance Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Track your interview trajectory, skill growth matrix, and personalized AI study recommendations.
          </p>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <ScoreCard
            title="Average Score"
            value={`${avgScore}%`}
            icon={TrendingUp}
            color="cyan"
            change="+12% overall"
          />
          <ScoreCard
            title="Highest Score"
            value={`${highestScore}%`}
            icon={Award}
            color="purple"
          />
          <ScoreCard
            title="Total Interviews"
            value={totalInterviews}
            icon={BarChart3}
            color="blue"
          />
          <ScoreCard
            title="Improvement Rate"
            value="+18%"
            icon={Sparkles}
            color="emerald"
            change="Continuous Growth"
          />
        </div>

        {/* AI Insight Highlight Banner */}
        <Card className="p-6 border-cyan-500/40 bg-gradient-to-r from-cyan-950/30 via-slate-900 to-[#0b0f19]">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shrink-0">
              <BrainCircuit className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white">AI Growth Insight: Your performance is steadily improving 🚀</h3>
              <p className="text-xs text-slate-300">
                You showed a +18% increase in Problem Solving and Technical Accuracy over your last 3 sessions. Focus on explaining edge cases to reach 90%+ scores!
              </p>
            </div>
          </div>
        </Card>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-12">
            <ScoreProgressChart data={progressLineData} title="Score Progression Over Time" />
          </div>

          <div className="lg:col-span-6">
            <RadarScoreChart data={aggregateRadar} title="Aggregate Skill Radar Matrix" />
          </div>

          <div className="lg:col-span-6">
            <CategoryBarChart data={rolePerformanceData} title="Role-Wise Average Scores" />
          </div>
        </div>

        {/* AI Recommended Study Topics */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" /> Recommended Study Topics
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedTopics.map((item, idx) => (
              <Card key={idx} className="p-5 space-y-2 border-purple-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{item.topic}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                      item.priority === 'High'
                        ? 'text-rose-400 border-rose-500/30 bg-rose-500/10'
                        : 'text-amber-400 border-amber-500/30 bg-amber-500/10'
                    }`}
                  >
                    {item.priority} Priority
                  </span>
                </div>
                <p className="text-xs text-slate-400">{item.reason}</p>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
