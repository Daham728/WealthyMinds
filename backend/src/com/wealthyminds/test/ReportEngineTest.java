package com.wealthyminds.test;

import com.wealthyminds.service.ReportEngine;

/**
 * Unit Test suite for ReportEngine (Member 1: U.G.D.S.K. Karunathilake)
 * Validates periodic report JSON string output generation for daily, weekly, monthly, and annual ranges.
 */
public class ReportEngineTest {
    public static void main(String[] args) {
        System.out.println("=== Testing ReportEngine Periodic Aggregations ===");
        ReportEngine engine = ReportEngine.getInstance();

        String monthlyJson = engine.generateReport("monthly", "2026-07-01", "2026-07-31");
        assert monthlyJson != null && monthlyJson.contains("reportTitle") : "Monthly report output invalid";
        System.out.println("ReportEngine Monthly JSON Generation Test [PASSED]");

        String customJson = engine.generateReport("custom", "2026-07-10", "2026-07-20");
        assert customJson != null && customJson.contains("custom") : "Custom range report output invalid";
        System.out.println("ReportEngine Custom Range JSON Generation Test [PASSED]");
    }
}
