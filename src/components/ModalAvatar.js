import React from 'react'
import { ModalContainer, ModalDialog } from 'react-modal-dialog'
import ReactCrop from 'react-image-crop'

//Stores
import JobStore from '../store/JobStore';

//Mixin
import mixins from 'es6-mixins';
import BackboneMixin from '../mixin/BackboneMixin';

import UserAvatar from 'react-user-avatar'
import Popup from '../components/Popup'

import '../ReactCrop.css'


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
			imageObject: null, 
			currentUser: null,
			result: null,
			isShowingModal: false
		}
		// this.uploadAvatar = this.uploadAvatar.bind(this);
		this.selectImage = this.selectImage.bind(this);

		mixins(BackboneMixin,this);
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			imgSrc: nextProps.imgSrc,
			isShowingModal: nextProps.isShowingModal
		})
	}
	onComplete(crop, pixelCrop) {
		var self = this;
      	this.setState({ crop });
      	resizeImage(this.state.imgSrc, 
      				pixelCrop.width, 
      				pixelCrop.width, 
      				pixelCrop.x,
      			    pixelCrop.y,
      			    function(dataUrl) {
      			    	self.setState({
      			    		result: dataUrl
      			    	}) 
      			    })
	}
	onImageLoaded(crop, image, pixelCrop) {
		var self = this;
		resizeImage(this.state.imgSrc, 
					pixelCrop.width, 
					pixelCrop.width, 
					pixelCrop.x, 
					pixelCrop.y, 
					function(dataUrl) { 
						self.setState({
							result: dataUrl
						}) 
					})
	}
	// uploadAvatar() {
	// 	var self = this;
	// 	var current_user = this.props.model.get("currentUser");
	// 	var ufouser_api_url = current_user.ufouser.api_url;
	// 	var headers = new Headers();
	// 	headers.append("Content-Type", "application/json")
	// 	headers.append("Authorization", "Token " + localStorage.token);
	// 	var request = new Request(
	// 	ufouser_api_url,
	// 	{
	// 		method: "PATCH",
	// 		headers: headers,
	// 		body: JSON.stringify({
	// 			avatar: this.state.result.split(",")[1]
	// 		})
	// 	})
	// 	fetch(request)
	// 		.then(function(r) {
	// 			return r.json();
	// 		})
	// 		.then(function(object) {
	// 			console.log('avatar response:', object)
	// 		})
	// }
	onInvalidImage() {
		console.log("invalid image")
	}
	onRemoveImage() {
		console.log("onRemoveImage")
	}
	async selectImage() {
		var self = this;
		this.setState({
			isShowingModal: true
		})
	  var file = this.refs.file.files[0];
	  var reader = new FileReader();
	  var url = reader.readAsDataURL(file);

			reader.onloadend = function (e) {
				self.setState({
					imgSrc: reader.result
				})
	    }.bind(this);
	}

	render() {
		var timestamp = Math.round(new Date().getTime()/1000);
		var htmlContent = <ReactCrop {...this.state} src={this.state.imgSrc} crop={this.state.crop} ellipse={true} keepSelection={true} onComplete={this.onComplete.bind(this)} onImageLoaded={this.onImageLoaded.bind(this)}/>
		var popupOptions = {
			title: "Foto auswählen und bearbeiten",
			subtitle: "",
			isShowingModal: this.state.isShowingModal,
			button: {left: "HOCHLADEN", right: "ABBRECHEN"},
			htmlContent: htmlContent,
			contentClassName: "popup-content-image",
			onLeftClick: function() {
				var image = this.state.result;
				this.props.getCroppedImg(image); 
				// this.uploadAvatar(); 
			}.bind(this),
			onRightClick: function() { this.setState({isShowingModal: false, result: null}) }.bind(this)
		}
	    var avatar = "";
	    var model = this.props.model;
	    if (!model.get("currentUserLoading")&&(!this.state.result)) {
	        avatar = model.get('currentUser').ufouser.avatar;
	    }
	    else {
	    	avatar = this.state.result
	    }
		return (
			<div>
				<div id="profileAvatar">
					<div className="img">
  				 		<UserAvatar size="100" name="User" src={avatar} />
					</div>
				</div>
				<label className="imageUpload">
					<div>
						<i className="fa fa-camera" aria-hidden="true"></i>
					</div>
				<input key={timestamp} ref="file" type="file" className="imageUpload" onChange={this.selectImage}/>
				</label>
			    <Popup {...popupOptions}/>
		    </div>
		);
	}
}