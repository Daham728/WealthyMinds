package com.wealthyminds.datastructures;

import com.wealthyminds.model.Transaction;

public class BSTNode {
    private Transaction transaction;
    private BSTNode left;
    private BSTNode right;

    public BSTNode(Transaction transaction) {
        this.transaction = transaction;
        this.left = null;
        this.right = null;
    }

    public Transaction getTransaction() { return transaction; }
    public void setTransaction(Transaction transaction) { this.transaction = transaction; }

    public BSTNode getLeft() { return left; }
    public void setLeft(BSTNode left) { this.left = left; }

    public BSTNode getRight() { return right; }
    public void setRight(BSTNode right) { this.right = right; }
}
// BST Node helper for date comparisons
