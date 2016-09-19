import React, { Component } from 'react';
import './index.css';

class SidebarJobs extends Component {
  constructor() {
    super();
    this.state = {
      jobs: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({jobs: !this.state.jobs});
  }
  render() {
    const text = this.state.jobs ? 'jobs' : null;
    return (
      <a className="selected" onClick={this.handleClick}>
        <span className="leader">
          <i className="fa fa-briefcase" aria-hidden="true"></i>
        </span>
        <span className="detail">JOBS</span>
      </a>
    );
  }
}

export default SidebarJobs;
