import React from "react";
import { connect } from "react-redux";
import EmployeeListItem from "./EmployeeListItem";
import selectEmployees from "../selectors/employeesSelector";

export const EmployeeList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Employees</div>
      <div className="show-for-desktop">Employee</div>
      <div className="show-for-desktop">
        {props.dueDateItem === "pme" ? "PME Due Date" : "VTC Due Date"}
      </div>
    </div>
    <div className="list-body">
      {props.employees.length === 0 ? (
        <div className="list-item list-item--message">
          <span>No Employees</span>
        </div>
      ) : (
        <div>
          {props.employees.map((employee) => (
            <EmployeeListItem key={employee.id} {...employee} />
          ))}
        </div>
      )}
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    dueDateItem: state.filters.dueDateItem,
  };
};

export default connect(mapStateToProps)(EmployeeList);
