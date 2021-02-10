import React, { useState, useContext, useEffect } from "react";
import PaginationContext from "../context/pagination-context";

const PaginationComponent = (props) => {
  const { paginationState, dispatch } = useContext(PaginationContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPageNumber, setinputPageNumber] = useState("1");
  const itemsLength = props.length;
  // const [paginationState.itemsPerPage, setpaginationState.ItemsPerPage] = useState(2);

  useEffect(() => {
    // console.log("checking useEffect.....");

    const startIndex = (currentPage - 1) * paginationState.itemsPerPage;
    dispatch({
      type: "SET_PAGINATION_STATE",
      paginationState: {
        ...paginationState,
        startIndex,
      },
    });
    // console.log({ paginationState });
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * paginationState.itemsPerPage;

    dispatch({
      type: "SET_PAGINATION_STATE",
      paginationState: {
        ...paginationState,
        startIndex,
      },
    });
  }, [currentPage]);

  const onPageChange = (e) => {
    // console.log("items list: ", this.state.itemsList);
    // console.log("input pagechange: ", e.target.value);
    const pageNumberInput = e.target.value;
    if (pageNumberInput.match(/^[0-9]*$/)) {
      let pageNumber;
      if (pageNumberInput) {
        pageNumber = parseInt(pageNumberInput);
      }

      if (pageNumber > 0 && pageNumber <= getTotalPageCount()) {
        setinputPageNumber(pageNumberInput);
        setCurrentPage(pageNumber);
      } else {
        setinputPageNumber(pageNumberInput);
      }
    }
  };

  const increasePageNumberByOne = (e) => {
    // console.log("checking total page count: ", this.getTotalPageCount());
    if (currentPage < getTotalPageCount()) {
      setCurrentPage(currentPage + 1);
      setinputPageNumber(JSON.stringify(currentPage + 1));
    } else {
      setinputPageNumber(JSON.stringify(currentPage));
    }
    // console.log("checking currentPage", this.state.currentPage);
  };

  const decreasePageNumberByOne = (e) => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setinputPageNumber(JSON.stringify(currentPage - 1));
    } else {
      setinputPageNumber(JSON.stringify(currentPage));
    }
  };

  const getTotalPageCount = () => {
    return Math.ceil(itemsLength / paginationState.itemsPerPage) || 1;
  };

  return (
    <>
      <div className="content-container">
        <button
          className="button--pagination"
          onClick={increasePageNumberByOne}
        >
          +
        </button>
        <input
          className="text-input--pagination"
          value={inputPageNumber}
          onChange={onPageChange}
        ></input>{" "}
        /{" "}
        <input
          className="text-input--pagination  text-input--readOnly"
          value={getTotalPageCount()}
          readOnly
        ></input>
        <button
          className="button--pagination"
          onClick={decreasePageNumberByOne}
        >
          -
        </button>
      </div>
    </>
  );
};

export { PaginationComponent as default };
