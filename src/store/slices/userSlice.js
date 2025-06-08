import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    error: null,
    message: null,
  },
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
      state.message = action.payload.message;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
      state.message = null;
    },
    fetchUserRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    fetchUserFailed(state, action) {
      state.loading = false;
      if (typeof window !== "undefined" && window.location.pathname !== "/login") {
        state.isAuthenticated = false;
        state.user = {};
        state.error = action.payload;
      }
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    logoutFailed(state, action) {
      state.error = action.payload;
    },
    clearAllErrors(state) {
      state.error = null;
    },
    resetAuthErrors(state) {
    state.error = null;
    state.message = null;
  },
  },
});

// Async actions
export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const response = await axios.post("/api/auth/login", data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    dispatch(userSlice.actions.loginSuccess(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Login failed";
    dispatch(userSlice.actions.loginFailed(errorMessage));
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchUserRequest());
  try {
    const response = await axios.get("/api/auth/me", {
      withCredentials: true,
    });
    dispatch(userSlice.actions.fetchUserSuccess(response.data.user));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Unable to fetch user";
    dispatch(userSlice.actions.fetchUserFailed(errorMessage));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/auth/logout", {
      withCredentials: true,
    });
    dispatch(userSlice.actions.logoutSuccess());
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Logout failed";
    dispatch(userSlice.actions.logoutFailed(errorMessage));
  }
};

// Export reducers and actions
export const { clearAllErrors, resetAuthErrors } = userSlice.actions;

export { userSlice };
export default userSlice.reducer;
