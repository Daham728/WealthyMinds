<p align="center">
  <img src="banner.png" alt="Wealthy Minds Pro Cover Banner" width="100%" />
</p>

# Wealthy Minds Pro — Personal Financial Management Platform

A high-performance personal financial management web platform engineered with a **pure Java (Java 8+) backend** utilizing custom Data Structures (**Binary Search Tree**, **Max-Heap Priority Queue**, and **Directed Cash Flow Graph**) coupled with a modern **React SPA frontend**.

---

## 🚀 Key Features

- **Executive Wealth Dashboard**: Real-time tracking of monthly income, expenditures, savings surplus, and financial health score dial.
- **Binary Search Tree (BST) Transaction Ledger**: $O(\log n)$ chronological transaction indexing by date and ID.
- **Max-Heap Expense Priority Engine**: Automated ranking of major financial outflows to identify top expenditure drivers.
- **Directed Cash Flow Network Graph**: Visual mapping of financial transfers between bank accounts, income channels, and expense categories with BFS/DFS pathway tracing.
- **Financial Goals & Planning**: Milestone tracking for savings targets, emergency funds, and automated smart financial recommendations.

---

## 🛠️ Technology Stack

- **Backend**: Java 8+ (`com.sun.net.httpserver` pure REST API Server)
- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons
- **Data Structures**:
  - `BinarySearchTree.java` — Date-ordered transaction tree
  - `MaxHeap.java` — Expense priority queue
  - `FinancialGraph.java` — Adjacency List directed cash flow network

---

## 📦 Getting Started

### 1. Run the Java Backend REST API

Navigate to the `backend` directory and execute the run script:

```cmd
cd backend
run.bat
```

The backend REST API server will compile and launch on `http://localhost:8080`.

### 2. Run the React Web Frontend

Navigate to the `frontend` directory, install dependencies, and start Vite:

```cmd
cd frontend
npm install
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

---

## 🌐 API Endpoints Summary

| HTTP Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/transactions` | Fetch all recorded transactions from BST |
| `POST` | `/api/transactions` | Insert a new transaction into BST & MaxHeap |
| `DELETE` | `/api/transactions/{id}` | Remove a transaction record |
| `GET` | `/api/analytics/health-score` | Retrieve diagnostic liquidity score (0-100) |
| `GET` | `/api/analytics/top-expenses` | Fetch top expense drivers from Max-Heap |
| `GET` | `/api/graph/flow` | Retrieve Cash Flow Graph nodes and directed edges |
| `GET` | `/api/goals` | Fetch active savings targets |

---

## 📄 License
Distributed under the MIT License.
