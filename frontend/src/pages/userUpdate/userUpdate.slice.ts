import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { UpdateUser } from "../../api/api";

export const updateUser = createAsyncThunk(
  "user/updateUser",
  ({
    firstName,
    lastName,
    userId,
  }: {
    firstName: string;
    lastName: string;
    userId: string;
  }) => UpdateUser({ first_name: firstName, last_name: lastName, userId })
);

const initialState = {
  error: "",
};

const UpdateUserSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(updateUser.fulfilled, (state) => {
        state.error = "";
      })
      .addCase(updateUser.rejected, (state) => {
        state.error = "Something went wrong";
      });
  },
});

export const {} = UpdateUserSlice.actions;

export default UpdateUserSlice.reducer;
