package com.wealthyminds;

import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import com.wealthyminds.datastructures.HeapNode;
import com.wealthyminds.model.Goal;
import com.wealthyminds.model.Transaction;
import com.wealthyminds.service.DataStore;

import java.io.InputStream;
import java.io.OutputStream;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Scanner;

/**
 * Main Java REST API Server for Wealthy Minds Application.
 * Powered by standard Java HttpServer (Java 8+ compliant).
 * Exposes REST API endpoints for BST, Heap, and Graph data structures.
 */
public class WealthyMindsServer {
    private static final int PORT = 8080;

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);

        // CORS & API Endpoints Routing
        server.createContext("/api/transactions", new TransactionsHandler());
        server.createContext("/api/transactions/tree", new BstTreeHandler());
        server.createContext("/api/analytics/top-expenses", new TopExpensesHandler());
        server.createContext("/api/analytics/heap-structure", new HeapStructureHandler());
        server.createContext("/api/analytics/health-score", new HealthScoreHandler());
        server.createContext("/api/analytics/predictions", new PredictionsHandler());
        server.createContext("/api/graph/flow", new GraphFlowHandler());
        server.createContext("/api/goals", new GoalsHandler());
        server.createContext("/api/coursework", new CourseworkHandler());

        server.setExecutor(null); // default executor
        System.out.println("=================================================");
        System.out.println("  WEALTHY MINDS JAVA BACKEND SERVER RUNNING       ");
        System.out.println("  Port: http://localhost:" + PORT + "              ");
        System.out.println("  BST, Heap, & Graph Data Structure Endpoints Ready");
        System.out.println("=================================================");
        server.start();
    }

    private static void sendJsonResponse(HttpExchange exchange, int statusCode, String responseJson) throws IOException {
        addCorsHeaders(exchange);
        byte[] bytes = responseJson.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
        exchange.sendResponseHeaders(statusCode, bytes.length);
        OutputStream os = exchange.getResponseBody();
        os.write(bytes);
        os.close();
    }

    private static void addCorsHeaders(HttpExchange exchange) {
        exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
        exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }

    private static void handleOptions(HttpExchange exchange) throws IOException {
        addCorsHeaders(exchange);
        exchange.sendResponseHeaders(204, -1);
    }

    private static String readBody(HttpExchange exchange) {
        InputStream is = exchange.getRequestBody();
        Scanner scanner = new Scanner(is, "UTF-8").useDelimiter("\\A");
        return scanner.hasNext() ? scanner.next() : "";
    }

    // Handlers
    static class TransactionsHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                handleOptions(exchange);
                return;
            }

            DataStore ds = DataStore.getInstance();

            if ("GET".equalsIgnoreCase(exchange.getRequestMethod())) {
                List<Transaction> list = ds.getTransactionBst().getAllInOrder();
                StringBuilder sb = new StringBuilder();
                sb.append("[");
                for (int i = 0; i < list.size(); i++) {
                    if (i > 0) sb.append(",");
                    sb.append(list.get(i).toJson());
                }
                sb.append("]");
                sendJsonResponse(exchange, 200, sb.toString());
            } else if ("POST".equalsIgnoreCase(exchange.getRequestMethod())) {
                String body = readBody(exchange);
                try {
                    // Simple parse JSON
                    String title = extractJsonField(body, "title");
                    double amount = Double.parseDouble(extractJsonField(body, "amount"));
                    String type = extractJsonField(body, "type");
                    String category = extractJsonField(body, "category");
                    String date = extractJsonField(body, "date");
                    String account = extractJsonField(body, "account");
                    String description = extractJsonField(body, "description");

                    Transaction t = new Transaction(null, title, amount, type, category, date, account, description);
                    ds.addTransaction(t);

                    sendJsonResponse(exchange, 201, t.toJson());
                } catch (Exception e) {
                    sendJsonResponse(exchange, 400, "{\"error\":\"Invalid JSON transaction format\"}");
                }
            } else if ("DELETE".equalsIgnoreCase(exchange.getRequestMethod())) {
                String path = exchange.getRequestURI().getPath();
                String id = path.substring(path.lastIndexOf('/') + 1);
                boolean removed = ds.deleteTransaction(id);
                if (removed) {
                    sendJsonResponse(exchange, 200, "{\"status\":\"deleted\",\"id\":\"" + id + "\"}");
                } else {
                    sendJsonResponse(exchange, 404, "{\"error\":\"Transaction not found\"}");
                }
            }
        }
    }

    static class BstTreeHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) { handleOptions(exchange); return; }
            DataStore ds = DataStore.getInstance();
            String jsonTree = ds.getTransactionBst().toJsonTree();
            sendJsonResponse(exchange, 200, jsonTree);
        }
    }

    static class TopExpensesHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) { handleOptions(exchange); return; }
            DataStore ds = DataStore.getInstance();
            List<HeapNode> topExpenses = ds.getExpenseHeap().getTopN(5);
            StringBuilder sb = new StringBuilder();
            sb.append("[");
            for (int i = 0; i < topExpenses.size(); i++) {
                if (i > 0) sb.append(",");
                Transaction t = topExpenses.get(i).getTransaction();
                sb.append(t.toJson());
            }
            sb.append("]");
            sendJsonResponse(exchange, 200, sb.toString());
        }
    }

    static class HeapStructureHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) { handleOptions(exchange); return; }
            DataStore ds = DataStore.getInstance();
            String jsonHeap = ds.getExpenseHeap().toJsonArray();
            sendJsonResponse(exchange, 200, jsonHeap);
        }
    }

    static class HealthScoreHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) { handleOptions(exchange); return; }
            DataStore ds = DataStore.getInstance();
            List<Transaction> transactions = ds.getTransactionBst().getAllInOrder();

            double totalIncome = 0;
            double totalExpense = 0;
            for (Transaction t : transactions) {
                if ("INCOME".equalsIgnoreCase(t.getType())) totalIncome += t.getAmount();
                else if ("EXPENSE".equalsIgnoreCase(t.getType())) totalExpense += t.getAmount();
            }

            double netSavings = totalIncome - totalExpense;
            double savingsRate = totalIncome > 0 ? (netSavings / totalIncome) * 100.0 : 0.0;

            // Algorithm for Financial Health Score (0 - 100)
            int healthScore = 75; // base
            if (savingsRate > 40) healthScore += 15;
            else if (savingsRate > 20) healthScore += 10;
            else if (savingsRate < 0) healthScore -= 25;

            healthScore = Math.max(0, Math.min(100, healthScore));

            String status = healthScore >= 80 ? "EXCELLENT" : healthScore >= 60 ? "STABLE" : "REQUIRES_ATTENTION";

            StringBuilder json = new StringBuilder();
            json.append("{");
            json.append("\"score\":").append(healthScore).append(",");
            json.append("\"status\":\"").append(status).append("\",");
            json.append("\"totalIncome\":").append(totalIncome).append(",");
            json.append("\"totalExpense\":").append(totalExpense).append(",");
            json.append("\"netSavings\":").append(netSavings).append(",");
            json.append("\"savingsRate\":").append(String.format("%.1f", savingsRate)).append(",");
            json.append("\"alerts\":[");
            if (savingsRate < 20) {
                json.append("\"Savings rate below recommended 20% target.\",");
            }
            json.append("\"Education and housing account for top 65% of monthly expenditure.\"");
            json.append("]");
            json.append("}");

            sendJsonResponse(exchange, 200, json.toString());
        }
    }

    static class PredictionsHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) { handleOptions(exchange); return; }
            String json = "{"
                + "\"forecastNextMonthExpense\":368000.0,"
                + "\"forecastNextMonthIncome\":470000.0,"
                + "\"projectedSavingsRate\":21.7,"
                + "\"trend\":\"STABLE_GROWTH\","
                + "\"recommendations\":["
                + "\"Consolidate cloud subscription costs to save approx. LKR 6,500/month.\","
                + "\"Increase monthly allocation to Emergency Reserve Fund Goal by 15%.\","
                + "\"Rebalance food & dining expenses using priority Max-Heap caps.\""
                + "]"
                + "}";
            sendJsonResponse(exchange, 200, json);
        }
    }

    static class GraphFlowHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) { handleOptions(exchange); return; }
            DataStore ds = DataStore.getInstance();
            String jsonGraph = ds.getFinancialGraph().toJson();
            sendJsonResponse(exchange, 200, jsonGraph);
        }
    }

    static class GoalsHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) { handleOptions(exchange); return; }
            DataStore ds = DataStore.getInstance();

            if ("GET".equalsIgnoreCase(exchange.getRequestMethod())) {
                List<Goal> goals = ds.getGoals();
                StringBuilder sb = new StringBuilder();
                sb.append("[");
                for (int i = 0; i < goals.size(); i++) {
                    if (i > 0) sb.append(",");
                    sb.append(goals.get(i).toJson());
                }
                sb.append("]");
                sendJsonResponse(exchange, 200, sb.toString());
            } else if ("POST".equalsIgnoreCase(exchange.getRequestMethod())) {
                String body = readBody(exchange);
                try {
                    String title = extractJsonField(body, "title");
                    double targetAmount = Double.parseDouble(extractJsonField(body, "targetAmount"));
                    double currentAmount = Double.parseDouble(extractJsonField(body, "currentAmount"));
                    String targetDate = extractJsonField(body, "targetDate");
                    String category = extractJsonField(body, "category");
                    int priorityScore = Integer.parseInt(extractJsonField(body, "priorityScore"));

                    Goal g = new Goal(null, title, targetAmount, currentAmount, targetDate, category, priorityScore);
                    ds.addGoal(g);

                    sendJsonResponse(exchange, 201, g.toJson());
                } catch (Exception e) {
                    sendJsonResponse(exchange, 400, "{\"error\":\"Invalid JSON goal format\"}");
                }
            }
        }
    }

    static class CourseworkHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) { handleOptions(exchange); return; }
            String json = "{"
                + "\"projectTitle\":\"Wealthy Minds – Intelligent Personal Financial Behavior Analysis & Prediction System\","
                + "\"programme\":\"Higher National Diploma in Software Engineering (HNDSE)\","
                + "\"module\":\"Programming Data Structures and Algorithms – 1 (PDSA)\","
                + "\"batch\":\"HNDSE25.2F\","
                + "\"institute\":\"National Institute of Business Management (NIBM Colombo-7)\","
                + "\"members\":["
                + "{\"name\":\"U.G.D.S.K. Karunathilake\",\"id\":\"COHNDSE252F-026\",\"role\":\"Data Structures Architect (BST & Heap)\"},"
                + "{\"name\":\"K.A.D.C. Ravindu\",\"id\":\"COHNDSE252F-001\",\"role\":\"Graph Network & Algorithm Engineer\"},"
                + "{\"name\":\"T.N.V. Perera\",\"id\":\"COHNDSE243F-065\",\"role\":\"Full-Stack UI & Integration Specialist\"}"
                + "],"
                + "\"dataStructures\":["
                + "{\"name\":\"Binary Search Tree (BST)\",\"timeComplexity\":\"O(log n)\",\"purpose\":\"Ordered transaction storage by date/ID, fast range queries, and sorted financial reports.\"},"
                + "{\"name\":\"Max-Heap / Priority Queue\",\"timeComplexity\":\"O(log n)\",\"purpose\":\"Instantaneous O(1) extraction of highest expenses, top income sources, and priority alert flags.\"},"
                + "{\"name\":\"Adjacency List Graph\",\"timeComplexity\":\"O(V + E)\",\"purpose\":\"Maps financial flow networks across bank accounts, income streams, subscriptions, and investments.\"}"
                + "]"
                + "}";
            sendJsonResponse(exchange, 200, json);
        }
    }

    private static String extractJsonField(String json, String field) {
        String key = "\"" + field + "\"";
        int keyIndex = json.indexOf(key);
        if (keyIndex == -1) return "";
        int colonIndex = json.indexOf(":", keyIndex);
        if (colonIndex == -1) return "";
        int valStart = colonIndex + 1;
        while (valStart < json.length() && (json.charAt(valStart) == ' ' || json.charAt(valStart) == '"')) {
            valStart++;
        }
        int valEnd = valStart;
        if (json.charAt(colonIndex + 1) == ' ' && json.charAt(colonIndex + 2) == '"' || json.charAt(valStart - 1) == '"') {
            valEnd = json.indexOf("\"", valStart);
        } else {
            while (valEnd < json.length() && json.charAt(valEnd) != ',' && json.charAt(valEnd) != '}') {
                valEnd++;
            }
        }
        if (valEnd == -1) valEnd = json.length();
        return json.substring(valStart, valEnd).trim();
    }
}
