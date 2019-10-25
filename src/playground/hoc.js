// Higher Order Component (HOC) - A component that renders another component

import React from 'react';
import ReactDOM from 'react-dom';

const Info = props => (
	<div>
		<h1>info</h1>
		<p>The info is: {props.info}</p>
	</div>
);

const withAdminWarning = WrappedComponent => {
	return props => (
		<div>
			{props.isAdmin && <p>This is private info. Please do not share!</p>}

			<WrappedComponent {...props} />
		</div>
	);
};

const requireAuthentication = WrappedComponent => {
	return props => (
		<div>{props.isAuthenticated ? <WrappedComponent {...props} /> : <p>You are not authorized to view this</p>}</div>
	);
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={true} info="these are the infos" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="these are the infos" />, document.getElementById('app'));
