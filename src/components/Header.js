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
  const [unit, setUnit] = useState(filters.unit);
  const onUnitSelection = (e) => {
    setUnit(() => e.target.value);
  };
  useEffect(() => {
    startSetUnit(unit);
    if (unit) {
      (async () => {
        await startSetEmployees();
      })();
    }
  }, [unit]);

  return (
    <header className="header">
      <div className="content-container">
        <div className="header__content">
          <Link className="header__title" to="/dashboard">
            <h1>Task Optimizer</h1>
          </Link>
          <select className="select" value={unit} onChange={onUnitSelection}>
            <option value="BCCL-3-NAKC">NAKC</option>
            <option value="BCCL-3-BLOCKIV">BLOCKIV</option>
            <option value="BCCL-3-KHARKHAREE">KHARKHAREE</option>
          </select>
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
