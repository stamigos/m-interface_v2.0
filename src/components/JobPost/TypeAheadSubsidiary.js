import React from 'react'
import Typeahead from 'react-bootstrap-typeahead';

import '../../Typeahead.css'


export default class TypeAheadSubsidiary extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			options: [],
			subsidiaries: [],
			selected: ''
		}
		this.get_subsidiaries = this.get_subsidiaries.bind(this);
		this.get_subsidiary = this.get_subsidiary.bind(this);
	}
	componentWillMount() {
		this.get_subsidiaries();
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.reset) {
			this.refs.typeaheadSubsidiary.getInstance().clear()
		}
	}
	get_subsidiaries() {
		var self = this;
		var headers = new Headers();
		headers.append("Authorization", "Token " + localStorage.token);
		var request = new Request(
			'http://dev.jobufo.com/api/v1/management/subsidiary/',
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
					var selected = '';
					var options = objects.map(function(obj) {
						console.log("obj.pk:", obj.pk)
						console.log("selectedId:", self.props.selectedId)
						if (obj.pk == self.props.selectedId) {
							selected = {id: obj.pk, label: obj.name ? obj.name : ''}
						}
						return {id: obj.pk, label: obj.name ? obj.name : ''}
					})
					console.log("result selected:", selected)
					self.setState({
						options: options,
						subsidiaries: objects,
						selected: selected
					})
		})
	}
	_handleChange(e) {
		console.log("in change")
	}
	get_subsidiary(value) {
		var subsidiaries = this.state.subsidiaries;
		var result = [];
		var selected = [];
		subsidiaries.map(function(subsidiary) {
			if (subsidiary.name == value) {
				result.push(subsidiary)
			}
		})
		return result[0]
	}
	_handleInputChange(value) {
		var subsidiary = this.get_subsidiary(value);
		if (this.props.setReset) {
			this.props.setReset(false)
		}
		this.props.getSubsidiary(subsidiary)
	}
	render() {
		console.log("options:", this.state.options)
		return (
			<div>
				<Typeahead ref="typeaheadSubsidiary" selected={[this.state.selected]} placeholder="Subsidiary" onChange={this._handleChange.bind(this)} onInputChange={this._handleInputChange.bind(this)} options={this.state.options}/>
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
