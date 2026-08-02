import React, { useState } from 'react';
import { X, PlusCircle } from 'lucide-react';

export default function AddTransactionModal({ isOpen, onClose, onAddTransaction }) {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'EXPENSE',
    category: 'Food',
    date: new Date().toISOString().substring(0, 10),
    account: 'Commercial Bank',
    description: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;

    onAddTransaction({
      ...formData,
      amount: parseFloat(formData.amount),
    });

    setFormData({
      title: '',
      amount: '',
      type: 'EXPENSE',
      category: 'Food',
      date: new Date().toISOString().substring(0, 10),
      account: 'Commercial Bank',
      description: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="glass-card rounded-2xl w-full max-w-lg p-6 border border-slate-300 bg-white shadow-2xl relative animate-in fade-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
          <div className="flex items-center space-x-2">
            <PlusCircle className="w-5 h-5 text-emerald-700" />
            <h3 className="font-black text-lg text-slate-900">Record Transaction</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors font-bold"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Type Toggle */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl border border-slate-300">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'EXPENSE' })}
              className={`py-2 rounded-lg font-black text-center transition-all ${
                formData.type === 'EXPENSE' ? 'bg-rose-700 text-white shadow-sm' : 'text-slate-800 hover:text-slate-950'
              }`}
            >
              Expense (-)
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'INCOME' })}
              className={`py-2 rounded-lg font-black text-center transition-all ${
                formData.type === 'INCOME' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-800 hover:text-slate-950'
              }`}
            >
              Income (+)
            </button>
          </div>

          {/* Title */}
          <div>
            <label className="block text-slate-900 font-extrabold mb-1">Transaction Title</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Grocery Supermarket Shopping"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-100 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-950 font-bold focus:outline-none focus:border-emerald-600 placeholder:text-slate-500"
            />
          </div>

          {/* Amount & Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-900 font-extrabold mb-1">Amount (LKR)</label>
              <input 
                type="number" 
                step="0.01"
                required
                placeholder="25000"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full bg-slate-100 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-950 font-black focus:outline-none focus:border-emerald-600 placeholder:text-slate-500"
              />
            </div>
            <div>
              <label className="block text-slate-900 font-extrabold mb-1">Date</label>
              <input 
                type="date" 
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-slate-100 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-950 font-bold focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          {/* Category & Account */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-900 font-extrabold mb-1">Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-100 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-950 font-bold focus:outline-none focus:border-emerald-600"
              >
                <option value="Food">Food & Dining</option>
                <option value="Housing">Housing & Rent</option>
                <option value="Education">Education & Tuition</option>
                <option value="Salary">Salary & Wages</option>
                <option value="Freelance">Freelance Income</option>
                <option value="Subscriptions">Subscriptions & SaaS</option>
                <option value="Transport">Fuel & Transport</option>
                <option value="Health">Health & Insurance</option>
                <option value="Investments">Investments</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-900 font-extrabold mb-1">Account</label>
              <select 
                value={formData.account}
                onChange={(e) => setFormData({ ...formData, account: e.target.value })}
                className="w-full bg-slate-100 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-950 font-bold focus:outline-none focus:border-emerald-600"
              >
                <option value="Commercial Bank">Commercial Bank</option>
                <option value="Sampath Bank">Sampath Bank</option>
                <option value="Credit Card">Visa Credit Card</option>
                <option value="Savings Account">High-Yield Savings</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-slate-900 font-extrabold mb-1">Notes / Description</label>
            <textarea 
              rows="2"
              placeholder="Optional notes..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-100 border border-slate-300 rounded-xl px-3 py-2 text-slate-950 font-bold focus:outline-none focus:border-emerald-600 placeholder:text-slate-500"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 text-slate-900 font-black hover:bg-slate-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black shadow-md shadow-emerald-600/30 transition-transform active:scale-95"
            >
              Save Transaction
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
