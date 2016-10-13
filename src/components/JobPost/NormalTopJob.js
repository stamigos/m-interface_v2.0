import React from 'react'
import HelpPopup from './HelpPopup'


export default class NormalTopJob extends React.Component {
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
		if (this.state.isOpenPopup) popup = <HelpPopup />;

		return(
			<div className="JobType">
					<p className="label">Welche Art von Job möchtest du veröffentlichen?</p>
					<input type="radio" className="" name="Type" value="false" />
					<input type="radio" className="" name="Type" value="true" />
					
				<div className={this.state.isActiveNormal ? 'box selected' : 'box'} onClick={this.selectActiveNormal}>
					<b>Normaler Job</b>
					unlimited
				</div>
				<div id="topjob"className={this.state.isActiveTop ? 'box selected' : 'box'} onClick={this.selectActiveTop}>
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