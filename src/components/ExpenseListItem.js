import React from 'react';

import { Link } from 'react-router-dom';
const ExpenseListItem = ({ description, amount, createdAt, id, dispatch }) => (
	<div>
		<Link to={'/edit/' + id}>
			<h2>{description}</h2>
		</Link>

		<h3>{amount}</h3>
		<h4>{createdAt}</h4>
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
