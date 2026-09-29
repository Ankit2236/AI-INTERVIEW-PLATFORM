import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Menu, X, ArrowRight, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#07090e]/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#0b0f19] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-400 group-hover:text-cyan-400 transition-colors" />
            </div>
          </div>
          <span className="text-xl font-extrabold tracking-tight">
            Interview<span className="text-gradient-purple">AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#home" className="hover:text-white transition-colors">Home</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <Button onClick={() => navigate('/dashboard')} variant="primary" icon={User}>
              Dashboard
            </Button>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-3 py-2">
                Login
              </Link>
              <Button onClick={() => navigate('/register')} variant="primary" icon={ArrowRight}>
                Get Started
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 border-b border-white/10 bg-[#0b0f19]/95 backdrop-blur-2xl flex flex-col gap-4 text-sm font-medium">
          <a href="#home" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-2">Home</a>
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-2">How It Works</a>
          <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-2">Features</a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-2">Pricing</a>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            {user ? (
              <Button onClick={() => { navigate('/dashboard'); setMobileMenuOpen(false); }} variant="primary" icon={User} className="w-full">
                Dashboard
              </Button>
            ) : (
              <>
                <Button onClick={() => { navigate('/login'); setMobileMenuOpen(false); }} variant="secondary" className="w-full">
                  Login
                </Button>
                <Button onClick={() => { navigate('/register'); setMobileMenuOpen(false); }} variant="primary" icon={ArrowRight} className="w-full">
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
