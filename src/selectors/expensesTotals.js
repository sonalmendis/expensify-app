// Get visible expense
const selectExpensesTotal = expenses => {
	/*

    */

	// prettier-ignore
	if(expenses.length === 0){
        return 0;
    } else {
        return(     
            expenses.map(expenses => {
			return expenses.amount;
		    }).reduce((accumulator, currentValue) => {
		    	return accumulator + currentValue;
            })
        );
   
    }
};

export default selectExpensesTotal;
