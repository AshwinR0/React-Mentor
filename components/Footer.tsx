
/// <reference types="vite/client" />

import React from 'react';

// Environment-driven contact/profile links (set in your .env as VITE_...)
const GITHUB_URL = import.meta.env.VITE_GITHUB_URL || 'https://github.com/yourusername';
const PORTFOLIO_URL = import.meta.env.VITE_PORTFOLIO_URL || 'https://yourportfolio.com';
const INSTAGRAM_HANDLE = import.meta.env.VITE_INSTAGRAM_HANDLE || 'yourhandle';
const INSTAGRAM_URL = INSTAGRAM_HANDLE.startsWith('http')
  ? INSTAGRAM_HANDLE
  : `https://instagram.com/${INSTAGRAM_HANDLE.replace(/^@/, '')}`;
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'yourname@example.com';

const Footer: React.FC = () => {
  return (
    <footer className="mt-20 pt-12 border-t border-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
            <span className="text-2xl">⚛️</span> ReactTutor
          </div>
          <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
            Helping beginners build a strong mental model of modern React through visual learning and interactive experimentation.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest text-slate-400">
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
              <span>📧</span> Email
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors flex items-center gap-1.5">
              <span>💻</span> GitHub
            </a>
            <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
              <span>🌐</span> Portfolio
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-rose-500 transition-colors flex items-center gap-1.5">
              <span>📸</span> Instagram
            </a>
          </div>
        </div>

        <div className="flex flex-col md:items-end gap-2">
          <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 inline-block">
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter mb-1">Status</p>
            <p className="text-xs font-bold text-indigo-900">Always Learning, Always Building.</p>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">
            Made with <span className="text-rose-500 animate-pulse">❤️</span> by a React Enthusiast
          </p>
          <p className="text-[9px] text-slate-300 uppercase tracking-[0.2em] font-black mt-2">
            © {new Date().getFullYear()} Senior Path Learning
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
