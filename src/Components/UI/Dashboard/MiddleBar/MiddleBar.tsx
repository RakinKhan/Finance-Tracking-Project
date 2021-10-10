import React, { useState, useEffect } from "react";
import "./MiddleBar.css";
import AddTransaction from "./AddTransaction/AddTransaction";
import TransactionTable from "./TransactionTable/TransactionTable";
import Chart from "./Chart/Chart";
import TransactionBreakDown from "./TransactionBreakdown/TransactionBreakdown";

const MiddleBar = (props: any) => {
  const [transactions, setTransactions] = useState([] as any);
  const [priceHistory, setPriceHistory] = useState([] as any);
  const fetchPrice = async (stock: any) => {
    const response = await fetch(
      `https://finnhub.io/api/v1/stock/candle?symbol=${stock}&resolution=D&from=1609477200&to=1640926800&token=bprteb7rh5r8s3uvb2ag`
    );
    const data = await response.json();
    let priceHistory = [] as any;
    for (let i = 0; i < data.c.length; i++) {
      priceHistory.push({
        timeUNIX: data.t[i],
        price: data.c[i],
      });
    }
    const block = {
      stock: stock,
      price: priceHistory,
    };
    setPriceHistory((prevAverages: any) => {
      return [...prevAverages, block];
    });
  };

  let totalAmount = 0;
  const transactionsHandler = (transaction: any) => {
    let stock = transaction.stock;
    let list = priceHistory.map((price: any) => price.stock);
    if (!list.includes(stock)) {
      fetchPrice(stock);
    }
    setTransactions((previousTransaction: any) => {
      return [...previousTransaction, { ...transaction, key: Math.random() }];
    });
  };

  const [addingTransaction, setAddingTransaction] = useState(false);
  transactions.sort((a: any, b: any) => {
    return a.date - b.date;
  });
  transactions.forEach((transaction: any) => {
    if (transaction.type === "BUY") {
      totalAmount += transaction.amount;
    } else {
      totalAmount -= transaction.amount;
    }
  });

  const addTransactionHandler = (e: any) => {
    setAddingTransaction(true);
    const modal: HTMLElement = document.getElementById("add")!;
    modal.style.display = "block";
  };

  useEffect(() => {
    let currentPrices = priceHistory.map((stockPrice: any) => {
      return {
        stock: stockPrice.stock,
        price: stockPrice.price[stockPrice.price.length - 1]["price"],
      };
    });
    props.transactionsAll(transactions);
    props.pricesAll(currentPrices);
  }, [transactions, priceHistory]);

  return (
    <div className={"middlebar"}>
      <div className={"middlebar-header"}>
        <div className={"header-overview"}>
          <h3>Overview</h3>
          <p>Welcome back, Rakin!</p>
        </div>
        <div className={"header-balance"}>
          <h3>Balance</h3>
          <p>
            {" "}
            <>$</>
            {totalAmount}
          </p>
        </div>
      </div>
      <div className={"middlebar-body"}>
        <div className={"middlebar-chart"}>
          <Chart transaction={transactions} />
        </div>
        <div className={"transaction-breakdown"}>
          <TransactionBreakDown transactions={transactions} />
        </div>
        <div className={"middlebar-transactions"}>
          <div className={"transactions-list"}>
            <div style={{ height: "auto" }}>
              <h5>Transaction History</h5>
              <button
                className={"add-transaction"}
                onClick={addTransactionHandler}
              >
                Add Transaction
              </button>
              {addingTransaction && (
                <AddTransaction
                  afterSubmit={setAddingTransaction}
                  newTransaction={transactionsHandler}
                />
              )}
            </div>
            <TransactionTable transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiddleBar;
