import React from "react";
import moment from "moment";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";

// Date with moment
const now = moment();
// console.log(now);

class UpdateVTCDateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: props.employee,
      lastVTCDate: moment(),
      calendarFocusedVTC: false,
      error: "",
    };
  }

  onLastVTCDateChange = (lastVTCDate) => {
    if (lastVTCDate) {
      this.setState(() => ({ lastVTCDate }));
    }
  };
  onFocusChangeForVTC = ({ focused }) => {
    this.setState(() => ({
      calendarFocusedVTC: focused,
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
      !this.state.lastVTCDate ||
      !this.state.lastVTCDate.isAfter(
        moment(this.state.employee.lastVTCDate),
        "day"
      )
    ) {
      this.setState(() => ({
        error: "Please provide a valid vtc completion date!",
      }));
    } else {
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        lastVTCDate: this.state.lastVTCDate.valueOf(),
      });
    }
  };

  render() {
    return (
      <form className="form" onSubmit={this.onFormSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
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
          <button className="button">Set New VTC Date</button>
        </div>
      </form>
    );
  }
}

export default UpdateVTCDateForm;
