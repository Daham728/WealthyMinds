import React, { useState } from 'react';
import { Award, X, CheckCircle2, TrendingUp, Building2, Calendar } from 'lucide-react';

export default function SalaryPromotionModal({ isOpen, onClose, onAddTransaction }) {
  const [salaryAmount, setSalaryAmount] = useState('450000');
  const [jobTitle, setJobTitle] = useState('Senior Lead Software Engineer');
  const [effectiveDate, setEffectiveDate] = useState('2026-08-01');
  const [account, setAccount] = useState('Commercial Bank');
  const [description, setDescription] = useState('Annual promotion & salary raise payout');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!salaryAmount || Number(salaryAmount) <= 0) return;

    onAddTransaction({
      title: `Monthly Salary Raise (${jobTitle})`,
      amount: Number(salaryAmount),
      type: 'INCOME',
      category: 'Salary',
      date: effectiveDate || '2026-08-01',
      account: account,
      description: description || 'Promoted salary increase'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-300 shadow-2xl max-w-md w-full p-6 space-y-5 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center shadow-sm">
            <Award className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <h3 className="font-black text-lg text-slate-900">Job Promotion / Salary Raise</h3>
            <p className="text-xs text-slate-600 font-semibold">Update your base recurring monthly income</p>
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold">
          
          <div>
            <label className="text-slate-700 uppercase tracking-wider text-[11px] block mb-1">
              New Promoted Salary (LKR) *
            </label>
            <input
              type="number"
              required
              value={salaryAmount}
              onChange={(e) => setSalaryAmount(e.target.value)}
              placeholder="e.g. 450000"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-black text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="text-slate-700 uppercase tracking-wider text-[11px] block mb-1">
              Promotion Designation / Job Title *
            </label>
            <input
              type="text"
              required
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Senior Lead Software Engineer"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-700 uppercase tracking-wider text-[11px] block mb-1">
                Effective Date
              </label>
              <input
                type="date"
                value={effectiveDate}
                onChange={(e) => setEffectiveDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="text-slate-700 uppercase tracking-wider text-[11px] block mb-1">
                Deposit Bank Account
              </label>
              <select
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Commercial Bank">Commercial Bank</option>
                <option value="Sampath Bank">Sampath Bank</option>
                <option value="Savings Account">Savings Account</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-slate-700 uppercase tracking-wider text-[11px] block mb-1">
              Note / Details
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Reason for raise..."
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-medium outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black shadow-md shadow-emerald-600/30 transition-transform active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Apply Salary Raise</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
