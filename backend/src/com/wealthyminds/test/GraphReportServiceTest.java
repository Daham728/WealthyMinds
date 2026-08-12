package com.wealthyminds.test;

import com.wealthyminds.service.GraphReportService;

/**
 * Unit Test suite for GraphReportService (Member 2: K.A.D.C. Ravindu)
 * Validates graph network flow audit and account liquidity JSON report generation.
 */
public class GraphReportServiceTest {
    public static void main(String[] args) {
        System.out.println("=== Testing GraphReportService Audit Generation ===");
        GraphReportService service = GraphReportService.getInstance();

        String auditJson = service.generateGraphAuditReport("monthly");
        assert auditJson != null && auditJson.contains("auditTitle") : "Graph audit JSON invalid";
        assert auditJson.contains("totalNodes") && auditJson.contains("totalEdges") : "Graph metrics missing";
        System.out.println("GraphReportService Audit Generation Test [PASSED]");
    }
}
