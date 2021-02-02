import React from "react";
// import numeral from "numeral";
import { connect } from "react-redux";
import MainNavigation from "./MainNavigation";
import selectEmployees from "../selectors/employeesSelector";

export const EmployeesSummary = ({ employeesCount, dueDateItem }) => {
  const employeesWord = employeesCount > 1 ? "employees" : "employee";
  const dueDateWord = dueDateItem === "pme" ? "PME" : "VTC";
  // const formatExpensesTotal = ` ${numeral(expensesTotal).format("0,0.00")}`;
  return (
    <div className="page-header">
      <div className="content-container">
        <MainNavigation></MainNavigation>
        <h1 className="page-header__title">
          Viewing <span>{dueDateWord}</span> Due Date of{" "}
          <span>{employeesCount}</span> {employeesWord}.
        </h1>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleEmployees = selectEmployees(state.employees, state.filters);
  return {
    employeesCount: visibleEmployees.length,
    dueDateItem: state.filters.dueDateItem,
  };
};

export default connect(mapStateToProps)(EmployeesSummary);
