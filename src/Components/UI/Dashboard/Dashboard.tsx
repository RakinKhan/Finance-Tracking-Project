import React, { useState } from "react";
import LeftSideBar from "./LeftSideBar/LeftSideBar";
import MiddleBar from "./MiddleBar/MiddleBar";
import RightSideBar from "./RightSideBar/RightSideBar";

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
