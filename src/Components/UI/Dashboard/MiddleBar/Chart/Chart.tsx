import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment";

const Chart = (props: any) => {
  const transactions = props.transaction;
  const buy = [] as any;
  const sell = [] as any;
  const labels = [] as any;
  const bookValue = [] as any;
  let bookCost = 0;
  transactions.forEach((transaction: any) => {
    let x = new Date(transaction.date);
    let y = transaction.amount;
    labels.push(x);
    if (transaction.type === "BUY") {
      bookCost += transaction.amount;
      bookValue.push({
        x: x,
        y: bookCost,
      });
      return buy.push({
        x: x,
        y: y,
      });
    } else {
      bookCost -= transaction.amount;
      bookValue.push({
        x: x,
        y: bookCost,
      });
      return sell.push({
        x: x,
        y: y,
      });
    }
  });

  const data = {
    labels: labels,
    datasets: [
      {
        type: "line",
        label: "Book Value",
        data: bookValue,
        backgroundColor: "gray",
        fill: false,
      },
      {
        type: "bar",
        label: "Buy",
        data: buy,
        backgroundColor: "green",
        fill: false,
        stack: "combined",
      },
      {
        type: "bar",
        label: "Sell",
        data: sell,
        backgroundColor: "purple",
        fill: false,
        stack: "combined",
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
              text: "Portfolio",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "top",
            },
          },
          scales: {
            x: {
              type: "time",
              time: {
                unit: "day",
              },
            },
            y: {
              stacked: true,
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default Chart;
