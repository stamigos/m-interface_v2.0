// <form action="" method="POST" role="form" class="form-popup" id="message_popup-form">
// 	<h2 class="form-title">Der Bewerber erfährt erst von Ihrem Interesse, wenn Sie eine kurze Nachricht senden. Nutzen Sie die Gelegenheit und nehmen Sie jetzt persönlich Kontakt auf. Nachdem Sie die Nachricht abgeschickt haben, tauschen wir die Kontaktdaten zusätzlich per E-Mail aus. Viel Erfolg!</h2>
// 	<label class="job-post-label-big " for="MessageBody">Nachricht</label>
// 	<input type="hidden" name="accept_applicant_id" id="accept_applicant_id">
// 	<textarea name="MessageBody" id="MessageBody" data-autoresize rows="5"></textarea>
// 	<div class="buttons">
// 		<input type="submit" name="submit" class="button-cv button-cv-full-red" value="Senden">
// 		<a href="#" class="button-cv button-cv-transperent close_popup1">Abbrechen</a>
// 		<div class="clear"></div>
// 	</div>
// 	<div class="clear"></div>
// </form>
import React from 'react'

import Popup from '../components/Popup'


export default class AcceptMessageModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowingModal: false,
			message: ""
		}
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			isShowingModal: nextProps.isShowingModal,
			application: nextProps.application,
			full_application: nextProps.full_application
		})
	}
	sendMessage() {
		var body = {};
		var application = this.state.application;
		var full_application = this.state.full_application;
		if (application && full_application) {
			body.subsidiary = full_application.vacancy.company.subsidiary.api_url;
			body.applicant = application.owner.api_url;
			body.email = application.owner.email;
			body.phone = application.phone || "1234567890";
			body.application = application.api_url;
			body.description = this.state.message;
			console.log("body request:", body)

		var headers = new Headers();
			headers.append("Content-Type", "application/json")
			headers.append("Authorization", "Token " + localStorage.token);
		var request = new Request(
			"http://dev.jobufo.com//api/v1/messaging/contact-message/",
			{
				method: "POST",
				headers: headers,
				body: JSON.stringify(body)
			})
			fetch(request)
				.then(function(r) {
					console.log("r:", r)
					return r.json();
				})
				.then(function(object) {
					console.log('response:', object)
				})
		}
	}
	handleMessageChange(e) {
		this.setState({
			message: e.target.value
		})
	}
	render() {
		var self = this;
		var htmlContent = (			
				<form method="POST" role="form" className="form-popup" id="message_popup-form">
					<h2 className="form-title">Der Bewerber erfährt erst von Ihrem Interesse, wenn Sie eine kurze Nachricht senden. Nutzen Sie die Gelegenheit und nehmen Sie jetzt persönlich Kontakt auf. Nachdem Sie die Nachricht abgeschickt haben, tauschen wir die Kontaktdaten zusätzlich per E-Mail aus. Viel Erfolg!</h2>
					<label className="job-post-label-big " htmlFor="MessageBody">Nachricht</label>
					<textarea onChange={this.handleMessageChange.bind(this)} name="MessageBody" id="MessageBody" data-autoresize rows="5"></textarea>
				</form>);
		var popupOptions = {
			title: "Bestatigen und Nachricht senden an "+this.props.first_name+" "+this.props.last_name,
			subtitle: "",
			isShowingModal: this.state.isShowingModal,
			button: {left: "SENDEN", right: "ABBRECHEN"},
			htmlContent: htmlContent,
			contentClassName: "popup-content",
			onLeftClick: function() {
				this.sendMessage();
				this.props.close();
			}.bind(this),
			onRightClick: function() { this.props.close() }.bind(this)
		}
		return (
				<Popup {...popupOptions} />
		);
	}
}