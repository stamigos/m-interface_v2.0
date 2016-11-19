import React from 'react'


export default class Benefits extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			benefit1: this.props.benefit1 || '',
			benefit2: this.props.benefit2 || '',
			number: 0
		}
		this.changeBenefit1 = this.changeBenefit1.bind(this);
		this.changeBenefit2 = this.changeBenefit2.bind(this);
		this.changeNumber = this.changeNumber.bind(this);
	}
	changeBenefit1(event) {
		this.setState({
			benefit1: event.target.value,
			number: event.target.value.length
		});
		this.props.changeBenefit1(event.target.value);
	}
	changeBenefit2(event) {
		this.setState({
			benefit2: event.target.value,
			number: event.target.value.length
		});
		this.props.changeBenefit2(event.target.value);
	}
	changeNumber(event) {
		this.setState({
			number: event.target.value.length
		});
	}

	render() {
		return (
			<div className="benefits">
				<div className="half Benefit">
					<input value={this.state.benefit1} onClick={this.changeNumber} onChange={this.changeBenefit1} type='text' maxLength='35' className="half benefit_1" placeholder="Job Vorteil 1" name="benefit_1" />
					<p>Maximale Zeichen: 35</p>
				</div>
				<div className="half right Benefit">
					<input value={this.state.benefit2} onClick={this.changeNumber} onChange={this.changeBenefit2} type='text' maxLength='35' className="half right benefit_2" placeholder="Job Vorteil 2" name="benefit_2"  />
					<p><b>{this.state.number}</b> / 35</p>
				</div>
				<div className="clear"></div>
			</div>
		);
	}
}