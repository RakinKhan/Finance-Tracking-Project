import React from "react";
import LeftSideBar from "./LeftSideBar/LeftSideBar";
import MiddleBar from "./MiddleBar/MiddleBar";
import RightSideBar from "./RightSideBar/RightSideBar";

const Dashboard = () => {
  return (
    <div className={"container pageheight"}>
      <LeftSideBar />
      <MiddleBar />
      <RightSideBar />
    </div>
  );
};

export default Dashboard;
