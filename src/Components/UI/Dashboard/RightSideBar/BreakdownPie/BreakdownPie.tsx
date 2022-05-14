import React, { useRef } from "react";
import { Doughnut } from "react-chartjs-2";

const BreakdownPie = (props: any) => {
  const changeComponent = useRef(0)
  const backgroundColor = props.backgroundColor;
  const labels = props.labels;
  const datapoints = props.datapoints;

  if (labels.length > 0 && datapoints.length > 0) {
    console.log(labels.length, datapoints.length)
    changeComponent.current = 1
  }

  const dataset = {
    labels: labels,
    datasets: [
      {
        data: datapoints,
        backgroundColor: backgroundColor,
        hoverOffset: 2,
      },
    ],
  };
  
  if (changeComponent.current === 1) {
    changeComponent.current = 2
  }
  console.log(changeComponent.current)
  return (
    <>
    {changeComponent.current === 0 && labels.length === 0 && "please add" }
    {changeComponent.current === 1 && "Loading..."}
    {changeComponent.current === 2 && (      <Doughnut
        data={dataset}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "bottom",
            },
            title: {
              display: true,
              text: "Portfolio",
            },
          },
        }}
      />)}

    </>
  );
};

export default BreakdownPie;
