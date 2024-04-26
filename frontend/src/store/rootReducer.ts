import { combineReducers } from "@reduxjs/toolkit";
import LoginSlice from "../pages/login/login.slice";
import UpdateUserSlice from "../pages/userUpdate/userUpdate.slice";
import UsersSlice from "../pages/users/users.slice";
import FriendsSlice from "../pages/friends/friends.slice";
import RequestSlice from "../pages/request/request.slice";
import FeedSlice from "../pages/feeds/feed.slice";
import NotificationsListSlice from "../pages/notificaitons/notifiactions.slice";

const rootReducer = combineReducers({
  login: LoginSlice,
  updateUser: UpdateUserSlice,
  users: UsersSlice,
  friends: FriendsSlice,
  request: RequestSlice,
  feed: FeedSlice,
  notifications: NotificationsListSlice,
});

export default rootReducer;
