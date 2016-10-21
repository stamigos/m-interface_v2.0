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
import SubsidiaryEdit from '../components/Company/SubsidiaryEdit'
import SubsidiaryAdd from '../components/Company/SubsidiaryAdd'
import ListCompanies from '../components/Company/ListCompanies'
import ListSubsidiaries from '../components/Company/ListSubsidiaries'

import jquery from 'jquery'


var $ = jquery



class CompanyMain extends React.Component {	
	constructor(props) {
		super(props);
		mixins(BackboneMixin,this);
		AppActions.getSubsidiaries();
	}
	componentWillUpdate() {
		AppActions.getSubsidiaries();

	}
	render() {
		if (JobStore.get('subsidiariesLoading')) {
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
						<button onClick={this.props.openSubsidiaryAdd.bind(this, JobStore.get("subsidiaries")[0].company)} type="button" id="addNewSubsidiary" className="button-cv button-cv-full-red">Neue Filiale hinzufugen</button>
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
			component: 0, 
			company: null
		};
		this.openCompanyMain = this.openCompanyMain.bind(this);
		this.openCompanyEdit = this.openCompanyEdit.bind(this);
		this.openSubsidiaryEdit = this.openSubsidiaryEdit.bind(this);
		this.openSubsidiaryAdd = this.openSubsidiaryAdd.bind(this);
	}

	openCompanyMain(update) {
		if (update) {
			this.forceUpdate();
		}
		this.setState({component: 0});
	}

	openCompanyEdit(company) {
		console.log("company: ", company)
		this.setState({
			component: 1,
			company: company
		});
	}

	openSubsidiaryEdit(subsidiary) {
		console.log("subsidiary: ", subsidiary)
		this.setState({
			component: 2,
			subsidiary: subsidiary
		});
	}

	openSubsidiaryAdd(company) {
		console.log("openSubsidiaryAdd company:", company)
		this.setState({
			component: 3,
			company: company
		})
	}

	render() {
		var companyComponent;

		if (this.state.component === 0) {
			companyComponent = <CompanyMain openCompanyMain={this.openCompanyMain} openCompanyEdit={this.openCompanyEdit} openSubsidiaryEdit={this.openSubsidiaryEdit} openSubsidiaryAdd={this.openSubsidiaryAdd} />;
		}
		else if (this.state.component === 1) {
			companyComponent = <CompanyEdit openCompanyMain={this.openCompanyMain} company={this.state.company} />;
		}
		else if (this.state.component === 2) {
			companyComponent = <SubsidiaryEdit openCompanyMain={this.openCompanyMain} subsidiary={this.state.subsidiary} />;
		}
		else {
			companyComponent = <SubsidiaryAdd openCompanyMain={this.openCompanyMain} company={this.state.company} />;
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