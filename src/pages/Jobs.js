import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import List from 'react-list-select'

import FilterDropdown from '../components/FilterDropdown'
import VacancyVideo from '../components/VacancyVideo'


class JobItem extends React.Component {
	render() {
		return (
			<li>
                <a className={this.props.isActive ? "job-item active": "job-item"}>
	                  <h2 className="title">Hello world!</h2>
	                  <h2 className="company">ECOVIS AG</h2>
	                  <h2 className="location"><i className="fa fa-map-marker" aria-hidden="true"></i>Rostock, Germany</h2>
                </a>
			</li>
		);
	}
}
const items = [
		<div>
	      <h2 className="title">Hello world!</h2>
	      <h2 className="company">ECOVIS AG</h2>
	      <h2 className="location"><i className="fa fa-map-marker" aria-hidden="true"></i>Rostock, Germany</h2>
		</div>,
		<div>
          <h2 className="title">Hello world!</h2>
	      <h2 className="company">ECOVIS AG</h2>
	      <h2 className="location"><i className="fa fa-map-marker" aria-hidden="true"></i>Rostock, Germany</h2>
	    </div>
	]
class JobsList extends React.Component {
	constructor(props) {
		super(props)
		var headers = new Headers();
		headers.append("Content-Type", 'application/json');
		var request = new Request(
			'http://dev.jobufo.com/api/auth/login/', 
			{
				method: "POST", 
			 	headers: headers, 
			 	body: JSON.stringify({
			 		email: 'oldtigersvoice@gmail.com', 
			 		password: 'test37'
			 	})
		    });

		fetch(request)
			  .then(function(response) {
			  	console.log('then1:', response)
			    return response.json();
			   })
			  .then(function(user) {
			  		console.log('then2:', user.key)
		  				var headers = new Headers();
						headers.append("Authorization", "Token " + user.key);
						var request = new Request(
							'http://dev.jobufo.com/api/v1/management/vacancy/?limit=100',
							{
								method: "GET",
								headers: headers
							})
						fetch(request)
			  				.then(function(r) {
			  					return r.json();
			  				})
			  				.then(function(object) {
			  					console.log('result:', object)
			  				})

			  });
	}
	render() {
		return (
                    <div className="jobs-container-wrapper">
                        <div className="jobs-container">
                        	<List items={items}
								  selected={[0]}
								  disabled={[4]}
								  multiple={false}
								  onChange={function (selected) { }} />
                      	</div>
                    </div>
		);
	}
}

export default class Jobs extends React.Component {
	render() {
	    return (
	    	<div>
	      	<div className="content-wrapper">
	      		<div className="content">
					<Tabs onSelect={this.handleSelect} selectedIndex={0}>

				        {/*
				          <TabList/> is a composit component and is the container for the <Tab/>s.
				        */}

				        <TabList>

				          {/*
				            <Tab/> is the actual tab component that users will interact with.

				            Selecting a tab can be done by either clicking with the mouse,
				            or by using the keyboard tab to give focus then navigating with
				            the arrow keys (right/down to select tab to the right of selected,
				            left/up to select tab to the left of selected).

				            The content of the <Tab/> (this.props.children) will be shown as the label.
				          */
				      		}

				          <Tab>offentlich</Tab>
				          <Tab>vorbereitet</Tab>
				          <Tab>geschlossen</Tab>
				        </TabList>

				        {/*
				          <TabPanel/> is the content for the tab.

				          There should be an equal number of <Tab/> and <TabPanel/> components.
				          <Tab/> and <TabPanel/> components are tied together by the order in
				          which they appear. The first (index 0) <Tab/> will be associated with
				          the <TabPanel/> of the same index. Running this example when
				          `selectedIndex` is 0 the tab with the label "Foo" will be selected
				          and the content shown will be "Hello from Foo".

				          As with <Tab/> the content of <TabPanel/> will be shown as the content.
				        */
				    	}

				        <TabPanel>
	  				          <div>
						          <FilterDropdown />
						         <h2 className="jobs-counter">2 <b>JOBS</b> ÖFFENTLICH</h2>
						         <JobsList />
					         </div>
				        </TabPanel>
				        <TabPanel>
    				          <div>
						          <FilterDropdown />
						         <h2 className="jobs-counter">2 <b>JOBS</b> ÖFFENTLICH</h2>
						         <JobsList />
					         </div>
				        </TabPanel>
				        <TabPanel>
    				          <div>
						          <FilterDropdown />
						         <h2 className="jobs-counter">2 <b>JOBS</b> ÖFFENTLICH</h2>
						         <JobsList />
					         </div>
				        </TabPanel>
				      </Tabs>

		        </div>
	        </div>

	        <div className="job-detail-wrapper">
	        	<div className="job-detail">
	        		<h1 className="title">Hello World!</h1>
		        	<div className="stats">
		        		<div className="salary">123</div>
		        		<div className="time">FULL_TIME</div>
		        		<div className="benefits">123</div>
		        		<div className="benefits">123</div>
	        		</div>
	        		<h2 className="company">ECOVIS AG</h2>
	        		<h2 className="location"><i className="fa fa-map-marker" aria-hidden="true"></i> Rostock, Germany</h2>
	        		<i className="fa fa-check-circle-o active-icon" aria-hidden="true"></i>
	        		<h2 className="status">Öffentlich seit 01.09.2016</h2>
	        		<div className="job-messages">
	        			<Tabs onSelect={this.handleSelect} selectedIndex={2}>
	        				{

	        				}
	        				<TabList>
	        					{

	        					}
	        					<Tab>
	        						<h2 className="new_applicant">00</h2>
	        						<h3>Bewerbungen</h3>
        						</Tab>
	        					<Tab>
	        						<h2>00</h2>
	        						<h3>Eingeladen</h3>
	        					</Tab>
	        					<Tab>
	        						<h2>00</h2>
	        						<h3>Abgelehnt</h3>
	        					</Tab>
        					</TabList>
        					{

        					}
					        <TabPanel>
					        		<VacancyVideo />
					        </TabPanel>
					        <TabPanel>
					          <h2>Hello from Bar</h2>
					        </TabPanel>
					        <TabPanel>
					          <h2>Hello from Baz</h2>
					        </TabPanel>
	        			</Tabs>
	        		</div>
	        	</div>
	        </div>
	      </div>
	    );
  }
}