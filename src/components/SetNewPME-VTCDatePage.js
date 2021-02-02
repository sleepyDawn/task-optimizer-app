import React from "react";
import { connect } from "react-redux";
import { startEditEmployee } from "../actions/employees";
import UpdatePMEDateForm from "./UpdatePMEDateForm";
import UpdateVTCDateForm from "./UpdateVTCDateForm";
import MainNavigation from "./MainNavigation";

export class SetNewPMEDatePage extends React.Component {
  onSubmit = (employee) => {
    this.props.startEditEmployee(this.props.match.params.id, employee);
    this.props.history.push("/");
  };

  // Editing employee with id of {this.props.match.params.id}
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <MainNavigation></MainNavigation>
            <h1 className="page-header__title">
              {this.props.dueDateItem === "pme"
                ? "Set New PME Date"
                : "Set New VTC Date"}
            </h1>
          </div>
        </div>
        <div className="content-container">
          <h3>Name - {this.props.employee.name}</h3>
          <h3>Personal No. - {this.props.employee.employeeId}</h3>
          {this.props.dueDateItem === "pme" ? (
            <UpdatePMEDateForm
              employee={this.props.employee}
              onSubmit={this.onSubmit}
            ></UpdatePMEDateForm>
          ) : (
            <UpdateVTCDateForm
              employee={this.props.employee}
              onSubmit={this.onSubmit}
            ></UpdateVTCDateForm>
          )}
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
    dueDateItem: state.filters.dueDateItem,
  };
};

const mapDispatchToProps = (dispatch) => ({
  startEditEmployee: (id, employee) =>
    dispatch(startEditEmployee(id, employee)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SetNewPMEDatePage);
