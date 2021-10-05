import React, { useState, useEffect } from "react";
import "./TopFive.css";

let toSearch = "";

const TopFive = (props: any) => {
  const averages = props.averages;
  const [searchedStock, setSearchedStock] = useState([] as any);
  const [priceAverages, setPriceAverages] = useState([] as any);
  let calculatedAverages = [] as any;
  if (averages.length > 0) {
    averages.forEach((average: any) => {
      if (!searchedStock.includes(average.stock)) {
        setSearchedStock((prevList: any) => {
          return [...prevList, average.stock];
        });
        toSearch = average.stock;
      }
    });
  } else {
    priceAverages.shift();
    console.log("hello");
  }

  useEffect(() => {
    const fetchPrice = async () => {
      const response = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${toSearch}&token=bprteb7rh5r8s3uvb2ag`
      );
      const data = await response.json();
      const block = {
        stock: toSearch,
        price: data.c,
      };
      setPriceAverages((prevAverages: any) => {
        return [...prevAverages, block];
      });
    };
    fetchPrice();
  }, [toSearch]);

  averages.forEach((average: any) => {
    priceAverages.forEach((priceAverage: any) => {
      if (priceAverage.stock === average.stock) {
        calculatedAverages.push({
          stock: average.stock,
          id: average.id,
          change:
            (priceAverage.price - average.averageCost) / average.averageCost,
          bookValue: average.sharesHeld * average.averageCost,
          marketValue: average.sharesHeld * priceAverage.price,
        });
      }
    });
  });
  calculatedAverages.sort((a: any, b: any) => {
    return b.change - a.change;
  });
  console.log(calculatedAverages);
  console.log(averages);

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
                    {average.stock}: ${average.marketValue}
                  </div>
                  <div className={"performer-rs"}>
                    {average.change.toFixed(2)}%
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
