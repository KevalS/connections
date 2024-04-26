import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationsList } from "../../api/api";
import { NotificationActionStringMapper } from "../../services/genericConstants";

export const notificationsList = createAsyncThunk(
  "user/notificationsList",
  ({ userId }: { userId: string | null }) => NotificationsList(userId)
);

export interface Notification {
  context: string;
  createdAt: string;
  firstName: string;
  lastName: string;
}

interface NotificationState {
  notifications: Notification[];
  error: string;
}

const initialState: NotificationState = {
  notifications: [],
  error: "",
};

const NotificationsListSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(notificationsList.fulfilled, (state, payload: any) => {
        state.notifications = payload.payload.map((notification: any) => {
          return {
            context: NotificationActionStringMapper[notification.action],
            createdAt: new Date(notification.created_at).getTime(),
            firstName: notification.first_name,
            lastName: notification.last_name,
          };
        });
        state.error = "";
      })
      .addCase(notificationsList.rejected, (state) => {
        state.error = "Something went wrong";
        state.notifications = [];
      });
  },
});

export const {} = NotificationsListSlice.actions;

export const getNotifications = ({ notifications }: any) =>
  notifications.notifications || [];

export default NotificationsListSlice.reducer;
