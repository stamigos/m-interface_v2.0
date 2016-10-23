import React from 'react'
import Carousel from 'nuka-carousel'
import Img from 'react-image-load'
import Video from 'react-html5video'

import CustomDecorators from './JobPost/JobPreviewDecorators'
import Popup from './Popup'
import '../JobPreview.css'


export default class JobPreviewPopup extends React.Component {
	static mixins = [Carousel.ControllerMixin]

	constructor(props) {
		super(props);
		this.state = {
			job: null
		}
		// this.get_capture = this.get_capture.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			job: nextProps.job
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
		var data = this.state.job;
		// var subsidiary = this.state.subsidiary;
		console.log("data:", this.props.job)
		var preview_html = <div></div>
		if (this.state.job && this.state.job.title != "") {
			var image_list = data.image_list.map(function(image, i) {
				return <Img key={i} width="237" height="140" src={image.image} />
			})
			if (data.video) {
				image_list.push(<Img width="237" height="140" key={3} src={data.video.preview_image_list[0].image} />)
			}

			preview_html = (
				<div className="job-preview">
					<div className="iphone-screen">
						<div className="header"></div>
						<div className="image-slider">
							<Carousel decorators={CustomDecorators}>
								{image_list}
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
									<h2 className="iphone-section-title">{data.company.name}</h2>
									<h2 className="location">
										<i className="fa fa-map-marker" aria-hidden="true"></i> <span className="align-left">{data.address.city.name}</span>
									</h2>
									<div className="clear"></div>
								</div>
							</div>
							<div className="bottom-section">
								<h2 className="iphone-title">Diese Anzeige wurde zur Verfügung gestellt von:</h2>
								<img className="job-provider" src={require("../img/job-provider.png")} alt=""/>
							</div>
						</div>
					</div>
				</div>
			)
		var popupOptions = {
			title: "Anzeige uberprufen",
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
