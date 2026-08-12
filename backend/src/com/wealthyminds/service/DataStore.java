package com.wealthyminds.service;

import com.wealthyminds.datastructures.BinarySearchTree;
import com.wealthyminds.datastructures.MaxHeap;
import com.wealthyminds.datastructures.FinancialGraph;
import com.wealthyminds.model.Transaction;
import com.wealthyminds.model.Goal;

import java.util.*;

public class DataStore {
    private static DataStore instance;
    private BinarySearchTree transactionBst;
    private MaxHeap expenseHeap;
    private MaxHeap incomeHeap;
    private FinancialGraph financialGraph;
    private List<Goal> goals;

    private DataStore() {
        this.transactionBst = new BinarySearchTree();
        this.expenseHeap = new MaxHeap();
        this.incomeHeap = new MaxHeap();
        this.financialGraph = new FinancialGraph();
        this.goals = new ArrayList<Goal>();

        seedInitialData();
    }

    public static synchronized DataStore getInstance() {
        if (instance == null) {
            instance = new DataStore();
        }
        return instance;
    }

    private void seedInitialData() {
        // Seed Realistic Financial Transactions
        List<Transaction> initialTransactions = Arrays.asList(
            new Transaction("TXN-101", "Monthly Software Engineering Salary", 350000.0, "INCOME", "Salary", "2026-07-01", "Commercial Bank", "Monthly primary income"),
            new Transaction("TXN-102", "Apartment Rent & Utilities", 85000.0, "EXPENSE", "Housing", "2026-07-02", "Commercial Bank", "Colombo-7 Apartment rent"),
            new Transaction("TXN-103", "Grocery & Supermarket Shopping", 42500.0, "EXPENSE", "Food", "2026-07-05", "Commercial Bank", "Keells Super groceries"),
            new Transaction("TXN-104", "Freelance Software Development", 120000.0, "INCOME", "Freelance", "2026-07-10", "Sampath Bank", "Web app client project payout"),
            new Transaction("TXN-105", "University Tuition & Module Fees", 150000.0, "EXPENSE", "Education", "2026-07-12", "Commercial Bank", "NIBM HNDSE Coursework module payment"),
            new Transaction("TXN-106", "AWS & Cloud Infrastructure Hosting", 18500.0, "EXPENSE", "Subscriptions", "2026-07-15", "Credit Card", "Cloud servers & database hosting"),
            new Transaction("TXN-107", "Emergency Medical Insurance", 14000.0, "EXPENSE", "Health", "2026-07-18", "Commercial Bank", "Monthly health coverage premium"),
            new Transaction("TXN-108", "Dining & Restaurants", 24500.0, "EXPENSE", "Food", "2026-07-20", "Credit Card", "Social gatherings & team dinners"),
            new Transaction("TXN-109", "Mutual Fund & Index Investment", 50000.0, "EXPENSE", "Investments", "2026-07-25", "Savings Account", "Monthly systematic investment plan"),
            new Transaction("TXN-110", "Fuel & Vehicle Maintenance", 22000.0, "EXPENSE", "Transport", "2026-07-28", "Commercial Bank", "Vehicle fuel & routine servicing")
        );

        for (Transaction t : initialTransactions) {
            addTransaction(t);
        }

        // Seed Goals
        goals.add(new Goal("G-01", "Emergency Reserve Fund", 500000.0, 320000.0, "2026-12-31", "Savings", 10));
        goals.add(new Goal("G-02", "M3 MacBook Pro Upgrade", 650000.0, 410000.0, "2026-10-15", "Technology", 8));
        goals.add(new Goal("G-03", "Investment Portfolio Expansion", 1000000.0, 450000.0, "2027-04-01", "Investment", 9));
        goals.add(new Goal("G-04", "International Tech Conference Trip", 350000.0, 120000.0, "2026-11-30", "Travel", 6));

        // Rebuild Financial Graph
        rebuildGraph();
    }

    public synchronized void addTransaction(Transaction t) {
        transactionBst.insert(t);

        if ("EXPENSE".equalsIgnoreCase(t.getType())) {
            expenseHeap.insert(t, t.getAmount());
        } else if ("INCOME".equalsIgnoreCase(t.getType())) {
            incomeHeap.insert(t, t.getAmount());
        }

        // Add to graph dynamically
        if (financialGraph != null) {
            financialGraph.addNode(t.getAccount(), t.getAccount(), "ACCOUNT");
            financialGraph.addNode(t.getCategory(), t.getCategory(), "CATEGORY");
            if ("EXPENSE".equalsIgnoreCase(t.getType())) {
                financialGraph.addEdge(t.getAccount(), t.getCategory(), t.getAmount(), t.getTitle());
            } else {
                financialGraph.addEdge(t.getCategory(), t.getAccount(), t.getAmount(), t.getTitle());
            }
        }
    }

    public synchronized boolean deleteTransaction(String id) {
        boolean removed = transactionBst.delete(id);
        if (removed) {
            // Re-heapify and rebuild graph
            rebuildHeaps();
            rebuildGraph();
        }
        return removed;
    }

    private void rebuildHeaps() {
        this.expenseHeap = new MaxHeap();
        this.incomeHeap = new MaxHeap();
        for (Transaction t : transactionBst.getAllInOrder()) {
            if ("EXPENSE".equalsIgnoreCase(t.getType())) {
                expenseHeap.insert(t, t.getAmount());
            } else if ("INCOME".equalsIgnoreCase(t.getType())) {
                incomeHeap.insert(t, t.getAmount());
            }
        }
    }

    private void rebuildGraph() {
        this.financialGraph = new FinancialGraph();

        // Standard nodes
        financialGraph.addNode("Commercial Bank", "Commercial Bank Primary", "ACCOUNT");
        financialGraph.addNode("Sampath Bank", "Sampath Savings Account", "ACCOUNT");
        financialGraph.addNode("Credit Card", "Visa Credit Card", "ACCOUNT");
        financialGraph.addNode("Savings Account", "High-Yield Savings", "ACCOUNT");

        financialGraph.addNode("Salary", "Monthly Salary Source", "INCOME_SOURCE");
        financialGraph.addNode("Freelance", "Freelance Clients", "INCOME_SOURCE");

        financialGraph.addNode("Housing", "Housing & Rent", "EXPENSE_CATEGORY");
        financialGraph.addNode("Food", "Groceries & Dining", "EXPENSE_CATEGORY");
        financialGraph.addNode("Education", "NIBM Tuition Fees", "EXPENSE_CATEGORY");
        financialGraph.addNode("Subscriptions", "SaaS & Cloud Services", "EXPENSE_CATEGORY");
        financialGraph.addNode("Investments", "Stock & Bond Investments", "INVESTMENT");

        for (Transaction t : transactionBst.getAllInOrder()) {
            if ("EXPENSE".equalsIgnoreCase(t.getType())) {
                financialGraph.addEdge(t.getAccount(), t.getCategory(), t.getAmount(), t.getTitle());
            } else {
                financialGraph.addEdge(t.getCategory(), t.getAccount(), t.getAmount(), t.getTitle());
            }
        }
    }

    public BinarySearchTree getTransactionBst() { return transactionBst; }
    public MaxHeap getExpenseHeap() { return expenseHeap; }
    public MaxHeap getIncomeHeap() { return incomeHeap; }
    public FinancialGraph getFinancialGraph() { return financialGraph; }
    public List<Goal> getGoals() { return goals; }

    public synchronized void addGoal(Goal g) {
        goals.add(g);
    }
}
// DataStore BST thread synchronization
