import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

//Stores
import JobStore from '../store/JobStore';

//Mixin
import mixins from 'es6-mixins';
import BackboneMixin from '../mixin/BackboneMixin';

import VacancyVideoList from '../components/VacancyVideoList'

function formatDate(pubDate) {
	if (pubDate){
		var publicationDate = pubDate.split("-");
		return publicationDate[2] + "." + publicationDate[1] + "." + publicationDate[0]
	}
	else {
		return ""
	}
}
function applicationStatus(application){
    if(application.status == "DECLINED")
      return 'rejected';
    if(application.status == "CONTACTED")
      return 'accepted';
    return 'applied';
}
function applicationsCount(applications, status) {
	var list = []
	applications.map(function(application) {
		if (applicationStatus(application) == status) {
			list.push(application)
		}
	});
	return ((list.length/2) >= 5) ? (String(list.length)) : ('0'+String(list.length))
}

export default class JobDetails extends React.Component {
	constructor(props) {
		super(props)
		mixins(BackboneMixin,this);
	}
	// componentWillReceiveProps(nextProps, nextState) {
	// 	console.log("componentWillReceiveProps")
	// }

	render() {
		var model = this.props.model;
		var job = model.get("selectedJob");
		console.log("applicationList:", job.application_list)
		// if (model.get("selectedJobPassed")) {
		// 	job = model.get("posted")[0];
		// }
		return (
	        <div className="job-detail-wrapper">
	        	<div className="job-detail">
	        		<h1 className="title">{job.title}</h1>
		        	<div className="stats">
		        		<div className={job.payment ? ("salary"):("")}>{job.payment}</div>
		        		<div className={job.kind ? ("time"):("")}>{job.kind}</div>
		        		<div className={job.benefit_1 ? ("benefits"):("")}>{job.benefit_1}</div>
		        		<div className={job.benefit_2 ? ("benefits"):("")}>{job.benefit_2}</div>
	        		</div>
	        		<h2 className="company">{job.company.name}</h2>
	        		<h2 className="location"><i className="fa fa-map-marker" aria-hidden="true"></i> {job.address.city.name}</h2>
	        		<i className="fa fa-check-circle-o active-icon" aria-hidden="true"></i>
	        		<h2 className="status">Öffentlich seit {formatDate(job.publication_date)}</h2>
	        		<div className="job-messages">
	        			<Tabs onSelect={this.handleSelect} selectedIndex={0}>
	        				{}
	        				<TabList>
	        					{}
	        					<Tab>
	        						<h2 className="new_applicant">{applicationsCount(job.application_list, "applied")}</h2>
	        						<h3>Bewerbungen</h3>
        						</Tab>
	        					<Tab>
	        						<h2>{applicationsCount(job.application_list, "accepted")}</h2>
	        						<h3>Eingeladen</h3>
	        					</Tab>
	        					<Tab>
	        						<h2>{applicationsCount(job.application_list, "rejected")}</h2>
	        						<h3>Abgelehnt</h3>
	        					</Tab>
        					</TabList>
        					{}
					        <TabPanel>
					        		<VacancyVideoList applicationList={job.application_list} applicationStatus="applied" />
					        </TabPanel>
					        <TabPanel>
					        		<VacancyVideoList applicationList={job.application_list} applicationStatus="accepted" />
					        </TabPanel>
					        <TabPanel>
					        		<VacancyVideoList applicationList={job.application_list} applicationStatus="rejected" />
					        </TabPanel>
	        			</Tabs>
	        		</div>
	        	</div>
	        </div>
		)
	}
}