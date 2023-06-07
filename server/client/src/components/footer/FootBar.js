import React from "react";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import { Link } from "react-router-dom";

export default function FootBar() {

  
  return (
    <div
      style={{
        width: "100%",
        bottom: "0",
        position: "absolute",
        display: "flex",
        justifyContent: "space-around",
        marginBottom: "20px",
      }}
    >
      <Link to="/home">
        <FindInPageIcon style={{ color: "white" }} />
      </Link>

      <Link to="/today-music">
        <LocalFireDepartmentIcon style={{ color: "white" }} />
      </Link>

      <Link to="/profile">
        <AccountCircleIcon style={{ color: "white" }} />
      </Link>

      <Link to="/settings">
        {" "}
        <SettingsIcon style={{ color: "white" }} />
      </Link>

      {/* <FontAwesomeIcon
        icon={faHouse}
        size="2x"
        onClick={() => (document.location.href = "/home")}
      />
      <FontAwesomeIcon
        icon={faFire}
        size="2x"
        onClick={() => (document.location.href = "/home")}
      />
      <FontAwesomeIcon
        icon={faUser}
        size="2x"
        onClick={() => (document.location.href = "/profile")}
      /> */}
    </div>
  );
}
