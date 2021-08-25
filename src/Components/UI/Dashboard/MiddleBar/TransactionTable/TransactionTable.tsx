import React from "react";
import "./TransactionTable.css";
const TransactionTable = (props: any) => {
  return (
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
          {props.transactions.map((transaction: any) => (
            <tr key={transaction.key}>
              <td>{`${transaction.date.getDate()}-${transaction.date.getMonth()}-${transaction.date.getFullYear()}`}</td>
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
  );
};

export default TransactionTable;
