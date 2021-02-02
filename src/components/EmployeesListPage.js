import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import totalEmployeesSelector from "../selectors/totalEmployeesSelector";
import { setTextFilter } from "../actions/filters";
import MainNavigation from "./MainNavigation";

export class EmployeesListPage extends React.Component {
  onTextNameChange = (e) => {
    // console.log(e.target.value);
    // this.props.dispatch(setTextFilter(e.target.value));
    this.props.setTextFilter(e.target.value);
  };
  onTextEmployeeIdChange = (e) => {
    // console.log(e.target.value);
    // this.props.dispatch(setTextFilter(e.target.value));
    this.props.setTextFilter(e.target.value);
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <MainNavigation></MainNavigation>
            <h1 className="page-header__title">
              Viewing <span>{this.props.employees.length}</span>{" "}
              {this.props.employees.length > 1 ? "employees" : "employee"}
            </h1>
          </div>
          <div className="content-container">
            <div className="input-group">
              <div className="input-group__item">
                <input
                  type="text"
                  className="text-input"
                  placeholder="Search"
                  value={this.props.filters.text}
                  onChange={this.onTextNameChange}
                ></input>
              </div>
            </div>
          </div>
        </div>
        <div className="content-container">
          <div className="list-header">
            <div className="show-for-mobile">Employees</div>
            <div className="show-for-desktop">Employee</div>
            <div className="show-for-desktop">EmployeeId</div>
          </div>
          <div className="list-body">
            {this.props.employees.length === 0 ? (
              <div className="list-item list-item--message">
                <span>No Employees</span>
              </div>
            ) : (
              <div>
                {this.props.employees.map((employee) => (
                  <div key={employee.id}>
                    <Link
                      className="list-item"
                      to={`/employees/edit/${employee.id}`}
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    employees: totalEmployeesSelector(state.employees, state.filters),
    filters: state.filters,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesListPage);
