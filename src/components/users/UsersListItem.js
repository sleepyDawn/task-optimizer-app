import React from "react";
import { Link } from "react-router-dom";

const UsersListItem = ({ id, userName, emailId, role, unit }) => {
  return (
    <Link className="list-item" to={`/users/${id}`}>
      <div>
        <h3 className="list-item__title">{`${userName}`}</h3>
        <span className="list-item__sub-title">{emailId}</span>
      </div>
      <h3 className="list-item__data">
        {role === "admin" ? `${role} - ${unit}` : "User"}
      </h3>
    </Link>
  );
};

export { UsersListItem as default };
