import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";
import { connect } from "react-redux";

const EmployeeListItem = ({
  id,
  name,
  employeeId,
  lastPMEDate,
  lastVTCDate,
  filters,
}) => (
  <Link className="list-item" to={`/editPME-VTC/${id}`}>
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

const mapStateToProps = (state) => {
  return {
    filters: state.filters,
  };
};

export default connect(mapStateToProps)(EmployeeListItem);
// Below we don't need anything from state
