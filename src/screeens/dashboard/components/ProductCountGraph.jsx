import React from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

const PieChart = () => {
  const { productCount } = useSelector((state) => state.product);
  const chartOptions = {
    chart: {
      type: "pie",
    },
    labels: ["Mobile", "Laptop", "Others"],
    colors: ["#457AEE", "#1FFAE2", "#FF6F61"],
    legend: {
      position: "top",
    },
  };

  return (
    <div>
      <h3>Product Distribution</h3>
      <ReactApexChart
        options={chartOptions}
        series={productCount}
        type="pie"
        height={350}
      />
    </div>
  );
};

export default PieChart;
