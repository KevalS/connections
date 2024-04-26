import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  formatTimeAgo,
  getName,
  stringAvatar,
} from "../services/genericFunctions";
import { Request } from "../pages/request/request.slice";
interface RequestListProps {
  requests: Request[];
  onAccept: (requestId: string) => void;
  onReject: (requestId: string) => void;
  accpectStatus: "idle" | "pending";
  rejectStatus: "idle" | "pending";
}

export default function RequestList({
  requests,
  onAccept,
  onReject,
  accpectStatus,
  rejectStatus,
}: RequestListProps) {
  return (
    <>
      {requests.map((request) => (
        <>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                {...stringAvatar(getName(request.firstName, request.lastName))}
              />
            </ListItemAvatar>
            <ListItemText
              primary={getName(request.firstName, request.lastName)}
              secondary={
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Box>
                    <Button
                      onClick={() => onAccept(request.id)}
                      disabled={accpectStatus === "pending"}
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={() => onReject(request.id)}
                      disabled={rejectStatus === "pending"}
                    >
                      Reject
                    </Button>
                  </Box>
                  <Typography>
                    {formatTimeAgo(new Date(request?.createdAt).getTime())}{" "}
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
