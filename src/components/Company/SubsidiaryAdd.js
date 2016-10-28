import React from 'react'
import SubsidiaryManagers from '../../components/Company/SubsidiaryManagers'
import TypeAheadCity from '../../components/Company/TypeAheadCity'


export default class SubsidiaryAdd extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			managerForm: false,
			submitManagerForm: false,
			//form data
			subsidiary_name: '',
			street: '',
			housenumber: '',
			postal_code: '',
			city_name: '',
			images_list: []
		};
	}
	getCity(city) {
		if (city) {
			this.setState({
				city_name: city.name
			})
			console.log("selected city:", city)
		}
	}
	getSubmitResult(result) {
		this.setState({
			submitManagerForm: !result
		})
	}
	handleSubsidiaryNameChange(e) {
		this.setState({
			subsidiary_name: e.target.value
		})
	}
	handleStreetChange(e) {
		this.setState({
			street: e.target.value
		})
	}
	handleHouseNumberChange(e) {
		this.setState({
			housenumber: e.target.value
		})
	}
	handlePostalCodeChange(e) {
		this.setState({
			postal_code: e.target.value
		})
	}
	onImageSelect() {
		var self = this;
		var file = this.refs.imageFile.files[0];
	    var reader = new FileReader();
		var url = reader.readAsDataURL(file);
		var images_list = this.state.images_list;

			reader.onloadend = function (e) {
				images_list.push({image: reader.result})
				console.log("images_list", images_list)
				self.setState({
					images_list: images_list
				})
		    }.bind(this);
	}
	onSubmit(e) {
		e.preventDefault();
		var self = this;

		var body = {};
		var city = {};
		var address = {};

		city.name = this.state.city_name;
		address.street = this.state.street;
		address.housenumber = this.state.housenumber;
		address.postal_code = this.state.postal_code;
		address.city = city;
		body.name = this.state.subsidiary_name;
		body.company = this.props.company.api_url;
		body.address = address;

		if (this.state.images_list[0] != null) {
			var images_list = this.state.images_list.map(function(image) {
				image.image = image.image.split(",")[1]
				return image
			})
			body.image_list = this.state.images_list
		}

		var headers = new Headers();
		headers.append("Content-Type", "application/json")
		headers.append("Authorization", "Token " + localStorage.token);
		var request = new Request(
			'http://dev.jobufo.com/api/v1/recruiting/subsidiary/',
			{
				method: "POST",
				headers: headers,
				body: JSON.stringify(body)
			})
		fetch(request)
				.then(function(r) {
					return r.json();
				})
				.then(function(result) {
					console.log('result:', result)
					self.props.openCompanyMain();
					// window.location.reload();
				})
	}
	removeImage(removeIndex) {
		var images_list = this.state.images_list;
		var result = []
		images_list.map(function(image, i) {
			if (image.index != removeIndex) {
				result.push(image)
			}
		})
		this.setState({
			images_list: result
		})
	}
	changeImageIndexLeft() {
		var images_list = this.state.images_list;
		var first_element = images_list[0]
		var last_element = images_list[images_list.length-1]
		var last_index = last_element.index;
        var images_list = images_list.map(function(image, i) {
        	if (last_index < image.index) {
        		last_index = image.index;
        	}
        	if (image.index == last_index) {
        		image.index = last_index - 1
        	} else {
	        	if (image.index > 0) {
        			image.index = image.index - 1
        		} 
	        	if (image.index == 0) {
        			image.index = last_index
        		}
        	}
        	return image
        })
        console.log("images after sort:", images_list)
		images_list.shift()
		images_list.push(first_element)
		this.setState({
			images_list: images_list
		})
	}
	changeImageIndexRight() {
		var images_list = this.state.images_list;
		var last_element = images_list[images_list.length-1]
		var last_index = last_element.index;
        var images_list = images_list.map(function(image, i) {
        	if (last_index < image.index) {
        		last_index = image.index;
        	}
        	if (image.index == last_index) {
        		image.index = 0
        	} else {
        		image.index = image.index + 1
        	}

        	return image
        })
        console.log("images before sort:", images_list)
		// images_list.pop()
		// images_list.unshift(last_element)
		images_list.sort(function(a, b) {
			if (a.index > b.index) {
				return 1;
			}
		})
		console.log("images after sort:", images_list)

		this.setState({
			images_list: images_list
		})
	}
	onImageSelect() {
		var self = this;
		var file = this.refs.imageFile.files[0];
	    var reader = new FileReader();
		var url = reader.readAsDataURL(file);
		var images_list = this.state.images_list;

			reader.onloadend = function (e) {
				var count = images_list.length;
				images_list.push({image: reader.result, index: count != 0 ? images_list.length + 1 : 0})
				self.setState({
					images_list: images_list
				})
		    }.bind(this);
	}
	render() {
		var self = this;
		var images_list = this.state.images_list;
		console.log("before:", images_list)
		images_list.sort(function(a, b) {
			if (a.index > b.index) {
				return 1;
			}
		})
		console.log("after:", images_list)

		var uploadedImages = images_list.map(function(image, i) {
			return (
				<li key={i} className="uploaded_file" style={{backgroundImage: 'url('+image.image+')'}}>
					<div className="uploaded_file--overlay">
						<div className="upload_file--buttons">
							<a onClick={self.changeImageIndexLeft.bind(self)} className="move_left"><i className="fa fa-arrow-left" aria-hidden="true"></i></a>
							<a onClick={self.removeImage.bind(self, image.index)} className="upload_file--button deleter"><i className="fa fa-trash" aria-hidden="true"></i></a>
							<a onClick={self.changeImageIndexRight.bind(self)} className="move_right"><i className="fa fa-arrow-right" aria-hidden="true"></i></a></div>
						</div>
				</li>)
		})
		return (
			<div>
				<div className="post-job-content-header align-center">
					<h1 className="title">Filiale ändern</h1>	
					<h2 className="subtitle">Hier kannst du die Filialdaten ändern</h2>
				</div>
				<form onSubmit={this.onSubmit.bind(this)} action="/company" method="post" role="form" className="profile-subsidiary-form" id="profile-subsidiary-form">
					<div className="form-wrapper">
						<div className="half">
							<label className="label" htmlFor="subsidiaryName">Filialname</label>
							<input onChange={this.handleSubsidiaryNameChange.bind(this)} value={this.state.subsidiary_name} type="text" name="subsidiaryName" id="subsidiaryName" className="half" placeholder="Filialname" />
						</div>
						<div className="half right">
							<label className="label" htmlFor="subsidiaryCompany">Unternehmensname</label>
							<input defaultValue={this.props.company.name} type="text" name="subsidiaryCompany" id="subsidiaryCompany" className="half right" placeholder="Company name" disabled />
						</div>
						<div className="half">
							<label className="label" htmlFor="subsidiaryStreet">Straße name</label>
							<input onChange={this.handleStreetChange.bind(this)} value={this.state.street} type="text" name="subsidiaryStreet" id="subsidiaryStreet" className="half" placeholder="Straße name" />
						</div>
						<div className="half right">
							<label className="label" htmlFor="subsidiaryHouse">Hausnummer</label>
							<input onChange={this.handleHouseNumberChange.bind(this)} value={this.state.housenumber} type="text" name="subsidiaryHouse" id="subsidiaryHouse" className="half right" placeholder="Hausnummer" />
						</div>
						<div className="half">
							<label className="label" htmlFor="subsidiaryPostCode">Postleitzahl</label>
							<input onChange={this.handlePostalCodeChange.bind(this)} value={this.state.postal_code} type="text" name="subsidiaryPostCode" id="subsidiaryPostCode" className="half" placeholder="Postleitzahl" />
						</div>
						<div className="half right" id="filial_city">
							<label className="label" htmlFor="subsidiaryCity">Stadt</label>
							<TypeAheadCity getCity={this.getCity.bind(this)} city_name={this.state.city_name} />
						</div>

						<div className="clear"></div>

						<label className="label-big">Filialbilder</label>
						<label className="upload-button" htmlFor="subsidiaryFile"><i className="fa fa-plus" aria-hidden="true"></i></label>
						<input ref="imageFile" onChange={this.onImageSelect.bind(this)} className="subsidiaryFile" accept="image/*" name="subsidiaryFile" id="subsidiaryFile" type="file" />
						
							<ul id="subsidiary_uploaded_files">
								{uploadedImages}
							</ul>
						<div className="clear"></div>


					</div>
					<div className="buttons">
						<div className="form-wrapper">
							<button type="submit" className="button-cv button-cv-full-red">Sichern</button>
							<button onClick={this.props.openCompanyMain} type="button" className="button-cv button-cv-transperent clear_subsidiary_form">Abbrechen</button>
							<div className="clear"></div>
						</div>
					</div>
				</form>
			</div>
		);
	}
}
						/*<SubsidiaryManagers subsidiary={this.props.subsidiary} />*/
