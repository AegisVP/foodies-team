import { createSlice } from '@reduxjs/toolkit';

// login, logout, getUser, change Avatar
const token = localStorage.getItem("token");

const initialState = {
    isAuthenticated: token !== null && token !== undefined,
    token: token || null,
    user: null,
    isLoading: false,
    error: null,
};

const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loginSuccess, logout, setUser } = authUserSlice.actions;
export const authUserReducer = authUserSlice.reducer;
