import React, { useReducer } from "react";
import { connect } from "react-redux";

import PaginationContext from "../context/pagination-context";
import paginationReducer from "../reducers/paginationReducer";
import EmployeeListFilters from "./EmployeeListFilters";
import EmployeesSummary from "./EmployeesSummary";
import EmployeesList from "./EmployeesList";

const EmployeeDashboardPage = () => {
  const initialPaginationState = {
    startIndex: 0,
    itemsPerPage: 10,
  };
  const [paginationState, dispatch] = useReducer(
    paginationReducer,
    initialPaginationState
  );

  return (
    <PaginationContext.Provider value={{ paginationState, dispatch }}>
      <EmployeesSummary></EmployeesSummary>
      <EmployeeListFilters></EmployeeListFilters>
      <EmployeesList></EmployeesList>
    </PaginationContext.Provider>
  );
};

export default EmployeeDashboardPage;
