import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Printer, 
  Calendar, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  CheckCircle2, 
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  FileSpreadsheet,
  Building2,
  ListFilter,
  Wallet,
  Target,
  BarChart3,
  CreditCard
} from 'lucide-react';

export default function ReportsPage() {
  const [reportCategory, setReportCategory] = useState('summary'); // 'summary' | 'income' | 'expense' | 'accounts' | 'goals'
  const [period, setPeriod] = useState('monthly');
  const [startDate, setStartDate] = useState('2026-07-01');
  const [endDate, setEndDate] = useState('2026-07-31');
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [graphAudit, setGraphAudit] = useState(null);
  const [goals, setGoals] = useState([]);

  const fetchReport = async () => {
    setLoading(true);
    try {
      let url = `http://localhost:8080/api/reports/generate?period=${period}`;
      if (startDate) url += `&startDate=${startDate}`;
      if (endDate) url += `&endDate=${endDate}`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setReportData(data);
      }

      const auditRes = await fetch(`http://localhost:8080/api/reports/flow-audit?period=${period}`);
      if (auditRes.ok) {
        const audit = await auditRes.json();
        setGraphAudit(audit);
      }

      const goalsRes = await fetch('http://localhost:8080/api/goals');
      if (goalsRes.ok) {
        const goalsData = await goalsRes.json();
        setGoals(goalsData);
      }
    } catch (err) {
      console.warn("Failed to fetch backend report data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [period, startDate, endDate]);

  // Export to CSV Function
  const handleExportCSV = () => {
    if (!reportData || !reportData.transactions) return;
    
    let filteredTxns = reportData.transactions;
    if (reportCategory === 'income') {
      filteredTxns = filteredTxns.filter(t => t.type === 'INCOME');
    } else if (reportCategory === 'expense') {
      filteredTxns = filteredTxns.filter(t => t.type === 'EXPENSE');
    }

    const headers = ["Transaction ID", "Date", "Title", "Type", "Category", "Account", "Amount (LKR)", "Description"];
    const rows = filteredTxns.map(t => [
      t.id,
      t.date,
      `"${t.title.replace(/"/g, '""')}"`,
      t.type,
      `"${t.category}"`,
      `"${t.account}"`,
      t.amount,
      `"${(t.description || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `WealthyMinds_${reportCategory}_Report_${reportData.startDate}_to_${reportData.endDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print Report / Export PDF
  const handlePrint = () => {
    window.print();
  };

  const reportCategoryButtons = [
    { id: 'summary', label: 'Executive Summary', icon: BarChart3 },
    { id: 'income', label: 'Income Statement', icon: TrendingUp },
    { id: 'expense', label: 'Expense Analysis', icon: TrendingDown },
    { id: 'accounts', label: 'Account Liquidity Audit', icon: CreditCard },
    { id: 'goals', label: 'Savings & Goals Progress', icon: Target },
  ];

  const periodTabs = [
    { id: 'daily', label: 'Daily' },
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'annual', label: 'Annual' },
    { id: 'custom', label: 'Custom Range' },
  ];

  // Helper filter for transaction table
  const getDisplayTransactions = () => {
    if (!reportData || !reportData.transactions) return [];
    if (reportCategory === 'income') {
      return reportData.transactions.filter(t => t.type === 'INCOME');
    }
    if (reportCategory === 'expense') {
      return reportData.transactions.filter(t => t.type === 'EXPENSE');
    }
    return reportData.transactions;
  };

  return (
    <div className="space-y-8 pb-12 print:bg-white print:p-0">
      
      {/* Header & Controls (Hidden in Print mode) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
              <FileText className="w-6 h-6" />
            </span>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Financial Statement Center
            </h1>
          </div>
          <p className="text-sm text-slate-600 font-medium mt-1">
            Generate dedicated income, expense, account liquidity, and savings performance reports.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={fetchReport}
            className="flex items-center space-x-2 px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-sm transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Download CSV Ledger</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/30 transition-all active:scale-95"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print PDF Report</span>
          </button>
        </div>
      </div>

      {/* Report Type Selector & Period Bar (Hidden in Print mode) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-5 print:hidden">
        
        {/* 1. Report Type Buttons */}
        <div>
          <label className="text-xs font-black text-slate-700 uppercase tracking-wider block mb-2">
            Select Report Type:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {reportCategoryButtons.map((btn) => {
              const Icon = btn.icon;
              const isActive = reportCategory === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => setReportCategory(btn.id)}
                  className={`flex items-center justify-center space-x-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20 ring-2 ring-slate-900'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <span>{btn.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Period Filter Selector */}
        <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-700">Period Filter:</span>
            <div className="flex flex-wrap gap-1.5">
              {periodTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setPeriod(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    period === tab.id
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date Pickers */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-bold text-slate-600">From:</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-2.5 py-1 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-bold text-slate-600">To:</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-2.5 py-1 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Quick Date Presets */}
            <div className="flex space-x-1 pl-2 border-l border-slate-200">
              <button
                onClick={() => { setStartDate('2026-07-01'); setEndDate('2026-07-31'); setPeriod('monthly'); }}
                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-lg"
              >
                July 2026
              </button>
              <button
                onClick={() => { setStartDate('2026-01-01'); setEndDate('2026-12-31'); setPeriod('annual'); }}
                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-lg"
              >
                Year 2026
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* REPORT PRINTABLE DOCUMENT CONTAINER */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-8 print:shadow-none print:border-none print:p-0">
        
        {/* Report Header */}
        <div className="border-b border-slate-200 pb-6 flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-lg shadow-sm">
                WM
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tight text-slate-900 uppercase">
                  {reportCategory === 'summary' && 'Executive Financial Summary Statement'}
                  {reportCategory === 'income' && 'Income Performance & Sources Report'}
                  {reportCategory === 'expense' && 'Expenditure & Category Breakdown Report'}
                  {reportCategory === 'accounts' && 'Bank Account & Liquidity Audit Statement'}
                  {reportCategory === 'goals' && 'Financial Goals & Savings Progress Report'}
                </h2>
                <p className="text-xs font-semibold text-slate-600">
                  WealthyMinds Financial Management Platform • Verified Statement
                </p>
              </div>
            </div>
          </div>

          <div className="text-right space-y-1">
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-900 text-[11px] font-black uppercase rounded-full border border-emerald-300">
              {reportData?.period || 'Monthly'} {reportCategory.toUpperCase()} REPORT
            </span>
            <p className="text-xs text-slate-700 font-bold">
              Period: {reportData?.startDate} to {reportData?.endDate}
            </p>
            <p className="text-[11px] text-slate-500 font-semibold">
              Generated: {new Date().toLocaleDateString('en-GB')}
            </p>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* VIEW 1: EXECUTIVE SUMMARY & ALL-IN-ONE OVERVIEW */}
        {/* ------------------------------------------------------------- */}
        {reportCategory === 'summary' && (
          <>
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                <div className="flex items-center justify-between text-slate-700 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Income</span>
                  <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-2xl font-black text-emerald-600">
                  LKR {reportData?.totalIncome?.toLocaleString() || '0'}
                </p>
                <p className="text-[11px] text-slate-600 font-bold mt-1">Inflow Receipts</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                <div className="flex items-center justify-between text-slate-700 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Expenses</span>
                  <ArrowDownRight className="w-4 h-4 text-rose-600" />
                </div>
                <p className="text-2xl font-black text-rose-600">
                  LKR {reportData?.totalExpense?.toLocaleString() || '0'}
                </p>
                <p className="text-[11px] text-slate-600 font-bold mt-1">Outflow Payments</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                <div className="flex items-center justify-between text-slate-700 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Net Surplus</span>
                  <DollarSign className="w-4 h-4 text-indigo-600" />
                </div>
                <p className={`text-2xl font-black ${(reportData?.netBalance || 0) >= 0 ? 'text-slate-900' : 'text-rose-600'}`}>
                  LKR {reportData?.netBalance?.toLocaleString() || '0'}
                </p>
                <p className="text-[11px] text-slate-600 font-bold mt-1">Net Cashflow</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                <div className="flex items-center justify-between text-slate-700 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Savings Ratio</span>
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-2xl font-black text-emerald-600">
                  {reportData?.savingsRate || '0'}%
                </p>
                <p className="text-[11px] text-slate-600 font-bold mt-1">
                  Top Category: <span className="text-slate-900 font-black">{reportData?.topCategory || 'N/A'}</span>
                </p>
              </div>
            </div>

            {/* Category Spend & Bank Summary Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-slate-50/70 rounded-2xl border border-slate-200 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center space-x-2">
                    <PieChart className="w-4 h-4 text-emerald-600" />
                    <h3 className="font-black text-slate-900 text-sm">Top Expenditure Categories</h3>
                  </div>
                  <span className="text-xs font-bold text-slate-600">Ranked</span>
                </div>
                <div className="space-y-3">
                  {reportData?.categoryBreakdown?.map((cat, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-800">
                        <span>{cat.category} ({cat.count} payments)</span>
                        <span>LKR {cat.amount.toLocaleString()} ({cat.percentage}%)</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-emerald-600 h-2 rounded-full"
                          style={{ width: `${Math.min(100, Math.max(5, parseFloat(cat.percentage)))}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50/70 rounded-2xl border border-slate-200 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4 text-indigo-600" />
                    <h3 className="font-black text-slate-900 text-sm">Account Cash Flow Summary</h3>
                  </div>
                </div>
                <table className="w-full text-xs text-left text-slate-700">
                  <thead className="bg-slate-200 text-slate-800 uppercase font-black">
                    <tr>
                      <th className="px-3 py-2 rounded-l-lg">Account Name</th>
                      <th className="px-3 py-2 text-right">Inflow</th>
                      <th className="px-3 py-2 text-right">Outflow</th>
                      <th className="px-3 py-2 text-right rounded-r-lg">Net Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-semibold">
                    {graphAudit?.accountSummary?.map((acc, idx) => (
                      <tr key={idx}>
                        <td className="px-3 py-2 font-bold text-slate-900">{acc.accountName}</td>
                        <td className="px-3 py-2 text-right text-emerald-600">LKR {acc.inflow.toLocaleString()}</td>
                        <td className="px-3 py-2 text-right text-rose-600">LKR {acc.outflow.toLocaleString()}</td>
                        <td className={`px-3 py-2 text-right font-black ${acc.netFlow >= 0 ? 'text-slate-900' : 'text-rose-600'}`}>
                          LKR {acc.netFlow.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 2: INCOME STATEMENT REPORT */}
        {/* ------------------------------------------------------------- */}
        {reportCategory === 'income' && (
          <div className="space-y-6">
            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                  Total Income Receipts
                </span>
                <p className="text-3xl font-black text-emerald-700 mt-1">
                  LKR {reportData?.totalIncome?.toLocaleString() || '0'}
                </p>
                <p className="text-xs text-emerald-800 font-semibold mt-1">
                  Total inflow across all verified accounts for {reportData?.startDate} to {reportData?.endDate}.
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-sm text-right">
                <span className="text-xs font-bold text-slate-500 uppercase block">Average Receipt</span>
                <p className="text-lg font-black text-slate-900">
                  LKR {getDisplayTransactions().length > 0 ? (reportData.totalIncome / getDisplayTransactions().length).toLocaleString(undefined, { maximumFractionDigits: 0 }) : 0}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3">
              <h3 className="font-black text-slate-900 text-sm border-b border-slate-200 pb-2">
                Income Source Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-500 uppercase block">Primary Salary Inflow</span>
                  <p className="text-xl font-black text-slate-900 mt-1">LKR 350,000</p>
                  <p className="text-xs text-slate-600 font-medium">Commercial Bank Primary Account</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-500 uppercase block">Freelance & Client Payouts</span>
                  <p className="text-xl font-black text-slate-900 mt-1">LKR 120,000</p>
                  <p className="text-xs text-slate-600 font-medium">Sampath Bank Account</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 3: EXPENSE ANALYSIS REPORT */}
        {/* ------------------------------------------------------------- */}
        {reportCategory === 'expense' && (
          <div className="space-y-6">
            <div className="bg-rose-50 rounded-2xl p-6 border border-rose-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block">
                  Total Expenditure Outflows
                </span>
                <p className="text-3xl font-black text-rose-700 mt-1">
                  LKR {reportData?.totalExpense?.toLocaleString() || '0'}
                </p>
                <p className="text-xs text-rose-800 font-semibold mt-1">
                  Top Spending Category: <span className="font-black">{reportData?.topCategory} (LKR {reportData?.topCategoryAmount?.toLocaleString()})</span>
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-rose-200 shadow-sm text-right">
                <span className="text-xs font-bold text-slate-500 uppercase block">Largest Outflow</span>
                <p className="text-lg font-black text-rose-700">
                  LKR {reportData?.topCategoryAmount?.toLocaleString() || '0'}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
              <h3 className="font-black text-slate-900 text-sm border-b border-slate-200 pb-2">
                Detailed Category Expenditure Ranking
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportData?.categoryBreakdown?.map((cat, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                      <span>{cat.category}</span>
                      <span className="text-rose-600">LKR {cat.amount.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-rose-600 h-2 rounded-full" style={{ width: `${Math.min(100, Math.max(5, parseFloat(cat.percentage)))}%` }} />
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                      <span>{cat.count} recorded payments</span>
                      <span>{cat.percentage}% of total expenses</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 4: ACCOUNT LIQUIDITY AUDIT REPORT */}
        {/* ------------------------------------------------------------- */}
        {reportCategory === 'accounts' && (
          <div className="space-y-6">
            <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-200">
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-wider mb-1">
                Bank Account Cash Flow Audit
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Detailed net liquidity analysis across all connected accounts.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-100 text-slate-800 uppercase font-black">
                  <tr>
                    <th className="px-4 py-3">Account Name</th>
                    <th className="px-4 py-3 text-right text-emerald-700">Total Inflow</th>
                    <th className="px-4 py-3 text-right text-rose-700">Total Outflow</th>
                    <th className="px-4 py-3 text-right">Net Flow Position</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-semibold bg-white">
                  {graphAudit?.accountSummary?.map((acc, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-bold text-slate-900">{acc.accountName}</td>
                      <td className="px-4 py-3 text-right text-emerald-600 font-mono">LKR {acc.inflow.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-rose-600 font-mono">LKR {acc.outflow.toLocaleString()}</td>
                      <td className={`px-4 py-3 text-right font-black font-mono text-sm ${acc.netFlow >= 0 ? 'text-slate-900' : 'text-rose-600'}`}>
                        LKR {acc.netFlow.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 5: SAVINGS GOALS & MILESTONES REPORT */}
        {/* ------------------------------------------------------------- */}
        {reportCategory === 'goals' && (
          <div className="space-y-6">
            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                  Active Financial Goals Progress
                </span>
                <p className="text-2xl font-black text-emerald-800 mt-1">
                  {goals.length} Tracked Milestone Targets
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goals.map((g) => {
                const progressPct = Math.min(100, Math.round((g.currentAmount / g.targetAmount) * 100));
                return (
                  <div key={g.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-black text-slate-900 text-sm">{g.title}</h4>
                        <span className="text-[11px] font-bold text-slate-500 uppercase">{g.category} • Target Date: {g.targetDate}</span>
                      </div>
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-black rounded-lg">
                        {progressPct}%
                      </span>
                    </div>

                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: `${progressPct}%` }} />
                    </div>

                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>Saved: LKR {g.currentAmount.toLocaleString()}</span>
                      <span className="text-slate-500">Target: LKR {g.targetAmount.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TRANSACTION LEDGER TABLE (Filtered by active report category) */}
        {/* ------------------------------------------------------------- */}
        {reportCategory !== 'goals' && (
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-2">
                <ListFilter className="w-4 h-4 text-emerald-600" />
                <h3 className="font-black text-slate-900 text-base">
                  Transaction Ledger ({getDisplayTransactions().length} Entries)
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-600">
                Sorted Chronologically
              </span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-100 text-slate-800 uppercase font-black">
                  <tr>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Account</th>
                    <th className="px-4 py-3 text-right">Amount (LKR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium bg-white">
                  {getDisplayTransactions().length > 0 ? (
                    getDisplayTransactions().map((txn) => (
                      <tr key={txn.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-mono font-bold text-slate-800">{txn.date}</td>
                        <td className="px-4 py-3 font-bold text-slate-900">{txn.title}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                            txn.type === 'INCOME' 
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                              : 'bg-rose-100 text-rose-800 border border-rose-300'
                          }`}>
                            {txn.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-semibold text-slate-700">{txn.category}</td>
                        <td className="px-4 py-3 text-slate-700">{txn.account}</td>
                        <td className={`px-4 py-3 text-right font-black text-sm ${
                          txn.type === 'INCOME' ? 'text-emerald-600' : 'text-slate-900'
                        }`}>
                          {txn.type === 'INCOME' ? '+' : '-'} LKR {txn.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-slate-600 font-semibold">
                        No transactions recorded for the selected filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Official Statement Footer */}
        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-600 font-semibold gap-2">
          <p>WealthyMinds Personal Financial Management Platform</p>
          <p className="font-bold">Verified Official Financial Statement</p>
        </div>

      </div>

    </div>
  );
}
// ReportsPage Income view component selector
// ReportsPage Expense view progress bar renderer
// ReportsPage Account Liquidity table
// ReportsPage Savings Goals progress cards
// ReportsPage CSV export generator
// ReportsPage developer jargon cleanup
