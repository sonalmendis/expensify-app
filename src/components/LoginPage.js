import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin }) => (
	<div className="box-layout">
		<div className="box-layout__box">
			<h1 className="box-layout__title">Expensify</h1>
			<p>It's time to get your expenses under control.</p>
			<button className="button" onClick={startLogin}>
				Login with Google
			</button>
		</div>
	</div>
);

/****
 The above can also be written out as:
 export const LoginPage = (props) => (
	<div>
		<button onClick={props.startLogin}>Login</button>
	</div>
);
The current way is just an easier de-structured way
 */

const mapDispatchToProps = dispatch => ({
	startLogin: () => dispatch(startLogin())
});
export default connect(undefined, mapDispatchToProps)(LoginPage);
