import React, { useState } from "react";
import "./MiddleBar.css";
import AddTransaction from "./AddTransaction/AddTransaction";

const MiddleBar = () => {
  const [transactions, setTransactions] = useState([] as any);

  const transactionsHandler = (transaction: any) => {
    setTransactions((previousTransaction: any) => {
      return [...previousTransaction, { ...transaction, key: Math.random() }];
    });
  };
  const [addingTransaction, setAddingTransaction] = useState(false);
  console.log(transactions);
  return (
    <div className={"middlebar"}>
      <div className={"middlebar-header"}>
        <div className={"header-overview"}>
          <h3>Overview</h3>
          <p>Welcome back, Rakin!</p>
        </div>
        <div className={"header-balance"}>
          <h3>Balance</h3>
          <p>$A lot</p>
        </div>
      </div>
      <div className={"middlebar-body"}>
        <div className={"middlebar-chart"}></div>
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
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th style={{ width: "10%" }} scope="col">
                      Date
                    </th>
                    <th scope="col">Account</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Shares</th>
                    <th scope="col">Amount</th>
                    <th scope="col" style={{ width: "20%" }}>
                      Currency Conv. Fee
                    </th>
                    <th scope="col">Trans. Fee</th>
                    <th scope="col">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction: any) => (
                    <tr key={transaction.key}>
                      <td>{transaction.date.getMonth()}</td>
                      <td>{transaction.account}</td>
                      <td>{transaction.stock}</td>
                      <td>{transaction.shares}</td>
                      <td>{transaction.amount}</td>
                      <td style={{ width: "20%" }}>{transaction.convFee}</td>
                      <td>{transaction.transFee}</td>
                      <td>{transaction.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiddleBar;
