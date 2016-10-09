import React from 'react'
import UserAvatar from 'react-user-avatar'
import ImageFileSelector from "react-image-select-component"
import ModalAvatar from '../components/ModalAvatar'
import Popup from '../components/Popup'

export default class Account extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowingModal: false,
			imgSrc: '',
			fieldsExpanded: false
		}
		this.selectImage = this.selectImage.bind(this);
	}
	onInvalidImage() {
		console.log("invalid image")
	}
	onRemoveImage() {
		console.log("onRemoveImage")
	}
	async selectImage() {
		var self = this;
		this.setState({
			isShowingModal: true
		})
	  // Assuming only image
	  var file = this.refs.file.files[0];
	  console.log("refs:", this.refs.file.files[0])
	  var reader = new FileReader();
	  var url = reader.readAsDataURL(file);

   		reader.onloadend = function (e) {
   			console.log("imgSrc:", [reader.result])
   			self.setState({
   				imgSrc: reader.result
   			})
	    }.bind(this);
	  console.log('image-url:', url) // Would see a path?
	}
	onChangePassword() {
		if (this.state.fieldsExpanded){
			console.log("in change password")
		}
		else {
			console.log("expanded")
			this.setState({fieldsExpanded: true})
		}
	}
	render() {
		var htmlContent = <ModalAvatar imgSrc={this.state.imgSrc}/>
		var popupOptions = {
			title: "Foto auswählen und bearbeiten",
			subtitle: "",
			isShowingModal: this.state.isShowingModal,
			button: {left: "HOCHLADEN", right: "ABBRECHEN"},
			htmlContent: htmlContent,
			onLeftClick: function() { this.setState({isShowingModal: false}) },
			onRightClick: function() { this.setState({isShowingModal: false}) }
		}
		return (
			<div className="container-account">
				<div className="post-job-content-header align-center">
					<h1 className="title">Mein Konto</h1>
				</div>
				<form action="" method="post" role="form" className="profile-settings-form" id="profile-settings-form">
				<div className="form-wrapper">
					<div id="profileAvatar-wrapper">
						<div id="profileAvatar">
							<div className="img">
          				 		<UserAvatar size="100" name="User" src="http://dev.jobufo.com/media/avatars/a29002ff-1e8.png"/>
							</div>
						</div>
						<label className="imageUpload">
							<div>
								<i className="fa fa-camera" aria-hidden="true"></i>
							</div>
							      <input ref="file" type="file" className="imageUpload" onChange={this.selectImage}/>

						</label>
					</div>
					<div className="half">
						<label className="label" htmlFor="profileFirstName">Vorname</label>
						<input type="text" name="profileFirstName" id="profileFirstName" className="half" placeholder="Vorname" />
					</div>
					<div className="half right">
						<label className="label" htmlFor="profileLastName">Nachname</label>
						<input type="text" name="profileLastName" id="profileLastName" className="half right" placeholder="Nachname" />
					</div>
					<label className="label" htmlFor="profileEmail">Email</label>
					<input type="email" name="profileEmail" id="profileEmail" placeholder="Email" />
					<label className="label" htmlFor="profileOldPassword">Passwort</label>
					<input type="password" name="profileOldPassword" id="profileOldPassword" placeholder="Passwort" value="**********" disabled />
					<div id="profileChangePassword">
						<div className={this.state.fieldsExpanded ? ("inner-content expanded"):("inner-content")}>
							<label className="label" htmlFor="profileNewPassword1">New Passwort</label>
							<input type="password" name="profileNewPassword1" id="profileNewPassword1" placeholder="New Passwort" />
							<label className="label" htmlFor="profileNewPassword2">Confirm Passwort</label>
							<input type="password" name="profileNewPassword2" id="profileNewPassword2" placeholder="Confirm Passwort" />
						</div>
					</div>
					<a onClick={this.onChangePassword.bind(this)} id="profileChangePasswordButton" className="button-cv button-cv-full-red">Change Password</a>
				</div>
				<div className="buttons">
					<div className="form-wrapper">
						<input type="submit" name="submit" className="button-cv button-cv-full-red" value="SAVE" />
						<a href="#" className="button-cv button-cv-transperent clear_settings_form">Abbrechen</a>
						<div className="clear"></div>
					</div>
				</div>
			</form>
				<Popup {...popupOptions}/>
			</div>
		);
	}
}
			// <ModalAvatar isShowingModal={this.state.isShowingModal} imgSrc={this.state.imgSrc}/>
