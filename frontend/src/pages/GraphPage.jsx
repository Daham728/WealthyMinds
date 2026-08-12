import React, { useState } from 'react';
import { Network, Compass, ArrowRight, HelpCircle, CheckCircle2 } from 'lucide-react';
import GraphVisualizer from '../components/GraphVisualizer';

export default function GraphPage({ graphData }) {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const tracerPresets = [
    {
      id: 'salary',
      question: 'Where does my Salary income go?',
      title: 'Salary Cash Flow Path',
      steps: [
        { step: 1, text: 'Monthly Salary of LKR 350,000 is deposited into Commercial Bank Primary Account.' },
        { step: 2, text: 'Commercial Bank pays NIBM Tuition Fees (LKR 150,000) & Apartment Rent (LKR 85,000).' },
        { step: 3, text: 'Commercial Bank pays Keells Supermarket Groceries (LKR 42,500) & Fuel (LKR 22,000).' },
        { step: 4, text: 'Remaining LKR 36,500 stays safely in Commercial Bank as cash liquidity.' }
      ]
    },
    {
      id: 'freelance',
      question: 'Where do my Freelance earnings go?',
      title: 'Freelance Payout Path',
      steps: [
        { step: 1, text: 'Client Freelance project payout of LKR 120,000 is deposited into Sampath Bank.' },
        { step: 2, text: '100% of Freelance earnings (LKR 120,000) remain saved in Sampath Bank high-yield account.' }
      ]
    },
    {
      id: 'creditcard',
      question: 'What expenses are paid by Credit Card?',
      title: 'Credit Card Expense Trace',
      steps: [
        { step: 1, text: 'Visa Credit Card pays Dining Out & Restaurant dinners (LKR 24,500).' },
        { step: 2, text: 'Visa Credit Card pays monthly AWS Cloud Subscriptions (LKR 18,500).' },
        { step: 3, text: 'Total monthly credit card bill: LKR 43,000.' }
      ]
    }
  ];

  const selectedPreset = tracerPresets.find(p => p.id === activeQuestion);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Page Header */}
      <div>
        <div className="flex items-center space-x-2">
          <Network className="w-6 h-6 text-emerald-700" />
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Simple Cash Flow & Money Path Tracer</h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 font-bold mt-1">
          Easily understand how money enters your bank accounts and where every Rupee is spent.
        </p>
      </div>

      {/* 3-Step Visual Diagram */}
      <GraphVisualizer graphData={graphData} />

      {/* EASY MONEY PATH TRACER */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-300 bg-white shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <Compass className="w-5 h-5 text-emerald-700" />
              <h3 className="font-black text-lg text-slate-900">Interactive Money Path Questions</h3>
            </div>
            <p className="text-xs text-slate-600 font-bold mt-0.5">
              Click any question below to see a simple step-by-step trace of your cash flow.
            </p>
          </div>
        </div>

        {/* Question Selector Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {tracerPresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setActiveQuestion(activeQuestion === preset.id ? null : preset.id)}
              className={`p-4 rounded-2xl border text-left text-xs font-black transition-all flex items-start space-x-3 ${
                activeQuestion === preset.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
              }`}
            >
              <HelpCircle className={`w-4 h-4 shrink-0 mt-0.5 ${activeQuestion === preset.id ? 'text-emerald-400' : 'text-emerald-700'}`} />
              <span>{preset.question}</span>
            </button>
          ))}
        </div>

        {/* Plain English Step-by-Step Path Output */}
        {selectedPreset ? (
          <div className="bg-emerald-50/70 rounded-2xl p-6 border border-emerald-200 space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
              <span className="text-sm font-black text-slate-900">{selectedPreset.title}</span>
              <span className="text-xs font-bold text-emerald-800">Step-by-step Explanation</span>
            </div>

            <div className="space-y-3">
              {selectedPreset.steps.map((s) => (
                <div key={s.step} className="flex items-start space-x-3 bg-white p-3.5 rounded-xl border border-emerald-200 text-xs shadow-sm">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black shrink-0 text-[11px]">
                    {s.step}
                  </span>
                  <p className="font-bold text-slate-800 pt-0.5">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-slate-500 font-bold text-xs bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            Click one of the 3 questions above to see the step-by-step cash flow path explanation!
          </div>
        )}

      </div>

    </div>
  );
}
