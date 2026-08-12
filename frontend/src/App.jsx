import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AddTransactionModal from './components/AddTransactionModal';
import SalaryPromotionModal from './components/SalaryPromotionModal';

import Dashboard from './pages/Dashboard';
import TransactionsPage from './pages/TransactionsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import GraphPage from './pages/GraphPage';
import GoalsPage from './pages/GoalsPage';
import ReportsPage from './pages/ReportsPage';

const INITIAL_TRANSACTIONS = [
  { id: 'TXN-101', title: 'Monthly Software Engineering Salary', amount: 350000, type: 'INCOME', category: 'Salary', date: '2026-07-01', account: 'Commercial Bank', description: 'Monthly primary income' },
  { id: 'TXN-102', title: 'Apartment Rent & Utilities', amount: 85000, type: 'EXPENSE', category: 'Housing', date: '2026-07-02', account: 'Commercial Bank', description: 'Colombo-7 Apartment rent' },
  { id: 'TXN-103', title: 'Grocery & Supermarket Shopping', amount: 42500, type: 'EXPENSE', category: 'Food', date: '2026-07-05', account: 'Commercial Bank', description: 'Keells Super groceries' },
  { id: 'TXN-104', title: 'Freelance Software Development', amount: 120000, type: 'INCOME', category: 'Freelance', date: '2026-07-10', account: 'Sampath Bank', description: 'Web app client project payout' },
  { id: 'TXN-105', title: 'University Tuition & Module Fees', amount: 150000, type: 'EXPENSE', category: 'Education', date: '2026-07-12', account: 'Commercial Bank', description: 'NIBM HNDSE Coursework module payment' },
  { id: 'TXN-106', title: 'AWS & Cloud Infrastructure Hosting', amount: 18500, type: 'EXPENSE', category: 'Subscriptions', date: '2026-07-15', account: 'Credit Card', description: 'Cloud servers & database hosting' },
  { id: 'TXN-107', title: 'Emergency Medical Insurance', amount: 14000, type: 'EXPENSE', category: 'Health', date: '2026-07-18', account: 'Commercial Bank', description: 'Monthly health coverage premium' },
  { id: 'TXN-108', title: 'Dining & Restaurants', amount: 24500, type: 'EXPENSE', category: 'Food', date: '2026-07-20', account: 'Credit Card', description: 'Social gatherings & team dinners' },
  { id: 'TXN-109', title: 'Mutual Fund & Index Investment', amount: 50000, type: 'EXPENSE', category: 'Investments', date: '2026-07-25', account: 'Savings Account', description: 'Monthly systematic investment plan' },
  { id: 'TXN-110', title: 'Fuel & Vehicle Maintenance', amount: 22000, type: 'EXPENSE', category: 'Transport', date: '2026-07-28', account: 'Commercial Bank', description: 'Vehicle fuel & routine servicing' }
];

const INITIAL_TOP_EXPENSES = [
  { title: 'University Tuition & Module Fees', amount: 150000, category: 'Education' },
  { title: 'Apartment Rent & Utilities', amount: 85000, category: 'Housing' },
  { title: 'Mutual Fund & Index Investment', amount: 50000, category: 'Investments' },
  { title: 'Grocery & Supermarket Shopping', amount: 42500, category: 'Food' }
];

