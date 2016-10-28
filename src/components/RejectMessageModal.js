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


export default class RejectMessageModal extends React.Component {
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
			application: nextProps.application
		})
	}
	reject() {
		var body = {};
		var application = this.state.application;
		if (application) {
			body.application = application.api_url;
			console.log("body request:", body)

		var headers = new Headers();
			headers.append("Content-Type", "application/json")
			headers.append("Authorization", "Token " + localStorage.token);
		var request = new Request(
			"http://dev.jobufo.com/api/v1/messaging/declination-message/",
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
					<h2 className="form-title">Are you sure that you want to reject the applicant?</h2>
				</form>);
		var popupOptions = {
			title: "Reject Applicant",
			subtitle: "",
			isShowingModal: this.state.isShowingModal,
			button: {left: "REJECT", right: "ABBRECHEN"},
			htmlContent: htmlContent,
			contentClassName: "popup-content",
			onLeftClick: function() {
				this.reject();
				this.props.close();
			}.bind(this),
			onRightClick: function() { this.props.close() }.bind(this)
		}
		return (
				<Popup {...popupOptions} />
		);
	}
}