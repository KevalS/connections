import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useState, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import BasicModal from "./statusUpdateModal";
import { useDispatch } from "react-redux";
import { updateStatus } from "../pages/users/users.slice";

export const Header = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const handleModalClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (type: string) => {
    if (type === "logout") {
      localStorage.clear();
      navigate("/login");
    }
    setAnchorEl(null);
  };

  const hadnleUpdateStatus = () => {
    setOpen(true);
  };

  const onSubmit = (status: string) => {
    const userId = localStorage.getItem("userId");
    dispatch(updateStatus({ userId, status }));
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Diversity2Icon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Friends Hub
          </Typography>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "white",
              marginRight: 6,
              "&:hover": { backgroundColor: "#cfe5fb" },
            }}
            onClick={hadnleUpdateStatus}
          >
            Update Status
          </Button>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleClose("logout")}>Log Out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <BasicModal
        open={open}
        handleModalClose={handleModalClose}
        onSubmit={onSubmit}
        handleOpen={handleOpen}
      />
    </Box>
  );
};
