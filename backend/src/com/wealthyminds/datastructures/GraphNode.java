package com.wealthyminds.datastructures;

public class GraphNode {
    private String id;
    private String label;
    private String type; // "ACCOUNT", "INCOME_SOURCE", "EXPENSE_CATEGORY", "LOAN", "INVESTMENT"
    private int inDegree;
    private int outDegree;

    public GraphNode(String id, String label, String type) {
        this.id = id;
        this.label = label;
        this.type = type;
        this.inDegree = 0;
        this.outDegree = 0;
    }

    public String getId() { return id; }
    public String getLabel() { return label; }
    public String getType() { return type; }
    public int getInDegree() { return inDegree; }
    public int getOutDegree() { return outDegree; }
    public void incrementInDegree() { inDegree++; }
    public void incrementOutDegree() { outDegree++; }
}
// GraphNode type validator
