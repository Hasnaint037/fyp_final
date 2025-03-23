import CustomGraphChart from "@/components/static/CustomGraphChart";

const orderStatusData = {
  options: {
    chart: {
      type: "pie",
    },
    labels: ["Pending", "Shipped", "Delivered", "Cancelled", "Returned"],
    colors: ["#0D1117", "#2563EB", "#14B8A6", "#1E293B", "#64748B"], // Dark Black, Blue, Cyan, Dark Gray, Cool Gray
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
  series: [50, 120, 300, 20, 10], // Corresponding order counts
};

function OrderStatusGraph() {
  return (
    <CustomGraphChart
      title="Order Status Breakdown"
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
