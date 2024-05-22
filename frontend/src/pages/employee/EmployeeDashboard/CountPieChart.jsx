import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

function VehicleCountPieChart({ twoWheelCount, fourWheelCount }) {
  const [chartData, setChartData] = useState({
    labels: ["2-wheels", "4-wheels"],
    datasets: [
      {
        label: "Vehicle count",
        data: [0, 0], // Initialize with default values
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  });

  useEffect(() => {
    setChartData({
      labels: ["2-wheels", "4-wheels"],
      datasets: [
        {
          label: "Vehicle count",
          data: [twoWheelCount, fourWheelCount], // Update data with prop values
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
          hoverOffset: 4,
        },
      ],
    });
  }, [twoWheelCount, fourWheelCount]); // Run effect when props change

  return (
    <Pie
      data={chartData}
      options={{
        plugins: {
          legend: {
            position: "right",
            align: "middle",
          },
        },
        maintainAspectRatio: false,
      }}
      style={{ margin: "0 auto", height: '80%', marginTop: '1.5em' }}
    />
  );
}

export default VehicleCountPieChart;
