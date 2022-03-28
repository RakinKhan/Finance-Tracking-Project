import React, { useState, useEffect, useRef, useContext} from "react";
import "./MiddleBar.css";
import AddTransaction from "./AddTransaction/AddTransaction";
import TransactionTable from "./TransactionTable/TransactionTable";
import Chart from "./Chart/Chart";
import TransactionBreakDown from "./TransactionBreakdown/TransactionBreakdown";
import { TransactionsContext } from "../../../../TransactionsContext";

const MiddleBar = (props: any) => {
  const transactions = useRef([] as any);
  const [priceHistory, setPriceHistory] = useState([] as any);
  const changeComponent = useRef(0);
  const comp = useRef(false)
  const {transactionsAll, setTransactionsAll} = useContext(TransactionsContext)
  let totalAmount = 0;

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
      priceHistory: filteredData,
    };
    setPriceHistory((prevHistory: any) => {
      return [...prevHistory, block];
    });
  };

  const transactionsHandler = (transaction: any) => {
    changeComponent.current = 1;
    transactions.current = [
      ...transactions.current,
      { ...transaction, key: Math.random() },
    ];
    let list = transactions.current.map((price: any) => price.stock);
    let list2 = priceHistory.map((price: any) => price.stock);
    list.forEach((stock: any) => {
      if (list2.includes(stock)) {
        changeComponent.current = 2;
      } else {
        changeComponent.current = 1;
      }
    });
    setTransactionsAll(transactions.current);
  };

  const [addingTransaction, setAddingTransaction] = useState(false);
  transactions.current.sort((a: any, b: any) => {
    return a.date - b.date;
  });
  transactions.current.forEach((transaction: any) => {
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
    let list = transactions.current.map((price: any) => price.stock);
    let list2 = priceHistory.map((price: any) => price.stock);
    let find = "";

    list.forEach((stock: any) => {
      if (!list2.includes(stock)) {
        find = stock;
      }
    });
    if (find) {
      console.log(find);
      comp.current = true
      fetchPrice(find);
      changeComponent.current = 2
    }
    
  }, [transactions.current]);

  console.log(changeComponent.current);
  console.log(comp.current);
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
          {" "}
          {changeComponent.current === 2 && (
            <Chart
              transaction={transactions.current}
              priceHistory={priceHistory}
            />
          )}
          {changeComponent.current === 0 && "Please add"}
          {changeComponent.current === 1 && "Loading..."}
        </div>
        <div className={"transaction-breakdown"}>
          <TransactionBreakDown transactions={transactions.current} />
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
            <TransactionTable transactions={transactions.current} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MiddleBar);
