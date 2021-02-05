import React from "react";
import { connect } from "react-redux";
import EmployeeList from "./EmployeeList";
import selectEmployees from "../selectors/employeesSelector";

class Pagination extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemsPerPage: 2,
      currentPage: 1,
      inputPageNumber: "1",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("checking prevemployees ", prevProps);
    // console.log("checking prevState: ", prevState);
    // console.log("checking current employee status ", this.props.employees);

    if (
      prevProps.employees.length !== this.props.employees.length ||
      prevProps.dueDateItem !== this.props.dueDateItem
    ) {
      this.setState(() => ({
        currentPage: 1,
      }));
      this.setState(() => ({
        inputPageNumber: "1",
      }));

      // if () {
      //   this.state.currentPage = 1;
      //   this.state.inputPageNumber = "1";
      //   // this.getEmployeesList();
      // }
    }
    // console.log(this.state.inputPageNumber);
  }

  onPageChange = (e) => {
    // console.log("employees list: ", this.state.employeesList);
    console.log("input pagechange: ", e.target.value);
    const pageNumberInput = e.target.value;
    if (pageNumberInput.match(/^[0-9]*$/)) {
      let pageNumber;
      if (pageNumberInput) {
        pageNumber = parseInt(pageNumberInput);
      }

      if (pageNumber > 0 && pageNumber <= this.getTotalPageCount()) {
        this.setState(() => {
          return {
            inputPageNumber: pageNumberInput,
            currentPage: pageNumber,
          };
        });
      } else {
        this.setState(() => {
          return {
            inputPageNumber: pageNumberInput,
          };
        });
      }
    }

    // console.log(this.state.currentPage);
  };

  getTotalPageCount = () => {
    return Math.ceil(this.props.employees.length / this.state.itemsPerPage);
  };

  increasePageNumberByOne = (e) => {
    // console.log("checking total page count: ", this.getTotalPageCount());

    if (this.state.currentPage < this.getTotalPageCount()) {
      this.setState((prevState) => {
        return {
          currentPage: prevState.currentPage + 1,
          inputPageNumber: JSON.stringify(prevState.currentPage + 1),
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          inputPageNumber: JSON.stringify(prevState.currentPage),
        };
      });
    }
    // console.log("checking currentPage", this.state.currentPage);
  };

  decreasePageNumberByOne = (e) => {
    if (this.state.currentPage > 1) {
      this.setState((prevState) => {
        return {
          currentPage: prevState.currentPage - 1,
          inputPageNumber: JSON.stringify(prevState.currentPage - 1),
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          inputPageNumber: JSON.stringify(prevState.currentPage),
        };
      });
    }
  };

  getEmployeesList = () => {
    const startIndex = (this.state.currentPage - 1) * this.state.itemsPerPage;
    const endIndex = startIndex + this.state.itemsPerPage - 1;
    return this.props.employees.filter(
      (employee, index) => index >= startIndex && index <= endIndex
    );
  };

  render() {
    return (
      <>
        <div className="content-container">
          <button
            className="button--pagination"
            onClick={this.increasePageNumberByOne}
          >
            +
          </button>
          <input
            className="text-input--pagination"
            value={this.state.inputPageNumber}
            onChange={this.onPageChange}
          ></input>{" "}
          /{" "}
          <input
            className="text-input--pagination  text-input--readOnly"
            value={this.getTotalPageCount()}
            readOnly
          ></input>
          <button
            className="button--pagination"
            onClick={this.decreasePageNumberByOne}
          >
            -
          </button>
        </div>
        <EmployeeList employees={this.getEmployeesList()}></EmployeeList>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  employees: selectEmployees(state.employees, state.filters),
  dueDateItem: state.filters.dueDateItem,
});

export default connect(mapStateToProps)(Pagination);
