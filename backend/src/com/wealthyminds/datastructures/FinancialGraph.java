package com.wealthyminds.datastructures;

import java.util.*;

/**
 * Custom Adjacency List Graph Implementation for PDSA Coursework.
 * Models relationships and money flows between Accounts, Income, Loans, Investments, and Expenses.
 */
public class FinancialGraph {
    public static class Edge {
        private String fromId;
        private String toId;
        private double weight; // Flow amount
        private String label;

        public Edge(String fromId, String toId, double weight, String label) {
            this.fromId = fromId;
            this.toId = toId;
            this.weight = weight;
            this.label = label;
        }

        public String getFromId() { return fromId; }
        public String getToId() { return toId; }
        public double getWeight() { return weight; }
        public String getLabel() { return label; }
    }

    private Map<String, GraphNode> nodes;
    private Map<String, List<Edge>> adjacencyList;

    public FinancialGraph() {
        this.nodes = new LinkedHashMap<String, GraphNode>();
        this.adjacencyList = new LinkedHashMap<String, List<Edge>>();
    }

    public void addNode(String id, String label, String type) {
        if (!nodes.containsKey(id)) {
            nodes.put(id, new GraphNode(id, label, type));
            adjacencyList.put(id, new ArrayList<Edge>());
        }
    }

    public void addEdge(String fromId, String toId, double weight, String label) {
        addNode(fromId, fromId, "ACCOUNT");
        addNode(toId, toId, "CATEGORY");
        adjacencyList.get(fromId).add(new Edge(fromId, toId, weight, label));
    }

    public Map<String, GraphNode> getNodes() { return nodes; }
    public Map<String, List<Edge>> getAdjacencyList() { return adjacencyList; }

    public double getTotalWeight() {
        double total = 0;
        for (List<Edge> edgeList : adjacencyList.values()) {
            for (Edge e : edgeList) {
                total += e.getWeight();
            }
        }
        return total;
    }

    public List<String> findShortestPath(String startId, String endId) {
        List<String> path = new ArrayList<String>();
        if (!nodes.containsKey(startId) || !nodes.containsKey(endId)) return path;

        Map<String, String> parent = new HashMap<String, String>();
        Queue<String> queue = new LinkedList<String>();
        Set<String> visited = new HashSet<String>();

        queue.add(startId);
        visited.add(startId);

        while (!queue.isEmpty()) {
            String curr = queue.poll();
            if (curr.equals(endId)) break;

            List<Edge> edges = adjacencyList.get(curr);
            if (edges != null) {
                for (Edge e : edges) {
                    if (!visited.contains(e.getToId())) {
                        visited.add(e.getToId());
                        parent.put(e.getToId(), curr);
                        queue.add(e.getToId());
                    }
                }
            }
        }

        if (!visited.contains(endId)) return path;
        String curr = endId;
        while (curr != null) {
            path.add(0, curr);
            curr = parent.get(curr);
        }
        return path;
    }

    public List<String> bfs(String startNodeId) {
        List<String> visitedOrder = new ArrayList<String>();
        if (!nodes.containsKey(startNodeId)) return visitedOrder;

        Set<String> visited = new HashSet<String>();
        Queue<String> queue = new LinkedList<String>();

        visited.add(startNodeId);
        queue.add(startNodeId);

        while (!queue.isEmpty()) {
            String current = queue.poll();
            visitedOrder.add(current);

            List<Edge> neighbors = adjacencyList.get(current);
            if (neighbors != null) {
                for (Edge edge : neighbors) {
                    if (!visited.contains(edge.getToId())) {
                        visited.add(edge.getToId());
                        queue.add(edge.getToId());
                    }
                }
            }
        }
        return visitedOrder;
    }

    public String toJson() {
        StringBuilder sb = new StringBuilder();
        sb.append("{");

        // Nodes Array
        sb.append("\"nodes\":[");
        int nodeIdx = 0;
        for (GraphNode node : nodes.values()) {
            if (nodeIdx > 0) sb.append(",");
            sb.append("{");
            sb.append("\"id\":\"").append(node.getId()).append("\",");
            sb.append("\"label\":\"").append(escapeJson(node.getLabel())).append("\",");
            sb.append("\"type\":\"").append(node.getType()).append("\"");
            sb.append("}");
            nodeIdx++;
        }
        sb.append("],");

        // Edges Array
        sb.append("\"edges\":[");
        int edgeIdx = 0;
        for (List<Edge> edges : adjacencyList.values()) {
            for (Edge edge : edges) {
                if (edgeIdx > 0) sb.append(",");
                sb.append("{");
                sb.append("\"from\":\"").append(edge.getFromId()).append("\",");
                sb.append("\"to\":\"").append(edge.getToId()).append("\",");
                sb.append("\"weight\":").append(edge.getWeight()).append(",");
                sb.append("\"label\":\"").append(escapeJson(edge.getLabel())).append("\"");
                sb.append("}");
                edgeIdx++;
            }
        }
        sb.append("]");

        sb.append("}");
        return sb.toString();
    }

    private String escapeJson(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\").replace("\"", "\\\"");
    }
}
// FinancialGraph BFS pathway tracer
