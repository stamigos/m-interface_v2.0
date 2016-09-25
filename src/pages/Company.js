import React from 'react';

class CompanyItem extends React.Component {
	render() {
		return (
			<li className="company-subsidiary-item">
				<div className="company-subsidiary-item-logo">
					<img src={"http://dev.jobufo.com/media/logos/6a6b9657-9eb.png"} alt="ECOVIS AG" />
				</div>
				<div className="company-subsidiary-item-content">
					<h1 className="company-subsidiary-title">ECOVIS AG</h1>
					<ul className="company-subsidiary-item-list">
						<li className="company-subsidiary-item-list-item">
							<h2 className="company-subsidiary-item-list-item">Website</h2>
							<h3 className="company-subsidiary-item-list-item-desc"><a href="http://hello.com/index.html">http://hello.com/index.html</a></h3>
						</li>
						<li className="company-subsidiary-item-list-item">
							<h2 className="company-subsidiary-item-list-item">Branche</h2>
							<h3 className="company-subsidiary-item-list-item-desc">Technology</h3>
						</li>
						<li className="company-subsidiary-item-list-item">
							<ul className="company-subsidiary-social-media">
								<li className="company-subsidiary-social-media-item">
									<a href="https://www.facebook.com/" target="_blank">
										<img src={require("../img/facebook.png")} alt="" />
									</a>
								</li>
								<li className="company-subsidiary-social-media-item">
									<a href="https://twitter.com/" target="_blank">
										<img src={require("../img/twetter.png")} alt="" />
									</a>
								</li>
								<li className="company-subsidiary-social-media-item">
									<a href="https://www.instagram.com/" target="_blank">
										<img src={require("../img/instagram.png")} alt="" />
									</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
				<div className="company-subsidiary-edit-panel">
					<a onClick={this.props.openCompanyEdit} className="company-edit-panel-edit-link">
						<img className="company-subsidiary-edit-panel-edit" src={require("../img/edit.png")} alt="" />
					</a>
					<img className="company-subsidiary-edit-panel-delete" src={require("../img/delete.png")} alt="" />
				</div>
			</li>
		);
	}
}

class SubsidiaryItem extends React.Component {
	render() {
		return (
			<li className="company-subsidiary-item">
				<div className="company-subsidiary-item-logo">
					<img src="http://dev.jobufo.com/media/71d65eed-8fa.png" alt=" ECOVIS AG"/>
				</div>
				<div className="company-subsidiary-item-content">
					<h1 className="company-subsidiary-title"><span className="green">name1</span> ECOVIS AG</h1>
					<ul className="company-subsidiary-item-list">
						<li className="company-subsidiary-item-list-item">
							<h2 className="company-subsidiary-item-list-item">Adresse</h2>
							<h3 className="company-subsidiary-item-list-item-desc">Am Campus</h3>
							<h3 className="company-subsidiary-item-list-item-desc">18182, Rostock, Germany</h3>
						</li>
						<li className="company-subsidiary-item-list-item manager">
							<h2 className="company-subsidiary-item-list-item ">Manager</h2>
							<h3 className="company-subsidiary-item-list-item-desc">asd sad</h3>
						</li>
					</ul>
				</div>
				<div className="company-subsidiary-edit-panel">
					<a onClick={this.props.openSubsidiaryEdit} className="subsidiary-edit-panel-edit-link">
						<img className="company-subsidiary-edit-panel-edit" src={require("../img/edit.png")} alt=""/>
					</a>
					<a href="subsidiary-delete_1" className="subsidiary-edit-panel-delete-link">
						<img className="company-subsidiary-edit-panel-delete" src={require("../img/delete.png")} alt=""/>
					</a>
				</div>
			</li>
		);
	}
}

