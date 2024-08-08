import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import UserService from "../../Service/UserService";

export default function Notification() {
  const [notificationList, setNotificationList] = useState([]);

  return (
    <>
      <div className="notice_list">
        <div className="list-bg">
          <div className="list"></div>
        </div>
        <div className="list-bg">
          <div className="list"></div>
        </div>
        <div className="list-bg">
          <div className="list"></div>
        </div>
        <div className="list-bg">
          <div className="list"></div>
        </div>
        <div className="list-bg">
          <div className="list"></div>
        </div>
        <div className="list-bg">
          <div className="list"></div>
        </div>
        <div className="list-bg">
          <div className="list"></div>
        </div>
        <div className="list-bg">
          <div className="list"></div>
        </div>
        <div className="list-bg">
          <div className="list"></div>
        </div>
        <div className="list-bg">
          <div className="list"></div>
        </div>
      </div>
    </>
  );
}
