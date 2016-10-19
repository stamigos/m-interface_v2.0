import React from 'react'
import HelpPopup from './HelpPopup'


export default class NormalTopJob extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpenPopup: false,
			isTopJob: false
		}
		this.switchJobToNormal = this.switchJobToNormal.bind(this);
		this.switchJobToTop = this.switchJobToTop.bind(this);
		this.togglePopup = this.togglePopup.bind(this);
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
					<amount><span>3</span> / 10 available</amount>

					<img src={require('../../img/jobtype_top.png')} />
					<i className="fa fa-question-circle" aria-hidden="true" onClick={this.togglePopup}></i>
				</div>
				{popup}
			</div>
		);
	}
}