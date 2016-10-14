import React from 'react'


export default class SubsidiaryEdit extends React.Component {
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
							{this.state.managerForm === true ? <ManagerForm deleteManagerForm={this.deleteManagerForm} /> : null}
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