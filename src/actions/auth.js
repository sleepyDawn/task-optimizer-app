import { firebase, googleAuthProvider } from "../firebase/firebase";
import database from "../firebase/firebase";
import { setUnit } from "../actions/filters";

export const login = (uid) => ({
  type: "LOGIN",
  uid,
});

export const addUser = (authUser) => {
  return {
    type: "ADD_AUTH_USER",
    authUser,
  };
};

// role can be user, controller, admin
export const startAuthorizationOnLogin = (authUserData = {}, uid) => {
  return (dispatch, getState) => {
    const {
      userName = "",
      emailId = "",
      role = "user", //admin, default-user
      unit = "", // ["BCCL-3-NAKC", "BCCL-3-KHARKHAREE", "BCCL-3-BLOCKIV", "ADMIN-ALL", "GLOBAL"]
    } = authUserData;

    let authUser = { userName, emailId, role, unit };

    return database
      .ref(`users/${uid}`)
      .once("value")
      .then((snapshot) => {
        // console.log("cheking snapshot: ", snapshot.val());
        // Only adding new user to users reference in firebase database
        if (!snapshot.val()) {
          database
            .ref(`users/${uid}`)
            .set({ userName: authUser.userName, emailId: authUser.emailId })
            .then(() => {
              // Adding user details to auth property in redux store.
              dispatch(addUser(authUser));
              // As new  user doesn't have any assigned uint and also not an admin, so no need to update the unit
              // in filters object, they will have default unit for readonly purposes.
            });
        } else {
          authUser = { ...authUser, ...snapshot.val() };

          // Adding user details to auth property in redux store.
          dispatch(addUser(authUser));
          // Setting unit in filters for admin user, which may be other than default unit of filters state
          if (authUser.role === "admin" && authUser.unit !== "GLOBAL") {
            dispatch(setUnit(authUser.unit));
            console.log("checking after setting unit...");
          }
        }

        // console.log("checking after addition of auth User");
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
