import React from 'react'
import Carousel from 'nuka-carousel'
import Img from 'react-image-load'
import Video from 'react-html5video'

//Mixin
import mixins from 'es6-mixins';
import BackboneMixin from '../mixin/BackboneMixin';

import CustomDecorators from './JobPost/JobPreviewDecorators'
import CustomDecoratorsLarge from './JobPost/JobPreviewDecoratorsLarge'
import Popup from './Popup'
import '../JobPreview.css'

const CarouselLarge = React.createClass({
	mixins: [Carousel.ControllerMixin],
	
	handlesNext(event) {
		event.preventDefault();
		this.refs.carousel.nextSlide();
	},
	
	handlesPrev(event) {
		event.preventDefault();
		this.refs.carousel.previousSlide();
	},

	render() {
		var data = this.props.job;
		var image_list = data.image_list.map(function(image, i) {
			return <img className="image-slider-img" key={i} src={image.image} />
		});
		if (data.video) {
			image_list.unshift(
				<div className="video-container">
					<img className="image-slider-img" key={3} src={data.video.preview_image_list[0].image} />
					<div className="video-controls">
						<img width="30" height="30" src={require("../img/play-button.png")} />
						<img width="30" height="30" src={require("../img/360.png")} />
					</div>
				</div>
			)
		}

		return (
			<Carousel decorators={CustomDecoratorsLarge} dragging={false} ref="carousel">
				<div className="left-iphone-screen">
					<div className="header-left"></div>
					<div className="body-left">
						<div className="box">
							<div className="info">
								<div className="name name-clickable" onClick={(e)=>this.handlesNext(e)}>{data.title}</div>
								<div className="company">{data.company.name}</div>
								<div className="place">{data.address.city.name}</div>
								<div className="avatar">
									<img src={data.company.logo} />
								</div>
							</div>
							{data.image_list[0] != null ? (
								<div className="image" style={{backgroundImage: "url("+data.image_list[0].image+")"}} >
									<div className="benefs">
										{data.benefit_1 ? (
											<div className="ben">{data.benefit_1}</div>
										) : null}
										{data.benefit_2 ? (
											<div className="ben">{data.benefit_1}</div>
										) : null}
										<div className="clear"></div>
									</div>
								</div>
							) : (
								<div className="image">
									<div className="benefs">
										{data.benefit_1 ? (
											<div className="ben">{data.benefit_1}</div>
										) : null}
										{data.benefit_2 ? (
											<div className="ben">{data.benefit_1}</div>
										) : null}
										<div className="clear"></div>
									</div>
								</div>
							)}
						</div>
						<div className="box">
							<div className="info">
								<div className="name">Android Developer</div>
								<div className="company">JobUFO Team</div>
								<div className="place">Berlin, Germany</div>
								<div className="avatar">
									<img src={require("../img/video.jpg")} />
								</div>
							</div>
							<div className="image" style={{backgroundImage: "url("+require('../img/android.jpg')+")"}}>
								<div className="benefs">
									<div className="ben">300€ bonus</div>
									<div className="ben">35 vacations days</div>
									<div className="clear"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="right-iphone-screen">
					<div className="header-right">
						<div className="arrow-back" onClick={(e)=>this.handlesPrev(e)}></div>
					</div>
					<div className="image-slider">
						<Carousel decorators={CustomDecorators} className="image-slider-carousel">
							{image_list}
						</Carousel>
					</div>
					<div className="body-right">
						<div className="title-section">
							<h2 className="job_preview-title">{data.title}</h2>
							{data.vacancy_start ? (
								<h3 className="job_preview-subtitle">Zeitraum: {data.vacancy_start}</h3>
							) : null}
						</div>
						<div className="options-section">
							<ul>
								{data.payment ? (
									<li>
										<img width="15" src={require("../img/popup-salary.png")}/>
										<div className="text">{data.payment}</div>
										<div className="clear"></div>
									</li>
								) : null}
								{data.kind ? (
									<li>
										<img width="15" src={require("../img/popup-type.png")}/>
										<div className="text">{data.kind}</div>
										<div className="clear"></div>
									</li>
								) : null}
								{data.address.city.name ? (
									<li>
										<img width="15" src={require("../img/popup-location.png")}/>
										<div className="text">{data.address.city.name}</div>
										<div className="clear"></div>
									</li>
								) : null}
								{data.working_hours ? (
									<li>
										<img width="15" src={require("../img/popup-time.png")}/>
										<div className="text">{data.working_hours}</div>
										<div className="clear"></div>
									</li>
								) : null}
								{data.benefit_1 ? (
									<li>
										<img width="15" src={require("../img/popup-benefit1.png")}/>
										<div className="text">{data.benefit_1}</div>
										<div className="clear"></div>
									</li>
								) : null}
								{data.benefit_2 ? (
									<li>
										<img width="15" src={require("../img/popup-benefit2.png")}/>
										<div className="text">{data.benefit_2}</div>
										<div className="clear"></div>
									</li>
								) : null}
								{data.top_job ? (
									<li>
										<img width="15" src={require("../img/popup-top.png")}/>
										<div className="text">Top job</div>
										<div className="clear"></div>
									</li>
								) : null}
							</ul>
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
								{data.company.category ? (
									<h3 className="description-category">{data.company.category.name}</h3>
								) : null}
								<div className="description-links">
									<ul>
										<li className="description-links-item">
											<img width="30" src={require("../img/iphone-mail.png")} alt="" />
										</li>
										<li className="description-links-item">
											<img width="30" src={require("../img/iphone-facebook.png")} alt="" />
										</li>
										<li className="description-links-item">
											<img width="30" src={require("../img/iphone-youtube.png")} alt="" />
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
			</Carousel>
		)
	}
});

