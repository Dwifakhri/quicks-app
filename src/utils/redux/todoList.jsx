import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTasksAsync = createAsyncThunk("tasks/getTasks", async () => {
  return await fetch(
    "https://my-json-server.typicode.com/Dwifakhri/to-do-server/tasks"
  ).then((res) => res.json());
});

export const addTaskAsync = createAsyncThunk(
  "tasks/addTask",
  async ({ title, date, description }) => {
    return await fetch(
      "https://my-json-server.typicode.com/Dwifakhri/to-do-server/tasks",
      {
        method: "POST",
        headers: {
          Accept: "application/jspn",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          date: date,
          description: description,
        }),
      }
    ).then((res) => res.json());
  }
);

export const updateTaskAsync = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, title, date, description, completed }) => {
    return await fetch(
      `https://my-json-server.typicode.com/Dwifakhri/to-do-server/tasks/${id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/jspn",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          date: date,
          description: description,
          completed: completed,
        }),
      }
    ).then((res) => res.json());
  }
);

export const handleToggleTaskAsync = createAsyncThunk(
  "tasks/toggleTask",
  async ({ id, completed }) => {
    return await fetch(
      `https://my-json-server.typicode.com/Dwifakhri/to-do-server/tasks/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          completed: !completed,
        }),
      }
    ).then((res) => res.json());
  }
);

export const deleteTaskAsync = createAsyncThunk(
  "tasks/deleteTask",
  async ({ id }) => {
    return await fetch(
      `https://my-json-server.typicode.com/Dwifakhri/to-do-server/tasks/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then((res) => res.json());
  }
);

const todoList = createSlice({
  name: "tasks",
  initialState: {
    listTasks: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [getTasksAsync.pending]: (state) => {
      state.loading = true;
    },
    [getTasksAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.listTasks = action.payload;
    },
    [getTasksAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [addTaskAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.listTasks = [action.payload];
    },
    [addTaskAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateTaskAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.listTasks = [action.payload];
    },
    [updateTaskAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [handleToggleTaskAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.listTasks = [action.payload];
    },
    [handleToggleTaskAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteTaskAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.listTasks = [action.payload];
    },
    [deleteTaskAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default todoList.reducer;
