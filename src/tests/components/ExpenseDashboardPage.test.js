import React from "react";
import { shallow } from "enzyme";

import ExpenseDashboardPage from "../../components/ExpenseDashboardPage";

test("should render expenseDashboard page correctly", () => {
  const wrapper = shallow(<ExpenseDashboardPage />);
  expect(wrapper).toMatchSnapshot();

  // expect(wrapper.find("h1").text()).toBe("Expense tracker");
});
