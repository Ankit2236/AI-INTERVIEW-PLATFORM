import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Send, SkipForward, Type, Sparkles, AlertCircle } from 'lucide-react';
import Button from './Button';

const InterviewQuestion = ({
  question,
  totalQuestions = 10,
  currentIndex = 0,
  onSubmit,
  onSkip,
  isProcessing = false
}) => {
  const [mode, setMode] = useState('text'); // 'text' | 'voice'
  const [answer, setAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);

  // Initialize SpeechRecognition if supported
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;

      rec.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setAnswer((prev) => (prev ? `${prev} ${transcript}` : transcript));
      };

      rec.onerror = (e) => {
        console.warn('Speech recognition error:', e);
        setIsRecording(false);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      setRecognition(rec);
    }
  }, []);

  // Clear answer on question change
  useEffect(() => {
    setAnswer('');
    setIsRecording(false);
    if (recognition && isRecording) {
      recognition.stop();
    }
  }, [question?.id]);

  const toggleRecording = () => {
    if (!recognition) {
      // Fallback simulated transcript if Web Speech API isn't supported in browser environment
      if (!isRecording) {
        setIsRecording(true);
        const sampleVoiceText = "In my previous role, I designed REST microservices using Spring Boot and Postgres. We implemented Redis caching which reduced API response time by 40%.";
        let currentLen = 0;
        const timer = setInterval(() => {
          currentLen += 10;
          setAnswer(sampleVoiceText.slice(0, currentLen));
          if (currentLen >= sampleVoiceText.length) {
            clearInterval(timer);
            setIsRecording(false);
          }
        }, 150);
      } else {
        setIsRecording(false);
      }
      return;
    }

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      try {
        recognition.start();
        setIsRecording(true);
      } catch (e) {
        setIsRecording(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!answer.trim() || isProcessing) return;
    onSubmit(answer.trim());
  };

  if (!question) return null;

  return (
    <div className="space-y-6">
      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="glass-panel p-6 rounded-2xl border-purple-500/30 relative overflow-hidden"
        >
          {/* Category & Badge Header */}
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/10 text-purple-300 border border-purple-500/30">
                {question.category || 'Technical'}
              </span>
              {question.type === 'Follow-Up' && (
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  <Sparkles className="w-3 h-3 animate-spin text-cyan-400" />
                  AI Follow-Up
                </span>
              )}
            </div>

            <span className="text-xs font-semibold text-slate-400">
              Difficulty: <span className="text-amber-400">{question.difficulty || 'Medium'}</span>
            </span>
          </div>

          {/* Question Text */}
          <h2 className="text-lg md:text-xl font-bold text-white leading-relaxed">
            {question.text}
          </h2>
        </motion.div>
      </AnimatePresence>

      {/* Answer Mode Switch */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Your Response
          </label>
          <div className="flex items-center bg-slate-900/80 p-1 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setMode('text')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                mode === 'text'
                  ? 'bg-purple-600 text-white font-semibold shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              Text Answer
            </button>
            <button
              onClick={() => setMode('voice')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                mode === 'voice'
                  ? 'bg-purple-600 text-white font-semibold shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              Voice Mode
            </button>
          </div>
        </div>

        {/* Text Mode */}
        {mode === 'text' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <textarea
                rows={5}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your detailed answer here... (Tip: Include technical details, trade-offs, or concrete project examples)"
                className="w-full glass-input rounded-xl p-4 text-sm resize-none"
              />
              <div className="absolute bottom-3 right-3 text-[11px] text-slate-400">
                {answer.trim().split(/\s+/).filter(Boolean).length} words
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button onClick={onSkip} variant="ghost" size="sm" icon={SkipForward} type="button">
                Skip Question
              </Button>
              <Button
                type="submit"
                variant="primary"
                icon={Send}
                disabled={!answer.trim() || isProcessing}
                isLoading={isProcessing}
              >
                Submit Answer
              </Button>
            </div>
          </form>
        )}

        {/* Voice Mode */}
        {mode === 'voice' && (
          <div className="space-y-4 text-center py-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleRecording}
                className={`relative w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-colors cursor-pointer ${
                  isRecording
                    ? 'bg-rose-600 text-white shadow-rose-500/40 border border-rose-400'
                    : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/30 border border-purple-400'
                }`}
              >
                {isRecording ? (
                  <>
                    <span className="absolute inset-0 rounded-full bg-rose-500/30 animate-ping" />
                    <MicOff className="w-8 h-8 relative z-10" />
                  </>
                ) : (
                  <Mic className="w-8 h-8 relative z-10" />
                )}
              </motion.button>

              <div>
                <h4 className="text-sm font-semibold text-white">
                  {isRecording ? 'Listening... Speak your answer now' : 'Click microphone to start recording'}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Speech recognition automatically converts your voice into text response below
                </p>
              </div>
            </div>

            {/* Live Transcript Preview */}
            <div className="mt-4 p-4 rounded-xl glass-input min-h-[100px] text-left text-sm text-slate-200">
              {answer ? answer : <span className="text-slate-400 italic">Transcribed voice output will appear here...</span>}
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button onClick={onSkip} variant="ghost" size="sm" icon={SkipForward} type="button">
                Skip Question
              </Button>
              <Button
                onClick={handleSubmit}
                variant="primary"
                icon={Send}
                disabled={!answer.trim() || isProcessing}
                isLoading={isProcessing}
              >
                Submit Voice Answer
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewQuestion;
