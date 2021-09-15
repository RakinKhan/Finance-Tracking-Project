import React from "react";
import "./RightSideBar.css";
import BreakdownPie from "./BreakdownPie/BreakdownPie";
import TopFive from "./TopFive/TopFive";
const RightSideBar = (props: any) => {
  return (
    <div className={"rightsidebar"}>
      <div className={"profit"}></div>
      <div className={"portfolio-pie"}>
        <BreakdownPie transactions={props.transactions} />
      </div>
      <div className={"top-five"}>
        <TopFive transaction={props.transactions} />
      </div>
    </div>
  );
};

export default RightSideBar;
