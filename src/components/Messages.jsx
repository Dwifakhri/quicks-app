import React, { useState, useEffect } from "react";
import Search from "../assets/icons/Search.svg";
import Contact1 from "../assets/icons/Contact1.svg";
import Contact2 from "../assets/icons/Contact2.svg";
import CustomInput from "./CustomInput";
import DetailMessage from "./Message/DetailMessage";
import Loading from "./Loading";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessagesAsync,
  getDetailMessagesAsync,
  getUsersAsync,
} from "../utils/redux/messageList";

const Messages = ({ modal, click }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const { messageList, chatList, userChat, loading, error } = useSelector(
    (state) => ({
      ...state.messages,
    })
  );

  const [idMessage, setIdMessage] = useState("");

  useEffect(() => {
    if (click === true || click === false) {
      dispatch(getMessagesAsync());
    }
  }, [click, dispatch]);

  const getDetailMessage = async (id) => {
    dispatch(getDetailMessagesAsync({ id: id }));
    dispatch(getUsersAsync());
  };

  return modal ? (
    <div className="right-5 bottom-20 w-full md:w-[32rem] h-[28rem] rounded-md md:absolute bg-white overflow-auto">
      {loading ? (
        <Loading>Loading Chats ...</Loading>
      ) : (
        <>
          {params.tags === undefined ? (
            <>
              {" "}
              <div className="px-4 py-4 sticky z-10 bg-white top-0">
                <form className="mt-form-control rounded-lg border border-primary_1 border-md flex justify-between items-center py-1 px-10">
                  <CustomInput
                    id="search-message"
                    type="text"
                    placeholder="Search"
                    category="searchMessage"
                  />
                  <img src={Search} className="w-4 h-4 cursor-pointer" />
                </form>
              </div>
              {/* List Message */}
              {messageList[0]?.data?.map((item) => (
                <div
                  key={item.id}
                  className="flex space-x-3 text-primary_1 pt-1 pb-5 border-b border-primary_2 "
                >
                  <div className="flex items-center -mt-4 ml-0">
                    <div className="bg-primary_blue rounded-full p-3 z-10 relative translate-x-8">
                      <img src={Contact1} />
                    </div>
                    <div className=" bg-primary_3 rounded-full p-3 -translate-x-5">
                      <img src={Contact2} />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1 ">
                    <div className="flex space-x-5 items-center ">
                      <Link to={`/messages/${item.tags}`}>
                        <p
                          onClick={() => {
                            getDetailMessage(item.id);
                            setIdMessage(item.id);
                          }}
                          className="text-primary_blue font-semibold text-md"
                        >
                          {item.tags}
                        </p>
                      </Link>
                      <p className="text-sm">{item.updatedDate}</p>
                    </div>
                    <div className="flex flex-col leading-none">
                      <p className="text-md font-semibold">
                        {item.owner.firstName}
                      </p>
                      <p className="text-sm">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <DetailMessage
              chatList={chatList}
              userChat={userChat}
              idMessage={idMessage}
            />
          )}
        </>
      )}
    </div>
  ) : (
    ""
  );
};

export default Messages;
