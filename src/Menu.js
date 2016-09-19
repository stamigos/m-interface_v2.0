import React, { Component } from 'react';
import ReactMenuAim from 'react-menu-aim'
import './index.css';
// var ReactMenuAim = require('react-menu-aim');

// var Menu = React.createClass({
//   mixins: [ReactMenuAim],

//   componentWillMount: function() {
//     // Config ReactMenuAim here
//     this.initMenuAim({
//       submenuDirection: 'right',
//       menuSelector: '.menu'
//     });
//   },

//   // This is your true handler when a menu item is going to be active
//   handleSwitchMenuIndex: function(index) {
//     // ...
//   },

//   // `this.handleMouseLeaveMenu` and `this.handleMouseEnterRow` are provided by ReactMenuAim,
//   // you can provide your own handler bound to them
//   render: function() {
//     return (
//       <div className="menu-container">
//         <ul className="menu" onMouseLeave={this.handleMouseLeaveMenu}>
//           <li className="menu-item" onMouseEnter={this.handleMouseEnterRow.bind(this, 0, this.handleSwitchMenuIndex)}>Menu Item 1</li>
//           <li className="menu-item" onMouseEnter={this.handleMouseEnterRow.bind(this, 1, this.handleSwitchMenuIndex)}>Menu Item 2</li>
//         </ul>
//       </div>
//     );
//   }
// });

class Menu extends Component {
  constructor(props) {
    super(props)
    mixins: [ReactMenuAim]
  }
  componentWillMount() {
    // Config ReactMenuAim here
    this.initMenuAim({
      submenuDirection: 'right',
      menuSelector: '.menu'
    })
  }
    // This is your true handler when a menu item is going to be active
  handleSwitchMenuIndex(index) {
    // ...
  }
  // `this.handleMouseLeaveMenu` and `this.handleMouseEnterRow` are provided by ReactMenuAim,
  // you can provide your own handler bound to them
  render() {
    return (
      <div className="menu-container">
        <ul className="menu" onMouseLeave={this.handleMouseLeaveMenu}>
          <li className="menu-item" onMouseEnter={this.handleMouseEnterRow.bind(this, 0, this.handleSwitchMenuIndex)}>Menu Item 1</li>
          <li className="menu-item" onMouseEnter={this.handleMouseEnterRow.bind(this, 1, this.handleSwitchMenuIndex)}>Menu Item 2</li>
        </ul>
      </div>
    );
  }
}

export default Menu;
