import React from 'react';

export default class VideoButton extends React.Component {
	onClick() {
		if (this.props.paused){
			this.props.play()
		}
		else {
			this.props.pause()
		}
	}
	render() {
		console.log(this.props)
		return (
			<span className={this.props.paused ? ("video-button play") : ("video-button stop")} onClick={this.onClick.bind(this)}></span>
		);
	}
}