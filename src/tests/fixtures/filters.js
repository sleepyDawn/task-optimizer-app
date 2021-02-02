import moment from "moment";

export const filters = {
  text: "",
  sortBy: "", // date or amount
  startDate: undefined,
  endDate: undefined,
};

export const altFilters = {
  text: "bill",
  sortBy: "amount", // date or amount
  startDate: moment(0),
  endDate: moment(0).add(3, "days"),
};
