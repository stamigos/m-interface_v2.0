import React from 'react';

import '../login-registration.css';

export default class Login extends React.Component {
	constructor() {
		super();
		delete localStorage.token
		this.state = this.getState()
	}
	getState() {
		return {
			email: "",
			password: "",
			errors: false
		}
	}
	onChange(e) {
		console.log("changed!")
	    var state = {};
    	state[e.target.name] =  $.trim(e.target.value);
    	this.setState(state);
	}
	onSubmit(e) {
		var self = this;
		e.preventDefault();
		var headers = new Headers();
		headers.append("Content-Type", 'application/json');
		var request = new Request(
			'http://dev.jobufo.com/api/auth/login/', 
			{
				method: "POST", 
			 	headers: headers, 
			 	body: JSON.stringify({
			 		email: this.state.email, 
			 		password: this.state.password
			 	})
		    });

		fetch(request)
			  .then(function(response) {
			  	console.log('then1:', response)
			    return response.json();
			   })
			  .then(function(obj) {
			  	if (obj.key != undefined){
			  		localStorage.token = obj.key
			  		window.location.reload()
			  		console.log('then2:', obj)
			  	}
			  	else {
			  		self.setState({
			  			errors: true
			  		})
			  	}
			  	});
	}
	render() {
		return (
			<div className="login-registration-wrapper">
				<div className="logo">
					<a href="/"><img src={require("../img/job-ufo-logo.png")}/></a>
				</div>
				<section id="login-registration-popup" className="popup">
					<div className="popup-window">
						<div className="popup-header align-center ">
							<h2 className="popup-title">Einloggen</h2>
						</div>
						<div className="popup-content">
							<form onSubmit={this.onSubmit.bind(this)} action="/jobs" method="POST" role="form" className="login-registration-popup-form" id="login-popup-form">
								<input onChange={this.onChange.bind(this)} type="email" className={this.state.errors ? ("input-error"):("")} id="Email" name="email" placeholder="Email" required="required"/>
								<input onChange={this.onChange.bind(this)} type="password" className={this.state.errors ? ("input-error"):("")} id="Password" name="password" placeholder="Passwort" required="required"/>
								<div className="clear"></div>
								<a className="forgot" href="forgot_password.html">Passwort vergessen?</a>
								<input type="submit" id="call_me_submit" className="button button-pop button-pop-red" value="LOGIN"/>
								<div className="clear"></div>
							</form>
						</div>
					</div>
				</section>
				<div className="after-form">
					<h2 >Don’t have an account yet? <a className="sing-up" href="sign-up.html">Sign Up</a></h2>
				</div>
			</div>
		);
	}
}