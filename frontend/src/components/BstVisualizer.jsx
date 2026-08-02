import React, { useState } from 'react';
import { Calendar, Search, RefreshCw, Layers } from 'lucide-react';

export default function BstVisualizer({ treeData, onRefresh }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedId, setHighlightedId] = useState(null);

  // Layout node tree on SVG canvas
  const renderTreeSvgNode = (node, x, y, level, dx) => {
    if (!node) return null;

    const isMatch = highlightedId && node.id === highlightedId;
    const isSearchHighlight = searchTerm && (
      node.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const leftX = x - dx;
    const leftY = y + 70;
    const rightX = x + dx;
    const rightY = y + 70;

    return (
      <g key={node.id}>
        {/* Left branch line */}
        {node.left && (
          <>
            <line 
              x1={x} y1={y} 
              x2={leftX} y2={leftY} 
              stroke="#cbd5e1" 
              strokeWidth="2" 
            />
            {renderTreeSvgNode(node.left, leftX, leftY, level + 1, dx * 0.55)}
          </>
        )}

        {/* Right branch line */}
        {node.right && (
          <>
            <line 
              x1={x} y1={y} 
              x2={rightX} y2={rightY} 
              stroke="#cbd5e1" 
              strokeWidth="2" 
            />
            {renderTreeSvgNode(node.right, rightX, rightY, level + 1, dx * 0.55)}
          </>
        )}

        {/* Node Circle */}
        <g 
          onClick={() => setHighlightedId(node.id)}
          className="cursor-pointer transition-transform duration-150 hover:scale-105"
        >
          <circle 
            cx={x} 
            cy={y} 
            r="24" 
            fill={isMatch || isSearchHighlight ? '#0284c7' : node.type === 'INCOME' ? '#10b981' : '#f43f5e'} 
            stroke={isMatch ? '#0369a1' : '#ffffff'} 
            strokeWidth={isMatch ? "3" : "2"}
            className="shadow-sm"
          />
          <text 
            x={x} 
            y={y - 3} 
            textAnchor="middle" 
            fill="#ffffff" 
            fontSize="10" 
            fontWeight="bold"
          >
            {node.date ? node.date.substring(5) : 'N/A'}
          </text>
          <text 
            x={x} 
            y={y + 10} 
            textAnchor="middle" 
            fill="#ffffff" 
            fontSize="8"
            fontWeight="bold"
          >
            Rs.{(node.amount / 1000).toFixed(0)}k
          </text>
        </g>
      </g>
    );
  };

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-lg text-slate-900">Interactive Transaction Map</h3>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Chronological mapping of financial records. Green = Income, Red = Expense.
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input 
              type="text"
              placeholder="Search date or title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs rounded-xl pl-9 pr-3 py-2 text-slate-800 focus:outline-none focus:border-emerald-500 w-full sm:w-48"
            />
          </div>

          <button 
            onClick={onRefresh}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors border border-slate-200"
            title="Refresh Map"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SVG Canvas Tree Container */}
      <div className="w-full bg-slate-50 rounded-xl p-4 border border-slate-200 overflow-x-auto min-h-[300px] flex items-center justify-center">
        {treeData ? (
          <svg width="700" height="300" viewBox="0 0 700 300" className="w-full max-w-2xl h-auto">
            {renderTreeSvgNode(treeData, 350, 40, 0, 140)}
          </svg>
        ) : (
          <div className="text-center py-12 text-slate-400 text-sm">
            <Layers className="w-8 h-8 mx-auto mb-2 opacity-40" />
            No transaction records available.
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 font-medium border-t border-slate-100 pt-3">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            <span>Income Record</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
            <span>Expense Record</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-sky-500 inline-block"></span>
            <span>Selected / Match</span>
          </span>
        </div>
      </div>
    </div>
  );
}
