import React, { useState, useReducer } from "react";
import ReactDOM from "react-dom";
import "./AddTransaction.css";

const ACTIONS = {};
const reducer = (state: any, action: any) => {};

const Form = (props: any) => {
  const modal: HTMLElement = document.getElementById("add")!;

  window.onclick = (e: any) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };

  const [transactionInput, setTransactionInput] = useState({
    date: "",
    account: "",
    stock: "",
    shares: "",
    amount: "",
    convFee: "",
    transFee: "",
    type: "",
  });

  interface Transaction {
    date: Date;
    account: string;
    stock: string;
    shares: number;
    amount: number;
    convFee: number;
    transFee: number;
    type: string;
  }

  const dateHandler = (e: any) => {
    setTransactionInput({
      ...transactionInput,
      date: e.target.value,
    });
  };

  const accountHandler = (e: any) => {
    setTransactionInput({
      ...transactionInput,
      account: e.target.value,
    });
  };

  const stockHandler = (e: any) => {
    setTransactionInput({
      ...transactionInput,
      stock: e.target.value,
    });
  };

  const sharesHandler = (e: any) => {
    setTransactionInput({
      ...transactionInput,
      shares: e.target.value,
    });
  };

  const amountHandler = (e: any) => {
    setTransactionInput({
      ...transactionInput,
      amount: e.target.value,
    });
  };

  const convFeeHandler = (e: any) => {
    setTransactionInput({
      ...transactionInput,
      convFee: e.target.value,
    });
  };

  const transFeeHandler = (e: any) => {
    setTransactionInput({
      ...transactionInput,
      transFee: e.target.value,
    });
  };

  const typeHandler = (e: any) => {
    setTransactionInput({
      ...transactionInput,
      type: e.target.value,
    });
  };
  const transaction: Transaction = {
    date: new Date(transactionInput.date),
    account: transactionInput.account,
    stock: transactionInput.stock.toUpperCase(),
    shares: +transactionInput.shares,
    amount: +transactionInput.amount,
    convFee: +transactionInput.convFee,
    transFee: +transactionInput.transFee,
    type: transactionInput.type,
  };

  const closeTransaction = (e: any) => {
    props.newTransaction(transaction);
    props.afterSubmit(false);
    modal.style.display = "none";
  };

  return (
    <form onSubmit={closeTransaction} className={"modal-content"}>
      <div>
        <div className={"modal-items"}>
          <label>Date</label>
          <input type="date" min="2000-01-01" onChange={dateHandler} required />
        </div>
        <div className={"modal-items"}>
          <label>Account</label>
          <input type="text" onChange={accountHandler} required />
        </div>
        <div className={"modal-items"}>
          <label>Stock</label>
          <input type="text" onChange={stockHandler} required />
        </div>
        <div className={"modal-items"}>
          <label>Shares</label>
          <input
            type="number"
            min="1"
            step="1"
            onChange={sharesHandler}
            required
          />
        </div>
        <div className={"modal-items"}>
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            onChange={amountHandler}
            required
          />
        </div>
        <div className={"modal-items"}>
          <label>Currency Conversion Fee</label>
          <input type="number" min="0" step="0.01" onChange={convFeeHandler} />
        </div>
        <div className={"modal-items"}>
          <label>Tranaction Fee</label>
          <input type="number" min="0" step="0.01" onChange={transFeeHandler} />
        </div>
        <div className={"modal-items"}>
          <label>Type</label>
          <div className="buy-sell">
            <input
              type="radio"
              name="type"
              value="BUY"
              onChange={typeHandler}
              required
            />
            <label htmlFor="buy">BUY</label>
            <input
              type="radio"
              name="type"
              value="SELL"
              onChange={typeHandler}
            />
            <label htmlFor="sell">SELL</label>
          </div>
        </div>
        <button type="submit">Add Transaction</button>
      </div>
    </form>
  );
};

const AddTransaction = (props: any) => {
  const addDiv: HTMLElement = document.getElementById("add")!;
  return (
    <>
      {ReactDOM.createPortal(
        <Form
          afterSubmit={props.afterSubmit}
          newTransaction={props.newTransaction}
        />,
        addDiv
      )}
    </>
  );
};

export default AddTransaction;
