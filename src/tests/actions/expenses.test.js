import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
	startAddExpense,
	addExpense,
	removeExpense,
	editExpense,
	setExpenses,
	startSetExpenses
} from '../../actions/expenses';
import { testNameToKey } from 'jest-snapshot/build/utils';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureStore([thunk]);

beforeEach(done => {
	const expensesData = {};
	expenses.forEach(({ id, description, note, createdAt, amount }) => {
		expensesData[id] = { description, note, createdAt, amount };
	});
	database
		.ref('expenses')
		.set(expensesData)
		.then(() => done());
});

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
	const action = addExpense(expenses[2]);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: expenses[2]
	});
});

test('should add expense to database AND store', done => {
	const store = createMockStore({});
	const expenseData = {
		description: 'Mouse',
		amount: 3000,
		note: 'This one is better',
		createdAt: 1000
	};
	store
		.dispatch(startAddExpense(expenseData))
		.then(() => {
			// this type of async action testing functionality only works because of redux-think as described in actions/expenses.js
			const actions = store.getActions();
			expect(actions[0]).toEqual({
				type: 'ADD_EXPENSE',
				expense: {
					id: expect.any(String),
					...expenseData
				}
			});

			return database.ref(`expenses/${actions[0].expense.id}`).once('value');
		})
		.then(snapshot => {
			expect(snapshot.val()).toEqual(expenseData);
			done(); // this forces Jest to wait and acknowledge that this test is async, otherwise it'll run functions before even getting to the 'then' chain
		});
});
test('should add expense with DEFAULTS to database AND store', done => {
	const store = createMockStore({});
	const defaults = {
		description: '',
		amount: 0,
		note: '',
		createdAt: 0
	};

	store
		.dispatch(startAddExpense({}))
		.then(() => {
			const actions = store.getActions();
			expect(actions[0]).toEqual({
				type: 'ADD_EXPENSE',
				expense: {
					id: expect.any(String),
					...defaults
				}
			});

			return database.ref(`expenses/${actions[0].expense.id}`).once('value'); // return is used to pass it onto the next 'then' chain
		})
		.then(snapshot => {
			expect(snapshot.val()).toEqual(defaults);
			done(); // this forces Jest to wait and acknowledge that this test is async, otherwise it'll run functions before even getting to the 'then' chain
		});
});

test('should setup set expense action object with data', () => {
	// this isn't as async test and doesn't require a seperate action handler
	const action = setExpenses(expenses);
	expect(action).toEqual({
		type: 'SET_EXPENSES',
		expenses
	});
});

test('should fetch the expenses from firebase', done => {
	const store = createMockStore({});
	store.dispatch(startSetExpenses()).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'SET_EXPENSES',
			expenses
		});
		done();
	});
});
