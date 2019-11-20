import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';

export class ExpenseListFilters extends React.Component {
	state = {
		calendarFocused: null
	};
	componentDidMount() {
		// console.log(this.props);
	}
	onDatesChange = ({ startDate, endDate }) => {
		this.props.setStartDate(startDate);
		this.props.setEndDate(endDate);
	};
	onFocusChange = calendarFocused => {
		console.log(calendarFocused);
		this.setState(() => ({ calendarFocused }));
	};
	onTextChange = e => {
		console.log(e);
		this.props.setTextFilter({ text: e.target.value });
		// console.log(e.target.value);
		/* the 'dispatch' prop is available here because it gets passed down anyway,
it's not explicitly passed down by us but by the 'connect' component
*/
	};
	onSortChange = e => {
		// console.log(e.target.value);
		e.target.value == 'date' ? this.props.sortByDate() : this.props.sortByAmount();
	};
	render() {
		return (
			<div className="content-container">
				<div className="input-group">
					<div className="input-group__item">
						{/* Text filter */}
						<input
							className="text-input"
							placeholder="Search Expenses"
							type="text"
							value={this.props.filters.text}
							onChange={this.onTextChange}
						/>
						{/* 
						The 'onChange' attribute above is needed to define the input readability type because we constantly 
						change the value of the input (try removing it and typing inside the input to see the effect)
						*/}
					</div>
					<div className="input-group__item">
						{/* Select Filter Type */}
						<select
							className="select"
							value={this.props.filters.sortBy}
							/****
							* Why do we add the value attribute?
							* If you don't add it, you end up with that's called an uncontrolled component:
								https://reactjs.org/docs/uncontrolled-components.html
								Basically the DOM becomes the source of truth rather than React which is not what we want.
								This way the default value is controlled by React.
							*/
							onChange={this.onSortChange}
						>
							<option value="date">Date</option>
							<option value="amount">Amount</option>
						</select>
					</div>
					<div className="input-group__item">
						{/* Date Picker */}
						<DateRangePicker
							startDate={this.props.filters.startDate} // momentPropTypes.momentObj or null,
							startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
							endDate={this.props.filters.endDate} // momentPropTypes.momentObj or null,
							endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
							onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
							focusedInput={this.state.calendarFocused} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
							onFocusChange={this.onFocusChange} // PropTypes.func.isRequired,
							numberOfMonths={1}
							isOutsideRange={() => false}
							showClearDates={true}
						/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStatetoProps = state => {
	return {
		filters: state.filters
	};
};

const mapDispatchToProps = dispatch => ({
	setTextFilter: text => dispatch(setTextFilter(text)),
	sortByDate: () => dispatch(sortByDate()),
	sortByAmount: () => dispatch(sortByAmount()),
	setStartDate: startDate => dispatch(setStartDate(startDate)),
	setEndDate: endDate => dispatch(setEndDate(endDate))
});
export default connect(mapStatetoProps, mapDispatchToProps)(ExpenseListFilters);
