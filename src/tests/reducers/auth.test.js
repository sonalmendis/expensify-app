import authReducer from '../../reducers/auth';
test('should return default state', () => {
	const state = authReducer(undefined, { type: '@@_INIT' });
	expect(state).toEqual({});
});

test('should return uid object if logging in', () => {
	const uid = '123abcd';
	const action = {
		type: 'LOGIN',
		uid
	};
	const state = authReducer(undefined, action);
	expect(state).toEqual({ uid });
});

test('should clear uid object if logging out', () => {
	const action = {
		type: 'LOGOUT'
	};
	const state = authReducer(undefined, action);
	expect(state).toEqual({});
});
