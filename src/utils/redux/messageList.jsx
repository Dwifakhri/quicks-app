import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getMessagesAsync = createAsyncThunk(
  "messages/getMessages",
  async () => {
    return await fetch(
      "https://dummyapi.io/data/v1/post?limit=10&page=0&created=1",
      {
        method: "GET",
        headers: {
          "app-id": "62996cb2689bf0731cb00285",
          "Content-type": "application/json",
        },
      }
    ).then((res) => res.json());
  }
);

export const getDetailMessagesAsync = createAsyncThunk(
  "messages/getDetailMessages",
  async ({ id }) => {
    return await fetch(`https://dummyapi.io/data/v1/post/${id}/comment`, {
      method: "GET",
      headers: {
        "app-id": "62996cb2689bf0731cb00285",
        "Content-type": "application/json",
      },
    }).then((res) => res.json());
  }
);

export const getUsersAsync = createAsyncThunk("messages/getUsers", async () => {
  return await fetch(`https://dummyapi.io/data/v1/user?created=1`, {
    method: "GET",
    headers: {
      "app-id": "62996cb2689bf0731cb00285",
      "Content-type": "application/json",
    },
  }).then((res) => res.json());
});

export const createCommentAsync = createAsyncThunk(
  "messages/createComment",
  async ({ post, owner, message }) => {
    return await fetch(`https://dummyapi.io/data/v1/comment/create`, {
      method: "POST",
      headers: {
        "app-id": "62996cb2689bf0731cb00285",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        post: post,
        owner: owner,
        message: message,
      }),
    }).then((res) => res.json());
  }
);

export const deleteCommentAsync = createAsyncThunk(
  "messages/deleteComment",
  async ({ id }) => {
    return await fetch(`https://dummyapi.io/data/v1/comment/${id}`, {
      method: "DELETE",
      headers: {
        "app-id": "62996cb2689bf0731cb00285",
        "Content-type": "application/json",
      },
    }).then((res) => res.json());
  }
);

const messageList = createSlice({
  name: "messages",
  initialState: {
    messageList: [],
    chatList: [],
    userChat: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [getMessagesAsync.pending]: (state) => {
      state.loading = true;
    },
    [getMessagesAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.messageList = [action.payload];
    },
    [getMessagesAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getDetailMessagesAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.chatList = [action.payload];
    },
    [getDetailMessagesAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getUsersAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.userChat = [action.payload];
    },
    [getUsersAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // [createCommentAsync.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [createCommentAsync.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.chatList = [action.payload];
    // },
    [createCommentAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // [deleteCommentAsync.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [deleteCommentAsync.fulfilled]: (state, action) => {
    //   state.loading = false;
    // },
    [deleteCommentAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default messageList.reducer;