class CompanyEdit extends React.Component {
	render() {
		return (
			<div>
				<div className="post-job-content-header align-center">
					<h1 className="title">Edit Unternehmensdaten</h1>
					<h2 className="subtitle">Please enter the details bellow</h2>
				</div>
				<form action="" method="post" role="form" className="profile-company-form" id="profile-company-form">
					<div className="form-wrapper">
						<label className="label" htmlFor="profileCompany">Unternehmensname</label>
						<input type="text" name="profileCompany" id="profileCompany" placeholder="Company name" disabled />
						<label className="label" htmlFor="profileSocialMedia-url">Webseite</label>
						<input type="text" name="profileSocialMedia-url" id="profileSocialMedia-url" value="" />
						<label className="label" htmlFor="profileIndustry">Branche</label>
						<select name="profileIndustry" id="profileIndustry"></select>
						<label className="label" htmlFor="">Unternehmenslogo</label>
						<label id="profile-upload-button" htmlFor="profileCompanyLogo"><i className="fa fa-plus" aria-hidden="true"></i></label>
						<input className="profileFileinput" accept="image/*" name="profileCompanyLogo" id="profileCompanyLogo" type="file" />
						<div id="profile-logo-preview">
							<div className="overlay">
								<div className="profile-logo-preview-buttons">
									<div className="profile-logo-preview-button editor">
										<label id="profile-logo-preview-upload-button" htmlFor="profileCompanyLogo"><i className="fa fa-pencil" aria-hidden="true"></i></label>
									</div>
									<div className="profile-logo-preview-button deleter">
										<i className="fa fa-trash" aria-hidden="true"></i>
									</div>
								</div>
							</div>
						</div>
						<div id="width_overflow"></div>
						<label className="label" htmlFor="">Soziale Medien</label>
						<ul id="profileSocialMedia">
							<li className="profileSocialMedia-item">
								<div className="icon-wrapper">
									<img src={require("../img/facebook.png")} alt="" />
								</div>
								<label className="label-big float-left" htmlFor="profileSocialMedia-facebook"></label>
								<input type="text" name="profileSocialMedia-facebook" id="profileSocialMedia-facebook" value="" />
								<i className="fa fa-trash delete" aria-hidden="true"></i>
							</li>
							<li className="profileSocialMedia-item">
								<div className="icon-wrapper">
									<img src={require("../img/twetter.png")} alt="" />
								</div>
								<label className="label-big float-left" htmlFor="profileSocialMedia-twitter"></label>
								<input type="text" name="profileSocialMedia-twitter" id="profileSocialMedia-twitter" value="" />
								<i className="fa fa-trash delete" aria-hidden="true"></i>
							</li>
							<li className="profileSocialMedia-item">
								<div className="icon-wrapper">
									<img src={require("../img/instagram.png")} alt="" />
								</div>
								<label className="label-big float-left" htmlFor="profileSocialMedia-instagram"></label>
								<input type="text" name="profileSocialMedia-instagram" id="profileSocialMedia-instagram" value="" />
								<i className="fa fa-trash delete" aria-hidden="true"></i>
							</li>
						</ul>
					</div>
					<div className="buttons">
						<div className="form-wrapper">
							<button onClick={this.props.openCompanyMain} type="button" className="button-cv button-cv-full-red">Sichern</button>
							<button onClick={this.props.openCompanyMain} type="button" className="button-cv button-cv-transperent clear_company_form">Abbrechen</button>
							<div className="clear"></div>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

class ManagerForm extends React.Component {
	render() {
		return (
			<div className="manager-item">
				<div className="half">
					<label className="label">Manager Name</label>
					<input type="text" className="fullname half" placeholder="Manager Name" value="" disabled="" />
				</div>
				<div className="half right">
					<label className="label">Manager Email</label>	
					<input type="text" className="email half" placeholder="Manager Email" value="" disabled="" />
				</div>
				<a onClick={this.props.deleteManagerForm} className="manager-delete"><i className="fa fa-times" aria-hidden="true"></i></a>
			</div>
		);
	}
}
class SubsidiaryEdit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			managerForm: false
		};
		this.addManagerForm = this.addManagerForm.bind(this);
		this.deleteManagerForm = this.deleteManagerForm.bind(this);
	}

	addManagerForm() {
		this.setState({managerForm: true});
	}

	deleteManagerForm() {
		this.setState({managerForm: false});
	}

