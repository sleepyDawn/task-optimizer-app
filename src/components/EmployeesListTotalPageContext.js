import React, { useReducer } from "react";
import PaginationContext from "../context/pagination-context";
import paginationReducer from "../reducers/paginationReducer";
import EmployeesListTotalPage from "./EmployeesListTotalPage";

const EmployeesListTotalPageContext = () => {
  const initialPaginationState = {
    startIndex: 0,
    itemsPerPage: 2,
  };
  const [paginationState, dispatch] = useReducer(
    paginationReducer,
    initialPaginationState
  );
  // console.log("in EmployeesListTotalPage", { paginationState });
  return (
    <PaginationContext.Provider value={{ paginationState, dispatch }}>
      <EmployeesListTotalPage></EmployeesListTotalPage>
    </PaginationContext.Provider>
  );
};

export { EmployeesListTotalPageContext as default };
