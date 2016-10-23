import React from 'react';
import GeminiScrollbar from 'react-gemini-scrollbar'

//Stores
import JobStore from '../store/JobStore';

//Mixin
import mixins from 'es6-mixins';
import BackboneMixin from '../mixin/BackboneMixin';

//Actions
import AppActions from '../actions/AppActions';
import List from 'react-list-select'
import FilterDropdown from './FilterDropdown'


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
			<div>
		      <h2 className="title">{this.props.job.title}</h2>
		      <h2 className="company">{this.props.job.company.name}</h2>
		      <h2 className="location"><i className="fa fa-map-marker" aria-hidden="true"></i>{this.props.job.address.city.name}</h2>
		      {this.props.job.top_job ? <img className="top-job-star" src={require('../img/star.png')} /> : null}
			</div>
		);
	}
}

var posted = []
var scheduled = []
var closed = []

export default class JobsList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			jobsCount: 0,
			jobs: [],
			rawJobs: [],
			selectedIndex: 0,
			filters: {
				subsidiary: null,
				city: null,
				kind: null
			}
		}
		mixins(BackboneMixin,this);

		this.filterJobs = this.filterJobs.bind(this);
	}
	filterJobs(model, filters) {
		var subsidiary = filters.subsidiary;
		var city = filters.city;
		var kind = filters.kind;
		var self = this;
		var htmlList = []
			model.get("jobs").map(function(job, i) {
				if (vacancyStatus(job) == self.props.status) {
					// conditions for filtering data
					console.log(subsidiary);
					console.log(job.company.subsidiary.name)
					var subsidiaryCond = !!subsidiary ? (subsidiary == job.company.subsidiary.pk) : true;
					var cityCond = !!city ? (city == job.address.city.name) : true;
					var kindCond = !!kind ? (kind == job.kind) : true;
					var filtersCondition = subsidiaryCond && cityCond && kindCond;

					if (filtersCondition) {
						htmlList.push(<JobListItem key={i} job={job} />)
					}

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
	getFilters(filters) {
		console.log("getFilters:", filters)
		var filtersReceived = this.state.filters;
		if (filters.subsidiary && (filters.subsidiary != "")) {
			filtersReceived.subsidiary = filters.subsidiary.pk
		}
		else {
			filtersReceived.subsidiary = filters.subsidiary
		}
		if (filters.city && (filters.city != "")) {
			filtersReceived.city = filters.city.name;
		}
		else {
			filtersReceived.city = filters.city
		}
		if (filters.kind && (filters.kind != "")) {
			filtersReceived.kind = filters.kind;
		} else {
			filtersReceived.kind = filters.kind
		}
		this.setState({
			filters: filtersReceived
		})
	}
	onJobSelect(selected){
		if (this.props.status == "posted") {
			AppActions.getSelectedJob(posted[selected]);
		}
		if (this.props.status == "scheduled") {
			AppActions.getSelectedJob(scheduled[selected]);
		}
		if (this.props.status == "closed") {
			AppActions.getSelectedJob(closed[selected]);
		}
		this.setState({
			selectedIndex: selected
		})
		this.props.openVacancyDetail();
	}
	render() {
		var model = this.props.model;
		if (model.get("loading")){
			return <div></div>
		}
		else {
			if (JobStore.get('jobs')[0] == null) {
				return (<div>
							<h2 className="jobs-counter">0 <b>JOBS</b> {this.props.statusTitle}</h2>
		                    <div className="jobs-container-wrapper">
	                        	<div className="jobs-container">
	                        		<List items={[]} />
	                        	</div>
                        	</div>
						</div>);
			} else {
				console.log("filters in render:", this.state.filters)
				var jobs = this.filterJobs(model, this.state.filters);
				return (
					<div>
						<FilterDropdown getFilters={this.getFilters.bind(this)} />
						<h2 className="jobs-counter">{jobs.length} <b>JOBS</b> {this.props.statusTitle}</h2>
						<div>
							<GeminiScrollbar className="jobs-container">
		                        	<List items={jobs}
		                        		  selected={[this.state.selectedIndex]}
										  multiple={false}
										  onChange={this.onJobSelect.bind(this)}/>
					        </GeminiScrollbar>
				        </div>
		            </div>
				);
			}
		}
	}
}

