import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import State_City_Data from "../../Service/Data";
import userService from "../../Service/UserService";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DriveFileRenameOutlineSharpIcon from "@mui/icons-material/DriveFileRenameOutlineSharp";
import "./Setting.css";
import {
  Alert,
  CircularProgress,
  IconButton,
  Slide,
  Snackbar,
} from "@mui/material";
import { set } from "date-fns";
import validator from "validator";
import UserService from "../../Service/UserService";
import AuthenticationService from "../../Service/AuthenticationService";

export default function Setting() {
  const [role, setRole] = useState(AuthenticationService.getUserRoles());
  const { data } = State_City_Data;
  const stateList = Object.keys(data);
  const [cityList, setCityList] = useState([]);
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [isPwdEdit, setIsPwdEdit] = useState(false);
  const [isLocationEdit, setIsLocationEdit] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: userService.getUsername()?.split(" ")[0],
    lastName: userService.getUsername()?.split(" ")[1],
    dateOfBirth: userService.getUserDob(),
    gender: userService.getUserGender(),
    phoneNumber: userService.getUserMobile(),
    Email: userService.getUserEmail(),
    bloodGroup: userService.getUserBloodGroup(),
  });
  const [password, setPassword] = useState({
    oldPass: "",
    newPass: "",
  });
  const [passMatch, setPassMatch] = useState(true);
  const [newAddress, setNewAddress] = useState({
    streetAddress: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [statusInfo, setStatusInfo] = useState({
    checkedStatus: userService.getUserAvalibilityStatus(),
    newLastDonationDate: userService.getUserlastDonationDate(),
  });
  const [isAlert, setAlert] = useState(true);
  const [alertInfo, setAlertInfo] = useState({
    type: "",
    message: "",
  });
  const handleClose = () => {
    setAlert(false);
  };
  const handleChange = (event) => {
    console.log(event.target.checked);
    setStatusInfo({ ...statusInfo, checkedStatus: event.target.checked });
  };
  const handleProfileChanges = (e) => {
    e.preventDefault();
    console.log(userDetails);
    //setSpinner(true);
    if (
      !userDetails.firstName ||
      !userDetails.lastName ||
      !userDetails.Email ||
      !userDetails.bloodGroup ||
      !userDetails.phoneNumber ||
      !userDetails.dateOfBirth ||
      !userDetails.gender
    ) {
      setAlertInfo({ type: "error", message: "Please fill in all fields" });
      setAlert(true);
      return;
    }

    if (!validator.isEmail(userDetails.Email)) {
      setAlertInfo({ type: "error", message: "Invalid Email" });
      setAlert(true);
      return;
    }

    userService
      .updateUserProfileInfo(userDetails)
      .then((res) => {
        console.log(res);
        setAlertInfo({ type: "success", message: res.data.message });
        setAlert(true);
        const user = res.data.updatedDetails;
        UserService.setUserDetails({ user });
      })
      .catch((err) => {
        console.log(err.message);
        setAlertInfo({ type: "error", message: err.response.data.message });
        setAlert(true);
      });
  };
  const handlePasswordChange = (e) => {
    e.preventDefault();
    console.log(password);
    if (!password.oldPass || !password.newPass) {
      setAlertInfo({ type: "error", message: "Please fill in all fields" });
      setAlert(true);
      return;
    }

    if (
      !validator.isStrongPassword(password.newPass, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setAlert(true);
      setAlertInfo({
        type: "error",
        message:
          "Password must be 8 character and contain atleast one Lowercase, Uppercase, Numbers & Symbols",
      });
      return;
    }

    userService
      .updatePassword(password)
      .then((res) => {
        console.log(res);
        setAlertInfo({ type: "success", message: res.data.message });
        setAlert(true);
      })
      .catch((err) => {
        console.error("Error response:", err.response);
        setAlertInfo({ type: "error", message: err.response.data.message });
        setAlert(true);
      });
  };

  const handleLocationChange = (e) => {
    e.preventDefault();
    console.log(newAddress);
    if (
      !newAddress.streetAddress ||
      !newAddress.state ||
      !newAddress.city ||
      !newAddress.pincode
    ) {
      setAlertInfo({ type: "error", message: "Please fill in all fields" });
      setAlert(true);
      return;
    }

    userService
      .updateUserAddress(newAddress)
      .then((res) => {
        console.log(res);
        setAlertInfo({ type: "success", message: res.data.message });
        setAlert(true);
        const updatedAddress = res.data.updatedAddress;

        sessionStorage.setItem("userAddress", updatedAddress);
      })
      .catch((err) => {
        console.log(err);
        setAlertInfo({ type: "error", message: err.response.data.message });
        setAlert(true);
        console.log(err);
      });
  };
  const handleStatus = (e) => {
    e.preventDefault();
    console.log(statusInfo);
    if (!statusInfo.newLastDonationDate) {
      setAlertInfo({ type: "error", message: "Please fill in all fields" });
      setAlert(true);
      return;
    }
    userService
      .updateUserStatus(statusInfo)
      .then((res) => {
        console.log(res);
        setAlertInfo({ type: "success", message: res.data.message });
        setAlert(true);
        localStorage.setItem("status", res.data.status);
        localStorage.setItem("LDDs", res.data.lastDonationDate);
        setStatusInfo({
          checkedStatus: res.data.status,
          newLastDonationDate: res.data.lastDonationDate,
        });
      })
      .catch((err) => {
        console.log(err);
        setAlertInfo({ type: "error", message: err.response.data.message });
        setAlert(true);
        console.log(err);
      });
  };

  return (
    <div className="setting_container">
      <Snackbar
        open={isAlert}
        autoHideDuration={1500}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        fullWidth
        onClose={handleClose}
        sx={{ marginTop: 8 }}
      >
        <Alert severity={alertInfo.type} variant="filled" fullWidth>
          {alertInfo.message}
        </Alert>
      </Snackbar>
      <section className="setting_sideMenu">
        <div>
          <h4>
            <a href="#usr_profile">Profile</a>
            <br />
          </h4>
          <h4>
            <a href="#usr_pass">Change Password</a>
            <br />
          </h4>
          <h4>
            <a href="#usr_location">Location</a>
            <br />
          </h4>
          <h4
            style={{
              display: role.includes(1569) ? "block" : "none",
            }}
          >
            <a href="#usr_status">Status</a>
            <br />
          </h4>
          <h4>
            <a href="#usr_signout">Sign Out</a>
            <br />
          </h4>
        </div>
      </section>
      <section className="setting_profile">
        <div id="usr_profile" className="usr_profile">
          <div
            style={{
              display: "flex",
              gap: 5,
              alignItems: "center",
              width: "max-Content",
            }}
          >
            <h2>Profile</h2>
            <IconButton
              sx={{ "&:hover": { backgroundColor: "transparent" } }}
              onClick={() => setIsProfileEdit(!isProfileEdit)}
            >
              {isProfileEdit ? (
                <DriveFileRenameOutlineSharpIcon sx={{ marginBottom: 2 }} />
              ) : (
                <DriveFileRenameOutlineIcon sx={{ marginBottom: 2 }} />
              )}
            </IconButton>
          </div>
          <Box component="form" Validate sx={{ mt: 2 }}>
            <div className="setting_form_grid">
              <TextField
                value={userDetails.firstName}
                id="firstName"
                label="First Name"
                name="firstName"
                variant="filled"
                size="small"
                color="error"
                style={{ gridArea: "FName" }}
                autoComplete="firstName"
                fullWidth
                disabled={!isProfileEdit}
                onChange={(e) => {
                  e.persist();
                  setUserDetails({
                    ...userDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
              />

              <TextField
                value={userDetails.lastName}
                id="lastName"
                label="Last Name"
                name="lastName"
                variant="filled"
                size="small"
                color="error"
                style={{ gridArea: "LName" }}
                autoComplete="lastName"
                fullWidth
                disabled={!isProfileEdit}
                onChange={(e) => {
                  e.persist();
                  setUserDetails({
                    ...userDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
              />

              <TextField
                value={userDetails.dateOfBirth}
                id="dateOfBirth"
                label="Date Of Birth"
                name="dateOfBirth"
                variant="filled"
                size="small"
                color="error"
                style={{ gridArea: "DoB" }}
                autoComplete="dateOfBirth"
                fullWidth
                disabled={!isProfileEdit}
                onChange={(e) => {
                  e.persist();
                  setUserDetails({
                    ...userDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
              />

              <TextField
                value={userDetails.gender}
                id="gender"
                label="Gender"
                name="gender"
                variant="filled"
                size="small"
                color="error"
                style={{ gridArea: "Gender" }}
                autoComplete="gender"
                fullWidth
                disabled={!isProfileEdit}
                onChange={(e) => {
                  e.persist();
                  setUserDetails({
                    ...userDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
              />

              <TextField
                value={userDetails.bloodGroup}
                id="bloodGroup"
                label="Blood Group"
                name="bloodGroup"
                variant="filled"
                size="small"
                color="error"
                style={{ gridArea: "BGroup" }}
                autoComplete="bloodGroup"
                fullWidth
                disabled={!isProfileEdit}
                onChange={(e) => {
                  e.persist();
                  setUserDetails({
                    ...userDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
              />

              <TextField
                value={userDetails.phoneNumber}
                id="whatsApp"
                label="Phone Number"
                name="phoneNumber"
                variant="filled"
                size="small"
                color="error"
                style={{ gridArea: "Phone" }}
                autoComplete="whatsApp"
                fullWidth
                disabled={!isProfileEdit}
                onChange={(e) => {
                  e.persist();
                  setUserDetails({
                    ...userDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
              />

              <TextField
                value={userDetails.Email}
                id="email"
                label="Email Id"
                name="Email"
                variant="filled"
                size="small"
                color="error"
                style={{ gridArea: "Email" }}
                autoComplete="email"
                fullWidth
                disabled={!isProfileEdit}
                onChange={(e) => {
                  e.persist();
                  setUserDetails({
                    ...userDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
              />

              <Button
                type="submit"
                disabled={!isProfileEdit}
                style={{ gridArea: "Btn" }}
                variant="contained"
                sx={{
                  mt: 2,
                  mb: 2,
                  fontSize: "15px",
                  fontWeight: "bold",
                  backgroundColor: "#c6414c",
                  ":hover": { bgcolor: "#c6414c" },
                }}
                onClick={handleProfileChanges}
              >
                Save
                {/*                 {Spinner && (
                  <CircularProgress
                    sx={{
                      ml: 2,
                      color: "white",
                    }}
                    size={20}
                  />
                )} */}
              </Button>
            </div>
          </Box>
        </div>
        <hr
          style={{
            height: "1px",
            margin: "0 70px 70px",
            border: "0",
            backgroundColor: "#a5a5a5",
          }}
        />
        <div id="usr_pass" className="usr_pass">
          <div
            style={{
              display: "flex",
              gap: 5,
              alignItems: "center",
              width: "max-Content",
            }}
          >
            <h2>Update Password</h2>
            <IconButton
              sx={{ "&:hover": { backgroundColor: "transparent" } }}
              onClick={() => setIsPwdEdit(!isPwdEdit)}
            >
              {isPwdEdit ? (
                <DriveFileRenameOutlineSharpIcon sx={{ marginBottom: 2 }} />
              ) : (
                <DriveFileRenameOutlineIcon sx={{ marginBottom: 2 }} />
              )}
            </IconButton>
          </div>
          <Box component="form" Validate sx={{ mt: 2 }}>
            <div style={{ display: "grid", gap: "20px" }}>
              <TextField
                id="oldPass"
                label="Old Password"
                name="oldPass"
                variant="filled"
                size="small"
                color="error"
                autoComplete="oldPass"
                disabled={!isPwdEdit}
                value={password.oldPass}
                onChange={(e) => {
                  e.persist();
                  setPassword({ ...password, [e.target.name]: e.target.value });
                }}
              />

              <TextField
                id="newPass"
                label="New Password"
                name="newPass"
                variant="filled"
                size="small"
                color="error"
                disabled={!isPwdEdit}
                autoComplete="newPass"
                value={password.newPass}
                onChange={(e) => {
                  e.persist();
                  setPassword({ ...password, [e.target.name]: e.target.value });
                }}
                type="password"
              />

              <TextField
                id="confirmPass"
                label="Confirm Password"
                name="confirmPass"
                variant="filled"
                size="small"
                color="error"
                autoComplete="confirmPass"
                disabled={!isPwdEdit}
                type="password"
                onChange={(e) => {
                  e.persist();
                  const confirmPass = e.target.value;
                  setPassMatch(password.newPass === confirmPass);
                }}
                error={!passMatch}
                helperText={!passMatch ? "Passwords do not match" : ""}
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              disabled={!isPwdEdit}
              sx={{
                mt: 2,
                mb: 2,
                fontSize: "15px",
                fontWeight: "bold",
                backgroundColor: "#c6414c",
                ":hover": { bgcolor: "#c6414c" },
              }}
              onClick={handlePasswordChange}
            >
              CHANGE
              {/* {Spinner && (<CircularProgress sx={{ml:2, color:'white'}} size={20}/>)} */}
            </Button>
          </Box>
        </div>
        <hr
          style={{
            height: "1px",
            margin: "0 70px 70px",
            border: "0",
            backgroundColor: "#a5a5a5",
          }}
        />
        <div id="usr_location" className="usr_location">
          <div
            style={{
              display: "flex",
              gap: 5,
              alignItems: "center",
              width: "max-Content",
            }}
          >
            <h2>Location</h2>
            <IconButton
              sx={{ "&:hover": { backgroundColor: "transparent" } }}
              onClick={() => setIsLocationEdit(!isLocationEdit)}
            >
              {isLocationEdit ? (
                <DriveFileRenameOutlineSharpIcon sx={{ marginBottom: 2 }} />
              ) : (
                <DriveFileRenameOutlineIcon sx={{ marginBottom: 2 }} />
              )}
            </IconButton>
          </div>
          <Box component="form" Validate sx={{ mt: 2 }}>
            <div className="setting_location_grid">
              <TextField
                value={newAddress.streetAddress}
                id="streetAddress"
                label="Street Address"
                name="streetAddress"
                variant="filled"
                size="small"
                color="error"
                style={{ gridArea: "Address" }}
                autoComplete="streetAddress"
                fullWidth
                disabled={!isLocationEdit}
                onChange={(e) => {
                  e.persist();
                  setNewAddress({
                    ...newAddress,
                    [e.target.name]: e.target.value,
                  });
                }}
              />

              <FormControl
                style={{ gridArea: "State" }}
                variant="filled"
                size="small"
                fullWidth
              >
                <InputLabel id="State-label" color="error" required>
                  State
                </InputLabel>
                <Select
                  id="state"
                  labelId="State-label"
                  name="state"
                  label="State*"
                  value={newAddress.state}
                  color="error"
                  required
                  onChange={(e) => {
                    setNewAddress({
                      ...newAddress,
                      [e.target.name]: e.target.value,
                    });
                    setCityList(data[e.target.value].cities);
                  }}
                  disabled={!isLocationEdit}
                >
                  {stateList.map((name, key) => (
                    <MenuItem key={key} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                style={{ gridArea: "City" }}
                variant="filled"
                size="small"
                fullWidth
              >
                <InputLabel id="City-label" color="error" required>
                  City
                </InputLabel>
                <Select
                  id="city"
                  labelId="City-label"
                  name="city"
                  label="City*"
                  value={newAddress.city}
                  color="error"
                  required
                  onChange={(e) => {
                    setNewAddress({
                      ...newAddress,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  disabled={!isLocationEdit}
                >
                  <MenuItem key="default" value="Default" disabled>
                    Select City
                  </MenuItem>
                  {cityList.map((name, key) => (
                    <MenuItem key={key} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                value={newAddress.pincode}
                id="pincode"
                label="Pincode"
                name="pincode"
                variant="filled"
                size="small"
                color="error"
                style={{ gridArea: "Pin" }}
                autoComplete="pin"
                fullWidth
                disabled={!isLocationEdit}
                onChange={(e) => {
                  setNewAddress({
                    ...newAddress,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                pl: 4,
                pr: 4,
                fontSize: "15px",
                fontWeight: "bold",
                backgroundColor: "#c6414c",
                ":hover": { bgcolor: "#c6414c" },
              }}
              disabled={!isLocationEdit}
              onClick={handleLocationChange}
            >
              Save
              {/* {Spinner && (<CircularProgress sx={{ml:2, color:'white'}} size={20}/>)} */}
            </Button>
          </Box>
        </div>
        <hr
          style={{
            height: "1px",
            margin: "0 70px 70px",
            border: "0",
            backgroundColor: "#a5a5a5",
          }}
        />
        <div
          id="usr_status"
          className="usr_status"
          style={{
            display: role.includes(1569) ? "block" : "none",
          }}
        >
          <h2>Avalibility Status</h2>
          <Box component="form" Validate sx={{ mt: 2 }}>
            <div className="setting_avaliable_grid">
              <TextField
                value={statusInfo.newLastDonationDate}
                id="newLastDonationDate"
                label="Last Donation Date (MM/DD/YYYY)"
                name="newLastDonationDate"
                variant="filled"
                size="small"
                color="error"
                style={{ gridArea: "LDD" }}
                autoComplete="lastDonationDate"
                fullWidth
                onChange={(e) => {
                  e.persist();
                  setStatusInfo({
                    ...statusInfo,
                    [e.target.name]: e.target.value,
                  });
                }}
              />

              <div style={{ gridArea: "Status" }}>
                <span style={{ fontSize: "18px" }}>
                  Are you ready to donate Blood?&nbsp;&nbsp;&nbsp;
                </span>
                <Switch
                  checked={statusInfo.checkedStatus}
                  color="error"
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>

              {/* <TextField value='Available' id="status" label="Status" name="status" variant="filled" size="small" color="error" style={{gridArea:'Status'}} autoComplete="status" fullWidth 
                        /> */}
            </div>

            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                pl: 4,
                pr: 4,
                fontSize: "15px",
                fontWeight: "bold",
                backgroundColor: "#c6414c",
                ":hover": { bgcolor: "#c6414c" },
              }}
              onClick={handleStatus}
            >
              Save
              {/* {Spinner && (<CircularProgress sx={{ml:2, color:'white'}} size={20}/>)} */}
            </Button>
          </Box>
        </div>
      </section>
    </div>
  );
}
