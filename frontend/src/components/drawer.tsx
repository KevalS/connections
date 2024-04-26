import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import { useNavigate } from "react-router-dom";

const DrawerComponent = () => {
  const navigate = useNavigate();
  const drawerList = [
    {
      icon: <PeopleAltIcon />,
      text: "Users",
      path: "/users",
    },
    {
      icon: <DynamicFeedIcon />,
      text: "Feeds",
      path: "/feeds",
    },
    {
      icon: <Diversity1Icon />,
      text: "Friends",
      path: "/friends",
    },
    {
      icon: <PersonAddAlt1Icon />,
      text: "Requests",
      path: "/requests",
    },
    {
      icon: <NotificationAddIcon />,
      text: "Notifications",
      path: "/notifications",
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const DrawerList = (
    <Box
      sx={{ width: 250, marginTop: "64px", maxWidth: "200px" }}
      role="presentation"
    >
      <List>
        {drawerList.map(({ icon, text, path }) => (
          <ListItem
            key={text}
            disablePadding
            onClick={() => handleNavigation(path)}
          >
            <ListItemButton>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Drawer
        open={true}
        variant="permanent"
        sx={{ marginTop: "64px", position: "fixed" }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default DrawerComponent;
