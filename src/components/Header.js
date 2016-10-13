import React from 'react';
import UserAvatar from 'react-user-avatar';
import DropdownMenu from 'react-dd-menu';
import { Link } from 'react-router'

//Stores
import JobStore from '../store/JobStore';

//Mixin
import mixins from 'es6-mixins';
import BackboneMixin from '../mixin/BackboneMixin';

function getFullName(user) {
  console.log('user', user)
  return user.first_name + " " + user.last_name
}

export default class Header extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			isMenuOpen: false,
		};
    mixins(BackboneMixin,this);
		this.toggle = this.toggle.bind(this);
		this.close = this.close.bind(this);
	}
	close() {
    	this.setState({ 
    		isMenuOpen: false 
    	});
    }
  	toggle() {
    	this.setState({ isMenuOpen: !this.state.isMenuOpen });
  	}
	render() {
    var menuOptions = {
      isOpen: this.state.isMenuOpen,
      close: this.close,
      toggle: <i onClick={this.toggle} className="fa fa-chevron-down" aria-hidden="true"></i>,
      align: 'right',
      animAlign: 'center',
      animate: true
    }
    var userName = " ";
    var image = "";
    var model = this.props.model;
    if (!model.get("currentUserLoading")) {
        userName = getFullName(model.get('currentUser'))
        image = model.get('currentUser').ufouser.avatar;
    }
		return (
    			<header>
      			<div className="container">
        			<div className="navbar-header">
          				<img className="job-ufo-logo" />
          				<div className="right-panel-avatar">
          					<div className="user-name">
          						<h2>{userName}</h2>
          					</div>
          					<div className="user-avatar">
          				 		<UserAvatar size="40" name={userName} src={image} />
      				 		  </div>
      				 		<div className="user-menu-button">
							      <DropdownMenu {...menuOptions}>
							        <li><Link to="account" href="#">Mein Konto</Link></li>
							        <li><Link to="logout" href="#">Ausloggen</Link></li>
							      </DropdownMenu>
      				 		</div>
      				 	</div>
        			</div>
    			</div>
			</header>
		);
	}
}