import { configureStore } from "@reduxjs/toolkit";
import todoListReducer from "./todoList";
import messagesListReducer from "./messageList";

export default configureStore({
  reducer: {
    tasks: todoListReducer,
    messages: messagesListReducer,
  },
});
