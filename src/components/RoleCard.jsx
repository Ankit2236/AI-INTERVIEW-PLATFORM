import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Layout,
  Layers,
  BarChart2,
  Brain,
  Cloud,
  GitBranch,
  Cpu,
  Terminal,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

const ICON_MAP = {
  Code2,
  Layout,
  Layers,
  BarChart2,
  Brain,
  Cloud,
  GitBranch,
  Cpu,
  Terminal,
  Sparkles
};

const RoleCard = ({ role, isSelected = false, onSelect }) => {
  const IconComponent = ICON_MAP[role.icon] || Code2;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(role)}
      className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
        isSelected
          ? 'bg-gradient-to-br from-purple-900/40 via-indigo-900/30 to-slate-900/80 border-purple-500 shadow-xl shadow-purple-500/20'
          : 'glass-panel hover:border-purple-500/30'
      }`}
    >
      {isSelected && (
        <div className="absolute top-4 right-4 text-purple-400">
          <CheckCircle2 className="w-5 h-5 fill-purple-500/20 text-purple-400" />
        </div>
      )}

      <div className="flex items-start gap-4">
        <div
          className={`p-3 rounded-xl border ${
            isSelected
              ? 'bg-purple-600/20 border-purple-500/50 text-purple-300'
              : 'bg-slate-800/60 border-slate-700/60 text-slate-300'
          }`}
        >
          <IconComponent className="w-6 h-6" />
        </div>

        <div className="space-y-1 pr-6">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
            {role.category}
          </span>
          <h4 className="text-base font-bold text-white tracking-tight">{role.title}</h4>
          <p className="text-xs text-slate-400 line-clamp-2">{role.description}</p>
        </div>
      </div>

      {/* Skills chips preview */}
      <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
        {role.skills.slice(0, 4).map((skill, idx) => (
          <span
            key={idx}
            className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-800/80 text-slate-300 border border-slate-700/50"
          >
            {skill}
          </span>
        ))}
        {role.skills.length > 4 && (
          <span className="px-1.5 py-0.5 text-[10px] text-slate-400">
            +{role.skills.length - 4} more
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default RoleCard;
