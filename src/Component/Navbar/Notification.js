import { Badge, Box, Menu, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserService from "../../Service/UserService";
import Notifications from "@mui/icons-material/Notifications";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import CommentsDisabledIcon from "@mui/icons-material/CommentsDisabled";
import "./Navbar.css";

const Notification = () => {
  const [notificationList, setNotificationList] = useState([]);
  const [isNewnotification, setIsNewNotification] = useState(false);
  const [notificationanchorEl, setnotificationAnchorEl] = useState(null);
  const openNotificationDropdown = Boolean(notificationanchorEl);

  const handleNotificationClick = (event) => {
    setnotificationAnchorEl(event.currentTarget);
  };
  const handleNotificationClose = () => {
    setnotificationAnchorEl(null);
  };
  useEffect(() => {
    UserService.getUserNotifications()
      .then((res) => {
        //console.log(res);
        setNotificationList(res?.data?.list);
        setIsNewNotification(res?.data?.isNew);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <Badge
        id="notification-button"
        aria-controls={
          openNotificationDropdown ? "notification-menu" : undefined
        }
        aria-haspopup="true"
        aria-expanded={openNotificationDropdown ? "true" : undefined}
        onClick={handleNotificationClick}
        variant={isNewnotification ? "dot" : ""}
        color="warning"
        title="Notifications"
        sx={{
          cursor: "pointer",
        }}
      >
        <Notifications
          color="action"
          onClick={() => setIsNewNotification(false)}
        />
      </Badge>
      <Menu
        id="notification-menu"
        anchorEl={notificationanchorEl}
        open={openNotificationDropdown}
        onClose={handleNotificationClose}
        MenuListProps={{
          "aria-labelledby": "notification-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          sx={{
            maxHeight: "250px",
            width: "20rem",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          <Box
            sx={{
              paddingY: "5px",
              paddingX: 2,
              position: "fixed",
              width: "17rem",
              zIndex: 50,
              backgroundColor: "white",
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 5px 5px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
            }}
          >
            <Typography variant="p" fontWeight={550}>
              Notification
            </Typography>
          </Box>
          <br />
          <br />
          {notificationList && notificationList.length > 0 ? (
            notificationList?.map((item, key) => {
              return (
                <MenuItem
                  onClick={handleNotificationClose}
                  key={key}
                  sx={{
                    bgcolor: !item.isRead ? "#FFF2F2" : "",
                    width: "100%",
                    whiteSpace: "normal",
                    // wordWrap: "break-word", // Break words if necessary
                    padding: 1,
                    borderBottom: "1px solid #D6D5D5",
                  }}
                >
                  <BloodtypeIcon sx={{ color: "#F86263", fontSize: "25px" }} />{" "}
                  &nbsp; &nbsp;{" "}
                  <Typography variant="p" fontSize={"14px"}>
                    {item.message} &nbsp;&nbsp; {item.time}
                  </Typography>
                </MenuItem>
              );
            })
          ) : (
            <>
              <svg
                width="100%"
                height="100"
                viewBox="0 0 184 150"
                aria-hidden
                focusable="false"
              >
                <g fill="none" fillRule="evenodd">
                  <g transform="translate(24 31.67)">
                    <ellipse
                      cx="67.797"
                      cy="106.89"
                      rx="67.797"
                      ry="12.668"
                      fill="#f5f5f5"
                      fillOpacity="0.8"
                    />
                    <path
                      fill="#aeb8c2"
                      d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                    />
                    <path
                      fill="#f5f5f7"
                      d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                    />
                    <path
                      fill="#dce0e6"
                      d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                    />
                  </g>
                  <path
                    fill="#dce0e6"
                    d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                  />
                  <g fill="#fff" transform="translate(149.65 15.383)">
                    <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
                    <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
                  </g>
                </g>
              </svg>
              <p style={{ textAlign: "center" }}>Empty...</p>
            </>
          )}
        </Box>
      </Menu>
    </>
  );
};

export default Notification;
