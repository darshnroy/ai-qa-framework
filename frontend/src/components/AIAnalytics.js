function AIAnalytics({ tests, darkMode }) {

  const total = tests.length;

  const passed = tests.filter(
    (t) => t.status === "pass"
  ).length;

  const failed = tests.filter(
    (t) => t.status === "fail"
  ).length;

  const successRate = total
    ? ((passed / total) * 100).toFixed(1)
    : 0;

  // 🔍 Detect common issues
  const timeoutErrors = tests.filter(
    (t) =>
      t.ai_analysis &&
      t.ai_analysis.includes("Timeout")
  ).length;

  const selectorErrors = tests.filter(
    (t) =>
      t.ai_analysis &&
      t.ai_analysis.includes("Selector")
  ).length;

  let commonIssue = "No major issues";

  if (timeoutErrors > selectorErrors && timeoutErrors > 0) {
    commonIssue = "⏱ Timeout Errors";
  }

  else if (
    selectorErrors > timeoutErrors &&
    selectorErrors > 0
  ) {
    commonIssue = "🔍 Selector Issues";
  }

  // 🧠 AI Recommendation
  let recommendation =
    "System looks stable.";

  if (commonIssue.includes("Timeout")) {
    recommendation =
      "Increase waits and improve page synchronization.";
  }

  if (commonIssue.includes("Selector")) {
    recommendation =
      "Review unstable locators and DOM changes.";
  }

  return (

    <div
      style={{
        background: darkMode
          ? "rgba(30,30,30,0.95)"
          : "rgba(255,255,255,0.95)",

        borderRadius: "18px",

        padding: "28px",

        marginBottom: "30px",

        boxShadow: darkMode
          ? "0 4px 20px rgba(0,0,0,0.4)"
          : "0 4px 20px rgba(0,0,0,0.08)"
      }}
    >

      <h2
        style={{
          marginTop: 0,
          marginBottom: "20px"
        }}
      >
        🤖 AI Analytics Panel
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",

          gap: "20px"
        }}
      >

        {/* Success Rate */}
        <div
          style={{
            background: "rgba(34,197,94,0.1)",
            padding: "18px",
            borderRadius: "14px"
          }}
        >
          <h3>✅ Success Rate</h3>

          <p
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              margin: 0
            }}
          >
            {successRate}%
          </p>
        </div>

        {/* Failures */}
        <div
          style={{
            background: "rgba(239,68,68,0.1)",
            padding: "18px",
            borderRadius: "14px"
          }}
        >
          <h3>❌ Total Failures</h3>

          <p
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              margin: 0
            }}
          >
            {failed}
          </p>
        </div>

        {/* Common Issue */}
        <div
          style={{
            background: "rgba(59,130,246,0.1)",
            padding: "18px",
            borderRadius: "14px"
          }}
        >
          <h3>⚠ Common Issue</h3>

          <p
            style={{
              fontSize: "20px",
              fontWeight: "600"
            }}
          >
            {commonIssue}
          </p>
        </div>

      </div>

      {/* AI Recommendation */}
      <div
        style={{
          marginTop: "24px",

          background: darkMode
            ? "rgba(255,255,255,0.05)"
            : "rgba(0,0,0,0.04)",

          padding: "18px",

          borderRadius: "14px"
        }}
      >

        <h3>🧠 AI Recommendation</h3>

        <p
          style={{
            marginBottom: 0,
            lineHeight: "1.7"
          }}
        >
          {recommendation}
        </p>

      </div>

    </div>
  );
}

export default AIAnalytics;