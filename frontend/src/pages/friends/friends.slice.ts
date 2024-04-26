import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { FetchFriends } from "../../api/api";

export const fetchFriends = createAsyncThunk(
  "user/fetchFriends",
  ({ userId }: { userId: string | null }) => FetchFriends(userId)
);

interface Status {
  id: string;
  userId: string;
  context: string;
  createdAt: string;
}

interface Friends {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  name: string;
  status: Status[];
}

interface FriendsState {
  users: Friends[];
  error: string;
}

const initialState: FriendsState = {
  users: [],
  error: "",
};

const FriendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFriends.fulfilled, (state, payload: any) => {
        const users = payload.payload.map((data: any) => {
          const {
            first_name,
            last_name,
            email,
            created_at,
            id,
            friends_count,
            status_updates,
          } = data;
          return {
            id: id,
            email: email,
            firstName: first_name,
            lastName: last_name,
            createdAt: created_at,
            friendsCount: friends_count,
            name: first_name + " " + last_name,
            status: "Connected",
            statusList: status_updates?.map((sta: any) => ({
              context: sta.context,
              createdAt: sta.created_at,
            })),
          };
        });
        state.users = users;
        state.error = "";
      })
      .addCase(fetchFriends.rejected, (state) => {
        state.error = "Something went wrong";
        state.users = [];
      });
  },
});

export const {} = FriendsSlice.actions;

export const getFriends = ({ friends }: any) => friends.users || [];

export default FriendsSlice.reducer;
