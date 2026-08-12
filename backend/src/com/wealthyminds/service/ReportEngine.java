package com.wealthyminds.service;

import com.wealthyminds.datastructures.BinarySearchTree;
import com.wealthyminds.datastructures.MaxHeap;
import com.wealthyminds.datastructures.HeapNode;
import com.wealthyminds.model.Transaction;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

/**
 * ReportEngine Service (Member 1: U.G.D.S.K. Karunathilake - Data Structures Architect)
 * Leverages Binary Search Tree (BST) O(log n + k) range queries by date
 * and Max-Heap priority queues for top spending category analytics.
 */
public class ReportEngine {
    private static ReportEngine instance;

    private ReportEngine() {}

    public static synchronized ReportEngine getInstance() {
        if (instance == null) {
            instance = new ReportEngine();
        }
        return instance;
    }

    public String generateReport(String period, String customStart, String customEnd) {
        DataStore ds = DataStore.getInstance();
        BinarySearchTree bst = ds.getTransactionBst();

        String startDate = "2026-01-01";
        String endDate = "2026-12-31";

        if ("daily".equalsIgnoreCase(period)) {
            if (customStart != null && !customStart.isEmpty()) {
                startDate = customStart;
                endDate = customStart;
            } else {
                startDate = "2026-07-20";
                endDate = "2026-07-20";
            }
        } else if ("weekly".equalsIgnoreCase(period)) {
            if (customStart != null && !customStart.isEmpty() && customEnd != null && !customEnd.isEmpty()) {
                startDate = customStart;
                endDate = customEnd;
            } else {
                startDate = "2026-07-15";
                endDate = "2026-07-28";
            }
        } else if ("monthly".equalsIgnoreCase(period)) {
            if (customStart != null && !customStart.isEmpty()) {
                startDate = customStart.substring(0, 7) + "-01";
                endDate = customStart.substring(0, 7) + "-31";
            } else {
                startDate = "2026-07-01";
                endDate = "2026-07-31";
            }
        } else if ("annual".equalsIgnoreCase(period)) {
            if (customStart != null && customStart.length() >= 4) {
                String yr = customStart.substring(0, 4);
                startDate = yr + "-01-01";
                endDate = yr + "-12-31";
            } else {
                startDate = "2026-01-01";
                endDate = "2026-12-31";
            }
        } else if ("custom".equalsIgnoreCase(period)) {
            if (customStart != null && !customStart.isEmpty()) startDate = customStart;
            if (customEnd != null && !customEnd.isEmpty()) endDate = customEnd;
        }

        // Execute O(log n + k) Range Query on BST
        List<Transaction> filteredTxns = bst.searchRange(startDate, endDate);

        double totalIncome = 0;
        double totalExpense = 0;
        Map<String, Double> categoryTotals = new HashMap<String, Double>();
        Map<String, Integer> categoryCounts = new HashMap<String, Integer>();

        for (Transaction t : filteredTxns) {
            if ("INCOME".equalsIgnoreCase(t.getType())) {
                totalIncome += t.getAmount();
            } else if ("EXPENSE".equalsIgnoreCase(t.getType())) {
                totalExpense += t.getAmount();
                String cat = t.getCategory();
                categoryTotals.put(cat, categoryTotals.getOrDefault(cat, 0.0) + t.getAmount());
                categoryCounts.put(cat, categoryCounts.getOrDefault(cat, 0) + 1);
            }
        }

        double netBalance = totalIncome - totalExpense;
        double savingsRate = totalIncome > 0 ? (netBalance / totalIncome) * 100.0 : 0.0;

        // Use Max-Heap to organize category expenditures by amount
        MaxHeap categoryHeap = new MaxHeap();
        for (Map.Entry<String, Double> entry : categoryTotals.entrySet()) {
            Transaction dummyTxn = new Transaction("CAT-" + entry.getKey(), entry.getKey() + " Total", entry.getValue(), "EXPENSE", entry.getKey(), endDate, "Summary", "Category total for period");
            categoryHeap.insert(dummyTxn, entry.getValue());
        }

        List<HeapNode> topCategoryNodes = categoryHeap.getTopN(10);
        String topCategoryName = topCategoryNodes.isEmpty() ? "N/A" : topCategoryNodes.get(0).getTransaction().getCategory();
        double topCategoryAmount = topCategoryNodes.isEmpty() ? 0.0 : topCategoryNodes.get(0).getPriority();

        StringBuilder json = new StringBuilder();
        json.append("{");
        json.append("\"reportTitle\":\"").append(getReportTitle(period)).append("\",");
        json.append("\"period\":\"").append(period).append("\",");
        json.append("\"startDate\":\"").append(startDate).append("\",");
        json.append("\"endDate\":\"").append(endDate).append("\",");
        json.append("\"totalIncome\":").append(totalIncome).append(",");
        json.append("\"totalExpense\":").append(totalExpense).append(",");
        json.append("\"netBalance\":").append(netBalance).append(",");
        json.append("\"savingsRate\":").append(String.format(Locale.US, "%.1f", savingsRate)).append(",");
        json.append("\"transactionCount\":").append(filteredTxns.size()).append(",");
        json.append("\"topCategory\":\"").append(escapeJson(topCategoryName)).append("\",");
        json.append("\"topCategoryAmount\":").append(topCategoryAmount).append(",");

        // Category Breakdown Array
        json.append("\"categoryBreakdown\":[");
        for (int i = 0; i < topCategoryNodes.size(); i++) {
            if (i > 0) json.append(",");
            HeapNode node = topCategoryNodes.get(i);
            String catName = node.getTransaction().getCategory();
            double amt = node.getPriority();
            double pct = totalExpense > 0 ? (amt / totalExpense) * 100.0 : 0.0;
            json.append("{");
            json.append("\"category\":\"").append(escapeJson(catName)).append("\",");
            json.append("\"amount\":").append(amt).append(",");
            json.append("\"percentage\":").append(String.format(Locale.US, "%.1f", pct)).append(",");
            json.append("\"count\":").append(categoryCounts.getOrDefault(catName, 0));
            json.append("}");
        }
        json.append("],");

        // Transactions List
        json.append("\"transactions\":[");
        for (int i = 0; i < filteredTxns.size(); i++) {
            if (i > 0) json.append(",");
            json.append(filteredTxns.get(i).toJson());
        }
        json.append("]");

        json.append("}");

        return json.toString();
    }

    private String getReportTitle(String period) {
        if ("daily".equalsIgnoreCase(period)) return "Daily Financial Activity Statement";
        if ("weekly".equalsIgnoreCase(period)) return "Weekly Cash Flow Summary & Burn Rate";
        if ("monthly".equalsIgnoreCase(period)) return "Monthly Budget & Expense Breakdown Report";
        if ("annual".equalsIgnoreCase(period)) return "Annual Financial Statement & Tax Performance Report";
        return "Custom Financial Range & Analytical Report";
    }

    private String escapeJson(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", "\\n");
    }
}
// ReportEngine category breakdown sort helper
