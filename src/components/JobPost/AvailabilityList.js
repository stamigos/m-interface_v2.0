import React from 'react'

export default class AvailabilityList extends React.Component {
	render() {
		return (
			<ul className="availability-list">
				<li className="availability-list-item">
					<h2 className="day">MO</h2>
					<input type="checkbox" name="WeekDays" className="week-days" id="DayMonday" value="Monday" />
					<label className="week-days" htmlFor="DayMonday"></label>
				</li>
				<li className="availability-list-item">
					<h2 className="day">DIE</h2>
					<input type="checkbox" name="WeekDays" className="week-days" id="DayTuesday" value="Tuesday" />
					<label className="week-days" htmlFor="DayTuesday"></label>
				</li>
				<li className="availability-list-item">
					<h2 className="day">MI</h2>
					<input type="checkbox" name="WeekDays" className="week-days" id="DayWednesday" value="Wednesday" />
					<label className="week-days" htmlFor="DayWednesday"></label>
				</li>
				<li className="availability-list-item">
					<h2 className="day">DO</h2>
					<input type="checkbox" name="WeekDays" className="week-days" id="DayThursday" value="Thursday" />
					<label className="week-days" htmlFor="DayThursday"></label>
				</li>
				<li className="availability-list-item">
					<h2 className="day">FR</h2>
					<input type="checkbox" name="WeekDays" className="week-days" id="DayFriday" value="Friday" />
					<label className="week-days" htmlFor="DayFriday"></label>
				</li>
				<li className="availability-list-item">
					<h2 className="day">SA</h2>
					<input type="checkbox" name="WeekDays" className="week-days" id="DaySaturday" value="Saturday" />
					<label className="week-days" htmlFor="DaySaturday"></label>
				</li>
				<li className="availability-list-item">
					<h2 className="day">SO</h2>
					<input type="checkbox" name="WeekDays" className="week-days" id="DaySunday" value="Sunday" />
					<label className="week-days" htmlFor="DaySunday"></label>
				</li>
			</ul>
		);
	}
}