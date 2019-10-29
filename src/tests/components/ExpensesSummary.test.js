import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import selectExpensesTotal from '../../selectors/expensesTotals';

test('should render expenses summary component correctly without any expenses', () => {
	const wrapper = shallow(<ExpensesSummary expenses={[]} />);
	expect(wrapper).toMatchSnapshot();
});

test('should count single expense and show total', () => {
	const wrapper = shallow(
		<ExpensesSummary expenses={[expenses[0]]} expensesTotal={selectExpensesTotal([expenses[0]])} />
	);
	expect(wrapper).toMatchSnapshot();
});

test('should count multiple expenses and add up correct total', () => {
	const wrapper = shallow(<ExpensesSummary expenses={expenses} expensesTotal={selectExpensesTotal(expenses)} />);
	expect(wrapper).toMatchSnapshot();
});
