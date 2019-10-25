import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
	onSubmit = updates => {
		const id = this.props.expense.id;
		console.log('updated', updates);
		// console.log(this.props.editExpense({ id, updates }));
		this.props.editExpense({ id, updates });
		this.props.history.push('/'); // to re-direct the page
	};

	onClick = () => {
		// console.log(dispatch(removeExpense(id)));
		const id = this.props.expense.id;
		this.props.removeExpense(id);
		this.props.history.push('/'); // to re-direct the page
	};

	render() {
		return (
			<div>
				<ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
				<button onClick={this.onClick}>Remove</button>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	editExpense: (id, updates) => dispatch(editExpense(id, updates)),
	removeExpense: id => dispatch(removeExpense({ id: id }))
});

const mapStateToProps = (state, props) => {
	return {
		expense: state.expenses.find(expense => expense.id === props.match.params.id)
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditExpensePage);
