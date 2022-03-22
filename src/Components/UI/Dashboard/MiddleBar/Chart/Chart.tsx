import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment";
import moment from "moment";

const dateRange = (start: any) => {
  let dates = [] as any;
  let startDate = start
  const today = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  ).getTime();
  let currentDate = moment(startDate);
  while (currentDate <= moment(today)) {
    dates.push(new Date(currentDate.format('YYYY/MM/DD')));
    currentDate = moment(currentDate).add(1, 'days')
  }
  return dates;
};

const marketValues = (
  stockNames: any,
  priceHistory: any,
  stockIntervals: any, dateCollection: any
) => {
  const names = stockNames;
  const history = priceHistory;
  const intervals = stockIntervals;
  const dates = dateCollection;
  const marketValues = [] as any;
  const values = [] as any;
  names.forEach((name: any) => {
    const foundIntervals = intervals.find(
      (stock: any) => stock.stockName === name
    ).ownershipRange;
    const foundHistory = history
      .find((stock: any) => stock.stock === name)
      .priceHistory.filter(
        (range: any) => range.date.getTime() >= foundIntervals[0].date.getTime()
      );

    if (foundIntervals.length === 1) {
      let amount = foundIntervals[0].amount;
      foundHistory.forEach((datePrice: any) => {
        marketValues.push({
          date: datePrice.date,
          marketValue: datePrice.price * amount,
        });
      });
    } else if (foundIntervals.length > 1) {
      let amount = foundIntervals[0].amount;
      for (let i = 0; i < foundIntervals.length-1; i++) {
        foundHistory.forEach((datePrice: any) => {
          if (
            datePrice.date.getTime() >= foundIntervals[i].date.getTime() &&
            datePrice.date.getTime() < foundIntervals[i + 1].date.getTime()
          ) {
            if (amount !== 0) {
              marketValues.push({
                date: datePrice.date,
                marketValue: datePrice.price * amount,
                amount: amount
              });
            }
          }
        });
        amount = foundIntervals[i + 1].amount;
      }

      if (amount !== 0) {
        const lastToNow = foundHistory.filter(
          (datePrice: any) =>
            datePrice.date.getTime() >=
            foundIntervals[foundIntervals.length - 1].date.getTime()
        );
        lastToNow.forEach((datePrice: any) => {
          marketValues.push({
            date: datePrice.date,
            marketValue: datePrice.price * amount,
            amount: amount
          });
        });
      }
    }
  });
  dates.forEach((idate:any) => {
    const found = marketValues.filter(({date}: any) => date.getTime() === idate.getTime())
    if (found.length === 1) {
      values.push({
        x: idate,
        y: found[0].marketValue
      })
    } else if (found.length > 1) {
      let mv = 0
      found.forEach((data:any) => mv += data.marketValue)
      values.push({
        x: idate,
        y: mv
      })
    }
  })
  return values;
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
        data: marketValues(stockNames, priceHistory, stockIntervals, dateCollection),
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
