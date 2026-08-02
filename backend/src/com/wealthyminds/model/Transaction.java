package com.wealthyminds.model;

import java.util.UUID;

public class Transaction {
    private String id;
    private String title;
    private double amount;
    private String type; // "INCOME" or "EXPENSE"
    private String category; // e.g. "Food", "Rent", "Salary", "Investment", "Subscription"
    private String date; // YYYY-MM-DD
    private String account; // e.g. "Main Bank Account", "Savings", "Credit Card"
    private String description;

    public Transaction() {
    }

    public Transaction(String id, String title, double amount, String type, String category, String date, String account, String description) {
        this.id = id != null ? id : UUID.randomUUID().toString().substring(0, 8);
        this.title = title;
        this.amount = amount;
        this.type = type;
        this.category = category;
        this.date = date;
        this.account = account;
        this.description = description;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getAccount() { return account; }
    public void setAccount(String account) { this.account = account; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String toJson() {
        return String.format(
            "{\"id\":\"%s\",\"title\":\"%s\",\"amount\":%.2f,\"type\":\"%s\",\"category\":\"%s\",\"date\":\"%s\",\"account\":\"%s\",\"description\":\"%s\"}",
            escapeJson(id), escapeJson(title), amount, escapeJson(type), escapeJson(category), escapeJson(date), escapeJson(account), escapeJson(description)
        );
    }

    private String escapeJson(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", "\\n").replace("\r", "\\r");
    }
}
