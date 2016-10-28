import React from 'react'
import Carousel from 'nuka-carousel'
import Img from 'react-image-load'
import Video from 'react-html5video'

import CustomDecorators from './JobPreviewDecorators'
import CustomDecoratorsLarge from './JobPreviewDecoratorsLarge'
import Popup from '../Popup'
import '../../JobPreview.css'


export default class JobPreviewPopup extends React.Component {
	static mixins = [Carousel.ControllerMixin]

	constructor(props) {
		super(props);
		this.state = {
			method: "POST",
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
				video: {
					video: ''
				}, 
				payment: '',
				working_hours: '', 
				publication_date: ''
			},
			subsidiary: {
				company: {
					name: ''
				}
			}
		}
		// this.get_capture = this.get_capture.bind(this);
	}
	post_job() {
		console.log("post job")
		console.log("form_data:", this.state.form_data)
		// this.get_capture()
		var headers = new Headers();
		headers.append("Content-Type", "application/json")
		headers.append("Authorization", "Token " + localStorage.token);
		var request = new Request(
			'http://dev.jobufo.com/api/v1/recruiting/vacancy/',
			{
				method: this.state.method,
				headers: headers,
				body: JSON.stringify(this.state.form_data)
			})
		fetch(request)
				.then(function(r) {
					console.log('then1:', r)
					return r.json();
				})
				.then(function(result) {
					console.log("result post:", result);
					window.location.reload();
				}).catch(function(reason) {
					console.log("Error:", reason)
				});
	}
	cancel() {
		this.props.cancel()
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			method: nextProps.method ? nextProps.method : "POST",
			form_data: nextProps.form_data,
			subsidiary: nextProps.subsidiary
		})
	}
   //  get_capture(){
 		// var video = $( "#videoFile video" );
   //          var time = 15;
   //          var scale = 1;

   //          var video_obj = null;

   //     	    video.addEventListener('loadedmetadata', function() {
   //               this.currentTime = time;
   //               video_obj = this;

   //          }, false);

   //          video.addEventListener('loadeddata', function() {
   //               var video = document.getElementById('video');

   //               var canvas = document.createElement("canvas");
   //               canvas.width = video.videoWidth * scale;
   //               canvas.height = video.videoHeight * scale;
   //               canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

   //               var img = document.createElement("img");
   //              img.src = canvas.toDataURL();
   //              console.log("toDataURL:", canvas.toDataURL())
   //              // $('#thumbnail').append(img);

   //              video_obj.currentTime = 0;

   //          }, false);
 
   //  }
	render() {
		var data = this.state.form_data;
		var subsidiary = this.state.subsidiary;
		console.log("data:", this.state.form_data)
		var preview_html = (
				<div className="job-preview">
					<div className="iphone-screen">
						<Carousel decorators={CustomDecoratorsLarge}>
							<div className="left-iphone-screen">
								<div className="header"></div>
								<div className="image-slider">
									<Carousel decorators={CustomDecorators}>
									{data.video ? (
								        <Video width="237" height="140">
											  <source type="video/mp4" src={data.video.video} /> 
											  <source type="video/ogg" src={data.video.video} /> 
											  <source type="video/webm" src={data.video.video} /> 
				  				        </Video>) : null}
								    {data.image_list ? (
								    	<div>
							    			<img width="237" height="140" src={data.image_list[0].image} />
								    		<img width="237" height="140" src={data.image_list[1].image} />
								    	</div>) : null}
									</Carousel>
								</div>
								<div className="body">
									<div className="title-section">
										<h2 className="job_preview-title">
											<span className="job-preview-title">{data.title}</span> in <span className="job-preview-location">{data.address.city.name}</span>
										</h2>
										<h3 className="job_preview-subtitle">ab {data.vacancy_start}</h3>
									</div>
									<div className="options-section">
										<ul>
											<li className="workingHours">
												<i className="fa fa-clock-o" aria-hidden="true"></i> <span>{data.working_hours}H per day</span></li>
											<li className="sallary">
												<i className="fa fa-clock-o" aria-hidden="true"></i> <span>{data.payment}€ pro Monat</span></li>
											<li className="typeOfJob"><i className="fa fa-clock-o" aria-hidden="true"></i> <span>{data.kind}</span></li>
										</ul>
									</div>
									<div className="description-section">
										<h3 className="job_preview-subtitle">Description</h3>
									</div>
									<div className="company-section">
										<div className="job-preview-company-block">
											<img src="http://dev.jobufo.com/media/logos/6a6b9657-9eb.png" className="company-logo" alt="" />
											{this.subsidiary ? (<h2 className="iphone-section-title">{subsidiary.company.name}</h2>):(null)}
											{data.address ?
												(<h2 className="location">
													<i className="fa fa-map-marker" aria-hidden="true"></i> <span className="align-left">{data.address.city.name}</span>
												</h2>) : null}
											<div className="clear"></div>
										</div>
									</div>
									<div className="bottom-section">
										<h2 className="iphone-title">Diese Anzeige wurde zur Verfügung gestellt von:</h2>
										<img className="job-provider" src={require("../../img/job-provider.png")} alt=""/>
									</div>
								</div>
							</div>
							<div className="right-iphone-screen">
								<div className="header-right"></div>
								<div className="body-right">
									<div className="box" id="box_edit">
										<div className="info">
											<div className="name">{data.title}</div>
											<div className="company">{subsidiary.company.name}</div>
											<div className="place">{data.address.city.name}</div>
											<div className="avatar">
												<img src="http://dev.jobufo.com/media/avatars/a29002ff-1e8.png" />
											</div>
										</div>
										{data.image_list[0] != null ? (
											<div className="image" style={{backgroundImage: "url("+data.image_list[0].image+")"}} >
												<div className="benefs">
													<div className="benefit_1 ben">123</div>
													<div className="benefit_2 ben">123</div>
												</div>
											</div>) : (<div className="image">
														    <div className="benefs">
																<div className="benefit_1 ben">123</div>
																<div className="benefit_2 ben">123</div>
															</div>
													    </div>)}

									</div>
									<div className="box">
										<div className="info">
											<div className="name">Android Developer</div>
											<div className="company">JobUFO - Team</div>
											<div className="place">Germany, Berlin</div>
											<div className="avatar">
												<img src={require("../../img/video.jpg")} />
											</div>
										</div>

										<div className="image" style={{backgroundImage: "url("+require('../../img/android.jpg')+")"}}>
											<div className="benefs">
												<div className="benefit_1 ben">123</div>
												<div className="benefit_2 ben">123</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Carousel>
					</div>
				</div>
			)
		var popupOptions = {
			title: "Anzeige uberprufen",
			subtitle: "This job will be posted on " + this.state.form_data.publication_date,
			isShowingModal: this.props.show,
			contentClassName: "popup-content job-list",
			button: {left: "Hinzufügen", right: "ABBRECHEN"},
			htmlContent: preview_html,
			onLeftClick: this.post_job.bind(this),
			onRightClick: this.cancel.bind(this)
		}
		return (
			<div>
				<Popup {...popupOptions} />
			</div>
		);
	}
}
