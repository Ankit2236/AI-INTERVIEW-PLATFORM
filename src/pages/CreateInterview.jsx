import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Search,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  FileCheck,
  Target,
  Briefcase,
  Zap,
  HelpCircle,
  Clock
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Button from '../components/Button';
import RoleCard from '../components/RoleCard';
import { SUPPORTED_ROLES, EXPERIENCE_LEVELS, DIFFICULTY_LEVELS, INTERVIEW_TYPES, QUESTION_COUNT_OPTIONS } from '../utils/constants';
import { useInterview } from '../context/InterviewContext';
import { getStoredResume } from '../services/resumeService';
import { useToast } from '../context/ToastContext';

const CreateInterview = () => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState(SUPPORTED_ROLES[0]);
  const [roleSearch, setRoleSearch] = useState('');
  const [experience, setExperience] = useState(EXPERIENCE_LEVELS[1].id);
  const [difficulty, setDifficulty] = useState(DIFFICULTY_LEVELS[1].id);
  const [interviewType, setInterviewType] = useState(INTERVIEW_TYPES[3].id);
  const [questionCount, setQuestionCount] = useState(10);
  const [isInitializing, setIsInitializing] = useState(false);

  const { startNewSession } = useInterview();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const resume = getStoredResume();

  const filteredRoles = SUPPORTED_ROLES.filter(
    (r) =>
      r.title.toLowerCase().includes(roleSearch.toLowerCase()) ||
      r.category.toLowerCase().includes(roleSearch.toLowerCase()) ||
      r.skills.some((s) => s.toLowerCase().includes(roleSearch.toLowerCase()))
  );

  const handleStartInterview = async () => {
    setIsInitializing(true);
    try {
      const config = {
        role: selectedRole.title,
        roleId: selectedRole.id,
        experienceLevel: experience,
        difficulty,
        interviewType,
        questionCount,
        resumeInfo: resume
      };

      await startNewSession(config);
      showToast('AI Interview session generated successfully!', 'success');
      navigate('/interview/live');
    } catch (e) {
      showToast('Failed to start interview', 'error');
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#07090e]">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-10 space-y-8 overflow-y-auto max-w-6xl mx-auto">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-400" /> Create AI Interview
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Configure your target position, difficulty, and interview format in 6 easy steps.
          </p>
        </div>

        {/* Step Indicator Progress */}
        <div className="glass-panel p-4 rounded-2xl flex items-center justify-between border-white/10 overflow-x-auto gap-4">
          {[
            { s: 1, label: 'Resume' },
            { s: 2, label: 'Target Role' },
            { s: 3, label: 'Experience' },
            { s: 4, label: 'Difficulty' },
            { s: 5, label: 'Format' },
            { s: 6, label: 'Questions' },
            { s: 7, label: 'Summary' },
          ].map((item) => (
            <div
              key={item.s}
              onClick={() => item.s <= step && setStep(item.s)}
              className={`flex items-center gap-2 cursor-pointer transition-colors ${
                step === item.s
                  ? 'text-purple-400 font-bold'
                  : step > item.s
                  ? 'text-emerald-400 font-semibold'
                  : 'text-slate-500 font-normal'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold border ${
                  step === item.s
                    ? 'bg-purple-600/30 border-purple-500 text-purple-300'
                    : step > item.s
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                    : 'bg-slate-800 border-slate-700 text-slate-500'
                }`}
              >
                {step > item.s ? '✓' : item.s}
              </div>
              <span className="text-xs whitespace-nowrap hidden sm:inline">{item.label}</span>
            </div>
          ))}
        </div>

        {/* STEP CONTENTS */}

        {/* STEP 1: RESUME SELECTION */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h3 className="text-lg font-bold text-white">Step 1: Select Active Resume</h3>
            {resume ? (
              <Card className="p-6 border-purple-500/40 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{resume.fileName}</h4>
                    <p className="text-xs text-slate-400">
                      {resume.skills?.length || 0} extracted skills • Selected for AI question generation
                    </p>
                  </div>
                </div>
                <Button onClick={() => navigate('/resume')} variant="outline" size="sm">
                  Change Resume
                </Button>
              </Card>
            ) : (
              <Card className="p-6 text-center space-y-4">
                <p className="text-sm text-slate-300">No resume uploaded yet. Upload a resume for personalized questions.</p>
                <Button onClick={() => navigate('/resume')} variant="primary">
                  Upload Resume
                </Button>
              </Card>
            )}

            <div className="flex justify-end">
              <Button onClick={() => setStep(2)} variant="primary" icon={ArrowRight}>
                Next: Select Role
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: JOB ROLE SELECTION */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-white">Step 2: Select Target Job Role</h3>
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={roleSearch}
                  onChange={(e) => setRoleSearch(e.target.value)}
                  placeholder="Search roles or skills..."
                  className="w-full glass-input rounded-xl pl-10 pr-4 py-2 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRoles.map((role) => (
                <RoleCard
                  key={role.id}
                  role={role}
                  isSelected={selectedRole?.id === role.id}
                  onSelect={(r) => setSelectedRole(r)}
                />
              ))}
            </div>

            <div className="flex items-center justify-between pt-4">
              <Button onClick={() => setStep(1)} variant="secondary" icon={ArrowLeft}>
                Back
              </Button>
              <Button onClick={() => setStep(3)} variant="primary" icon={ArrowRight}>
                Next: Experience Level
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: EXPERIENCE LEVEL */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h3 className="text-lg font-bold text-white">Step 3: Select Experience Level</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {EXPERIENCE_LEVELS.map((exp) => (
                <Card
                  key={exp.id}
                  interactive
                  onClick={() => setExperience(exp.id)}
                  className={`p-6 space-y-2 border ${
                    experience === exp.id
                      ? 'border-purple-500 bg-purple-950/30'
                      : 'hover:border-purple-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-white">{exp.title}</h4>
                    {experience === exp.id && <CheckCircle2 className="w-5 h-5 text-purple-400" />}
                  </div>
                  <p className="text-xs text-slate-400">{exp.description}</p>
                </Card>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4">
              <Button onClick={() => setStep(2)} variant="secondary" icon={ArrowLeft}>
                Back
              </Button>
              <Button onClick={() => setStep(4)} variant="primary" icon={ArrowRight}>
                Next: Difficulty
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 4: DIFFICULTY LEVEL */}
        {step === 4 && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h3 className="text-lg font-bold text-white">Step 4: Select Interview Difficulty</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DIFFICULTY_LEVELS.map((diff) => (
                <Card
                  key={diff.id}
                  interactive
                  onClick={() => setDifficulty(diff.id)}
                  className={`p-6 border ${
                    difficulty === diff.id ? 'border-purple-500 bg-purple-950/30' : 'hover:border-purple-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${diff.badgeColor}`}>
                      {diff.title}
                    </span>
                    {difficulty === diff.id && <CheckCircle2 className="w-5 h-5 text-purple-400" />}
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4">
              <Button onClick={() => setStep(3)} variant="secondary" icon={ArrowLeft}>
                Back
              </Button>
              <Button onClick={() => setStep(5)} variant="primary" icon={ArrowRight}>
                Next: Interview Format
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 5: INTERVIEW TYPE */}
        {step === 5 && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h3 className="text-lg font-bold text-white">Step 5: Select Interview Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INTERVIEW_TYPES.map((type) => (
                <Card
                  key={type.id}
                  interactive
                  onClick={() => setInterviewType(type.id)}
                  className={`p-5 space-y-2 border ${
                    interviewType === type.id ? 'border-purple-500 bg-purple-950/30' : 'hover:border-purple-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-white">{type.title}</h4>
                    {interviewType === type.id && <CheckCircle2 className="w-5 h-5 text-purple-400" />}
                  </div>
                  <p className="text-xs text-slate-400">{type.description}</p>
                </Card>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4">
              <Button onClick={() => setStep(4)} variant="secondary" icon={ArrowLeft}>
                Back
              </Button>
              <Button onClick={() => setStep(6)} variant="primary" icon={ArrowRight}>
                Next: Question Count
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 6: QUESTION COUNT */}
        {step === 6 && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h3 className="text-lg font-bold text-white">Step 6: Number of Questions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {QUESTION_COUNT_OPTIONS.map((count) => (
                <Card
                  key={count}
                  interactive
                  onClick={() => setQuestionCount(count)}
                  className={`p-6 text-center border ${
                    questionCount === count ? 'border-purple-500 bg-purple-950/30' : 'hover:border-purple-500/30'
                  }`}
                >
                  <span className="text-3xl font-extrabold text-white block">{count}</span>
                  <span className="text-xs text-slate-400">Questions</span>
                </Card>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4">
              <Button onClick={() => setStep(5)} variant="secondary" icon={ArrowLeft}>
                Back
              </Button>
              <Button onClick={() => setStep(7)} variant="primary" icon={ArrowRight}>
                Review Configuration
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 7: SUMMARY & START */}
        {step === 7 && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h3 className="text-lg font-bold text-white">Step 7: Interview Configuration Summary</h3>

            <Card className="p-8 border-purple-500/40 space-y-6 bg-gradient-to-br from-purple-950/30 via-slate-900 to-[#0b0f19]">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">Target Role</span>
                  <span className="text-sm font-extrabold text-white">{selectedRole.title}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">Experience</span>
                  <span className="text-sm font-extrabold text-white uppercase">{experience}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">Difficulty</span>
                  <span className="text-sm font-extrabold text-amber-400 uppercase">{difficulty}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">Format & Questions</span>
                  <span className="text-sm font-extrabold text-cyan-400 uppercase">{interviewType} ({questionCount} Qs)</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-300">
                  ⚡ AI engine will synthesize resume skills with {selectedRole.title} core competencies.
                </span>

                <Button
                  onClick={handleStartInterview}
                  size="lg"
                  variant="primary"
                  icon={Zap}
                  isLoading={isInitializing}
                >
                  Start AI Interview Now
                </Button>
              </div>
            </Card>

            <div className="flex justify-start">
              <Button onClick={() => setStep(6)} variant="secondary" icon={ArrowLeft}>
                Back to Questions
              </Button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default CreateInterview;
