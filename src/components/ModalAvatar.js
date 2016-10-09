import React from 'react'
import { ModalContainer, ModalDialog } from 'react-modal-dialog'
import ReactCrop from 'react-image-crop'

import '../ReactCrop.css'
// import Croppie from 'react-croppie'

			          		// <Croppie url={this.state.imgSrc} ref="reactCroppie"/>
function resizeImage(url, width, height, x, y, callback) {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext('2d');
    var imageObj = new Image();

    // set canvas dimensions

    canvas.width = width;
    canvas.height = height;

    imageObj.onload = function () {
        context.drawImage(imageObj, x, y, width, height, 0, 0, width, height);
        callback(canvas.toDataURL());
    };

    imageObj.src = url;
}
function getCurrentUser(_this){
	var self = _this;
	var headers = new Headers();
	headers.append("Authorization", "Token " + localStorage.token);
	var request = new Request(
		'http://dev.jobufo.com/api/auth/user/',
		{
			method: "GET",
			headers: headers
		})
	fetch(request)
			.then(function(r) {
				return r.json();
			})
			.then(function(object) {
				console.log('user id:', object.ufouser.pk)
				return object.ufouser.pk
				this.setState({currentUser: object.pk})
			})
}

export default class ModalAvatar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		    imgSrc: '',
		    crop: {
		    	x: 20,
		   	 	y: 20,
		    	width: 30,
		    	aspect: 1
			},
			currentUser: 227,
			imageObject: null
		}
		this.uploadAvatar = this.uploadAvatar.bind(this)
	}
	componentWillReceiveProps(nextProps) {
		getCurrentUser(this)
		this.setState({
			imgSrc: nextProps.imgSrc,
		})
	}
	onComplete(crop, pixelCrop) {
		var self = this;
		console.log("crop complete:", crop)
		console.log("pixel crop complete:", pixelCrop)
      	this.setState({ crop });
      	resizeImage(this.state.imgSrc, pixelCrop.width, pixelCrop.width, pixelCrop.x, pixelCrop.y, function(dataUrl) { self.uploadAvatar(dataUrl) })
	}
	onImageLoaded(crop, image) {
		console.log('Image was loaded. Crop:', crop);
		console.log('Image was loaded. Image:', image);
	}
	uploadAvatar(dataUrl) {
		console.log(dataUrl.split(";")[1])
		var self = this;
		var headers = new Headers();
		headers.append("Content-Type", "application/json")
		headers.append("Authorization", "Token " + localStorage.token);
		var request = new Request(
			'http://dev.jobufo.com/api/v1/media/image/',
			{
				method: "POST",
				headers: headers,
				body: JSON.stringify({
					image: dataUrl.split(",")[1]
				})
			})
		fetch(request)
				.then(function(r) {
					return r.json();
				})
				.then(function(object) {
					console.log('image uploaded:', object)
					var request = new Request(
					'http://dev.jobufo.com/api/v1/users/jobufo/'+self.state.currentUser+'/',
					{
						method: "PATCH",
						headers: headers,
						body: JSON.stringify({
							avatar: object
						})
					})
				fetch(request)
						.then(function(r) {
							return r.json();
						})
						.then(function(object) {
							console.log('avatar response:', object)
						})
				})
	}
	// onCropChange(crop) {
	// 	console.log("onChange")
	// 	this.setState({ crop })
	// }
	render() {
		return (
			    <ReactCrop {...this.state} src={this.state.imgSrc} crop={this.state.crop} ellipse={true} keepSelection={true} onComplete={this.onComplete.bind(this)} onImageLoaded={this.onImageLoaded.bind(this)}/>
		);
	}
}