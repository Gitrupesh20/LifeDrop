import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import AuthenticationService from "../../Service/AuthenticationService";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import UserService from "../../Service/UserService";
import ListItemIcon from "@mui/material/ListItemIcon";
import Person from "@mui/icons-material/Person";
import MenuItem from "@mui/material/MenuItem";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import { Box, Button, Fade } from "@mui/material";
import "./Navbar.css";

import Notification from "./Notification";

function stringAvatar(name) {
  return {
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

function SignUpButton() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        New User
      </button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            window.open("/donors/signup", "_self");
          }}
        >
          New Donor
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            window.open("/user/signup", "_self");
          }}
        >
          New User
        </MenuItem>
      </Menu>
    </>
  );
}

export default function Navbar() {
  const [userName, setuserName] = useState(UserService.getUsername());

  const [LoggedIn, setLoggedIn] = useState(false);
  const [useranchorEl, setuserAnchorEl] = useState(null);
  const openUserDropdown = Boolean(useranchorEl);

  const handleDropdownClick = (event) => {
    setuserAnchorEl(event.currentTarget);
  };
  const handleDropdownClose = () => {
    setuserAnchorEl(null);
  };

  useEffect(() => {
    (async () => {
      const loggedIn = await AuthenticationService.isUserLoggedIn();
      if (loggedIn) setLoggedIn(true);
    })();
  }, [LoggedIn]);

  return (
    <HideOnScroll>
      <AppBar sx={{ backgroundColor: "white" }}>
        <nav>
          <a href="/">
            <img
              id="logo"
              src={process.env.PUBLIC_URL + "/assets/LifeDrop.png"}
              alt="logo"
            />
          </a>
          <div id="mySidenav" className="sidenav">
            {LoggedIn ? (
              <Stack
                direction="row"
                spacing={7}
                justifyContent="center"
                alignItems="center"
              >
                <Notification />

                <Stack
                  id="user-button"
                  aria-controls={openUserDropdown ? "user-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openUserDropdown ? "true" : undefined}
                  onClick={handleDropdownClick}
                  direction="row"
                  spacing={1}
                  sx={{ cursor: "pointer" }}
                  title="Account settings"
                >
                  <Avatar
                    sx={{ width: 40, height: 40, bgcolor: "#c6414c" }}
                    {...stringAvatar(userName)}
                  />
                  <Paper
                    elevation={0}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      verticalAlign: "middle",
                      fontSize: "17px",
                    }}
                  >
                    {userName}
                  </Paper>
                </Stack>
                <Menu
                  id="user-menu"
                  anchorEl={useranchorEl}
                  open={openUserDropdown}
                  onClose={handleDropdownClose}
                  MenuListProps={{
                    "aria-labelledby": "user-button",
                  }}
                >
                  <MenuItem
                    onClick={(e) => {
                      window.open("/dashboard", "_self");
                    }}
                  >
                    <ListItemIcon>
                      <Person fontSize="small" />
                    </ListItemIcon>
                    My account
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      window.open("/dashboard/settings", "_self");
                    }}
                  >
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      AuthenticationService.logout();
                      window.location.reload();
                    }}
                  >
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </Stack>
            ) : (
              //<button id='logout' onClick={(e) => {AuthenticationService.logout(); window.location.reload();}}>SignOut</button>
              <>
                <SignUpButton />
                <button
                  onClick={(e) => {
                    window.open("/signin", "_self");
                  }}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </nav>
      </AppBar>
    </HideOnScroll>
  );
}
