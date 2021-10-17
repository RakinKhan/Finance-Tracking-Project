import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment";

const sumShares = (shares: any) => shares.reduce((a: any, b: any) => a + b, 0);

const dateRange = (start: any) => {
  let dates = [] as any;
  let startDate = start.getTime();
  const today = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  ).getTime();
  let currentDate = startDate;
  while (currentDate <= today) {
    dates.push(new Date(currentDate));
    currentDate += 86400000;
  }
  return dates;
};

const Chart = (props: any) => {
  const transactions = props.transaction;
  const priceHistory = props.priceHistory;
  const buy = [] as any;
  const sell = [] as any;
  const labels = [] as any;
  const bookValue = [] as any;
  let dateCollection = [] as any;
  let bookCost = 0;
  if (transactions.length > 0) {
    dateCollection = dateRange(transactions[0].date);
  }

  console.log(dateCollection);
  transactions.forEach((transaction: any) => {
    let x = transaction.date;
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
  console.log(labels);
  const data = {
    labels: dateCollection,
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
              type: "timeseries",
              time: {
                unit: "day",
              },
              title: {
                display: true,
                text: "Date",
              },
              grid: {
                display: false,
              },
            },
            y: {
              stacked: true,
              beginAtZero: true,
              title: {
                display: true,
                text: "Value",
              },
              grid: {
                display: false,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default Chart;
