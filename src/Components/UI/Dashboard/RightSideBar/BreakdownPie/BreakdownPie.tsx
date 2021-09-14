import React from "react";
import { Doughnut } from "react-chartjs-2";

const BreakdownPie = (props: any) => {
  const transactions = props.transactions;
  let data = [] as any;
  let point = [] as any;
  const sumShares = (shares: any) =>
    shares.reduce((a: any, b: any) => a + b, 0);
  transactions.forEach((transaction: any) => {
    let stock = transaction.stock;
    if (!data.includes(stock)) {
      data.push(stock);
    }
  });
  data.forEach((stock: any) => {
    const allStockTransactions = transactions.filter(
      (transaction: any) => transaction.stock === stock
    );
    let buy = [] as any;
    let sell = [] as any;
    allStockTransactions.forEach((transaction: any) => {
      if (transaction.type === "BUY") {
        buy.push(transaction.shares);
      } else if (transaction.type === "SELL") {
        sell.push(transaction.shares);
      }
    });
    const sharesBought = sumShares(buy);
    const sharesSold = sumShares(sell);
    if (sharesBought > sharesSold) {
      point.push({
        stock: stock,
        sharesTotal: sharesBought - sharesSold,
      });
    }
  });
  console.log(point);
  return (
    <div>
      <Doughnut data={{}} options={{}} />
    </div>
  );
};

export default BreakdownPie;
