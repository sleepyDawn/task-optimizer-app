import React from "react";
import moment from "moment";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";

// Date with moment
const now = moment();
// console.log(now);

class UpdatePMEForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: props.employee,
      lastPMEDate: moment(),
      calendarFocusedPME: false,
      error: "",
    };
  }

  onLastPMEDateChange = (lastPMEDate) => {
    if (lastPMEDate) {
      this.setState(() => ({ lastPMEDate }));
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

  onFormSubmit = (e) => {
    e.preventDefault();

    if (
      !this.state.lastPMEDate ||
      !this.state.lastPMEDate.isAfter(
        moment(this.state.employee.lastPMEDate),
        "day"
      )
    ) {
      this.setState(() => ({
        error: "Please provide a valid pme completion date!",
      }));
    } else {
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        lastPMEDate: this.state.lastPMEDate.valueOf(),
      });
    }
  };

  render() {
    return (
      <form className="form" onSubmit={this.onFormSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <SingleDatePicker
          date={this.state.lastPMEDate}
          onDateChange={this.onLastPMEDateChange}
          focused={this.state.calendarFocusedPME}
          onFocusChange={this.onFocusChangeForPME}
          numberOfMonths={1}
          renderMonthElement={this.renderMonthElement}
          isOutsideRange={() => false}
        ></SingleDatePicker>

        <div>
          <button className="button">Set New PME Date</button>
        </div>
      </form>
    );
  }
}

export default UpdatePMEForm;
