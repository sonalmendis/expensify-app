import { createStore, combineReducers } from 'redux';
import uuidv1 from 'uuid/v1';

/***
 * The overal flow of Redux sorta works like this:
 * The redux store is what creates the original object database state to begin with
 * Actions are functions which intend to change the state
 * Reducers handle actions in a coherent manner
 * The store will take a reducer as an argument, multiple reducers can combine in one store with combineReducers
 * as shown in redux-expensify.js
 */

// ADD EXPENSE ACTION
const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0 } = {}) => ({
	type: 'ADD_EXPENSE',
	expense: {
		id: uuidv1(),
		description,
		note,
		amount,
		createdAt
	}
});

// REMOVE EXPENSE ACTION
const removeExpense = ({ id } = {}) => ({
	type: 'REMOVE_EXPENSE',
	id
});

// EDIT EXPENSE ACTION
const editExpense = (id, updates) => ({
	type: 'EDIT_EXPENSE',
	id,
	updates
});

// SET TEXT FILTER
const setTextFilter = ({ text = '' } = {}) => ({
	type: 'SET_TEXT_FILTER',
	text
});

// SORT BY AMOUNT
const sortByAmount = () => ({
	type: 'SORT_BY_AMOUNT'
});

// SORT BY DATE
const sortByDate = () => ({
	type: 'SORT_BY_DATE'
});

// SET START DATE
const setStartDate = (startDate = undefined) => ({
	type: 'SET_START_DATE',
	startDate
});

// SET END DATE
const setEndDate = (endDate = undefined) => ({
	type: 'SET_END_DATE',
	endDate
});

const expensesReducerDefaultState = []; // example of setting the default state values as a var beforehand
const expensesReducer = (state = expensesReducerDefaultState, action) => {
	switch (action.type) {
		case 'ADD_EXPENSE':
			return [...state, action.expense];
		// the spread operator [...state] works similar to state.concat(action.expense);
		case 'REMOVE_EXPENSE':
			return state.filter(id => id !== action.id);
		/* filter above is shorthand for:
                state.filter(({id}) => {
                    return id !== action.id
                })
                ({id}) is just a destructured (expense.id)

        */
		case 'EDIT_EXPENSE':
			return state.map(expense => {
				if (expense.id === action.id) {
					return {
						...expense,
						...action.updates
					};
				} else {
					return expense;
				}
			});
		default:
			return state;
	}
};

// Filters reducer

const filtersReducerDefaultState = {
	text: '',
	sortBy: 'date',
	startDate: undefined,
	endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
	switch (action.type) {
		case 'SET_TEXT_FILTER':
			return { ...state, text: action.text };
		case 'SORT_BY_AMOUNT':
			return { ...state, sortBy: 'amount' };
		case 'SORT_BY_DATE':
			return { ...state, sortBy: 'date' };
		case 'SET_START_DATE':
			return { ...state, startDate: action.startDate };
		case 'SET_END_DATE':
			return { ...state, endDate: action.endDate };
		default:
			return state;
	}
};

// Get visible expense
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
	/*
    The way this function works is by going through the states expenses one by one and then console logging
    them based on the filters from the dispatch. The filters are a way to visibly sort through items BUT
    they don't change the state directly which is why its not used in a reducer.
    */
	return expenses
		.filter(expense => {
			const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
			// console.log(startDate);
			// console.log(startDateMatch);
			const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
			// console.log(text);

			const textMatch = typeof text !== 'string' || expense.description.toLowerCase().includes(text.toLowerCase());

			return startDateMatch && endDateMatch && textMatch; // Anything that return false will get filtered out
		})
		.sort((a, b) => {
			//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
			if (sortBy === 'date') {
				return a.createdAt < b.createdAt ? 1 : -1;
			} else if (sortBy === 'amount') {
				return a.amount < b.amount ? 1 : -1;
			}
		});
};

// Store creation

const store = createStore(
	combineReducers({
		expenses: expensesReducer,
		filters: filtersReducer
	})
);

store.subscribe(() => {
	const state = store.getState();
	const visibleExpenese = getVisibleExpenses(state.expenses, state.filters);
	console.log(visibleExpenese);
});

const expenseOne = store.dispatch(
	addExpense({
		description: 'Rent',
		amount: 100,
		createdAt: 2000
	})
);

const expenseTwo = store.dispatch(
	addExpense({
		description: 'Beans',
		amount: 200,
		createdAt: -1000
	})
);

const expenseThree = store.dispatch(
	addExpense({
		description: 'bobs',
		amount: 400,
		createdAt: 5000
	})
);

// console.log(expenseOne);
// store.dispatch(removeExpense({ id: expenseOne.expense }));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 700 }));

// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1001));
// store.dispatch(setTextFilter({ text: 'bea' }));

const demoState = {
	expenses: [
		{
			id: 1231231231,
			description: 'January rent',
			note: 'final payment for that address',
			amount: 2000,
			createdAt: 0
		}
	],
	filters: {
		text: 'rent',
		sortBy: 'amount', //date or amount
		startDate: undefined,
		endDate: undefined
	}
};

// object spread operator example
// const user = {
// 	name: 'jen',
// 	age: 24
// };

// console.log({
// 	...user,
// 	age: 27,
// 	location: 'Colombo'
// });
