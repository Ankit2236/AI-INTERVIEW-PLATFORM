import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { formatTimer } from '../utils/helpers';

const Timer = ({ initialSeconds = 180, onTimeUp, resetKey }) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    setSecondsLeft(initialSeconds);
  }, [initialSeconds, resetKey]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      if (onTimeUp) onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, onTimeUp]);

  const isLow = secondsLeft <= 30;

  return (
    <div
      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-sm font-semibold transition-all duration-300 ${
        isLow
          ? 'bg-rose-500/10 border-rose-500/40 text-rose-300 animate-pulse'
          : 'bg-slate-900/80 border-slate-700/80 text-cyan-300'
      }`}
    >
      <Clock className={`w-4 h-4 ${isLow ? 'text-rose-400' : 'text-cyan-400'}`} />
      <span>{formatTimer(secondsLeft)}</span>
    </div>
  );
};

export default Timer;
