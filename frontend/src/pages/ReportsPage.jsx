import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  Calendar, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  Layers, 
  CheckCircle2, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  FileSpreadsheet,
  Building2,
  ListFilter
} from 'lucide-react';

export default function ReportsPage() {
  const [period, setPeriod] = useState('monthly');
  const [startDate, setStartDate] = useState('2026-07-01');
  const [endDate, setEndDate] = useState('2026-07-31');
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [graphAudit, setGraphAudit] = useState(null);

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
    
    const headers = ["Transaction ID", "Date", "Title", "Type", "Category", "Account", "Amount (LKR)", "Description"];
    const rows = reportData.transactions.map(t => [
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
    link.setAttribute("download", `WealthyMinds_${reportData.period}_Report_${reportData.startDate}_to_${reportData.endDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to JSON Function
  const handleExportJSON = () => {
    if (!reportData) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ ...reportData, graphAudit }, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", dataStr);
    link.setAttribute("download", `WealthyMinds_${reportData.period}_Report_${reportData.startDate}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print Report / Export PDF
  const handlePrint = () => {
    window.print();
  };

  const periodTabs = [
    { id: 'daily', label: 'Daily Activity' },
    { id: 'weekly', label: 'Weekly Summary' },
    { id: 'monthly', label: 'Monthly Statement' },
    { id: 'annual', label: 'Annual Report' },
    { id: 'custom', label: 'Custom Date Range' },
  ];

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
              Financial Reports & Statements
            </h1>
          </div>
          <p className="text-sm text-slate-600 font-medium mt-1">
            Generate, analyze, print, and export periodic financial performance statements powered by BST & Graph engines.
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
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/30 transition-all active:scale-95"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF Report</span>
          </button>
        </div>
      </div>

      {/* Filter Selector Bar (Hidden in Print mode) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-4 print:hidden">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2 text-slate-700 font-bold text-sm">
            <Filter className="w-4 h-4 text-emerald-600" />
            <span>Select Report Period</span>
          </div>
          <span className="text-xs font-semibold text-slate-600">
            Algorithmic BST Query: O(log n + k)
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {periodTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setPeriod(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                period === tab.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Custom Date Pickers */}
        <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-100">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-700">Start Date:</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-700">End Date:</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div className="text-xs text-slate-700 font-medium">
            Active Filter: <span className="font-bold text-slate-900">{startDate} to {endDate}</span>
          </div>
        </div>
      </div>

      {/* REPORT PRINTABLE DOCUMENT AREA */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-8 print:shadow-none print:border-none print:p-0">
        
        {/* Report Official Document Header */}
        <div className="border-b border-slate-200 pb-6 flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-lg shadow-sm">
                WM
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tight text-slate-900 uppercase">
                  {reportData ? reportData.reportTitle : 'Official Financial Statement'}
                </h2>
                <p className="text-xs font-semibold text-slate-700">
                  WealthyMinds Personal Financial Management System • Coursework PDSA
                </p>
              </div>
            </div>
          </div>

          <div className="text-right space-y-1">
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-900 text-[11px] font-black uppercase rounded-full border border-emerald-300">
              {reportData?.period || 'Monthly'} Report
            </span>
            <p className="text-xs text-slate-700 font-bold">
              Period: {reportData?.startDate} to {reportData?.endDate}
            </p>
            <p className="text-[11px] text-slate-600 font-semibold">
              Generated: {new Date().toLocaleDateString('en-GB')}
            </p>
          </div>
        </div>

        {/* KPI Summary Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <div className="flex items-center justify-between text-slate-700 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Total Income</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-black text-emerald-600">
              LKR {reportData?.totalIncome?.toLocaleString() || '0'}
            </p>
            <p className="text-[11px] text-slate-600 font-bold mt-1">Inflow Transactions</p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <div className="flex items-center justify-between text-slate-700 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Total Expenses</span>
              <ArrowDownRight className="w-4 h-4 text-rose-600" />
            </div>
            <p className="text-2xl font-black text-rose-600">
              LKR {reportData?.totalExpense?.toLocaleString() || '0'}
            </p>
            <p className="text-[11px] text-slate-600 font-bold mt-1">Max-Heap Prioritized</p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <div className="flex items-center justify-between text-slate-700 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Net Cash Flow</span>
              <DollarSign className="w-4 h-4 text-indigo-600" />
            </div>
            <p className={`text-2xl font-black ${(reportData?.netBalance || 0) >= 0 ? 'text-slate-900' : 'text-rose-600'}`}>
              LKR {reportData?.netBalance?.toLocaleString() || '0'}
            </p>
            <p className="text-[11px] text-slate-600 font-bold mt-1">Operating Balance</p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <div className="flex items-center justify-between text-slate-700 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Savings Velocity</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-black text-emerald-600">
              {reportData?.savingsRate || '0'}%
            </p>
            <p className="text-[11px] text-slate-600 font-bold mt-1">
              Top Spender: <span className="text-slate-900 font-black">{reportData?.topCategory || 'N/A'}</span>
            </p>
          </div>
        </div>

        {/* Two Column Layout: Category Breakdown & Graph Liquidity Audit */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Category Expenditure Breakdown */}
          <div className="bg-slate-50/70 rounded-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-2">
                <PieChart className="w-4 h-4 text-emerald-600" />
                <h3 className="font-black text-slate-900 text-sm">
                  Category Spend Breakdown (Max-Heap)
                </h3>
              </div>
              <span className="text-xs font-bold text-slate-700">Priority Sorted</span>
            </div>

            {reportData?.categoryBreakdown && reportData.categoryBreakdown.length > 0 ? (
              <div className="space-y-3">
                {reportData.categoryBreakdown.map((cat, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-800">
                      <span>{cat.category} ({cat.count} txns)</span>
                      <span>LKR {cat.amount.toLocaleString()} ({cat.percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, Math.max(5, parseFloat(cat.percentage)))}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-700 font-semibold py-4 text-center">
                No expenditure transactions found for selected date period.
              </p>
            )}
          </div>

          {/* Graph Network Flow & Account Liquidity Audit */}
          <div className="bg-slate-50/70 rounded-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-indigo-600" />
                <h3 className="font-black text-slate-900 text-sm">
                  Graph Account Liquidity & Edge Audit
                </h3>
              </div>
              <span className="text-xs font-bold text-slate-700">
                Nodes: {graphAudit?.totalNodes || 0} | Edges: {graphAudit?.totalEdges || 0}
              </span>
            </div>

            {graphAudit?.accountSummary && graphAudit.accountSummary.length > 0 ? (
              <div className="space-y-3">
                <table className="w-full text-xs text-left text-slate-700">
                  <thead className="bg-slate-200 text-slate-800 uppercase font-black">
                    <tr>
                      <th className="px-3 py-2 rounded-l-lg">Account Node</th>
                      <th className="px-3 py-2 text-right">Inflow</th>
                      <th className="px-3 py-2 text-right">Outflow</th>
                      <th className="px-3 py-2 text-right rounded-r-lg">Net Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-semibold">
                    {graphAudit.accountSummary.map((acc, idx) => (
                      <tr key={idx} className="hover:bg-slate-100">
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
            ) : (
              <p className="text-xs text-slate-700 font-semibold py-4 text-center">
                Loading graph audit data...
              </p>
            )}

            {/* Automated Graph Insights */}
            <div className="pt-2">
              <span className="text-[11px] font-black text-slate-700 uppercase tracking-wider block mb-1">
                Automated Network Insights:
              </span>
              <ul className="space-y-1 text-xs text-slate-700">
                {graphAudit?.graphInsights?.map((insight, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Comprehensive Transaction Ledger Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center space-x-2">
              <ListFilter className="w-4 h-4 text-emerald-600" />
              <h3 className="font-black text-slate-900 text-base">
                Period Transaction Ledger (BST Filtered: {reportData?.transactionCount || 0} Entries)
              </h3>
            </div>
            <span className="text-xs font-semibold text-slate-700">
              Sorted by BST In-Order Traversal
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-xs text-left text-slate-700">
              <thead className="bg-slate-100 text-slate-800 uppercase font-black">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Transaction Title</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Account</th>
                  <th className="px-4 py-3 text-right">Amount (LKR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium bg-white">
                {reportData?.transactions && reportData.transactions.length > 0 ? (
                  reportData.transactions.map((txn) => (
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
                    <td colSpan="6" className="text-center py-8 text-slate-700 font-semibold">
                      No transaction ledger entries recorded in selected date range.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Report Official Verification Footer */}
        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-700 font-semibold gap-2">
          <p>WealthyMinds Financial Management Engine • Version 1.0 Pro</p>
          <p className="font-bold">Verified by PDSA Binary Search Tree & Graph Audit Algorithm</p>
        </div>

      </div>

    </div>
  );
}
