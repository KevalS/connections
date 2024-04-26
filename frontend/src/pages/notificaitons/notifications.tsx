import List from "@mui/material/List";
import FeedList from "../../components/feedList";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications, notificationsList } from "./notifiactions.slice";

const Notifiacitons = () => {
  const dispatch: any = useDispatch();
  const notifications = useSelector(getNotifications);

  console.log(notifications);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    dispatch(notificationsList({ userId }));
  }, []);

  return (
    <Box sx={{ margin: 0 }}>
      <h2>Notifications</h2>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <FeedList feeds={notifications} />
      </List>
    </Box>
  );
};

export default Notifiacitons;
