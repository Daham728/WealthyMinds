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

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [backendConnected, setBackendConnected] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSalaryModalOpen, setIsSalaryModalOpen] = useState(false);

  // State loaded from backend REST API
  const [transactions, setTransactions] = useState([]);
  const [treeData, setTreeData] = useState(null);
  const [topExpenses, setTopExpenses] = useState([]);
  const [heapStructure, setHeapStructure] = useState([]);
  const [healthScore, setHealthScore] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [goals, setGoals] = useState([]);

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
      console.error("Backend fetch error:", error);
      setBackendConnected(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Post transaction to Java Backend
  const handleAddTransaction = async (newTx) => {
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
      console.error("Failed to add transaction:", e);
    }
  };

  // Post new Goal
  const handleAddGoal = async (newGoal) => {
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
      console.error("Failed to add goal:", e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900 font-sans">
      
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        backendConnected={backendConnected}
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
