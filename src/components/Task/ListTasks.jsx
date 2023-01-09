import React, { useState } from "react";
import MoreUp from "../../assets/icons/MoreUp.svg";
import MoreDown from "../../assets/icons/MoreDown.svg";
import Kebab from "../../assets/icons/Kebab.svg";
import Clock from "../../assets/icons/Clock.svg";
import Edit from "../../assets/icons/Edit.svg";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";

const ListTasks = ({
  index,
  date,
  title,
  onClickEdit,
  onChangeDate,
  valueDate,
  onChangeDesc,
  valueDesc,
  onClickComp,
  valueComp,
  updateTask,
  deleteTask,
}) => {
  const [showTask, setShowTask] = useState(false);

  const daysLeft = () => {
    const totalSeconds = new Date(date) - new Date();
    const totalDays = Math.ceil(totalSeconds / (3600 * 1000 * 24));
    return totalDays;
  };

  return (
    <form onSubmit={updateTask} key={index}>
      <div className="my-1 text-primary_1 flex-col flex space-y-2 px-4 py-3">
        <div className="flex justify-between">
          <div className="flex justify-betwwen space-x-2">
            <input onClick={onClickComp} type="checkbox" value={valueComp} />
            <p
              className={`text-md font-semibold capitalize words-break  ${
                valueComp ? "line-through" : ""
              }`}
            >
              {title}
            </p>
          </div>
          <div className="flex justify-center space-x-3 items-center">
            <p className="text-sm text-red-600">
              {daysLeft() > 0 ? daysLeft() + " Days Left" : ""}
            </p>
            <p className="text-sm">{date}</p>
            <img
              onClick={() => {
                onClickEdit();
                setShowTask(!showTask && index + 1);
              }}
              src={showTask ? MoreUp : MoreDown}
              className="w-3 h-3 cursor-pointer"
            />
            <div className="dropdown dropdown-end">
              <label tabIndex={0}>
                <img src={Kebab} className="w-3 h-3 cursor-pointer" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-1 shadow bg-white rounded-box w-32"
              >
                <li>
                  <a onClick={deleteTask} className="text-red-500">
                    Delete
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div
            className={`${
              showTask && index + 1
                ? "opacity-100 translate-y-0 transition ease-in-out duration-300"
                : "opacity-0 translate-y-10 hidden"
            } " space-y-3`}
          >
            <div className="flex space-x-3 items-center ml-5">
              <img src={Clock} className="w-4 h-4" />
              <input
                type="date"
                id="date-task"
                className="p-2 border border-primary_1 rounded-md"
                value={valueDate}
                onChange={onChangeDate}
              />
            </div>
            <div className="flex space-x-3 ml-5">
              <img src={Edit} className="w-4 h-4" />
              <CustomInput
                onChange={onChangeDesc}
                id="description"
                value={valueDesc}
                type="text"
                category="taskDescription"
              />
            </div>
          </div>
          <div>
            {showTask && index + 1 && (
              <CustomButton id="edit-task" label="Confirm" />
            )}
          </div>
        </div>
      </div>
      <hr className="border-primary_2 mx-4" />
    </form>
  );
};

export default ListTasks;
