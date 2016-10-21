import React from 'react'


export default class ManagerForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fullname: '',
			email: '',
			managerForm: false,
			addManagerButton: true,
			submitManagerForm: false,
			count: this.props.managersCount
		}
		console.log("number:", typeof(this.props.number))
		this.submit = this.submit.bind(this);
	}
	handleNameChange(e) {
		this.setState({
			fullname: e.target.value
		})
	}
	handleEmailChange(e) {
		this.setState({
			email: e.target.value
		})
	}
	addManagerForm() {
		this.props.getOperation("+")
		this.setState({
			submitManagerForm: false,
			managerForm: true,
			addManagerButton: false
		});
	}
	deleteManagerForm() {
		this.props.getOperation("-")
		var addManagerButton = false;
		if (this.props.number == this.props.managersCount) {
			addManagerButton = true;
		}
		// var addManagerButton = false;
		// if (this.props.number == 1) {
		// 	addManagerButton = true;
		// }
		this.setState({
			managerForm: false,
			addManagerButton: addManagerButton
		});
	}
	inviteManager() {
		this.submit()
	}
	submit() {
		var self = this;
		var headers = new Headers();
		headers.append("Content-Type", "application/json")
		headers.append("Authorization", "Token " + localStorage.token);
		var body = {};
		var fullname = this.state.fullname.split(" ");
		var api_url = new Array(this.props.subsidiary.api_url);
		body.first_name = fullname[0];
		body.last_name = fullname[1];
		body.email = this.state.email;
		body.subsidiary_list = api_url;
		var request = new Request(
			'http://dev.jobufo.com/api/auth/invite-member/',
			{
				method: "POST",
				headers: headers,
				body: JSON.stringify(body)
			})
		fetch(request)
			.then(function(r) {
				return r.json()
			})
			.then(function(result) {
				console.log("result manager form:", result)
				self.setState({
					submitManagerForm: true
				})
			})
	}
	render() {
		return (
			<div>
				<div className="manager-item" style={this.state.managerForm ? ({display: 'block'}):({display: 'none'})}>
					<div className="half">
						<label className="label">Manager Name</label>
						<input onChange={this.handleNameChange.bind(this)} type="text" className="fullname half" placeholder="Manager Name" value={this.state.fullname}/>
					</div>
					<div className="half right">
						<label className="label">Manager Email</label>	
						<input onChange={this.handleEmailChange.bind(this)} type="text" className="email half" placeholder="Manager Email" value={this.state.email}/>
					</div>
					<a onClick={this.deleteManagerForm.bind(this)} className="manager-delete"><i className="fa fa-times" aria-hidden="true"></i></a>
				</div>
				<div className="clear"></div>
				{this.state.addManagerButton ? (<span onClick={this.addManagerForm.bind(this)} id="addManagerButton" className="green">Manager hinzufügen</span>):(null)}
				<div className="clear"></div>
				{!this.state.submitManagerForm ? (
					<span onClick={this.inviteManager.bind(this)} id="inviteManagerButton" className="green" style={!this.state.managerForm ? {display:'none'}: {display:'inline-block'}}>invite manager</span>
					) : (null)}
			</div>
		);
	}
}