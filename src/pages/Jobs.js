import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import List from 'react-list-select'

import FilterDropdown from '../components/FilterDropdown'
import VacancyVideo from '../components/VacancyVideo'

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

var jobsReceived = [];

class JobItem extends React.Component {
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
// const items = [
// 		<div>
// 	      <h2 className="title">Hello world!</h2>
// 	      <h2 className="company">ECOVIS AG</h2>
// 	      <h2 className="location"><i className="fa fa-map-marker" aria-hidden="true"></i>Rostock, Germany</h2>
// 		</div>,
// 		<div>
//           <h2 className="title">Hello world!</h2>
// 	      <h2 className="company">ECOVIS AG</h2>
// 	      <h2 className="location"><i className="fa fa-map-marker" aria-hidden="true"></i>Rostock, Germany</h2>
// 	    </div>
// 	]
class JobsList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			jobsCount: 0,
			jobs: []
		}
		this.filter_jobs = this.filter_jobs.bind(this);
	}
	componentWillReceiveProps(nextProps) {
	    this.filter_jobs(nextProps)
	}
	componentDidMount() {
		this.filter_jobs()
	}
	filter_jobs() {
		var self = this;

		if (jobsReceived.length > 0) {
			var list = []
			jobsReceived.map(function(job, i) {
				if (vacancyStatus(job) == self.props.status) {
					list.push(<JobItem job={job} />)
				}
			})
				this.setState({
					jobs: list,
					jobsCount: list.length
				})

			}
	}
	render() {
		return (
			<div>
				<h2 className="jobs-counter">{this.state.jobsCount} <b>JOBS</b> {this.props.statusTitle}</h2>
                    <div className="jobs-container-wrapper">
                        <div className="jobs-container">
                        	<List items={this.state.jobs}
								  selected={[0]}
								  multiple={false} />
                      	</div>
                    </div>
            </div>
		);
	}
}

export default class Jobs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			jobs: []
		};
		this.getJobs = this.getJobs.bind(this);
		this.getJobs();
	}
	componentDidMount(){
		this.getJobs();
	}

	getJobs() {
		var self = this;
		var headers = new Headers();
		headers.append("Authorization", "Token " + localStorage.token);
		var request = new Request(
			'http://dev.jobufo.com/api/v1/management/vacancy/?limit=100',
			{
				method: "GET",
				headers: headers
			})
		fetch(request)
				.then(function(r) {
					return r.json();
				})
				.then(function(objects) {
				    jobsReceived = objects;
					self.setState({
						jobsCount: objects.length,
						jobs: JSON.stringify(objects)
					})
		})
	}
	render() {
	    return (
	    	<div>
	      	<div className="content-wrapper">
	      		<div className="content">
					<Tabs selectedIndex={0}>
				        {}
				        <TabList>
				          {}
				          <Tab>offentlich</Tab>
				          <Tab>vorbereitet</Tab>
				          <Tab>geschlossen</Tab>
				        </TabList>

				        {}

				        <TabPanel>
	  				          <div>
						          <FilterDropdown />
						         <JobsList status="posted" statusTitle="ÖFFENTLICH"/>
					         </div>
				        </TabPanel>
				        <TabPanel>
    				          <div>
						          <FilterDropdown />
						         <JobsList status="scheduled" statusTitle="VORBEREITET"/>
					         </div>
				        </TabPanel>
				        <TabPanel>
    				          <div>
						          <FilterDropdown />
						         <JobsList status="closed" statusTitle="GESCHLOSSEN" />
					         </div>
				        </TabPanel>
				      </Tabs>

		        </div>
	        </div>

	        <div className="job-detail-wrapper">
	        	<div className="job-detail">
	        		<h1 className="title">Hello World!</h1>
		        	<div className="stats">
		        		<div className="salary">123</div>
		        		<div className="time">FULL_TIME</div>
		        		<div className="benefits">123</div>
		        		<div className="benefits">123</div>
	        		</div>
	        		<h2 className="company">ECOVIS AG</h2>
	        		<h2 className="location"><i className="fa fa-map-marker" aria-hidden="true"></i> Rostock, Germany</h2>
	        		<i className="fa fa-check-circle-o active-icon" aria-hidden="true"></i>
	        		<h2 className="status">Öffentlich seit 01.09.2016</h2>
	        		<div className="job-messages">
	        			<Tabs onSelect={this.handleSelect} selectedIndex={2}>
	        				{}
	        				<TabList>
	        					{}
	        					<Tab>
	        						<h2 className="new_applicant">00</h2>
	        						<h3>Bewerbungen</h3>
        						</Tab>
	        					<Tab>
	        						<h2>00</h2>
	        						<h3>Eingeladen</h3>
	        					</Tab>
	        					<Tab>
	        						<h2>00</h2>
	        						<h3>Abgelehnt</h3>
	        					</Tab>
        					</TabList>
        					{}
					        <TabPanel>
					        		<VacancyVideo />
					        </TabPanel>
					        <TabPanel>
					          <h2>Hello from Bar</h2>
					        </TabPanel>
					        <TabPanel>
					          <h2>Hello from Baz</h2>
					        </TabPanel>
	        			</Tabs>
	        		</div>
	        	</div>
	        </div>
	      </div>
	    );
  }
}