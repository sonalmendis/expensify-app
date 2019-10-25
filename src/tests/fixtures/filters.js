import moment from 'moment';

// A fixture is just test data
const filters = {
	text: '',
	sortBy: 'date',
	startDate: undefined,
	endDate: undefined
};

const altFilters = {
	text: 'beans',
	sortBy: 'amount',
	startDate: moment(0),
	endDate: moment(0).add(3, 'days')
};

export {filters, altFilters};