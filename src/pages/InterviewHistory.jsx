import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  History,
  Search,
  Filter,
  Eye,
  RotateCcw,
  Trash2,
  PlusCircle,
  Sparkles
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { useInterview } from '../context/InterviewContext';
import { formatDate, getScoreBadgeClass } from '../utils/helpers';
import { useToast } from '../context/ToastContext';

const InterviewHistory = () => {
  const { history, deleteSession } = useInterview();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [deleteModalId, setDeleteModalId] = useState(null);

  const filteredHistory = history.filter((intv) => {
    const matchesSearch = intv.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || intv.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    return matchesSearch && matchesDifficulty;
  });

  const handleDeleteConfirm = async () => {
    if (deleteModalId) {
      await deleteSession(deleteModalId);
      setDeleteModalId(null);
      showToast('Interview session deleted', 'info');
    }
  };

  return (
    <div className="flex min-h-screen bg-[#07090e]">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-10 space-y-8 overflow-y-auto max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <History className="w-8 h-8 text-purple-400" /> My Interview History
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Review previous sessions, examine question score analytics, or retry interviews.
            </p>
          </div>

          <Button onClick={() => navigate('/create-interview')} variant="primary" icon={PlusCircle}>
            Start New Interview
          </Button>
        </div>

        {/* Filter Controls */}
        <div className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border-white/10">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role (e.g. Java, React)..."
              className="w-full glass-input rounded-xl pl-10 pr-4 py-2 text-xs"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Filter className="w-4 h-4 text-slate-400" />
              <span>Difficulty:</span>
            </div>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="glass-input rounded-xl px-3 py-2 text-xs bg-[#0b0f19]"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="adaptive">Adaptive</option>
            </select>
          </div>
        </div>

        {/* History Table */}
        <div className="glass-panel rounded-2xl overflow-hidden border-white/10">
          {filteredHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/90 text-slate-400 font-bold uppercase tracking-wider text-[11px] border-b border-white/10">
                  <tr>
                    <th className="py-4 px-6">Role & Format</th>
                    <th className="py-4 px-6">Date</th>
                    <th className="py-4 px-6">Difficulty</th>
                    <th className="py-4 px-6">Score</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredHistory.map((intv) => (
                    <tr key={intv.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 font-bold text-white">
                        <div className="text-sm">{intv.role}</div>
                        <div className="text-[11px] text-slate-400 font-normal">{intv.interviewType} Interview</div>
                      </td>
                      <td className="py-4 px-6 text-slate-400">{formatDate(intv.date)}</td>
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                          {intv.difficulty}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getScoreBadgeClass(intv.score)}`}>
                          {intv.score}%
                        </span>
                      </td>
                      <td className="py-4 px-6 text-emerald-400 font-medium">✓ Completed</td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <Button
                          onClick={() => navigate(`/interview/${intv.id}/report`)}
                          variant="outline"
                          size="sm"
                          icon={Eye}
                        >
                          Report
                        </Button>
                        <Button
                          onClick={() => navigate('/create-interview')}
                          variant="secondary"
                          size="sm"
                          icon={RotateCcw}
                        >
                          Retry
                        </Button>
                        <button
                          onClick={() => setDeleteModalId(intv.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center space-y-4">
              <History className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No Interviews Found</h3>
              <p className="text-xs text-slate-400">Try adjusting your filters or complete a new AI interview.</p>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={!!deleteModalId}
          onClose={() => setDeleteModalId(null)}
          title="Delete Interview Record"
        >
          <div className="space-y-4 text-xs text-slate-300">
            <p>Are you sure you want to delete this interview record? This action cannot be undone.</p>
            <div className="flex justify-end gap-3 pt-2">
              <Button onClick={() => setDeleteModalId(null)} variant="secondary" size="sm">
                Cancel
              </Button>
              <Button onClick={handleDeleteConfirm} variant="danger" size="sm" icon={Trash2}>
                Confirm Delete
              </Button>
            </div>
          </div>
        </Modal>
      </main>
    </div>
  );
};

export default InterviewHistory;
