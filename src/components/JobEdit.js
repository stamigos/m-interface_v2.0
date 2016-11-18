import React from 'react'
import DatePicker from 'react-datepicker'
import TimePicker from 'rc-time-picker';
import moment from 'moment'

import AvailabilityList from '../components/JobPost/AvailabilityList'
import TypeAheadSubsidiary from '../components/JobPost/TypeAheadSubsidiary'
import JobPreviewPopup from '../components/JobPost/JobPreviewPopup'

import { getMonth, formatCheckFromDate } from '../utils'

class JobEditContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowingPreview: false,
			scheduleClicked: true,
			dateSchedule: moment(this.props.job.publication_date),
			timeSchedule: null,
			dateFromCheck: moment(this.props.job.vacancy_start),
			dateToCheck: null,
			isDateFromCheckToday: false,
			imageUploaded: false,

			form_data: null,

			title: this.props.job.title,
			subsidiaryId: this.props.job.company.subsidiary.pk,
			subsidiary: this.props.job.company.subsidiary,
			address: this.props.job.address,
			description: this.props.job.description,
			kind: this.props.job.kind,
			vacancy_start: moment(this.props.job.vacancy_start).format('YYYY-MM-DD'),
			publication_date: moment(this.props.job.publication_date).format('YYYY-MM-DD'),
			payment: this.props.job.payment,
			working_hours: this.props.job.working_hours,
			image_list: this.props.job.image_list,
			benefit_1: this.props.job.benefit_1,
			benefit_2: this.props.job.benefit_2,
			video: this.props.job.video ? this.props.job.video.preview_image_list[0] : null
			}
	}
	getSubsidiary(subsidiary) {
		console.log("subsidiary:", subsidiary)
		this.setState({
			subsidiary: subsidiary
		})
	}
	onScheduleClick() {
		this.setState({scheduleClicked: !this.state.scheduleClicked})
	}
	setTodayDate() {
		console.log("setTodayDate")
		if (!this.state.isDateFromCheckToday) {
			console.log("vacancy_start today:", moment(today).format('YYYY-MM-DD'))
			var today = new Date();
			this.setState({
				dateFromCheck: moment(today),
				vacancy_start: moment(today).format('YYYY-MM-DD'),
				isDateFromCheckToday: true
			})
		}
		else {
			console.log("vacancy_start null:", moment())
			this.setState({
				dateFromCheck: moment(),
				vacancy_start: moment().format('YYYY-MM-DD'),
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
	handleBenefit_1(e) {
		this.setState({
			benefit_1: e.target.value
		});
	}
	handleBenefit_2(e) {
		this.setState({
			benefit_2: e.target.value
		});
	}
	openVacancyDetail() {
		this.props.openVacancyDetail();
	}
	onVideoDrop() {
		this.setState({
			video: null
		})
	}
	onImageSelect() {
		var self = this;
		var file = this.refs.imageFile.files[0];
	    var reader = new FileReader();
		var url = reader.readAsDataURL(file);
		var image_list = [];
		if (this.state.image_list) {
			image_list = this.state.image_list;
		}
			reader.onloadend = function (e) {
				image_list.push({image: reader.result})
				self.setState({
					imageUploaded: true,
					image_list: image_list
				})
		    }.bind(this);
	}
	get_image_list() {
		if (this.state.imageUploaded && (this.state.image_list || (this.state.image_list[0] != null))) {
			var image_list   = new Array();
			// create left image instance
		    var imageLeft    = new Object();
			imageLeft.image  = this.state.image_list[0].split(',')[1];
			imageLeft.index  = 0;
			image_list.push(imageLeft);
			// create right image instance
			var imageRight   = new Object();
			imageRight.image = this.state.image_list[1].split(',')[1];
			imageRight.index = 1;
			image_list.push(imageRight);

			return image_list;
		}
		else {
			return null;
		}
	}
	get_video() {
		return null
	}
	onSubmit(e) {
		e.preventDefault();
		var image_list = this.get_image_list();
		var data_video = this.get_video();

		var data              = new Object();
		data.subsidiary       = this.state.subsidiary.api_url;
		data.address 	      = this.state.address;
		data.title 		      = this.state.title;
		data.description      = this.state.description;
		data.kind             = this.state.kind;
		data.vacancy_start    = this.state.vacancy_start;
		data.publication_date = this.state.publication_date;
		data.payment 	      = this.state.payment;
		data.working_hours    = this.state.working_hours;
		data.benefit_1        = this.state.benefit_1;
		data.benefit_2        = this.state.benefit_2;

		if (image_list) {
			data.image_list    = image_list;
		}
		if (data_video) {
			data.preview_video = data_video;
			data.video 		   = {
									video: data_video.video,
									bypass_cropping: true,
								}
		}

		this.setState({
			form_data: data,
			isShowingPreview: true
		})
	}
	render() {
		var uploadedImages = null;
		console.log("images_list:", this.state.image_list)
		if (this.state.image_list) {
			uploadedImages = this.state.image_list.map(function(image, i) {
				return (
					<li key={i} className="uploaded_file" style={{backgroundImage: 'url('+image.image+')'}}>
						<div className="uploaded_file--overlay">
							<div className="upload_file--buttons">
								<a href="#" className="move_left"><i className="fa fa-arrow-left" aria-hidden="true"></i></a>
								<a href="#" className="upload_file--button deleter"><i className="fa fa-trash" aria-hidden="true"></i></a>
								<a href="#" className="move_right"><i className="fa fa-arrow-right" aria-hidden="true"></i></a></div>
							</div>
					</li>)
			})
		}
		var uploadedVideo = null;
		if (this.state.video) {
			uploadedVideo = (<div id="EditPostJobUploadedFilesVideo" style={{backgroundImage: 'url('+this.state.video.image+')'}}>
								<div className="videoFile"></div>
									<div className="overlay">
										<div className="EditPostJob-preview-buttons">
											<div className="EditPostJob-preview-button editor">
												<label id="EditPostJob-preview-upload-button" htmlFor="EditPostjobVideo">
													<i className="fa fa-pencil" aria-hidden="true"></i>
												</label>
											</div>
											<div className="EditPostJob-preview-button deleter">
												<a href="#" onClick={this.onVideoDrop.bind(this)}><i className="fa fa-trash" aria-hidden="true"></i></a>
											</div>
										</div>
									</div>
							</div>)
		}
		var number = this.state.benefit_1.length + this.state.benefit_2.length;
		return (
			<div className="job-post-content">
				<div className="post-job-content-header align-center">
					<h1 className="title">Edit a Job</h1>
					<h2 className="subtitle">Please edit the details bellow</h2>
				</div>
				<form onSubmit={this.onSubmit.bind(this)} action="" method="post" role="form" className="job-post-form" id="job-post-form">
					<div className="form-wrapper">
						<div className="clear"></div>

						<label className="label" htmlFor="Title">Stellenbezeichnung</label>
						<input value={this.state.title} type="text" className="" name="Title" id="Title" placeholder="Stellenbezeichnung" onChange={this.handleTitle.bind(this)}/>
						<div className="clear"></div>

						<label className="label" htmlFor="Location">Subsidiary</label>
						<div className="Location citySearchSelect" id="Location">
							<TypeAheadSubsidiary selectedId={this.state.subsidiaryId} getSubsidiary={this.getSubsidiary.bind(this)}/>
						</div>
						<div className="clear"></div>

						<label className="label-big" htmlFor="JobDescription">Stellenbeschreibung</label>
						<textarea value={this.state.description} onChange={this.handleDescription.bind(this)} name="JobDescription" id="JobDescription" rows="5" data-autoresize ></textarea>
						<div className="clear"></div>
						
						<label className="label-big" htmlFor="EditJobDescription">Video des Jobs</label>
						{!this.state.video ? 
							(<div>
								<label id="EditPostjobVideo-label" className="upload-button" htmlFor="EditPostjobVideo">
									<i className="fa fa-plus" aria-hidden="true"></i>
								</label>
							 </div>) : null}
						<input className="fileinput" accept="video/*" name="EditPostjobVideo" id="EditPostjobVideo" type="file" ref="videoFile"/>

						{uploadedVideo}
						
						<div className="clear"></div>

						<label className="label-big" htmlFor="JobDescription">Bilder des Jobs</label>
						<label className="upload-button" htmlFor="EditPostjobImage">
							<i className="fa fa-plus" aria-hidden="true"></i>
						</label>
						<input onChange={this.onImageSelect.bind(this)} accept="image/*" name="EditPostjobImage" id="EditPostjobImage" type="file" ref="imageFile"/>
						<ul id="subsidiary_uploaded_files">
							{uploadedImages}
						</ul>

						<ul id="postJobUploadedFilesImage"></ul>
						<div className="clear"></div>
						<select value={this.state.kind} onChange={this.handleKind.bind(this)} name="JobType" id="Kind" name="Kind" className="default">
							<option value="">Art des Jobs</option>
							<option value="FULL_TIME">Full Time</option>
							<option value="PART_TIME">Part Time</option>
							<option value="INTERN">Intern</option>
							<option value="VOCATIONAL_TRAINING">Vocational Training</option>
							<option value="TEMPORARY">Temporary</option>
						</select>
						<div className="clear"></div>
						<label className="label" htmlFor="WorkingHours">Zeitlicher Arbeitsaufwand</label>
						<input value={this.state.working_hours} onChange={this.handleWorkingHours.bind(this)} type="text" name="WorkingHours" id="WorkingHours" className="half" />
						<select name="Per" id="Per" className="half right">
							<option value="day">Per day</option>
							<option value="week">Per week</option>
							<option value="month">Per month</option>
						</select>
						<div className="clear"></div>
						<input value={this.state.payment} onChange={this.handleSalary.bind(this)} type="text" name="Salary" id="Salary" className="Salary" placeholder="Bezahlung" />
						<div className="clear"></div>
						<div className="benefits">
							<div className="half Benefit">
								<input value={this.state.benefit_1} onChange={this.handleBenefit_1.bind(this)} type='text' className="half benefit_1" placeholder="Job Vorteil 1" name="benefit_1" />
								<p>Maximale Zeichen: 35</p>
							</div>
							<div className="half right Benefit">
								<input value={this.state.benefit_2} onChange={this.handleBenefit_2.bind(this)} type='text' className="half right benefit_2" placeholder="Job Vorteil 2" name="benefit_2"  />
								<p><b>{number}</b> / 35</p>	
							</div>
							<div className="clear"></div>
						</div>
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

			             {/* TODO: remove comment, if API supports this
			 						<label className="label-big">mogliche Arbeitstage</label>
			  
			             <AvailabilityList />
			 						<div className="clear"></div>
			             */}

						<input type="checkbox" name="SheduleJob" id="SheduleJob" defaultChecked="checked"/>
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
							<a href="#" onClick={this.openVacancyDetail.bind(this)} className="button-cv button-cv-transperent clear_form">Abbrechen</a>
						</div>
					</div>
				</form>
					<JobPreviewPopup method="PUT" form_data={this.state.form_data} show={this.state.isShowingPreview} subsidiary={this.state.subsidiary}/>
			</div>
		);
	}
}
export default class JobEdit extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		console.log("received props:", this.props.model.get("selectedJob"))
		return (
			<div className="job-detail-wrapper">
				<JobEditContent openVacancyDetail={this.props.openVacancyDetail} job={this.props.model.get("selectedJob")}/>
			</div>
		);
	}
}
