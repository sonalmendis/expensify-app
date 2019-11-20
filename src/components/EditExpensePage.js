import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
	onSubmit = updates => {
		const id = this.props.expense.id;
		console.log('updated', updates);
		// console.log(this.props.editExpense({ id, updates }));
		this.props.startEditExpense(id, updates);
		this.props.history.push('/'); // to re-direct the page
	};

	onClick = () => {
		// console.log(dispatch(startRemoveExpense(id)));
		const id = this.props.expense.id;
		this.props.startRemoveExpense(id);
		this.props.history.push('/'); // to re-direct the page
	};

	render() {
		return (
			<div>
				<div className="page-header">
					<div className="content-container">
						<h1 className="page-header__title">Edit Expense</h1>
					</div>
				</div>

				<div className="content-container">
					<ExpenseForm
						className="content-container"
						expense={this.props.expense}
						onSubmit={this.onSubmit}
						buttonCopy={'Save Expense'}
					/>
					<button className="button button--secondary" onClick={this.onClick}>
						Remove Expense
					</button>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	startEditExpense: (id, updates) => dispatch(startEditExpense(id, updates)),
	startRemoveExpense: id => dispatch(startRemoveExpense(id))
});

const mapStateToProps = (state, props) => {
	return {
		expense: state.expenses.find(expense => expense.id === props.match.params.id)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
