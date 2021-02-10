import React, { useContext } from "react";
import { connect } from "react-redux";
import usersSelector from "../../selectors/usersSelector";
import PaginationComponent from "../PaginationComponent";
import UsersListItem from "./UsersListItem";
import PaginationContext from "../../context/pagination-context";

const UsersList = (props) => {
  const { paginationState } = useContext(PaginationContext);
  const { startIndex, itemsPerPage } = paginationState;
  const endIndex = startIndex + itemsPerPage - 1;
  const users = props.users.filter(
    (user, index) => index >= startIndex && index <= endIndex
  );

  return (
    <>
      <PaginationComponent
        key={`${props.filters.text}`}
        length={props.users.length}
      ></PaginationComponent>
      <div className="content-container">
        <div className="list-header">
          <div className="show-for-mobile">Users</div>
          <div className="show-for-desktop">User</div>
          <div className="show-for-desktop">Role</div>
        </div>
        <div className="list-body">
          {props.users.length === 0 ? (
            <div className="list-item list-item--message">
              <span>No User</span>
            </div>
          ) : (
            <div>
              {users.map((user) => (
                <UsersListItem key={user.id} {...user} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    users: usersSelector(state.users, state.filters),
    filters: state.filters,
  };
};

export default connect(mapStateToProps)(UsersList);
