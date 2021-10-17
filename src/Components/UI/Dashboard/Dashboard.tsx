import React, { useState, useEffect } from "react";
import LeftSideBar from "./LeftSideBar/LeftSideBar";
import MiddleBar from "./MiddleBar/MiddleBar";
import RightSideBar from "./RightSideBar/RightSideBar";

const socket = new WebSocket("wss://ws.finnhub.io?token=bprteb7rh5r8s3uvb2ag");

const Dashboard = () => {
  const [transactionsAll, setTransactionsAll] = useState([] as any);
  const [pricesAll, setPricesAll] = useState([] as any);

  const transactionsAllHandler = (transactionsHistory: any) => {
    setTransactionsAll(transactionsHistory);
  };
  const pricesAllHandler = (pricesAllHistory: any) => {
    setPricesAll(pricesAllHistory);
  };

  return (
    <div className={"container pageheight"}>
      <LeftSideBar />
      <MiddleBar
        transactionsAll={transactionsAllHandler}
        pricesAll={pricesAllHandler}
      />
      <RightSideBar transactions={transactionsAll} prices={pricesAll} />
    </div>
  );
};

export default Dashboard;
