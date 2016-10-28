import React from 'react'
import Img from 'react-image-load'



export default class CompanyEdit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tags: [],
			facebook: '',
			twitter: '',
			instagram: '',
			tag: this.props.company.category,
			website: this.props.company.website.url,
			selectedLogo: this.props.company.logo ? this.props.company.logo : null,
			newLogo: false
		}
		this.get_tags = this.get_tags.bind(this);
		this.get_full_tag = this.get_full_tag.bind(this);
	}
	componentDidMount() {
		this.get_tags();
	}
	get_tags() {
		var self = this;
		var headers = new Headers();
		headers.append("Authorization", "Token " + localStorage.token);
		var request = new Request(
			'http://dev.jobufo.com/api/v1/tagging/tag/', 
			{
				method: "GET", 
			 	headers: headers
		    });

		fetch(request)
			.then(function(response) {
			  	console.log('then1:', response)
			    return response.json();
			})
			.then(function(objects) {
		  		console.log('then2:', objects)
		  		self.setState({
		  			tags: objects
		  		})
			});
	}
	addFacebooLink() {
		this.setState({
			facebook: this.props.company.facebook
		})
	}
	onFacebookDelete() {
		this.setState({
			facebook: ''
		})
	}
	addTwitterLink() {
		this.setState({
			twitter: this.props.company.twitter
		})
	}
	onTwitterDelete() {
		this.setState({
			twitter: ''
		})
	}
	addInstagramLink() {
		this.setState({
			instagram: this.props.company.instagram
		})
	}
	onInstagramDelete() {
		this.setState({
			instagram: ''
		})
	}
	onImageRemove() {
		this.setState({
			newLogo: false,
			selectedLogo: null
		})
	}
	onLogoSelect() {
		var self = this;
		var file = this.refs.file.files[0];
	    var reader = new FileReader();
		var url = reader.readAsDataURL(file);

			reader.onloadend = function (e) {
					self.setState({
						newLogo: true,
						selectedLogo: reader.result
					})
		    }.bind(this);
	}
	handleWebsiteChange(e) {
		console.log("handleWebsiteChange:", e.target.value)
		this.setState({
			website: e.target.value
		})
	}
	handleIndustryChange(e) {
		console.log("handleIndustryChange:", e.target.value)
		this.setState({
			tag: e.target.value
		})
	}
	handleFacebookChange(e) {
		console.log("handleFacebookChange:", e.target.value)
		this.setState({
			facebook: e.target.value
		})
	}
	handleTwitterChange(e) {
		console.log("handleTwitterChange:", e.target.value)
		this.setState({
			twitter: e.target.value
		})
	}
	handleInstagramChange(e) {
		console.log("handleInstagramChange:", e.target.value)
		this.setState({
			instagram: e.target.value
		})
	}
	get_full_tag(tag_name) {
		var result;
		this.state.tags.map(function(tag) {
			if (tag.name == tag_name) {
				console.log()
				result = tag;
			}
		})
		return result;
	}
	onSubmit(e) {
		e.preventDefault();
		var self = this;
		var body = {}
		var social_media_list = new Array();
		social_media_list.push({type: "URL", handle: this.state.website});
		social_media_list.push({type: 'FACEBOOK', handle: this.state.facebook.split("/").pop()});
		social_media_list.push({type: 'TWITTER', handle: this.state.twitter.split("/").pop()});
		social_media_list.push({type: 'INSTAGRAM', handle: this.state.instagram.split("/").pop()});
		body.social_media_list = social_media_list;
		body.category = this.get_full_tag(this.state.tag);
		if (this.state.newLogo) {
			body.logo = this.state.selectedLogo.split(",")[1];
		}
		console.log("body:", body)
		var headers = new Headers();
		headers.append("Content-Type", "application/json")
		headers.append("Authorization", "Token " + localStorage.token);
		var request = new Request(
			'http://dev.jobufo.com/api/v1/recruiting/company/'+this.props.company.pk+'/',
			{
				method: "PUT",
				headers: headers,
				body: JSON.stringify(body)
			})
		fetch(request)
				.then(function(r) {
					return r.json();
				})
				.then(function(result) {
					console.log('result:', result)
					window.location.reload();
				})
	}
	render() {
		var self = this;
		var uploadedImageOption = {};
		var imageLabelOption = {};
		var overlayOption = {};
		if (this.state.selectedLogo) {
			uploadedImageOption = {
				backgroundImage: 'url('+this.state.selectedLogo+')'
			}
			imageLabelOption = {
				display: 'none'
			}
			overlayOption = {
				display: 'block'
			}
		}
		else {
			imageLabelOption = {
				display: 'block'
			}
			overlayOption = {
				display: 'none'
			}
		}

		return (
			<div>
				<div className="post-job-content-header align-center">
					<h1 className="title">Edit Unternehmensdaten</h1>
					<h2 className="subtitle">Please enter the details bellow</h2>
				</div>
				<form onSubmit={this.onSubmit.bind(this)} action="/company" method="post" role="form" className="profile-company-form" id="profile-company-form">
					<div className="form-wrapper">
						<label className="label" htmlFor="profileCompany">Unternehmensname</label>
						<input type="text" name="profileCompany" id="profileCompany" placeholder="Company name" defaultValue={this.props.company.name} disabled />
						
						<label className="label" htmlFor="profileSocialMedia-url">Webseite</label>
						<input onChange={this.handleWebsiteChange.bind(this)} type="text" name="profileSocialMedia-url" id="profileSocialMedia-url" placeholder="Webseite" value={this.state.website}/>
						
						<label className="label" htmlFor="profileIndustry">Branche</label>
						<select onChange={this.handleIndustryChange.bind(this)} name="profileIndustry" id="profileIndustry" value={this.state.tag}>
							{this.state.tags.map(function(tag, i) {
								return <option key={i} value={tag.name}>{tag.name}</option>
							})}
						</select>

						<label className="label" htmlFor="">Unternehmenslogo</label>						
						<label style={imageLabelOption} id="profile-upload-button" htmlFor="profileCompanyLogo"><i className="fa fa-plus" aria-hidden="true"></i></label>
						<input onChange={this.onLogoSelect.bind(this)} ref="file" className="profileFileinput" accept="image/*" name="profileCompanyLogo" id="profileCompanyLogo" type="file" />

						<div id="profile-logo-preview" style={uploadedImageOption}>
							<div className="overlay" style={overlayOption}>

								<div className="profile-logo-preview-buttons">
									<div className="profile-logo-preview-button editor">
										<label id="profile-logo-preview-upload-button" htmlFor="profileCompanyLogo"><i className="fa fa-pencil" aria-hidden="true"></i></label>
									</div>
									<div onClick={this.onImageRemove.bind(this)} className="profile-logo-preview-button deleter">
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
								<input onClick={this.addFacebooLink.bind(this)} onChange={this.handleFacebookChange.bind(this)} type="text" value={this.state.facebook} name="profileSocialMedia-facebook" id="profileSocialMedia-facebook" placeholder="Add facebook link" />
								<i onClick={this.onFacebookDelete.bind(this)} className="fa fa-trash delete" aria-hidden="true"></i>
							</li>
							<li className="profileSocialMedia-item">
								<div className="icon-wrapper">
									<img src={require("../../img/twetter.png")} alt="" />
								</div>
								<input onClick={this.addTwitterLink.bind(this)} onChange={this.handleTwitterChange.bind(this)} type="text" value={this.state.twitter} name="profileSocialMedia-twitter" id="profileSocialMedia-twitter" placeholder="Add twitter link" />
								<i onClick={this.onTwitterDelete.bind(this)} className="fa fa-trash delete" aria-hidden="true"></i>
							</li>
							<li className="profileSocialMedia-item">
								<div className="icon-wrapper">
									<img src={require("../../img/instagram.png")} alt="" />
								</div>
								<input onClick={this.addInstagramLink.bind(this)} onChange={this.handleInstagramChange.bind(this)} type="text" value={this.state.instagram} name="profileSocialMedia-instagram" id="profileSocialMedia-instagram" placeholder="Add instagram link" />
								<i onClick={this.onInstagramDelete.bind(this)} className="fa fa-trash delete" aria-hidden="true"></i>
							</li>
						</ul>
					</div>
					<div className="buttons">
						<div className="form-wrapper">
							<button type="submit" className="button-cv button-cv-full-red">Sichern</button>
							<button onClick={this.props.openCompanyMain} type="button" className="button-cv button-cv-transperent clear_company_form">Abbrechen</button>
							<div className="clear"></div>
						</div>
					</div>
				</form>
			</div>
		);
	}
}