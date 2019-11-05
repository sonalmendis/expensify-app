import uuidv1 from 'uuid/v1';
import database from '../firebase/firebase';

// a component will call an action generator like the ones below
// the action generator then returns an object as shown below
// the component also calls the dispatch method to send the returned object to a reducer
// the reducer then changes the redux store

// FOR ASYNC FUNCTIONS WHERE REDUX COMMUNICATES WITH THE DB (FIREBASE) THE ABOVE IS SLIGHTLY DIFFERENT:
// a component will call an action generator like the ones below
// the action generator then returns A FUNCTION
// the component then dispatched THE FUNCTION
// the function runs
// redux-thunk is used as middleware to allow redux to actually be able to use functions

// ADD EXPENSE ACTION
export const addExpense = expense => ({
	type: 'ADD_EXPENSE',
	expense
});

export const startAddExpense = (expenseData = {}) => {
	// returning a function like below usually wouldn't work without redux-thunk
	return dispatch => {
		// setting up the defaults below:
		const { description = '', note = '', amount = 0, createdAt = 0 } = expenseData;
		const expense = { description, note, amount, createdAt };
		return database
			.ref('expenses')
			.push(expense)
			.then(ref => {
				dispatch(
					addExpense({
						id: ref.key,
						...expense
					})
				);
			});
	};
};

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

// SET_EXPENSES
export const setExpenses = expenses => ({
	type: 'SET_EXPENSES',
	expenses
});

export const startSetExpenses = () => {
	return dispatch => {
		return database
			.ref('expenses')
			.once('value')
			.then(snapshot => {
				// remember to use .val() to actually view the snapshot properly
				// console.log(snapshot.val());
				const expenses = [];

				// https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot
				snapshot.forEach(childSnapshot => {
					expenses.push({
						id: childSnapshot.key, // this is the id that comes from the firebase object
						...childSnapshot.val() // the rest of the object details, description, amount etc.
					});
				});

				console.log(expenses);

				// console.log(dispatch(setExpenses(expenses)));
				// MAKE SURE TO CHECK THAT YOU'RE PASSING IN THE RIGHT FORMAT
				// WHETHER ITS AN ARRAY OR OBJECT
				/*
				dispatch(setExpenses({...expenses})) WONT' WORK
				*/

				console.log(dispatch(setExpenses(expenses)));
			});
	};
};
