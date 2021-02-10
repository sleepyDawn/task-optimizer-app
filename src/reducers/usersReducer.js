const defaultState = [];
const usersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return [...state, action.user];
    case "EDIT_USER":
      return state.map((user) => {
        if (user.id === action.id) {
          return { ...user, ...action.updates };
        }
        return user;
      });
    case "REMOVE_USER":
      return state.filter(({ id }) => id !== action.id);
    case "SET_USERS":
      return [...action.users];
    case "REMOVE_ALL_USERS":
      return defaultState;
    default:
      return state;
  }
};

export default usersReducer;
