import React from 'react'
import { IndexLink } from 'react-router'


export default class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
				first_name: '',
				last_name: '',
				gender: '',
				role: '',
				company_name: '',
				subsidiary_location: '',
				email: '',
				phone_number: '',
				password1: '',
				password2: '',
				confirm: true
		}
		this.handleFieldChange = this.handleFieldChange.bind(this);
	}
	handleFieldChange(e) {
		var state = {}
		state[e.target.name] = e.target.value
		this.setState(state)
	}
	onSubmit(e) {
		var self = this;
		var body = this.state;
		console.log("form_data:", body)
		e.preventDefault();
		var headers = new Headers();
		headers.append("Content-Type", 'application/json');
		var request = new Request(
			'http://dev.jobufo.com/api/auth/signup/', 
			{
				method: "POST", 
			 	headers: headers, 
			 	body: JSON.stringify(body)
		    });

		fetch(request)
			  .then(function(response) {
			    return response.json();
			   })
			  .then(function(obj) {
				  	if (obj.key != undefined){
				  		localStorage.token = obj.key
				  		window.location.reload()
				  	}
			  	});
	}
	render() {
		return (
				<div className="login-registration-wrapper">
					<div className="logo">
						<a href="index.html"><img src={require("../img/logo.png")}/></a>
					</div>
					<section id="login-registration-popup" className="popup">
						<div className="popup-window">
							<div className="popup-header align-center ">
								<h2 className="popup-title">Sign Up</h2>
							</div>
							<div className="popup-content">
								<form onSubmit={this.onSubmit.bind(this)} action="" method="POST" role="form" className="login-registration-popup-form" id="registration-popup-form">
									<div className="half">
										<input onChange={this.handleFieldChange} type="text" className="half" name="first_name" id="FirstName" placeholder="First Name"/>
									</div>
									<div className="half right">
										<input onChange={this.handleFieldChange} type="text" className="half right" id="LastName" name="last_name" placeholder="Last Name"/>
									</div>
									<div className="clear"></div>
									<div className="half">
										<select onChange={this.handleFieldChange} className="half" name="gender" id="Gender" required>
											<option value="F">Female</option>
											<option value="M">Male</option>
											<option value="O">Other</option>
										</select>
									</div>
									<div className="half right">
										<select onChange={this.handleFieldChange} className="half right" name="role" id="Role" required="required">
											<option value="">Role</option>
											<option value="APPLICANT">Applicant</option>
											<option value="RECRUITER">Recruiter</option>
										</select>
									</div>
									<input onChange={this.handleFieldChange} type="text" className="" name="company_name" id="Company" placeholder="Company"/>
									<input onChange={this.handleFieldChange} type="text" className="" name="subsidiary_location" id="SubsidiaryLocation" placeholder="Subsidiary Location"/>
									<input onChange={this.handleFieldChange} type="email" className="" id="Email" name="email" placeholder="E-mail" required/>
									<input onChange={this.handleFieldChange} type="tel" className="" id="Phone" name="phone_number" placeholder="Phone"/>
									<input onChange={this.handleFieldChange} type="password" className="" id="Password" name="password1" placeholder="Password" required/>
									<input onChange={this.handleFieldChange} type="password" className="" id="RepeatPassword" name="password2" placeholder="Repeat Password" required/>
									<input type="checkbox" name="confirm" id="Confirm" required/><label className="label-for-check" htmlFor="Confirm">I confirm to jobUFOs policies</label>
									<input type="submit" id="call_me_submit" className="button button-pop button-pop-red" value="SIGN UP"/>
									<div className="clear"></div>
								</form>
							</div>
						</div>
					</section>
					<div className="after-form">
						<h2>Already have an account? <IndexLink className="sing-up" to="login">Login</IndexLink></h2>
					</div>
				</div>
		);
	}
}