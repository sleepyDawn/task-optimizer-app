import React from "react";
import { connect } from "react-redux";
import MainNavigation from "../MainNavigation";
import UserForm from "./UserForm";
import { startEditUser, startRemoveUser } from "../../actions/users";

const EditUserPage = (props) => {
  const onSubmit = (id, updates) => {
    props.startEditUser(id, updates);
    props.history.push("/users");
  };
  const onClick = () => {
    console.log("checking Params id: ", props.match.params.id);
    props.startRemoveUser(props.match.params.id);
    props.history.push("/users");
  };
  return (
    <>
      <div className="page-header">
        <div className="content-container">
          <MainNavigation></MainNavigation>
          <h1 className="page-header__title">Edit User</h1>
        </div>
      </div>
      <div className="content-container">
        <UserForm user={props.user} onSubmit={onSubmit}></UserForm>
        <button className="button button--secondary" onClick={onClick}>
          Remove User
        </button>
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  user: state.users.find(({ id }) => id === ownProps.match.params.id),
});
const mapDispatchToProps = (dispatch) => ({
  startEditUser: (id, employee) => dispatch(startEditUser(id, employee)),
  startRemoveUser: (id) => dispatch(startRemoveUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUserPage);
