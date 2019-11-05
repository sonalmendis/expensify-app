const expensesReducerDefaultState = []; // example of setting the default state values as a var beforehand
const expensesReducer = (state = expensesReducerDefaultState, action) => {
	switch (action.type) {
		case 'ADD_EXPENSE':
			return [...state, action.expense];
		// the spread operator [...state] works similar to state.concat(action.expense);
		case 'REMOVE_EXPENSE':
			return state.filter(
				({ id }) => id !== action.id
				// console.log(action.id);
				// console.log(id);
			);
		/* filter above is shorthand for:
                state.filter(({id}) => {
                    return id !== action.id
                })
                ({id}) is just a destructured (expense.id)

        */
		case 'EDIT_EXPENSE':
			return state.map(expense => {
				if (expense.id === action.id) {
					return {
						...expense,
						...action.updates
					};
				} else {
					return expense;
				}
			});
		case 'SET_EXPENSES':
			return action.expenses;
		default:
			return state;
	}
};

export default expensesReducer;
