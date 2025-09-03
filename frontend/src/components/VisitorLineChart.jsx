// components/VisitorLineChart.jsx
import React from "react";

const data = [10, 15, 20, 18, 22, 25, 30, 18, 15, 25, 10, 18];
const months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const width = 450;
const height = 280;
const padding = 40;

const maxVisitor = Math.max(...data);
const points = data.map((val, i) => {
  const x = padding + i * ((width - 2 * padding) / (data.length - 1));
  const y = height - padding - (val / maxVisitor) * (height - 2 * padding);
  return `${x},${y}`;
});

const linePath = points.join(" ");

export default function VisitorLineChart() {
  return (
    <div
      style={{ fontFamily: "Arial, sans-serif", width: width, margin: "auto" }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
        Visitor in The Website
      </h3>
      <svg
        width={width}
        height={height}
        style={{
          border: "1px solid #ccc",
          backgroundColor: "#fff",
          borderRadius: "8px",
        }}
      >
        {/* X-axis */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="#000"
        />
        {/* Y-axis */}
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          stroke="#000"
        />

        {/* Line */}
        <polyline
          fill="none"
          stroke="purple"
          strokeWidth="2"
          points={linePath}
        />

        {/* Data points */}
        {points.map((point, idx) => {
          const [x, y] = point.split(",");
          return (
            <circle
              key={idx}
              cx={x}
              cy={y}
              r={4}
              fill="purple"
              stroke="#fff"
              strokeWidth={1}
            />
          );
        })}

        {/* X-axis labels */}
        {months.map((month, idx) => {
          const x =
            padding + idx * ((width - 2 * padding) / (months.length - 1));
          return (
            <text
              key={idx}
              x={x}
              y={height - padding + 20}
              fontSize="10"
              textAnchor="middle"
              fill="#333"
            >
              {month}
            </text>
          );
        })}

        {/* Y-axis labels */}
        {[0, 5, 10, 15, 20, 25, 30].map((val, idx) => {
          const y =
            height - padding - (val / maxVisitor) * (height - 2 * padding);
          return (
            <text
              key={idx}
              x={padding - 10}
              y={y + 4}
              fontSize="10"
              textAnchor="end"
              fill="#333"
            >
              {val}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
