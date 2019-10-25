import moment from 'moment';
import { setStartDate, setEndDate, setTextFilter, sortByAmount, sortByDate } from '../../actions/filters';

test('should generate set START date action object', () => {
	const action = setStartDate(moment(0));
	expect(action).toEqual({
		type: 'SET_START_DATE',
		startDate: moment(0)
	});
});

test('should generate set END date action object', () => {
	const action = setEndDate(moment(0));
	expect(action).toEqual({
		type: 'SET_END_DATE',
		endDate: moment(0)
	});
});

test('should generate text filter action object with PROVIDED values', () => {
	const text = 'test string'; // using a var like this ensures the same value gets passed in to the expect call without typos
	const action = setTextFilter({ text });
	expect(action).toEqual({
		type: 'SET_TEXT_FILTER',
		text
	});
});

test('should generate text filter action object with DEFAULT values', () => {
	const action = setTextFilter({});
	expect(action).toEqual({
		type: 'SET_TEXT_FILTER',
		text: ''
	});
});

test('should generate sort by amount action object', () => {
	const action = sortByAmount({});
	expect(action).toEqual({
		type: 'SORT_BY_AMOUNT'
	});
});

test('should generate sort by date action object', () => {
	const action = sortByDate({});
	expect(action).toEqual({
		type: 'SORT_BY_DATE'
	});
});
