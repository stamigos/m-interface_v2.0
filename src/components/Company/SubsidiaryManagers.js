import React from 'react'
import ManagerForm from '../../components/Company/ManagerForm'


export default class SubsidiaryManagers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			managerForm: false,
			managersCount: 1
		}
	}
	getManagersCount(operation) {
		if (operation == "+") {
			this.setState({
				managersCount: ++this.state.managersCount
			})
		}
		// if (operation == "-") {
		// 	this.setState({
		// 		managersCount: --this.state.managersCount
		// 	})
		// }
	}
	render() {
		console.log("count:", this.state.managersCount)
		var subsidiary_managers = []
		// var timestamp = Math.round(new Date().getTime()/1000);
		for (var i=1; i <= this.state.managersCount; i++) {
			subsidiary_managers.push(<ManagerForm key={i} subsidiary={this.props.subsidiary} getOperation={this.getManagersCount.bind(this)} number={i} managersCount={this.state.managersCount}/>)
		}
		return (
			<div>
				<div id="subsidiaryManagers">
					{subsidiary_managers}
				</div>
			</div>
		);
	}
}