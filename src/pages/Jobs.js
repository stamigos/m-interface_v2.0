import React from 'react';
import ReactSpinner from 'react-spinjs'
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
		     	{JobStore.get("loading") ? <ReactSpinner/> :
		      		(<div className="content">
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
							         <FilterDropdown />
							         <JobsList model={JobStore} status="posted" statusTitle="ÖFFENTLICH" />
					        </TabPanel>
					        <TabPanel>
							         <FilterDropdown />
							         <JobsList model={JobStore} status="scheduled" statusTitle="VORBEREITET" />
					        </TabPanel>
					        <TabPanel>
							         <FilterDropdown />
							         <JobsList model={JobStore} status="closed" statusTitle="GESCHLOSSEN" />
					        </TabPanel>
					      </Tabs>

			        </div>)}
	        </div>
       	    <JobDetails model={JobStore} />
	      </div>
	    );
  }
}