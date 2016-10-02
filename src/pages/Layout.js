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
				navExpanded: true, /* sidebar expanded */
				loggedIn: !!localStorage.token
			}
	}
	onNavLick() {
	    this.setState({navExpanded: !this.state.navExpanded});
	}
	render() {
		return (
			<div>
			{!this.state.loggedIn ? (<div className="main-login">{this.props.children}</div>
				) : (
				<div className={this.state.navExpanded ? 'main navExpanded': ''}>
						<Header />
						<Sidebar onToggleClick={this.onNavLick.bind(this)} />
						{this.props.children}
				</div>
				)}
			</div>
		);
	}
}