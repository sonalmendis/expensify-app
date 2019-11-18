import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
export const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
	<Route
		{...rest}
		component={props =>
			isAuthenticated ? (
				<div>
					<Header />
					<Component {...props} />
				</div>
			) : (
				<Redirect to="/" />
			)
		}
	/>
);

const mapStateToProps = state => ({
	isAuthenticated: !!state.auth.uid
});
// !!state.auth.uid basically means that if there is a UID it will return the uid, if not it will return
// undefined, the !! switch it up so that its either a true or false boolean

export default connect(mapStateToProps)(PrivateRoute);
