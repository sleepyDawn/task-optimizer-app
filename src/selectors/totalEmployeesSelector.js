export default (employees, { text, sortBy }) => {
  return employees
    .filter((employee) => {
      const employeeId = employee.employeeId.toString();
      const textMatch =
        employee.name.toLowerCase().includes(text.toLowerCase()) ||
        employeeId.includes(text);

      return textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "pmeDueDate") {
        return b.lastPMEDate - a.lastVTCDate;
      } else if (sortBy === "vtcdueDate") {
        return b.lastVTCDate - a.lastVTCDate;
      }
      return 0;
    });
};
