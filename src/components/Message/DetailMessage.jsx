import React, { useEffect, useState } from "react";
import Back from "../../assets/icons/Back.svg";
import Close from "../../assets/icons/Close.svg";
import Kebab from "../../assets/icons/Kebab.svg";
import { Link } from "react-router-dom";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import { useParams } from "react-router-dom";
import {
  createCommentAsync,
  deleteCommentAsync,
  getDetailMessagesAsync,
} from "../../utils/redux/messageList";
import { useDispatch } from "react-redux";

const DetailMessage = ({ chatList, userChat, idMessage }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const [comment, setComment] = useState("");

  const deleteComment = async (id) => {
    dispatch(deleteCommentAsync({ id: id }));
    dispatch(getDetailMessagesAsync({ id: idMessage }));
  };

  const createComment = async (e) => {
    e.preventDefault();
    dispatch(
      createCommentAsync({ post: idMessage, owner: user, message: comment })
    );
    dispatch(getDetailMessagesAsync({ id: idMessage }));
  };

  // Participants
  let allChat = chatList[0]?.data;
  let filteredChat = allChat?.reduce((values, item) => {
    if (item.owner.firstName) values.push(item.owner.firstName);
    return values;
  }, []);
  const removeDupe = [...new Set(filteredChat)];

  const color = ["blue", "red", "green"];

  return (
    <>
      <div className="flex items-center justify-evenly space-x-1 top-0 sticky px-6 py-1 bg-white z-10 border-b border-primary_2">
        <div className="w-[5%] text-center">
          <Link to="/messages">
            <img src={Back} />
          </Link>
        </div>
        <div className="w-[90%] flex flex-col">
          <p className="text-primary_blue font-semibold text-md">
            {params.tags}
          </p>

          <p className="text-sm">{removeDupe.length} Participants</p>
        </div>
        <div className="w-[5%] flex justify-end">
          <Link to="/messages">
            <img src={Close} />
          </Link>
        </div>
      </div>

      {/* List Chat */}
      {chatList[0]?.data?.map((item, index) => (
        <div key={item.id} className="px-6 py-1 flex flex-col space-y-1 my-1">
          <p className="text-md font-semibold">{item.owner.firstName}</p>
          <div className="flex space-x-3">
            <div className="max-w-[75%] bg-blue-300 rounded-md text-md py-1 px-2 leading-snug">
              <p className="font-normal">
                {item.message !== "" ? item.message : "Blank message"}
              </p>
              <p className="text-[12px]">
                {" "}
                {new Date(item.publishDate).getHours()} :{" "}
                {new Date(item.publishDate).getMinutes()}{" "}
              </p>
            </div>

            {/* ---kebab menu--- */}
            <div className="dropdown dropdown-end">
              <label id="icon-options" tabIndex={0} className="cursor-pointer ">
                <img src={Kebab} />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-1 shadow-md bg-card rounded-[10px] w-[6rem] text-sm bg-white"
              >
                <li id="edit-chat">
                  <a>Edit</a>
                </li>
                <li id="delete-chat" className="text-red-500">
                  <a onClick={() => deleteComment(item.id)}>Delete</a>
                </li>
              </ul>
            </div>
            {/*  end kebab menu */}
          </div>
        </div>
      ))}
      <form
        onSubmit={createComment}
        className="flex space-x-3 bottom-0 sticky z-10 px-6 py-6 bg-white"
      >
        <CustomInput
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          id="input-chat"
          type="text"
          category="default"
          placeholder="Type a new message"
        />
        <select
          id="user-comment"
          className="border-black border px-3 py-2 rounded-md"
          onChange={(e) => setUser(e.target.value)}
          value={user}
        >
          <option>Select User</option>
          {userChat[0]?.data?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.firstName}
            </option>
          ))}
        </select>
        <CustomButton id="submit-chat" label="Send" />
      </form>
    </>
  );
};

export default DetailMessage;
