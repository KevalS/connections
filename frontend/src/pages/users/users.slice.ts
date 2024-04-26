import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { FetchUsers, SendRequest, UpdateStatus } from "../../api/api";
import {
  capitalizeFirstLetter,
  getName,
} from "../../services/genericFunctions";

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  ({ userId }: { userId: string | null }) => FetchUsers(userId)
);

export const updateStatus = createAsyncThunk(
  "user/fetchUsers",
  ({ userId, status }: { userId: string | null; status: string }) =>
    UpdateStatus(userId, status)
);

export const sendRequest = createAsyncThunk(
  "user/sendRequest",
  ({
    userId,
    receiverId,
  }: {
    userId: string | null;
    receiverId: string | null;
  }) => SendRequest(userId, receiverId)
);

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  name: string;
  status: string;
  statusUpdates: any[];
}

interface UserState {
  users: User[];
  sendStatus: "idle" | "pending" | "connected";
  error: string;
}

const initialState: UserState = {
  users: [],
  error: "",
  sendStatus: "idle",
};

const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetSendStatus(state: UserState, action: any) {
      const { id } = action.payload;
      const user = state.users.find((user) => user.id === id);
      if (user) {
        user.status = "pending";
      }
      state.sendStatus = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.fulfilled, (state, payload: any) => {
        const users = payload?.payload?.map((data: any) => {
          const {
            first_name,
            last_name,
            email,
            created_at,
            id,
            friends_count,
            status,
          } = data;
          return {
            id: id,
            email: email,
            firstName: first_name || "",
            lastName: last_name || "",
            createdAt: created_at,
            name: getName(first_name, last_name),
            friendsCount: friends_count,
            status: capitalizeFirstLetter(status || ""),
          };
        });
        state.users = users;
        state.error = "";
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.error = "Something went wrong";
        state.users = [];
      })
      .addCase(sendRequest.fulfilled, (state) => {
        state.sendStatus = "pending";
      })
      .addCase(sendRequest.rejected, (state) => {
        state.sendStatus = "idle";
      });
  },
});

export const { resetSendStatus } = UsersSlice.actions;

export const getUsers = ({ users }: any) => users.users || [];
export const getSendStatus = ({ users }: any) => users.sendStatus || "idle";

export default UsersSlice.reducer;
