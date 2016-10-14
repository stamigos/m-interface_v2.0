import React from 'react'


export default class SubsidiaryItem extends React.Component {
	get_member_list() {
		var subsidiary = this.props.subsidiary;
		var members = subsidiary.member_list.map(function(member, i) {
			return (<h3 key={i} className="company-subsidiary-item-list-item-desc">{member.user.first_name} {member.user.last_name}</h3>)
		})
		return members
	}
	render() {
		var subsidiary = this.props.subsidiary;
		var openSubsidiaryEdit = this.props.openSubsidiaryEdit;
		var street = subsidiary.address.street;
		var housenumber = subsidiary.address.housenumber;
		var street_house = street + ', ' + housenumber
		var postal_code = subsidiary.address.postal_code;		
		var city = subsidiary.address.city.name;
		var postal_city = postal_code + ", " + city
		var company_name = subsidiary.company.name;
		return (
			<div className="company-subsidiary-item">
					<div className="company-subsidiary-item-logo">
						<img src={subsidiary.image_list['0'].image} alt="Company"/>
					</div>
					<div className="company-subsidiary-item-content">
						<h1 className="company-subsidiary-title">
							<span className="green">{subsidiary.name} </span> 
							{company_name}
						</h1>
						<ul className="company-subsidiary-item-list">
							<li className="company-subsidiary-item-list-item">					
								<h2 className="company-subsidiary-item-list-item">Adresse</h2>
								<h3 className="company-subsidiary-item-list-item-desc">{street_house}</h3>
								<h3 className="company-subsidiary-item-list-item-desc">{postal_city}</h3>
							</li>
							<li className="company-subsidiary-item-list-item manager">
								<h2 className="company-subsidiary-item-list-item ">Manager</h2>
								{this.get_member_list.bind(this)()}
							</li>
						</ul>
					</div>

					<div className="company-subsidiary-edit-panel">
						<a onClick={openSubsidiaryEdit} className="subsidiary-edit-panel-edit-link">
							<img className="company-subsidiary-edit-panel-edit" src={require("../../img/edit.png")} alt=""/>
						</a>
						<a href="subsidiary-delete_1" className="subsidiary-edit-panel-delete-link">
							<img className="company-subsidiary-edit-panel-delete" src={require("../../img/delete.png")} alt=""/>
						</a>
					</div>
			</div>
		);
	}
}