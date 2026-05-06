import { useEffect, useRef } from "react";

function TerminalLogs({ tests, darkMode }) {

  const terminalRef = useRef(null);

  // =========================
  // AUTO SCROLL
  // =========================
  useEffect(() => {

    if (terminalRef.current) {

      terminalRef.current.scrollTop =
        terminalRef.current.scrollHeight;
    }

  }, [tests]);

  return (

    <div
      style={{
        background: "#0d1117",

        borderRadius: "18px",

        padding: "20px",

        marginBottom: "30px",

        boxShadow:
          "0 4px 20px rgba(0,0,0,0.35)"
      }}
    >

      {/* HEADER */}
      <div
        style={{
          display: "flex",

          alignItems: "center",

          marginBottom: "16px"
        }}
      >

        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: "#ef4444",
            marginRight: "8px"
          }}
        />

        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: "#f59e0b",
            marginRight: "8px"
          }}
        />

        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: "#22c55e"
          }}
        />

        <span
          style={{
            marginLeft: "14px",

            color: "#9ca3af",

            fontSize: "14px"
          }}
        >
          terminal
        </span>

      </div>

      {/* LOGS */}
      <div
        ref={terminalRef}

        style={{
          maxHeight: "320px",

          overflowY: "auto",

          fontFamily: "monospace",

          fontSize: "14px",

          lineHeight: "1.8",

          color: "#22c55e"
        }}
      >

        {tests.length === 0 && (
          <div>
            No logs available...
          </div>
        )}

        {tests.map((test, index) => (

          <div
            key={index}

            style={{
              marginBottom: "14px",

              borderBottom:
                "1px solid rgba(255,255,255,0.06)",

              paddingBottom: "10px"
            }}
          >

            {/* STATUS */}
            <div>

              {test.status === "pass"
                ? "✅"
                : "❌"}

              {" "}

              [{test.status.toUpperCase()}]

              {" "}

              {test.name}

            </div>

            {/* DURATION */}
            <div
              style={{
                color: "#60a5fa"
              }}
            >
              ⏱ Duration:
              {" "}
              {test.duration}s
            </div>

            {/* AI */}
            {test.ai_analysis && (

              <div
                style={{
                  color: "#facc15",

                  marginTop: "6px",

                  whiteSpace: "pre-wrap"
                }}
              >
                🤖 {test.ai_analysis}
              </div>

            )}

          </div>

        ))}

      </div>

    </div>
  );
}

export default TerminalLogs;