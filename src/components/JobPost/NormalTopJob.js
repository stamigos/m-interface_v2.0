import React from 'react'
import HelpPopup from './HelpPopup'


export default class NormalTopJob extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpenPopup: false,
			isTopJob: false,
			top_current: null,
			top_max: null,
		}
		this.switchJobToNormal = this.switchJobToNormal.bind(this);
		this.switchJobToTop = this.switchJobToTop.bind(this);
		this.togglePopup = this.togglePopup.bind(this);
		this.getTopJobCurrentMax.bind(this)();
	}
	getTopJobCurrentMax() {
		var self = this;
		var headers = new Headers()
		headers.append("Authorization", "Token " + localStorage.token);
		var request = new Request(
			'http://dev.jobufo.com/api/v1/management/vacancy/',
			{
				method: 'GET',
				headers: headers
			})
		fetch(request)
			.then(function(r) {
				return r.json()
			})
			.then(function(objects) {
				console.log("objects:", objects)
				self.setState({
					top_current: objects[0].company.top_jobs.current,
					top_max: objects[0].company.top_jobs.max
				})
			})

	}
	switchJobToNormal() {
		this.setState({
			isTopJob: false
		});
		this.props.switchJobType(false)
	}
	switchJobToTop() {
		this.setState({
			isTopJob: true
		});
		this.props.switchJobType(true)
	}
	togglePopup() {
		this.setState({
			isOpenPopup: !this.state.isOpenPopup
		});
	}
	render() {
		var popup;
		if (this.state.isOpenPopup) popup = <HelpPopup />;

		return(
			<div className="JobType">
					<p className="label">Welche Art von Job möchtest du veröffentlichen?</p>
					<input type="radio" className="" name="Type" value="false" />
					<input type="radio" className="" name="Type" value="true" />
					
				<div className={!this.state.isTopJob ? 'box selected' : 'box'} onClick={this.switchJobToNormal}>
					<b>Normaler Job</b>
					unlimited
				</div>
				<div id="topjob"className={this.state.isTopJob ? 'box selected' : 'box'} onClick={this.switchJobToTop}>
					<b>Top Job</b>
					<amount><span>{this.state.top_current}</span> / {this.state.top_max} available</amount>

					<img src={require('../../img/jobtype_top.png')} />
					<i className="fa fa-question-circle" aria-hidden="true" onClick={this.togglePopup}></i>
				</div>
				{popup}
			</div>
		);
	}
}