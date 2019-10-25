import uuidv1 from 'uuid/v1';

// ADD EXPENSE ACTION
export const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0 } = {}) => ({
	type: 'ADD_EXPENSE',
	expense: {
		id: uuidv1(),
		description,
		note,
		amount,
		createdAt
	}
});

// REMOVE EXPENSE ACTION
export const removeExpense = ({ id } = {}) => ({
	type: 'REMOVE_EXPENSE',
	id
});

// EDIT EXPENSE ACTION
export const editExpense = ({ id, updates }) => ({
	type: 'EDIT_EXPENSE',
	id,
	updates
});
