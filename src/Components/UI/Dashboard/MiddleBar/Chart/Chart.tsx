import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment";
const Chart = (props: any) => {
  const buys = [
    { x: "2021-06-24", y: 30 },
    { x: "2021-06-25", y: 20 },
    { x: "2021-06-26", y: 15 },
    { x: "2021-06-27", y: 20 },
    { x: "2021-07-28", y: 10 },
  ] as any;
  const data = {
    type: "bar",
    datasets: [
      {
        label: "Hello",
        data: buys,
        borderColor: "green",
        fill: false,
      },
    ],
  };
  return (
    <div>
      <Line
        data={data}
        options={{
          plugins: {
            responsive: true,
            title: {
              display: true,
              text: "Average Rainfall per month",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          },
          scales: {
            x: {
              type: "time",
              time: {
                displayFormats: {
                  quarter: "MMM YYYY",
                },
                unit: "day",
              },
            },
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default Chart;
