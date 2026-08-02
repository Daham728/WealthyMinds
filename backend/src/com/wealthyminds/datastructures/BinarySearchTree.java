package com.wealthyminds.datastructures;

import com.wealthyminds.model.Transaction;
import java.util.ArrayList;
import java.util.List;

/**
 * Custom Binary Search Tree (BST) Implementation for PDSA Coursework.
 * Stores transactions ordered by Date (YYYY-MM-DD) and ID for fast retrieval O(log n).
 */
public class BinarySearchTree {
    private BSTNode root;
    private int size;

    public BinarySearchTree() {
        this.root = null;
        this.size = 0;
    }

    public int getSize() {
        return size;
    }

    public void insert(Transaction transaction) {
        if (transaction == null || transaction.getDate() == null) return;
        root = insertRecursive(root, transaction);
        size++;
    }

    private BSTNode insertRecursive(BSTNode current, Transaction transaction) {
        if (current == null) {
            return new BSTNode(transaction);
        }

        int cmp = compareTransactions(transaction, current.getTransaction());
        if (cmp < 0) {
            current.setLeft(insertRecursive(current.getLeft(), transaction));
        } else {
            current.setRight(insertRecursive(current.getRight(), transaction));
        }
        return current;
    }

    private int compareTransactions(Transaction t1, Transaction t2) {
        int dateCmp = t1.getDate().compareTo(t2.getDate());
        if (dateCmp != 0) return dateCmp;
        return t1.getId().compareTo(t2.getId());
    }

    public List<Transaction> getAllInOrder() {
        List<Transaction> list = new ArrayList<Transaction>();
        inOrderHelper(root, list);
        return list;
    }

    private void inOrderHelper(BSTNode node, List<Transaction> list) {
        if (node != null) {
            inOrderHelper(node.getLeft(), list);
            list.add(node.getTransaction());
            inOrderHelper(node.getRight(), list);
        }
    }

    public List<Transaction> searchRange(String startDate, String endDate) {
        List<Transaction> result = new ArrayList<Transaction>();
        rangeSearchHelper(root, startDate, endDate, result);
        return result;
    }

    private void rangeSearchHelper(BSTNode node, String startDate, String endDate, List<Transaction> result) {
        if (node == null) return;

        String date = node.getTransaction().getDate();
        if (startDate != null && date.compareTo(startDate) > 0) {
            rangeSearchHelper(node.getLeft(), startDate, endDate, result);
        }

        if ((startDate == null || date.compareTo(startDate) >= 0) &&
            (endDate == null || date.compareTo(endDate) <= 0)) {
            result.add(node.getTransaction());
        }

        if (endDate != null && date.compareTo(endDate) < 0) {
            rangeSearchHelper(node.getRight(), startDate, endDate, result);
        }
    }

    public boolean delete(String id) {
        int oldSize = size;
        root = deleteRecursive(root, id);
        return size < oldSize;
    }

    private BSTNode deleteRecursive(BSTNode node, String id) {
        if (node == null) return null;

        if (node.getTransaction().getId().equals(id)) {
            size--;
            if (node.getLeft() == null && node.getRight() == null) return null;
            if (node.getLeft() == null) return node.getRight();
            if (node.getRight() == null) return node.getLeft();

            BSTNode smallest = findMin(node.getRight());
            node.setTransaction(smallest.getTransaction());
            node.setRight(deleteRecursive(node.getRight(), smallest.getTransaction().getId()));
            return node;
        }

        node.setLeft(deleteRecursive(node.getLeft(), id));
        node.setRight(deleteRecursive(node.getRight(), id));
        return node;
    }

    private BSTNode findMin(BSTNode node) {
        while (node.getLeft() != null) {
            node = node.getLeft();
        }
        return node;
    }

    public String toJsonTree() {
        return nodeToJson(root);
    }

    private String nodeToJson(BSTNode node) {
        if (node == null) return "null";
        Transaction t = node.getTransaction();
        StringBuilder sb = new StringBuilder();
        sb.append("{");
        sb.append("\"id\":\"").append(t.getId()).append("\",");
        sb.append("\"title\":\"").append(escapeJson(t.getTitle())).append("\",");
        sb.append("\"amount\":").append(t.getAmount()).append(",");
        sb.append("\"type\":\"").append(t.getType()).append("\",");
        sb.append("\"category\":\"").append(escapeJson(t.getCategory())).append("\",");
        sb.append("\"date\":\"").append(t.getDate()).append("\",");
        sb.append("\"left\":").append(nodeToJson(node.getLeft())).append(",");
        sb.append("\"right\":").append(nodeToJson(node.getRight()));
        sb.append("}");
        return sb.toString();
    }

    private String escapeJson(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", "\\n");
    }
}
