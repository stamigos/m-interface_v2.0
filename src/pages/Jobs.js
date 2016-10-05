import React from 'react';
import Backbone from 'backbone';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import List from 'react-list-select'

//Stores
import JobStore from '../store/JobStore';

//Mixin
import mixins from 'es6-mixins';
import BackboneMixin from '../mixin/BackboneMixin';

//Actions
import AppActions from '../actions/AppActions';

import FilterDropdown from '../components/FilterDropdown'
import JobsList from '../components/JobsList'
import JobDetails from '../components/JobDetails'


export default class Jobs extends React.Component {
	constructor(props) {
		super(props);
		mixins(BackboneMixin,this);
		AppActions.getJobs();
		// AppActions.getSelectedJob(0);
	}
	render() {
	    return (
	    	<div>
	      	<div className="content-wrapper">
	      		<div className="content">
					<Tabs selectedIndex={0}>
				        {}
				        <TabList>
				          {}
				          <Tab>offentlich</Tab>
				          <Tab>vorbereitet</Tab>
				          <Tab>geschlossen</Tab>
				        </TabList>

				        {}

				        <TabPanel>
	  				          <div>
						          <FilterDropdown />
						         <JobsList model={JobStore} status="posted" statusTitle="ÖFFENTLICH" />
					         </div>
				        </TabPanel>
				        <TabPanel>
    				          <div>
						          <FilterDropdown />
						         <JobsList model={JobStore} status="scheduled" statusTitle="VORBEREITET" />
					         </div>
				        </TabPanel>
				        <TabPanel>
    				          <div>
						          <FilterDropdown />
						         <JobsList model={JobStore} status="closed" statusTitle="GESCHLOSSEN" />
					         </div>
				        </TabPanel>
				      </Tabs>

		        </div>
	        </div>
	        <JobDetails model={JobStore} />
	      </div>
	    );
  }
}