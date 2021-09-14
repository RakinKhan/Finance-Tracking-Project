import React, { useState, useEffect } from "react";
import "./MiddleBar.css";
import AddTransaction from "./AddTransaction/AddTransaction";
import TransactionTable from "./TransactionTable/TransactionTable";
import Chart from "./Chart/Chart";
import TransactionBreakDown from "./TransactionBreakdown/TransactionBreakdown";

const MiddleBar = (props: any) => {
  const [transactions, setTransactions] = useState([] as any);

  useEffect(() => {
    props.transactionsAll(transactions);
  }, [props, transactions]);
  let totalAmount = 0;
  const transactionsHandler = (transaction: any) => {
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

  return (
    <div className={"middlebar"}>
      <div className={"middlebar-header"}>
        <div className={"header-overview"}>
          <h3>Overview</h3>
          <p>Welcome back, Rakin!</p>
        </div>
        <div className={"header-balance"}>
          <h3>Balance</h3>
          <p>${totalAmount}</p>
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
                onClick={() => {
                  setAddingTransaction(true);
                  const modal: HTMLElement = document.getElementById("add")!;
                  modal.style.display = "block";
                }}
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
