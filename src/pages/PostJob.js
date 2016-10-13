import React from 'react';
import DatePicker from 'react-datepicker'
import TimePicker from 'rc-time-picker';
import moment from 'moment'

// Custom imports
import NormalTopJob from '../components/JobPost/NormalTopJob'
import Benefits from '../components/JobPost/Benefits'
import AvailabilityList from '../components/JobPost/AvailabilityList'
import ModalVideoCrop from '../components/JobPost/ModalVideoCrop'
import LeftModalImageCrop from '../components/JobPost/LeftModalImageCrop'
import RightModalImageCrop from '../components/JobPost/RightModalImageCrop'
import AvatarCropper from "react-avatar-cropper";
import { getMonth, formatCheckFromDate } from '../utils'

import '../react-datepicker.css'
import '../TimePicker.css'


class PostJobContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			scheduleClicked: false,
			dateSchedule: null,
			timeSchedule: null,
			dateFromCheck: null,
			dateToCheck: null,
			isDateFromCheckToday: false
		}
	}
	onScheduleClick() {
		this.setState({scheduleClicked: !this.state.scheduleClicked})
	}
	setTodayDate() {
		if (!this.state.isDateFromCheckToday) {
			var today = new Date();
			this.setState({
				dateFromCheck: moment(formatCheckFromDate(today.toString())),
				isDateFromCheckToday: true
			})
		}
		else {
			this.setState({
				dateFromCheck: null,
				isDateFromCheckToday: false
			})
		}
	}
	handleFromDateChange(date) {
		this.setState({
			dateFromCheck: date
		})
	}
	handleToDateChange(date) {
		this.setState({
			dateToCheck: date
		})		
	}
	handleDateScheduleChange(date) {
		this.setState({
			dateSchedule: date
		})
	}
	onTimeChange(value) {
  		console.log(value);
  		this.setState({
  			timeSchedule: value
  		})
	}
	// onLabelClick() {
	// 	this.setState({
	// 		resetImage: true
	// 	})
	// }

	render() {
		var today = new Date();
		return (
			<div className="job-post-content">
				<div className="post-job-content-header align-center">
					<h1 className="title">Neue Stelle hinzufugen</h1>
					<h2 className="subtitle">Bitte trage unten alle Details ein</h2>
				</div>
				<form action="" method="post" role="form" className="job-post-form" id="job-post-form">
					<div className="form-wrapper">
						<NormalTopJob/>
						<div className="clear"></div>

						<label className="label" htmlFor="Title">Stellenbezeichnung</label>
						<input type="text" className="" name="Title" id="Title" placeholder="Stellenbezeichnung" />
						<div className="clear"></div>

						<label className="label" htmlFor="Location">Einsatzorte</label>
						<div className="Location citySearchSelect" id="Location">
							<input className="field" type="text" placeholder="Einsatzorte" />
							<div className="fields"></div>
						</div>
						<div className="clear"></div>

						<label className="label-big" htmlFor="JobDescription">Stellenbeschreibung</label>
						<textarea name="JobDescription" id="JobDescription" rows="5" data-autoresize ></textarea>
						<div className="clear"></div>

						<ModalVideoCrop />

						<div className="clear"></div>

						<label className="label-big" htmlFor="JobDescription">Bilder des Jobs</label>
						<p className="JobDescAbout">Füge Bilder von der Stelle oder dem Team hinzu. JobUFO’s Bilder sind 1115px X 625px groß.
						Wenn dein Bild zu groß ist, helfen wir dir es hier zuzuschneiden.</p>
						<div className="images">
							<LeftModalImageCrop />
							<RightModalImageCrop />
						</div>

						<ul id="postJobUploadedFilesImage"></ul>
						<div className="clear"></div>
						<select name="JobType" id="Kind" name="Kind" className="default">
							<option value="">Art des Jobs</option>
							<option value="FULL_TIME">Full Time</option>
							<option value="PART_TIME">Part Time</option>
							<option value="INTERN">Intern</option>
							<option value="VOCATIONAL_TRAINING">Vocational Training</option>
							<option value="TEMPORARY">Temporary</option>
						</select>
						<div className="clear"></div>
						<label className="label" htmlFor="WorkingHours">Zeitlicher Arbeitsaufwand</label>
						<input type="text" name="WorkingHours" id="WorkingHours" className="half" />
						<select name="Per" id="Per" className="half right">
							<option value="day">Per day</option>
							<option value="week">Per week</option>
							<option value="month">Per month</option>
						</select>
						<div className="clear"></div>
						<input type="text" name="Salary" id="Salary" className="Salary" placeholder="Bezahlung" />
						<div className="clear"></div>
						
						<Benefits/>

						<div className="half">
							<DatePicker dateFormat="YYYY-MM-DD" 
										className="date datePicker half" 
										placeholderText="Arbeitsbeginn" 
										onChange={this.handleFromDateChange.bind(this)} 
										selected={this.state.dateFromCheck}
										todayButton={'Today'} />
							<input type="checkbox" name="DateFromCheck" id="DateFromCheck" />
							<label onClick={this.setTodayDate.bind(this)} className="label-for-check" htmlFor="DateFromCheck">Sofort</label>
						</div>
						<div className="half right">
							<DatePicker dateFormat="YYYY-MM-DD" 
										className="date datePicker half right" 
										placeholderText="Arbeitsende" 
										onChange={this.handleToDateChange.bind(this)} 
										selected={this.state.dateToCheck}
										todayButton={'Today'} />
							<input type="checkbox" name="DateToCheck" id="DateToCheck" />
							<label className="label-for-check" htmlFor="DateToCheck">Nicht festgelegt</label>
						</div>
						<div className="clear"></div>
						<label className="label-big">mogliche Arbeitstage</label>

						<AvailabilityList />

						<div className="clear"></div>
						<input type="checkbox" name="SheduleJob" id="SheduleJob" />
						<label onClick={this.onScheduleClick.bind(this)} className="label-for-check label-big" htmlFor="SheduleJob">Job erst veröffentlichen am:</label>
						<div className="clear"></div>
						<div id="Schedule" className={this.state.scheduleClicked ? ("expanded"):("")}>
							<div className="half">
									<DatePicker dateFormat="YYYY-MM-DD" 
										className="date datePicker half" 
										onChange={this.handleDateScheduleChange.bind(this)} 
										selected={this.state.dateSchedule}
										todayButton={'Today'} />
							</div>
							<div className="half right">
							  <TimePicker
								    style={{ width: 100 }}
								    showSecond={false}
								    placeholder="Time"
								    className="timePicker half right"
								    onChange={this.onTimeChange.bind(this)}/>
							</div>
						</div>
						<div className="clear"></div>
					</div>
					<div className="buttons">
						<div className="form-wrapper">
							<a href="#" id="preview_job_popup-button" className="button-cv button-cv-full-red ">Anzeige uberprüfen</a>
							<a href="#" className="button-cv button-cv-transperent clear_form">Abbrechen</a>
						</div>
					</div>
				</form>
			</div>
		);
	}
}
			
