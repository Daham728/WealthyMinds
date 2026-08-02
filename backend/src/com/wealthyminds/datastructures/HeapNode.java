package com.wealthyminds.datastructures;

import com.wealthyminds.model.Transaction;

public class HeapNode {
    private Transaction transaction;
    private double priority; // usually amount or severity score

    public HeapNode(Transaction transaction, double priority) {
        this.transaction = transaction;
        this.priority = priority;
    }

    public Transaction getTransaction() { return transaction; }
    public double getPriority() { return priority; }
}
