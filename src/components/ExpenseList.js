import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = props => (
	<div>
		{props.expenses.length === 0 ? (
			<p>No expenses</p>
		) : (
			props.expenses.map((expense, index) => (
				<ExpenseListItem {...expense} key={expense.id} />
				// Remember to use the spread operator above {...expense} ^ since its the same and a far simpler way of passing props like below:
				// NOTE, if you use the spread operator remember to de-structure it in the expenselistitem file
				// <ExpenseListItem expenseDesc={expense.description} expenseAmount={expense.amount} key={expense.id} />
			))
		)}
	</div>
);

/*
Connect will connect the store to a specific component
You can specifiy which part of the store/state you want passed in
*/

const mapStateToProps = state => {
	return {
		expenses: selectExpenses(state.expenses, state.filters)
	};
};
/**
 * The above just uses the 'selectExpenses' function to actually make use of the filter functions
 * The below is what it looked like before, however, the above is needed to actually make use of the filters
 */
// const mapStateToProps = state => {
// 	return {
// 		expenses: state.expenses,
// 		filters: state.filters
// 	};
// };

export default connect(mapStateToProps)(ExpenseList); // ExpenseList gets passed in to connect, it just looks weird cos that's how their API works
