import React from "react";
import { shallow } from "enzyme";

import { AddExpensePage } from "../../components/AddExpensePage";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";

let startAddExpense, history, wrapper;
// lifecycle method of enzyme
beforeEach(() => {
  startAddExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <AddExpensePage
      startAddExpense={startAddExpense}
      history={history}
    ></AddExpensePage>
  );
});

test("should render AddExpensePage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle onSubmit", () => {
  wrapper.find(ExpenseForm).prop("onSubmit")(expenses[1]);
  expect(history.push).toHaveBeenLastCalledWith("/dashboard");
  expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);
});
