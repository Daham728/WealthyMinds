import React, { useState } from 'react';
import { Target, PlusCircle, Sparkles, Calendar } from 'lucide-react';

export default function GoalsPage({ goals, onAddGoal }) {
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    targetAmount: '',
    currentAmount: '',
    targetDate: new Date().toISOString().substring(0, 10),
    category: 'Savings',
    priorityScore: 8
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newGoal.title || !newGoal.targetAmount) return;

    onAddGoal({
      ...newGoal,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: parseFloat(newGoal.currentAmount || 0),
      priorityScore: parseInt(newGoal.priorityScore)
    });

    setNewGoal({
      title: '',
      targetAmount: '',
      currentAmount: '',
      targetDate: new Date().toISOString().substring(0, 10),
      category: 'Savings',
      priorityScore: 8
    });
    setShowAddGoalModal(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Target className="w-6 h-6 text-emerald-700" />
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Financial Goals & Planning</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-bold mt-1">
            Track your savings targets, investment milestones, and financial growth recommendations.
          </p>
        </div>

        <button
          onClick={() => setShowAddGoalModal(true)}
          className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-md shadow-emerald-600/30 transition-transform active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Goal</span>
        </button>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((g) => (
          <div key={g.id} className="glass-card rounded-2xl p-6 border border-slate-300 bg-white shadow-md space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-black text-emerald-950 uppercase tracking-wider bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300">
                  {g.category}
                </span>
                <h3 className="text-base font-black text-slate-900 mt-2">{g.title}</h3>
              </div>
              <span className="text-xs font-black text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                {g.progress}% Complete
              </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
                <div 
                  className="h-full bg-emerald-600 rounded-full transition-all duration-500" 
                  style={{ width: `${g.progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-900 font-black pt-1 font-mono">
                <span>Saved: Rs. {g.currentAmount.toLocaleString()}</span>
                <span>Target: Rs. {g.targetAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-800 border-t border-slate-200 pt-3 font-bold">
              <span className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-slate-600" />
                <span>Target Date: {g.targetDate}</span>
              </span>
              <span className="text-slate-950 font-black">
                Remaining: Rs. {Math.max(0, g.targetAmount - g.currentAmount).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Financial Recommendations */}
      <div className="glass-card rounded-2xl p-6 border border-slate-300 bg-white shadow-md space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
          <Sparkles className="w-5 h-5 text-emerald-700" />
          <h3 className="font-black text-lg text-slate-900">Smart Financial Recommendations</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-300 space-y-2">
            <span className="text-xs font-black text-emerald-900 uppercase">Emergency Reserve Strategy</span>
            <p className="text-xs text-slate-900 font-bold">
              Allocating an additional LKR 15,000/month from surplus income will achieve your 500k goal 2 months ahead of schedule.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-100 border border-slate-300 space-y-2">
            <span className="text-xs font-black text-sky-900 uppercase">Debt Payoff Priority</span>
            <p className="text-xs text-slate-900 font-bold">
              Pay off high-interest credit card debt before reallocating surplus into low-yield savings.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-100 border border-slate-300 space-y-2">
            <span className="text-xs font-black text-amber-900 uppercase">Subscription Optimization</span>
            <p className="text-xs text-slate-900 font-bold">
              Auditing recurring subscriptions reduces monthly fixed overhead by an estimated 8%.
            </p>
          </div>
        </div>
      </div>

      {/* Modal for adding new goal */}
      {showAddGoalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="glass-card rounded-2xl w-full max-w-md p-6 border border-slate-300 bg-white shadow-2xl space-y-4">
            <h3 className="font-black text-lg text-slate-900">Create Savings Goal</h3>
            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-900 font-extrabold mb-1">Goal Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Master's Degree Fund"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  className="w-full bg-slate-100 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold placeholder:text-slate-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-900 font-extrabold mb-1">Target Amount (LKR)</label>
                  <input 
                    type="number" 
                    required
                    placeholder="300000"
                    value={newGoal.targetAmount}
                    onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                    className="w-full bg-slate-100 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-black"
                  />
                </div>
                <div>
                  <label className="block text-slate-900 font-extrabold mb-1">Current Saved (LKR)</label>
                  <input 
                    type="number" 
                    placeholder="50000"
                    value={newGoal.currentAmount}
                    onChange={(e) => setNewGoal({ ...newGoal, currentAmount: e.target.value })}
                    className="w-full bg-slate-100 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-900 font-extrabold mb-1">Target Date</label>
                  <input 
                    type="date" 
                    required
                    value={newGoal.targetDate}
                    onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                    className="w-full bg-slate-100 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-900 font-extrabold mb-1">Category</label>
                  <input 
                    type="text" 
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                    className="w-full bg-slate-100 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddGoalModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 text-slate-900 font-black hover:bg-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black shadow-md shadow-emerald-600/30"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
