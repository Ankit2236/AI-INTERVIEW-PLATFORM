import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Sparkles,
  Plus,
  X,
  Save,
  CheckCircle2
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
];

const Profile = () => {
  const { user, editProfile } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 234-5678');
  const [college, setCollege] = useState(user?.college || 'Stanford University');
  const [degree, setDegree] = useState(user?.degree || 'B.S. Computer Science');
  const [experience, setExperience] = useState(user?.experience || '2-5 Years');
  const [avatar, setAvatar] = useState(user?.avatar || AVATAR_PRESETS[0]);
  const [skills, setSkills] = useState(user?.skills || ['Java', 'React', 'Node.js', 'SQL', 'Spring Boot', 'Python']);
  const [newSkillTag, setNewSkillTag] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e) => {
    e?.preventDefault();
    setIsSaving(true);
    try {
      await editProfile({
        name,
        email,
        phone,
        college,
        degree,
        experience,
        avatar,
        skills
      });
      showToast('Profile updated successfully!', 'success');
    } catch (e) {
      showToast('Failed to save profile changes', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveTag = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleAddTag = (e) => {
    e?.preventDefault();
    if (!newSkillTag.trim()) return;
    setSkills([...new Set([...skills, newSkillTag.trim()])]);
    setNewSkillTag('');
  };

  return (
    <div className="flex min-h-screen bg-[#07090e]">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-10 space-y-8 overflow-y-auto max-w-5xl mx-auto">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <User className="w-8 h-8 text-purple-400" /> User Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Manage your personal profile, candidate details, and skill tags.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Avatar Selector */}
          <Card className="p-6 space-y-4 border-purple-500/30">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Profile Photo</h3>
            <div className="flex items-center gap-6">
              <img
                src={avatar}
                alt="Profile Avatar"
                className="w-20 h-20 rounded-full object-cover border-2 border-purple-500 shadow-lg shadow-purple-500/30"
              />
              <div className="space-y-2">
                <span className="text-xs text-slate-400 block font-semibold">Select Avatar Preset:</span>
                <div className="flex gap-3">
                  {AVATAR_PRESETS.map((preset, idx) => (
                    <img
                      key={idx}
                      src={preset}
                      alt={`Avatar preset ${idx}`}
                      onClick={() => setAvatar(preset)}
                      className={`w-10 h-10 rounded-full object-cover cursor-pointer border-2 transition-all ${
                        avatar === preset ? 'border-purple-500 scale-110 shadow-lg shadow-purple-500/40' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Personal Info Grid */}
          <Card className="p-6 space-y-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-3">
              Candidate Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Experience Level</label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">College / University</label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Degree & Major</label>
                <input
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full glass-input rounded-xl px-4 py-2.5 text-sm"
                />
              </div>
            </div>
          </Card>

          {/* Skill Tags */}
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-3">
              Skill Tags
            </h3>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-500/10 text-purple-200 border border-purple-500/30 flex items-center gap-1.5"
                >
                  {skill}
                  <button type="button" onClick={() => handleRemoveTag(skill)} className="hover:text-rose-400">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2 pt-2 max-w-md">
              <input
                type="text"
                value={newSkillTag}
                onChange={(e) => setNewSkillTag(e.target.value)}
                placeholder="Add new skill tag..."
                className="flex-1 glass-input rounded-xl px-3 py-2 text-xs"
              />
              <Button onClick={handleAddTag} type="button" variant="primary" size="sm" icon={Plus}>
                Add Tag
              </Button>
            </div>
          </Card>

          <div className="flex justify-end pt-2">
            <Button type="submit" variant="primary" icon={Save} isLoading={isSaving} size="lg">
              Save Changes
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Profile;
