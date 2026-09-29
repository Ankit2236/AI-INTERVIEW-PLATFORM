import React from 'react';
import Card from './Card';

const ScoreCard = ({ title, value, icon: Icon, change = null, color = 'purple' }) => {
  const colorStyles = {
    purple: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400',
    blue: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-blue-400',
    cyan: 'from-cyan-500/20 to-teal-500/10 border-cyan-500/30 text-cyan-400',
    emerald: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
  };

  return (
    <Card className="relative overflow-hidden group">
      {/* Background glow gradient */}
      <div className={`absolute -right-10 -bottom-10 w-32 h-32 rounded-full bg-gradient-to-br ${colorStyles[color] || colorStyles.purple} blur-2xl opacity-50 group-hover:opacity-80 transition-opacity`} />

      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className={`p-2.5 rounded-xl border bg-slate-900/80 ${colorStyles[color] || colorStyles.purple}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="text-3xl font-extrabold text-white tracking-tight">{value}</h3>
        {change && (
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            {change}
          </span>
        )}
      </div>
    </Card>
  );
};

export default ScoreCard;
