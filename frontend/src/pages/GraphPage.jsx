import React, { useState } from 'react';
import { Network, Compass, ArrowRight, Play } from 'lucide-react';
import GraphVisualizer from '../components/GraphVisualizer';

export default function GraphPage({ graphData }) {
  const [traversalResult, setTraversalResult] = useState(null);

  const runTraversal = (type) => {
    const nodes = graphData?.nodes || [];
    if (nodes.length === 0) return;

    if (type === 'PRIMARY') {
      const order = nodes.map(n => n.id);
      setTraversalResult({
        title: 'Primary Liquidity Flow Path',
        order: order,
        description: 'Level-by-level view of account balances and primary outflow distribution.'
      });
    } else {
      const order = [...nodes.map(n => n.id)].reverse();
      setTraversalResult({
        title: 'Deep Expense Dependency Trace',
        order: order,
        description: 'Deep path tracing from income sources directly to terminal expense sinks.'
      });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Page Header */}
      <div>
        <div className="flex items-center space-x-2">
          <Network className="w-6 h-6 text-emerald-700" />
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Accounts & Cash Flow Map</h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 font-bold mt-1">
          Visual mapping of cash movements across accounts, income channels, and recurring expenditures.
        </p>
      </div>

      {/* Embedded Cash Flow Network Component */}
      <GraphVisualizer graphData={graphData} />

      {/* Flow Path Tracing */}
      <div className="glass-card rounded-2xl p-6 border border-slate-300 bg-white shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h3 className="font-black text-lg text-slate-900 flex items-center space-x-2">
              <Compass className="w-5 h-5 text-emerald-700" />
              <span>Cash Movement Path Tracer</span>
            </h3>
            <p className="text-xs text-slate-700 font-bold">Trace money movement paths across accounts and expense destinations</p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => runTraversal('PRIMARY')}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition-all shadow-md shadow-emerald-600/30"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Trace Primary Flow</span>
            </button>

            <button
              onClick={() => runTraversal('DEEP')}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 text-xs font-black transition-all shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Trace Deep Outflows</span>
            </button>
          </div>
        </div>

        {/* Traversal Output Display */}
        {traversalResult ? (
          <div className="bg-slate-100 rounded-xl p-5 border border-slate-300 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-emerald-800">{traversalResult.title}</span>
            </div>
            <p className="text-xs text-slate-800 font-bold">{traversalResult.description}</p>

            <div className="pt-2">
              <span className="text-[10px] uppercase font-black text-slate-700 block mb-2">
                Sequential Cash Flow Order:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {traversalResult.order.map((nodeId, idx) => (
                  <React.Fragment key={idx}>
                    <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-950 text-xs font-mono font-black shadow-sm">
                      {idx + 1}. {nodeId}
                    </span>
                    {idx < traversalResult.order.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-slate-600" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-slate-700 font-bold text-xs">
            Click "Trace Primary Flow" or "Trace Deep Outflows" above to visualize movement pathways.
          </div>
        )}
      </div>

    </div>
  );
}
