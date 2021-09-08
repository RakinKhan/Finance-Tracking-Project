import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment";

const Chart = (props: any) => {
  const transactions = props.transaction;
  const buy = [] as any;
  const sell = [] as any;
  transactions.forEach((transaction: any) => {
    let x = new Date(transaction.date);
    let y = transaction.amount;
    if (transaction.type === "BUY") {
      return buy.push({
        x: x,
        y: y,
      });
    } else {
      return sell.push({
        x: x,
        y: y,
      });
    }
  });
  console.log(buy);
  console.log(sell);
  const buys = [
    { x: new Date("Wed Jul 14 2021"), y: 30 },
    { x: "2021-06-25", y: 20 },
    { x: "2021-06-26", y: 15 },
    { x: "2021-06-27", y: 20 },
    { x: "2021-07-28", y: 10 },
  ] as any;
  const data = {
    datasets: [
      {
        type: "bar",
        label: "Buy",
        data: buy,
        backgroundColor: "green",
        fill: false,
      },
      {
        type: "bar",
        label: "Sell",
        data: sell,
        backgroundColor: "purple",
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
                unit: "month",
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
