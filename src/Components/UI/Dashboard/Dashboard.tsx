import React, { useState } from "react";
import LeftSideBar from "./LeftSideBar/LeftSideBar";
import MiddleBar from "./MiddleBar/MiddleBar";
import RightSideBar from "./RightSideBar/RightSideBar";

const Dashboard = () => {
  const [transactionsAll, setTransactionsAll] = useState([] as any);
  const transactionsAllHandler = (transactionsHistory: any) => {
    setTransactionsAll(transactionsHistory);
  };

  return (
    <div className={"container pageheight"}>
      <LeftSideBar />
      <MiddleBar transactionsAll={transactionsAllHandler} />
      <RightSideBar transactions={transactionsAll} />
    </div>
  );
};

export default Dashboard;
