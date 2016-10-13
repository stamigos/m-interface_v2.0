import React, {PropTypes} from 'react'
import ReactSpinner from 'react-spinjs'
import Draggable, {DraggableCore} from 'react-draggable'
import jquery from 'jquery'

import Popup from '../Popup'
import VideoButton from '../VideoButton'
import VideoPreview from './VideoPreview'



			  // <RdxVideo {...videoProps} store={store}>
			  //   <Overlay />
			  //   <Controls />
			  //   <source src="http://dev.jobufo.com/media/baccf77a-0941-4d0b-96cb-a8b92054c3c0.mp4" type="video/mp4" />
			  // </RdxVideo>
  				            //   <Controls>
				              //     <VideoButton type="play"/>
				              //     <VideoButton type="stop"/>
				              // </Controls>
var $ = jquery;
console.log("jquery:", $("div"))
export default class ModalVideoCrop extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowingModal: false,
			videoSrc: '',
			activeDrags: 0,
			isLoading: true,
			cropped: false
		}
	}
	cropVideo() {
		this.setState({
			cropped: true,
			isShowingModal: false,
			isLoading: true
		})
		console.log("cropVideo")
	}
	onCancel() {
		this.setState({
			isShowingModal: false
		})
	}
	async selectVideo(e) {
		var self = this;
	  	var file = this.refs.file.files[0];
	  	var reader = new FileReader();
	  	var url = reader.readAsDataURL(file);
	  	this.setState({
	  	  	isShowingModal: true
	  	})

		reader.onloadend = function (e) {
			self.setState({
				cropped: false,
				videoSrc: reader.result,
				isLoading: false
			})
	    }.bind(this);
	}
    onDragStart(e, ui) {
        console.log("ui:", ui)
        console.log("width", $(".popup-content video").width());
		console.log("offsetWidth", $(".popup-content video")[0].videoHeight);
        this.setState({
        	activeDrags: ++this.state.activeDrags,
        	videoWidth: $(".popup-content video").width(),
       		videoHeight: $(".popup-content video").height()
        });
    }
    onDragStop(e, ui) {
        console.log("ui:", ui)
        this.setState({
       		activeDrags: --this.state.activeDrags,
       		videoWidth: $(".popup-content video").width(),
       		videoHeight: $(".popup-content video").height()
       	});
    }
    onClear(cropped) {
    	this.setState({
    		cropped: cropped
    	})
    }
    //{{left: -100, right: 100}}
	render() {
		var timestamp = Math.round(new Date().getTime()/1000);
		var videoWidth = this.state.videoWidth;
		var videoHeight = this.state.videoHeight;
		var top = -(videoHeight - 338);
		const dragHandlers = {onStart: this.onDragStart.bind(this), onStop: this.onDragStop.bind(this)};
		var htmlContent = this.state.isLoading ?
	            				<ReactSpinner/> : 
	            				(<Draggable axis="y" bounds={{top: top, bottom: 0}} {...dragHandlers}>
									<video preload="auto"> 
									  <source type="video/mp4" src={this.state.videoSrc} /> 
									  <source type="video/ogg" src={this.state.videoSrc} /> 
									  <source type="video/webm" src={this.state.videoSrc} /> 
								    </video>
								</Draggable>)
		var popupOptions = {
			title: "Position and size video",
			subtitle: "",
			isShowingModal: this.state.isShowingModal,
			button: {left: "HOCHLADEN", right: "ABBRECHEN"},
			htmlContent: htmlContent,
			onLeftClick: this.cropVideo.bind(this),
			onRightClick: this.onCancel.bind(this)
		}
		return (
			<div>
				<label className="label-big" htmlFor="JobDescription">Video des Jobs</label>
				<label id="postjobVideo-label" className="upload-button" htmlFor="postjobVideo">
					<i className="fa fa-video-camera" aria-hidden="true"></i>
					<span>JobUFO’s Videos sind im Format 16:9.<br />
					Wenn dein Video größer ist, helfen wir dir hier es zuzuschneiden.</span>
				</label>
				<input key={timestamp} onChange={this.selectVideo.bind(this)} ref="file" className="fileinput" accept="video/*" name="postjobVideo" id="postjobVideo" type="file" />
				<Popup {...popupOptions} />
				{this.state.cropped ? (
					<VideoPreview videoSrc={this.state.videoSrc} onClear={this.onClear.bind(this)} />
				):(
					<div></div>
				)}
			</div>
		);
	}
}
					// <div className="overlay">
					// 	<div className="subsidiaryVideo-preview-buttons">
					// 		<div className="subsidiaryVideo-preview-button editor">
					// 			<label id="subsidiaryVideo-preview-upload-button" htmlFor="postjobVideo"><i className="fa fa-pencil" aria-hidden="true"></i></label>
					// 		</div>
					// 		<div className="subsidiaryVideo-preview-button deleter">
					// 			<a href=""><i className="fa fa-trash" aria-hidden="true"></i></a>
					// 		</div>
					// 	</div>

					// 	<div className="help">Verschiebe die rote Markierung um die 10 Sekunden auszuwählen, die bereits in der Jobliste gezeigt werden sollen. Das gesamte Video findet man trotzdem in der Stellenanzeige.</div>

					// 	<div className="play"></div>

					// 	<div className="duration">
					// 		<div className="field"></div>
					// 		<div className="selector">
					// 			<i className="fa fa-angle-left" aria-hidden="true"></i>
					// 			<span>10 SEC</span>
					// 			<i className="fa fa-angle-right" aria-hidden="true"></i>
					// 		</div>
					// 		<div className="time">
					// 			<b>1:20</b> / <span>2:00</span>
					// 		</div>
					// 	</div>
					// </div>



				// <div id="postJobUploadedFilesVideo">
				// 	<div id="videoFile"></div>
				// 	<div className="overlay">
				// 		<div className="subsidiaryVideo-preview-buttons">
				// 			<div className="subsidiaryVideo-preview-button editor">
				// 				<label id="subsidiaryVideo-preview-upload-button" htmlFor="postjobVideo"><i className="fa fa-pencil" aria-hidden="true"></i></label>
				// 			</div>
				// 			<div className="subsidiaryVideo-preview-button deleter">
				// 				<a href=""><i className="fa fa-trash" aria-hidden="true"></i></a>
				// 			</div>
				// 		</div>

				// 		<div className="help">Verschiebe die rote Markierung um die 10 Sekunden auszuwählen, die bereits in der Jobliste gezeigt werden sollen. Das gesamte Video findet man trotzdem in der Stellenanzeige.</div>

				// 		<div className="play"></div>

				// 		<div className="duration">
				// 			<div className="field"></div>
				// 			<div className="selector">
				// 				<i className="fa fa-angle-left" aria-hidden="true"></i>
				// 				<span>10 SEC</span>
				// 				<i className="fa fa-angle-right" aria-hidden="true"></i>
				// 			</div>
				// 			<div className="time">
				// 				<b>1:20</b> / <span>2:00</span>
				// 			</div>
				// 		</div>
				// 	</div>
				// </div>