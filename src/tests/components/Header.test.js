import { shallow } from 'enzyme';
import React from 'react';
import { Header } from '../../components/Header';

test('should render header correctly', () => {
	const wrapper = shallow(<Header startLogout={() => {}} />);
	expect(wrapper).toMatchSnapshot();

	// expect(wrapper.find('h1').text()).toBe('Expensify');

	// const renderer = new ReactShallowRenderer();
	// renderer.render(<Header />);
	// expect(renderer.getRenderOutput()).toMatchSnapshot();

	// console.log(renderer.getRenderOutput());
});

test('should call startLogout on button click', () => {
	const startLogout = jest.fn();
	const wrapper = shallow(<Header startLogout={startLogout} />);

	wrapper.find('button').prop('onClick')(startLogout);
	// you can also use:
	// wrapper.find('button').simulate('click);

	expect(startLogout).toHaveBeenCalled();
});
