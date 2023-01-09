import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import DropDown from "./Task/DropDown";
import MoreUp from "../assets/icons/MoreUp.svg";
import Kebab from "../assets/icons/Kebab.svg";
import ListTasks from "./Task/ListTasks";
import Clock from "../assets/icons/Clock.svg";
import Edit from "../assets/icons/Edit.svg";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import {
  getTasksAsync,
  addTaskAsync,
  updateTaskAsync,
  handleToggleTaskAsync,
  deleteTaskAsync,
} from "../utils/redux/todoList";

const Tasks = ({ modal, click }) => {
  const dropDownTasks = ["Personal Errands", "Urgent To-Do"];
  const { listTasks, loading, error } = useSelector((state) => ({
    ...state.tasks,
  }));
  const [id, setId] = useState(0);
  const [newTask, setNewTask] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (click === true || click === false) {
      dispatch(getTasksAsync());
    }
  }, [click, dispatch]);

  const addNewTask = async (e) => {
    e.preventDefault();
    dispatch(
      addTaskAsync({
        title: title,
        date: date,
        description: description,
        completed: completed,
      })
    );
  };

  const updateTask = async (e) => {
    e.preventDefault();
    dispatch(
      updateTaskAsync({
        id: id,
        title: title,
        date: date,
        description: description,
      })
    );
  };

  const handleToggle = async (id) => {
    setCompleted(!completed);
    dispatch(
      handleToggleTaskAsync({
        id: id,
        completed: completed,
      })
    );
  };

  const deleteTask = async (id) => {
    dispatch(deleteTaskAsync({ id }));
  };

  return (
    modal && (
      <div className="right-5 bottom-20 w-full md:w-[32rem] h-[28rem] rounded-md md:absolute bg-white overflow-auto">
        {loading ? (
          <Loading>Loading Tasks List ...</Loading>
        ) : (
          <>
            <div className="flex justify-between items-center sticky top-0 bg-white z-10 px-4 py-3">
              <DropDown name="my-task" id="my-task" value={dropDownTasks} />
              <CustomButton
                onClick={() => {
                  setNewTask(!newTask);
                  setId(0);
                  setTitle("");
                  setDate("");
                  setDescription("");
                }}
                id="new-task"
                label="New Task"
              />
            </div>
            {listTasks?.map((item, index) => (
              <ListTasks
                onClickEdit={() => {
                  setId(item.id);
                  setTitle(item.title);
                  setDate(item.date);
                  setDescription(item.description);
                }}
                onChangeDate={(e) => setDate(e.target.value)}
                valueDate={date}
                onChangeDesc={(e) => setDescription(e.target.value)}
                valueDesc={description}
                onClickComp={() => {
                  setId(item.id);
                  handleToggle(item.id);
                  setCompleted(!completed);
                }}
                valueComp={completed}
                updateTask={updateTask}
                key={index}
                index={index}
                title={item.title}
                date={item.date}
                description={item.description}
                deleteTask={() => deleteTask(item.id)}
              />
            ))}

            {/* New Task */}
            {newTask && (
              <form
                onSubmit={addNewTask}
                className="my-3 text-primary_1 flex-col flex space-y-2 p-3"
              >
                <div className="flex">
                  <div className="flex space-x-2 w-[70%]">
                    <input type="checkbox" />
                    <CustomInput
                      id="title"
                      category="default"
                      type="text"
                      placeholder="Type Task Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end space-x-3 items-center w-[35%]">
                    {title && date && (
                      <CustomButton id="add-task" label="Add" />
                    )}
                    <img src={MoreUp} className="w-3 h-3 cursor-pointer" />
                    <img src={Kebab} className="w-3 h-3 cursor-pointer" />
                  </div>
                </div>
                <div className="flex space-x-3 items-center ml-5">
                  <img src={Clock} className="w-4 h-4" />
                  <input
                    type="date"
                    id="date-task"
                    className="p-2 border border-primary_1 rounded-md"
                    placeholder="Set Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="flex space-x-3 ml-5">
                  <img src={Edit} className="w-4 h-4" />
                  <CustomInput
                    id="description"
                    type="text"
                    category="taskDescription"
                    placeholder="No Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </form>
            )}
            {/*  */}
          </>
        )}
      </div>
    )
  );
};

export default Tasks;
