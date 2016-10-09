import React from 'react';
import UserAvatar from 'react-user-avatar';
import DropdownMenu from 'react-dd-menu';
import { Link } from 'react-router'


export default class Header extends React.Component {
	constructor(){
		super()
		this.state = {
			isMenuOpen: false
		};
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
		return (
			<header>
      			<div className="container">
        			<div className="navbar-header">
          				<img className="job-ufo-logo" />
          				<div className="right-panel-avatar">
          					<div className="user-name">
          						<h2>Thomas Paucker</h2>
          					</div>
          					<div className="user-avatar">
          				 		<UserAvatar size="40" name="Thomas Paucker" src="http://dev.jobufo.com/media/avatars/a29002ff-1e8.png" />
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