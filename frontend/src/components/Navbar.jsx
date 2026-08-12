import React from 'react';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  TrendingUp, 
  Network, 
  Target, 
  FileText,
  PlusCircle, 
  Wallet
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenAddModal, onOpenSalaryModal, backendConnected }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'graph', label: 'Cash Flow', icon: Network },
    { id: 'goals', label: 'Goals & Planning', icon: Target },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-300 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer shrink-0 select-none group" 
            onClick={() => setActiveTab('dashboard')}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-md shadow-emerald-600/30 text-white font-black transition-transform group-hover:scale-105">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center space-x-2 leading-none">
                <span className="font-black text-xl tracking-tight text-slate-900 leading-none">
                  Wealthy Minds
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full border border-emerald-300 leading-none">
                  Pro
                </span>
              </div>
              <p className="text-[11px] text-slate-600 font-bold tracking-tight mt-1 leading-none">
                Personal Financial Management Platform
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-black transition-all duration-150 ${
                    isActive
                      ? 'text-emerald-950 bg-emerald-100 border border-emerald-300 shadow-sm'
                      : 'text-slate-800 hover:text-slate-950 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-slate-600'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions & Connection Indicator */}
          <div className="flex items-center space-x-2.5">
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-300 text-xs">
              <span className={`w-2.5 h-2.5 rounded-full ${backendConnected ? 'bg-emerald-600' : 'bg-amber-600'}`} />
              <span className="text-slate-900 text-[11px] font-black">
                {backendConnected ? 'System Active' : 'Connecting...'}
              </span>
            </div>

            <button
              onClick={onOpenSalaryModal}
              className="hidden sm:flex items-center space-x-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 text-xs font-black px-3.5 py-2.5 rounded-xl border border-emerald-300 transition-all shadow-sm"
              title="Job Promotion / Raise Salary"
            >
              <span>🏆 Raise Salary</span>
            </button>

            <button
              onClick={onOpenAddModal}
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-md shadow-emerald-600/30 transition-transform active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Record Transaction</span>
            </button>
          </div>

        </div>
      </div>
      
      {/* Mobile Nav Bar */}
      <div className="md:hidden flex overflow-x-auto py-2 px-4 space-x-2 border-t border-slate-200 bg-white no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs whitespace-nowrap font-black ${
                isActive ? 'bg-emerald-100 text-emerald-950 border border-emerald-300' : 'text-slate-800 bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
