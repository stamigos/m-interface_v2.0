import React from 'react';

//Stores
import JobStore from '../store/JobStore';

//Mixin
import mixins from 'es6-mixins';
import BackboneMixin from '../mixin/BackboneMixin';


//Actions
import AppActions from '../actions/AppActions';

import List from 'react-list-select'

function addDays(publication_date, days) {
		var newdate = new Date(publication_date);
		newdate.setDate(publication_date.getDate() + days);
		return newdate;
	}
function vacancyStatus(vacancy){
		var publication_date = new Date(vacancy.publication_date);
		var start_date 		 = new Date(vacancy.vacancy_start);
		var publication_end  = addDays(publication_date, vacancy.publication_duration);
		var today 			 = new Date();
		if (publication_end < today || vacancy.is_active == false)
			return 'closed';
		else if (publication_date <= today)
			return 'posted';
		else if (publication_date > start_date && publication_date > today)
			return 'scheduled';
};

class JobListItem extends React.Component {
	render() {
		return (
			<div key={this.props.key}>
		      <h2 className="title">{this.props.job.title}</h2>
		      <h2 className="company">{this.props.job.company.name}</h2>
		      <h2 className="location"><i className="fa fa-map-marker" aria-hidden="true"></i>{this.props.job.address.city.name}</h2>
			</div>
		);
	}
}

var posted = []
var scheduled = []
var closed = []
var selectedIndex = 0;

export default class JobsList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			jobsCount: 0,
			jobs: [],
			rawJobs: []
		}
		mixins(BackboneMixin,this);

		this.filterJobs = this.filterJobs.bind(this);
	}
	filterJobs(model) {
		var self = this;
		var htmlList = []
			model.get("jobs").map(function(job, i) {
				if (vacancyStatus(job) == self.props.status) {
					htmlList.push(<JobListItem job={job} />)
					if (self.props.status == "posted"){
						posted.push(job)
					}
					if (self.props.status == "scheduled") {
						scheduled.push(job)
					}
					if (self.props.status == "closed") {
						closed.push(job)
					}
				}
			})
		return htmlList
	}
	onJobSelect(selected){
		selectedIndex = selected
		if (this.props.status == "posted") {
			AppActions.getSelectedJob(posted[selected]);
		}
		if (this.props.status == "scheduled") {
			AppActions.getSelectedJob(scheduled[selected]);
		}
		if (this.props.status == "closed") {
			AppActions.getSelectedJob(closed[selected]);
		}
	}
	render() {
		var model = this.props.model;
		var jobs = this.filterJobs(model);
		if (model.get("loading")){
			return <div></div>
		}
		else {
			return (
				<div>
					<h2 className="jobs-counter">{jobs.length} <b>JOBS</b> {this.props.statusTitle}</h2>
	                    <div className="jobs-container-wrapper">
	                        <div className="jobs-container">
	                        	<List items={jobs}
	                        		  selected={[selectedIndex]}
									  multiple={false}
									  onChange={this.onJobSelect.bind(this)}/>;
	                      	</div>
	                    </div>
	            </div>
			);
		}
	}
}

