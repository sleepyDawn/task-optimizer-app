const paginationReducer = (state, action) => {
  switch (action.type) {
    case "SET_PAGINATION_STATE":
      return action.paginationState;
    default:
      return state;
  }
};

export { paginationReducer as default };
