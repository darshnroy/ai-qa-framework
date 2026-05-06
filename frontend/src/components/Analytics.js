import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function Analytics({ data }) {

  // =========================
  // DATA
  // =========================
  const pass = data.filter(
    (t) => t.status === "pass"
  ).length;

  const fail = data.filter(
    (t) => t.status === "fail"
  ).length;

  const chartData = [
    {
      name: "Pass",
      value: pass
    },
    {
      name: "Fail",
      value: fail
    }
  ];

  const COLORS = [
    "#22c55e",
    "#ef4444"
  ];

  return (

    <div
      style={{
        background: "rgba(255,255,255,0.04)",

        borderRadius: "20px",

        padding: "30px",

        marginBottom: "30px",

        backdropFilter: "blur(12px)",

        boxShadow:
          "0 4px 20px rgba(0,0,0,0.12)"
      }}
    >

      {/* HEADER */}
      <div
        style={{
          marginBottom: "20px"
        }}
      >
        <h2
          style={{
            margin: 0
          }}
        >
          📊 Test Analytics
        </h2>

        <p
          style={{
            opacity: 0.7,
            marginTop: "8px"
          }}
        >
          Real-time pass/fail distribution
        </p>
      </div>

      {/* CHART */}
      <div
        style={{
          width: "100%",
          height: "350px"
        }}
      >

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={chartData}

              dataKey="value"

              cx="50%"

              cy="50%"

              outerRadius={120}

              innerRadius={70}

              paddingAngle={4}

              animationBegin={0}

              animationDuration={1800}

              animationEasing="ease-out"

              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >

              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                />
              ))}

            </Pie>

            {/* TOOLTIP */}
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow:
                  "0 4px 16px rgba(0,0,0,0.2)"
              }}
            />

            {/* LEGEND */}
            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default Analytics;