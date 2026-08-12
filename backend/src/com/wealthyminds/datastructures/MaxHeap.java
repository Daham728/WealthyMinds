package com.wealthyminds.datastructures;

import com.wealthyminds.model.Transaction;
import java.util.ArrayList;
import java.util.List;

/**
 * Custom Max-Heap Data Structure for PDSA Coursework.
 * Efficiently extracts highest expenses, top income sources, and priority financial alerts.
 * Time Complexity: Insert O(log n), Extract Max O(log n), Peek O(1).
 */
public class MaxHeap {
    private List<HeapNode> heap;

    public MaxHeap() {
        this.heap = new ArrayList<HeapNode>();
    }

    public int getSize() {
        return heap.size();
    }

    public boolean isEmpty() {
        return heap.isEmpty();
    }

    public void insert(Transaction transaction, double priority) {
        if (transaction == null) return;
        HeapNode node = new HeapNode(transaction, priority);
        heap.add(node);
        heapifyUp(heap.size() - 1);
    }

    public HeapNode peekMax() {
        if (isEmpty()) return null;
        return heap.get(0);
    }

    public HeapNode extractMax() {
        if (isEmpty()) return null;
        HeapNode maxNode = heap.get(0);
        HeapNode lastNode = heap.remove(heap.size() - 1);
        if (!isEmpty()) {
            heap.set(0, lastNode);
            heapifyDown(0);
        }
        return maxNode;
    }

    private void heapifyUp(int index) {
        while (index > 0) {
            int parentIndex = (index - 1) / 2;
            if (heap.get(index).getPriority() > heap.get(parentIndex).getPriority()) {
                swap(index, parentIndex);
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    private void heapifyDown(int index) {
        int size = heap.size();
        while (index < size) {
            int leftChild = 2 * index + 1;
            int rightChild = 2 * index + 2;
            int largest = index;

            if (leftChild < size && heap.get(leftChild).getPriority() > heap.get(largest).getPriority()) {
                largest = leftChild;
            }

            if (rightChild < size && heap.get(rightChild).getPriority() > heap.get(largest).getPriority()) {
                largest = rightChild;
            }

            if (largest != index) {
                swap(index, largest);
                index = largest;
            } else {
                break;
            }
        }
    }

    private void swap(int i, int j) {
        HeapNode temp = heap.get(i);
        heap.set(i, heap.get(j));
        heap.set(j, temp);
    }

    public List<HeapNode> getTopN(int n) {
        List<HeapNode> result = new ArrayList<HeapNode>();
        // Create copy of heap array to extract top N without mutating original heap
        MaxHeap copyHeap = new MaxHeap();
        for (HeapNode node : heap) {
            copyHeap.insert(node.getTransaction(), node.getPriority());
        }

        int count = Math.min(n, copyHeap.getSize());
        for (int i = 0; i < count; i++) {
            result.add(copyHeap.extractMax());
        }
        return result;
    }

    public String toJsonArray() {
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        for (int i = 0; i < heap.size(); i++) {
            HeapNode node = heap.get(i);
            Transaction t = node.getTransaction();
            if (i > 0) sb.append(",");
            sb.append("{");
            sb.append("\"index\":").append(i).append(",");
            sb.append("\"priority\":").append(node.getPriority()).append(",");
            sb.append("\"title\":\"").append(escapeJson(t.getTitle())).append("\",");
            sb.append("\"amount\":").append(t.getAmount()).append(",");
            sb.append("\"type\":\"").append(t.getType()).append("\",");
            sb.append("\"category\":\"").append(escapeJson(t.getCategory())).append("\",");
            sb.append("\"date\":\"").append(t.getDate()).append("\"");
            sb.append("}");
        }
        sb.append("]");
        return sb.toString();
    }

    private String escapeJson(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\").replace("\"", "\\\"");
    }
}
// MaxHeap peekMax priority safety
