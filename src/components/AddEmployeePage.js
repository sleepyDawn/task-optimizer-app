import React from "react";
import { connect } from "react-redux";

import { startAddEmployee } from "../actions/employees";
import EmployeeForm from "./EmployeeForm";
import MainNavigation from "./MainNavigation";

export class AddEmployeePage extends React.Component {
  onSubmit = (employee) => {
    this.props.startAddEmployee(employee);
    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <MainNavigation></MainNavigation>
            <h1 className="page-header__title">Add Employee</h1>
          </div>
        </div>
        <div className="content-container">
          <EmployeeForm onSubmit={this.onSubmit}></EmployeeForm>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddEmployee: (employee) => dispatch(startAddEmployee(employee)),
});

export default connect(undefined, mapDispatchToProps)(AddEmployeePage);
