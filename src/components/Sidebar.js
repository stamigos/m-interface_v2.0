import React from 'react';
import { Link } from 'react-router'
				// <Link to="/">JOBS</Link>
				// <Link to="dashboard">DASHBOARD</Link>

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
	                <Link to="post-job"><span className="leader"><i className="fa fa-plus" aria-hidden="true"></i></span><span className="detail">JOB POSTEN</span></Link>
	              </li>
	              <li>
	                <Link to="dashboard"><span className="leader"><i className="fa fa-tachometer" aria-hidden="true"></i></span><span className="detail">ÜBERSICHT</span></Link>
	              </li>
	              <li>
	                <Link to="/"><span className="leader"><i className="fa fa-briefcase" aria-hidden="true"></i></span><span className="detail">JOBS</span></Link>
	              </li>
	              <li>
	                <Link to="company"><span className="leader"><i className="fa fa-building" aria-hidden="true"></i></span><span className="detail">UNTERNEHMEN</span></Link>
	              </li>
	            </ul>
	          </div>
	      	</div>
		);
	}
}