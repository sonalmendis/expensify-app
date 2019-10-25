import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';
const ExpenseDashboardPage = () => (
	<div>
		<ExpenseListFilters />
		<ExpenseList></ExpenseList>
	</div>
);

export default ExpenseDashboardPage;
