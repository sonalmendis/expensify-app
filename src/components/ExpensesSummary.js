import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expensesTotals';
import numeral from 'numeral';
export const ExpensesSummary = props => {
	if (props.expenses.length === 0) {
		return (
			<div>
				<p>No expenses to currently show</p>
			</div>
		);
	} else {
		const numberOfExpenses = props.expenses.length;
		const expensesTotalAmount = props.expensesTotal;
		return (
			<div>
				<p>
					You have {numberOfExpenses} expenses totalling {numeral(expensesTotalAmount / 100).format('$0,0.00')}
				</p>
			</div>
		);
	}
};

const mapStateToProps = state => {
	console.log(state);
	return {
		expenses: selectExpenses(state.expenses, state.filters),
		expensesTotal: selectExpensesTotal(selectExpenses(state.expenses, state.filters))
	};
};

export default connect(mapStateToProps)(ExpensesSummary);
