package com.wealthyminds.test;

import com.wealthyminds.datastructures.FinancialGraph;
import java.util.List;

/**
 * Unit Test suite for FinancialGraph (Member 2: K.A.D.C. Ravindu)
 * Verifies adjacency list creation, vertex addition, weighted directed edges, and BFS traversal.
 */
public class FinancialGraphUnitTest {
    public static void main(String[] args) {
        System.out.println("=== Testing Financial Graph Adjacency List & BFS ===");
        FinancialGraph graph = new FinancialGraph();

        graph.addNode("Bank A", "Commercial Bank", "ACCOUNT");
        graph.addNode("Housing", "Housing Expenses", "CATEGORY");
        graph.addEdge("Bank A", "Housing", 85000, "Rent Payment");

        assert graph.getNodes().size() == 2 : "Graph node count mismatch";
        System.out.println("Graph Node Count: " + graph.getNodes().size() + " [PASSED]");

        List<String> bfsOrder = graph.bfs("Bank A");
        assert bfsOrder.contains("Bank A") && bfsOrder.contains("Housing") : "BFS order mismatch";
        System.out.println("BFS Traversal Order from Bank A: " + bfsOrder + " [PASSED]");
    }
}
