import React from 'react'
import List from 'react-list-select'
//Stores
import JobStore from '../../store/JobStore'
//Mixin
import mixins from 'es6-mixins'
import BackboneMixin from '../../mixin/BackboneMixin'

import SubsidiaryItem from '../../components/Company/SubsidiaryItem'



export default class ListSubsidiaries extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			subsidiaries: [],
			removed: null
		}
		mixins(BackboneMixin,this);
		this.get_subsidiaries = this.get_subsidiaries.bind(this);
	}
	componentWillMount() {
		var model = this.props.model;
		console.log("JobStore subsidiaries", model.get("subsidiaries"))
		if (!model.get("subsidiariesLoading")) {
			this.get_subsidiaries();
		}
	}
	componentWillReceiveProps(nextProps) {
		var model = nextProps.model;
		console.log("JobStore subsidiaries", model.get("subsidiaries"))
		if (!model.get("subsidiariesLoading")) {
			this.get_subsidiaries();
		}
	}
	get_subsidiaries() {
		var self = this;
		var subsidiaries = [];
		var openSubsidiaryEdit = this.props.openSubsidiaryEdit;
		var openCompanyMain = this.props.openCompanyMain;
		var model = this.props.model;

		var subsidiaryList = model.get("subsidiaries").map(function(subsidiary) {
			return (<SubsidiaryItem subsidiary={subsidiary} openSubsidiaryEdit={openSubsidiaryEdit} openCompanyMain={openCompanyMain} />)
		})
		this.setState({
			subsidiaries: subsidiaryList
		})
	}

	render() {
		return (
			<List items={this.state.subsidiaries} />
		);
	}
}