import React from 'react';

//Stores
import JobStore from '../store/JobStore';

//Mixin
import mixins from 'es6-mixins';
import BackboneMixin from '../mixin/BackboneMixin';

//Actions
import AppActions from '../actions/AppActions';


import Header from '../components/Header'
import Sidebar from '../components/Sidebar'


export default class Layout extends React.Component {
	constructor() {
		super();
		this.state = this.getState();
		
		mixins(BackboneMixin,this);
		AppActions.getCurrentUser();
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
						<Header model={JobStore}/>
						<Sidebar onToggleClick={this.onNavLick.bind(this)} />
						{this.props.children}
				</div>
				)}
			</div>
		);
	}
}