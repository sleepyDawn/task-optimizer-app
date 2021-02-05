import React from "react";
import Pagination from "../components/Pagination";
import EmployeeListFilters from "./EmployeeListFilters";
import EmployeesSummary from "./EmployeesSummary";

const EmployeeDashboardPage = () => (
  <div>
    <EmployeesSummary></EmployeesSummary>
    <EmployeeListFilters></EmployeeListFilters>
    <Pagination></Pagination>
  </div>
);

export default EmployeeDashboardPage;
