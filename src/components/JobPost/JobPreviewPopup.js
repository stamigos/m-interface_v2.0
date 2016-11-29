import React from 'react'
import Carousel from 'nuka-carousel'
import Img from 'react-image-load'
import Video from 'react-html5video'

//Mixin
import mixins from 'es6-mixins';
import BackboneMixin from '../../mixin/BackboneMixin';

import CustomDecorators from '../JobPreviewDecorators'
import CustomDecoratorsLarge from '../JobPreviewDecoratorsLarge'
import Popup from '../Popup'
import '../../JobPreview.css'

function resize() {
	var resize = new Event("resize");
	setTimeout(function() {
		window.dispatchEvent(resize);
	}, 1000);
}

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
		var subsidiary = this.props.subsidiary;
		if (data.image_list) {
			var image_list = data.image_list.map(function(image, i) {
				return <img className="image-slider-img" key={i} src={image.image} />
			});
		}
		if (data.video) {
			image_list.unshift(
					<div className="video-container">
						<Video>
							<source type="video/mp4" src={"data:video/mp4;base64," + data.video.video} /> 
							<source type="video/ogg" src={"data:video/ogg;base64," + data.video.video} /> 
							<source type="video/webm" src={"data:video/webm;base64," + data.video.video} />
						</Video>
						<div className="video-controls">
							<img width="30" height="30" src={require("../../img/play-button.png")} />
							<img width="30" height="30" src={require("../../img/360.png")} />
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
								{subsidiary.company ? (
									<div className="company">{subsidiary.company.name}</div>
								) : null}
								<div className="place">{data.address.city.name}</div>
								{subsidiary.company ? (
									<div className="avatar">
										<img src={subsidiary.company.logo} alt="" />
									</div>
								) : null}
							</div>
							{data.image_list && data.image_list[0] != null ? (
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
									<img src={require("../../img/video.jpg")} />
								</div>
							</div>
							<div className="image" style={{backgroundImage: "url("+require('../../img/android.jpg')+")"}}>
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
						<Carousel onShow={resize()} decorators={CustomDecorators} className="image-slider-carousel">
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
										<img width="15" src={require("../../img/popup-salary.png")}/>
										<div className="text">{data.payment}</div>
										<div className="clear"></div>
									</li>
								) : null}
								{data.kind ? (
									<li>
										<img width="15" src={require("../../img/popup-type.png")}/>
										<div className="text">{data.kind}</div>
										<div className="clear"></div>
									</li>
								) : null}
								{data.address.city.name ? (
									<li>
										<img width="15" src={require("../../img/popup-location.png")}/>
										<div className="text">{data.address.city.name}</div>
										<div className="clear"></div>
									</li>
								) : null}
								{data.working_hours ? (
									<li>
										<img width="15" src={require("../../img/popup-time.png")}/>
										<div className="text">{data.working_hours}</div>
										<div className="clear"></div>
									</li>
								) : null}
								{data.benefit_1 ? (
									<li>
										<img width="15" src={require("../../img/popup-benefit1.png")}/>
										<div className="text">{data.benefit_1}</div>
										<div className="clear"></div>
									</li>
								) : null}
								{data.benefit_2 ? (
									<li>
										<img width="15" src={require("../../img/popup-benefit2.png")}/>
										<div className="text">{data.benefit_2}</div>
										<div className="clear"></div>
									</li>
								) : null}
								{data.top_job ? (
									<li>
										<img width="15" src={require("../../img/popup-top.png")}/>
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
							{subsidiary.company ? (
								<div className="image-left">
									<img src={subsidiary.company.logo} width="45" height="45" alt="" />
								</div>
							) : null}
							<div className="text-right">
								{subsidiary.company ? (
									<h3 className="iphone-section-title">{subsidiary.company.name}</h3>
								) : null}
								{data.address ? (
									<h3 className="description-location">
										<i className="fa fa-map-marker" aria-hidden="true"></i> <span className="align-left">{data.address.city.name}</span>
									</h3>
								) : null}
								{subsidiary.company && subsidiary.company.category ? (
									<h3 className="description-category">{subsidiary.company.category.name}</h3>
								) : null}
							</div>
							<div className="clear"></div>
						</div>
						<div className="bottom-section">
							<h3 className="iphone-title">Diese Anzeige wurde zur Verfügung gestellt von:</h3>
							<img className="job-provider" src={require("../../img/job-provider.png")} alt=""/>
						</div>
					</div>
				</div>
			</Carousel>
		)
	}
});

export default class JobPreviewPopup extends React.Component {
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
				benefit_1: '',
				benefit_2: '',
				publication_date: ''
			},
			subsidiary: {
				company: {
					name: ''
				}
			}
		}
	}
	post_job() {
		console.log("post job")
		console.log("form_data:", this.state.form_data)
		var headers = new Headers();
		headers.append("Content-Type", "application/json")
		headers.append("Authorization", "Token " + localStorage.token);
		var request = new Request(
			'http://dev.jobufo.com/api/v1/recruiting/vacancy/',
			{
				method: this.state.method,
				headers: headers,
				body: JSON.stringify(this.state.form_data)
			}
		);
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
   
	render() {
		console.log("data:", this.state.form_data);
		console.log("subsidiary:", this.state.subsidiary);
		var preview_html = (
				<div className="job-preview">
					<div className="iphone-screen">
						<CarouselLarge job={this.state.form_data} subsidiary={this.state.subsidiary} />
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