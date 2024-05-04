import React from "react";

const Loading = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div
      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status">
      <span
        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Loading...</span>
    </div>

    </div>
    // <div className="loading-container">
    //   <div className="loading-wave">
    //     <div className="loading-bar"></div>
    //     <div className="loading-bar"></div>
    //     <div className="loading-bar"></div>
    //     <div className="loading-bar"></div>
    //   </div>
    // </div>
  );
};

export default Loading;