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
        <div className={"transaction-card"}>
          <div>
            <p>Conversion Fees:</p>
            <p>${6}</p>
          </div>
        </div>
      </div>
      <div className={"col"}>
        <div className={"transaction-card"}>
          <div>
            <p>Transaction Fees:</p>
            <p>${6}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionBreakDown;
