import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import SidebarJobs from './Sidebar';
import FilterDropdown from './FilterDropdown';
// import Menu from './Menu';
// import TabClass from './Tab';
// import SidebarClass from './Sidebar';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
// ReactDOM.render(
// 	<SidebarClass />,
// 	document.getElementById('sidebar')
// );
// ReactDOM.render(
//   <SidebarJobs />,
//   document.getElementById('jobs')
// );
ReactDOM.render(
  <FilterDropdown />,
  document.getElementById('filters')
);
// ReactDOM.render(
//   <Menu />,
//   document.getElementById('menu')
// );
// ReactDOM.render(
//   <TabClass />,
//   document.getElementById('tabs')
// );