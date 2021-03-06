import React from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { default as Video, Controls, Play, Mute, Seek, Fullscreen, Time, Overlay } from 'react-html5video';
import VideoButton from '../components/VideoButton'
import AcceptMessageModal from '../components/AcceptMessageModal'
import RejectMessageModal from '../components/RejectMessageModal'


function getMonth(date) {
	var str = '';
		switch(date){
			case '01':
				str = 'Jan ';
				break;
			case '02':
				str = 'Feb ';
				break;
			case '03':
				str = 'Mar ';
				break;
			case '04':
				str = 'Apr ';
				break;
			case '05':
				str = 'May ';
				break;
			case '06':
				str = 'Jun ';
				break;
			case '07':
				str = 'Jul ';
				break;
			case '08':
				str = 'Aug ';
				break;
			case '09':
				str = 'Sep ';
				break;
			case '10':
				str = 'Oct ';
				break;
			case '11':
				str = 'Nov ';
				break;
			case '12':
				str = 'Dec ';
				break;
		}
		return str;
}
function applicationPeriod(start_date, end_date){
		var str = '';
		var start_date_sp = start_date.split('-');
		var end_date_sp = start_date.split('-');
		str += getMonth(start_date_sp[1]);
		str += start_date_sp[0] + ' - ';
		if(end_date == null){
			str += 'Heute ';
		}
		else{
			str += getMonth(end_date_sp[1])
			str += end_date_sp[0];
		}
		return str;
}

