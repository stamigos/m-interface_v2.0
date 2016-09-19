import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class FilterElement extends Component {
  render() {
    return (
            <option>{this.props.name}</option>
    );
  }
}
class Filter extends Component {
  // constructor(props){
  //   super(props)
  //   this.state = this.getState();
  //   this.onSelectChange = this.onSelectChange.bind(this)
  // }
  // getState() {
  //   return {
  //     jobTypeFilter: 'Alle jobs',
  //     locationFilter: 'Ort',
  //     subsidiaryFilter: 'Filiale',
  //     expanded: true
  //   }
  // }
  render() {
    return (
          <select className="filter-field">
            <FilterElement name={this.props.name}/>
            <FilterElement name='Job 1'/>
            <FilterElement name='Job 2'/>
          </select>
    );
  }
}
class FilterDropdown extends Component {
  constructor(props) {
    super(props)
    this.state = this.getState();
    this.onResetClick = this.onResetClick.bind(this)
    this.onExpandClick = this.onExpandClick.bind(this)
    // this.onSelectChange = this.onSelectChange.bind(this)
  }
  getState() {
    return {
      jobTypeFilter: 'Alle jobs',
      locationFilter: 'Ort',
      subsidiaryFilter: 'Filiale',
      collapsed: true
    }
  }
  // onSelectChange(event) {
  //   console.log(event.target.value)
  //   this.setState({
  //     optionValue: event.target.value
  //   })
  // }
  onResetClick() {
    // this.setState({
    //   jobTypeFilter: 'Alle jobs',
    //   locationFilter: 'Ort',
    //   subsidiaryFilter: 'Filiale'
    // })
    this.setState({      
      jobTypeFilter: 'Alle jobs',
      locationFilter: 'Ort',
      subsidiaryFilter: 'Filiale'
    })
  }
  onExpandClick() {
    this.setState({collapsed : !this.state.collapsed});
  }
  render() {
    return (
      <div className={this.state.collapsed ? 'divCollapsed': ''}>
        <div className="filter-dropdown">
          <a onClick={this.onExpandClick}>Filter<i className={this.state.collapsed ? 'fa fa-angle-down rotate': 'fa fa-angle-down rotate up'} aria-hidden="true"></i></a>
        </div>
        <div className={this.state.collapsed ? "filter collapsed" : "filter"}>
          <Filter name={this.state.jobTypeFilter} />
          <Filter name={this.state.locationFilter} />
          <Filter name={this.state.subsidiaryFilter} />
          <div className="reset-filter">
            <span>Zurücksetzen</span><div className="reset-x" onClick={this.onResetClick}></div>
          </div>
        </div>
      </div>
      )
  }
}

export default FilterDropdown;

ReactDOM.render(
  <FilterDropdown />,
  document.getElementById('filters')
);

