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


export default class RightModalImageCrop extends React.Component {
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
      			    		imageSelected: true,
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
		var file = this.refs.file2.files[0];
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
			isShowingModal: this.state.isShowingModal,
			button: {left: "HOCHLADEN", right: "ABBRECHEN"},
			htmlContent: htmlContent,
			onLeftClick: function() {
				this.props.getRightImage(this.state.result);
				this.setState({
					isShowingModal: false
				})
				// var image = this.state.result;
				// this.props.getCroppedImg(image); 
				// this.uploadAvatar(); 
			}.bind(this),
			onRightClick: function() { this.setState({isShowingModal: false, result: null}) }.bind(this)
		}
		return (
			<div>
				<label className="upload-button" htmlFor="postjobImage_2" id="postjobImage_2_block">
					<i className="fa fa-camera" aria-hidden="true"></i>
					{this.props.right_image_html}
					<input ref="file2" key={timestamp-1} accept="image/*" name="postjobImage_2" id="postjobImage_2" className="postjobImage" type="file" onChange={this.selectImage.bind(this)} />
				</label>

				<Popup {...popupOptions}/>
			</div>
		);
	}
}