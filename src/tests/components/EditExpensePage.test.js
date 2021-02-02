import React from "react";
import { shallow } from "enzyme";

import { EditExpensePage } from "../../components/EditExpensePage";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";

let startEditExpense, startRemoveExpense, history, expense, match, wrapper;
// lifecycle method of enzyme
beforeEach(() => {
  startEditExpense = jest.fn();
  startRemoveExpense = jest.fn();
  match = {};
  match.params = { id: expenses[0].id };
  expense = expenses[0];
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      startEditExpense={startEditExpense}
      startRemoveExpense={startRemoveExpense}
      match={match}
      expense={expense}
      history={history}
    ></EditExpensePage>
  );
});

test("should render EditExpensePage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle onSubmit", () => {
  wrapper.find(ExpenseForm).prop("onSubmit")(expenses[0]);
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(startEditExpense).toHaveBeenLastCalledWith(
    expenses[0].id,
    expenses[0]
  );
});

test("should handle onClick", () => {
  wrapper.find("button").simulate("click");
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expenses[0].id });
});
