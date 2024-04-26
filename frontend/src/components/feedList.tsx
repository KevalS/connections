import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Feed } from "../pages/feeds/feed.slice";
import {
  formatTimeAgo,
  getName,
  stringAvatar,
} from "../services/genericFunctions";

interface FeedListProps {
  feeds: Feed[];
}

export default function FeedList({ feeds }: FeedListProps) {
  return (
    <>
      {feeds?.map((feed) => (
        <>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                {...stringAvatar(getName(feed.firstName, feed.lastName))}
              />
            </ListItemAvatar>
            <ListItemText
              primary={feed.context}
              secondary={
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {`— ${getName(feed.firstName, feed.lastName)}`}
                  </Typography>
                  <Typography>
                    {formatTimeAgo(new Date(feed?.createdAt).getTime())}
                  </Typography>
                </div>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      ))}
    </>
  );
}
