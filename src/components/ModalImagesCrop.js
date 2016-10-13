import React from 'react'
import Popup from '../components/Popup'
import AvatarCropper from "react-avatar-cropper";
import ReactCrop from 'react-image-crop'

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

export default class ModalImagesCrop extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowingLeftModal: false,
			isShowingRightModal: false,
		    imgSrcRight: '',
		    imgSrcLeft: '',
		    crop: {
		    	x: 0,
		   	 	y: 0,
		    	height: 100,
		    	aspect: 16/9
			},
			imageSelected: false,
			secondImageSelected: false,
			currentUser: 227,
			imageObject: null, 
			leftSelected: false,
			rightSelected: false,
			resultLeft: null,
			resultRight: null
		}
	}
	onLeftComplete(crop, pixelCrop) {
		var self = this;
      	this.setState({ crop });
      	resizeImage(this.state.imgSrcLeft, 
      				pixelCrop.width, 
      				pixelCrop.height,
      				pixelCrop.x, 
      				pixelCrop.y, 
      				function(dataUrl) { 
      					self.setState({
      						resultLeft:dataUrl
      					}) 
      				})
	}
	onRightComplete(crop, pixelCrop) {
		var self = this;
      	this.setState({ crop });
      	resizeImage(this.state.imgSrcRight, 
      				pixelCrop.width, 
      				pixelCrop.height,
      				pixelCrop.x, 
      				pixelCrop.y, 
      				function(dataUrl) { 
      					self.setState({
      						resultRight:dataUrl
      					}) 
      				})
	}
	selectLeftImage() {
		console.log("left seleted")
		var self = this;
		this.setState({
	    	isShowingLeftModal: true,
	    	leftSelected: true
	  	})
	  	var file = this.refs.file1.files[0];
	  	var reader = new FileReader();
	  	var url = reader.readAsDataURL(file);

   		reader.onloadend = function (e) {
   			self.setState({
   				imgSrcLeft: reader.result,
   			})
	    }.bind(this);
	}
	selectRightImage() {
		console.log("right seleted")
		var self = this;
		this.setState({
	    	isShowingRightModal: true,
	    	rightSelected: true
	  	})
	  	var file = this.refs.file2.files[0];
	  	var reader = new FileReader();
	  	var url = reader.readAsDataURL(file);

   		reader.onloadend = function (e) {
   			console.log("imgSrc:", [reader.result])
   			self.setState({
   				imgSrcRight: reader.result
   			})
	    }.bind(this);
	}
	onLeftImageLoaded(crop, image, pixelCrop) {
		var self = this;
	  	resizeImage(this.state.imgSrcLeft, 
			pixelCrop.width, 
			pixelCrop.width,
			pixelCrop.x, 
			pixelCrop.y, 
			function(dataUrl) { 
				self.setState({
					resultLeft:dataUrl
				}) 
			})
	}
	onRightImageLoaded(crop, image, pixelCrop) {
		var self = this;
	  	resizeImage(this.state.imgSrcRight, 
			pixelCrop.width, 
			pixelCrop.width,
			pixelCrop.x, 
			pixelCrop.y, 
			function(dataUrl) { 
				self.setState({
					resultRight:dataUrl
				}) 
			})
	}
	//<ReactCrop {...this.state} src={this.state.imgSrc} crop={this.state.crop} ellipse={true} keepSelection={true} onComplete={this.onComplete.bind(this)} onImageLoaded={this.onImageLoaded.bind(this)}/>
	render() {
		var timestamp = Math.round(new Date().getTime()/1000);
		// var popupOptions = {
		// 	title: "Position and size image",
		// 	subtitle: "",
		// 	isShowingModal: this.state.isShowingLeftModal,
		// 	button: {left: "HOCHLADEN", right: "ABBRECHEN"}
		// 	}
		if (this.state.leftSelected) {
			var htmlContent = <ReactCrop {...this.state} src={this.state.imgSrcLeft} keepSelection={true} onComplete={this.onLeftComplete.bind(this)} onImageLoaded={this.onLeftImageLoaded.bind(this)} />
			var popupOptions = {
			title: "Position and size image",
			subtitle: "",
			isShowingModal: this.state.isShowingLeftModal,
			button: {left: "HOCHLADEN", right: "ABBRECHEN"},
			htmlContent: htmlContent,
			onLeftClick: function() { this.setState({isShowingLeftModal: false, imageSelected: true }) }.bind(this),
			onRightClick: function() { this.setState({isShowingLeftModal: false, imageSelected: false}) }.bind(this)
			}
		}	
		if (this.state.rightSelected) {
			var htmlContent = <ReactCrop {...this.state} src={this.state.imgSrcRight} keepSelection={true} onComplete={this.onRightComplete.bind(this)} onImageLoaded={this.onRightImageLoaded.bind(this)} />
			var popupOptions = {
				title: "Position and size image",
				subtitle: "",
				isShowingModal: this.state.isShowingRightModal,
				button: {left: "HOCHLADEN", right: "ABBRECHEN"},
				htmlContent: htmlContent,
				onLeftClick: function() { this.setState({isShowingRightModal: false, secondImageSelected: true }) }.bind(this),
				onRightClick: function() { this.setState({isShowingRightModal: false, secondImageSelected: false}) }.bind(this)
			}
		}
		console.log('timestamp:', timestamp)
		return (
			<div>
				<label className="upload-button" htmlFor="postjobImage_1" id="postjobImage_1_block">
					{!this.state.imageSelected ?
						(
							<i className="fa fa-camera" aria-hidden="true"></i>
						) : (
							<img src={this.state.resultLeft}/>
						)
					}
				</label>
				<label className="upload-button" htmlFor="postjobImage_2" id="postjobImage_2_block">
					{!this.state.secondImageSelected ?
						(
							<i className="fa fa-camera" aria-hidden="true"></i>
						) : (
							<img src={this.state.resultRight}/>
						)
					}		
				</label>

				<input ref="file1" key={timestamp} accept="image/*" name="postjobImage_1" id="postjobImage_1" className="postjobImage" type="file" onChange={this.selectLeftImage.bind(this)} />
				<input ref="file2" key={timestamp-1} accept="image/*" name="postjobImage_2" id="postjobImage_2" className="postjobImage" type="file" onChange={this.selectRightImage.bind(this)} />
				<Popup {...popupOptions}/>
			</div>
		);
	}
}
// onRequestHide={this.handleRequestHide}

//<input accept="image/*" name="postjobImage_2" id="postjobImage_2" className="postjobImage" type="file" onChange={this.selectImage.bind(this)} />
