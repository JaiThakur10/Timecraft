import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function ProgressChart({ activities }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (activities.length > 0) {
      const labels = activities.map((item) => item.activity);
      const data = activities.map((item) => item.hours);

      const chart = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Hours Spent",
              data: data,
              backgroundColor: "rgba(59, 130, 246, 0.5)",
              borderColor: "rgba(59, 130, 246, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      return () => chart.destroy(); // Cleanup on unmount
    }
  }, [activities]);

  return <canvas ref={chartRef} />;
}
