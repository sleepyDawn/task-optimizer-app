import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";

const EmployeeListItem = ({ employee, filters }) => {
  const { id, name, employeeId, lastPMEDate, lastVTCDate } = employee;
  let isAdminForEmployee;
  if (
    props.authUser.role === "admin" &&
    props.authUser.unit === props.filters.unit
  ) {
    isAdminForEmployee = true;
  }

  return (
    <Link
      className="list-item"
      to={isAdminForEmployee ? `/editPMEVTC/${id}` : "/dashboard"}
    >
      <div>
        <h3 className="list-item__title">{`${name}`}</h3>
        <span className="list-item__sub-title">{employeeId}</span>
      </div>
      <h3 className="list-item__data">
        {filters.dueDateItem === "pme"
          ? `${moment(lastPMEDate).add(3, "years").format("MMMM Do, YYYY")}`
          : `${moment(lastVTCDate).add(3, "years").format("MMMM Do, YYYY")}`}
      </h3>
    </Link>
  );
};

const mapStateToProps = (state) => {
  return {
    employees: totalEmployeesSelector(state.employees, state.filters),
    filters: state.filters,
    authUser: state.auth.authUser,
  };
};

export default connect(mapStateToProps)(EmployeeListItem);

// Below we don't need anything from state
