import React from "react";
import "./TransactionBreakdown.css";
const TransactionBreakDown = (props: any) => {
  let transactionNumber = 0;
  let conversionFeeNumber = 0;
  let transactionFeeNumber = 0;

  const transactions = props.transactions;
  transactionNumber = transactions.length;
  transactions.forEach((transaction: any) => {
    conversionFeeNumber += transaction.convFee;
    transactionFeeNumber += transaction.transFee;
  });
  return (
    <div className={"row divstyle"}>
      <div className={"col"}>
        <div className={"transaction-card"}>
          <div>
            <p>Transactions:</p>
            <p>{transactionNumber}</p>
          </div>
        </div>
      </div>
      <div className={"col"}>
        <div className={"transaction-card"}>
          <div>
            <p>Conversion Fees:</p>
            <p>${conversionFeeNumber}</p>
          </div>
        </div>
      </div>
      <div className={"col"}>
        <div className={"transaction-card"}>
          <div>
            <p>Transaction Fees:</p>
            <p>${transactionFeeNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionBreakDown;
