import React from 'react';
import { Wallet, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-300 bg-white text-slate-800 py-8 px-4 mt-16 text-xs font-bold">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Column */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded bg-emerald-600 flex items-center justify-center text-white font-black">
            <Wallet className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-black text-slate-900">Wealthy Minds Pro</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-800 font-bold">Personal Financial Management Platform</span>
        </div>

        {/* Right Column */}
        <div className="flex items-center space-x-4 text-slate-800 font-extrabold">
          <span className="flex items-center space-x-1">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Encrypted Privacy</span>
          </span>
          <span>© {new Date().getFullYear()} Wealthy Minds. All rights reserved.</span>
        </div>

      </div>
    </footer>
  );
}
