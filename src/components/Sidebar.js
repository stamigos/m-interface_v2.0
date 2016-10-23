import React from 'react'
import { IndexLink } from 'react-router'

export default class Sidebar extends React.Component {
	render() {
		return (
      		<div className="sidebar-wrapper">
	          <div className="sidebar">
	            <ul>
	              <li>
	                <a id="toggle" onClick={this.props.onToggleClick}><span className="leader"><i className="fa fa-bars" aria-hidden="true"></i></span><span className="detail"></span></a>
	              </li>
	              <li>
	                <IndexLink to="post-job"><span className="leader"><i className="fa fa-plus" aria-hidden="true"></i></span><span className="detail">JOB POSTEN</span></IndexLink>
	              </li>
	              <li>
	                <IndexLink to="dashboard" activeClassName="selected"><span className="leader"><i className="fa fa-tachometer" aria-hidden="true"></i></span><span className="detail">ÜBERSICHT</span></IndexLink>
	              </li>
	              <li>
	                <IndexLink to="/" activeClassName="selected"><span className="leader"><i className="fa fa-briefcase" aria-hidden="true"></i></span><span className="detail">JOBS</span></IndexLink>
	              </li>
	              <li>
	                <IndexLink to="company" activeClassName="selected"><span className="leader"><i className="fa fa-building" aria-hidden="true"></i></span><span className="detail">UNTERNEHMEN</span></IndexLink>
	              </li>
	            </ul>
	          </div>
	      	</div>
		);
	}
}