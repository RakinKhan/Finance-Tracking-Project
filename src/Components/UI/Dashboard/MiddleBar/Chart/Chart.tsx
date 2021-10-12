import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment";

const sumShares = (shares: any) => shares.reduce((a: any, b: any) => a + b, 0);

const Chart = (props: any) => {
  const transactions = props.transaction;
  const priceHistory = props.priceHistory;
  const buy = [] as any;
  const sell = [] as any;
  const labels = [] as any;
  const bookValue = [] as any;
  console.log(transactions);
  let bookCost = 0;

  priceHistory.forEach((history: any) => {
    const datePrice = history.price;
    const indivStockTransactions = transactions.filter(
      (transaction: any) => transaction.stock === history.stock
    );
    indivStockTransactions.forEach((transaction: any) => {
      if (transaction.type === "BUY") {
        const priceOfDay = datePrice.find(
          (dP: any) =>
            dP.date.getTime() / 1000 === transaction.date.getTime() / 1000
        );
        console.log(transaction.date, priceOfDay.date);
        console.log({ stock: history.stock, dateAndPrice: priceOfDay });
      }
    });
  });

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
