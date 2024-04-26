import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./error-page";
import Login from "../pages/login/login";
import UserUpdate from "../pages/userUpdate/userUpdate";
import Dashboard from "../pages/dashboard/dashboard";
import User from "../pages/users/users";
import Friends from "../pages/friends/friends";
import Feed from "../pages/feeds/feed";
import Request from "../pages/request/request";
import Notifiacitons from "../pages/notificaitons/notifications";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "users",
        element: <User />,
      },
      {
        path: "feeds",
        element: <Feed />,
      },
      {
        path: "friends",
        element: <Friends />,
      },
      {
        path: "requests",
        element: <Request />,
      },
      {
        path: "notifications",
        element: <Notifiacitons />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/user-update",
    element: <UserUpdate />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
