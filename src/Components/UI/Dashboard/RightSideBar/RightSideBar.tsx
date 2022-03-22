import React, {useContext} from "react";
import "./RightSideBar.css";
import BreakdownPie from "./BreakdownPie/BreakdownPie";
import TopFive from "./TopFive/TopFive";
import { TransactionsContext } from "../../../../TransactionsContext"; 
const sumShares = (shares: any) => shares.reduce((a: any, b: any) => a + b, 0);

let backgroundColor = [] as any;

const RightSideBar = (props: any) => {
  const {transactionsAll} = useContext(TransactionsContext)
  let stockName = [] as any;
  let labels = [] as any;
  let datapoints = [] as any;
  let averages = [] as any;
  transactionsAll.forEach((transaction: any) => {
    if (!stockName.includes(transaction.stock)) {
      stockName.push(transaction.stock);
    }
  });

  stockName.forEach((stock: any) => {
    const allStockTransactions = transactionsAll.filter(
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
      averages.push({
        stock: stock,
        sharesHeld: sharesBought - sharesSold,
        averageCost: (sumShares(amount) / sharesBought).toFixed(2),
        id: Math.random(),
      });
    }
  });



  return (
    <div className={"rightsidebar"}>
      <div className={"profit"}></div>
      <div className={"portfolio-pie"}>
        <BreakdownPie
          backgroundColor={backgroundColor}
          labels={labels}
          datapoints={datapoints}
        />
      </div>
      <div className={"top-five"}>
        <TopFive averages={averages} labels={labels}/>
      </div>
    </div>
  );
};

export default RightSideBar;
