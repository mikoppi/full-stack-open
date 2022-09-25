import React from "react";

const Logout = ({ name, handleLogout }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", color: "yellow" }}>
      <p>{name} logged in</p>
      <button
        style={{
          color: "black",
        }}
        onClick={handleLogout}
      >
        logout
      </button>
    </div>
  );
};

export default Logout;
