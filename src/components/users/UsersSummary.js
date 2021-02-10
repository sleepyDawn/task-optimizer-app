import React from "react";
// import numeral from "numeral";
import { connect } from "react-redux";
import MainNavigation from "../MainNavigation";
import selectUsers from "../../selectors/usersSelector";

export const UsersSummary = ({ usersCount }) => {
  const usersWord = usersCount > 1 ? "users" : "user";

  // const formatExpensesTotal = ` ${numeral(expensesTotal).format("0,0.00")}`;
  return (
    <div className="page-header">
      <div className="content-container">
        <MainNavigation></MainNavigation>
        <h1 className="page-header__title">
          Viewing <span>{usersCount}</span> {usersWord}.
        </h1>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleUsers = selectUsers(state.users, state.filters);
  return {
    usersCount: visibleUsers.length,
  };
};

export default connect(mapStateToProps)(UsersSummary);
