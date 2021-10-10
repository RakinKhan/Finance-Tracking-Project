import React, { useState, useEffect } from "react";
import "./TopFive.css";

const TopFive = (props: any) => {
  const averages = props.averages;
  const currentPrices = props.currentPrices;
  console.log(currentPrices);
  let calculatedAverages = [] as any;

  averages.forEach((average: any) => {
    currentPrices.forEach((currentPrice: any) => {
      if (currentPrice.stock === average.stock) {
        calculatedAverages.push({
          stock: average.stock,
          id: average.id,
          change:
            (currentPrice.price - average.averageCost) / average.averageCost,
          bookValue: average.sharesHeld * average.averageCost,
          marketValue: average.sharesHeld * currentPrice.price,
        });
      }
    });
  });
  calculatedAverages.sort((a: any, b: any) => {
    return b.change - a.change;
  });
  return (
    <div className={"divstyle"}>
      <div className={"top-performers-header"}>Top Performers</div>
      <div className={"topfive"}>
        {calculatedAverages.length <= 5 &&
          calculatedAverages.map((average: any) => (
            <div className={"topfive-card"} key={average.id}>
              <div className={"performer"}>
                <div className={"centering"}>
                  <div className={"performer-ls"}>
                    {average.stock}: <>$</>
                    {average.marketValue.toFixed(2)}
                  </div>
                  <div className={"performer-rs"}>
                    {average.change.toFixed(2) * 100}%
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopFive;
