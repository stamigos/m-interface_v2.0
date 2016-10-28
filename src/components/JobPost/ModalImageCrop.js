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


export default class ModalImageCrop extends React.Component {
	constructor(props) {
		super()
		this.state = {
			imgSrc: "",
			ref_value: "",
			imageSelected: false,
			isShowingModal: false,
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
		console.log("componentWillReceiveProps")
		this.selectImage(nextProps);
	}
	componentDidMount() {
		console.log("componentDidMount")
		this.selectImage(this.props);
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
	async selectImage(props) {
		var self = this;
		console.log("imageSelected:", props.imageSelected)
		if (props.imageSelected) {
			var file = props.file.files[0];
		    var reader = new FileReader();
			var url = reader.readAsDataURL(file);

				reader.onloadend = function (e) {
						self.setState({
							imgSrc: reader.result
						})
			    }.bind(this);
			this.setState({
				isShowingModal: props.isShowingModal
			})
		}
	}
	render() {
		var htmlContent = <ReactCrop {...this.state} src={this.state.imgSrc} crop={this.state.crop} keepSelection={true} onComplete={this.onComplete.bind(this)} onImageLoaded={this.onImageLoaded.bind(this)}/>
		var popupOptions = {
			title: "Foto auswählen und bearbeiten",
			subtitle: "",
			contentClassName: "popup-content-image",
			isShowingModal: this.props.isShowingModal ,
			button: {left: "HOCHLADEN", right: "ABBRECHEN"},
			htmlContent: htmlContent,
			onLeftClick: function() {
				if (this.state.result) {
					this.props.getImage(this.state.result);
				}
				// var image = this.state.result;
				// this.props.getCroppedImg(image); 
				// this.uploadAvatar(); 
			}.bind(this),
			onRightClick: function() { this.props.close(); }.bind(this)
		}
		return (
			<Popup {...popupOptions}/>
		);
	}
}