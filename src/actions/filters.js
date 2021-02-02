// SET_TEXT_FILTER
export const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text,
});

// SET_UNIT
export const setUnit = (unit) => ({
  type: "SET_UNIT",
  unit,
});

// SET_SORT_BY_NAME
export const setSortByName = () => ({
  type: "SET_SORT_BY_NAME",
});

// SET_SORT_BY_EMPLOYEE_ID
export const setSortByEmployeeId = () => ({
  type: "SET_SORT_BY_EMPLOYEE_ID",
});

export const setSortByPMEDueDate = () => ({
  type: "SET_SORT_BY_PME_DUE_DATE",
});

export const setSortByVTCDueDate = () => ({
  type: "SET_SORT_BY_VTC_DUE_DATE",
});

export const setDueDateItemByPME = () => ({
  type: "SET_DUE_DATE_ITEM_BY_PME",
});

export const setDueDateItemByVTC = () => ({
  type: "SET_DUE_DATE_ITEM_BY_VTC",
});

// SET_START_DATE
export const setStartDate = (startDate) => ({
  type: "SET_START_DATE",
  startDate,
});

// SET_END_DATE
export const setEndDate = (endDate) => ({
  type: "SET_END_DATE",
  endDate,
});
