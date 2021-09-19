import React from "react";
import "./TopFive.css";
const TopFive = (props: any) => {
  const transactions = props.transactions;
  return (
    <div className={"divstyle"}>
      <div className={"top-performers-header"}>Top Performers</div>
      <div className={"topfive"}>
        <div className={"topfive-card"}>{}</div>
        <div className={"topfive-card"}>{}</div>
        <div className={"topfive-card"}>{}</div>
        <div className={"topfive-card"}>{}</div>
        <div className={"topfive-card"}>{}</div>
      </div>
    </div>
  );
};

export default TopFive;
