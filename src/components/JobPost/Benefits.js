import React from 'react'


export default class Benefits extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			benefit1: 0,
			benefit2: 0
		}
		this.changeBenefit1 = this.changeBenefit1.bind(this);
		this.changeBenefit2 = this.changeBenefit2.bind(this);
	}
	changeBenefit1(event) {
		var number = event.target.value.length;
		this.setState({benefit1: number});
	}
	changeBenefit2(event) {
		var number = event.target.value.length;
		this.setState({benefit2: number});
	}

	render() {
		var number = this.state.benefit1 + this.state.benefit2;

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