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

import JobsList from '../components/JobsList'
import JobDetails from '../components/JobDetails'
import JobEdit from '../components/JobEdit'


export default class Jobs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			update: false,
			component: 0,
			selectedTab: 0
		}
		mixins(BackboneMixin,this);
		AppActions.getJobs();
		// AppActions.getSelectedJob(0);
		this.openVacancyDetail = this.openVacancyDetail.bind(this);
		this.openVacancyEdit = this.openVacancyEdit.bind(this);
	}
	updateList(update) {
		if (update) {
			AppActions.getJobs();
		}
	}
	openVacancyDetail() {
		this.setState({
			component: 0
		})
	}
	openVacancyEdit() {
		this.setState({
			component: 1
		})
	}
	handleSelect(index, last) {
		this.setState({
			selectedTab: index
		})
	}
	render() {
		var vacancyComponent;

		if (this.state.component === 0) {
			vacancyComponent = <JobDetails openVacancyEdit={this.openVacancyEdit} openVacancyDetail={this.openVacancyDetail} model={JobStore} updateList={this.updateList.bind(this)}/>
		} else if (this.state.component === 1) {
			vacancyComponent = <JobEdit openVacancyEdit={this.openVacancyEdit} openVacancyDetail={this.openVacancyDetail} model={JobStore} />
		}
	    return (
	    	<div>
	     	<div className="content-wrapper">
		     	{JobStore.get("loading") ? <ReactSpinner/> :
		      		(
						<Tabs selectedIndex={this.state.Tab} onSelect={this.handleSelect.bind(this)}>
					        {}
					        <TabList>
					          {}
					          <Tab>offentlich</Tab>
					          <Tab>vorbereitet</Tab>
					          <Tab>geschlossen</Tab>
					        </TabList>

					        {}

					        <TabPanel>
							         <JobsList openVacancyDetail={this.openVacancyDetail} model={JobStore} status="posted" statusTitle="ÖFFENTLICH" />
					        </TabPanel>
					        <TabPanel>
							         <JobsList openVacancyDetail={this.openVacancyDetail} model={JobStore} status="scheduled" statusTitle="VORBEREITET" />
					        </TabPanel>
					        <TabPanel>
							         <JobsList openVacancyDetail={this.openVacancyDetail} model={JobStore} status="closed" statusTitle="GESCHLOSSEN" />
					        </TabPanel>
					      </Tabs>

			        )}
	        </div>
	        	{vacancyComponent}
	      </div>
	    );
  }
}