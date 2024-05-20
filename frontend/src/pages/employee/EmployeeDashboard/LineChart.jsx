import { Line } from "react-chartjs-2";

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() =>
        Math.floor(Math.random() * (1001 - -1000) + -1000)
      ),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() =>
        Math.floor(Math.random() * (1001 - -1000) + -1000)
      ),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

function LineChart() {
  return (
    <Line
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
        maintainAspectRatio: false,
      }}
      data={data}
      style={{ width: "100%" }}
    />
  );
}

export default LineChart;
