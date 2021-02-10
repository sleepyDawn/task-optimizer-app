import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Header from "../components/Header";

export const AdminRoute = ({ isAdmin, component: Component, ...rest }) => (
  <Route
    {...rest}
    component={(props) =>
      isAdmin ? (
        <div>
          <Header></Header>
          <Component {...props}></Component>
        </div>
      ) : (
        <Redirect to="/dashboard"></Redirect>
      )
    }
  ></Route>
);

const mapStateToProps = (state) => {
  let isAdmin = false;
  const uid = state.auth.uid;
  if (!!uid) {
    const { role, unit } = state.auth.authUser;
    isAdmin = role === "admin" && unit === "GLOBAL";
  }

  return {
    isAdmin,
  };
};

export default connect(mapStateToProps)(AdminRoute);
