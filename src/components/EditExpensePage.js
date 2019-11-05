import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
	onSubmit = updates => {
		const id = this.props.expense.id;
		console.log('updated', updates);
		// console.log(this.props.editExpense({ id, updates }));
		this.props.editExpense({ id, updates });
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
				<ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
				<button onClick={this.onClick}>Remove</button>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	editExpense: (id, updates) => dispatch(editExpense(id, updates)),
	startRemoveExpense: id => dispatch(startRemoveExpense(id))
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
