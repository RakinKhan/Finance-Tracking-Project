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
      `https://sandbox.iexapis.com/stable/stock/${stock}/chart/max?token=Tpk_d74af26498e04009989e2c65053d1783`
    );
    const data = await response.json();
    const filteredData = data.map((dayData: any) => {
      return {
        date: new Date(dayData.date.replace(/-/g, "/")),
        price: dayData.close,
      };
    });

    const block = {
      stock: stock,
      price: filteredData,
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
      return stockPrice.stock;
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
          <Chart transaction={transactions} priceHistory={priceHistory} />
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
