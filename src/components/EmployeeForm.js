import React from "react";
import moment from "moment";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";

// Date with moment
const now = moment();
// console.log(now);

class Employee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.employee ? props.employee.name : "",
      employeeId: props.employee ? props.employee.employeeId : "",
      // amount: props.employee ? (props.employee.amount / 100).toString() : "",
      lastPMEDate: props.employee
        ? moment(props.employee.lastPMEDate)
        : moment(),
      lastVTCDate: props.employee
        ? moment(props.employee.lastVTCDate)
        : moment(),
      calendarFocusedPME: false,
      calendarFocusedVTC: false,
      error: "",
    };
  }

  onNameChange = (e) => {
    const name = e.target.value;
    this.setState(() => {
      return {
        name,
      };
    });
  };

  onEmployeeIdChange = (e) => {
    const employeeId = e.target.value;
    if (!employeeId || employeeId.match(/^[0-9]*$/)) {
      this.setState(() => ({
        employeeId,
      }));
    }
  };
  // onAmountChange = (e) => {
  //   const amount = e.target.value;
  //   if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
  //     this.setState(() => ({
  //       amount,
  //     }));
  //   }
  // };

  onLastPMEDateChange = (lastPMEDate) => {
    if (lastPMEDate) {
      this.setState(() => ({ lastPMEDate }));
    }
  };

  onLastVTCDateChange = (lastVTCDate) => {
    if (lastVTCDate) {
      this.setState(() => ({ lastVTCDate }));
    }
  };

  onFocusChangeForPME = ({ focused }) => {
    this.setState(() => ({
      calendarFocusedPME: focused,
    }));
  };

  renderMonthElement = ({ month, onMonthSelect, onYearSelect }) => {
    let i;
    let years = [];
    for (i = moment().year(); i >= moment().year() - 30; i--) {
      years.push(
        <option value={i} key={`year-${i}`}>
          {i}
        </option>
      );
    }
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <select
            value={month.month()}
            onChange={(e) => onMonthSelect(month, e.target.value)}
          >
            {moment.months().map((label, value) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={month.year()}
            onChange={(e) => onYearSelect(month, e.target.value)}
          >
            {years}
          </select>
        </div>
      </div>
    );
  };

  onFocusChangeForVTC = ({ focused }) => {
    this.setState(() => ({
      calendarFocusedVTC: focused,
    }));
  };

  onFormSubmit = (e) => {
    e.preventDefault();

    if (!this.state.name || !this.state.employeeId) {
      this.setState(() => ({
        error: "Please provide name and employeeId of employee",
      }));
    } else {
      this.setState(() => ({ error: "" }));
      // console.log(this.state.name.trim().replace(/\s\s+/g, " "));
      this.props.onSubmit({
        name: this.state.name.trim().replace(/\s\s+/g, " "),
        employeeId: parseInt(this.state.employeeId),
        lastPMEDate: this.state.lastPMEDate.valueOf(),
        lastVTCDate: this.state.lastVTCDate.valueOf(),
      });
    }
  };

  render() {
    return (
      <form className="form" onSubmit={this.onFormSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input
          type="text"
          placeholder="Name"
          autoFocus
          className="text-input"
          value={this.state.name}
          onChange={this.onNameChange}
        ></input>
        <input
          type="text"
          placeholder="Employee Personal Number"
          autoFocus
          className="text-input"
          value={this.state.employeeId}
          onChange={this.onEmployeeIdChange}
        ></input>
        <p>Last PME DATE</p>
        <SingleDatePicker
          date={this.state.lastPMEDate}
          onDateChange={this.onLastPMEDateChange}
          focused={this.state.calendarFocusedPME}
          onFocusChange={this.onFocusChangeForPME}
          numberOfMonths={1}
          renderMonthElement={this.renderMonthElement}
          isOutsideRange={() => false}
        ></SingleDatePicker>
        <p>Last VTC DATE</p>
        <SingleDatePicker
          date={this.state.lastVTCDate}
          onDateChange={this.onLastVTCDateChange}
          focused={this.state.calendarFocusedVTC}
          onFocusChange={this.onFocusChangeForVTC}
          numberOfMonths={1}
          renderMonthElement={this.renderMonthElement}
          isOutsideRange={() => false}
        ></SingleDatePicker>
        <div>
          <button className="button">
            {this.props.employee ? "Save Employee" : "Add Employee"}
          </button>
        </div>
      </form>
    );
  }
}

export default Employee;
