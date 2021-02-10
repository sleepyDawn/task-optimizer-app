import database from "../firebase/firebase";

export const addUser = (user) => {
  return {
    type: "ADD_USER",
    user,
  };
};

export const editUser = (id, updates) => ({
  type: "EDIT_USER",
  id,
  updates,
});

export const startEditUser = (id, updates) => {
  return (dispatch) => {
    return database
      .ref(`users/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editUser(id, updates));
      });
  };
};

export const removeUser = (id) => ({
  type: "REMOVE_USER",
  id,
});

// Action generator for removing all users list when authUser logsOut
export const removeAllUsers = () => ({
  type: "REMOVE_ALL_USERS",
});

export const startRemoveUser = (id) => {
  return (dispatch) => {
    return database
      .ref(`users/${id}`)
      .remove()
      .then(() => {
        console.log("checking if user is removed!!!");
        dispatch(removeUser(id));
      })
      .catch((e) => {
        console.log(`Error: ${e}`);
      });
  };
};

export const setUsers = (users) => {
  return {
    type: "SET_USERS",
    users,
  };
};

export const startSetUsers = () => {
  return (dispatch, getState) => {
    // console.log("checking auth user", getState.auth.authUser);
    const { role, unit } = getState().auth.authUser;
    if (role === "admin" && unit === "GLOBAL") {
      return database
        .ref(`users`)
        .once("value")
        .then((snapshot) => {
          const users = [];
          snapshot.forEach((childSnapshot) => {
            users.push({
              id: childSnapshot.key,
              ...childSnapshot.val(),
            });
          });
          // Setting the users for admin in redux store(users state)
          dispatch(setUsers(users));
        });
    }
  };
};
