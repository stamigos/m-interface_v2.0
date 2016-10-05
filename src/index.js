import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Company from './pages/Company'
import Dashboard from './pages/Dashboard'
import Jobs from './pages/Jobs'
import Layout from './pages/Layout'
import PostJob from './pages/PostJob'
import Login from './pages/Login'
import Logout from './pages/Logout'

import './index.css';
// import './admin.css';

const root = document.getElementById('root');

function requireAuth(nextState, replace) {
	var loggedIn = (!!localStorage.token);
	  if (!loggedIn) {
	    replace({
	      pathname: '/login',
	      state: { nextPathname: nextState.location.pathname }
	    })
	  }
}
function afterLogin(nextState, replace) {
	var loggedIn = (!!localStorage.token);
	  if (loggedIn) {
	    replace({
	      pathname: '/',
	      state: { nextPathname: nextState.location.pathname }
	    })
	  }
}
ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>
			<IndexRoute component={Jobs} onEnter={requireAuth}></IndexRoute>
			<Route path='post-job' component={PostJob} onEnter={requireAuth}></Route>
			<Route path='dashboard' component={Dashboard} onEnter={requireAuth}></Route>
			<Route path='company' component={Company} onEnter={requireAuth}></Route>
			<Route path='login' component={Login} onEnter={afterLogin}></Route>
			<Route path='logout' component={Logout} onEnter={requireAuth}></Route>
		</Route>
	</Router>,
  root);
