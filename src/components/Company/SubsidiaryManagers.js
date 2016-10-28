import React from 'react'
import ManagerForm from '../../components/Company/ManagerForm'


export default class SubsidiaryManagers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			managerForm: false,
			managersCount: 1,
			member_list: props.subsidiary.member_list,
			membersRemove: []
		}
	}

	getManagersCount(operation, pk) {
		var self = this;
		if (operation == "+") {
			this.setState({
				managersCount: ++this.state.managersCount
			})
		}
		// console.log("pk to remove:", pk)
		if ((operation == "-")&&(pk)) {
			var membersRemove = this.state.membersRemove;
			// console.log("before members:", this.state.member_list)
			this.state.member_list.map(function(member, i) {
				if (member.pk == pk) {
					membersRemove.push(member)
				}
			})
			this.setState({
				membersRemove: membersRemove
			})
			// console.log("after:", new_member_list)
			this.props.getMembersRemove(membersRemove)
		}
	}
	render() {
		console.log("render member_list:", this.state.member_list)
		var self = this;
		var preloaded_managers = []
		for (var i=0; i < this.props.subsidiary.member_list.length; i++) {
			preloaded_managers.push(<ManagerForm key={i} preloaded={true} member={this.props.subsidiary.member_list[i]} subsidiary={this.props.subsidiary} getOperation={this.getManagersCount.bind(this)} number={i} managersCount={this.state.managersCount}/>)
		}

		var subsidiary_managers = []
		for (var i=1; i <= this.state.managersCount; i++) {
			subsidiary_managers.push(<ManagerForm key={i} subsidiary={this.props.subsidiary} getOperation={this.getManagersCount.bind(this)} number={i} managersCount={this.state.managersCount}/>)
		}
		return (
			<div>
				<div id="subsidiaryManagers">
					{preloaded_managers}
					{subsidiary_managers}
				</div>
			</div>
		);
	}
}