export default class PostJob extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div id="post_job" className="company-wrapper">
				<PostJobContent />
			</div>
		);
	}
}
// <div id="preview_job_popup" className="popup">
// 						<div className="popup-window">
// 							<div className="popup-header align-center">
// 								<h2 className="popup-title">Anzeige uberprufen</h2>
// 								<h3 id="preview_job_popup-subtitle" className="popup-subtitle"></h3>
// 							</div>
// 							<div className="popup-content align-center">

// 								<div className="slide">
// 									<div className="item selected"></div>
// 									<div className="item"></div>
// 								</div>

// 								<div className="preview_job-wrapper">

// 									<div className="preview-job-content-wrapper">
// 										<div className="slider_preview_job">
// 										<div className="wrapper_one wr">
// 											<img src="img/iphone-header.png" alt="" className="iphone_header" />
// 											<div id="preview_job-body">
// 												<div className="preview-job-img-slider"></div>
// 												<div id="preview-job-body" className="preview-job-body align-left"></div>
// 												<div className="job-preview-footer">
// 													<h2 className="job-preview-footer-title">BEWERBEN</h2>
// 												</div>
// 											</div>
// 										</div>

// 										<div className="wrapper_two wr preview_job_all">
// 											<img src="img/phone_top_2.jpg" alt="" className="iphone_header" />
// 											<div id="preview_job-body_2">
// 												<div className="box" id="box_edit">
// 													<div className="info">
// 														<div className="name">NAME</div>
// 														<div className="company">COMPANY</div>
// 														<div className="place">PLACE</div>
// 														<div className="avatar">
// 															<img src="img/video.jpg" />
// 														</div>
// 													</div>

