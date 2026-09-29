import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Volume2, Sparkles } from 'lucide-react';

const AIAvatar = ({ isSpeaking = false, isEvaluating = false, name = 'AI Interviewer' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center relative">
      {/* Concentric glowing rings */}
      <div className="relative flex items-center justify-center">
        {(isSpeaking || isEvaluating) && (
          <>
            <motion.div
              animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0.1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="absolute w-36 h-36 rounded-full bg-purple-600/20 border border-purple-500/40 blur-sm"
            />
            <motion.div
              animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut', delay: 0.3 }}
              className="absolute w-36 h-36 rounded-full bg-cyan-500/20 border border-cyan-400/30 blur-md"
            />
          </>
        )}

        {/* Core Avatar Sphere */}
        <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 shadow-2xl shadow-purple-500/30">
          <div className="w-full h-full rounded-full bg-[#0b0f19] flex items-center justify-center relative overflow-hidden">
            <Bot className="w-14 h-14 text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
            
            {/* Holographic light streak */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-transparent to-cyan-400/20 animate-pulse pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Name & Online Status */}
      <div className="mt-4 space-y-1">
        <div className="flex items-center justify-center gap-2">
          <h3 className="text-lg font-bold text-white tracking-tight">{name}</h3>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Online
          </span>
        </div>

        {/* Status indicator */}
        <div className="h-6 flex items-center justify-center">
          {isEvaluating ? (
            <div className="flex items-center gap-1.5 text-xs text-cyan-300 font-medium">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-cyan-400" />
              <span>Analyzing answer...</span>
            </div>
          ) : isSpeaking ? (
            <div className="flex items-center gap-1.5 text-xs text-purple-300 font-medium">
              <Volume2 className="w-3.5 h-3.5 animate-bounce text-purple-400" />
              <div className="flex items-center gap-1">
                <span className="w-1 h-3 bg-purple-400 rounded-full animate-[wave_1s_infinite]" />
                <span className="w-1 h-4 bg-cyan-400 rounded-full animate-[wave_1.2s_infinite]" />
                <span className="w-1 h-2 bg-purple-400 rounded-full animate-[wave_0.8s_infinite]" />
              </div>
            </div>
          ) : (
            <span className="text-xs text-slate-400 font-medium">Listening to candidate...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAvatar;
