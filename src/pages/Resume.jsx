import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  Trash2,
  RefreshCw,
  Sparkles,
  Plus,
  X,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Award
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Button from '../components/Button';
import { uploadAndParseResume, getStoredResume, deleteStoredResume } from '../services/resumeService';
import { useToast } from '../context/ToastContext';

const Resume = () => {
  const [resumeData, setResumeData] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [parseStatus, setParseStatus] = useState(''); // '' | 'parsing' | 'success'
  const [newSkill, setNewSkill] = useState('');

  const { showToast } = useToast();

  useEffect(() => {
    const stored = getStoredResume();
    if (stored) {
      setResumeData(stored);
    }
  }, []);

  const handleFileDrop = async (e) => {
    e.preventDefault();
    const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > 5 * 1024 * 1024) {
        showToast('File size exceeds maximum limit of 5MB', 'error');
        return;
      }
      processUpload(file);
    }
  };

  const processUpload = async (file) => {
    setIsUploading(true);
    setParseStatus('parsing');
    try {
      const result = await uploadAndParseResume(file);
      setResumeData(result);
      setParseStatus('success');
      showToast('Resume uploaded and parsed successfully!', 'success');
    } catch (e) {
      showToast('Error parsing resume', 'error');
      setParseStatus('');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    if (!resumeData) return;
    const updatedSkills = resumeData.skills.filter((s) => s !== skillToRemove);
    const updated = { ...resumeData, skills: updatedSkills };
    setResumeData(updated);
    localStorage.setItem('interview_ai_resume', JSON.stringify(updated));
  };

  const handleAddSkill = (e) => {
    e?.preventDefault();
    if (!newSkill.trim() || !resumeData) return;
    const updatedSkills = [...new Set([...resumeData.skills, newSkill.trim()])];
    const updated = { ...resumeData, skills: updatedSkills };
    setResumeData(updated);
    localStorage.setItem('interview_ai_resume', JSON.stringify(updated));
    setNewSkill('');
    showToast('Skill added', 'info');
  };

  const handleDeleteResume = () => {
    deleteStoredResume();
    setResumeData(null);
    setParseStatus('');
    showToast('Resume removed', 'info');
  };

  return (
    <div className="flex min-h-screen bg-[#07090e]">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-10 space-y-8 overflow-y-auto">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <FileText className="w-8 h-8 text-purple-400" /> Upload Your Resume
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Your resume helps the AI engine create highly realistic, personalized interview questions.
          </p>
        </div>

        {/* Drag & Drop Upload Zone */}
        <Card className="p-8 border-dashed border-2 border-purple-500/40 text-center relative overflow-hidden bg-purple-950/10">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            className="flex flex-col items-center justify-center space-y-4 py-6 cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
              <UploadCloud className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-base font-bold text-white">
                Drag & Drop your resume here, or <span className="text-purple-400 hover:underline">Browse Files</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">Supports PDF, DOC, DOCX (Maximum file size: 5MB)</p>
            </div>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileDrop}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          {/* Parsing Status Indicator */}
          {parseStatus === 'parsing' && (
            <div className="mt-4 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 animate-spin text-cyan-400" />
              <span>Analyzing Resume & Extracting Technical Skills...</span>
            </div>
          )}

          {parseStatus === 'success' && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Resume Successfully Analyzed ✓</span>
            </div>
          )}
        </Card>

        {/* Parsed Resume Details */}
        {resumeData && (
          <div className="space-y-6">
            {/* Header Card */}
            <Card className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-purple-500/30">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{resumeData.fileName}</h3>
                  <p className="text-xs text-slate-400">{resumeData.fileSize} • Uploaded on {new Date(resumeData.uploadDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="cursor-pointer">
                  <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileDrop} className="hidden" />
                  <Button variant="secondary" size="sm" icon={RefreshCw} type="button">
                    Replace
                  </Button>
                </label>
                <Button onClick={handleDeleteResume} variant="danger" size="sm" icon={Trash2}>
                  Remove
                </Button>
              </div>
            </Card>

            {/* Extracted Information Chips & Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Technical Skills */}
              <Card className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" /> Extracted Skills
                  </h4>
                  <span className="text-xs text-slate-400">{resumeData.skills.length} skills</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-500/10 text-purple-200 border border-purple-500/30 flex items-center gap-1.5"
                    >
                      {skill}
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="hover:text-rose-400 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>

                <form onSubmit={handleAddSkill} className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add extra skill (e.g. Docker, GraphQL)"
                    className="flex-1 glass-input rounded-xl px-3 py-2 text-xs"
                  />
                  <Button type="submit" variant="primary" size="sm" icon={Plus}>
                    Add
                  </Button>
                </form>
              </Card>

              {/* Education & Experience */}
              <Card className="space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-cyan-400" /> Education & Experience
                </h4>

                <div className="space-y-3 text-xs">
                  {resumeData.education?.map((edu, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                      <div className="font-bold text-white">{edu.degree}</div>
                      <div className="text-slate-400">{edu.institution} • {edu.year}</div>
                    </div>
                  ))}

                  {resumeData.experience?.map((exp, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                      <div className="font-bold text-white">{exp.role} @ {exp.company}</div>
                      <div className="text-slate-400">{exp.duration}</div>
                      <div className="text-slate-300 text-[11px]">{exp.details}</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Projects */}
              <Card className="md:col-span-2 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-emerald-400" /> Parsed Projects
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resumeData.projects?.map((proj, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                      <h5 className="font-bold text-white text-sm">{proj.name}</h5>
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                        {proj.tech}
                      </span>
                      <p className="text-xs text-slate-300 pt-1">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Resume;