// 													<div className="image">
// 														<div className="benefs">
// 															<div className="benefit_1 ben">BENEFIT</div>
// 															<div className="benefit_2 ben">BENEFIT</div>
// 														</div>
// 													</div>
// 												</div>

// 												<div className="box">
// 													<div className="info">
// 														<div className="name">Android Developer</div>
// 														<div className="company">JobUFO - Team</div>
// 														<div className="place">Germany - Berlin</div>
// 														<div className="avatar">
// 															<img src="img/video.jpg" />
// 														</div>
// 													</div>

// 													<div className="image" style={{backgroundImage: require('../img/android.jpg')}}>
// 														<div className="benefs">
// 															<div className="benefit_1 ben">Develop!</div>
// 															<div className="benefit_2 ben">Dont Stop!</div>
// 														</div>
// 													</div>
// 												</div>
// 											</div>
// 										</div>
// 										</div>

// 										<img src="img/preview_hands.png" className="hands" />

// 									</div>


// 								</div>
// 							</div>
// 							<div className="buttons">
// 								<input type="submit" name="submit" className="button-cv button-cv-full-red" value="Hinzufügen" />
// 								<a href="#" className="button-cv button-cv-transperent close_popup">Abbrechen</a>
// 								<div className="clear"></div>
// 							</div>
// 						</div>
// 					</div>






// 			<div className="popup_crop_back"></div>
// 			<div className="popup_crop popup_crop_image">
// 				<div className="header">Position and size image</div>
// 				<div id="image-cropper">
// 					<div className="cropit-preview"></div>

// 					<div className="controll">
// 					<div className="rotate-cw-btn rotate"><i className="fa fa-undo" aria-hidden="true"></i></div>
// 					<div className="rotate-ccw-btn rotate"><i className="fa fa-repeat" aria-hidden="true"></i></div>
// 					<div className="zoom">
// 						<i className="fa fa-picture-o fa-1" aria-hidden="true"></i>
// 						<input type="range" className="cropit-image-zoom-input" />
// 						<i className="fa fa-picture-o fa-2" aria-hidden="true"></i>
// 					</div>
// 					</div>

// 					<!-- The actual file input will be hidden -->
// 					<input type="file" className="cropit-image-input" />
// 					<!-- And clicking on this button will open up select file dialog -->
// 					<div className="bottom">
// 						<div className="crop">CROP</div>
// 						<div className="cancel">CANCEL</div>
// 					</div>
// 				</div>	
// 			</div>

// 			<div className="popup_crop popup_crop_video">
// 				<div className="header">Position and size image</div>
// 				<div id="video_cropper">
// 					<video muted loop autoplay="true">
// 						<source src="" type="video/mp4">
// 					</video>
// 				</div>
				
// 				<div className="bottom">
// 					<div className="crop">CROP</div>
// 					<div className="cancel">CANCEL</div>
// 				</div>
// 			</div>