import React from "react";

const CustomInput = ({ type, id, onChange, placeholder, category, value }) => {
  const typeInput = {
    default: "py-1",
    taskTitle: "bg-red",
    taskDescription:
      "border-none py-0 px-0 focus:border-none outline-none active:bg-none",
    searchMessage:
      "border-none py-0 px-0 focus:border-none outline-none active:bg-none placeholder:text-primary_1",
  };

  const styleInput = typeInput[category];
  return (
    <input
      type={type}
      id={id}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full border border-primary_1 rounded-md py-2 px-3 ${styleInput}`}
      value={value}
    />
  );
};

export default CustomInput;
