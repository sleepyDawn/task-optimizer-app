import React from "react";
import { connect } from "react-redux";

import totalEmployeesSelector from "../selectors/totalEmployeesSelector";
import { setTextFilter } from "../actions/filters";
import MainNavigation from "./MainNavigation";
import EmployeesListTotal from "./EmployeesListTotal";

export const EmployeesListTotalPage = (props) => {
  const onTextNameChange = (e) => {
    // console.log(e.target.value);
    // props.dispatch(setTextFilter(e.target.value));
    props.setTextFilter(e.target.value);
  };

  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <MainNavigation></MainNavigation>
          <h1 className="page-header__title">
            Viewing <span>{props.employees.length}</span>{" "}
            {props.employees.length > 1 ? "employees" : "employee"}
          </h1>
        </div>
        <div className="content-container">
          <div className="input-group">
            <div className="input-group__item">
              <input
                type="text"
                className="text-input"
                placeholder="Search"
                value={props.filters.text}
                onChange={onTextNameChange}
              ></input>
            </div>
          </div>
        </div>
      </div>

      <EmployeesListTotal></EmployeesListTotal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    employees: totalEmployeesSelector(state.employees, state.filters),
    filters: state.filters,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeesListTotalPage);
