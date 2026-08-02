import React from 'react';
import { ShieldCheck, Sparkles, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, PieChart } from 'lucide-react';
import HeapVisualizer from '../components/HeapVisualizer';

export default function AnalyticsPage({ healthScore, topExpenses, heapStructure, predictions }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Page Header Banner with Graphic */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-300 bg-white shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center space-x-2">
              <PieChart className="w-6 h-6 text-emerald-700" />
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Financial Analytics & Intelligence</h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-bold leading-relaxed">
              In-depth breakdown of monthly spending distribution, rank-ordered expense priorities, and automated cash flow forecasts.
            </p>
          </div>
          <div className="hidden md:flex justify-center">
            <img 
              src="/analytics.png" 
              alt="Analytics Graphic" 
              className="w-44 h-auto rounded-2xl object-cover shadow-md border border-slate-200"
            />
          </div>
        </div>
      </div>

      {/* Expense Priority Component */}
      <HeapVisualizer heapData={heapStructure} />

      {/* Health Evaluation & Predictive Projections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Financial Health Diagnostic */}
        <div className="glass-card rounded-2xl p-6 border border-slate-300 bg-white space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h3 className="font-black text-lg text-slate-900 flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <span>Financial Health Evaluation</span>
              </h3>
              <p className="text-xs text-slate-700 font-bold">Automated diagnostic score based on liquidity & savings ratio</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-emerald-800">{healthScore?.score || 75}/100</span>
              <span className="block text-[11px] font-black text-slate-800 uppercase">{healthScore?.status || 'STABLE'}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-300">
              <span className="text-slate-700 font-extrabold">Total Monthly Income</span>
              <p className="text-base font-black text-emerald-800 mt-1">
                Rs. {(healthScore?.totalIncome || 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-300">
              <span className="text-slate-700 font-extrabold">Total Monthly Outflows</span>
              <p className="text-base font-black text-rose-800 mt-1">
                Rs. {(healthScore?.totalExpense || 0).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Warnings */}
          <div>
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
              Status Alerts
            </h4>
            <div className="space-y-2 text-xs">
              {(healthScore?.alerts || [
                "Tuition fees and rent represent 65% of monthly outflow.",
                "Maintain target emergency fund allocation."
              ]).map((alert, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-amber-100 border border-amber-300 text-amber-950 font-extrabold flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                  <span>{alert}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Predictive Forecasts */}
        <div className="glass-card rounded-2xl p-6 border border-slate-300 bg-white space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-200 pb-4">
            <Sparkles className="w-5 h-5 text-emerald-700" />
            <div>
              <h3 className="font-black text-lg text-slate-900">Predictive Cash Projection</h3>
              <p className="text-xs text-slate-700 font-bold">Forecasting next month expenditures & savings rate</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-between">
              <div>
                <span className="text-slate-800 font-extrabold">Forecasted Next Month Outflow</span>
                <p className="text-lg font-black text-slate-950 mt-0.5">
                  Rs. {(predictions?.forecastNextMonthExpense || 368000).toLocaleString()}
                </p>
              </div>
              <TrendingDown className="w-6 h-6 text-emerald-700" />
            </div>

            <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-between">
              <div>
                <span className="text-emerald-950 font-extrabold">Projected Savings Rate</span>
                <p className="text-lg font-black text-emerald-900 mt-0.5">
                  {predictions?.projectedSavingsRate || 21.7}% Retention
                </p>
              </div>
              <TrendingUp className="w-6 h-6 text-emerald-700" />
            </div>

            {/* Smart Recommendations */}
            <div>
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
                Smart Recommendations
              </h4>
              <div className="space-y-2">
                {(predictions?.recommendations || [
                  "Consolidate cloud subscription costs to save approx. LKR 6,500/month.",
                  "Increase monthly allocation to Emergency Reserve Fund Goal by 15%.",
                  "Rebalance dining and leisure expenses to optimize surplus."
                ]).map((rec, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-100 border border-slate-300 text-slate-900 font-bold flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
