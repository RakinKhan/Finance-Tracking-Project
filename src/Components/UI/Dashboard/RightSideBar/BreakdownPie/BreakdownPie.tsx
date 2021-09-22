import React from "react";
import { Doughnut } from "react-chartjs-2";

const BreakdownPie = (props: any) => {
  const backgroundColor = props.backgroundColor;
  const labels = props.labels;
  const datapoints = props.datapoints;

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

  console.log(labels, datapoints);
  return (
    <>
      <Doughnut
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
      />
    </>
  );
};

export default BreakdownPie;
