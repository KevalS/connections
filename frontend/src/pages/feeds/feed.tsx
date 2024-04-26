import List from "@mui/material/List";
import FeedList from "../../components/feedList";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import { feedList, getFeeds } from "./feed.slice";
import { useDispatch, useSelector } from "react-redux";

const Feed = () => {
  const dispatch: any = useDispatch();
  const feeds = useSelector(getFeeds);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    dispatch(feedList({ userId }));
  }, []);

  return (
    <Box sx={{ margin: 0 }}>
      <h2>Feeds</h2>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <FeedList feeds={feeds} />
      </List>
    </Box>
  );
};

export default Feed;
