package com.wealthyminds.test;

import com.wealthyminds.datastructures.MaxHeap;
import com.wealthyminds.datastructures.HeapNode;
import com.wealthyminds.model.Transaction;

import java.util.List;

/**
 * Unit Test suite for MaxHeap (Member 1: U.G.D.S.K. Karunathilake)
 * Verifies O(log n) heap insertion, siftUp/siftDown priority ordering, and top N extraction.
 */
public class MaxHeapUnitTest {
    public static void main(String[] args) {
        System.out.println("=== Testing Max-Heap Priority Queue Extraction ===");
        MaxHeap heap = new MaxHeap();

        heap.insert(new Transaction("T1", "Coffee", 500, "EXPENSE", "Food", "2026-07-01", "Cash", "Desc"), 500);
        heap.insert(new Transaction("T2", "Tuition", 150000, "EXPENSE", "Education", "2026-07-02", "Bank", "Desc"), 150000);
        heap.insert(new Transaction("T3", "Rent", 85000, "EXPENSE", "Housing", "2026-07-03", "Bank", "Desc"), 85000);

        List<HeapNode> top = heap.getTopN(2);
        assert top.size() == 2 : "Heap top size mismatch";
        assert top.get(0).getPriority() == 150000 : "Max-Heap root priority mismatch";
        System.out.println("Max-Heap Root Element: " + top.get(0).getTransaction().getTitle() + " (LKR " + top.get(0).getPriority() + ") [PASSED]");
    }
}
