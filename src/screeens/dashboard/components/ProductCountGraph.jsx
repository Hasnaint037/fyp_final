import CustomGraphChart from "@/components/static/CustomGraphChart";

const productCountData = {
  options: {
    chart: {
      type: "line",
      zoom: {
        enabled: true,
      },
    },
    xaxis: {
      categories: ["Electronics", "Clothing", "Home Decor", "Accessories", "Footwear"],
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
      data: [120, 200, 150, 100, 180], // Number of products available in each category
    },
  ],
};


function ProductCountGraph() {
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
