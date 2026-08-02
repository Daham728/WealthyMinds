package com.wealthyminds.model;

import java.util.UUID;

public class Goal {
    private String id;
    private String title;
    private double targetAmount;
    private double currentAmount;
    private String targetDate;
    private String category;
    private int priorityScore; // 1 to 10 scale

    public Goal() {}

    public Goal(String id, String title, double targetAmount, double currentAmount, String targetDate, String category, int priorityScore) {
        this.id = id != null ? id : UUID.randomUUID().toString().substring(0, 8);
        this.title = title;
        this.targetAmount = targetAmount;
        this.currentAmount = currentAmount;
        this.targetDate = targetDate;
        this.category = category;
        this.priorityScore = priorityScore;
    }

    public String getId() { return id; }
    public String getTitle() { return title; }
    public double getTargetAmount() { return targetAmount; }
    public double getCurrentAmount() { return currentAmount; }
    public String getTargetDate() { return targetDate; }
    public String getCategory() { return category; }
    public int getPriorityScore() { return priorityScore; }

    public void setCurrentAmount(double currentAmount) { this.currentAmount = currentAmount; }

    public double getProgressPercentage() {
        if (targetAmount <= 0) return 100.0;
        return Math.min(100.0, (currentAmount / targetAmount) * 100.0);
    }

    public String toJson() {
        return String.format(
            "{\"id\":\"%s\",\"title\":\"%s\",\"targetAmount\":%.2f,\"currentAmount\":%.2f,\"targetDate\":\"%s\",\"category\":\"%s\",\"priorityScore\":%d,\"progress\":%.1f}",
            escapeJson(id), escapeJson(title), targetAmount, currentAmount, escapeJson(targetDate), escapeJson(category), priorityScore, getProgressPercentage()
        );
    }

    private String escapeJson(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\").replace("\"", "\\\"");
    }
}