export default class JobPreviewPopup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			job: null
		}
		mixins(BackboneMixin,this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			job: nextProps.job
		})
	}

	render() {
		var data = this.state.job;
		console.log("data:", this.props.job)
		
		var preview_html = <div></div>

		if (this.state.job && this.state.job.title != "") {
			preview_html = (
				<div className="job-preview">
					<div className="iphone-screen">
						<CarouselLarge job={this.state.job} />
					</div>
				</div>
			);

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

// <ul className="options-section-half ul-left">
// 	{data.payment != "" ? (
// 		<li>
// 			<img width="15" src={require("../img/popup-salary.png")}/>
// 			<div className="text">{data.payment}</div>
// 			<div className="clear"></div>
// 		</li>
// 	) : null}
// 	{data.kind != "" ? (
// 		<li>
// 			<img width="15" src={require("../img/popup-type.png")}/>
// 			<div className="text">{data.kind}</div>
// 			<div className="clear"></div>
// 		</li>
// 	) : null}
// 	{data.address.city.name != "" ? (
// 		<li>
// 			<img width="15" src={require("../img/popup-location.png")}/>
// 			<div className="text">{data.address.city.name}</div>
// 			<div className="clear"></div>
// 		</li>
// 	) : null}
// 	{data.working_hours != "" ? (
// 		<li>
// 			<img width="15" src={require("../img/popup-time.png")}/>
// 			<div className="text">{data.working_hours}</div>
// 			<div className="clear"></div>
// 		</li>
// 	) : null}
// </ul>
// <ul className="options-section-half ul-right">
// 	{data.benefit_1 != "" ? (
// 		<li>
// 			<img width="15" src={require("../img/popup-benefit1.png")}/>
// 			<div className="text">{data.benefit_1}</div>
// 			<div className="clear"></div>
// 		</li>
// 	) : null}
// 	{data.benefit_2 != "" ? (
// 		<li>
// 			<img width="15" src={require("../img/popup-benefit2.png")}/>
// 			<div className="text">{data.benefit_2}</div>
// 			<div className="clear"></div>
// 		</li>
// 	) : null}
// 	{data.top_job ? (
// 		<li>
// 			<img width="15" src={require("../img/popup-top.png")}/>
// 			<div className="text">Top job</div>
// 			<div className="clear"></div>
// 		</li>
// 	) : null}
// </ul>