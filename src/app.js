import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense, removeExpense, editExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import validator from 'validator';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

/***
 * NOTE
 * We don't need to import the reducers here because the reducers have already been imported in store/configureStore.js
 */

store.subscribe(() => {
	const state = store.getState();
	const visibleExpenese = getVisibleExpenses(state.expenses, state.filters);
});
store.dispatch(addExpense({ description: 'water bill', amount: 2500 }));
store.dispatch(addExpense({ description: 'gas bill', amount: 5500, createdAt: 1000 }));
store.dispatch(addExpense({ description: 'rent', amount: 12500 }));

console.log(store.getState());

const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);
ReactDOM.render(jsx, document.getElementById('app'));
