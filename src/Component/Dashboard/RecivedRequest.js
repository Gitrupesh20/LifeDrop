import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import RequestService from "../../Service/RequestService";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import "./Dashboard.css";
import Troubleshoot from "@mui/icons-material/Troubleshoot";
import { Typography } from "@mui/material";
import UserService from "../../Service/UserService";
import Swal from "sweetalert2";

function stringAvatar(name) {
  // console.log(name);
  return {
    children: `${name?.split(" ")[0][0]} ${name?.split(" ")[1] ? [0] : " "}`,
  };
}

export default function RecivedRequest() {
  const [Loading, setLoading] = useState(true);
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    RequestService.getRecivedRequest()
      .then((res) => {
        // console.log(res);
        setRequestList(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //console.log(requestList);

  const handleAccept = async (id) => {
    console.log(id);
    await UserService.sendAcceptRequest(id)
      .then((res) => {
        console.log(res);
        const filterReq = requestList.filter((item) => item._id !== id);
        setRequestList(filterReq);
        Swal.fire({
          imageUrl: `${process.env.PUBLIC_URL}/assets/WYW2.png`,
          imageHeight: "200",
          imageWidth: "250",
          title: "Thank you, for Saving life!",
          html: `<p style={{fontSize:"11px"}}> We will share your details to recipient and they will contact you after</p>`,

          confirmButtonText: "ok",
          allowOutsideClick: false,
          allowEscapeKey: false,
          focusConfirm: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDecline = async (id) => {
    await UserService.sendDeclineRequest(id)
      .then((res) => {
        console.log(res);
        const filterReq = requestList.filter((item) => item._id !== id);
        setRequestList(filterReq);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return Loading ? (
    <div>
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </div>
  ) : (
    <>
      {requestList && requestList.length > 0 ? (
        requestList.map((data, key) => {
          return (
            <div className="recived-card" key={data._id}>
              <div className="sender-section">
                <Avatar
                  sx={{ width: 40, height: 40 }}
                  {...stringAvatar(data?.bloodRecipientID?.patientName)}
                />
                <div style={{ flex: "1" }}>
                  <span style={{ fontSize: "18px", letterSpacing: "2px" }}>
                    {data?.bloodRecipientID?.patientName.toUpperCase()}
                  </span>
                  <br />
                  <p>
                    {data?.bloodRecipientID?.streetAddress +
                      ", " +
                      data?.bloodRecipientID?.city}
                  </p>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p>Age: {data?.bloodRecipientID?.age}</p>
                    <p>Gender: {data?.bloodRecipientID?.gender}</p>
                  </div>
                  <p>Unit Required: {data?.bloodRecipientID?.unitsRequired}</p>
                  <p>Contact No.: {data?.bloodRecipientID?.phoneNumber}</p>
                </div>
                <div style={{ justifySelf: "right" }}>
                  <span
                    style={{
                      backgroundColor: "#bd3b3b",
                      padding: "5px 10px",
                      color: "white",
                      borderRadius: "20px",
                    }}
                  >
                    {data?.bloodRecipientID?.requiredBloodGroup}
                  </span>
                </div>
              </div>
              <div className="recived-action">
                <button
                  id="accept"
                  className="responce-btn"
                  onClick={() => handleAccept(data._id)}
                >
                  <CheckCircleTwoToneIcon sx={{ color: "green" }} />
                </button>
                <button
                  id="decline"
                  className="responce-btn"
                  onClick={() => handleDecline(data._id)}
                >
                  <CancelTwoToneIcon sx={{ color: "brown" }} />
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            gap: 1,
            flexDirection: "column",
          }}
        >
          <svg
            width="120"
            height="100"
            viewBox="0 0 184 152"
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
          <Typography>All clear! No recipient at this time.</Typography>
        </Box>
      )}
    </>
  );
}
