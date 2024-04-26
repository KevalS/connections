import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Action } from "../../store/configureStore";
import { LoginUser } from "../../api/api";

export const loginUser = createAsyncThunk(
  "user/getLogin",
  ({ email }: { email: string }) => LoginUser({ email })
);

interface LoginState {
  email: string;
  isLoggedIn: boolean;
  error: string;
  firstName: string;
  lastName: string;
  userId: string;
}

const initialState: LoginState = {
  email: "",
  isLoggedIn: false,
  error: "",
  firstName: "",
  lastName: "",
  userId: "",
};

const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUser(state: LoginState, action: Action) {
      const { email, firs_name, last_name } = action.payload;
      state.email = email;
      state.firstName = firs_name;
      state.lastName = last_name;
    },
    setError(state: LoginState, action: Action) {
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.firstName = payload ? payload.first_name : "";
        state.lastName = payload ? payload.last_name : "";
        state.email = payload ? payload?.email : "";
        state.isLoggedIn = true;
        state.userId = payload.user_id;
        state.error = "";
      })
      .addCase(loginUser.rejected, (state) => {
        state.error = "";
      });
  },
});

export const { setUser, setError } = LoginSlice.actions;

export const getFullName = ({ firstName, lastName }: LoginState) =>
  firstName + " " + lastName;

export const getEmail = ({ email }: LoginState) => email;

export default LoginSlice.reducer;
