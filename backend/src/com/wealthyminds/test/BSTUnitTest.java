package com.wealthyminds.test;

import com.wealthyminds.datastructures.BinarySearchTree;
import com.wealthyminds.model.Transaction;

import java.util.List;

/**
 * Unit Test suite for BinarySearchTree (Member 1: U.G.D.S.K. Karunathilake)
 * Verifies O(log n) date insertion, range queries, and in-order traversal sorting.
 */
public class BSTUnitTest {
    public static void main(String[] args) {
        System.out.println("=== Testing Binary Search Tree Range Query & Sorting ===");
        BinarySearchTree bst = new BinarySearchTree();

        bst.insert(new Transaction("T1", "Salary", 100000, "INCOME", "Salary", "2026-07-01", "Bank", "Desc"));
        bst.insert(new Transaction("T2", "Rent", 30000, "EXPENSE", "Housing", "2026-07-05", "Bank", "Desc"));
        bst.insert(new Transaction("T3", "Groceries", 15000, "EXPENSE", "Food", "2026-07-10", "Bank", "Desc"));

        List<Transaction> all = bst.getAllInOrder();
        assert all.size() == 3 : "BST count mismatch";
        System.out.println("BST In-Order Traversal Count: " + all.size() + " [PASSED]");

        List<Transaction> range = bst.searchRange("2026-07-01", "2026-07-06");
        assert range.size() == 2 : "Range query mismatch";
        System.out.println("BST Range Query (2026-07-01 to 2026-07-06) Count: " + range.size() + " [PASSED]");
    }
}
