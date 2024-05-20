import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";
import Chart from "chart.js/auto";

function LineChart({ users }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Staff Applications",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Student Applications",
        data: [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  });

  useEffect(() => {
    // Process users data to get unique dates and counts for staff and non-staff
    const staffDateCountMap = new Map();
    const nonStaffDateCountMap = new Map();

    users.forEach(user => {
      const date = format(new Date(user.dateApplied), "MM-dd-yyyy");
      if (user.isStaff) {
        if (staffDateCountMap.has(date)) {
          staffDateCountMap.set(date, staffDateCountMap.get(date) + 1);
        } else {
          staffDateCountMap.set(date, 1);
        }
      } else {
        if (nonStaffDateCountMap.has(date)) {
          nonStaffDateCountMap.set(date, nonStaffDateCountMap.get(date) + 1);
        } else {
          nonStaffDateCountMap.set(date, 1);
        }
      }
    });

    const labels = Array.from(new Set([...staffDateCountMap.keys(), ...nonStaffDateCountMap.keys()])).sort((a, b) => new Date(a) - new Date(b));
    const staffData = labels.map(label => staffDateCountMap.get(label) || 0);
    const nonStaffData = labels.map(label => nonStaffDateCountMap.get(label) || 0);

    setChartData({
      labels,
      datasets: [
        {
          label: "Staff Applications",
          data: staffData,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Student Applications",
          data: nonStaffData,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    });
  }, [users]);

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
      data={chartData}
      style={{ width: "100%" }}
    />
  );
}

export default LineChart;
