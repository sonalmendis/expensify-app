import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
	setTextFilter = jest.fn();
	sortByDate = jest.fn();
	sortByAmount = jest.fn();
	setStartDate = jest.fn();
	setEndDate = jest.fn();
	wrapper = shallow(
		<ExpenseListFilters
			filters={filters}
			setTextFilter={setTextFilter}
			sortByDate={sortByDate}
			sortByAmount={sortByAmount}
			setStartDate={setStartDate}
			setEndDate={setEndDate}
		/>
	);
});

test('should render expense list filters correctly', () => {
	expect(wrapper).toMatchSnapshot();
});

test('should render expense list filters with alt data corretly', () => {
	wrapper.setProps({
		filters: altFilters
	});
	expect(wrapper).toMatchSnapshot();
});

/*
The test below should handle text input ONCHANGE correctly, testing for default onload isnt correct
and is already being tested in the above two functions, we have to test for text input onchange 
when the actual setTextFilter action gets called while typing in to the input.
Essentially the test will simulate a user typing a new text filter.
*/
test('should handle text input ONCHANGE correctly', () => {
	// wrapper.setProps({
	// 	filters: { text: 'test text' }
	// });
	// THIS ^ IS INCORRECT

	const value = 'test text string';

	// prettier-ignore
	wrapper.find('input').at(0).prop('onChange')({
        target: {value} 
    });
	// target: {value:value} because the onChange input prop's function targets e.target.value

	expect(setTextFilter).toHaveBeenLastCalledWith({
		text: value
	});
});

test('should set sortBy filter to Amount', () => {
	wrapper.find('select').prop('onChange')({
		target: { value: 'amount' }
	});

	expect(sortByAmount).toHaveBeenCalled();
});

test('should set sortBy filter to Date', () => {
	wrapper.find('select').prop('onChange')({
		target: { value: 'date' }
	});

	expect(sortByDate).toHaveBeenCalled();
});

test('should handle live date changes correctly', () => {
	const startDate = moment(0);
	const endDate = moment(0).add(3, 'days');

	wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({
		startDate,
		endDate
	});

	expect(setStartDate).toHaveBeenLastCalledWith(startDate);

	expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle calendar onFocusChange correctly', () => {
	const calendarFocused = 'endDate';
	wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocused);
	expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});
