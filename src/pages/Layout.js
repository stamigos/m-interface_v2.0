import React from 'react';


import Header from '../components/Header'
import Sidebar from '../components/Sidebar'


export default class Layout extends React.Component {
	constructor() {
		super();
		this.state = this.getState()
	}
	getState() {
			return {
				navExpanded: true
			}
	}
	onNavLick() {
	    this.setState({navExpanded: !this.state.navExpanded});
	}
	render() {
		return (
			<div className={this.state.navExpanded ? 'main navExpanded': ''}>
				<Header />
				<Sidebar onToggleClick={this.onNavLick.bind(this)} />
				{this.props.children}
			</div>
		);
	}
}