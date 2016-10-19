import React from 'react'
import List from 'react-list-select'
import ReactSpinner from 'react-spinjs'

//Stores
import JobStore from '../store/JobStore'

//Mixin
import mixins from 'es6-mixins'
import BackboneMixin from '../mixin/BackboneMixin'

//Actions
import AppActions from '../actions/AppActions'

import CompanyEdit from '../components/Company/CompanyEdit'
import ManagerForm from '../components/Company/ManagerForm'
import SubsidiaryEdit from '../components/Company/SubsidiaryEdit'
import ListCompanies from '../components/Company/ListCompanies'
import SubsidiaryItem from '../components/Company/SubsidiaryItem'

import jquery from 'jquery'


var $ = jquery



class ListSubsidiaries extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			subsidiaries: []
		}
		mixins(BackboneMixin,this);
		this.get_subsidiaries = this.get_subsidiaries.bind(this);
		this.formatSubsidiary = this.formatSubsidiary.bind(this);
	}
	componentWillMount() {
		var model = this.props.model;
		console.log("JobStore subsidiaries", model.get("subsidiaries"))
		if (!model.get("subsidiariesLoading")) {
			this.get_subsidiaries();
		}
	}
	componentWillReceiveProps(nextProps) {
		var model = nextProps.model;
		console.log("JobStore subsidiaries", model.get("subsidiaries"))
		if (!model.get("subsidiariesLoading")) {
			this.get_subsidiaries();
		}
	}

	formatSubsidiary(subsidiary) {
		return {
			pk: subsidiary.pk,
			name: subsidiary.name,
			company_name: '',
			logo: subsidiary.image_list['0'].image,
			address: [{
				street: subsidiary.address.street,
				housenumber: subsidiary.address.housenumber,
				postal_code: subsidiary.address.postal_code,
				city: subsidiary.address.city.name
			}],
			manager: ''
		};
	}

	get_subsidiaries() {
		var subsidiaries = [];
		var openSubsidiaryEdit = this.props.openSubsidiaryEdit;
		var formatSubsidiary = this.formatSubsidiary;
		var model = this.props.model;

		var subsidiaryList = model.get("subsidiaries").map(function(subsidiary) {
			return (<SubsidiaryItem subsidiary={subsidiary} openSubsidiaryEdit={openSubsidiaryEdit} />)
		})
		this.setState({
			subsidiaries: subsidiaryList
		})
	}

	render() {
		// var model = this.props.model;
		// console.log("JobStore subsidiaries", model.get("subsidiaries"))
		// var subsidiaries = [<div></div>]
		// if (!model.get("subsidiariesLoading")) {
		// 	subsidiaries = this.get_subsidiaries();
		// }
		// console.log("subsidiaries after", subsidiaries)
		return (
			<List items={this.state.subsidiaries} />
		);
	}
}

class CompanyMain extends React.Component {	
	constructor(props) {
		super(props);
		mixins(BackboneMixin,this);
		AppActions.getCompanies();
		AppActions.getSubsidiaries();
	}


	// async postCompanies() {
	// 	var self = this;
	// 	var headers = new Headers();
	// 	headers.append("Authorization", "Token " + localStorage.token);
	// 	var body = {
	// 		name: 'Vasya'
	// 	};
	// 	var request = await new Request(
	// 		'http://dev.jobufo.com/api/v1/management/company/',
	// 		{
	// 			method: "POST",
	// 			headers: headers,
	// 			body: JSON.stringify(body)
	// 		})
	// 	fetch(request)
	// 			.then(function(r) {
	// 				return r.json();
	// 			})
	// 			.then(function(objects) {
	// 				console.log(objects)
	// 				self.setState({
	// 					companies: objects
	// 				})
	// 			})
	// }

	render() {
		if (JobStore.get('companiesLoading')||JobStore.get('subsidiariesLoading')) {
			return (
				<div className="loading-wrapper">
					<ReactSpinner />
				</div>
			)
		}
		else {
			return (
				<div>
					<div className="post-job-content-header align-center">
						<h1 className="title">Unternehmen & Filialen</h1>
						<h2 className="subtitle">Ändern Sie Ihre Unternehmens- und Filialinformationen hier.</h2>
					</div>
					<div id="company-wrapper" className="company-subsidiary-wrapper">
						<h1 className="top-title">Unternehmensdaten</h1>
						<div id="company-subsidiary-company" className="company-subsidiary">
							<ListCompanies model={JobStore} openCompanyMain={this.props.openCompanyMain} openCompanyEdit={this.props.openCompanyEdit} />
						</div>
					</div>
					<div id="subsidiary-wrapper" className="company-subsidiary-wrapper">
						<h1 className="top-title">Filialen</h1>
						<button onClick={this.props.openSubsidiaryEdit} type="button" id="addNewSubsidiary" className="button-cv button-cv-full-red">Neue Filiale hinzufugen</button>
						<div id="company-subsidiary-subsidiary" className="company-subsidiary">
							<ListSubsidiaries model={JobStore} openCompanyMain={this.props.openCompanyMain} openSubsidiaryEdit={this.props.openSubsidiaryEdit} />
						</div>
					</div>
				</div>
			);
		}
	}
}

export default class Company extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			component: 0
		};
		this.openCompanyMain = this.openCompanyMain.bind(this);
		this.openCompanyEdit = this.openCompanyEdit.bind(this);
		this.openSubsidiaryEdit = this.openSubsidiaryEdit.bind(this);
	}

	openCompanyMain() {
		this.setState({component: 0});
	}

	openCompanyEdit() {
		this.setState({component: 1});
	}

	openSubsidiaryEdit() {
		this.setState({component: 2});
	}

	render() {
		var companyComponent;

		if (this.state.component === 0) {
			companyComponent = <CompanyMain openCompanyEdit={this.openCompanyEdit} openSubsidiaryEdit={this.openSubsidiaryEdit} />;
		}
		else if (this.state.component === 1) {
			companyComponent = <CompanyEdit openCompanyMain={this.openCompanyMain} />;
		}
		else {
			companyComponent = <SubsidiaryEdit openCompanyMain={this.openCompanyMain} />;
		}

		return (
			<div>
				<div className="company-wrapper">
					{companyComponent}
				</div>
			</div>
		);
	}
}