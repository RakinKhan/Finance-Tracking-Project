import React, {useEffect, useRef, useState} from "react";
import "./TopFive.css";

const TopFive = (props: any) => {
  const changeComponent = useRef(0);
  const comp = useRef(false)
  const averages = props.averages;
  const labels = props.labels;
  const [pall, setPall] = useState([]as any)
  let calculatedAverages = [] as any;

  const currentPriceAll = async (labels:any) => {
    const pAll = await Promise.all(labels.map((label: any) => {
      const response = fetch(`https://finnhub.io/api/v1/quote?symbol=${label}&token=bprteb7rh5r8s3uvb2ag`).then((res:any) => res.json()).then((res:any) => {return {
        stock: label,
        price: res.c
      }})
      return response
    }))
    setPall(pAll)
  }

  calculatedAverages.sort((a: any, b: any) => {
    return b.change - a.change;
  });
  averages.forEach((average: any) => {
    pall.forEach((currentPrice: any) => {
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
  useEffect(() => {
    if (labels.length > 0) {
      changeComponent.current = 1
      currentPriceAll(labels)
      comp.current=true
    }
  }, [labels])

  useEffect(() => {
    if (pall.length > 0) {
      const interval = setInterval(() => {
        currentPriceAll(labels)
      }, 15000)
      return () => clearInterval(interval)
    }
  }, [pall, labels])
  console.log(pall)
  if (comp.current === true && changeComponent.current === 1) {
    comp.current = false;
    changeComponent.current = 2
    
  }

  return (
    <div className={"divstyle"}>
      <div className={"top-performers-header"}>Top Performers</div>
      <div className={"topfive"}>
        {changeComponent.current === 2 && calculatedAverages.length <= 5 &&
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
          {changeComponent.current === 1 && "loading"}
          {changeComponent.current === 0 && labels.length === 0 && "please add" }
      </div>
    </div>
  );
};

export default TopFive;
