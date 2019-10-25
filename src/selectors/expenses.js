import moment from 'moment';

// Get visible expense
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
	/*
    The way this function works is by going through the states expenses one by one and then console logging
    them based on the filters from the dispatch. The filters are a way to visibly sort through items BUT
    they don't change the state directly which is why its not used in a reducer.
    */
	return expenses
		.filter(expense => {
			const createdAtMoment = moment(expense.createdAt);
			const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
			// console.log(startDate);
			// console.log(startDateMatch);
			const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
			// console.log(text);

			const textMatch = typeof text !== 'string' || expense.description.toLowerCase().includes(text.toLowerCase());

			return startDateMatch && endDateMatch && textMatch; // Anything that return false will get filtered out
		})
		.sort((a, b) => {
			//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
			if (sortBy === 'date') {
				return a.createdAt < b.createdAt ? 1 : -1;
			} else if (sortBy === 'amount') {
				return a.amount < b.amount ? 1 : -1;
			}
		});
};

export default getVisibleExpenses;
