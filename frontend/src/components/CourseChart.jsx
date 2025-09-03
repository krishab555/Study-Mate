import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const BestSellingCourseChart = () => {
  const data = {
    labels: ["React", "Node.js", "Python"],
    datasets: [
      {
        label: "Sales",
        data: [10, 20, 50],
        backgroundColor: ["#c0392b", "#3498db", "#f39c12"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
        Best Selling Course
      </h3>
      <Pie data={data} options={options} />
    </div>
  );
};

export default BestSellingCourseChart;