	render() {
		return (
			<div>
				<div className="post-job-content-header align-center">
					<h1 className="title">Filiale ändern</h1>	
					<h2 className="subtitle">Hier kannst du die Filialdaten ändern</h2>
				</div>
				<form action="" method="post" role="form" className="profile-subsidiary-form" id="profile-subsidiary-form">
					<div className="form-wrapper">
						<div className="half">
							<label className="label" htmlFor="subsidiaryName">Filialname</label>
							<input type="text" name="subsidiaryName" id="subsidiaryName" className="half" placeholder="Filialname" />
						</div>
						<div className="half right">
							<label className="label" htmlFor="subsidiaryCompany">Unternehmensname</label>
							<input type="text" name="subsidiaryCompany" id="subsidiaryCompany" className="half right" placeholder="Company name" disabled />
						</div>
						<div className="half">
							<label className="label" htmlFor="subsidiaryStreet">Straße name</label>
							<input type="text" name="subsidiaryStreet" id="subsidiaryStreet" className="half" placeholder="Straße name" />
						</div>
						<div className="half right">
							<label className="label" htmlFor="subsidiaryHouse">Hausnummer</label>
							<input type="text" name="subsidiaryHouse" id="subsidiaryHouse" className="half right" placeholder="Hausnummer" />
						</div>
						<div className="half">
							<label className="label" htmlFor="subsidiaryPostCode">Postleitzahl</label>
							<input type="text" name="subsidiaryPostCode" id="subsidiaryPostCode" className="half" placeholder="Postleitzahl" />
						</div>
						<div className="half right" id="filial_city">
							<label className="label" htmlFor="subsidiaryCity">Stadt</label>
							<input type="text" name="subsidiaryCity" id="subsidiaryCity" className="half right" placeholder="Stadt" />
							<div className="fields"></div>
						</div>

						<label className="label-big">Filialvideo</label>
						<label id="subsidiaryVideo-label" htmlFor="subsidiaryVideo"><i className="fa fa-plus" aria-hidden="true"></i></label>
						<input className="subsidiaryVideo" accept="video/*" name="subsidiaryVideo" id="subsidiaryVideo" type="file" />
						<div id="subsidiaryVideo-preview">
							<div id="videoFile"></div>
							<div className="overlay">
								<div className="subsidiaryVideo-preview-buttons">
									<div className="subsidiaryVideo-preview-button editor">
										<label id="subsidiaryVideo-preview-upload-button" htmlFor="subsidiaryVideo"><i className="fa fa-pencil" aria-hidden="true"></i></label>
									</div>
									<div className="subsidiaryVideo-preview-button deleter">
										<a href=""><i className="fa fa-trash" aria-hidden="true"></i></a>
									</div>
								</div>
							</div>
						</div>
						<div className="clear"></div>

						<label className="label-big">Filialbilder</label>
						<label className="upload-button" htmlFor="subsidiaryFile"><i className="fa fa-plus" aria-hidden="true"></i></label>
						<input className="subsidiaryFile" accept="image/*" name="subsidiaryFile" id="subsidiaryFile" type="file" />
						<ul id="subsidiary_uploaded_files"></ul>

						<div className="clear"></div>
						<div id="subsidiaryManagers">
							{this.state.managerForm == true ? <ManagerForm deleteManagerForm={this.deleteManagerForm} /> : null}
						</div>
						<div className="clear"></div>
						<span onClick={this.addManagerForm} id="addManagerButton" className="green">Manager hinzufügen</span>
						<div className="clear"></div>
						<span id="inviteManagerButton" className="green">invite manager</span>
					</div>
					<div className="buttons">
						<div className="form-wrapper">
							<button onClick={this.props.openCompanyMain} type="button" className="button-cv button-cv-full-red">Sichern</button>
							<button onClick={this.props.openCompanyMain} type="button" className="button-cv button-cv-transperent clear_subsidiary_form">Abbrechen</button>
							<div className="clear"></div>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

class CompanyMain extends React.Component {	
	render() {
		return (
			<div>
				<div className="post-job-content-header align-center">
					<h1 className="title">Unternehmen & Filialen</h1>
					<h2 className="subtitle">Ändern Sie Ihre Unternehmens- und Filialinformationen hier.</h2>
				</div>
				<div id="company-wrapper" className="company-subsidiary-wrapper">
					<h1 className="top-title">Unternehmensdaten</h1>
					<ul id="company-subsidiary-company" className="company-subsidiary">
						<CompanyItem openCompanyMain={this.props.openCompanyMain} openCompanyEdit={this.props.openCompanyEdit} />
					</ul>
				</div>
				<div id="subsidiary-wrapper" className="company-subsidiary-wrapper">
					<h1 className="top-title">Filialen</h1>
					<button onClick={this.props.openSubsidiaryEdit} type="button" id="addNewSubsidiary" className="button-cv button-cv-full-red">Neue Filiale hinzufugen</button>
					<ul id="company-subsidiary-subsidiary" className="company-subsidiary">
						<SubsidiaryItem openCompanyMain={this.props.openCompanyMain} openSubsidiaryEdit={this.props.openSubsidiaryEdit} />
						<SubsidiaryItem openCompanyMain={this.props.openCompanyMain} openSubsidiaryEdit={this.props.openSubsidiaryEdit} />
					</ul>
				</div>
			</div>
		);
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