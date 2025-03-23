import Loader from "./Loader";
import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";

function CustomGraphChart({
  parentClass,
  childClass,
  showLoader,
  title,
  filterType,
  type,
  height,
  width,
  options,
  series,
}) {
  return (
    <div className={`bg-white shadow-lg rounded-lg p-5 ${parentClass}`}>
      <div className={`w-full ${childClass}`}>
        <div className={`${filterType && "flex justify-between items-center mb-2"}`}>
          {title && <h4 className={`text-center font-medium ${filterType && "m-0"}`}>{title}</h4>}
        </div>
        {showLoader ? (
          <ReactApexChart
            options={options}
            series={series}
            type={type}
            height={height}
            width={width}
          />
        ) : (
          <LoaderRight />
        )}
      </div>
    </div>
  );
}

export default CustomGraphChart;

CustomGraphChart.propTypes = {
  parentClass: PropTypes.string,
  childClass: PropTypes.string,
  filterType: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  showLoader: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.object,
  series: PropTypes.array,
  filterOptions: PropTypes.array,
  props: PropTypes.array.isRequired,
};

CustomGraphChart.defaultProps = {
  parentClass: "",
  childClass: "",
  filterType: "",
  title: "",
  type: "pie",
  showLoader: true,
  filterOptions: [],
  height: "auto",
  width: "100%",
  options: {},
  series: [],
};
