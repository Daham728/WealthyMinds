import React, { useState } from 'react';
import { PlusCircle, Trash2, Search, Calendar, ArrowLeftRight, TrendingUp, TrendingDown, Wallet, Eye } from 'lucide-react';
import BstVisualizer from '../components/BstVisualizer';

export default function TransactionsPage({ 
  transactions, 
  treeData, 
  onAddTransaction, 
  onDeleteTransaction, 
  onOpenAddModal,
  onOpenSalaryModal,
  onRefresh 
}) {
  const [filterType, setFilterType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showVisualMap, setShowVisualMap] = useState(false);

  const filteredTransactions = transactions.filter((t) => {
    if (filterType !== 'ALL' && t.type !== filterType) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = t.title.toLowerCase().includes(q);
      const matchCategory = t.category.toLowerCase().includes(q);
      const matchAccount = t.account.toLowerCase().includes(q);
      if (!matchTitle && !matchCategory && !matchAccount) return false;
    }
    if (startDate && t.date < startDate) return false;
    if (endDate && t.date > endDate) return false;
    return true;
  });

  const totalInflow = filteredTransactions
    .filter(t => t.type === 'INCOME')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalOutflow = filteredTransactions
    .filter(t => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalInflow - totalOutflow;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 flex items-center justify-center font-black">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950">Transaction Ledger</h1>
              <p className="text-xs sm:text-sm text-slate-800 font-extrabold mt-0.5">
                Complete record of your income and expense transactions.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowVisualMap(!showVisualMap)}
            className={`flex items-center space-x-1.5 text-xs font-black px-3.5 py-2.5 rounded-xl border transition-all ${
              showVisualMap 
                ? 'bg-emerald-100 border-emerald-300 text-emerald-950' 
                : 'bg-slate-100 border-slate-300 text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>{showVisualMap ? 'Hide Visual Map' : 'Show Visual Map'}</span>
          </button>

          <button
            onClick={onOpenSalaryModal}
            className="flex items-center space-x-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 text-xs font-black px-3.5 py-2.5 rounded-xl border border-emerald-300 transition-all shadow-sm"
          >
            <span>🏆 Raise Salary</span>
          </button>

          <button
            onClick={onOpenAddModal}
            className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-md shadow-emerald-600/30 transition-transform active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Record Transaction</span>
          </button>
        </div>
      </div>

      {/* Optional Visual Map Collapsible Component */}
      {showVisualMap && (
        <div className="animate-in slide-in-from-top duration-300">
          <BstVisualizer treeData={treeData} onRefresh={onRefresh} />
        </div>
      )}

      {/* Summary Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="glass-card p-5 rounded-2xl border border-slate-300 bg-white flex items-center justify-between">
          <div>
            <span className="text-xs font-black text-slate-800 uppercase tracking-wider">Total Income</span>
            <p className="text-xl font-black text-emerald-800 mt-1">Rs. {totalInflow.toLocaleString()}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center border border-emerald-300 font-black">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-300 bg-white flex items-center justify-between">
          <div>
            <span className="text-xs font-black text-slate-800 uppercase tracking-wider">Total Expenses</span>
            <p className="text-xl font-black text-rose-800 mt-1">Rs. {totalOutflow.toLocaleString()}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-900 flex items-center justify-center border border-rose-300 font-black">
            <TrendingDown className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-300 bg-white flex items-center justify-between">
          <div>
            <span className="text-xs font-black text-slate-800 uppercase tracking-wider">Net Ledger Balance</span>
            <p className="text-xl font-black text-amber-900 mt-1">Rs. {netBalance.toLocaleString()}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center border border-amber-300 font-black">
            <Wallet className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Filters & Transaction Ledger */}
      <div className="glass-card rounded-2xl p-6 border border-slate-300 bg-white space-y-6">
        
        {/* Filter Controls Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-600 absolute left-3.5 top-3" />
            <input 
              type="text"
              placeholder="Search title, category, or account..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-950 font-extrabold focus:outline-none focus:border-emerald-600 placeholder:text-slate-500"
            />
          </div>

          {/* Type Filter Pills */}
          <div className="flex items-center space-x-1 p-1 bg-slate-100 rounded-xl border border-slate-300 text-xs">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3.5 py-1.5 rounded-lg font-black transition-colors ${
                filterType === 'ALL' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-800 hover:text-slate-950'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('INCOME')}
              className={`px-3.5 py-1.5 rounded-lg font-black transition-colors ${
                filterType === 'INCOME' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-800 hover:text-slate-950'
              }`}
            >
              Income
            </button>
            <button
              onClick={() => setFilterType('EXPENSE')}
              className={`px-3.5 py-1.5 rounded-lg font-black transition-colors ${
                filterType === 'EXPENSE' ? 'bg-rose-700 text-white shadow-sm' : 'text-slate-800 hover:text-slate-950'
              }`}
            >
              Expenses
            </button>
          </div>

          {/* Date Range Selector */}
          <div className="flex items-center space-x-2 text-xs">
            <Calendar className="w-4 h-4 text-slate-700 hidden sm:block" />
            <input 
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-slate-100 border border-slate-300 rounded-xl px-2.5 py-2 text-slate-950 font-black focus:outline-none focus:border-emerald-600 text-xs"
            />
            <span className="text-slate-800 font-extrabold">to</span>
            <input 
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-slate-100 border border-slate-300 rounded-xl px-2.5 py-2 text-slate-950 font-black focus:outline-none focus:border-emerald-600 text-xs"
            />
          </div>

        </div>

        {/* Transactions Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-950 uppercase font-black border-b-2 border-slate-300">
              <tr>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Ref ID</th>
                <th className="py-3.5 px-4">Transaction Details</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Account</th>
                <th className="py-3.5 px-4 text-right">Amount (LKR)</th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-100 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-black text-slate-950">{t.date}</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-900 font-black">{t.id}</td>
                  <td className="py-3.5 px-4 font-black text-slate-950">
                    {t.title}
                    {t.description && <p className="text-[11px] text-slate-800 font-bold">{t.description}</p>}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="bg-slate-100 text-slate-950 border border-slate-300 px-2.5 py-1 rounded-full text-[10px] font-black">
                      {t.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-950 font-black">{t.account}</td>
                  <td className={`py-3.5 px-4 text-right font-black ${
                    t.type === 'INCOME' ? 'text-emerald-800' : 'text-rose-800'
                  }`}>
                    {t.type === 'INCOME' ? '+' : '-'} Rs. {t.amount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => onDeleteTransaction(t.id)}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-rose-700 hover:bg-rose-100 transition-colors font-bold"
                      title="Remove Transaction"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-10 text-center text-slate-800 font-extrabold">
                    No transactions match your search query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
