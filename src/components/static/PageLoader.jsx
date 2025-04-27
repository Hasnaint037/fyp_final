import React from "react";
import { Puff } from "react-loader-spinner";

function PageLoader({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Puff
        visible={true}
        height="80"
        width="80"
        color="red"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <p className="mt-4 text-lg font-semibold text-gray-700">{text}</p>
    </div>
  );
}

export default PageLoader;
