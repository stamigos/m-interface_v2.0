import React from 'react'


export default class Benefits extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			benefit1: '',
			benefit2: ''
		}
		this.changeBenefit1 = this.changeBenefit1.bind(this);
		this.changeBenefit2 = this.changeBenefit2.bind(this);
	}
	changeBenefit1(event) {
		this.setState({
			benefit1: event.target.value
		});
		this.props.changeBenefit1(event.target.value);
	}
	changeBenefit2(event) {
		this.setState({
			benefit2: event.target.value
		});
		this.props.changeBenefit2(event.target.value);
	}

	render() {
		var number = this.state.benefit1.length + this.state.benefit2.length;

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