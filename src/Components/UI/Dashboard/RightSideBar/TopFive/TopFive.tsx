import React from "react";
import "./TopFive.css";

const TopFive = (props: any) => {
  const transactions = props.transaction;
  let averages = [] as any;
  let name = [] as any;

  const sumShares = (shares: any) =>
    shares.reduce((a: any, b: any) => a + b, 0);

  transactions.forEach((transaction: any) => {
    if (!name.includes(transaction.stock)) {
      name.push(transaction.stock);
    }
  });
  name.forEach((name: any) => {
    let transactionHistory = transactions.filter(
      (transaction: any) => transaction.stock === name
    );
    let buy = [] as any;
    let sell = [] as any;
    let amount = [] as any;

    transactionHistory.forEach((transaction: any) => {
      if (transaction.type === "BUY") {
        buy.push(transaction.shares);
        amount.push(transaction.amount);
      } else {
        sell.push(transaction.shares);
      }
    });
    let totalBuys = sumShares(buy);
    let totalSells = sumShares(sell);
    if (totalBuys > totalSells) {
      averages.push({
        name: name,
        averageCost: sumShares(amount) / totalBuys,
      });
    }
  });
  console.log(averages);
  return (
    <div className={"divstyle"}>
      <div className={"top-performers-header"}>Top Performers</div>
      <div className={"topfive"}>
        <div className={"topfive-card"}>{}</div>
        <div className={"topfive-card"}>{}</div>
        <div className={"topfive-card"}>{}</div>
        <div className={"topfive-card"}>{}</div>
        <div className={"topfive-card"}>{}</div>
      </div>
    </div>
  );
};

export default TopFive;
