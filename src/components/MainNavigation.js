import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const MainNavigation = ({ auth, filters }) => {
  const authUser = auth.authUser;
  let isAdminForEmployee = false;

  let adminNavigation = false;
  if (authUser) {
    if (authUser.role === "admin" && authUser.unit === "GLOBAL") {
      adminNavigation = true;
    }
    if (
      authUser.role === "admin" &&
      (authUser.unit === filters.unit || authUser.unit === "GLOBAL")
    ) {
      isAdminForEmployee = true;
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
      {isAdminForEmployee && (
        <NavLink
          className="page-header__navlink"
          to="/create"
          activeClassName="is-active"
        >
          Add Employee
        </NavLink>
      )}
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
  filters: state.filters,
});

export default connect(mapStateToProps)(MainNavigation);
