import React from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { default as Video, Controls, Play, Mute, Seek, Fullscreen, Time, Overlay } from 'react-html5video';
import VideoButton from '../components/VideoButton'

class DescriptionItem extends React.Component {
	render() {
		return (
      			<div className="list-item">
      				<div className="title-wrapper">
      					<div className={this.props.type=="job_list" ? ("point point-green"):("point point-red")}></div>
      					<h2 className="period">{this.props.application.begin_date} – {this.props.application.end_date}</h2>
      				</div>
      				<div className="line-wrapper line-first">
      					<div className="line"></div>
      				</div> 
      			</div>
		);
	}
};

export default class ModalProfile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		   isShowingModal: false,
		   application: null, 
		   fullApplication: null
		}
		// this.handleClick = this.handleClick.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.getFullApplication = this.getFullApplication.bind(this);
		this.getDescriptionListHtml = this.getDescriptionListHtml.bind(this);

	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			isShowingModal: nextProps.isShowingModal,
			application: nextProps.application
		})
		this.getFullApplication(nextProps.application.api_url);
	}
	// handleClick() {
	// 	this.setState({isShowingModal: true})
	// }
	handleClose() {
		this.setState({isShowingModal: false})
	}
	getFullApplication(api_url) {
		var self = this;
		var headers = new Headers();
		headers.append("Authorization", "Token " + localStorage.token);
		var request = new Request(
			api_url,
			{
				method: "GET",
				headers: headers
			})
		fetch(request)
				.then(function(r) {
					return r.json();
				})
				.then(function(object) {
					console.log("received full app:", object)
					self.setState({
						fullApplication: object
					})
				})
	}
	getDescriptionListHtml(type) {
		var resultList = []
		var application = this.state.fullApplication;
		if (type == "job_list") {
			var descList = application ? (application.job_list):(false);
		}
		if (type ==  "education_list") {
			var descList = application ? (application.education_list):(false);
		}
		if (descList){
			descList.map(function(application, i){
				resultList.push(<DescriptionItem application={application} type={type} key={i} />)
			})
			return resultList;
		}
		else {
			return <div></div>
		}
		
	}
	render() {
		// console.log("app:", this.state.application)
		// if (this.state.application){
		// 	this.getFullApplication(this.state.application.api_url)
		// }
		return (
			<div>
		      {
		        this.state.isShowingModal &&
		        <ModalContainer onClose={this.handleClose}>
		          <ModalDialog onClose={this.handleClose}>
		            <div className="modal-applicant-info">
		            	<div className="modal-applicant-info-wrapper">
		            		<h1 className="title">Hallo!<br/>Ich bin {this.state.application.owner.first_name}.</h1>
		            		<h2 className="location"></h2>
		            		<div className="info-buttons">
		            			<a className="accept">Bestätigen</a>
		            			<a className="reject">Absagen</a>
		            		</div>
		            	</div>
		            </div>
		            <div className="modal-applicant-video">
        	          <Video controls>
			              <Controls>
			                  <VideoButton type="play"/>
			                  <VideoButton type="stop"/>
			              </Controls>
			              <source src={this.state.application.video} type="video/mp4" />
			              <Overlay />
			          </Video>
		            </div>
		            <div className="modal-tabs-wrapper">
						<Tabs selectedIndex={0}>
					        {}
					        <TabList>
					          {}
					          <Tab>PROFIL</Tab>
					          <Tab>MEHR INFORMATIONEN</Tab>
					          <Tab>MESSAGES</Tab>
					        </TabList>

					        {}

					        <TabPanel>
		  				        <div className="modal-applicant-profile">
		  				          	<div className="col">
		  				          		<div className="icon-green">
		  				          			<i className="fa fa-briefcase" aria-hidden="true"></i>
	  				          			</div>
		  				          		<h1>PRAXISERFAHRUNG</h1>
		  				          		<div className="description-list-wrapper">
			          		      			<div className="list-item">
							      				<div className="title-wrapper">
							      					<h2 className="period"></h2>
							      				</div>
							      				<div className="line-wrapper line-first">
							      					<div className="line"></div>
							      				</div> 
							      			</div>
		  				          			{this.getDescriptionListHtml("job_list")}
		  				          		</div>
		  				          	</div>
		  				          	<div className="col">
		  				          		<div className="icon-red">
											<i className="fa fa-graduation-cap" aria-hidden="true"></i>
	  				          			</div>
		  				          		<h1>BILDUNGSWEG</h1>
		  				          		<div className="description-list-wrapper">
			          		      			<div className="list-item">
							      				<div className="title-wrapper">
							      					<h2 className="period"></h2>
							      				</div>
							      				<div className="line-wrapper line-first">
							      					<div className="line"></div>
							      				</div> 
							      			</div>
		  				          		{this.getDescriptionListHtml("education_list")}
		  				          		</div>
		  				          	</div>
						        </div>
					        </TabPanel>
					        <TabPanel>
	    				          <div>

						         </div>
					        </TabPanel>
					        <TabPanel>
	    				          <div>

						         </div>
					        </TabPanel>
					      </Tabs>
				    </div>
		          </ModalDialog>
		        </ModalContainer>
		      }
	        </div>
		);
	}
}