import selectTotalExpenses from "../../selectors/ExpensesTotal";
import expenses from "../fixtures/expenses";

test("should return 0 if no expenses", () => {
  const result = selectTotalExpenses();
  expect(result).toBe(0);
});

test("should correctly add up a single expense", () => {
  const result = selectTotalExpenses([expenses[0]]);
  expect(result).toBe(123);
});

test("should correctly add up multiple expenses", () => {
  const result = selectTotalExpenses(expenses);
  expect(result).toBe(16968);
});
