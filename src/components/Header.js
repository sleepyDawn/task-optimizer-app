import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";
import { setUnit } from "../actions/filters";
import { startSetEmployees } from "../actions/employees";

export const Header = ({
  startLogout,
  filters,
  startSetUnit,
  startSetEmployees,
}) => {
  const [unit] = useState(filters.unit);
  // const onUnitSelection = (e) => {
  //   setUnit(() => e.target.value);
  // };
  // useEffect(() => {
  //   startSetUnit(unit);
  //   if (unit) {
  //     (async () => {
  //       await startSetEmployees();
  //     })();
  //   }
  // }, [unit]);

  return (
    <header className="header">
      <div className="content-container">
        <div className="header__content">
          <Link className="header__title" to="/dashboard">
            <h1>Task Optimizer</h1>
          </Link>
          <input
            type="text"
            placeholder="UNIT"
            readOnly
            className="text-input text-input--readOnly"
            value={unit}
          ></input>
          <button className="button button--link" onClick={startLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  filters: state.filters,
});

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
  startSetUnit: (unit) => dispatch(setUnit(unit)),
  startSetEmployees: () => dispatch(startSetEmployees()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
