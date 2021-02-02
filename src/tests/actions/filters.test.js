import moment from "moment";
import { setStartDate, setEndDate } from "../../actions/filters";
import {
  setTextFilter,
  setSortByAmount,
  setSortByDate,
} from "../../actions/filters";

test("should generate set start date action object", () => {
  const action = setStartDate(moment(0));
  // console.log(moment(0));
  expect(action).toEqual({
    type: "SET_START_DATE",
    startDate: moment(0),
  });
});

test("should generate set end date action object", () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({
    type: "SET_END_DATE",
    endDate: moment(0),
  });
});

test("should generate set text filter action object with default", () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text: "",
  });
});

test("should generate set text filter action object with given values", () => {
  const action = setTextFilter("rikd");
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text: "rikd",
  });
});

test("should generate set sort by amount action object", () => {
  const action = setSortByAmount();
  expect(action).toEqual({
    type: "SET_SORT_BY_AMOUNT",
  });
});

test("should generate set sort by date action object", () => {
  const action = setSortByDate();
  expect(action).toEqual({
    type: "SET_SORT_BY_DATE",
  });
});
