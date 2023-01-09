import React from "react";

const DropDwon = ({ id, value, name, onChange }) => {
  return (
    <select
      name={name}
      id={id}
      className="border-black border px-3 py-2 rounded-md"
      onChange={onChange}
    >
      <option value="my-tasks">My Tasks</option>
      {value.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default DropDwon;
