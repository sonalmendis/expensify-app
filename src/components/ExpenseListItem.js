import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
const ExpenseListItem = ({ description, amount, createdAt, id, dispatch }) => (
	<div>
		<Link to={'/edit/' + id}>
			<h2>{description}</h2>
		</Link>

		<p>
			{numeral(amount / 100).format('$0,0.00')}-{moment(createdAt).format('MMMMM Do, YYYY')}
		</p>
	</div>
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
