import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import totalEmployeesSelector from "../selectors/totalEmployeesSelector";
import PaginationContext from "../context/pagination-context";
import PaginationComponent from "./PaginationComponent";

const EmployeesListTotal = (props) => {
  const { paginationState } = useContext(PaginationContext);
  const { startIndex, itemsPerPage } = paginationState;
  const endIndex = startIndex + itemsPerPage - 1;
  const employees = props.employees.filter(
    (employee, index) => index >= startIndex && index <= endIndex
  );

  let isAdminForEmployee;
  if (
    props.authUser.role === "admin" &&
    props.authUser.unit === props.filters.unit
  ) {
    isAdminForEmployee = true;
  }

  return (
    <>
      <PaginationComponent
        key={props.filters.text}
        length={props.employees.length}
      ></PaginationComponent>
      <div className="content-container">
        <div className="list-header">
          <div className="show-for-mobile">Employees</div>
          <div className="show-for-desktop">Employee</div>
          <div className="show-for-desktop">EmployeeId</div>
        </div>
        <div className="list-body">
          {employees.length === 0 ? (
            <div className="list-item list-item--message">
              <span>No Employees</span>
            </div>
          ) : (
            <div>
              {employees.map((employee) => (
                <div key={employee.id}>
                  <Link
                    className="list-item"
                    to={
                      isAdminForEmployee
                        ? `/employees/edit/${employee.id}`
                        : "/employees"
                    }
                  >
                    <div>
                      <h3 className="list-item__title">{`${employee.name}`}</h3>
                    </div>
                    <h3 className="list-item__data">{employee.employeeId}</h3>
                  </Link>
                </div>
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
    employees: totalEmployeesSelector(state.employees, state.filters),
    filters: state.filters,
    authUser: state.auth.authUser,
  };
};

export default connect(mapStateToProps)(EmployeesListTotal);
