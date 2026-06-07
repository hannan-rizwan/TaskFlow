import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const fetchTasks = createAsyncThunk("tasks/fetch", async (pid) => { const { data } = await api.get(`/tasks/project/${pid}`); return data; });
export const createTask = createAsyncThunk("tasks/create", async (d) => { const { data } = await api.post("/tasks", d); return data; });
export const updateTask = createAsyncThunk("tasks/update", async ({ id, updates }) => { const { data } = await api.put(`/tasks/${id}`, updates); return data; });

const taskSlice = createSlice({
  name: "tasks",
  initialState: { items: [], loading: false },
  reducers: {
    addTaskRealtime: (state, action) => { state.items.push(action.payload); },
    updateTaskRealtime: (state, action) => { const i = state.items.findIndex(t => t._id === action.payload._id); if (i !== -1) state.items[i] = action.payload; },
    removeTaskRealtime: (state, action) => { state.items = state.items.filter(t => t._id !== action.payload); }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => { state.items = action.payload; })
      .addCase(createTask.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(updateTask.fulfilled, (state, action) => { const i = state.items.findIndex(t => t._id === action.payload._id); if (i !== -1) state.items[i] = action.payload; });
  }
});

export const { addTaskRealtime, updateTaskRealtime, removeTaskRealtime } = taskSlice.actions;
export default taskSlice.reducer;
