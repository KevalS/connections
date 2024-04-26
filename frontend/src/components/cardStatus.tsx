import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { formatTimestamp } from "../services/genericFunctions";

const RenderStatus = ({
  status,
  createdAt,
}: {
  createdAt: string;
  status: any[];
}) => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={` - ${status || "NA"}`}
          secondary={
            <>
              <Typography
                sx={{
                  display: "inline",
                  fontSize: 10,
                  fontWeight: 600,
                  float: "right",
                }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {formatTimestamp(new Date(createdAt))}
              </Typography>
            </>
          }
        />
      </ListItem>
    </>
  );
};

export default function OutlinedCardStatus({ row }: any) {
  return (
    <Box>
      <Card
        variant="outlined"
        sx={{ height: 240, overflowY: "scroll", display: "flex" }}
      >
        <CardContent
          sx={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          {row?.statusList?.map((list: any) => {
            return (
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                  margin: "auto",
                }}
                key={list.context}
              >
                <RenderStatus
                  createdAt={list.createdAt}
                  status={list.context}
                />
              </List>
            );
          })}
          {!row?.statusList?.length ? (
            <div style={{ margin: "auto" }}>No Data available</div>
          ) : null}
        </CardContent>
      </Card>
    </Box>
  );
}
