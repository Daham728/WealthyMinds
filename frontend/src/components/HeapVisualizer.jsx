import React from 'react';
import { TrendingDown, ArrowUpRight, Award } from 'lucide-react';

export default function HeapVisualizer({ heapData }) {
  const items = heapData || [];

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-300 bg-white shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <TrendingDown className="w-5 h-5 text-amber-700" />
            <h3 className="font-black text-lg text-slate-900">Expense Priority Ranking</h3>
          </div>
          <p className="text-xs text-slate-700 font-bold mt-1">
            Automated ranking of expenditures to pinpoint top financial drivers.
          </p>
        </div>
      </div>

      {/* Outflow Sequence */}
      <div className="mb-6">
        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
          Ranked Expense Sequence
        </h4>
        <div className="flex overflow-x-auto gap-2.5 py-2 no-scrollbar">
          {items.map((node, idx) => (
            <div 
              key={idx}
              className={`flex-shrink-0 w-32 p-3.5 rounded-xl border text-center transition-all ${
                idx === 0 
                  ? 'bg-amber-100 border-amber-400 text-amber-950 shadow-sm' 
                  : 'bg-slate-100 border-slate-300 hover:border-slate-400'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono font-black text-slate-700 mb-1">
                <span>Rank #{idx + 1}</span>
                {idx === 0 && <span className="text-amber-800 font-black">PEAK</span>}
              </div>
              <p className="text-xs font-black text-slate-950 truncate">{node.title}</p>
              <p className="text-xs font-black text-amber-800 mt-1">Rs. {node.priority.toLocaleString()}</p>
              <p className="text-[10px] text-slate-700 font-bold mt-0.5">{node.category}</p>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-slate-700 font-bold text-xs py-4">No expense items recorded.</div>
          )}
        </div>
      </div>

      {/* Top Outflows */}
      <div className="bg-slate-100 rounded-xl p-5 border border-slate-300">
        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-4 flex items-center space-x-1.5">
          <Award className="w-4 h-4 text-amber-700" />
          <span>Major Outflow Drivers</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.slice(0, 3).map((item, index) => (
            <div 
              key={index} 
              className="p-4 rounded-xl bg-white border border-slate-300 flex items-start space-x-3 shadow-sm"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${
                index === 0 ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                index === 1 ? 'bg-slate-200 text-slate-900 border border-slate-300' :
                'bg-amber-50 text-amber-900 border border-amber-300'
              }`}>
                #{index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900 truncate">{item.title}</span>
                  <ArrowUpRight className="w-4 h-4 text-rose-700" />
                </div>
                <p className="text-sm font-black text-slate-950 mt-0.5">Rs. {item.priority.toLocaleString()}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-700 mt-1 font-bold">
                  <span className="bg-slate-100 px-2 py-0.5 rounded font-black text-slate-900 border border-slate-200">{item.category}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
