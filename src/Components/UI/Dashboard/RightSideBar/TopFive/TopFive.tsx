import React, { useState, useEffect } from "react";
import "./TopFive.css";

let toSearch = "";

const TopFive = (props: any) => {
  const averages = props.averages;
  const [searchedStock, setSearchedStock] = useState([] as any);
  const [priceAverages, setPriceAverages] = useState([] as any);

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

  console.log(priceAverages);
  averages.sort((a: any, b: any) => b.averageCost - a.averageCost);

  return (
    <div className={"divstyle"}>
      <div className={"top-performers-header"}>Top Performers</div>
      <div className={"topfive"}>
        {averages.length <= 5 &&
          averages.map((average: any) => (
            <div className={"topfive-card"} key={average.id}>
              <div className={"performer"}>
                <div className={"centering"}>
                  <div className={"performer-ls"}>
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
