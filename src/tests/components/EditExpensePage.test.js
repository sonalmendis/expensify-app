import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';

import expenses from '../fixtures/expenses';

let editExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
	editExpense = jest.fn();
	startRemoveExpense = jest.fn();
	history = { push: jest.fn() };
	wrapper = shallow(
		<EditExpensePage
			editExpense={editExpense}
			startRemoveExpense={startRemoveExpense}
			history={history}
			expense={expenses[1]}
		/>
	);
});

test('should render EditExpensePage correctly with a given expense', () => {
	expect(wrapper).toMatchSnapshot();
});

test('should handle edit expenses on submit', () => {
	wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
	expect(history.push).toHaveBeenLastCalledWith('/');
	expect(editExpense).toHaveBeenLastCalledWith({ id: expenses[1].id, updates: expenses[1] });
});

test('should handle remove expense', () => {
	wrapper.find('button').prop('onClick')(expenses[1]);
	expect(history.push).toHaveBeenLastCalledWith('/');
	expect(startRemoveExpense).toHaveBeenLastCalledWith(expenses[1].id);
});
