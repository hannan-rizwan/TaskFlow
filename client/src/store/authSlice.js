import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try { const { data } = await api.post("/auth/login", credentials); localStorage.setItem("token", data.token); return data; }
  catch (error) { return rejectWithValue(error.response?.data?.error || "Login failed"); }
});

export const register = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
  try { const { data } = await api.post("/auth/register", userData); localStorage.setItem("token", data.token); return data; }
  catch (error) { return rejectWithValue(error.response?.data?.error || "Registration failed"); }
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, loading: false, error: null },
  reducers: {
    logout: (state) => { state.user = null; state.token = null; localStorage.removeItem("token"); },
    clearError: (state) => { state.error = null; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => { state.user = action.payload.user; state.token = action.payload.token; })
      .addCase(register.fulfilled, (state, action) => { state.user = action.payload.user; state.token = action.payload.token; });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
