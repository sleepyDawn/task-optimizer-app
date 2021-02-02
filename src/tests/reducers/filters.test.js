import filters from "../../reducers/filters";
import filtersReducer from "../../reducers/filters";
import moment from "moment";

const defaultSate = {
  text: "",
  sortBy: "", // date or amount
  startDate: moment().startOf("month"),
  endDate: moment().endOf("month"),
};

test("should set up default filter value", () => {
  const state = filtersReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({
    text: "",
    sortBy: "", // date or amount
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month"),
  });
});

test("should set sortBy to amount", () => {
  const state = filtersReducer(undefined, { type: "SET_SORT_BY_AMOUNT" });
  expect(state.sortBy).toBe("amount");
});

test("should set sortBy to date", () => {
  const state = filtersReducer(
    { sortBy: "safsfd" },
    { type: "SET_SORT_BY_DATE" }
  );
  // console.log(state);
  expect(state.sortBy).toBe("date");
});

test("should set test filter", () => {
  const state = filtersReducer(
    { text: "asdfsd" },
    { type: "SET_TEXT_FILTER", text: "first game" }
  );
  expect(state.text).toBe("first game");
});

test("should set startDate filter", () => {
  const state = filtersReducer(undefined, {
    type: "SET_START_DATE",
    startDate: moment(0).add(2, "years"),
  });

  expect(state.startDate).toEqual(moment(0).add(2, "years"));
});

test("should set endDate filter", () => {
  const state = filtersReducer(undefined, {
    type: "SET_END_DATE",
    endDate: moment(0).add(12, "years"),
  });
  // console.log(state.endDate);
  expect(state.endDate).toEqual(moment(0).add(12, "years"));
});
