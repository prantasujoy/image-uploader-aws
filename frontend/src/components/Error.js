import React from "react";

const Error = ({ children }) => {
  return (
    <div className="w-1/2 m-auto mt-5 mb-5 rounded-md p-2 text-md text-black-300 bg-red-500 font-mono">
      <h3 className="text-center">{children}</h3>
    </div>
  );
};

export default Error;
