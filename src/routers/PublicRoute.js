/**
Public routes are ONLY for logged out users i.e logged in users can't access them
In this case it applies to the login page
 */

import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({ isAuthenticated, component: Component, ...rest }) => (
	<Route
		{...rest}
		component={props =>
			isAuthenticated ? (
				<div>
					<Redirect to="/dashboard" />
				</div>
			) : (
				<Component {...props} />
			)
		}
	/>
);

const mapStateToProps = state => ({
	isAuthenticated: !!state.auth.uid
});
// !!state.auth.uid basically means that if there is a UID it will return the uid, if not it will return
// undefined, the !! switch it up so that its either a true or false boolean

export default connect(mapStateToProps)(PublicRoute);