class DescriptionItem extends React.Component {
	render() {
		return (
      			<div className="list-item">
      				<div className="title-wrapper">
      					<div className={this.props.type=="job_list" ? ("point point-green"):("point point-red")}></div>
      					<h2 className="period">{applicationPeriod(this.props.application.begin_date, this.props.application.end_date)}</h2>
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
		super(props);
		this.state = {
		   isShowingModal: false,
		   isShowingMessageModal: false,
		   isShowingRejectMessageModal: false,
		   application: null, 
		   fullApplication: null
		}
		this.handleClose = this.handleClose.bind(this);
		this.getFullApplication = this.getFullApplication.bind(this);
		this.getDescriptionListHtml = this.getDescriptionListHtml.bind(this);
		this.checkMessages = this.checkMessages.bind(this);
		this.acceptApplication = this.acceptApplication.bind(this);
	}
    checkMessages(application) {
        var html_message = null;
        if(application.status == "DECLINED" || application.status == "CONTACTED"){
          // var current_user  = $('#logged_in-user-name h2').text();
          // var recruiter     = application.message.recruiter.first_name + ' ' + application.message.recruiter.last_name;
          // var name = (current_user == recruiter) ? 'You' : recruiter;

          var full_time     = application.message.created;
          var full_time_sp  = full_time.split('T');
          var date      = full_time_sp[0].split('-');
          var time_sp     = full_time_sp[1].split('.');
          var time      = time_sp[0].split(':');
          var message = "";
          // $('#applicant_id_' + application.pk + ' .button-cv').addClass('disabled');
          if(application.status == "CONTACTED"){
            message = 'accepted this application on the ' + date[2] + '.' + date[1] + '.' + date[0] + ' at ' + time[0] + ':' + time[1] + ' oclock.'
            html_message = <h3 className="info-message">{message}</h3>;
          }
          // Click <a class="info_link">here</a> to check the message you sent to the applicant
          //  Click <a className="info_link">here</a> to check the message you sent to the applicant
          if(application.status == "DECLINED"){
            message = 'rejected this application on the ' + date[2] + '.' + date[1] + '.' + date[0] + ' at ' + time[0] + ':' + time[1] + ' oclock.'
            html_message = <h3 className="info-message">{message}</h3>;
          }
        }
        return html_message
    }
	componentWillReceiveProps(nextProps) {
		this.setState({
			isShowingModal: nextProps.isShowingModal,
			application: nextProps.application
		})
		this.getFullApplication(nextProps.application.api_url);
	}
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
	acceptApplication() {
		this.setState({
			isShowingMessageModal: true
		})
	}
	rejectApplication() {
		this.setState({
			isShowingRejectMessageModal: true
		})
	}
	handleCloseMessageModal() {
		this.setState({
			isShowingMessageModal: false
		})
	}
	handleCloseRejectMessageModal() {
		this.setState({
			isShowingRejectMessageModal: false
		})
	}
	render() {
		var message = null;
		if (this.state.fullApplication) {
			message = this.checkMessages(this.state.fullApplication);
		}
		console.log("full applciation in modal:", this.state.fullApplication)
		console.log("applciation in modal:", this.state.application)

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
		            		{message ? message : null}
		            		{!message ? (
			            		<div className="info-buttons">
			            			<a onClick={this.acceptApplication.bind(this)} className="accept">Bestätigen</a>
			            			<a onClick={this.rejectApplication.bind(this)} className="reject">Absagen</a>
			            			<AcceptMessageModal application={this.state.application} full_application={this.state.fullApplication} isShowingModal={this.state.isShowingMessageModal} close={this.handleCloseMessageModal.bind(this)} first_name={this.state.application.owner.first_name} last_name={this.state.application.owner.last_name} />
			            			<RejectMessageModal application={this.state.application} isShowingModal={this.state.isShowingRejectMessageModal} close={this.handleCloseRejectMessageModal.bind(this)} />
			            		</div>
	            			) : (
			            		<div className="info-buttons">
			            			<a className="accept disabled">Bestätigen</a>
			            			<a className="reject disabled">Absagen</a>
			            		</div>
		            		)}
		            	</div>
		            </div>
		            <div className="modal-applicant-video">
        	          <Video controls>
			              <Controls>
			                  <VideoButton type="play"/>
			                  <VideoButton type="stop"/>
			              </Controls>
			              <div className="darker"></div>
			              <source src={this.state.application.video} type="video/mp4" />
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
					        	<div className="modal-applicant-profile-more">
					        		<div className="more_info_wrapper">
					        			<ul className="more_info_list">
                          				 {/* TODO: remove comment, if API supports this 
					        				<li className="more_info_wrapper-item">
					        					<h2 className="title">Verfügbarkeit</h2>
				        						<ul className="availability-list">
				        							<li className="availability-list-item">
			        									<h2 className="day">MO</h2>
			        									<input type="checkbox" name="WeekDays" className="week-days" id="DayMonday" value="Monday" disabled />
			        									<label className="week-days" htmlFor="DayMonday"></label>
    												</li>
													<li className="availability-list-item">
														<h2 className="day">DIE</h2>
														<input type="checkbox" name="WeekDays" className="week-days" id="DayTuesday" value="Tuesday" disabled />
														<label className="week-days" htmlFor="DayTuesday"></label>
													</li>
													<li className="availability-list-item">
														<h2 className="day">MI</h2>
														<input type="checkbox" name="WeekDays" className="week-days" id="DayWednesday" value="Wednesday" disabled />
														<label className="week-days" htmlFor="DayWednesday"></label>
													</li>
													<li className="availability-list-item">
														<h2 className="day">DO</h2>
														<input type="checkbox" name="WeekDays" className="week-days" id="DayThursday" value="Thursday" disabled />
														<label className="week-days" htmlFor="DayThursday"></label>
													</li>
													<li className="availability-list-item">
														<h2 className="day">FR</h2>
														<input type="checkbox" name="WeekDays" className="week-days" id="DayFriday" value="Friday" disabled />
														<label className="week-days" htmlFor="DayFriday"></label>
													</li>
													<li className="availability-list-item">
														<h2 className="day">SA</h2>
														<input type="checkbox" name="WeekDays" className="week-days" id="DaySaturday" value="Saturday" disabled />
														<label className="week-days" htmlFor="DaySaturday"></label>
													</li>
													<li className="availability-list-item">
														<h2 className="day">SO</h2>
														<input type="checkbox" name="WeekDays" className="week-days" id="DaySunday" value="Sunday" disabled />
														<label className="week-days" htmlFor="DaySunday"></label>
													</li>
												</ul>
												<div className="clear"></div>
											</li>
											<li className="more_info_wrapper-item">
												<h2 className="title">Mögliche Einsatzorte</h2>
												<ul className="location-list">
													<li className="location-list-item">
														<i className="fa fa-map-marker" aria-hidden="true"></i> Berlin, Germany
													</li>
													<li className="location-list-item">
														<i className="fa fa-map-marker" aria-hidden="true"></i> Lepzig, Germany
													</li>
													<li className="location-list-item">
														<i className="fa fa-map-marker" aria-hidden="true"></i> London, England
													</li> 
												</ul>
											</li>
											<li className="more_info_wrapper-item">
												<h2 className="title">Branchen</h2>
												<span className="more-info-point">Retail</span>
												<span className="more-info-point">Hosmitality</span>
												<span className="more-info-point">Retail</span>
											</li>
											<li className="more_info_wrapper-item">
												<h2 className="title">Interessiert an:</h2>
												<span className="more-info-point">Part-time</span>
												<span className="more-info-point">Temporary</span>
											</li> */}
										</ul>
									</div>
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