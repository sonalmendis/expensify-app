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

const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);
ReactDOM.render(jsx, document.getElementById('app'));
