import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('should setup default filter values', () => {
	const state = filtersReducer(undefined, { type: '@@INIT' }); // refer to section 12 lesson 116, basically redux gives us the INIT action
	expect(state).toEqual({
		text: '',
		sortBy: 'date',
		startDate: moment().startOf('month'),
		endDate: moment().endOf('month')
	});
});

test('should set sortBy to amount', () => {
	const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
	expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
	const currentState = {
		text: '',
		startDate: undefined,
		endDate: undefined,
		sortBy: 'amount'
	};
	const action = { type: 'SORT_BY_DATE' };
	const state = filtersReducer(currentState, action);
	expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
	const currentState = {
		text: '',
		startDate: undefined,
		endDate: undefined,
		sortBy: 'date'
	}; // current state isn't necessary as such since an 'undefined' state in filteresReducer will get defaults anyway
	const action = { type: 'SET_TEXT_FILTER', text: 'test' };
	const state = filtersReducer(currentState, action);
	expect(state.text).toBe('test');
});

test('should set startDate filter', () => {
	const currentState = {
		text: '',
		startDate: undefined,
		endDate: undefined,
		sortBy: 'date'
	}; // current state isn't necessary as such since an 'undefined' state in filteresReducer will get defaults anyway
	const date = moment().startOf('month');
	const action = { type: 'SET_START_DATE', startDate: date };
	const state = filtersReducer(currentState, action);
	expect(state.startDate).toBe(date);
});

test('should set endDate filter', () => {
	const currentState = {
		text: '',
		startDate: undefined,
		endDate: undefined,
		sortBy: 'date'
	}; // current state isn't necessary as such since an 'undefined' state in filteresReducer will get defaults anyway
	const date = moment().endOf('month');
	const action = { type: 'SET_END_DATE', endDate: date };
	const state = filtersReducer(currentState, action);
	expect(state.endDate).toBe(date);
});
