import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";

Chart.register(CategoryScale);

const sampleData = [
  {
    id: 1,
    label: "2-wheels",
    count: 121,
  },
  {
    id: 3,
    label: "4-wheels",
    count: 40,
  },
];

function VehicleCountPieChart() {
  const [chartData, setChartData] = useState({
    labels: ["2-wheels", "4-wheels"],

    datasets: [
      {
        label: "Vehicle count",
        data: sampleData.map((x) => x.count),
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  });
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
        maintainAspectRatio: false
      }}
      style={{ margin: "0 auto", height: '80%', marginTop: '1.5em' }}
    />
  );
}

export default VehicleCountPieChart;
