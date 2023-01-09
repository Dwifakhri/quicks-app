import React from "react";

const Button = ({ id, onClick, label }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      label={label}
      className="text-white bg-primary_blue px-3 py-2 rounded-md"
    >
      {label}
    </button>
  );
};

export default Button;
