import React from 'react'
import Popup from '../components/Popup'
import '../CloseJobModal.css'


export default class CloseJobModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowingModal: props.show
		}
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			isShowingModal: nextProps.show
		})
	}
	close() {
		var self = this;
		var headers = new Headers();
		headers.append("Content-Type", "application/json")
		headers.append("Authorization", "Token " + localStorage.token);
		var request = new Request(
			'http://dev.jobufo.com/api/v1/recruiting/vacancy/'+this.props.selectedJob.pk+'/',
			{
				method: "PATCH",
				headers: headers,
				body: JSON.stringify({
					is_active: false
				})
			})
		fetch(request)
				.then(function(r) {
					return r.json();
				})
				.then(function(result) {
					console.log('close result:', result)
					self.props.cancel();
					self.props.updateList(true)
				})
	}
	cancel() {
		this.props.cancel();
	}
	render() {
		var popupOptions = {
			title: "Anzeige deaktivieren",
			subtitle: "",
			isShowingModal: this.state.isShowingModal,
			button: {left: "Anzeige schließen", right: "ABBRECHEN"},
			htmlContent: <h2 className="form-title">Bist du sicher, dass du die Anzeige schließen möchtest?</h2>,
			onLeftClick: this.close.bind(this),
			onRightClick: this.cancel.bind(this)
		}
		return (
			<div>
				<Popup {...popupOptions} />
			</div>
		);
	}
}