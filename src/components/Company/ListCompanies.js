import React from 'react'
import List from 'react-list-select'

//Mixin
import mixins from 'es6-mixins'
import BackboneMixin from '../../mixin/BackboneMixin'

function getUrl(social_media, social_media_title) {
	var result = null;
	social_media.map(function(item) {
		if (item.type == social_media_title) {
			result = item
		}
	})
	return result;
}

export default class ListCompanies extends React.Component {
	constructor(props) {
		super(props);
		mixins(BackboneMixin,this);
		this.get_companies = this.get_companies.bind(this);
		this.formatCompany = this.formatCompany.bind(this);
	}
	formatCompany(company) {
		console.log("url:", getUrl(company.social_media_list, "URL"))
		return {
			pk: company.pk,
			name: company.name,
			logo: company.logo,
			category: company.category ? (company.category.name):(""),
			website: {
				name: getUrl(company.social_media_list, "URL") ? (getUrl(company.social_media_list, "URL").handle):(""),
				url: getUrl(company.social_media_list, "URL") ? (getUrl(company.social_media_list, "URL").url):("")
			},
			facebook: getUrl(company.social_media_list, "FACEBOOK") ? (getUrl(company.social_media_list, "FACEBOOK").url):(""),
			twitter: getUrl(company.social_media_list, "TWITTER") ? (getUrl(company.social_media_list, "TWITTER").url):(""),
			instagram: getUrl(company.social_media_list, "INSTAGRAM") ? (getUrl(company.social_media_list, "INSTAGRAM").url):("")
		};
	}
	onFBClick(e) {
		window.open($("#facebook").attr("href"))
	}
	onTWClick(e) {
		window.open($("#twitter").attr("href"))
	}
	onINSTClick(e) {
		window.open($("#instagram").attr("href"))
	}
	get_companies() {
		var self = this;
		var companies = [];
		var openCompanyEdit = this.props.openCompanyEdit;
		var formatCompany = this.formatCompany;
		var model = this.props.model;
		console.log('props model:', this.props.model)

		model.get("companies").map(function(company) {
			console.log('company:', company)
			company = formatCompany(company);
			console.log('company after format:', company)
			companies.push(
				<div>
					<div className="company-subsidiary-item-logo">
						<img src={company.logo} alt="Company" />
					</div>
					<div className="company-subsidiary-item-content">
						<h1 className="company-subsidiary-title">{company.name}</h1>
						<ul className="company-subsidiary-item-list">
							<li className="company-subsidiary-item-list-item">
								<h2 className="company-subsidiary-item-list-item">Website</h2>
								<h3 className="company-subsidiary-item-list-item-desc"><a href={company.website.url}>{company.website.name}</a></h3>
							</li>
							<li className="company-subsidiary-item-list-item">
								<h2 className="company-subsidiary-item-list-item">Branche</h2>
								<h3 className="company-subsidiary-item-list-item-desc">{company.category}</h3>
							</li>
							<li className="company-subsidiary-item-list-item">
								<ul className="company-subsidiary-social-media">
									<li className="company-subsidiary-social-media-item">
										<a id="facebook" href={company.facebook} onClick={self.onFBClick.bind(self)} target="_blank">
											<img src={require("../../img/facebook.png")} alt="" />
										</a>
									</li>
									<li className="company-subsidiary-social-media-item">
										<a id="twitter" href={company.twitter} onClick={self.onTWClick.bind(self)} target="_blank">
											<img src={require("../../img/twetter.png")} alt="" />
										</a>
									</li>
									<li className="company-subsidiary-social-media-item">
										<a id="instagram" href={company.instagram} onClick={self.onINSTClick.bind(self)} target="_blank">
											<img src={require("../../img/instagram.png")} alt="" />
										</a>
									</li>	
								</ul>
							</li>
						</ul>
					</div>
					<div className="company-subsidiary-edit-panel">
						<a onClick={openCompanyEdit} className="company-edit-panel-edit-link">
							<img className="company-subsidiary-edit-panel-edit" src={require("../../img/edit.png")} alt="" />
						</a>
						<img className="company-subsidiary-edit-panel-delete" src={require("../../img/delete.png")} alt="" />
					</div>
				</div>
			)});
		return [companies[0]];
	}

	render() {
		var model = this.props.model;
		var companies = []
		if (!model.get("companiesLoading")) {
			companies = this.get_companies();
		}
		return (
			<List items={companies}
				onChange={function (selected) { }} />
		);
	}
}