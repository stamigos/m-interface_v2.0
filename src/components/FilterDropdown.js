import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import TypeAheadCity from './Company/TypeAheadCity'
import TypeAheadSubsidiary from './JobPost/TypeAheadSubsidiary'


export default class FilterDropdown extends Component {
  constructor(props) {
      super(props)
      this.state = {
          collapsed: true,
          subsidiary: '',
          city: '',
          kind: '',
          reset: false
      }
      this.onResetClick = this.onResetClick.bind(this)
      this.onExpandClick = this.onExpandClick.bind(this)
  } 
  onResetClick() {
      this.props.getFilters({
          subsidiary: null, 
          city: null, 
          kind: null
      })
      this.setState({      
          subsidiary: '',
          city: '',
          kind: '',
          reset: true
      })
  }
  setReset(reset) {
      this.setState({
          reset: reset
      })
  }
  onExpandClick() {
      this.setState({collapsed : !this.state.collapsed});
  }
  getSubsidiary(subsidiary) {
      this.props.getFilters({
          subsidiary: subsidiary, 
          city: this.state.city, 
          kind: this.state.kind
      })
      this.setState({
          subsidiary: subsidiary
      })
  }
  getCity(city) {
      this.props.getFilters({
          subsidiary: this.state.subsidiary, 
          city: city, 
          kind: this.state.kind
      })
      this.setState({
          city: city
      })
  }
  getKind(e) {
      this.props.getFilters({
          subsidiary: this.state.subsidiary, 
          city: this.state.city, 
          kind: e.target.value
      })
      this.setState({
          kind: e.target.value
      })
  }
  render() {
    return (
      <div className={this.state.collapsed ? 'divCollapsed': ''}>
        <div className="filter-dropdown">
          <a onClick={this.onExpandClick}>Filter<i className={this.state.collapsed ? 'fa fa-angle-down rotate': 'fa fa-angle-down rotate up'} aria-hidden="true"></i></a>
        </div>
        <div className={this.state.collapsed ? "filter collapsed" : "filter"}>
            <select onChange={this.getKind.bind(this)} className="filter-field" value={this.state.kind}>
                <option value="">Alle Jobs</option>
                <option value="FULL_TIME">Vollzeit</option>
                <option value="PART_TIME">Teilzeit</option>
                <option value="INTERN">Praktikum</option>
                <option value="VOCATIONAL_TRAINING">Ausbildung</option>
                <option value="TEMPORARY">Nebenjob / Minijob</option>;
            </select>
            <TypeAheadCity getCity={this.getCity.bind(this)} reset={this.state.reset} setReset={this.setReset.bind(this)}/>
            <TypeAheadSubsidiary getSubsidiary={this.getSubsidiary.bind(this)} reset={this.state.reset} setReset={this.setReset.bind(this)}/>
          <div className="reset-filter">
              <span onClick={this.onResetClick}>Zurücksetzen</span><div className="reset-x" onClick={this.onResetClick}></div>
          </div>
        </div>
      </div>
      )
  }
}
