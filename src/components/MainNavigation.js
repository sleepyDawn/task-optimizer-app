import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const MainNavigation = ({ auth }) => {
  const authUser = auth.authUser;
  let adminNavigation = false;
  if (authUser) {
    if (authUser.role === "admin" && authUser.unit === "GLOBAL") {
      adminNavigation = true;
    }
  }

  return (
    <nav className="page-header__nav">
      <NavLink
        className="page-header__navlink"
        to="/dashboard"
        activeClassName="is-active"
        exact={true}
      >
        Go Home
      </NavLink>
      <NavLink
        className="page-header__navlink"
        to="/create"
        activeClassName="is-active"
      >
        Add Employee
      </NavLink>
      <NavLink
        className="page-header__navlink"
        to="/employees"
        activeClassName="is-active"
        exact={true}
      >
        Employees
      </NavLink>
      {adminNavigation && (
        <NavLink
          className="page-header__navlink"
          to="/users"
          activeClassName="is-active"
          exact={true}
        >
          Users
        </NavLink>
      )}
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(MainNavigation);
