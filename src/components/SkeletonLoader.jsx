import React from 'react';

export const CardSkeleton = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="glass-panel p-6 rounded-2xl animate-pulse space-y-4 border border-white/5"
        >
          <div className="flex items-center justify-between">
            <div className="h-4 w-24 bg-slate-800 rounded-md" />
            <div className="w-10 h-10 bg-slate-800 rounded-xl" />
          </div>
          <div className="h-8 w-32 bg-slate-800 rounded-lg" />
          <div className="h-3 w-48 bg-slate-800/60 rounded-md" />
        </div>
      ))}
    </div>
  );
};

export const TableSkeleton = ({ rows = 4 }) => {
  return (
    <div className="glass-panel rounded-2xl p-6 animate-pulse space-y-4">
      <div className="h-6 w-36 bg-slate-800 rounded-md" />
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, idx) => (
          <div key={idx} className="flex items-center justify-between py-3 border-b border-white/5">
            <div className="h-4 w-32 bg-slate-800 rounded-md" />
            <div className="h-4 w-24 bg-slate-800 rounded-md" />
            <div className="h-6 w-16 bg-slate-800 rounded-full" />
            <div className="h-8 w-20 bg-slate-800 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default { CardSkeleton, TableSkeleton };
