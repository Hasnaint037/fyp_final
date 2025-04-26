import CustomGraphChart from "@/components/static/CustomGraphChart";
import { useSelector } from "react-redux";

function ProductCountGraph() {
  const { productCount } = useSelector(state => state.product);

  const productCountData = {
    options: {
      chart: {
        type: "line",
        zoom: {
          enabled: true,
        },
      },
      xaxis: {
        categories: ["Men", "Women", "Children"],
        title: {
          text: "Product Categories",
        },
      },
      yaxis: {
        title: {
          text: "Number of Products",
        },
      },
      stroke: {
        curve: "smooth",
      },
      markers: {
        size: 5,
      },
      colors: ["#3B82F6"],
      legend: {
        position: "top",
      },
    },
    series: [
      {
        name: "Product Count",
        data: productCount || [], // Number of products available in each category
      },
    ],
  };

  return (
    <CustomGraphChart
      title="Product Count by Category"
      type="line"
      options={productCountData.options}
      series={productCountData.series}
      height={350}
      width="100%"
      showLoader={true}
    />
  );
}

export default ProductCountGraph;
