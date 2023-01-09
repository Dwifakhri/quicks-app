import React, { useState, useEffect } from "react";
import Quick from "../src/assets/icons/Quick.svg";
import Message from "../src/assets/icons/Message.svg";
import Task from "../src/assets/icons/Task.svg";
import Tasks from "./components/Tasks";
import Messages from "./components/Messages";
import { Link } from "react-router-dom";

const App = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(false);
  const [tool, setTool] = useState(false);
  const [click, setClick] = useState(false);

  useEffect(() => {
    if (show === false) {
      setMessage(false) || setTool(false);
    }
  }, [show]);

  return (
    <div className="w-full h-screen p-5 bg-[#262626]">
      <Link to="/">
        <div
          onClick={() => {
            setShow(!show);
          }}
          className={`${
            show && message === false && tool === false
              ? "-translate-x-0 z-20 bg-primary_blue"
              : (show && message && tool === false) ||
                (show && tool && message === false)
              ? "-translate-x-3 z-0 bg-primary_1"
              : "translate-x-0 z-20 bg-primary_blue"
          } 
         absolute rounded-full p-3 transition duration-300 right-5 bottom-5`}
        >
          <img src={Quick} />
        </div>
      </Link>
      <Link to="/messages">
        <div
          onClick={() => {
            setMessage(true);
            setTool(false);
            setClick(!click);
          }}
          className={`${
            show && message === false && tool === false
              ? "-translate-x-16 z-10 bg-primary_2"
              : message && show && tool === false
              ? "translate-x-0 z-10 bg-indicator_blue"
              : tool && show
              ? "-translate-x-20 z-10 bg-primary_2"
              : "-translate-x-0 z-0"
          }
         absolute rounded-full p-3 transition duration-300 right-5 bottom-5`}
        >
          <img src={Message} />
        </div>
      </Link>
      <Messages click={click} modal={message && show && tool === false} />
      <Link to="/tasks">
        <div
          onClick={() => {
            setTool(true);
            setMessage(false);
            setClick(!click);
          }}
          className={`${
            show && message === false && tool === false
              ? "-translate-x-32 z-10 bg-primary_2"
              : tool && show && message === false
              ? "translate-x-0 z-10 bg-indicator_orange"
              : show && message
              ? "-translate-x-20 z-10 bg-primary_2"
              : "-translate-x-0 z-0"
          } 
         absolute rounded-full p-3 transition duration-300 right-5 bottom-5`}
        >
          <img src={Task} />
        </div>
      </Link>
      <Tasks click={click} modal={tool && show && message === false} />
    </div>
  );
};

export default App;
