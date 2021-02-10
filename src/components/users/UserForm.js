import React, { useContext, useState, useEffect } from "react";

const UserForm = (props) => {
  const {
    userName: userNameData = "",
    emailId: emailIdData = "",
    role: roleData = "",
    unit: unitData = "",
  } = props.user;
  const [userName, setUserName] = useState(userNameData);
  const [emailId, setEmailId] = useState(emailIdData);
  const [role, setRole] = useState(roleData);
  const [unit, setUnit] = useState(unitData);
  const [error, setError] = useState("");

  const onRoleSelection = (e) => {
    if (e.target.value === "") {
      setUnit("");
      setRole(e.target.value);
    } else {
      setRole(e.target.value);
      // setUnit("BCCL-3-NAKC"); //Setting default unit for an admin this BCCL-3-NAKC
    }
  };

  const onUnitSelection = (e) => {
    if (role === "" && e.target.value !== "") {
      setError("Only admin can have a unit");
    } else {
      setUnit(e.target.value);
    }
  };

  useEffect(() => {
    setError("");
  }, [role, unit]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (role === "admin" && unit === "") {
      setError("An admin must have a unit to administer");
    } else {
      props.onSubmit(props.user.id, { userName, emailId, role, unit });
    }
  };

  return (
    <form className="form" onSubmit={onFormSubmit}>
      {error && <p className="form__error">{error}</p>}
      <input
        type="text"
        placeholder="userName"
        autoFocus
        readOnly
        className="text-input"
        value={userName}
      ></input>
      <input
        type="email"
        placeholder="Email Id"
        autoFocus
        readOnly
        className="text-input"
        value={emailId}
      ></input>

      <select className="select" value={role} onChange={onRoleSelection}>
        <option value="">user</option>
        <option value="admin">admin</option>
      </select>
      <select className="select" value={unit} onChange={onUnitSelection}>
        <option value="BCCL-3-NAKC">NAKC</option>
        <option value="BCCL-3-BLOCKIV">BLOCKIV</option>
        <option value="BCCL-3-KHARKHAREE">KHARKHAREE</option>
        <option value="">NONE</option>
      </select>

      <div>
        <button className="button">
          {props.user ? "Save User" : "Add User"}
        </button>
      </div>
    </form>
  );
};

export { UserForm as default };