const INITIAL_GOALS = [
  { id: 1, title: 'Emergency Reserve Fund', targetAmount: 500000, currentAmount: 375000, progress: 75, category: 'Emergency' },
  { id: 2, title: 'Higher Education & Certifications', targetAmount: 300000, currentAmount: 240000, progress: 80, category: 'Education' },
  { id: 3, title: 'Investment Portfolio Growth', targetAmount: 1000000, currentAmount: 450000, progress: 45, category: 'Investment' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [backendConnected, setBackendConnected] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSalaryModalOpen, setIsSalaryModalOpen] = useState(false);

  // State loaded from backend REST API with fallback initial data
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [treeData, setTreeData] = useState(null);
  const [topExpenses, setTopExpenses] = useState(INITIAL_TOP_EXPENSES);
  const [heapStructure, setHeapStructure] = useState([]);
  const [healthScore, setHealthScore] = useState({ score: 75, status: 'STABLE', totalIncome: 470000, totalExpense: 406500 });
  const [predictions, setPredictions] = useState({ forecastNextMonthExpense: 368000, projectedSavingsRate: 21.7 });
  const [graphData, setGraphData] = useState(null);
  const [goals, setGoals] = useState(INITIAL_GOALS);

  // Fetch all backend data from Java server
  const fetchAllData = async () => {
    try {
      const [
        resTrans,
        resTree,
        resTop,
        resHeap,
        resHealth,
        resPred,
        resGraph,
        resGoals
      ] = await Promise.all([
        fetch('http://localhost:8080/api/transactions'),
        fetch('http://localhost:8080/api/transactions/tree'),
        fetch('http://localhost:8080/api/analytics/top-expenses'),
        fetch('http://localhost:8080/api/analytics/heap-structure'),
        fetch('http://localhost:8080/api/analytics/health-score'),
        fetch('http://localhost:8080/api/analytics/predictions'),
        fetch('http://localhost:8080/api/graph/flow'),
        fetch('http://localhost:8080/api/goals')
      ]);

      if (resTrans.ok) setTransactions(await resTrans.json());
      if (resTree.ok) setTreeData(await resTree.json());
      if (resTop.ok) setTopExpenses(await resTop.json());
      if (resHeap.ok) setHeapStructure(await resHeap.json());
      if (resHealth.ok) setHealthScore(await resHealth.json());
      if (resPred.ok) setPredictions(await resPred.json());
      if (resGraph.ok) setGraphData(await resGraph.json());
      if (resGoals.ok) setGoals(await resGoals.json());

      setBackendConnected(true);
    } catch (error) {
      console.log("Backend not connected locally. Using client-side dataset state for Netlify preview.");
      setBackendConnected(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Post transaction to Java Backend / Client State
  const handleAddTransaction = async (newTx) => {
    const createdTx = { ...newTx, id: `TXN-${Date.now().toString().slice(-4)}` };
    setTransactions(prev => [createdTx, ...prev]);

    if (newTx.type === 'EXPENSE') {
      setTopExpenses(prev => [{ title: newTx.title, amount: newTx.amount, category: newTx.category }, ...prev]);
    }

    try {
      const res = await fetch('http://localhost:8080/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTx)
      });
      if (res.ok) {
        await fetchAllData();
      }
    } catch (e) {
      // Local state already updated for offline/Netlify preview
    }
  };

  // Post new Goal
  const handleAddGoal = async (newGoal) => {
    const createdGoal = { ...newGoal, id: Date.now(), progress: Math.round((newGoal.currentAmount / newGoal.targetAmount) * 100) };
    setGoals(prev => [createdGoal, ...prev]);

    try {
      const res = await fetch('http://localhost:8080/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGoal)
      });
      if (res.ok) {
        await fetchAllData();
      }
    } catch (e) {
      // Local state updated
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900 font-sans">
      
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        backendConnected={backendConnected}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenSalaryModal={() => setIsSalaryModalOpen(true)}
      />

      {/* Main Content View */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {activeTab === 'dashboard' && (
          <Dashboard 
            transactions={transactions}
            healthScore={healthScore}
            topExpenses={topExpenses}
            goals={goals}
            setActiveTab={setActiveTab}
            onOpenAddModal={() => setIsAddModalOpen(true)}
            onOpenSalaryModal={() => setIsSalaryModalOpen(true)}
          />
        )}

        {activeTab === 'transactions' && (
          <TransactionsPage 
            transactions={transactions}
            treeData={treeData}
            onOpenAddModal={() => setIsAddModalOpen(true)}
            onOpenSalaryModal={() => setIsSalaryModalOpen(true)}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsPage 
            healthScore={healthScore}
            topExpenses={topExpenses}
            heapStructure={heapStructure}
            predictions={predictions}
          />
        )}

        {activeTab === 'graph' && (
          <GraphPage 
            graphData={graphData}
          />
        )}

        {activeTab === 'goals' && (
          <GoalsPage 
            goals={goals}
            onAddGoal={handleAddGoal}
          />
        )}

        {activeTab === 'reports' && (
          <ReportsPage />
        )}
      </main>

      {/* Add Transaction Modal */}
      <AddTransactionModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTransaction={handleAddTransaction}
      />

      {/* Job Promotion & Base Salary Update Modal */}
      <SalaryPromotionModal
        isOpen={isSalaryModalOpen}
        onClose={() => setIsSalaryModalOpen(false)}
        onAddTransaction={handleAddTransaction}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}
