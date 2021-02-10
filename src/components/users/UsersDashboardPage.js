import React, { useReducer } from "react";

import PaginationContext from "../../context/pagination-context";
import paginationReducer from "../../reducers/paginationReducer";
import UsersListFilters from "./UsersListFilters";
import UsersSummary from "./UsersSummary";
import UsersList from "./UsersList";

const UsersDashboardPage = () => {
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
      <UsersSummary></UsersSummary>
      <UsersListFilters></UsersListFilters>
      <UsersList></UsersList>
    </PaginationContext.Provider>
  );
};

export default UsersDashboardPage;
