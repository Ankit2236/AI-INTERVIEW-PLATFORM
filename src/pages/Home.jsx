import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Upload,
  UserCheck,
  Bot,
  BarChart,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  Brain,
  CheckCircle2,
  Star,
  Globe,
  Code
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Card from '../components/Card';
import { SUPPORTED_ROLES, MOCK_TESTIMONIALS, PRICING_PLANS } from '../utils/constants';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col selection:bg-purple-500/30">
      <Navbar />

      <main className="flex-1 space-y-24 pb-20">
        {/* HERO SECTION */}
        <section id="home" className="relative pt-12 lg:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          {/* Glowing Background Orbs */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-purple-600/20 via-indigo-600/20 to-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Next-Gen AI Interview Simulator</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                Turn Your Resume Into Your <span className="text-gradient-purple">Next Interview.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Practice personalized AI interviews based on your resume, target role, and experience level. Receive instant feedback, follow-up questions, and deep score analytics.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Button
                  onClick={() => navigate('/create-interview')}
                  size="lg"
                  variant="primary"
                  icon={ArrowRight}
                  className="w-full sm:w-auto"
                >
                  Start Free Interview
                </Button>
                <a href="#how-it-works" className="w-full sm:w-auto">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    See How It Works
                  </Button>
                </a>
              </div>

              <div className="pt-6 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> No Credit Card Required
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" /> Instant AI Analysis
                </span>
              </div>
            </motion.div>

            {/* Right Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 relative flex items-center justify-center"
            >
              {/* Glass Interface Mockup Card */}
              <div className="w-full max-w-md glass-panel p-6 rounded-3xl border-purple-500/30 shadow-2xl space-y-5 relative">
                {/* Floating Badge 1 */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="absolute -top-5 -left-5 bg-[#0e1424] border border-emerald-500/40 px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs text-emerald-300 font-semibold z-20"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Overall Score: 92/100</span>
                </motion.div>

                {/* Floating Badge 2 */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-5 -right-5 bg-[#0e1424] border border-cyan-500/40 px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs text-cyan-300 font-semibold z-20"
                >
                  <Brain className="w-4 h-4 text-cyan-400" />
                  <span>Resume-Tailored Questions</span>
                </motion.div>

                {/* AI Interviewer Preview Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-400 p-0.5">
                      <div className="w-full h-full bg-[#0b0f19] rounded-full flex items-center justify-center">
                        <Bot className="w-5 h-5 text-purple-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">AI Interviewer</h4>
                      <p className="text-[11px] text-emerald-400">● Live Interview Session</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Java Developer
                  </span>
                </div>

                {/* Simulated Question Card */}
                <div className="bg-slate-900/80 p-4 rounded-xl border border-white/5 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Question 3 of 10</span>
                  <p className="text-xs font-semibold text-slate-200">
                    "In your resume, you listed a Spring Boot project. Explain how you handled hash collisions and cache eviction in Redis."
                  </p>
                </div>

                {/* Simulated Answer Preview */}
                <div className="bg-purple-950/30 p-3 rounded-xl border border-purple-500/20 text-xs text-purple-200 italic flex items-center justify-between">
                  <span>"We used LRU eviction strategy and connection pooling..."</span>
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Simple 4-Step Process</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">How InterviewAI Works</h2>
            <p className="text-sm text-slate-400">
              Prepare for your target job role in minutes with our realistic AI assessment engine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Upload Resume', desc: 'Upload PDF or DOCX. AI parses your skills, projects, and work history.', icon: Upload },
              { step: '02', title: 'Select Your Role', desc: 'Choose target position (e.g. Java, React, Data Analyst) and difficulty level.', icon: Target },
              { step: '03', title: 'Take AI Interview', desc: 'Answer questions sequentially via Text or Voice speech recognition mode.', icon: Bot },
              { step: '04', title: 'Get Detailed Feedback', desc: 'Receive score breakdown, radar proficiency chart, strengths, & improvement plan.', icon: BarChart },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card key={idx} interactive className="space-y-4 relative group">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-slate-700 group-hover:text-purple-500/50 transition-colors">
                      {item.step}
                    </span>
                    <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </Card>
              );
            })}
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Built for Job Seekers</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Everything You Need to Ace Tech Interviews</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Resume-Based Questions', desc: 'AI analyzes your actual projects and certifications to ask custom questions.' },
              { title: 'Role-Specific Interviews', desc: 'Preset question banks tailored specifically for Java, React, Full Stack, DevOps, and Data Science.' },
              { title: 'AI Evaluation & Scoring', desc: 'Instant multi-dimension scoring for technical accuracy, clarity, and communication.' },
              { title: 'Real-Time Voice Feedback', desc: 'Use speech-to-text voice recognition to practice speaking under realistic timed pressure.' },
              { title: 'Interview Analytics', desc: 'Recharts radar matrices and progression line graphs track your performance over time.' },
              { title: 'Performance History', desc: 'Review every past interview session, retry questions, and measure continuous improvement.' },
            ].map((feat, idx) => (
              <Card key={idx} className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600/30 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">{feat.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* SUPPORTED ROLES */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Wide Role Coverage</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Supported Job Roles</h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {SUPPORTED_ROLES.map((role) => (
              <button
                key={role.id}
                onClick={() => navigate('/create-interview')}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900/80 border border-white/10 hover:border-purple-500/50 hover:bg-purple-950/30 text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-2"
              >
                <Code className="w-3.5 h-3.5 text-purple-400" />
                <span>{role.title}</span>
              </button>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Success Stories</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Loved by Engineers & Job Seekers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_TESTIMONIALS.map((t, idx) => (
              <Card key={idx} className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">"{t.content}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                  <img src={t.image} alt={t.name} className="w-9 h-9 rounded-full object-cover border border-purple-500/30" />
                  <div>
                    <h4 className="text-xs font-bold text-white">{t.name}</h4>
                    <p className="text-[11px] text-slate-400">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Flexible Pricing</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Simple, Transparent Plans</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING_PLANS.map((plan, idx) => (
              <Card
                key={idx}
                glow={plan.isPopular}
                className={`space-y-6 relative flex flex-col justify-between ${
                  plan.isPopular ? 'border-purple-500 bg-purple-950/20' : ''
                }`}
              >
                {plan.isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white uppercase tracking-wider shadow-lg">
                    Most Popular
                  </span>
                )}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">{plan.description}</p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-xs text-slate-400">{plan.period}</span>
                  </div>

                  <ul className="space-y-2.5 pt-4 border-t border-white/5 text-xs text-slate-300">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={() => navigate('/create-interview')}
                  variant={plan.isPopular ? 'primary' : 'secondary'}
                  className="w-full"
                >
                  {plan.buttonText}
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel p-10 md:p-16 rounded-3xl border-purple-500/40 text-center relative overflow-hidden space-y-6">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-indigo-600/20 to-cyan-500/10 pointer-events-none" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight relative z-10">
              Ready to Face Your Next Interview?
            </h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto relative z-10">
              Upload your resume now and start practicing with realistic AI interviewer questions in under 2 minutes.
            </p>
            <div className="pt-2 relative z-10 flex justify-center">
              <Button
                onClick={() => navigate('/create-interview')}
                size="lg"
                variant="primary"
                icon={ArrowRight}
              >
                Start Free Interview
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#06080d] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-lg font-bold text-white">InterviewAI</span>
            </div>
            <p className="text-xs text-slate-400">
              Realistic AI Resume-Based Interview Preparation platform for software engineers and technology professionals.
            </p>
          </div>

          <div className="space-y-2 text-xs text-slate-400">
            <h4 className="font-bold text-white uppercase tracking-wider mb-2">Platform</h4>
            <p><a href="#how-it-works" className="hover:text-white">How It Works</a></p>
            <p><a href="#features" className="hover:text-white">Features</a></p>
            <p><a href="#pricing" className="hover:text-white">Pricing</a></p>
          </div>

          <div className="space-y-2 text-xs text-slate-400">
            <h4 className="font-bold text-white uppercase tracking-wider mb-2">Legal</h4>
            <p><span className="cursor-pointer hover:text-white">Privacy Policy</span></p>
            <p><span className="cursor-pointer hover:text-white">Terms of Service</span></p>
            <p><span className="cursor-pointer hover:text-white">Cookie Preferences</span></p>
          </div>

          <div className="space-y-3 text-xs text-slate-400">
            <h4 className="font-bold text-white uppercase tracking-wider">Connect</h4>
            <div className="flex items-center gap-3">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-xl glass-panel hover:text-white">
                <Code className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-xl glass-panel hover:text-white">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} InterviewAI Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
