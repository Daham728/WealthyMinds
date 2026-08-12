import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  PieChart, 
  Edit3, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight, 
  BarChart2, 
  Zap,
  Check
} from 'lucide-react';
import HeapVisualizer from '../components/HeapVisualizer';

export default function AnalyticsPage({ healthScore, topExpenses, heapStructure, predictions }) {
  const [monthlyIncome, setMonthlyIncome] = useState(470000);
  const [isEditingIncome, setIsEditingIncome] = useState(false);
  const [tempIncomeInput, setTempIncomeInput] = useState(470000);

  // Recalculate dynamic net savings and daily budget limit
  const totalExpense = healthScore?.totalExpense || 406500;
  const netSavings = monthlyIncome - totalExpense;
  const savingsRate = monthlyIncome > 0 ? ((netSavings / monthlyIncome) * 100).toFixed(1) : 0;
  const dailyThreshold = Math.round(monthlyIncome / 30);

  // Daily Spending Breakdown for Overspending Analysis
  const dailySpendingData = [
    { date: 'Jul 01', amount: 0, title: 'Salary Credit (+LKR 350k)', isIncome: true },
    { date: 'Jul 02', amount: 85000, title: 'Apartment Rent', over: 85000 - dailyThreshold, isPeak: true },
    { date: 'Jul 05', amount: 42500, title: 'Grocery Keells', over: 42500 - dailyThreshold, isPeak: true },
    { date: 'Jul 10', amount: 0, title: 'Freelance Payout (+LKR 120k)', isIncome: true },
    { date: 'Jul 12', amount: 150000, title: 'Tuition Fee (NIBM)', over: 150000 - dailyThreshold, isPeak: true, isExtreme: true },
    { date: 'Jul 15', amount: 18500, title: 'AWS Cloud Subscriptions', over: 18500 - dailyThreshold, isPeak: false },
    { date: 'Jul 18', amount: 14000, title: 'Health Insurance', over: 0, isPeak: false },
    { date: 'Jul 20', amount: 24500, title: 'Dining Out', over: 24500 - dailyThreshold, isPeak: true },
    { date: 'Jul 25', amount: 50000, title: 'Mutual Fund Investment', over: 50000 - dailyThreshold, isPeak: true },
    { date: 'Jul 28', amount: 22000, title: 'Vehicle Fuel & Service', over: 22000 - dailyThreshold, isPeak: false }
  ];

  const handleSaveIncome = () => {
    setMonthlyIncome(Number(tempIncomeInput));
    setIsEditingIncome(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Page Header Banner */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-300 bg-white shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center space-x-2">
              <PieChart className="w-6 h-6 text-emerald-700" />
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Financial Analytics & Intelligence</h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-bold leading-relaxed">
              In-depth breakdown of monthly spending, peak overspending days, month-over-month comparative analytics, and priority heap rankings.
            </p>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
              <span className="text-xs font-bold text-slate-600 block">Daily Budget Threshold</span>
              <span className="text-xl font-black text-emerald-800">LKR {dailyThreshold.toLocaleString()}/day</span>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURE 1: EDITABLE MONTHLY INCOME TARGET */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-300">
                Configurable Target
              </span>
              <h2 className="text-lg font-black text-slate-900">Monthly Target Income Settings</h2>
            </div>
            <p className="text-xs text-slate-600 font-semibold mt-1">
              Adjust your expected monthly income target to re-calculate daily budget thresholds and surplus.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {isEditingIncome ? (
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={tempIncomeInput}
                  onChange={(e) => setTempIncomeInput(e.target.value)}
                  className="px-3 py-1.5 border border-emerald-400 rounded-xl text-sm font-black text-slate-900 bg-emerald-50/50 w-36 outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  onClick={handleSaveIncome}
                  className="p-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all shadow-sm"
                  title="Save New Income Target"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <span className="text-[11px] font-bold text-slate-500 block">Current Target Income</span>
                  <span className="text-2xl font-black text-emerald-700">LKR {monthlyIncome.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => { setTempIncomeInput(monthlyIncome); setIsEditingIncome(true); }}
                  className="flex items-center space-x-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-all border border-slate-300"
                >
                  <Edit3 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Edit Income</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Surplus Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="text-emerald-900 font-bold">Configured Monthly Income</span>
            <p className="text-xl font-black text-emerald-700 mt-1">LKR {monthlyIncome.toLocaleString()}</p>
          </div>
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
            <span className="text-rose-900 font-bold">Total Monthly Outflows</span>
            <p className="text-xl font-black text-rose-700 mt-1">LKR {totalExpense.toLocaleString()}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-100 border border-slate-300">
            <span className="text-slate-700 font-bold">Calculated Monthly Surplus</span>
            <p className={`text-xl font-black ${netSavings >= 0 ? 'text-slate-900' : 'text-rose-700'} mt-1`}>
              LKR {netSavings.toLocaleString()} ({savingsRate}%)
            </p>
          </div>
        </div>
      </div>

      {/* FEATURE 2: EXPENSE PREDICTION & DAILY OVERSPENDING CHART */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <BarChart2 className="w-5 h-5 text-rose-600" />
              <h2 className="text-lg font-black text-slate-900">Daily Spending & Overspending Analysis</h2>
            </div>
            <p className="text-xs text-slate-600 font-semibold mt-1">
              Monitors daily expenditures against your LKR {dailyThreshold.toLocaleString()}/day threshold to highlight high-spending days.
            </p>
          </div>
          <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-black rounded-full border border-amber-300 w-fit">
            Daily Budget Cap: LKR {dailyThreshold.toLocaleString()}
          </span>
        </div>

        {/* Visual Daily Spending Bar Chart */}
        <div className="space-y-4">
          <span className="text-xs font-black text-slate-700 uppercase tracking-wider block">
            Daily Expense Breakdown vs Threshold:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2 items-end h-44 pt-6 pb-2 border-b border-slate-200">
            {dailySpendingData.map((item, idx) => {
              const heightPct = item.isIncome ? 15 : Math.min(100, Math.max(10, Math.round((item.amount / 150000) * 100)));
              return (
                <div key={idx} className="flex flex-col items-center h-full justify-end group relative">
                  
                  {/* Tooltip Hover */}
                  <div className="absolute -top-12 bg-slate-900 text-white text-[10px] p-2 rounded-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 whitespace-nowrap shadow-lg">
                    {item.title}: LKR {item.amount.toLocaleString()}
                  </div>

                  {/* Bar */}
                  <div 
                    className={`w-full rounded-t-xl transition-all duration-500 ${
                      item.isIncome 
                        ? 'bg-emerald-400' 
                        : item.isExtreme 
                          ? 'bg-rose-600 ring-2 ring-rose-400 animate-pulse' 
                          : item.isPeak 
                            ? 'bg-amber-500' 
                            : 'bg-slate-300'
                    }`}
                    style={{ height: `${heightPct}%` }}
                  />
                  <span className="text-[10px] font-bold text-slate-600 mt-2">{item.date}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Peak Overspending Warning Cards */}
        <div className="space-y-3">
          <span className="text-xs font-black text-slate-800 uppercase tracking-wider block">
            High Spending Days & Overspending Alerts:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
              <div className="flex justify-between items-center text-xs font-bold text-rose-900">
                <span className="flex items-center space-x-1">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>July 12 (Extreme Peak)</span>
                </span>
                <span className="font-black text-rose-700">LKR 150,000</span>
              </div>
              <p className="text-[11px] text-rose-800 font-semibold">
                University Tuition Fee payment exceeded daily limit by LKR 134,333.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
              <div className="flex justify-between items-center text-xs font-bold text-amber-900">
                <span className="flex items-center space-x-1">
                  <Zap className="w-4 h-4 text-amber-600" />
                  <span>July 02 (Fixed Peak)</span>
                </span>
                <span className="font-black text-amber-800">LKR 85,000</span>
              </div>
              <p className="text-[11px] text-amber-900 font-semibold">
                Apartment Rent & Utilities payment exceeded daily limit by LKR 69,333.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
              <div className="flex justify-between items-center text-xs font-bold text-emerald-900">
                <span className="flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>July 25 (Investment)</span>
                </span>
                <span className="font-black text-emerald-700">LKR 50,000</span>
              </div>
              <p className="text-[11px] text-emerald-800 font-semibold">
                Planned Mutual Fund Index investment (positive wealth allocation).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURE 3: MONTH-OVER-MONTH COMPARISON ("Previous Month vs Current Month") */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-black text-slate-900">Month-over-Month Spending Comparison</h2>
            </div>
            <p className="text-xs text-slate-600 font-semibold mt-1">
              Evaluates June 2026 vs July 2026 spending performance and key reasons for improvement.
            </p>
          </div>
          <span className="px-3.5 py-1.5 bg-emerald-100 text-emerald-900 text-xs font-black rounded-full border border-emerald-300 w-fit flex items-center space-x-1">
            <ArrowUpRight className="w-4 h-4 text-emerald-700" />
            <span>+12.6% Savings Growth in July</span>
          </span>
        </div>

        {/* Month Comparison Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Previous Month Card */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Previous Month (June 2026)</span>
              <span className="px-2.5 py-0.5 bg-rose-100 text-rose-800 text-[10px] font-black rounded-full border border-rose-200">
                High Expenditure
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-black text-slate-800">LKR 466,000 Outflow</p>
              <p className="text-xs text-slate-600 font-bold">Net Surplus: LKR 4,000 (0.9% Savings Rate)</p>
            </div>
            <p className="text-xs text-slate-600 font-medium pt-2 border-t border-slate-200">
              June had un-budgeted impulse electronics shopping (LKR 45,000) and excessive dining out (LKR 43,000).
            </p>
          </div>

          {/* Current Month Card */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-emerald-900 uppercase tracking-wider">Current Month (July 2026)</span>
              <span className="px-2.5 py-0.5 bg-emerald-200 text-emerald-950 text-[10px] font-black rounded-full border border-emerald-300">
                Improved Efficiency
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-black text-emerald-800">LKR 406,500 Outflow</p>
              <p className="text-xs text-emerald-900 font-bold">Net Surplus: LKR 63,500 ({savingsRate}% Savings Rate)</p>
            </div>
            <p className="text-xs text-emerald-900 font-semibold pt-2 border-t border-emerald-200">
              Saved LKR 59,500 more than June due to strict budget caps and freelance income expansion.
            </p>
          </div>

        </div>

        {/* Reasons Why July is Better */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
            Key Reasons Why July 2026 Performance Improved:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="flex items-start space-x-2.5 p-3 bg-white rounded-xl border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900">Food & Dining Cap Applied</span>
                <p className="text-slate-600 text-[11px]">Kept dining & groceries to LKR 67,000 using priority heap budget caps (saved LKR 18,500 vs June).</p>
              </div>
            </div>

            <div className="flex items-start space-x-2.5 p-3 bg-white rounded-xl border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900">Cloud Subscriptions Consolidated</span>
                <p className="text-slate-600 text-[11px]">Consolidated cloud hosting & software tools saving LKR 6,500/month.</p>
              </div>
            </div>

            <div className="flex items-start space-x-2.5 p-3 bg-white rounded-xl border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900">Freelance Side Income Added</span>
                <p className="text-slate-600 text-[11px]">Added LKR 120,000 from client web development project into Sampath Bank.</p>
              </div>
            </div>

            <div className="flex items-start space-x-2.5 p-3 bg-white rounded-xl border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900">Zero Impulse Purchases</span>
                <p className="text-slate-600 text-[11px]">Avoided non-essential impulse electronics shopping recorded in June.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Heap Visualizer Component */}
      <HeapVisualizer heapData={heapStructure} />

      {/* Health Evaluation & Predictive Projections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card rounded-2xl p-6 border border-slate-300 bg-white space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h3 className="font-black text-lg text-slate-900 flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <span>Financial Health Evaluation</span>
              </h3>
              <p className="text-xs text-slate-700 font-bold">Diagnostic liquidity & savings score</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-emerald-800">{healthScore?.score || 75}/100</span>
              <span className="block text-[11px] font-black text-slate-800 uppercase">{healthScore?.status || 'STABLE'}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-300">
              <span className="text-slate-700 font-extrabold">Configured Target Income</span>
              <p className="text-base font-black text-emerald-800 mt-1">
                LKR {monthlyIncome.toLocaleString()}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-300">
              <span className="text-slate-700 font-extrabold">Total Outflows</span>
              <p className="text-base font-black text-rose-800 mt-1">
                LKR {totalExpense.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Predictive Forecasts */}
        <div className="glass-card rounded-2xl p-6 border border-slate-300 bg-white space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-200 pb-4">
            <Sparkles className="w-5 h-5 text-emerald-700" />
            <div>
              <h3 className="font-black text-lg text-slate-900">Predictive Cash Projection</h3>
              <p className="text-xs text-slate-700 font-bold">Forecasting next month expenditures</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-between">
              <div>
                <span className="text-slate-800 font-extrabold">Forecasted Next Month Outflow</span>
                <p className="text-lg font-black text-slate-950 mt-0.5">
                  LKR {(predictions?.forecastNextMonthExpense || 368000).toLocaleString()}
                </p>
              </div>
              <TrendingDown className="w-6 h-6 text-emerald-700" />
            </div>

            <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-between">
              <div>
                <span className="text-emerald-950 font-extrabold">Projected Savings Rate</span>
                <p className="text-lg font-black text-emerald-900 mt-0.5">
                  {savingsRate}% Retention
                </p>
              </div>
              <TrendingUp className="w-6 h-6 text-emerald-700" />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
