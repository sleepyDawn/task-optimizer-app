import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("should set default State", () => {
  expect(expensesReducer(undefined, { type: "@@INIT" })).toEqual([]);
});

test("should remove expense by Id", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: "2",
  };
  const state = expensesReducer(expenses, action);

  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not  remove expense if Id is not found", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: "-6",
  };
  const state = expensesReducer(expenses, action);

  expect(state).toEqual(expenses);
});

test("should add an expense", () => {
  const action = {
    type: "ADD_EXPENSE",
    expense: {
      id: "4",
      note: "sdfsdfsfsdf sfsdfsd",
      description: "daily expenses",
      amount: 12300,
      createdAt: 1234,
    },
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, action.expense]);
});

test("should edit an expense with given id", () => {
  const action = {
    type: "EDIT_EXPENSE",
    id: expenses[1].id,
    updates: {
      note: "updated notes",
    },
  };
  const state = expensesReducer(expenses, action);
  expect(state[1].note).toBe("updated notes");
});

test("should not edit an expense if id is not found", () => {
  const action = {
    type: "EDIT_EXPENSE",
    id: "-6",
    updates: {
      note: "updated notes",
    },
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});
