import React, {useEffect} from "react";
import "./TopFive.css";

const TopFive = (props: any) => {
  const averages = props.averages;
  const currentPrices = props.currentPrices;
  console.log(currentPrices)
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
  console.log(calculatedAverages)
  calculatedAverages.sort((a: any, b: any) => {
    return b.change - a.change;
  });

  setInterval(() => {
    if (currentPrices.length > 0) {
      const stockpricearray = [] as any;
      currentPrices.forEach((ticker: any)=>{
        const fetchCurrentPrice = async (ticker:any) => {
          const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=sandbox_c088t7n48v6plm1egj1g`)
          const data = await response.json();
          let obj = {
            ticker: ticker,
            price: data.c
          }
          console.log(obj)
        }
        fetchCurrentPrice(ticker) 
      })
      console.log(stockpricearray)
    }
  }, 10000)

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

export default React.memo(TopFive);
