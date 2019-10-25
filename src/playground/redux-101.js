import { createStore } from 'redux';

/***
 * The overal flow of Redux sorta works like this:
 * The redux store is what creates the original object database state to begin with
 * Actions are functions which intend to change the state
 * Reducers handle actions in a coherent manner
 * The store will take a reducer as an argument, multiple reducers can combine in one store with combineReducers
 * as shown in redux-expensify.js
 */

// Action generators - a function that returns action objects

const incrementCount = ({ incrementBy = 1 } = {}) => ({
	type: 'INCREMENT',
	incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
	type: 'DECREMENT',
	decrementBy
});

const resetCount = () => ({
	type: 'RESET'
});

const setCount = ({ setCountTo }) => ({
	type: 'SET',
	setCountTo
});

// () on the outside of a function means implicit return()

/**
 * REDUCERS
 * Reducers specify how the application's state changes in response to actions sent to the store.
 * Remember that actions only describe what happened, but don't describe how the application's state changes.
 *
 * Reducers:
 * 1. Pure functions (they don't change vars outside of their own scope per se)
 * 2. Never change state or action (the action will change it witin the reducer but NOT the reducer itself)
 */

const countChange = (state = { count: 0 }, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return {
				count: state.count + action.incrementBy
			};
		case 'DECREMENT':
			return {
				count: state.count - action.decrementBy
			};
		case 'RESET':
			return {
				count: 0
			};
		case 'SET':
			return {
				count: action.setCountTo
			};
		default:
			return state;
	}

	// The switch statement above is like the if/else function below. Switch is preffered because it scales better when you add many cases
	// if (action.type === 'INCREMENT') {
	// 	return {
	// 		count: state.count + 1
	// 	};
	// } else {
	// 	return state;
	// }
};

const store = createStore(countChange);

// Actions are just objects that get sent to the store

// subscribe watches for any changes in the redux store by actions
const unsubscribe = store.subscribe(() => {
	console.log(store.getState());
});
// I'd like to increment the count
// store.dispatch({
// 	type: 'INCREMENT',
// 	incrementBy: 5
// });

store.dispatch(incrementCount({ incrementBy: 15 }));

store.dispatch(incrementCount());

// unsubscribe(); this will stop the subscribe watching function as const is defined above
store.dispatch({
	type: 'INCREMENT'
});
store.dispatch(resetCount());
store.dispatch(decrementCount());
store.dispatch(decrementCount({ decrementBy: 10 }));
store.dispatch(setCount({ setCountTo: 100 }));

// INCREMENT is in capitals just as a redux naming convention
