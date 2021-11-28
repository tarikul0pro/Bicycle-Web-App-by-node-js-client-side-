import { CircularProgress } from "@mui/material";

import React from "react";
import { Redirect, Route } from "react-router";
import useAuth from "../../../hooks/useAuth.js";

const PrivateAdmin = ({ children, ...rest }) => {
  const { user, isLoading, admin } = useAuth();
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <CircularProgress color="success" />
      </div>
    );
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.email && admin ? (
          children
        ) : (
          <Redirect
            to={{ pathname: "/dashboard", state: { from: location } }}
          />
        )
      }
    />
    
  );
};

export default PrivateAdmin;
