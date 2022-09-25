import { Alert } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return (
    <div>
      <Alert style={notification ? style : { display: "none" }}>
        {notification}
      </Alert>
    </div>
  );
};

export default Notification;
