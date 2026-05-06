function TestCard({ test, darkMode }) {

  const isPass = test.status === "pass";

  return (
    <div
      style={{
        background: darkMode
          ? "rgba(30,30,30,0.9)"
          : "rgba(255,255,255,0.9)",

        backdropFilter: "blur(10px)",

        border: darkMode
          ? "1px solid rgba(255,255,255,0.1)"
          : "1px solid rgba(0,0,0,0.1)",

        borderRadius: "18px",

        padding: "24px",

        marginBottom: "20px",

        boxShadow: darkMode
          ? "0 4px 20px rgba(0,0,0,0.4)"
          : "0 4px 20px rgba(0,0,0,0.08)",

        transition: "0.3s ease",

        transform: "translateY(0)"
      }}

      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
      }}

      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >

      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px"
        }}
      >

        <h2
          style={{
            margin: 0,
            fontSize: "22px",
            fontWeight: "700"
          }}
        >
          🧪 {test.name}
        </h2>

        {/* STATUS BADGE */}
        <span
          style={{
            background: isPass
              ? "rgba(34,197,94,0.15)"
              : "rgba(239,68,68,0.15)",

            color: isPass
              ? "#22c55e"
              : "#ef4444",

            padding: "8px 14px",

            borderRadius: "999px",

            fontSize: "14px",

            fontWeight: "600"
          }}
        >
          {isPass ? "✅ PASS" : "❌ FAIL"}
        </span>

      </div>

      {/* DURATION */}
      <div
        style={{
          marginBottom: "14px",
          opacity: 0.8
        }}
      >
        ⏱ Duration:
        <strong> {test.duration}s</strong>
      </div>

      {/* AI INSIGHT */}
      {test.ai_analysis && (
        <div
          style={{
            background: darkMode
              ? "rgba(255,255,255,0.05)"
              : "rgba(0,0,0,0.04)",

            padding: "16px",

            borderRadius: "14px",

            marginTop: "16px",

            lineHeight: "1.6"
          }}
        >

          <h3
            style={{
              marginTop: 0,
              marginBottom: "10px"
            }}
          >
            🤖 AI Insight
          </h3>

          <pre
            style={{
              whiteSpace: "pre-wrap",
              margin: 0,
              fontFamily: "inherit"
            }}
          >
            {test.ai_analysis}
          </pre>

        </div>
      )}

    </div>
  );
}

export default TestCard;