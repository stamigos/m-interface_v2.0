import React from 'react'
import ReactCrop from 'react-image-crop'

import Popup from '../Popup'


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

export default class LeftModalImageCrop extends React.Component {
	constructor(props) {
		super()
		this.state = {
			imgSrc: "",
			imageSelected: false,
		    crop: {
		    	x: 0,
		   	 	y: 0,
		    	width: 600,
		    	aspect: 16/9
			},
			result: ""
		}
		this.selectImage = this.selectImage.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			isShowingModal: nextProps.isShowingLeftModal
		})
	}
	onComplete(crop, pixelCrop) {
		var self = this;
      	this.setState({ crop });
      	resizeImage(this.state.imgSrc, 
      				pixelCrop.width, 
      				pixelCrop.height, 
      				pixelCrop.x,
      			    pixelCrop.y,
      			    function(dataUrl) {
      			    	self.setState({
      			    		imageSelected: true,
      			    		result: dataUrl
      			    	}) 
      			    })
	}
	onImageLoaded(crop, image, pixelCrop) {
		var self = this;
		resizeImage(this.state.imgSrc, 
					pixelCrop.width, 
					pixelCrop.heights, 
					pixelCrop.x, 
					pixelCrop.y, 
					function(dataUrl) { 
						self.setState({
							imageSelected: true,
							result: dataUrl
						}) 
					})
	}
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
		var file = this.refs.file1.files[0];
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
		var timestamp_popup = Math.round(new Date().getTime()/1010);

		var htmlContent = <ReactCrop {...this.state} src={this.state.imgSrc} crop={this.state.crop} keepSelection={true} onComplete={this.onComplete.bind(this)} onImageLoaded={this.onImageLoaded.bind(this)}/>
		var popupOptions = {
			title: "Foto auswählen und bearbeiten",
			subtitle: "",
			contentClassName: "popup-content-image",
			isShowingModal: this.state.isShowingModal ,
			button: {left: "HOCHLADEN", right: "ABBRECHEN"},
			htmlContent: htmlContent,
			onLeftClick: function() {
				if (this.state.result) {
					this.props.getLeftImage(this.state.result);
				}
				// var image = this.state.result;
				// this.props.getCroppedImg(image); 
				// this.uploadAvatar(); 
			}.bind(this),
			onRightClick: function() { this.setState({isShowingModal: false, result: null}) }.bind(this)
		}
		return (
			<div>
				<label className="upload-button" htmlFor="postjobImage_1" id="postjobImage_1_block">
					<i className="fa fa-camera" aria-hidden="true"></i>
					<input ref="file1" key={timestamp} accept="image/*" name="postjobImage_1" id="postjobImage_1" className="postjobImage" type="file" onChange={this.selectImage.bind(this)} />
				</label>
				{this.props.left_image_html}
				<Popup {...popupOptions}/>
			</div>
		);
	}
}