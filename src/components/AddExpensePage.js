import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';

export class AddExpensePage extends React.Component {
	onSubmit = expense => {
		console.log('updated addexpensepage', expense);
		// props.dispatch(addExpense(expense));
		this.props.startAddExpense(expense);
		this.props.history.push('/'); // to re-direct the page
	};
	render() {
		return (
			<div>
				<div className="page-header">
					<div className="content-container">
						<h1 className="page-header__title">Add Expense</h1>
					</div>
				</div>

				<div className="content-container">
					<ExpenseForm
						/* this prop gets sent to the expense form essentialy so the components can communicate in their 
						relevant contexts e.g in this case to add an expense (not to edit it)
						CHECK THE RELEVNT BOOKMARK ON UDEMY FOR INFO
						*/
						onSubmit={this.onSubmit}
						buttonCopy={'Add Expense'}
					/>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	startAddExpense: expense => dispatch(startAddExpense(expense))
});

// prettier-ignore
export default connect(undefined, mapDispatchToProps)(AddExpensePage);
