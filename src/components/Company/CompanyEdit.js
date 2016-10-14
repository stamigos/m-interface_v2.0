import React from 'react'


export default class CompanyEdit extends React.Component {
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
									<img src={require("../../img/facebook.png")} alt="" />
								</div>
								<label className="label-big float-left" htmlFor="profileSocialMedia-facebook"></label>
								<input type="text" name="profileSocialMedia-facebook" id="profileSocialMedia-facebook" value="" />
								<i className="fa fa-trash delete" aria-hidden="true"></i>
							</li>
							<li className="profileSocialMedia-item">
								<div className="icon-wrapper">
									<img src={require("../../img/twetter.png")} alt="" />
								</div>
								<label className="label-big float-left" htmlFor="profileSocialMedia-twitter"></label>
								<input type="text" name="profileSocialMedia-twitter" id="profileSocialMedia-twitter" value="" />
								<i className="fa fa-trash delete" aria-hidden="true"></i>
							</li>
							<li className="profileSocialMedia-item">
								<div className="icon-wrapper">
									<img src={require("../../img/instagram.png")} alt="" />
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