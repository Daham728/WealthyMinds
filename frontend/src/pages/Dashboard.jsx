import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet,
  Clock,
  ArrowRight,
  Target,
  Sparkles
} from 'lucide-react';

export default function Dashboard({ 
  transactions = [], 
  healthScore, 
  topExpenses = [], 
  goals = [], 
  setActiveTab, 
  onOpenAddModal,
  onOpenSalaryModal
}) {
  const safeTransactions = Array.isArray(transactions) ? transactions : [];
  const safeTopExpenses = Array.isArray(topExpenses) ? topExpenses : [];
  const safeGoals = Array.isArray(goals) ? goals : [];

  const totalIncome = safeTransactions
    .filter(t => t.type === 'INCOME')
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const totalExpense = safeTransactions
    .filter(t => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const netSavings = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? ((netSavings / totalIncome) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Hero Banner with Graphic */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-300 bg-white shadow-md relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          <div className="md:col-span-2 space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black border border-emerald-300 inline-flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>Personal Finance Overview</span>
            </span>
            <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
              Welcome to Wealthy Minds Pro
            </h1>
            <p className="text-xs md:text-sm text-slate-700 font-extrabold leading-relaxed max-w-xl">
              Monitor real-time income streams, expenditure trends, and personalized wealth growth goals with complete clarity.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button 
                onClick={onOpenAddModal}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-4.5 py-2.5 rounded-xl shadow-md shadow-emerald-600/30 transition-transform active:scale-95 flex items-center space-x-1.5"
              >
                <span>+ Record Transaction</span>
              </button>

              <button 
                onClick={onOpenSalaryModal}
                className="bg-emerald-100 hover:bg-emerald-200 text-emerald-950 text-xs font-black px-4 py-2.5 rounded-xl border border-emerald-300 transition-all flex items-center space-x-1.5 shadow-sm"
              >
                <span>🏆 Job Promotion / Raise Salary</span>
              </button>

              <button 
                onClick={() => setActiveTab('analytics')}
                className="bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-black px-4.5 py-2.5 rounded-xl border border-slate-300 transition-colors"
              >
                View Analytics →
              </button>
            </div>
          </div>

          {/* Hero Graphic Image */}
          <div className="hidden md:flex justify-center items-center">
            <img 
              src="/hero.png" 
              alt="Wealthy Minds Illustration" 
              className="w-48 h-auto rounded-2xl object-cover shadow-md border border-slate-200"
            />
          </div>

        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Income */}
        <div className="glass-card glass-card-hover p-5 rounded-2xl border border-slate-300 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-800 uppercase tracking-wider">Monthly Income</span>
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 font-black">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-950 mt-3">
            Rs. {totalIncome.toLocaleString()}
          </p>
          <div className="flex items-center space-x-1 text-xs text-emerald-800 mt-2 font-black">
            <ArrowUpRight className="w-4 h-4 text-emerald-700" />
            <span>Verified Income Deposits</span>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="glass-card glass-card-hover p-5 rounded-2xl border border-slate-300 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-800 uppercase tracking-wider">Monthly Outflows</span>
            <div className="p-2.5 rounded-xl bg-rose-100 text-rose-900 border border-rose-300 font-black">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-950 mt-3">
            Rs. {totalExpense.toLocaleString()}
          </p>
          <div className="flex items-center space-x-1 text-xs text-rose-800 mt-2 font-black">
            <ArrowDownRight className="w-4 h-4 text-rose-700" />
            <span>Tracked Expenditures</span>
          </div>
        </div>

        {/* Net Savings */}
        <div className="glass-card glass-card-hover p-5 rounded-2xl border border-slate-300 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-800 uppercase tracking-wider">Net Surplus</span>
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 font-black">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-950 mt-3">
            Rs. {netSavings.toLocaleString()}
          </p>
          <p className="text-xs text-amber-900 mt-2 font-black">
            {savingsRate}% monthly savings rate
          </p>
        </div>

        {/* Financial Health Dial */}
        <div className="glass-card glass-card-hover p-5 rounded-2xl border border-slate-300 bg-white flex items-center space-x-4">
          <div className="relative flex items-center justify-center w-16 h-16 flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="32" cy="32" r="26" stroke="#cbd5e1" strokeWidth="5" fill="transparent" />
              <circle 
                cx="32" cy="32" r="26" 
                stroke={healthScore?.score >= 80 ? '#059669' : '#d97706'} 
                strokeWidth="5" 
                strokeDasharray="163" 
                strokeDashoffset={163 - (163 * (healthScore?.score || 75)) / 100}
                strokeLinecap="round"
                fill="transparent" 
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-base font-black text-slate-950">{healthScore?.score || 75}</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] uppercase font-black text-slate-700 tracking-wider">Health Dial</span>
            <p className="text-xs font-black text-emerald-800 flex items-center space-x-1 mt-0.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>{healthScore?.status || 'STABLE'}</span>
            </p>
            <p className="text-[10px] text-slate-800 font-bold mt-0.5">Liquidity Status</p>
          </div>
        </div>

      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Recent Transactions */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="glass-card rounded-2xl p-6 border border-slate-300 bg-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-emerald-700" />
                <h3 className="font-black text-lg text-slate-950">Recent Activity</h3>
              </div>
              <button 
                onClick={() => setActiveTab('transactions')}
                className="text-xs text-emerald-800 hover:text-emerald-950 font-black flex items-center space-x-1"
              >
                <span>View Full Ledger</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="divide-y divide-slate-200">
              {safeTransactions.slice(0, 5).map((t) => (
                <div key={t.id} className="py-3.5 flex items-center justify-between hover:bg-slate-100 px-2 rounded-xl transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs ${
                      t.type === 'INCOME' ? 'bg-emerald-100 text-emerald-950 border border-emerald-300' : 'bg-rose-100 text-rose-950 border border-rose-300'
                    }`}>
                      {t.type === 'INCOME' ? '+' : '-'}
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-950">{t.title}</p>
                      <p className="text-[11px] text-slate-800 font-bold">{t.category} • {t.account} • {t.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-black ${t.type === 'INCOME' ? 'text-emerald-800' : 'text-rose-800'}`}>
                      {t.type === 'INCOME' ? '+' : '-'} Rs. {(t.amount || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1 Col: Outflows & Goals */}
        <div className="space-y-6">
          
          {/* Highest Outflows Card */}
          <div className="glass-card rounded-2xl p-6 border border-slate-300 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-sm text-slate-950 flex items-center space-x-2">
                <TrendingDown className="w-4 h-4 text-amber-700" />
                <span>Top Expenditure Drivers</span>
              </h3>
            </div>

            <div className="space-y-3">
              {safeTopExpenses.slice(0, 4).map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black text-slate-950 truncate max-w-[140px]">{item.title}</p>
                    <span className="text-[10px] text-slate-800 font-bold">{item.category}</span>
                  </div>
                  <span className="text-xs font-black text-amber-900">Rs. {(item.amount || 0).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Goals */}
          <div className="glass-card rounded-2xl p-6 border border-slate-300 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-sm text-slate-950 flex items-center space-x-2">
                <Target className="w-4 h-4 text-emerald-700" />
                <span>Savings Targets</span>
              </h3>
              <button 
                onClick={() => setActiveTab('goals')}
                className="text-xs text-emerald-800 font-black hover:underline"
              >
                View All →
              </button>
            </div>

            <div className="space-y-4">
              {safeGoals.slice(0, 3).map((g) => (
                <div key={g.id} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-black">
                    <span className="text-slate-950">{g.title}</span>
                    <span className="text-emerald-900 font-black">{g.progress}%</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
                    <div 
                      className="h-full bg-emerald-600 rounded-full transition-all duration-500" 
                      style={{ width: `${g.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
