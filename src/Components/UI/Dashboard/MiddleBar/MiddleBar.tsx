import React, { useState } from "react";
import "./MiddleBar.css";
import AddTransaction from "./AddTransaction/AddTransaction";
const MiddleBar = () => {
  const transactions = [];
  const transaction = {
    date: "",
    account: "",
    stock: "",
    amount: "",
    currencyConvFee: "",
    transactionFee: "",
    type: "",
  };

  const [addingTransaction, setAddingTransaction] = useState(false);

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
                <AddTransaction afterSubmit={setAddingTransaction} />
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
                  <tr>
                    <td>Date</td>
                    <td>TFSA</td>
                    <td>OUST</td>
                    <td>500</td>
                    <td>5000</td>
                    <td style={{ width: "20%" }}>300</td>
                    <td>5</td>
                    <td>Buy</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>TFSA</td>
                    <td>OUST</td>
                    <td>500</td>
                    <td>5000</td>
                    <td style={{ width: "20%" }}>300</td>
                    <td>5</td>
                    <td>Buy</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>TFSA</td>
                    <td>OUST</td>
                    <td>500</td>
                    <td>5000</td>
                    <td style={{ width: "20%" }}>300</td>
                    <td>5</td>
                    <td>Buy</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>TFSA</td>
                    <td>OUST</td>
                    <td>500</td>
                    <td>5000</td>
                    <td style={{ width: "20%" }}>300</td>
                    <td>5</td>
                    <td>Buy</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>TFSA</td>
                    <td>OUST</td>
                    <td>500</td>
                    <td>5000</td>
                    <td style={{ width: "20%" }}>300</td>
                    <td>5</td>
                    <td>Buy</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>TFSA</td>
                    <td>OUST</td>
                    <td>500</td>
                    <td>5000</td>
                    <td style={{ width: "20%" }}>300</td>
                    <td>5</td>
                    <td>Buy</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>TFSA</td>
                    <td>OUST</td>
                    <td>500</td>
                    <td>5000</td>
                    <td style={{ width: "20%" }}>300</td>
                    <td>5</td>
                    <td>Buy</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>TFSA</td>
                    <td>OUST</td>
                    <td>500</td>
                    <td>5000</td>
                    <td style={{ width: "20%" }}>300</td>
                    <td>5</td>
                    <td>Buy</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>TFSA</td>
                    <td>OUST</td>
                    <td>500</td>
                    <td>5000</td>
                    <td style={{ width: "20%" }}>300</td>
                    <td>5</td>
                    <td>Buy</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>TFSA</td>
                    <td>OUST</td>
                    <td>500</td>
                    <td>5000</td>
                    <td style={{ width: "20%" }}>300</td>
                    <td>5</td>
                    <td>Buy</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>TFSA</td>
                    <td>OUST</td>
                    <td>500</td>
                    <td>5000</td>
                    <td style={{ width: "20%" }}>300</td>
                    <td>5</td>
                    <td>Buy</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>TFSA</td>
                    <td>OUST</td>
                    <td>500</td>
                    <td>5000</td>
                    <td style={{ width: "20%" }}>300</td>
                    <td>5</td>
                    <td>Buy</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>TFSA</td>
                    <td>OUST</td>
                    <td>500</td>
                    <td>5000</td>
                    <td style={{ width: "20%" }}>300</td>
                    <td>5</td>
                    <td>Buy</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>TFSA</td>
                    <td>OUST</td>
                    <td>500</td>
                    <td>5000</td>
                    <td style={{ width: "20%" }}>300</td>
                    <td>5</td>
                    <td>Buy</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>TFSA</td>
                    <td>OUST</td>
                    <td>500</td>
                    <td>5000</td>
                    <td style={{ width: "20%" }}>300</td>
                    <td>5</td>
                    <td>Buy</td>
                  </tr>
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
