import React from "react";
import { connect } from "react-redux";
import { setTextFilter } from "../../actions/filters";

const UsersListFilters = (props) => {
  const onTextNameChange = (e) => {
    // console.log(e.target.value);
    // this.props.dispatch(setTextFilter(e.target.value));
    props.setTextFilter(e.target.value);
  };

  return (
    <div className="content-container">
      <div className="input-group">
        <div className="input-group__item">
          <input
            type="text"
            className="text-input"
            placeholder="Search"
            value={props.filters.text}
            onChange={onTextNameChange}
          ></input>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filters: state.filters,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersListFilters);
