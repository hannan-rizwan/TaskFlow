import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const fetchProjects = createAsyncThunk("projects/fetchAll", async () => { const { data } = await api.get("/projects"); return data; });
export const createProject = createAsyncThunk("projects/create", async (d) => { const { data } = await api.post("/projects", d); return data; });

const projectSlice = createSlice({
  name: "projects",
  initialState: { items: [], current: null, loading: false },
  reducers: { setCurrentProject: (state, action) => { state.current = action.payload; } },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.fulfilled, (state, action) => { state.items = action.payload; })
      .addCase(createProject.fulfilled, (state, action) => { state.items.unshift(action.payload); });
  }
});

export const { setCurrentProject } = projectSlice.actions;
export default projectSlice.reducer;
