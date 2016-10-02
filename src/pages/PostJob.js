import React from 'react';

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
class HelpPopup extends React.Component {
	render() {
		return (
			<div className="help JobTypeHelp">
				<b>Was ist ein Top Job?</b>
				<p><i className="fa fa-check" aria-hidden="true"></i>Zeigen Sie schon 10 Sekunden Ihres Jobvideos oder ein Teamfoto in der Jobliste und erzeugen Sie mehr Aufmerksamkeit</p>
				<p><i className="fa fa-check" aria-hidden="true"></i>App-Nutzer sehen Vorteile Ihres Jobs schon in der Jobliste</p>
				<div className="example">View Example</div>
				<div className="shape"></div>
			</div>
		);
	}
}
class NormalTopJob extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isActiveNormal: true,
			isActiveTop: false,
			isOpenPopup: false
		}
		this.selectActiveNormal = this.selectActiveNormal.bind(this);
		this.selectActiveTop = this.selectActiveTop.bind(this);
		this.togglePopup = this.togglePopup.bind(this);
	}
	selectActiveNormal() {
		if (!this.isActiveNormal) {
			this.setState({
				isActiveNormal: true,
				isActiveTop: false
			});
		}
	}
	selectActiveTop() {
		if (!this.isActiveTop) {
			this.setState({
				isActiveNormal: false,
				isActiveTop: true
			});
		}
	}
	togglePopup() {
		this.setState({
			isOpenPopup: !this.state.isOpenPopup
		});
	}
	render() {
		var popup;
		if (this.state.isOpenPopup) popup = <HelpPopup/>;

		return(
			<div>
				<div className={this.state.isActiveNormal ? 'box selected' : 'box'} onClick={this.selectActiveNormal}>
					<b>Normaler Job</b>
					unlimited
				</div>
				<div id="topjob"className={this.state.isActiveTop ? 'box selected' : 'box'} onClick={this.selectActiveTop}>
					<b>Top Job</b>
					<amount><span>3</span> / 10 available</amount>

					<img src={require('../img/jobtype_top.png')} />
					<i className="fa fa-question-circle" aria-hidden="true" onClick={this.togglePopup}></i>
				</div>
				{popup}
			</div>
		);
	}
}

