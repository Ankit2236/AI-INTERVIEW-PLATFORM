export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

export const formatTimer = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const generateId = () => {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
};

export const getScoreBadgeClass = (score) => {
  if (score >= 80) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
  if (score >= 60) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
  return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
};

export const getPerformanceLabel = (score) => {
  if (score >= 90) return 'Exceptional Performance 🎉';
  if (score >= 80) return 'Strong Performance 🚀';
  if (score >= 70) return 'Good Competency 👍';
  if (score >= 60) return 'Average - Needs Refinement 📈';
  return 'Requires Further Study 💡';
};
