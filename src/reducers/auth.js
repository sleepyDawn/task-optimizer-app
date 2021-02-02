export default (state = {}, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        uid: action.uid,
      };
    case "LOGOUT":
      return {};
    case "ADD_USER":
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