class Benefits extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			benefit1: 0,
			benefit2: 0
		}
		this.changeBenefit1 = this.changeBenefit1.bind(this);
		this.changeBenefit2 = this.changeBenefit2.bind(this);
	}
	changeBenefit1(event) {
		var number = event.target.value.length;
		this.setState({benefit1: number});
	}
	changeBenefit2(event) {
		var number = event.target.value.length;
		this.setState({benefit2: number});
	}

	render() {
		var number = this.state.benefit1 + this.state.benefit2;

		return (
			<div className="benefits">
				<div className="half Benefit">
					<input onChange={this.changeBenefit1} type='text' className="half benefit_1" placeholder="Job Vorteil 1" name="benefit_1" />
					<p>Maximale Zeichen: 35</p>
				</div>
				<div className="half right Benefit">
					<input onChange={this.changeBenefit2} type='text' className="half right benefit_2" placeholder="Job Vorteil 2" name="benefit_2"  />
					<p><b>{number}</b> / 35</p>
				</div>
				<div className="clear"></div>
			</div>
		);
	}
}
class PostJobContent extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="job-post-content">
				<div className="post-job-content-header align-center">
					<h1 className="title">Neue Stelle hinzufugen</h1>
					<h2 className="subtitle">Bitte trage unten alle Details ein</h2>
				</div>
				<form action="" method="post" role="form" className="job-post-form" id="job-post-form">
					<div className="form-wrapper">
						<div className="JobType">
							<p className="label">Welche Art von Job möchtest du veröffentlichen?</p>
							<input type="radio" className="" name="Type" value="false" />
							<input type="radio" className="" name="Type" value="true" />

							<NormalTopJob/>

						</div>
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

						<label className="label-big" htmlFor="JobDescription">Video des Jobs</label>
						<label id="postjobVideo-label" className="upload-button" htmlFor="postjobVideo">
							<i className="fa fa-video-camera" aria-hidden="true"></i>
							<span>JobUFO’s Videos sind im Format 16:9.<br />
							Wenn dein Video größer ist, helfen wir dir hier es zuzuschneiden.</span>
						</label>
						<input className="fileinput" accept="video/*" name="postjobVideo" id="postjobVideo" type="file" />
						<div id="postJobUploadedFilesVideo">
							<div id="videoFile"></div>
							<div className="overlay">
								<div className="subsidiaryVideo-preview-buttons">
									<div className="subsidiaryVideo-preview-button editor">
										<label id="subsidiaryVideo-preview-upload-button" htmlFor="postjobVideo"><i className="fa fa-pencil" aria-hidden="true"></i></label>
									</div>
									<div className="subsidiaryVideo-preview-button deleter">
										<a href=""><i className="fa fa-trash" aria-hidden="true"></i></a>
									</div>
								</div>

								<div className="help">Verschiebe die rote Markierung um die 10 Sekunden auszuwählen, die bereits in der Jobliste gezeigt werden sollen. Das gesamte Video findet man trotzdem in der Stellenanzeige.</div>

								<div className="play"></div>

								<div className="duration">
									<div className="field"></div>
									<div className="selector">
										<i className="fa fa-angle-left" aria-hidden="true"></i>
										<span>10 SEC</span>
										<i className="fa fa-angle-right" aria-hidden="true"></i>
									</div>
									<div className="time">
										<b>1:20</b> / <span>2:00</span>
									</div>
								</div>
							</div>
						</div>
						<div className="clear"></div>

						<label className="label-big" htmlFor="JobDescription">Bilder des Jobs</label>
						<p className="JobDescAbout">Füge Bilder von der Stelle oder dem Team hinzu. JobUFO’s Bilder sind 1115px X 625px groß.
						Wenn dein Bild zu groß ist, helfen wir dir es hier zuzuschneiden.</p>
						<div className="images">
							<label className="upload-button" htmlFor="postjobImage_1" id="postjobImage_1_block"><i className="fa fa-camera" aria-hidden="true"></i></label>
							<label className="upload-button" htmlFor="postjobImage_2" id="postjobImage_2_block"><i className="fa fa-camera" aria-hidden="true"></i></label>

							<input accept="image/*" name="postjobImage_1" id="postjobImage_1" className="postjobImage" type="file" />
							<input accept="image/*" name="postjobImage_2" id="postjobImage_2" className="postjobImage" type="file" />
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
							<input type='text' id="DateFrom" className="date datePicker half" placeholder="Arbeitsbeginn" />
							<input type="checkbox" name="DateFromCheck" id="DateFromCheck" />
							<label className="label-for-check" htmlFor="DateFromCheck">Sofort</label>
						</div>
						<div className="half right">
							<input type='text' id="DateTo" className="date datePicker half right" placeholder="Arbeitsende" />
							<input type="checkbox" name="DateToCheck" id="DateToCheck" />
							<label className="label-for-check" htmlFor="DateToCheck">Nicht festgelegt</label>
						</div>
						<div className="clear"></div>
						<label className="label-big">mogliche Arbeitstage</label>
						<ul className="availability-list">
							<li className="availability-list-item">
								<h2 className="day">MO</h2>
								<input type="checkbox" name="WeekDays" className="week-days" id="DayMonday" value="Monday" />
								<label className="week-days" htmlFor="DayMonday"></label>
							</li>
							<li className="availability-list-item">
								<h2 className="day">DIE</h2>
								<input type="checkbox" name="WeekDays" className="week-days" id="DayTuesday" value="Tuesday" />
								<label className="week-days" htmlFor="DayTuesday"></label>
							</li>
							<li className="availability-list-item">
								<h2 className="day">MI</h2>
								<input type="checkbox" name="WeekDays" className="week-days" id="DayWednesday" value="Wednesday" />
								<label className="week-days" htmlFor="DayWednesday"></label>
							</li>
							<li className="availability-list-item">
								<h2 className="day">DO</h2>
								<input type="checkbox" name="WeekDays" className="week-days" id="DayThursday" value="Thursday" />
								<label className="week-days" htmlFor="DayThursday"></label>
							</li>
							<li className="availability-list-item">
								<h2 className="day">FR</h2>
								<input type="checkbox" name="WeekDays" className="week-days" id="DayFriday" value="Friday" />
								<label className="week-days" htmlFor="DayFriday"></label>
							</li>
							<li className="availability-list-item">
								<h2 className="day">SA</h2>
								<input type="checkbox" name="WeekDays" className="week-days" id="DaySaturday" value="Saturday" />
								<label className="week-days" htmlFor="DaySaturday"></label>
							</li>
							<li className="availability-list-item">
								<h2 className="day">SO</h2>
								<input type="checkbox" name="WeekDays" className="week-days" id="DaySunday" value="Sunday" />
								<label className="week-days" htmlFor="DaySunday"></label>
							</li>
						</ul>
						<div className="clear"></div>
						<input type="checkbox" name="SheduleJob" id="SheduleJob" />
						<label className="label-for-check label-big" htmlFor="SheduleJob">Job erst veröffentlichen am:</label>
						<div className="clear"></div>
						<div id="Schedule">
							<div className="half">
								<input type='text' id="DateSchedule" name="DateSchedule" className="date datePicker half"  disabled />
							</div>
							<div className="half right">
								<input type='text' id="TimeSchedule" className="timePicker half right" placeholder="Time"  data-position="right top" disabled />
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
					<div id="preview_job_popup" className="popup">
						<div className="popup-window">
							<div className="popup-header align-center">
								<h2 className="popup-title">Anzeige uberprufen</h2>
								<h3 id="preview_job_popup-subtitle" className="popup-subtitle"></h3>
							</div>
							<div className="popup-content align-center">

								<div className="slide">
									<div className="item selected"></div>
									<div className="item"></div>
								</div>

								<div className="preview_job-wrapper">

									<div className="preview-job-content-wrapper">
										<div className="slider_preview_job">
										<div className="wrapper_one wr">
											<img src="img/iphone-header.png" alt="" className="iphone_header" />
											<div id="preview_job-body">
												<div className="preview-job-img-slider"></div>
												<div id="preview-job-body" className="preview-job-body align-left"></div>
												<div className="job-preview-footer">
													<h2 className="job-preview-footer-title">BEWERBEN</h2>
												</div>
											</div>
										</div>

										<div className="wrapper_two wr preview_job_all">
											<img src="img/phone_top_2.jpg" alt="" className="iphone_header" />
											<div id="preview_job-body_2">
												<div className="box" id="box_edit">
													<div className="info">
														<div className="name">NAME</div>
														<div className="company">COMPANY</div>
														<div className="place">PLACE</div>
														<div className="avatar">
															<img src="img/video.jpg" />
														</div>
													</div>

													<div className="image">
														<div className="benefs">
															<div className="benefit_1 ben">BENEFIT</div>
															<div className="benefit_2 ben">BENEFIT</div>
														</div>
													</div>
												</div>

												<div className="box">
													<div className="info">
														<div className="name">Android Developer</div>
														<div className="company">JobUFO - Team</div>
														<div className="place">Germany - Berlin</div>
														<div className="avatar">
															<img src="img/video.jpg" />
														</div>
													</div>

													<div className="image" style={{backgroundImage: require('../img/android.jpg')}}>
														<div className="benefs">
															<div className="benefit_1 ben">Develop!</div>
															<div className="benefit_2 ben">Dont Stop!</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										</div>

										<img src="img/preview_hands.png" className="hands" />

									</div>


								</div>
							</div>
							<div className="buttons">
								<input type="submit" name="submit" className="button-cv button-cv-full-red" value="Hinzufügen" />
								<a href="#" className="button-cv button-cv-transperent close_popup">Abbrechen</a>
								<div className="clear"></div>
							</div>
						</div>
					</div>
				</form>
			</div>
		);
	}
}
			
export default class PostJob extends React.Component {
	render() {
		return (
			<div id="post_job" className="company-wrapper">
				<PostJobContent />
			</div>
		);
	}
}