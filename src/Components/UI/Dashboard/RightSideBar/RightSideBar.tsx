import React from "react";
import "./RightSideBar.css";
import BreakdownPie from "./BreakdownPie/BreakdownPie";
const RightSideBar = (props: any) => {
  return (
    <div className={"rightsidebar"}>
      <div className={"profit"}></div>
      <div className={"portfolio-pie"}>
        <BreakdownPie transactions={props.transactions} />
      </div>
      <div className={"top-five"}></div>
    </div>
  );
};

export default RightSideBar;
