import React from 'react'
import { default as Video, Controls, Play, Mute, Seek, Fullscreen, Time, Overlay } from 'react-html5video';
import Draggable, {DraggableCore} from 'react-draggable'
import jquery from 'jquery'

import '../../ReactHtml5Video.css'

var $ = jquery;

function positionToTime(x_current, seek_right) {
	var x_right = 600;
	var x_current = x_current + 300;
	var seek_right = seek_right;
	var seek_current = (seek_right * x_current)/x_right
	return seek_current
}
function filterTime(duration) {
	if (duration.minutes == 0) {
		duration.minutes = '00'
	}
	if (duration.seconds == 0) {
		duration.seconds = '00'
	}
	return duration
}
function secondsToMinutes(time) {
	var minutes = parseInt(time / 60, 10);
	var seconds = parseInt(time % 60, 10);
	return {minutes: minutes, 
			seconds: seconds}
}

export default class VideoPreview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeDrags: 0,
			selector_width: 0,
			duration: 0,
			current_duration: 0,
			startedFrom: 0,
			y_offset: 0
		}
		this.convertCropToVirtual = this.convertCropToVirtual.bind(this)
	}
	componentWillMount() {
		this.props.getCropParams({
			slice_start: 0,
			x_min: this.props.xy_params.x_min,
			x_max: this.props.xy_params.x_max,
			y_min: this.props.xy_params.y_min,
			y_max: this.props.xy_params.y_max,
			video: this.props.videoSrc
		})
		var crop = {
			slice_start: 0,
			x_min: this.props.xy_params.x_min,
			x_max: this.props.xy_params.x_max,
			y_min: this.props.xy_params.y_min,
			y_max: this.props.xy_params.y_max,
			video: this.props.videoSrc	
		}
	}
	convertCropToVirtual() {
		var y_min = this.props.xy_params.y_min;
		var real_height = $("#videoFile video")[0].videoHeight;
		console.log("videoHeight:", real_height);
		console.log("y_min:", y_min)
		var y_offset = (y_min*338)/real_height
		console.log("y_offset:", y_offset)
		if (!isNaN(y_offset)) {
			this.setState({
				y_offset: -Math.floor(y_offset)
			})
		}
	}
	onPlay() {
		var self = this;
		var waitTime = 150;
		setTimeout(function () {      
		  if (self.refs.video.state.paused) {
		  		self.refs.video.play();
		  } else {
		  		self.refs.video.pause();
		  }
		}, waitTime);
	}
	onDragStart(e, ui) {
		console.log("ui before", ui)
		e.stopPropagation();
        this.setState({
        	activeDrags: ++this.state.activeDrags
    	})
	}
	onDragStop(e, ui) {
		this.refs.video.pause()
		var seek_right = this.refs.video.state.duration
		var seek_current = positionToTime(ui.x, seek_right)
		this.refs.video.seek(seek_current)
        this.setState({
        	activeDrags: --this.state.activeDrags,
        	startedFrom: seek_current,
    	})
		var self = this;
		var waitTime = 150;
		setTimeout(function () {      
		  if (self.refs.video.state.paused) {
		  		self.refs.video.play();
		  } 
		}, waitTime);
    	this.props.getCropParams({
			slice_start: Math.floor(seek_current),
		})
	}
	onTimeUpdate() {
		var difference = this.refs.video.state.currentTime - this.state.startedFrom;
		if (difference > 10) {
			this.refs.video.seek(this.state.startedFrom)
			this.setState({
				current_duration: this.state.startedFrom
			})
		}
		else {
			this.setState({
				current_duration: this.refs.video.state.currentTime
			})
		}
	}
	onLoadedData() {
		console.log("loaded")
		this.convertCropToVirtual()
		this.setState({
			duration: this.refs.video.state.duration,
			current_duration: this.refs.video.state.currentTime,
			startedFrom: this.refs.video.state.currentTime,
		})
		this.props.getCropParams({
			slice_start: Math.floor(this.refs.video.state.currentTime),
		})
	}
	onClear() {
		this.props.onClear(false)
	}
	render() {
		// this.refs.video.seek(29)
		var timestamp = Math.round(new Date().getTime()/1000);
		const dragHandlers = {onStart: this.onDragStart.bind(this), onStop: this.onDragStop.bind(this)};
		console.log("selector_width:", this.state.selector_width)
		var left_bound = -300;
		var right_bound = -left_bound;
		var duration = secondsToMinutes(this.state.duration);
			duration = filterTime(duration)
		var current_duration = secondsToMinutes(this.state.current_duration)
			current_duration = filterTime(current_duration)
		return (
			<div>
				<div id="postJobUploadedFilesVideo">
					<div id="videoFile" style={{marginTop: this.state.y_offset}}>
				        <Video controls ref="video" onTimeUpdate={this.onTimeUpdate.bind(this)} onLoadedData={this.onLoadedData.bind(this)}>
							  <source type="video/mp4" src={this.props.videoSrc} /> 
							  <source type="video/ogg" src={this.props.videoSrc} /> 
							  <source type="video/webm" src={this.props.videoSrc} /> 
							  <Controls />
  				        </Video>
					</div>
					<div className="overlay">
						<div className="subsidiaryVideo-preview-buttons">
							<div className="subsidiaryVideo-preview-button editor">
								<label id="subsidiaryVideo-preview-upload-button" htmlFor="postjobVideo"><i className="fa fa-pencil" aria-hidden="true"></i></label>
							</div>
							<div className="subsidiaryVideo-preview-button deleter">
								<a onClick={this.onClear.bind(this)}><i className="fa fa-trash" aria-hidden="true"></i></a>
							</div>
						</div>

						<div className="help">Verschiebe die rote Markierung um die 10 Sekunden auszuwählen, die bereits in der Jobliste gezeigt werden sollen. Das gesamte Video findet man trotzdem in der Stellenanzeige.</div>
						
						<div className="play" onClick={this.onPlay.bind(this)}></div>
						
						<div className="duration">
							<div className="field"></div>

				        	<Draggable axis="x" bounds={{left: left_bound, right: right_bound}} {...dragHandlers}>
								<div className="selector">
									<i className="fa fa-angle-left" aria-hidden="true"></i>
									<span>10 SEC</span>
									<i className="fa fa-angle-right" aria-hidden="true"></i>
								</div>
							</Draggable>

							<div className="time">
								<b>{current_duration.minutes}:{current_duration.seconds}</b> / <span>{duration.minutes}:{duration.seconds}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
