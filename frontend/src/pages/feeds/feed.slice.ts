import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { FeedList } from "../../api/api";

export const feedList = createAsyncThunk(
  "user/feedFriends",
  ({ userId }: { userId: string | null }) => FeedList(userId)
);

export interface Feed {
  context: string;
  createdAt: string;
  firstName: string;
  lastName: string;
}

interface FeedState {
  feeds: Feed[];
  error: string;
}

const initialState: FeedState = {
  feeds: [],
  error: "",
};

const FeedSlice = createSlice({
  name: "feeds",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(feedList.fulfilled, (state, payload: any) => {
        state.feeds = payload.payload.map((feed: any) => {
          return {
            context: feed.context,
            createdAt: new Date(feed.created_at).getTime(),
            firstName: feed.first_name,
            lastName: feed.last_name,
          };
        });
        state.error = "";
      })
      .addCase(feedList.rejected, (state) => {
        state.error = "Something went wrong";
        state.feeds = [];
      });
  },
});

export const {} = FeedSlice.actions;

export const getFeeds = ({ feed }: any) => feed.feeds || [];

export default FeedSlice.reducer;
