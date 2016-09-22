import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

// import App from './App';
// import FilterDropdown from './FilterDropdown';

import Company from './pages/Company'
import Dashboard from './pages/Dashboard'
import Jobs from './pages/Jobs'
import Layout from './pages/Layout'
import PostJob from './pages/PostJob'

import './index.css';

const root = document.getElementById('root');

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>
			<IndexRoute component={Jobs}></IndexRoute>
			<Route path='post-job' component={PostJob}></Route>
			<Route path='dashboard' component={Dashboard}></Route>
			<Route path='company' component={Company}></Route>
		</Route>
	</Router>,
  root);
// ReactDOM.render(
// 	<SidebarClass />,
// 	document.getElementById('sidebar')
// );
// ReactDOM.render(
//   <SidebarJobs />,
//   document.getElementById('jobs')
// );
// ReactDOM.render(
//   <FilterDropdown />,
//   document.getElementById('filters')
// );
// ReactDOM.render(
//   <Menu />,
//   document.getElementById('menu')
// );
// ReactDOM.render(
//   <TabClass />,
//   document.getElementById('tabs')
// );