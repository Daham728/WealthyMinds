import React from 'react';
import { GraduationCap, Users, Award, FileCode, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function CourseworkInfoPage({ courseworkData }) {
  const members = courseworkData?.members || [
    { name: "U.G.D.S.K. Karunathilake", id: "COHNDSE252F-026", role: "Data Structures Architect (BST & Heap)" },
    { name: "K.A.D.C. Ravindu", id: "COHNDSE252F-001", role: "Graph Network & Algorithm Engineer" },
    { name: "T.N.V. Perera", id: "COHNDSE243F-065", role: "Full-Stack UI & Integration Specialist" }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="glass-card p-8 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/60 via-slate-900 to-violet-950/60 shadow-2xl">
        <div className="flex items-center space-x-3 text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-2">
          <GraduationCap className="w-5 h-5" />
          <span>PDSA Assessment Announcement Sheet Compliance</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Wealthy Minds – Project & Viva Documentation
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl">
          Official coursework submission for Programming Data Structures and Algorithms – 1 (Batch HNDSE25.2F), National Institute of Business Management (NIBM Colombo-7).
        </p>
      </div>

      {/* Student Details & Roles Grid */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
          <Users className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-lg text-white">Project Members & Group Responsibilities</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {members.map((member, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-xs border border-indigo-500/30">
                0{idx + 1}
              </div>
              <h4 className="font-bold text-sm text-white">{member.name}</h4>
              <p className="text-xs font-mono text-indigo-300">{member.id}</p>
              <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Data Structures & Complexity Matrix */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
          <Award className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-lg text-white">Core Data Structures Implementation & Justification</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Data Structure</th>
                <th className="py-3 px-4">Time Complexity</th>
                <th className="py-3 px-4">Real-World Application & Justification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr>
                <td className="py-3.5 px-4 font-bold text-indigo-300">Binary Search Tree (BST)</td>
                <td className="py-3.5 px-4 font-mono text-emerald-400">Insert: O(log n)<br/>Search: O(log n)</td>
                <td className="py-3.5 px-4 text-slate-300">
                  Stores financial transactions chronologically ordered by Date & ID. Enables fast insertion, range queries, and sorted in-order financial statement generation.
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-violet-300">Max-Heap / Priority Queue</td>
                <td className="py-3.5 px-4 font-mono text-emerald-400">Peek Max: O(1)<br/>Heapify: O(log n)</td>
                <td className="py-3.5 px-4 text-slate-300">
                  Identifies peak expense outflows, largest income streams, and urgent priority financial alerts instantaneously without scanning the entire dataset.
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-emerald-300">Adjacency List Graph</td>
                <td className="py-3.5 px-4 font-mono text-emerald-400">Traversal: O(V + E)</td>
                <td className="py-3.5 px-4 text-slate-300">
                  Maps directional relationships between bank accounts, income sources, loans, investments, and subscriptions. Supports BFS/DFS cash flow path analysis.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Novel Features Summary */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-lg text-white">3 Novel Features (Coursework Requirement)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <span className="font-bold text-white text-sm">1. Live Data Structure Visualizers</span>
            <p className="text-slate-300">
              Real-time interactive SVG & canvas visualizers that graphically render the exact BST nodes, Max-Heap arrays, and Adjacency Graph topology for viva demonstration.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <span className="font-bold text-white text-sm">2. Financial Health Score Dial</span>
            <p className="text-slate-300">
              Proactive diagnostic health engine evaluating liquidity, debt burden, and savings ratio to output an automated score (0-100) with prioritized warning alerts.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <span className="font-bold text-white text-sm">3. Cash Flow Graph Topology</span>
            <p className="text-slate-300">
              Interactive node-network mapping money movements between bank accounts, recurring SaaS subscriptions, loans, and investment portfolios using BFS/DFS graph traversals.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
