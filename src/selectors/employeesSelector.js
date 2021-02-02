import moment from "moment";

// console.log(moment());
// Get visible employees
export default (
  employees,
  { text, dueDateItem, sortBy, startDate, endDate }
) => {
  return employees
    .filter((employee) => {
      const lastPMEDate = moment(employee.lastPMEDate);
      const lastVTCDate = moment(employee.lastVTCDate);

      const pmeDueDate = lastPMEDate.add(3, "years");
      const vtcDueDate = lastVTCDate.add(3, "years");
      // console.log(createdAtMoment);
      // console.log(moment(endDate).isSameOrAfter(createdAtMoment));
      const subjectItem = dueDateItem;
      let startDateMatch, endDateMatch;

      if (subjectItem === "pme") {
        startDateMatch = startDate
          ? startDate.isSameOrBefore(pmeDueDate, "day")
          : true;
        endDateMatch = endDate
          ? endDate.isSameOrAfter(pmeDueDate, "day")
          : true;
      } else if (subjectItem === "vtc") {
        startDateMatch = startDate
          ? startDate.isSameOrBefore(vtcDueDate, "day")
          : true;
        endDateMatch = endDate
          ? endDate.isSameOrAfter(vtcDueDate, "day")
          : true;
      } else {
        startDateMatch = startDate
          ? startDate.isSameOrBefore(pmeDueDate, "day") ||
            startDate.isSameOrBefore(vtcDueDate, "day")
          : true;
        endDateMatch = endDate
          ? endDate.isSameOrAfter(pmeDueDate, "day") ||
            endDate.isSameOrAfter(vtcDueDate, "day")
          : true;
      }

      return startDateMatch && endDateMatch;
    })
    .sort((a, b) => {
      console.log(employees);
      if (dueDateItem === "pme") {
        return a.lastPMEDate - b.lastPMEDate;
      } else if (dueDateItem === "vtc") {
        return a.lastVTCDate - b.lastVTCDate;
      }
      return 0;
    });
};
