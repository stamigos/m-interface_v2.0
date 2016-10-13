import React from 'react'
import ImageFileSelector from "react-image-select-component"
import { Link } from 'react-router'

//Stores
import JobStore from '../store/JobStore';

//Mixin
import mixins from 'es6-mixins';
import BackboneMixin from '../mixin/BackboneMixin';

//Actions
import AppActions from '../actions/AppActions';

import ModalAvatar from '../components/ModalAvatar'

function getField(state, field_name) {
	if (state.hasOwnProperty(field_name)) {
		if (state[field_name]) {
			return {result: true, name: field_name, value: state[field_name]}
		}
		return {result: false, name: null, value: null}
	}
	return {result: false, name: null, value: null}
}
function add_to_request(request_body, field) {
	if (field.result) {
		request_body[field.name] = field.value
	}
}
export default class Account extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			imgSrc: '',
			fieldsExpanded: false,
			isShowingModal: false,
			defaultValues: true,
			first_name: null,
			last_name: null,
			email: null,
			password: null,
			new_password: null,
			confirm_password: null,
			avatar: null,
			saved: false,
			password_changed: false
		}

		mixins(BackboneMixin,this);
		AppActions.getCurrentUser();
	}
	onChangePassword() {
		var self = this;
		if (this.state.fieldsExpanded){
			var headers = new Headers();
			headers.append("Content-Type", "application/json")
			headers.append("Authorization", "Token " + localStorage.token);
			var body = {}
			var password = getField(this.state, "password")
			var new_password = getField(this.state, "new_password")
			var confirm_password = getField(this.state, "confirm_password")

			body.old_password = password.value;
			body.new_password1 = new_password.value;
			body.new_password2 = confirm_password.value;
			console.log('body password:', body)

			var request = new Request(
			'http://dev.jobufo.com/api/auth/password/change/',
			{
				method: "POST",
				headers: headers,
				body: JSON.stringify(body)
			})
			fetch(request)
				.then(function(r) {
					return r.json();
				})
				.then(function(object) {
					self.setState({
						password_changed: true
					})
					console.log("password change:", object)
				})
		}
		else {
			console.log("expanded")
			this.setState({
				fieldsExpanded: true,
				defaultValues: false,
				password: ''
			})
		}
	}
	getCroppedImg(image) {
		this.setState({
			isShowingModal: false,
			avatar: image
		})
	}
	onSubmit(e) {
		console.log("e:", e.target)
		e.preventDefault();
		var self = this;
		var current_user = JobStore.get("currentUser");
		var ufouser_api_url = current_user.ufouser.api_url;
		var headers = new Headers();
		headers.append("Content-Type", "application/json")
		headers.append("Authorization", "Token " + localStorage.token);
		var body = {};
		var first_name = getField(this.state, 'first_name');
		var last_name = getField(this.state, 'last_name');
		var email = getField(this.state, 'email');

		add_to_request(body, first_name)
		add_to_request(body, last_name)
		add_to_request(body, email)

		var request = new Request(
			'http://dev.jobufo.com/api/auth/user/',
			{
				method: "PATCH",
				headers: headers,
				body: JSON.stringify(body)
			})
		fetch(request)
				.then(function(r) {
					return r.json();
				})
				.then(function(object) {
					var avatar_body = {};
					var avatar = getField(self.state, 'avatar');
					if (avatar.value) {
						avatar.value = avatar.value.split(",")[1]
					}
					add_to_request(avatar_body, avatar);
					console.log("avatar_body:", avatar_body)
					console.log("edit response:", object)
					var request = new Request(
					object.ufouser.api_url,
					{
						method: "PATCH",
						headers: headers,
						body: JSON.stringify(avatar_body)
					})
					fetch(request)
						.then(function(r) {
							return r.json();
						})
						.then(function(object) {
							console.log('avatar response:', object)
						})
				})
		this.setState({
			saved: true
		})
	}
	handleFirstNameChange(e) {
		this.setState({
			defaultValues: false, 
			first_name: e.target.value,
			saved: false
		})
		console.log(e.target.value)
	}
	handleLastNameChange(e) {
		this.setState({
			defaultValues: false,
			last_name: e.target.value,
			saved: false
		})
		console.log(e.target.value)
	}
	handleEmailChange(e) {
		this.setState({
			defaultValues: false,
			email: e.target.value,
			saved: false
		})
		console.log(e.target.value)
	}
	handlePasswordChange(e) {
		this.setState({
			defaultValues: false,
			password: e.target.value,
			saved: false
		})
		console.log(e.target.value)
	}
	handleNewPasswordChange(e) {
		this.setState({
			defaultValues: false,
			new_password: e.target.value,
			saved: false
		})
	}
	handleConfirmPasswordChange(e) {
		this.setState({
			defaultValues: false,
			confirm_password: e.target.value,
			saved: false
		})
	}
	onCancel() {
		this.setState({
			saved: false
		})
		window.location.reload();
	}
	render() {
		console.log("currentUser:", JobStore.get("currentUser"));
		console.log("currentUserLoading:", JobStore.get("currentUserLoading"));
		console.log("all:", JobStore)
		var currentUser = {};
		if (!JobStore.get("currentUserLoading")) {
			console.log('loading:', JobStore.get("currentUser"));
			currentUser = JobStore.get("currentUser");
		}

		return (
			<div className="container-account">
				<div className="post-job-content-header align-center">
					<h1 className="title">Mein Konto</h1>
				</div>
				<form onSubmit={this.onSubmit.bind(this)} action="/account" method="post" role="form" className="profile-settings-form" id="profile-settings-form">
					<div className="form-wrapper">
						<div id="profileAvatar-wrapper">
							<ModalAvatar imgSrc={this.state.imgSrc} model={JobStore} getCroppedImg={this.getCroppedImg.bind(this)} isShowingModal={this.state.isShowingModal} />
						</div>
						<div className="half">
							<label className="label" htmlFor="profileFirstName">Vorname</label>
							<input onChange={this.handleFirstNameChange.bind(this)} type="text" name="profileFirstName" id="profileFirstName" className="half" placeholder="Vorname" value={this.state.defaultValues ? (currentUser.first_name):(this.state.first_name)} />
						</div>
						<div className="half right">
							<label className="label" htmlFor="profileLastName">Nachname</label>
							<input onChange={this.handleLastNameChange.bind(this)} type="text" name="profileLastName" id="profileLastName" className="half" placeholder="Nachname" value={this.state.defaultValues ? (currentUser.last_name):(this.state.last_name)} />
						</div>
						<label className="label" htmlFor="profileEmail">Email</label>
						<input onChange={this.handleEmailChange.bind(this)} type="email" name="profileEmail" id="profileEmail" placeholder="Email" value={this.state.defaultValues ? (currentUser.email):(this.state.email)} />
						<label className="label" htmlFor="profileOldPassword">Passwort</label>
						<input onChange={this.handlePasswordChange.bind(this)} type="password" name="profileOldPassword" id="profileOldPassword" placeholder="Passwort" value={this.state.defaultValues ? ("**********"):(this.state.password)} />
						<div id="profileChangePassword">
							<div className={this.state.fieldsExpanded ? ("inner-content expanded"):("inner-content")}>
								<label className="label" htmlFor="profileNewPassword1">New Passwort</label>
								<input onChange={this.handleNewPasswordChange.bind(this)} type="password" name="profileNewPassword1" id="profileNewPassword1" placeholder="New Passwort" value={this.state.defaultValues ? (""):(this.state.new_password)} />
								<label className="label" htmlFor="profileNewPassword2">Confirm Passwort</label>
								<input onChange={this.handleConfirmPasswordChange.bind(this)} type="password" name="profileNewPassword2" id="profileNewPassword2" placeholder="Confirm Passwort" value={this.state.defaultValues ? (""):(this.state.confirm_password)} />
							</div>
						</div>
						{this.state.password_changed ? (
								<a id="profileChangePasswordButton" className="button-cv button-cv-full-red green">Changed</a>
							):(
								<a onClick={this.onChangePassword.bind(this)} id="profileChangePasswordButton" className="button-cv button-cv-full-red">Change Password</a>
							)}
				</div>
				<div className="buttons">
					<div className="form-wrapper">
						{this.state.saved ? (
								<input type="submit" name="submit" className="button-cv button-cv-full-red green" value="SAVED" />
							):(
								<input type="submit" name="submit" className="button-cv button-cv-full-red" value="SAVE" />
							)}
						<Link to="account" href="#" onClick={this.onCancel.bind(this)} className="button-cv button-cv-transperent clear_settings_form">Abbrechen</Link>
						<div className="clear"></div>
					</div>
				</div>
			</form>
			</div>
		);
	}
}
			// <ModalAvatar isShowingModal={this.state.isShowingModal} imgSrc={this.state.imgSrc}/>
