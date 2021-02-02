import database from "../firebase/firebase";

// Component call actions generator
// Action generator returns object
// component dispatches Object
// redux store changes

// With  firebase
// Component call actions generator
// Action generator returns function
// component dispatches function(?)
// redux runs(has the ability to dispatch other actions and do whatever it wants)

// ADD_EMPLOYEE
export const addEmployee = (employee) => ({
  type: "ADD_EMPLOYEE",
  employee,
});

export const startAddEmployee = (employeeData = {}) => {
  // dispatch will be passed by redux library
  // we can also use getState to get current state
  return (dispatch, getState) => {
    const {
      name = "",
      employeeId = "",
      lastPMEDate = 0,
      lastVTCDate = 0,
    } = employeeData;
    const unit = getState().filters.unit;

    const employee = { name, employeeId, lastPMEDate, lastVTCDate };

    return database
      .ref(`employees/${unit}`)
      .push(employee)
      .then((ref) => {
        dispatch(addEmployee({ id: ref.key, ...employee }));
      });
  };
};
// REMOVE_EMPLOYEE
export const removeEmployee = ({ id } = {}) => ({
  type: "REMOVE_EMPLOYEE",
  id,
});

export const startRemoveEmployee = ({ id } = {}) => {
  // console.log("checking id: ", id);
  return (dispatch, getState) => {
    // const uid = getState().auth.uid;
    const unit = getState().filters.unit;
    return database
      .ref(`employees/${unit}/${id}`)
      .remove()
      .then(() => {
        dispatch(removeEmployee({ id }));
      })
      .catch((e) => {
        console.log("Error in removing given employee: ", e);
      });
  };
};

// EDIT_EMPLOYEE
export const editEmployee = (id, updates) => ({
  type: "EDIT_EMPLOYEE",
  id,
  updates,
});

export const startEditEmployee = (id, updates) => {
  return (dispatch, getState) => {
    // const uid = getState().auth.uid;
    const unit = getState().filters.unit;
    return database
      .ref(`employees/${unit}/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editEmployee(id, updates));
      })
      .catch((e) => {
        console.log("error in update of employees: ", e);
      });
  };
};

// SET_EMPLOYEES
export const setEmployees = (employees) => ({
  type: "SET_EMPLOYEES",
  employees,
});

export const startSetEmployees = () => {
  return (dispatch, getState) => {
    // const uid = getState().auth.uid;
    const unit = getState().filters.unit;
    return database
      .ref(`employees/${unit}`)
      .once("value")
      .then((snapshot) => {
        // console.log("checking snapshot: ", snapshot);
        // console.log("checking snapshot: ", snapshot.val());
        const employees = [];
        snapshot.forEach((childSnapshot) => {
          employees.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        // console.log(employees);
        dispatch(setEmployees(employees));
      });
  };
};
