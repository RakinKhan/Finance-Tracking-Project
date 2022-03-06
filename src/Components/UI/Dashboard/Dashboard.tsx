import React, { useState } from "react";
import LeftSideBar from "./LeftSideBar/LeftSideBar";
import MiddleBar from "./MiddleBar/MiddleBar";
import RightSideBar from "./RightSideBar/RightSideBar";
import { TransactionsContext } from "../../../TransactionsContext";
const Dashboard = () => {
  const [transactionsAll, setTransactionsAll] = useState([] as any);
  const [pricesAll, setPricesAll] = useState([] as any);

  
  const pricesAllHandler = (pricesAllHistory: any) => {
    setPricesAll(pricesAllHistory);
  };
  console.log(pricesAll)
  return (
    <div className={"container pageheight"}>
      <LeftSideBar />
      <TransactionsContext.Provider value={{transactionsAll, setTransactionsAll}}>
      <MiddleBar
        pricesAll={pricesAllHandler}
      />
      <RightSideBar prices={pricesAll} />
      </TransactionsContext.Provider>

    </div>
  );
};

export default React.memo(Dashboard);
