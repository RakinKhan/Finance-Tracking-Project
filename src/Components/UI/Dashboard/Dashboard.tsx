import React, { useState } from "react";
import LeftSideBar from "./LeftSideBar/LeftSideBar";
import MiddleBar from "./MiddleBar/MiddleBar";
import RightSideBar from "./RightSideBar/RightSideBar";
import { TransactionsContext } from "../../../TransactionsContext";
const Dashboard = () => {
  const [transactionsAll, setTransactionsAll] = useState([] as any);

  return (
    <div className={"container pageheight"}>
      <LeftSideBar />
      <TransactionsContext.Provider value={{transactionsAll, setTransactionsAll}}>
      <MiddleBar />
      <RightSideBar />
      </TransactionsContext.Provider>

    </div>
  );
};

export default React.memo(Dashboard);
