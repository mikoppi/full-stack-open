import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const NavBar = ({ user, handleLogout }) => {
  const padding = {
    paddingRight: 35,
    color: "white",
    textDecoration: "none",
  };

  return (
    <AppBar
      style={{
        backgroundColor: "blue",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Toolbar>
        <Link style={padding} to="/blogs">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        <Logout name={user.name} handleLogout={handleLogout} />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
