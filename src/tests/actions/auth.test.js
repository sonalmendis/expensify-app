import { login, logout } from '../../actions/auth';

test('should setup login action object', () => {
	const uid = '123abcd';
	const action = login(uid);
	expect(action).toEqual({
		type: 'LOGIN',
		uid
	});
	//toEqual is used for objects
});

test('should setup logout action object', () => {
	const action = logout();
	expect(action).toEqual({
		type: 'LOGOUT'
	});
	//toEqual is used for objects
});
