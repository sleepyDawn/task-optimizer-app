import React from "react";
import { shallow } from "enzyme";

import { ExpensesSummary } from "../../components/ExpensesSummary";
import expenses from "../fixtures/expenses";

test("should render summary of single expense", () => {
  const wrapper = shallow(
    <ExpensesSummary expensesCount={1} expensesTotal={1.23} />
  );
  expect(wrapper).toMatchSnapshot();

  // expect(wrapper.find("h1").text()).toBe("Expense tracker");
});

test("should render summary of multiple expenses", () => {
  const wrapper = shallow(
    <ExpensesSummary expensesCount={3} expensesTotal={169.68} />
  );
  expect(wrapper).toMatchSnapshot();

  // expect(wrapper.find("h1").text()).toBe("Expense tracker");
});
