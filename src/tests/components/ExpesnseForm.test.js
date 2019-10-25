import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import moment from 'moment';
import expenses from '../fixtures/expenses';

test('should render expense form correctly', () => {
	const wrapper = shallow(<ExpenseForm />);
	expect(wrapper).toMatchSnapshot();
});

test('should render expense form with data', () => {
	const props = {
		expense: {
			description: 'this is a test description',
			note: 'this is a test note',
			amount: 5500,
			createdAt: moment()
		}
	}; // NOTE YOU CAN USE EXPENSE DATA FROM THE FIXTURES AS WELL
	const wrapper = shallow(<ExpenseForm {...props} />);
	expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
	const wrapper = shallow(<ExpenseForm />);
	expect(wrapper).toMatchSnapshot();
	wrapper.find('form').simulate('submit', {
		preventDefault: () => {}
	});
	//https://airbnb.io/enzyme/docs/api/ReactWrapper/simulate.html

	expect(wrapper.state('error').length).toBeGreaterThan(0);
	expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
	const value = 'New description';
	const wrapper = shallow(<ExpenseForm />);
	// prettier-ignore
	wrapper.find('input').at(0).simulate('change', {
			target: { value }
		});
	//at(0) means the first in the array of found inputs
	//https://airbnb.io/enzyme/docs/api/ReactWrapper/at.html

	expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change', () => {
	const value = 'New note';
	const wrapper = shallow(<ExpenseForm />);
	// prettier-ignore
	wrapper.find('textarea').simulate('change', {
			target: { value }
		});
	//at(0) means the first in the array of found inputs
	//https://airbnb.io/enzyme/docs/api/ReactWrapper/at.html

	expect(wrapper.state('note')).toBe(value);
});

test('should set amount if valid input', () => {
	const value = '50.5';
	const wrapper = shallow(<ExpenseForm />);
	// prettier-ignore
	wrapper.find('input').at(1).simulate('change', {
			target: { value }
		});
	//at(0) means the first in the array of found inputs
	//https://airbnb.io/enzyme/docs/api/ReactWrapper/at.html

	expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid input', () => {
	const value = '50.55555555555';
	const wrapper = shallow(<ExpenseForm />);
	// prettier-ignore
	wrapper.find('input').at(1).simulate('change', {
			target: { value }
		});
	//at(0) means the first in the array of found inputs
	//https://airbnb.io/enzyme/docs/api/ReactWrapper/at.html

	expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit prop for valid form submission', () => {
	const onSubmitSpy = jest.fn();
	const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);

	wrapper.find('form').simulate('submit', {
		preventDefault: () => {}
	});
	expect(wrapper.state('error')).toBe('');
	expect(onSubmitSpy).toHaveBeenLastCalledWith({
		description: expenses[0].description,
		amount: expenses[0].amount,
		note: expenses[0].note,
		createdAt: expenses[0].createdAt
	});
});

test('should set new date on date change', () => {
	const now = moment();
	const wrapper = shallow(<ExpenseForm />);

	wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
	expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on change', () => {
	const focused = true;
	const wrapper = shallow(<ExpenseForm />);

	wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused });
	expect(wrapper.state('calendarFocused')).toBe(true);
});
