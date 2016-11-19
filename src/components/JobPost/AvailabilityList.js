import React from 'react'

var monday = false, 
	tuesday = false, 
	wednesday = false, 
	thursday = false, 
	friday = false, 
	saturday = false, 
	sunday = false;

function setDays(workdays) {
	var daysArr = workdays.split(',');
	for (var i = 0, n = daysArr.length; i < n; i++) {
		switch(daysArr[i]) {
			case '0':
				monday = true;
				break;
			case '1':
				tuesday = true;
				break;
			case '2':
				wednesday = true;
				break;
			case '3':
				thursday = true;
				break;
			case '4':
				friday = true;
				break;
			case '5':
				saturday = true;
				break;
			case '6':
				sunday = true;
				break;
		}
	}
}

export default class AvailabilityList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			workdays: this.props.workdays || ''
		}
		this.changeWorkdays = this.changeWorkdays.bind(this);
		if (this.state.workdays != '') setDays(this.state.workdays);
	}
	changeWorkdays(event) {
		var day = event.target.value;
		var workdaysArr = [];
		var i = 0;
		switch (day) {
			case '0': 
				monday = !monday;
				break;
			case '1': 
				tuesday = !tuesday;
				break;
			case '2': 
				wednesday = !wednesday;
				break;
			case '3': 
				thursday = !thursday;
				break;
			case '4': 
				friday = !friday;
				break;
			case '5': 
				saturday = !saturday;
				break;
			case '6': 
				sunday = !sunday;
				break;
		}
		if (monday) {workdaysArr[i] = '0'; i++;}
		if (tuesday) {workdaysArr[i] = '1';  i++;}
		if (wednesday) {workdaysArr[i] = '2'; i++;}
		if (thursday) {workdaysArr[i] = '3'; i++;}
		if (friday) {workdaysArr[i] = '4'; i++;}
		if (saturday) {workdaysArr[i] = '5'; i++;}
		if (sunday) {workdaysArr[i] = '6';}
		var workdays = workdaysArr.join(',');
		
		this.props.changeWorkdays(workdays);
	}

	render() {
		return (
			<ul className="availability-list">
				<li className="availability-list-item">
					<h2 className="day">MO</h2>
					<input onChange={this.changeWorkdays} checked={monday} type="checkbox" name="WeekDays" className="week-days" id="DayMonday" value="0" />
					<label className="week-days" htmlFor="DayMonday"></label>
				</li>
				<li className="availability-list-item">
					<h2 className="day">DIE</h2>
					<input onChange={this.changeWorkdays} checked={tuesday} type="checkbox" name="WeekDays" className="week-days" id="DayTuesday" value="1" />
					<label className="week-days" htmlFor="DayTuesday"></label>
				</li>
				<li className="availability-list-item">
					<h2 className="day">MI</h2>
					<input onChange={this.changeWorkdays} checked={wednesday} type="checkbox" name="WeekDays" className="week-days" id="DayWednesday" value="2" />
					<label className="week-days" htmlFor="DayWednesday"></label>
				</li>
				<li className="availability-list-item">
					<h2 className="day">DO</h2>
					<input onChange={this.changeWorkdays} checked={thursday} type="checkbox" name="WeekDays" className="week-days" id="DayThursday" value="3" />
					<label className="week-days" htmlFor="DayThursday"></label>
				</li>
				<li className="availability-list-item">
					<h2 className="day">FR</h2>
					<input onChange={this.changeWorkdays} checked={friday} type="checkbox" name="WeekDays" className="week-days" id="DayFriday" value="4" />
					<label className="week-days" htmlFor="DayFriday"></label>
				</li>
				<li className="availability-list-item">
					<h2 className="day">SA</h2>
					<input onChange={this.changeWorkdays} checked={saturday} type="checkbox" name="WeekDays" className="week-days" id="DaySaturday" value="5" />
					<label className="week-days" htmlFor="DaySaturday"></label>
				</li>
				<li className="availability-list-item">
					<h2 className="day">SO</h2>
					<input onChange={this.changeWorkdays} checked={sunday} type="checkbox" name="WeekDays" className="week-days" id="DaySunday" value="6" />
					<label className="week-days" htmlFor="DaySunday"></label>
				</li>
			</ul>
		);
	}
}