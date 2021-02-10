export default (state = {}, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        uid: action.uid,
      };
    case "LOGOUT":
      return {};
    case "ADD_AUTH_USER":
      return {
        ...state,
        authUser: action.authUser,
      };
    default:
      return state;
  }
};
