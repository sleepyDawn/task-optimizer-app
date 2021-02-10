import React, { useContext } from "react";
import { connect } from "react-redux";
import employeesSelector from "../selectors/employeesSelector";
import EmployeeListItem from "./EmployeeListItem";
import PaginationContext from "../context/pagination-context";
import PaginationComponent from "./PaginationComponent";

export const EmployeeList = (props) => {
  const { paginationState } = useContext(PaginationContext);
  const { startIndex, itemsPerPage } = paginationState;
  const endIndex = startIndex + itemsPerPage - 1;
  const employees = props.employees.filter(
    (employee, index) => index >= startIndex && index <= endIndex
  );

  return (
    <>
      <PaginationComponent
        key={`${props.filters.dueDateItem}${props.filters.startDate}${props.filters.endDate}`}
        length={props.employees.length}
      ></PaginationComponent>
      <div className="content-container">
        <div className="list-header">
          <div className="show-for-mobile">Employees</div>
          <div className="show-for-desktop">Employee</div>
          <div className="show-for-desktop">
            {props.filters.dueDateItem === "pme"
              ? "PME Due Date"
              : "VTC Due Date"}
          </div>
        </div>
        <div className="list-body">
          {props.employees.length === 0 ? (
            <div className="list-item list-item--message">
              <span>No Employees</span>
            </div>
          ) : (
            <div>
              {employees.map((employee) => (
                <EmployeeListItem key={`${employee.id}`} employee={employee} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    employees: employeesSelector(state.employees, state.filters),
    filters: state.filters,
  };
};

export default connect(mapStateToProps)(EmployeeList);
