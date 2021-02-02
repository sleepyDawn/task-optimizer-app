import React from "react";
import { connect } from "react-redux";
import { startEditEmployee, startRemoveEmployee } from "../actions/employees";
import EmployeeForm from "./EmployeeForm";
import MainNavigation from "./MainNavigation";

export class EditEmployeePage extends React.Component {
  onSubmit = (employee) => {
    this.props.startEditEmployee(this.props.match.params.id, employee);
    this.props.history.push("/employees");
  };

  onClick = (e) => {
    this.props.startRemoveEmployee({ id: this.props.employee.id });
    this.props.history.push("/employees");
  };

  // Editing employee with id of {this.props.match.params.id}
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <MainNavigation></MainNavigation>
            <h1 className="page-header__title">Edit Employee</h1>
          </div>
        </div>
        <div className="content-container">
          <EmployeeForm
            employee={this.props.employee}
            onSubmit={this.onSubmit}
          ></EmployeeForm>
          <button className="button button--secondary" onClick={this.onClick}>
            Remove Employee
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    employee: state.employees.find(
      (employee) => employee.id === ownProps.match.params.id
    ),
  };
};

const mapDispatchToProps = (dispatch) => ({
  startEditEmployee: (id, employee) =>
    dispatch(startEditEmployee(id, employee)),
  startRemoveEmployee: (id) => dispatch(startRemoveEmployee(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditEmployeePage);
