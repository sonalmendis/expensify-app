import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
const ExpenseListItem = ({ description, amount, createdAt, id, dispatch }) => (
	<Link className="list-item" to={'/edit/' + id}>
		<div>
			<h3 className="list-item__title">{description}</h3>
			<span className="list-item__subtitle">{moment(createdAt).format('MMMMM Do, YYYY')} </span>
		</div>
		<h3 className="list-item__data">{numeral(amount / 100).format('$0,0.00')}</h3>
	</Link>
);

export default ExpenseListItem;

/*
The above is the same as:
export default (props) => (
	<div>
		<h2>{props.expenseDesc}</h2>
		<h3>{props.expenseAmount}</h3>
	</div>
);
but just de-structured for easier reading
*/
