import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";

const EmployeeListItem = ({ employee, filters }) => {
  const { id, name, employeeId, lastPMEDate, lastVTCDate } = employee;

  return (
    <Link className="list-item" to={`/editPMEVTC/${id}`}>
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
    filters: state.filters,
  };
};

export default connect(mapStateToProps)(EmployeeListItem);
// Below we don't need anything from state
