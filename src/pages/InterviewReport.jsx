import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Award,
  Sparkles,
  BarChart2
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Button from '../components/Button';
import { CircularScoreRing } from '../components/ProgressBar';
import { RadarScoreChart, CategoryBarChart } from '../components/ChartCard';
import { getInterviewById } from '../services/interviewService';
import { formatDate, getPerformanceLabel, getScoreBadgeClass } from '../utils/helpers';

const InterviewReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [expandedQuestions, setExpandedQuestions] = useState({});

  useEffect(() => {
    loadReport();
  }, [id]);

  const loadReport = async () => {
    const data = await getInterviewById(id);
    if (data) {
      setReport(data);
      // Expand first question by default
      setExpandedQuestions({ 0: true });
    }
  };

  const toggleQuestion = (idx) => {
    setExpandedQuestions((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  if (!report) {
    return (
      <div className="flex min-h-screen bg-[#07090e]">
        <Sidebar />
        <main className="flex-1 p-8 flex items-center justify-center">
          <div className="text-center text-slate-400">Loading interview report...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#07090e]">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-10 space-y-8 overflow-y-auto max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Interview Session Complete 🎉
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {report.role} Performance Report
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Completed on {formatDate(report.date)} • {report.difficulty} Difficulty • {report.interviewType} Format
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={() => navigate('/create-interview')} variant="primary" icon={RotateCcw}>
              Retry Interview
            </Button>
            <Button onClick={() => navigate('/dashboard')} variant="secondary" icon={ArrowLeft}>
              Dashboard
            </Button>
          </div>
        </div>

        {/* Top Summary Banner */}
        <Card className="p-8 border-purple-500/40 bg-gradient-to-r from-purple-950/30 via-slate-900 to-[#0b0f19]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Score Ring Meter */}
            <div className="md:col-span-4 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6">
              <CircularScoreRing score={report.overallScore} size={150} strokeWidth={12} />
              <span className="mt-3 text-xs font-bold text-purple-300 uppercase tracking-wider">
                Overall AI Performance Rating
              </span>
            </div>

            {/* Performance Label & Metrics */}
            <div className="md:col-span-8 space-y-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status Verdict</span>
                <h2 className="text-2xl font-black text-white tracking-tight mt-0.5">
                  {getPerformanceLabel(report.overallScore)}
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs pt-2">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                  <span className="text-slate-400 font-semibold block text-[10px] uppercase">Questions Answered</span>
                  <span className="text-base font-extrabold text-white">{report.questionCount || report.questions?.length}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                  <span className="text-slate-400 font-semibold block text-[10px] uppercase">Difficulty Level</span>
                  <span className="text-base font-extrabold text-amber-400">{report.difficulty}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                  <span className="text-slate-400 font-semibold block text-[10px] uppercase">Session Type</span>
                  <span className="text-base font-extrabold text-cyan-400">{report.interviewType}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Visual Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RadarScoreChart data={report.radarData} title="Skill Radar Breakdown" />
          <CategoryBarChart data={report.categoryScores} title="Category Scoring Breakdown" />
        </div>

        {/* Strengths & Improvements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Strengths */}
          <Card className="space-y-4 border-emerald-500/30">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Key Strengths
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-200">
              {report.strengths?.map((str, idx) => (
                <li key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Areas for Improvement */}
          <Card className="space-y-4 border-amber-500/30">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" /> Areas for Improvement
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-200">
              {report.improvements?.map((imp, idx) => (
                <li key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/20">
                  <span className="text-amber-400 font-bold shrink-0">💡</span>
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Question Analysis Accordion */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white tracking-tight">Question Analysis & AI Feedback</h3>

          <div className="space-y-3">
            {report.questions?.map((q, idx) => {
              const isExpanded = expandedQuestions[idx];
              const score = q.evaluation?.score || 8.0;

              return (
                <div
                  key={idx}
                  className="glass-panel rounded-2xl overflow-hidden border border-white/10 transition-all"
                >
                  <button
                    onClick={() => toggleQuestion(idx)}
                    className="w-full p-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold flex items-center justify-center shrink-0">
                        Q{idx + 1}
                      </span>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block">
                          {q.category || 'Technical'}
                        </span>
                        <h4 className="text-sm font-semibold text-white line-clamp-1">{q.text}</h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getScoreBadgeClass(score * 10)}`}>
                        {score} / 10
                      </span>
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-5 pb-5 pt-2 border-t border-white/5 space-y-4 text-xs"
                      >
                        {/* User Answer */}
                        <div className="space-y-1">
                          <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Your Answer:</span>
                          <div className="p-3.5 rounded-xl bg-slate-900/80 text-slate-200 border border-white/5 italic">
                            "{q.userAnswer || 'No response provided.'}"
                          </div>
                        </div>

                        {/* AI Feedback */}
                        <div className="space-y-1">
                          <span className="font-bold text-cyan-400 uppercase tracking-wider text-[10px]">AI Evaluator Feedback:</span>
                          <div className="p-3.5 rounded-xl bg-cyan-950/20 text-cyan-200 border border-cyan-500/30">
                            {q.evaluation?.feedback || 'Good explanation provided.'}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewReport;
