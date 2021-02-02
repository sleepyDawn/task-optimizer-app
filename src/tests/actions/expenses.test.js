import configReduxMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import database from "../../firebase/firebase";
import {
  startAddExpense,
  addExpense,
  editExpense,
  startEditExpense,
  setExpenses,
  startSetExpenses,
  removeExpense,
  startRemoveExpense,
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import expensesReducer from "../../reducers/expenses";

const uid = "thisismyfakeuid";
const defaultAuthState = { auth: { uid } };

// In configReduxMockStore we can optionally pass the middleware we want to use
const createMockStore = configReduxMockStore([thunk]);
beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  // console.log(expensesData);
  database
    .ref(`users/${uid}/expenses`)
    .set(expensesData)
    .then(() => done());
});

test("should setup remove expense action object", () => {
  const action = removeExpense({ id: "123abc" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc",
  });
});

test("should remove expense from firebase", (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[2].id;
  store
    .dispatch(startRemoveExpense({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "REMOVE_EXPENSE",
        id,
      });
      return database.ref(`users/${uid}expenses/${id}`).once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

test("should setup edit expense action object", () => {
  const action = editExpense("123abc", { note: "New note value" });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "123abc",
    updates: {
      note: "New note value",
    },
  });
});

test("should edit expense in firebase", (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[2].id;
  const updates = {
    description: "kya ji describe kiye",
  };
  store
    .dispatch(startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "EDIT_EXPENSE",
        id,
        updates,
      });
      return database.ref(`users/${uid}/expenses/${id}`).once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val().description).toEqual(updates.description);
      done();
    });
});

// This action generator is no longer responsible for creating action for default values, that's why it is commented

// test case for adding expense with default value
// test("should setup add expense action object with default value", () => {
//   const action = addExpense();
//   expect(action).toEqual({
//     type: "ADD_EXPENSE",
//     expense: {
//       description: "",
//       amount: 0,
//       createdAt: 0,
//       note: "",
//       id: expect.any(String),
//     },
//   });
// });

// test case for adding expense with provided values
test("should setup add expense action object with provided value", () => {
  const action = addExpense(expenses[0]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      ...expenses[0],
      id: expect.any(String),
    },
  });
});

test("should add expense to database and store", (done) => {
  const store = createMockStore(defaultAuthState);
  const expenseData = {
    description: "Mouse",
    amount: 3000,
    note: "This one is better",
    createdAt: 234324,
  };

  let actions;
  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseData,
        },
      });

      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      // console.log("checking 2", snapshot.val());
      done();
    });
});

test("should add expense with defaults to database and store", (done) => {
  const store = createMockStore(defaultAuthState); // creating store with empty state
  const defaultExpense = {
    id: expect.any(String),
    description: "",
    amount: 0,
    note: "",
    createdAt: 0,
  };

  let actions;
  store
    .dispatch(startAddExpense())
    .then(() => {
      actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: defaultExpense,
      });

      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual({
        description: "",
        amount: 0,
        note: "",
        createdAt: 0,
      });

      // console.log("checking 1", snapshot.val());
      done();
    });
});

test("should setup SET_EXPENSES action object with data", () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses,
  });
});

test("should set expenses", () => {
  const action = {
    type: "SET_EXPENSES",
    expenses: [expenses[2]],
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[2]]);
});

test("should fetch expenses from firebase", (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses,
    });
    done();
  });
});
