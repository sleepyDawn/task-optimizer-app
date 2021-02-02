import React from "react";
import { DateRangePicker } from "react-dates";
import { connect } from "react-redux";
import {
  setDueDateItemByPME,
  setDueDateItemByVTC,
  setStartDate,
  setEndDate,
} from "../actions/filters";

export class EmployeeListFilters extends React.Component {
  state = {
    calendarFocused: null,
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  };

  // onTextChange = (e) => {
  //   // console.log(e.target.value);
  //   // this.props.dispatch(setTextFilter(e.target.value));
  //   this.props.setTextFilter(e.target.value);
  // };

  onDueDateItemChange = (e) => {
    // console.log("checking onSortChange: ", e.target.value);
    if (e.target.value === "pme") {
      this.props.setDueDateItemByPME();
    } else if (e.target.value === "vtc") {
      this.props.setDueDateItemByVTC();
    }
  };

  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <select
              className="select"
              value={this.props.filters.dueDateItem}
              onChange={this.onDueDateItemChange}
            >
              <option value="pme">PME</option>
              <option value="vtc">VTC</option>
            </select>
          </div>
          <div className="input-group__item">
            <DateRangePicker
              startDate={this.props.filters.startDate}
              endDate={this.props.filters.endDate}
              startDateId={"abasdhwkhqkeqw"}
              endDateId={"vbbvzbzbxcvzx"}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates={true}
              numberOfMonths={1}
              isOutsideRange={() => false}
            ></DateRangePicker>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters,
  };
};

const mapDispatchToProps = (dispatch) => ({
  // setTextFilter: (text) => dispatch(setTextFilter(text)),
  setDueDateItemByPME: () => {
    // console.log("checking: ", setSortByPMEDueDate);
    return dispatch(setDueDateItemByPME());
  },
  setDueDateItemByVTC: () => dispatch(setDueDateItemByVTC()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeListFilters);
