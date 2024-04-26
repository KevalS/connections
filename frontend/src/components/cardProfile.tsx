import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../services/genericFunctions";
import EmailIcon from "@mui/icons-material/Email";
import { ButtonNameWithStatus } from "../services/genericConstants";

export default function OutlinedCardProfile({
  row,
  sendRequest,
  sendStatus,
}: {
  row: any;
  sendRequest: (userId: string) => void;
  sendStatus: "idle" | "pending" | "connected";
}) {
  return (
    <Box sx={{}}>
      <Card variant="outlined" sx={{ height: 240 }}>
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Avatar
            {...stringAvatar(row.name)}
            sx={{ width: 96, height: 96, margin: "0 auto" }}
          />
          <Typography
            sx={{
              fontSize: 14,
              paddingTop: 2,
              margin: "0 auto",
              fontWeight: 600,
            }}
            color="text.secondary"
            gutterBottom
          >
            {row.name}
          </Typography>

          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <EmailIcon sx={{ width: 16 }} />

            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              {row.email}
            </Typography>
          </div>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            size="small"
            disabled={row.status !== null}
            onClick={() => sendRequest(row.id)}
          >
            {ButtonNameWithStatus[sendStatus] || "Send Request"}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
