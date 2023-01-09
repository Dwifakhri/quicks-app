import React from "react";

const Loading = ({ children }) => {
  return (
    <div className=" w-full h-full flex flex-col justify-center items-center">
      <svg className="spinner" viewBox="0 0 50 50">
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        ></circle>
      </svg>
      <p className="text-primary_1 font-semibold">{children}</p>
    </div>
  );
};

export default Loading;
