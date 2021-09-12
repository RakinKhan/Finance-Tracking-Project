import React from "react";
import "./TransactionBreakdown.css";
const TransactionBreakDown = (e: any) => {
  return (
    <div className={"row divstyle"}>
      <div className={"col"}>
        <div className={"transaction-card"}>
          <div>
            <p>Transactions:</p>
            <p>${6}</p>
          </div>
        </div>
      </div>
      <div className={"col"}>
        <div className={"transaction-card"}>Conversion Fees:</div>
      </div>
      <div className={"col"}>
        <div className={"transaction-card"}>Transaction Fees:</div>
      </div>
    </div>
  );
};

export default TransactionBreakDown;
