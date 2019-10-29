import selectExpensesTotal from '../../selectors/expensesTotals';
import expenses from '../fixtures/expenses';

test('should return 0 if no expense', () => {
	const value = [];
	const result = selectExpensesTotal(value);
	expect(result).toBe(0);
});

test('should add up single expense', () => {
	const result = selectExpensesTotal([expenses[0]]);
	expect(result).toEqual(expenses[0].amount);
});

test('should add up multiple expenses', () => {
	const result = selectExpensesTotal(expenses);
	expect(result).toEqual(expenses[0].amount + expenses[1].amount + expenses[2].amount);
});
