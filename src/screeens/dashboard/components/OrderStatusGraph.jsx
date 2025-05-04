import CustomGraphChart from "@/components/static/CustomGraphChart";
import { useSelector } from "react-redux";

function OrderStatusGraph() {
  const { ordersCount } = useSelector((state) => state.order);

  const orderStatusData = {
    options: {
      chart: {
        type: "bar",
      },
      labels: ["Mobile", "Laptop", "Others"],
      xaxis: {
        categories: ["Mobile", "Laptop", "Others"],
        labels: {
          style: {
            colors: "#1F2937", // dark text
          },
        },
      },
      colors: ["#2563EB", "#14B8A6", "#64748B"], // Blue, Cyan, Gray
      legend: {
        show: false,
      },
      tooltip: {
        theme: "dark",
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#1F2937"],
        },
      },
    },
    series: [
      {
        name: "Orders",
        data: ordersCount,
      },
    ],
  };

  return (
    <CustomGraphChart
      title="Device-wise Order Breakdown"
      type="bar"
      options={orderStatusData.options}
      series={orderStatusData.series}
      height={350}
      width="100%"
      showLoader={true}
    />
  );
}

export default OrderStatusGraph;
