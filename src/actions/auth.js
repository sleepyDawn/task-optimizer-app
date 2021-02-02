import { firebase, googleAuthProvider } from "../firebase/firebase";
import database from "../firebase/firebase";
import { setUnit } from "../actions/filters";

export const login = (uid) => ({
  type: "LOGIN",
  uid,
});

export const addUser = (user) => ({
  type: "ADD_USER",
  user,
});

// role can be user, controller, admin
export const startAuthorizationOnLogin = (userData = {}, uid) => {
  return (dispatch) => {
    const {
      userName = "",
      emailId = "",
      role = "user", //admin, user, controller
      unit = "BCCL-3-NAKC", // ["BCCL-3-NAKC", "BCCL-3-KHARKHAREE", "BCCL-3-BLOCKIV", "ADMIN-ALL"]
    } = userData;

    const user = { userName, emailId, role, unit };
    return database
      .ref(`users/${uid}`)
      .once("value")
      .then((snapshot) => {
        // console.log("cheking snapshot: ", snapshot.val());
        // Only adding new user to users reference in firebase database
        if (!snapshot.val()) {
          return database.ref(`users/${uid}`).set(user);
        }
      })
      .then(() => {
        // Adding user details to auth property in redux store.
        dispatch(addUser({ ...user }));
        // Setting the unit for a user
        dispatch(setUnit(user.unit));
      });
  };
};

export const logout = () => ({
  type: "LOGOUT",
});

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
