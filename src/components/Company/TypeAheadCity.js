import React from 'react'
import Typeahead from 'react-bootstrap-typeahead';

import '../../Typeahead.css'


export default class TypeAheadCity extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			options: [],
			cities: [],
			filterOption: ''
		}
		this.get_cities = this.get_cities.bind(this)();
		this.get_city = this.get_city.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.reset) {
			this.refs.typeaheadCity.getInstance().clear()
		}
	}
	componentWillMount() {
		this.get_city();
	}
	get_cities() {
		var self = this;
		var headers = new Headers();
		headers.append("Authorization", "Token " + localStorage.token);
		var request = new Request(
			'http://dev.jobufo.com/api/v1/geo/city/',
			{
				method: "GET",
				headers: headers
			})
		fetch(request)
				.then(function(r) {
					return r.json();
				})
				.then(function(objects) {
					console.log("result:", objects)
					var options = objects.map(function(obj) {
						return obj.name
					})
					self.setState({
						options: options,
						cities: objects
					})
		})
	}
	_handleChange(e) {
		console.log("in change")
	}
	get_city(value) {
		var cities = this.state.cities;
		var result = [];
		cities.map(function(city) {
			if (city.name == value) {
				result.push(city)
			}
		})
		return result[0]
	}
	_handleInputChange(value) {
		var city = this.get_city(value);
		this.props.setReset(false)
		this.props.getCity(city)
	}
	render() {
		return (
			<div>
				<Typeahead ref="typeaheadCity" selected={[this.props.city_name]} placeholder="Stadt" onChange={this._handleChange.bind(this)} onInputChange={this._handleInputChange.bind(this)} options={this.state.options}/>
			</div>
		);
	}
}
	// function citySearchSelect(elem, additions) {
	// 	additions = null;
		
	// 	$(elem + " input").keyup(function(){
	// 		var search = $(this).val();
	// 		var link = "http://dev.jobufo.com/api/v1/geo/city/";

	// 		$.ajax({
	// 			url: link,
	// 			type: "GET",
	// 			data: {search: search},
	// 			success: function(data) {
	// 				console.log(data);
	// 				var fields = $(elem + " .fields");
	// 				fields.empty();
	// 				for(var id in data) {
	// 					var name = data[id].name;
	// 					var code = data[id].pk;
	// 					var div = `<div class="item" data-code="${code}">${name}</div>`;
	// 					fields.append(div);
	// 				}

	// 				if (search != "" && data.length > 0)
	// 					$(elem + " .fields").show();
	// 				else 
	// 					$(elem + " .fields").hide();

	// 				fields.find(".item").click(function(){
	// 					var city = $(this).text();
	// 					var code = $(this).data("code");
	// 					fields.hide();
	// 					$(this).parent().parent().find("input").val(city);
	// 					$(this).parent().parent().find("input").data("code", code);

	// 					additions;
	// 					/**/
	// 				});
	// 			}
	// 		});
	// 	});	

	// }
