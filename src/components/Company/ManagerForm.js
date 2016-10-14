import React from 'react'


export default class ManagerForm extends React.Component {
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