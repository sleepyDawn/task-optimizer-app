import React from "react";
import EmployeeList from "./EmployeeList";
import EmployeeListFilters from "./EmployeeListFilters";
import EmployeesSummary from "./EmployeesSummary";

const EmployeeDashboardPage = () => (
  <div>
    <EmployeesSummary></EmployeesSummary>
    <EmployeeListFilters></EmployeeListFilters>
    <EmployeeList></EmployeeList>
  </div>
);

export default EmployeeDashboardPage;
