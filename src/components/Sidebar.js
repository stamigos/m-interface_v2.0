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
						<div id="smile">
							<a href="mailto:info@jobufo.com?subject=Ihr%20Feedback&amp;body=Liebes%20JobUFO-Team%2C%0Aich%20habe%20folgende%20Anregungen%20oder%20Lob%3A%0A%0A-%20%0A-%20%0A-%20%0A%0A%0AMit%20freundlichen%20Gr%C3%BC%C3%9Fen%0A%0AIhr%20JobUFO-Recruiter">
								<div><i className="fa fa-smile-o" aria-hidden="true"></i></div>
							</a>
						</div>
	      	</div>
		);
	}
}