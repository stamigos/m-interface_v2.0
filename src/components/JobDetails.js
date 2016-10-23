import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import ReactSpinner from 'react-spinjs'

//Stores
import JobStore from '../store/JobStore'

//Mixin
import mixins from 'es6-mixins'
import BackboneMixin from '../mixin/BackboneMixin'

import CloseJobModal from '../components/CloseJobModal'
import JobDetailPreview from '../components/JobDetailPreview'
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
		super(props);
		this.state = {
			isShowingModal: false
		}
		mixins(BackboneMixin,this);
	}
	// componentWillReceiveProps(nextProps, nextState) {
	// 	console.log("componentWillReceiveProps")
	// }
	onCloseJob() {
		this.setState({
			isShowingModal: true
		})
	}
	onPreviewOpen() {
		this.setState({
			isShowingPreview: true
		})
	}
	cancel() {
		this.setState({
			isShowingModal: false
		})
	}
	cancelPreview() {
		this.setState({
			isShowingPreview: false
		})
	}
	onEditOpen() {
		this.props.openVacancyEdit();
	}
	render() {
		var model = this.props.model;
		var job = model.get("selectedJob");
		console.log("selected job:", job)
		return (
	        <div className="job-detail-wrapper">
	        	{JobStore.get("loading") ? <ReactSpinner/> :
		        	(job ? (<div className="job-detail">
		        		<h1 className="title">{job.title}</h1>
			        	<div className="stats">
			        		<div className={job.payment ? ("salary"):("")}>{job.payment}</div>
			        		<div className={job.kind ? ("time"):("")}>{job.kind}</div>
			        		<div className={job.benefit_1 ? ("benefits"):("")}>{job.benefit_1}</div>
			        		<div className={job.benefit_2 ? ("benefits"):("")}>{job.benefit_2}</div>
		        		</div>
		        		<div className="message-header-buttons">
		        			<a className="mobile_preview" href="#">
		        				<i onClick={this.onPreviewOpen.bind(this)} className="fa fa-mobile" aria-hidden="true"></i>
		        				<JobDetailPreview show={this.state.isShowingPreview} job={job} cancel={this.cancelPreview.bind(this)} close={this.cancelPreview.bind(this)}/>
	        				</a>
	        				<a href="#">
	        					<i className="fa fa-share-alt" aria-hidden="true"></i>
        					</a>
        					<a className="edit_vacancy">
        						<i onClick={this.onEditOpen.bind(this)} className="fa fa-pencil" aria-hidden="true"></i>
    						</a>
							<a className="close_job">
								<i onClick={this.onCloseJob.bind(this)} className="fa fa-times" aria-hidden="true"></i>
								<CloseJobModal show={this.state.isShowingModal} updateList={this.props.updateList} selectedJob={this.props.model.get("selectedJob")} cancel={this.cancel.bind(this)} />
							</a>
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
		        	</div>):(null))}
	        </div>
		)
	}
}