import React, { useState } from 'react';
import { Network, ArrowRight } from 'lucide-react';

export default function GraphVisualizer({ graphData }) {
  const [selectedNode, setSelectedNode] = useState(null);
  const nodes = graphData?.nodes || [];
  const edges = graphData?.edges || [];

  const getNodeColor = (type) => {
    switch (type) {
      case 'ACCOUNT': return 'bg-sky-100 border-sky-400 text-sky-950';
      case 'INCOME_SOURCE': return 'bg-emerald-100 border-emerald-400 text-emerald-950';
      case 'EXPENSE_CATEGORY': return 'bg-rose-100 border-rose-400 text-rose-950';
      case 'INVESTMENT': return 'bg-amber-100 border-amber-400 text-amber-950';
      default: return 'bg-slate-200 border-slate-400 text-slate-950';
    }
  };

  const filteredEdges = selectedNode 
    ? edges.filter(e => e.from === selectedNode || e.to === selectedNode)
    : edges;

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-300 bg-white shadow-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <Network className="w-5 h-5 text-emerald-700" />
            <h3 className="font-black text-lg text-slate-900">Cash Flow Network Map</h3>
          </div>
          <p className="text-xs text-slate-700 font-bold mt-1">
            Visual connections between bank accounts, income sources, categories, and investments.
          </p>
        </div>

        {selectedNode && (
          <button 
            onClick={() => setSelectedNode(null)}
            className="text-xs text-emerald-900 font-black hover:text-emerald-950 bg-emerald-100 px-3.5 py-1.5 rounded-xl border border-emerald-400 shadow-sm"
          >
            Clear Filter ({selectedNode})
          </button>
        )}
      </div>

      {/* Nodes Map */}
      <div className="mb-6">
        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-3">
          Financial Nodes
        </h4>
        <div className="flex flex-wrap gap-2">
          {nodes.map((node) => (
            <button
              key={node.id}
              onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
              className={`px-3.5 py-1.5 rounded-xl border text-xs font-black flex items-center space-x-1.5 transition-all ${getNodeColor(node.type)} ${
                selectedNode === node.id ? 'ring-2 ring-emerald-600 scale-105 shadow-md' : 'opacity-95 hover:opacity-100'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-current"></span>
              <span>{node.label || node.id}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cash Flow Connections */}
      <div className="bg-slate-100 rounded-xl p-5 border border-slate-300">
        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-3 flex items-center justify-between">
          <span>Active Cash Pathways</span>
          <span className="text-slate-700 font-mono text-[11px] font-black">{filteredEdges.length} connections</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
          {filteredEdges.map((edge, idx) => (
            <div 
              key={idx}
              className="p-3 rounded-xl bg-white border border-slate-300 flex items-center justify-between text-xs shadow-sm"
            >
              <div className="flex items-center space-x-2 min-w-0">
                <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-900 font-black truncate max-w-[100px]">
                  {edge.from}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-600 flex-shrink-0" />
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-950 border border-emerald-300 font-black truncate max-w-[100px]">
                  {edge.to}
                </span>
              </div>
              <div className="text-right ml-2">
                <span className="font-black text-emerald-800">Rs. {edge.weight.toLocaleString()}</span>
                <p className="text-[11px] text-slate-700 font-bold truncate max-w-[120px]">{edge.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
// GraphVisualizer canvas render helper
