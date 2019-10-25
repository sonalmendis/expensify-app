const moment = require.requireActual('moment'); // needed to mock out a library for Jest

export default (timestamp = 0) => {
	return moment(timestamp);
};
