import { useEffect, useState } from "react";
import { getResults } from "../services/api";

import TestList from "../components/TestList";
import Analytics from "../components/Analytics";
import AIAnalytics from "../components/AIAnalytics";
import TerminalLogs from "../components/TerminalLogs";
import { io } from "socket.io-client";

function Dashboard() {

  // =========================
  // STATES
  // =========================
  const [tests, setTests] = useState([]);
  const [search, setSearch] = useState("");
  const socket = io("http://localhost:3000");
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  // 🌙 Dark mode
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
    
  );

  // =========================
  // FETCH DATA
  // =========================
  const fetchData = async () => {

    try {

      const res = await getResults();

      setTests(res.data);

      setLoading(false);

    } catch (err) {

      console.error(err);

      setError("Failed to fetch data");

      setLoading(false);
    }
  };

  // =========================
  // AUTO REFRESH
  // =========================
useEffect(() => {

  // Initial fetch
  fetchData();

  // Auto refresh
  const interval = setInterval(() => {
    fetchData();
  }, 3000);

  // 🟢 Live socket listener
  socket.on("new-test", (newTest) => {

    console.log("📡 Live update:", newTest);

    setTests((prev) => [
      newTest,
      ...prev
    ]);

  });

  // Cleanup
  return () => {

    clearInterval(interval);

    socket.off("new-test");

  };

}, []);

  // =========================
  // TOGGLE THEME
  // =========================
  const toggleTheme = () => {

    const newTheme = !darkMode;

    setDarkMode(newTheme);

    localStorage.setItem(
      "theme",
      newTheme ? "dark" : "light"
    );
  };

  // =========================
  // SEARCH FILTER
  // =========================
  const filteredTests = tests.filter((t) =>
    t.name.toLowerCase().includes(
      search.toLowerCase()
    )
  );

  // =========================
  // STATS
  // =========================
  const total = tests.length;

  const pass = tests.filter(
    (t) => t.status === "pass"
  ).length;

  const fail = tests.filter(
    (t) => t.status === "fail"
  ).length;

  // =========================
  // UI
  // =========================
  return (

    <div
      style={{
        padding: "40px",

        maxWidth: "1200px",

        margin: "auto",

      background: darkMode
  ? "linear-gradient(135deg, #0f172a, #111827, #1e293b)"
  : "linear-gradient(135deg, #dbeafe, #f0f9ff, #ffffff)",

        color: darkMode
          ? "#ffffff"
          : "#000000",

        minHeight: "100vh",

        transition: "0.3s"
      }}
    >

      {/* 🌙 TOGGLE BUTTON */}
      <button
        onClick={toggleTheme}
        style={{
          position: "absolute",

          right: 20,

          top: 20,

          padding: "10px 14px",

          cursor: "pointer",

          background: darkMode
            ? "#333"
            : "#ddd",

          color: darkMode
            ? "#fff"
            : "#000",

          border: "none",

          borderRadius: "8px",

          fontWeight: "600"
        }}
      >
        {darkMode
          ? "☀ Light"
          : "🌙 Dark"}
      </button>

      {/* HEADER */}
      <h1
  style={{
    marginBottom: "30px",

    fontSize: "42px",

    fontWeight: "800",

    background:
      "linear-gradient(90deg,#38bdf8,#8b5cf6,#ec4899)",

    WebkitBackgroundClip: "text",

    WebkitTextFillColor: "transparent"
  }}
>
  🤖 AI QA Dashboard
</h1>

      {/* SEARCH */}
      <input
        type="text"

        placeholder="Search tests..."

        value={search}

        onChange={(e) =>
          setSearch(e.target.value)
        }

        style={{
  padding: "14px",

  marginBottom: "24px",

  width: "100%",

  borderRadius: "14px",

  border: darkMode
    ? "1px solid rgba(255,255,255,0.08)"
    : "1px solid rgba(0,0,0,0.08)",

  fontSize: "16px",

  background: darkMode
    ? "rgba(255,255,255,0.06)"
    : "rgba(255,255,255,0.7)",

  color: darkMode
    ? "#fff"
    : "#000",

  backdropFilter: "blur(12px)",

  outline: "none",

  boxShadow:
    "0 4px 20px rgba(0,0,0,0.08)"
}}
      />

      {/* 🤖 AI ANALYTICS */}
      <AIAnalytics
        tests={tests}
        darkMode={darkMode}
      />

      {/* 📊 BASIC STATS */}
      <div
        style={{
          display: "flex",

          gap: "20px",

          marginBottom: "30px",

          flexWrap: "wrap",
          boxShadow:"0 8px 24px rgba(59,130,246,0.12)",
        }}
      >

        <div
          style={{
            flex: 1,

            minWidth: "180px",

            background: darkMode
              ? "#1e1e1e"
              : "#f5f5f5",

            padding: "20px",

            borderRadius: "16px"
          }}
        >
          <h3>Total</h3>

          <h1>{total}</h1>
        </div>

        <div
          style={{
            flex: 1,

            minWidth: "180px",

            background:
              "rgba(34,197,94,0.12)",

            padding: "20px",

            borderRadius: "16px"
          }}
        >
          <h3
            style={{
              color: "#22c55e"
            }}
          >
            Pass
          </h3>

          <h1
            style={{
              color: "#22c55e"
            }}
          >
            {pass}
          </h1>
        </div>

        <div
          style={{
            flex: 1,

            minWidth: "180px",

            background:
              "rgba(239,68,68,0.12)",

            padding: "20px",

            borderRadius: "16px"
          }}
        >
          <h3
            style={{
              color: "#ef4444"
            }}
          >
            Fail
          </h3>

          <h1
            style={{
              color: "#ef4444"
            }}
          >
            {fail}
          </h1>
        </div>

      </div>

      {/* 📈 CHART */}
      <Analytics data={tests} />
      <TerminalLogs
  tests={tests}
  darkMode={darkMode}
/>

      {/* ⏳ LOADING */}
      {loading && (
        <p>Loading...</p>
      )}

      {/* ❌ ERROR */}
      {error && (
        <p
          style={{
            color: "red"
          }}
        >
          {error}
        </p>
      )}

      {/* 🧪 TEST LIST */}
      {!loading && !error && (
        <>
          <h2
            style={{
              marginTop: "30px",
              marginBottom: "20px"
            }}
          >
            Test Results
          </h2>

          <TestList
            tests={filteredTests}
            darkMode={darkMode}
          />
        </>
      )}

    </div>
  );
}

export default Dashboard;