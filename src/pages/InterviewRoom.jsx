import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, Sparkles, ArrowLeft } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import AIAvatar from '../components/AIAvatar';
import Timer from '../components/Timer';
import ProgressBar from '../components/ProgressBar';
import InterviewQuestion from '../components/InterviewQuestion';
import Button from '../components/Button';
import { useInterview } from '../context/InterviewContext';
import { useToast } from '../context/ToastContext';

const InterviewRoom = () => {
  const { activeSession, submitAnswer, skipQuestion } = useInterview();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [isTimeUp, setIsTimeUp] = useState(false);

  // If no active session, redirect to creation wizard
  if (!activeSession) {
    return (
      <div className="flex min-h-screen bg-[#07090e] items-center justify-center p-4">
        <div className="glass-panel p-8 rounded-3xl text-center space-y-4 max-w-md">
          <Bot className="w-12 h-12 text-purple-400 mx-auto" />
          <h2 className="text-xl font-bold text-white">No Active Interview Session</h2>
          <p className="text-xs text-slate-400">Please setup your interview parameters first.</p>
          <Button onClick={() => navigate('/create-interview')} variant="primary" icon={ArrowLeft}>
            Create New Interview
          </Button>
        </div>
      </div>
    );
  }

  const { questions, currentIndex, config, isProcessingAI } = activeSession;
  const currentQuestion = questions[currentIndex];

  const handleAnswerSubmit = async (answerText) => {
    const report = await submitAnswer(answerText);
    if (report && report.id) {
      showToast('Interview session completed!', 'success');
      navigate(`/interview/${report.id}/report`);
    }
  };

  const handleQuestionSkip = async () => {
    const report = await skipQuestion();
    if (report && report.id) {
      showToast('Interview session completed!', 'info');
      navigate(`/interview/${report.id}/report`);
    }
  };

  const handleTimeUp = () => {
    showToast('Timer expired for this question. Auto-skipping...', 'warning');
    handleQuestionSkip();
  };

  return (
    <div className="flex min-h-screen bg-[#07090e]">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-6">
        {/* Header Bar */}
        <div className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <h1 className="text-lg font-bold text-white tracking-tight">{config.role} Interview</h1>
            </div>
            <p className="text-xs text-slate-400">
              {config.difficulty} Difficulty • {config.interviewType} Format
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Timer initialSeconds={180} resetKey={currentQuestion?.id} onTimeUp={handleTimeUp} />
            <Button
              onClick={() => {
                if (window.confirm('Are you sure you want to end this interview early?')) {
                  navigate('/dashboard');
                }
              }}
              variant="ghost"
              size="sm"
            >
              Exit Session
            </Button>
          </div>
        </div>

        {/* Live Session Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: AI Avatar */}
          <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border-purple-500/30 flex flex-col items-center justify-center min-h-[380px]">
            <AIAvatar
              isSpeaking={!isProcessingAI}
              isEvaluating={isProcessingAI}
              name="AI Technical Evaluator"
            />
          </div>

          {/* Right Column: Active Question & Input */}
          <div className="lg:col-span-8 space-y-4">
            {/* Question Progress Header */}
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
              <span>Question {currentIndex + 1} of {questions.length}</span>
              <span>{Math.round(((currentIndex + 1) / questions.length) * 100)}% Complete</span>
            </div>

            <ProgressBar current={currentIndex + 1} total={questions.length} />

            {/* Question Card & Input Component */}
            <InterviewQuestion
              question={currentQuestion}
              totalQuestions={questions.length}
              currentIndex={currentIndex}
              onSubmit={handleAnswerSubmit}
              onSkip={handleQuestionSkip}
              isProcessing={isProcessingAI}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewRoom;
