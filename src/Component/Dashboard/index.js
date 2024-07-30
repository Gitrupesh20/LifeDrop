import "./Dashboard.css";
import React from "react";
import { useState } from "react";
import SentRequest from "./SentRequest";
import Avatar from "@mui/material/Avatar";
import Notification from "./Notification";
import RecivedRequest from "./RecivedRequest";
import UserService from "../../Service/UserService";
import AuthenticationService from "../../Service/AuthenticationService";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";

export default function Dashboard() {
  const [roles, setroles] = useState(AuthenticationService.getUserRoles());

  const [userAge, setuserAge] = useState(UserService.getUserAge());
  const [userName, setuserName] = useState(UserService.getUsername());
  const [userEmail, setuserEmail] = useState(UserService.getUserEmail());
  const [userMobile, setuserMobile] = useState(UserService.getUserMobile());
  const [userAddress, setuserAddress] = useState(UserService.getUserAdress());
  const [userBloodGroup, setuserBloodGroup] = useState(
    UserService.getUserBloodGroup()
  );
  const [userDOB, SetUserDob] = useState(UserService.getUserDob());
  const [userLastDonationDate, setUSerLastDonationDate] = useState(
    new Date(
      UserService.getUserlastDonationDate() || "5-01-2022"
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  );

  //console.log(roles);
  return (
    <>
      <div className="dashboard">
        <div className="user-detail">
          <div className="detail-card">
            <Avatar sx={{ width: 50, height: 50 }} />
            <div>
              <span style={{ fontSize: "20px", letterSpacing: "2px" }}>
                {userName.toUpperCase()}
              </span>
              <div className="details">
                <div>
                  <p>Age: {userAge}</p>
                  <p>Mobile: {userMobile}</p>
                </div>
                <div>
                  {<p>Address: {userAddress}</p>}
                  <p>Email: {userEmail}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="user-card">
            <div
              className="blur-card"
              style={{
                filter: `${roles.includes(1569) ? "none" : "blur(5px)"}`,
              }}
            >
              <div
                id="card-vector1"
                style={{
                  backgroundImage: `url(${
                    process.env.PUBLIC_URL + "/assets/Vector_1.png"
                  })`,
                }}
              ></div>
              <div
                id="card-vector2"
                style={{
                  backgroundImage: `url(${
                    process.env.PUBLIC_URL + "/assets/Vector_2.png"
                  })`,
                }}
              ></div>
              {/* this section for donor */}
              <div className="user-card-details">
                <p style={{ fontSize: "12px" }}>bronze</p>
                <p>{userName.toUpperCase()}</p>
                <p>{`LDDs ${userLastDonationDate}`}</p>
                <p>{userBloodGroup}</p>
              </div>
              <img
                className="logo2"
                src={process.env.PUBLIC_URL + "/assets/logo2.png"}
                alt="logo"
              />
            </div>
            <div
              id="block-card"
              style={{ display: `${roles.includes(1569) ? "none" : "block"}` }}
            >
              <h3>BE DONOR</h3>
              <p>Become a donor to activate card</p>
            </div>
          </div>
        </div>
        <div className="non-donor">
          <div>
            <h1
              style={{
                color: "#FF5C00",
                margin: "0 0 0",
                textShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              Be A Hero - It’s In Your Blood
            </h1>
            <span style={{ color: "#8F8F8F" }}>
              {roles.includes(1569) ? "Thanks for being" : "Register to be"} a
              blood donor, give blood and save lives.
            </span>
          </div>
          {roles.includes(1569) ? (
            <button id="donor-btn">DONATE BLOOD</button>
          ) : (
            <button
              id="donor-btn"
              onClick={() => window.open("/donors/signup")}
            >
              BE DONOR
            </button>
          )}
        </div>
        {roles.includes(1569) && (
          <div className="blood-service">
            <p className="section-title">BLOOD NEEDED BY</p>
            <div id="needed-card">
              <RecivedRequest />
            </div>
          </div>
        )}
        <div className="blood-service">
          <p className="section-title">REQUEST STATUS</p>
          <div id="status-table">
            <SentRequest />
          </div>
        </div>
      </div>
    </>
  );
}
