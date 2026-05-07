import { createSlice } from "@reduxjs/toolkit";
import secureLocalStorage from "react-secure-storage";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: secureLocalStorage.getItem("user") || null,
    token: secureLocalStorage.getItem("token") || null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    getUser: (state) => {
      return state.user;
    },
  },
});

export const { setCredentials, getUser } = authSlice.actions;
export default authSlice.reducer;
