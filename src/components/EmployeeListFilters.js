import React, { useState } from "react";
import { SingleDatePicker } from "react-dates";
import { connect } from "react-redux";

import {
  setDueDateItemByPME,
  setDueDateItemByVTC,
  setStartDate,
  setEndDate,
} from "../actions/filters";
import { renderMonthElement } from "../utility/renderMonthElement";

export const EmployeeListFilters = (props) => {
  const [calendarFocused, setCalendarFocused] = useState(null);
  const [endDate, setEndDate] = useState(props.filters.endDate);

  const onDateChange = (endDate) => {
    if (endDate) {
      setEndDate(endDate);
      props.setEndDate(endDate);
    }
  };

  const onFocusChange = ({ focused }) => {
    setCalendarFocused(focused);
  };

  // onTextChange = (e) => {
  //   // console.log(e.target.value);
  //   // props.dispatch(setTextFilter(e.target.value));
  //   props.setTextFilter(e.target.value);
  // };

  const onDueDateItemChange = (e) => {
    // console.log("checking onSortChange: ", e.target.value);
    if (e.target.value === "pme") {
      props.setDueDateItemByPME();
    } else if (e.target.value === "vtc") {
      props.setDueDateItemByVTC();
    }
  };

  return (
    <div className="content-container">
      <div className="input-group">
        <div className="input-group__item">
          <select
            className="select"
            value={props.filters.dueDateItem}
            onChange={onDueDateItemChange}
          >
            <option value="pme">PME</option>
            <option value="vtc">VTC</option>
          </select>
        </div>
        <div className="input-group__item">
          <SingleDatePicker
            date={endDate}
            onDateChange={onDateChange}
            focused={calendarFocused}
            onFocusChange={onFocusChange}
            numberOfMonths={1}
            renderMonthElement={renderMonthElement}
            isOutsideRange={() => false}
            id="asfdafdasfdsadfaasdasdf42342342"
          ></SingleDatePicker>
        </div>
      </div>
    </div>
  );
};

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
  // setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeListFilters);
