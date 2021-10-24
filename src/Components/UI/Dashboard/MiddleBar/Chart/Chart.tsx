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
  const priceHistoryDayAll = [] as any;
  let stockNames = [] as any;
  const stockIntervals = [] as any;
  let bookCost = 0;

  transactions.forEach((transaction: any) => {
    if (!stockNames.includes(transaction.stock)) {
      stockNames.push(transaction.stock);
    }
  });

  if (transactions.length > 0) {
    dateCollection = dateRange(transactions[0].date);
    dateCollection.forEach((date: any) => {
      const startDate = date;
      let priceTotal = 0;
      for (let i = 0; i < priceHistory.length; i++) {
        const startDate2 = transactions.filter(
          (transaction: any) => transaction.stock === priceHistory[i].stock
        )[0].date;
        const found = priceHistory[i].priceHistory.find(
          (stock: any) => stock.date.getTime() === startDate.getTime()
        );
        if (
          found !== undefined &&
          startDate.getTime() >= startDate2.getTime()
        ) {
          priceTotal += found.price;
        }
      }
      if (priceTotal !== 0) {
        priceHistoryDayAll.push({ x: startDate, y: priceTotal });
      }
    });
    stockNames.forEach((stock: any) => {
      const allStockTransactions = transactions.filter(
        (transaction: any) => transaction.stock === stock
      );
      let stockname = stock;
      let ownershipRange = [] as any;
      let amountTotal = 0;
      let date: any;
      allStockTransactions.forEach((transaction: any) => {
        if (transaction.type === "BUY") {
          amountTotal += transaction.shares;
          date = transaction.date;
          ownershipRange.push({
            amount: amountTotal,
            date: transaction.date,
          });
        } else if (transaction.type === "SELL") {
          amountTotal -= transaction.shares;
          date = transaction.date;
          ownershipRange.push({
            amount: amountTotal,
            date: transaction.date,
          });
        }
      });
      stockIntervals.push({
        stockName: stockname,
        ownershipRange: ownershipRange,
      });
    });
  }

  const marketValues = (
    stockNames: any,
    priceHistory: any,
    stockIntervals: any
  ) => {
    const names = stockNames;
    const history = priceHistory;
    const intervals = stockIntervals;

    names.forEach((name: any) => {
      const found = history.find((stock: any) => stock.stock === name);
      console.log(found?.priceHistory);
    });
    return "its working";
  };
  console.log(marketValues(stockNames, priceHistory, stockIntervals));
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
  const data = {
    labels: dateCollection,
    datasets: [
      {
        type: "line",
        label: "Book Value",
        data: priceHistoryDayAll,
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

export default React.memo(Chart);
