import React from "react";
import "./TopFive.css";

const TopFive = (props: any) => {
  const averages = props.averages;
  averages.sort((a: any, b: any) => b.averageCost - a.averageCost);
  console.log(averages);
  return (
    <div className={"divstyle"}>
      <div className={"top-performers-header"}>Top Performers</div>
      <div className={"topfive"}>
        {averages.length <= 5 &&
          averages.map((average: any) => (
            <div className={"topfive-card"}>
              <div className={"performer"}>
                <div className={"centering"}>
                  <div className={"performer-ls"} id={average.id}>
                    {average.stock}: ${average.averageCost.toFixed(2)}
                  </div>
                  <div className={"performer-rs"}>Stock</div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopFive;
