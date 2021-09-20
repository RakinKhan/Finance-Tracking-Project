import React from "react";
import { Doughnut } from "react-chartjs-2";

let backgroundColor = [] as any;

const BreakdownPie = (props: any) => {
  const transactions = props.transactions;
  let stockName = [] as any;
  let labels = [] as any;
  let datapoints = [] as any;

  const sumShares = (shares: any) =>
    shares.reduce((a: any, b: any) => a + b, 0);

  transactions.forEach((transaction: any) => {
    let stock = transaction.stock;
    if (!stockName.includes(stock)) {
      stockName.push(stock);
    }
  });

  stockName.forEach((stock: any) => {
    const allStockTransactions = transactions.filter(
      (transaction: any) => transaction.stock === stock
    );
    let buy = [] as any;
    let sell = [] as any;
    let amount = [] as any;
    allStockTransactions.forEach((transaction: any) => {
      if (transaction.type === "BUY") {
        amount.push(transaction.amount);
        buy.push(transaction.shares);
      } else if (transaction.type === "SELL") {
        sell.push(transaction.shares);
      }
    });
    const sharesBought = sumShares(buy);
    const sharesSold = sumShares(sell);

    if (sharesBought > sharesSold) {
      labels.push(stock);
      datapoints.push(sharesBought - sharesSold);
      backgroundColor.push(
        `rgb(${Math.floor(Math.random() * 255) + 1},${
          Math.floor(Math.random() * 255) + 1
        },${Math.floor(Math.random() * 255) + 1})`
      );
    }
  });

  const dataset = {
    labels: labels,
    datasets: [
      {
        data: datapoints,
        backgroundColor: backgroundColor,
        hoverOffset: 2,
      },
    ],
  };

  console.log(labels, datapoints);
  return (
    <>
      <Doughnut
        data={dataset}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "bottom",
            },
            title: {
              display: true,
              text: "Portfolio",
            },
          },
        }}
      />
    </>
  );
};

export default BreakdownPie;
