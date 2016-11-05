import React from 'react'
import Carousel from 'nuka-carousel'
import Img from 'react-image-load'
import Video from 'react-html5video'
import UserAvatar from 'react-user-avatar'

//Stores
import JobStore from '../store/JobStore';

//Mixin
import mixins from 'es6-mixins';
import BackboneMixin from '../mixin/BackboneMixin';

import CustomDecorators from './JobPost/JobPreviewDecorators'
import CustomDecoratorsLarge from './JobPost/JobPreviewDecoratorsLarge'
import Popup from './Popup'
import '../JobPreview.css'


export default class JobPreviewPopup extends React.Component {
	static mixins = [Carousel.ControllerMixin]

	constructor(props) {
		super(props);
		this.state = {
			job: null
		}
		mixins(BackboneMixin,this);
		// this.get_capture = this.get_capture.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			job: nextProps.job
		})
	}
    // get_capture(){
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

//    <ul className="options-section-half">
// 		<li>
// 			<img width="16" src={require("../img/popup-salary.png")}/><p>{data.payment}€ / Monat</p>
// 		</li>
// 		<li>
// 			<img width="16" src={require("../img/popup-type.png")}/><p>{data.kind}</p>
// 		</li>
// 		<li>
// 			<img width="16" src={require("../img/popup-location.png")}/><p>{data.address.city.name}</p>
// 		</li>
// 		<li>
// 			<img width="16" src={require("../img/popup-time.png")}/><p>{data.working_hours}</p>
// 		</li>
// 	</ul>
// 	<ul className="options-section-half">
// 		<li>
// 			<img width="16" src={require("../img/popup-vacation.png")}/><p>{data.benefit_1}</p>
// 		</li>
// 		<li>
// 			<img width="16" src={require("../img/popup-bonus.png")}/><p>{data.benefit_2}</p>
// 		</li>
// 		{data.top_job ? (
// 			<li>
// 				<img width="16" src={require("../img/popup-top.png")}/><p>Top job</p>
// 			</li>
// 		) : null}
// 	</ul>

	render() {
		console.log("user JobStore:", JobStore.get("currentUser"))
		var avatar = null;
	    if (!JobStore.get("currentUserLoading")) {
        	avatar = JobStore.get('currentUser').ufouser.avatar;
    	}
		var data = this.state.job;
		// var subsidiary = this.state.subsidiary;
		console.log("data:", this.props.job)
		var preview_html = <div></div>
		if (this.state.job && this.state.job.title != "") {
			var image_list = data.image_list.map(function(image, i) {
				return <img key={i} src={image.image} />
			});
			if (data.video) {
				image_list.push(<img width="238" height="120" key={3} src={data.video.preview_image_list[0].image} />)
			}

			preview_html = (
				<div className="job-preview">
					<div className="iphone-screen">
						<Carousel decorators={CustomDecoratorsLarge}>
							<div className="left-iphone-screen">
								<div className="header-left"></div>
								<div className="image-slider">
									<Carousel decorators={CustomDecorators}>
										{image_list}
									</Carousel>
								</div>
								<div className="body-left">
									<div className="title-section">
										<h2 className="job_preview-title">
											<span className="job-preview-title">{data.title}</span>
										</h2>
										<h3 className="job_preview-subtitle">Zeitraum: {data.vacancy_start}</h3>
									</div>
									<div className="options-section">
										<ul className="options-section-half">
											<li>
												<p><img width="15" align="top" src={require("../img/popup-salary.png")}/>
												{data.payment}€ / Monat</p>
											</li>
											<li>
												<p><img width="15" align="middle" src={require("../img/popup-type.png")}/>
												{data.kind}</p>
											</li>
											<li>
												<p><img width="15" align="middle" src={require("../img/popup-location.png")}/>
												{data.address.city.name}</p>
											</li>
											<li>
												<p><img width="15" align="middle" src={require("../img/popup-time.png")}/>
												{data.working_hours}</p>
											</li>
										</ul>
										<ul className="options-section-half">
											<li>
												<p><img width="15" align="middle" src={require("../img/popup-bonus.png")}/>
												{data.benefit_1}</p>
											</li>
											<li>
												<p><img width="15" align="middle" src={require("../img/popup-vacation.png")}/>
												{data.benefit_2}</p>
											</li>
											{data.top_job ? (
												<li>
													<p><img width="15" align="middle" src={require("../img/popup-top.png")}/>
													Top job</p>
												</li>
											) : null}
										</ul>
										<div className="clear"></div>
									</div>
									<div className="company-section">
										<h3 className="iphone-section-title">{data.company.name}</h3>
										<h3 className="description-location">
											<i className="fa fa-map-marker" aria-hidden="true"></i> <span>{data.company.address.city.name}</span>
										</h3>
										<h3 className="description-date">{data.vacancy_start}</h3>
										<div className="clear"></div>
									</div>
									<div className="description-section">
										<h3 className="job_preview-subtitle">Detaillierte Beschreibung</h3>
										<p className="job_preview-description">{data.description}</p>
									</div>
									<div className="description-section">
										<h3 className="job_preview-subtitle">Unternehmensinformationen</h3>
										<div className="image-left">
											<img src={data.company.logo} width="45" height="45" alt="" />
										</div>
										<div className="text-right">
											<h3 className="iphone-section-title">{data.company.name}</h3>
											<h3 className="description-location">
												<i className="fa fa-map-marker" aria-hidden="true"></i> <span>{data.company.address.city.name}</span>
											</h3>
											<h3 className="description-category">{data.company.category.name}</h3>
											<div className="description-links">
												<ul className="company-subsidiary-social-media">
													<li className="company-subsidiary-social-media-item">
														<img width="30" src={require("../img/facebook.png")} alt="" />
													</li>
													<li className="company-subsidiary-social-media-item">
														<img width="30" src={require("../img/twetter.png")} alt="" />
													</li>
													<li className="company-subsidiary-social-media-item">
														<img width="30" src={require("../img/instagram.png")} alt="" />
													</li>
												</ul>
											</div>
										</div>
										<div className="clear"></div>
									</div>
									<div className="bottom-section">
										<h3 className="iphone-title">Diese Anzeige wurde zur Verfügung gestellt von:</h3>
										<img className="job-provider" src={require("../img/job-provider.png")} alt=""/>
									</div>
								</div>
								<div className="section-button">APPLY</div>
							</div>
							<div className="right-iphone-screen">
								<div className="header-right"></div>
								<div className="body-right">
									<div className="box">
										<div className="info">
											<div className="name">{data.title}</div>
											<div className="company">{data.company.name}</div>
											<div className="place">{data.address.city.name}</div>
											<div className="avatar">
												<img src={data.company.logo} />
											</div>
										</div>
										{data.image_list[0] != null ? (
											<div className="image" style={{backgroundImage: "url("+data.image_list[0].image+")"}} >
												<div className="benefs">
													<div className="benefit_1 ben">{data.benefit_1}</div>
													<div className="benefit_2 ben">{data.benefit_1}</div>
												</div>
											</div>) : (<div className="image">
														    <div className="benefs">
																<div className="benefit_1 ben">{data.benefit_1}</div>
																<div className="benefit_2 ben">{data.benefit_1}</div>
															</div>
													    </div>)}
									</div>
								</div>
							</div>
						</Carousel>
					</div>
				</div>
			)
		var popupOptions = {
			title: "Anzeige überprüfen",
			subtitle: "This job will be posted on " + data.publication_date,
			isShowingModal: this.props.show,
			contentClassName: "popup-content job-list",
			close: this.props.close,
			button: {visible: false, left:"", right: ""},
			htmlContent: preview_html,
			onLeftClick: function(){},
			onRightClick: function(){}
		}

			return (
				<div>
					<Popup {...popupOptions} />
				</div>
			)
		}
		else {
			return (<div></div>)
		}
	}
}
