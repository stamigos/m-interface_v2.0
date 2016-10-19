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
import TypeAheadCity from '../components/JobPost/TypeAheadCity'
import JobPreviewPopup from '../components/JobPost/JobPreviewPopup'

import { getMonth, formatCheckFromDate } from '../utils';

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
			isDateFromCheckToday: false,
			isShowingPreview: false,

			form_data: {
				image_list: [
					{image: ''},
					{image: ''}
				],
				title: '',
				vacancy_start: '',
				kind: '',
				address: {
					city: {
						name: ''
					}
				},
				subsidiary: {
					company: {
						name: ''
					}
				},
				video: {
					video: ''
				}, 
				payment: '',
				working_hours: '',
				publication_date: ''
			},

			title: null,
			subsidiary: {
				company: {
					name: ''
				}
			},
			description: null,
			kind: null,
			vacancy_start: null,
			publication_date: null,
			payment: null,
			working_hours: null,
			is_active: true,
			benefit_1: null,
			benefit_2: null,
			top_job: false,
			video_crop_params: null
		}
		this.get_image_list = this.get_image_list.bind(this);
		this.get_video = this.get_video.bind(this);
	}
	onScheduleClick() {
		this.setState({scheduleClicked: !this.state.scheduleClicked})
	}
	setTodayDate() {
		if (!this.state.isDateFromCheckToday) {
			var today = new Date();
			this.setState({
				dateFromCheck: moment(formatCheckFromDate(today.toString())),
				vacancy_start: moment(formatCheckFromDate(today.toString())).format('YYYY-MM-DD'),
				isDateFromCheckToday: true
			})
		}
		else {
			this.setState({
				dateFromCheck: null,
				vacancy_start: null,
				isDateFromCheckToday: false
			})
		}
	}
	handleFromDateChange(date) {
		this.setState({
			dateFromCheck: date,
			vacancy_start: date.format('YYYY-MM-DD')
		})
	}
	handleToDateChange(date) {
		this.setState({
			dateToCheck: date
		})		
	}
	handleDateScheduleChange(date) {
		this.setState({
			dateSchedule: date,
			publication_date: date.format('YYYY-MM-DD')
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
	switchJobType(isTopJob) {
		this.setState({
			top_job: isTopJob
		})
	}
	handleTitle(e) {
		this.setState({
			title: e.target.value
		})
	}
	handleDescription(e) {
		this.setState({
			description: e.target.value
		})
	}
	handleKind(e) {
		this.setState({
			kind: e.target.value
		})
	}
	handleSalary(e) {
		this.setState({
			payment: e.target.value
		})
	}
	handleWorkingHours(e) {
		this.setState({
			working_hours: e.target.value
		})
	}
	changeBenefit1(benefit_1) {
		this.setState({
			benefit_1: benefit_1
		})
	}
	changeBenefit2(benefit_2) {
		this.setState({
			benefit_2: benefit_2
		})
	}
	getLeftImage(imgSrc) {
		this.setState({
			leftImageSrc: imgSrc
		})
	}
	getRightImage(imgSrc) {
		this.setState({
			rightImageSrc: imgSrc
		})
	}
	get_image_list() {
		var image_list   = new Array();
		// create left image instance
	    var imageLeft    = new Object();
		imageLeft.image  = this.state.leftImageSrc.split(',')[1];
		imageLeft.index  = 0;
		image_list.push(imageLeft);
		// create right image instance
		var imageRight   = new Object();
		imageRight.image = this.state.rightImageSrc.split(',')[1];
		imageRight.index = 1;
		image_list.push(imageRight);

		return image_list;
	}
	getVideoCropParams(params) {
		console.log("video crop params:", params)
		this.setState({
			video_crop_params: params
		})
	}
	getSubsidiary(subsidiary) {
		console.log("subsidiary:", subsidiary)
		this.setState({
			subsidiary: subsidiary
		})
	}
	get_video() {
		var data_video = {};
		var params = this.state.video_crop_params;
		data_video.video = params.video.split(",")[1];
		data_video.bypass_cropping = false;
		data_video.slice_start = Math.abs(params.slice_start);
		data_video.x_min = Math.abs(params.x_min);
		data_video.x_max = Math.abs(params.x_max);
		data_video.y_min = Math.abs(params.y_min);
		data_video.y_max = Math.abs(params.y_max);
		data_video.mute  = true;
		return data_video;
	}
	onSubmit(e) {
		e.preventDefault();
		var image_list = this.get_image_list();
		var data_video = this.get_video();

		var data              = new Object();
		data.subsidiary       = this.state.subsidiary.api_url;
		data.address 	      = this.state.subsidiary.address;
		data.title 		      = this.state.title;
		data.description      = this.state.description;
		data.kind             = this.state.kind;
		data.vacancy_start    = this.state.vacancy_start;
		data.publication_date = this.state.publication_date;
		data.payment 	      = this.state.payment;
		data.working_hours    = this.state.working_hours;
		data.is_active		  = this.state.is_active;
		data.benefit_1        = this.state.benefit_1;
		data.benefit_2        = this.state.benefit_2;
		data.top_job 		  = this.state.top_job;
		data.image_list   	  = image_list;
		data.preview_video 	  = data_video;
		data.video 			  = {
									video: data_video.video,
									bypass_cropping: true,
								}
		this.setState({
			form_data: data,
			isShowingPreview: true
		})

		// console.log("data on submit:", data)
	}
	render() {
		var today = new Date();
		return (
			<div className="job-post-content">
				<div className="post-job-content-header align-center">
					<h1 className="title">Neue Stelle hinzufugen</h1>
					<h2 className="subtitle">Bitte trage unten alle Details ein</h2>
				</div>
				<form onSubmit={this.onSubmit.bind(this)} action="/post-job" method="post" role="form" className="job-post-form" id="job-post-form">
					<div className="form-wrapper">
						<NormalTopJob switchJobType={this.switchJobType.bind(this)}/>
						<div className="clear"></div>

						<label className="label" htmlFor="Title">Stellenbezeichnung</label>
						<input type="text" className="" name="Title" id="Title" placeholder="Stellenbezeichnung" onChange={this.handleTitle.bind(this)}/>
						<div className="clear"></div>

						<label className="label" htmlFor="Location">Subsidiary</label>
						<div className="Location citySearchSelect" id="Location">
							<TypeAheadCity getSubsidiary={this.getSubsidiary.bind(this)}/>
						</div>
						<div className="clear"></div>

						<label className="label-big" htmlFor="JobDescription">Stellenbeschreibung</label>
						<textarea onChange={this.handleDescription.bind(this)} name="JobDescription" id="JobDescription" rows="5" data-autoresize ></textarea>
						<div className="clear"></div>

						<ModalVideoCrop getVideoCropParams={this.getVideoCropParams.bind(this)} />

						<div className="clear"></div>

						<label className="label-big" htmlFor="JobDescription">Bilder des Jobs</label>
						<p className="JobDescAbout">Füge Bilder von der Stelle oder dem Team hinzu. JobUFO’s Bilder sind 1115px X 625px groß.
						Wenn dein Bild zu groß ist, helfen wir dir es hier zuzuschneiden.</p>
						<div className="images">
							<LeftModalImageCrop getLeftImage={this.getLeftImage.bind(this)} />
							<RightModalImageCrop getRightImage={this.getRightImage.bind(this)} />
						</div>

						<ul id="postJobUploadedFilesImage"></ul>
						<div className="clear"></div>
						<select onChange={this.handleKind.bind(this)} name="JobType" id="Kind" name="Kind" className="default">
							<option value="">Art des Jobs</option>
							<option value="FULL_TIME">Full Time</option>
							<option value="PART_TIME">Part Time</option>
							<option value="INTERN">Intern</option>
							<option value="VOCATIONAL_TRAINING">Vocational Training</option>
							<option value="TEMPORARY">Temporary</option>
						</select>
						<div className="clear"></div>
						<label className="label" htmlFor="WorkingHours">Zeitlicher Arbeitsaufwand</label>
						<input onChange={this.handleWorkingHours.bind(this)} type="text" name="WorkingHours" id="WorkingHours" className="half" />
						<select name="Per" id="Per" className="half right">
							<option value="day">Per day</option>
							<option value="week">Per week</option>
							<option value="month">Per month</option>
						</select>
						<div className="clear"></div>
						<input onChange={this.handleSalary.bind(this)} type="text" name="Salary" id="Salary" className="Salary" placeholder="Bezahlung" />
						<div className="clear"></div>
						
						<Benefits changeBenefit1={this.changeBenefit1.bind(this)} changeBenefit2={this.changeBenefit2.bind(this)}/>

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
							<button type="submit" id="preview_job_popup-button" className="button-cv button-cv-full-red ">Anzeige uberprüfen</button>
							<a href="#" className="button-cv button-cv-transperent clear_form">Abbrechen</a>
						</div>
					</div>
				</form>
				<JobPreviewPopup form_data={this.state.form_data} show={this.state.isShowingPreview} subsidiary={this.state.subsidiary}/>
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