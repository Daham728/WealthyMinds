import React, { useState } from 'react';
import { Network, ArrowRight, ArrowDownRight, ArrowUpRight, Wallet, Building2, ShoppingBag, DollarSign } from 'lucide-react';

export default function GraphVisualizer({ graphData }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL'); // 'ALL' | 'INCOME' | 'ACCOUNTS' | 'EXPENSE'

  const incomeSources = [
    { title: 'Monthly Software Salary', amount: 350000, account: 'Commercial Bank', desc: 'Primary salary income' },
    { title: 'Freelance Web Project', amount: 120000, account: 'Sampath Bank', desc: 'Client development payout' },
  ];

  const bankAccounts = [
    { name: 'Commercial Bank', inflow: 350000, outflow: 313500, net: 36500, desc: 'Primary checking account' },
    { name: 'Sampath Bank', inflow: 120000, outflow: 0, net: 120000, desc: 'High-yield savings account' },
    { name: 'Visa Credit Card', inflow: 0, outflow: 43000, net: -43000, desc: 'Card expenses & dining' },
  ];

  const expenseOutflows = [
    { title: 'NIBM Tuition Fees', amount: 150000, category: 'Education', account: 'Commercial Bank' },
    { title: 'Apartment Rent & Utilities', amount: 85000, category: 'Housing', account: 'Commercial Bank' },
    { title: 'Mutual Fund Investment', amount: 50000, category: 'Investments', account: 'Savings Account' },
    { title: 'Keells Super Groceries', amount: 42500, category: 'Food', account: 'Commercial Bank' },
    { title: 'Dining Out & Restaurants', amount: 24500, category: 'Food', account: 'Credit Card' },
    { title: 'Vehicle Fuel & Service', amount: 22000, category: 'Transport', account: 'Commercial Bank' },
    { title: 'AWS Cloud Subscriptions', amount: 18500, category: 'Subscriptions', account: 'Credit Card' },
    { title: 'Health Insurance Premium', amount: 14000, category: 'Health', account: 'Commercial Bank' },
  ];

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-300 bg-white shadow-md space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Network className="w-6 h-6 text-emerald-700" />
            <h3 className="font-black text-xl text-slate-900">Simple Cash Flow Diagram</h3>
          </div>
          <p className="text-xs text-slate-600 font-bold mt-1">
            Easy 3-step visual summary: Money In ➔ Where It Sits ➔ Money Out
          </p>
        </div>

        <div className="flex items-center space-x-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-300 text-xs font-bold">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1.5 rounded-xl transition-all ${selectedCategory === 'ALL' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-200'}`}
          >
            All Flows
          </button>
          <button
            onClick={() => setSelectedCategory('INCOME')}
            className={`px-3 py-1.5 rounded-xl transition-all ${selectedCategory === 'INCOME' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-200'}`}
          >
            Money In
          </button>
          <button
            onClick={() => setSelectedCategory('EXPENSE')}
            className={`px-3 py-1.5 rounded-xl transition-all ${selectedCategory === 'EXPENSE' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-200'}`}
          >
            Money Out
          </button>
        </div>
      </div>

      {/* 3-COLUMN VISUAL CASH FLOW PIPELINE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* STEP 1: MONEY IN (INCOME) */}
        {(selectedCategory === 'ALL' || selectedCategory === 'INCOME') && (
          <div className="bg-emerald-50/80 rounded-2xl p-5 border border-emerald-200 space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
              <div className="flex items-center space-x-2">
                <ArrowUpRight className="w-5 h-5 text-emerald-700" />
                <h4 className="font-black text-slate-900 text-sm">1. Money In (Income)</h4>
              </div>
              <span className="text-xs font-black text-emerald-800">LKR 470,000</span>
            </div>

            <div className="space-y-3">
              {incomeSources.map((item, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-xl border border-emerald-200 shadow-sm space-y-1">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-slate-900 text-xs">{item.title}</span>
                    <span className="font-black text-emerald-700 text-xs">+LKR {item.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-slate-500 font-semibold pt-1 border-t border-slate-100">
                    <span>{item.desc}</span>
                    <span className="text-emerald-800 font-bold">➔ {item.account}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: BANK ACCOUNTS (WHERE MONEY SITS) */}
        {(selectedCategory === 'ALL') && (
          <div className="bg-sky-50/80 rounded-2xl p-5 border border-sky-200 space-y-4">
            <div className="flex items-center justify-between border-b border-sky-200 pb-3">
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-sky-700" />
                <h4 className="font-black text-slate-900 text-sm">2. Where Money Sits</h4>
              </div>
              <span className="text-xs font-black text-sky-900">3 Bank Accounts</span>
            </div>

            <div className="space-y-3">
              {bankAccounts.map((acc, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-xl border border-sky-200 shadow-sm space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-black text-slate-900">
                    <span>{acc.name}</span>
                    <span className={acc.net >= 0 ? 'text-slate-900' : 'text-rose-600'}>
                      LKR {acc.net.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-600 font-semibold pt-1 border-t border-slate-100">
                    <span className="text-emerald-700">In: LKR {acc.inflow.toLocaleString()}</span>
                    <span className="text-rose-700">Out: LKR {acc.outflow.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: MONEY OUT (EXPENSES & INVESTMENTS) */}
        {(selectedCategory === 'ALL' || selectedCategory === 'EXPENSE') && (
          <div className="bg-rose-50/80 rounded-2xl p-5 border border-rose-200 space-y-4">
            <div className="flex items-center justify-between border-b border-rose-200 pb-3">
              <div className="flex items-center space-x-2">
                <ArrowDownRight className="w-5 h-5 text-rose-700" />
                <h4 className="font-black text-slate-900 text-sm">3. Money Out (Expenses)</h4>
              </div>
              <span className="text-xs font-black text-rose-800">LKR 406,500</span>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {expenseOutflows.map((item, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-xl border border-rose-200 shadow-sm space-y-1">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-slate-900 text-xs">{item.title}</span>
                    <span className="font-black text-rose-700 text-xs">-LKR {item.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-slate-500 font-semibold pt-1 border-t border-slate-100">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">{item.category}</span>
                    <span>Paid via: <strong className="text-slate-800">{item.account}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
