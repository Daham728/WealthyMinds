package com.wealthyminds.datastructures;

public class GraphNode {
    private String id;
    private String label;
    private String type; // "ACCOUNT", "INCOME_SOURCE", "EXPENSE_CATEGORY", "LOAN", "INVESTMENT"

    public GraphNode(String id, String label, String type) {
        this.id = id;
        this.label = label;
        this.type = type;
    }

    public String getId() { return id; }
    public String getLabel() { return label; }
    public String getType() { return type; }
}
