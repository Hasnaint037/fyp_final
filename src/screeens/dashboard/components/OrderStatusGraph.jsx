import CustomGraphChart from "@/components/static/CustomGraphChart";
import { useSelector } from "react-redux";

function OrderStatusGraph() {
  const { ordersCount } = useSelector((state) => state.order);
  const orderStatusData = {
    options: {
      chart: {
        type: "pie",
      },
      labels: ["male", "female", "children"],
      colors: ["#2563EB", "#14B8A6", "#1E293B", "#64748B"], // Dark Black, Blue, Cyan, Dark Gray, Cool Gray
      legend: {
        position: "bottom",
        labels: {
          colors: "black", // Light text for contrast
        },
      },
      tooltip: {
        theme: "dark", // Keeps tooltips dark
      },
      dataLabels: {
        style: {
          colors: ["#E2E8F0"], // Light-colored text for better readability
        },
      },
    },
    series: ordersCount, // Corresponding order counts
  };
  return (
    <CustomGraphChart
      title="Gender wise order Breakdown"
      type="pie"
      options={orderStatusData.options}
      series={orderStatusData.series}
      height={350}
      width="100%"
      showLoader={true}
    />
  );
}

export default OrderStatusGraph;
