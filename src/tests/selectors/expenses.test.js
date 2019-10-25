import getVisibleExpenses from '../../selectors/expenses';
import moment from 'moment';
import expenses from '../fixtures/expenses';

test('should filter by text value', () => {
	const filters = {
		text: 'e',
		sortBy: 'date',
		startDate: undefined,
		endDate: undefined
	};
	const result = getVisibleExpenses(expenses, filters);
	expect(result).toEqual([expenses[2], expenses[1]]);
	// THE ORDER of the arrays matters above ^ so [expenses[1], expenses[2] won't work, the filter sets an order so it makes sense to check the actual sort by order
});

test('should filter by start date', () => {
	const filters = {
		text: '',
		sortBy: 'date',
		startDate: moment(0),
		endDate: undefined
	};

	const result = getVisibleExpenses(expenses, filters);
	expect(result).toEqual([expenses[2], expenses[0]]);
});

test('should filter by end date', () => {
	const filters = {
		text: '',
		sortBy: 'date',
		startDate: undefined,
		endDate: moment(0)
	};

	const result = getVisibleExpenses(expenses, filters);
	expect(result).toEqual([expenses[0], expenses[1]]);
});

test('should sort date', () => {
	const filters = {
		text: '',
		sortBy: 'date',
		startDate: undefined,
		endDate: undefined
	};

	const result = getVisibleExpenses(expenses, filters);
	expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
});

test('should sort by amount', () => {
	const filters = {
		text: '',
		sortBy: 'amount',
		startDate: undefined,
		endDate: undefined
	};

	const result = getVisibleExpenses(expenses, filters);
	expect(result).toEqual([expenses[1], expenses[2], expenses[0]]);
});
