import React from "react";
import { NavLink } from "react-router-dom";

const MainNavigation = () => (
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
      View All Employees
    </NavLink>
  </nav>
);

export default MainNavigation;
