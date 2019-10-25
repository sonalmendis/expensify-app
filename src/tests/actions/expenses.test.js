import { addExpense, removeExpense, editExpense } from '../../actions/expenses';
import { testNameToKey } from 'jest-snapshot/build/utils';

test('should setup remove expense action object', () => {
	const action = removeExpense({ id: '123abcd' });
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123abcd'
	});
	//toEqual is used for objects
});

test('should setup edit expense action object', () => {
	const action = editExpense({
		id: '123abcd',
		updates: { description: 'new expenese test', note: 'this is a test note' }
	});
	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id: '123abcd',
		updates: {
			description: 'new expenese test',
			note: 'this is a test note'
		}
	});
});

test('should setup add expense action object with PROVIDED values', () => {
	const expenseDate = {
		description: 'Rent',
		amount: 10000,
		createdAt: 1000,
		note: 'This was last months rent'
	};
	const action = addExpense(expenseDate);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			...expenseDate,
			id: expect.any(String)
		}
	});
});

test('should setup add expense action object with DEFAULT values', () => {
	const action = addExpense({});
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			id: expect.any(String),
			description: '',
			amount: 0,
			createdAt: 0,
			note: ''
		}
	});
});
