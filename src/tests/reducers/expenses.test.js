import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should set default state', () => {
	const state = expensesReducer(undefined, { type: '@@_INIT' });
	expect(state).toEqual([]);
});

test('should remove expense by ID', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: expenses[1].id
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense if ID not found', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: '-1'
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});

test('should add a new expense', () => {
	const action = {
		type: 'ADD_EXPENSE',
		expense: {
			id: '4',
			description: 'new test expense',
			note: 'test note',
			amount: 5000,
			createdAt: moment(0)
		}
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([...expenses, action.expense]);
});

test('should edit an expense', () => {
	const action = {
		type: 'EDIT_EXPENSE',
		id: '3',
		updates: {
			description: 'new edited description',
			note: 'new edited note'
		}
	};
	const state = expensesReducer(expenses, action);
	expect(state[2]).toEqual({ ...expenses[2], ...action.updates });
});

test('should not edit if expense not found', () => {
	const action = {
		type: 'EDIT_EXPENSE',
		id: '-1',
		updates: {
			description: 'new edited description',
			note: 'new edited note'
		}
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});
