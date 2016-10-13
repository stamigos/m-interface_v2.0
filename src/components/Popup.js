import React from 'react'
import { ModalContainer, ModalDialog } from 'react-modal-dialog'

import '../popup.css'

export default class Popup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowingModal: false,
			title: '',
			subtitle: '',
			content: '',
			contentClassName: 'popup-content',
			button: {
				visible: false,
				left: '',
				right: ''
			},
			onLeftClick: function() {},
			onRightClick: function() {}
		}
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			isShowingModal: nextProps.isShowingModal,
			header: nextProps.header,
			title: nextProps.title,
			subtitle: nextProps.subtitle,
			content: nextProps.htmlContent,
			contentClassName: nextProps.hasOwnProperty("contentClassName") ? (nextProps.contentClassName):(this.state.contentClassName),
			button: {
				visible: true,
				left: nextProps.button.left,
				right: nextProps.button.right,
			},
			onLeftClick: nextProps.onLeftClick,
			onRightClick: nextProps.onRightClick
		})
	}
	handleClose() {
		this.setState({
			isShowingModal: false
		})
	}
	onLeftClick() {
		this.state.onLeftClick();
	}
	onRightClick() {
		this.state.onRightClick();
	}
	render() {
		return (
			<div>
		      	{this.state.isShowingModal &&
		        <ModalContainer onClose={this.handleClose.bind(this)}>
		          	<ModalDialog>
		          		<div className="popup-container">
			          		<div className="popup-header">
			          			<h1>{this.state.title}</h1>
			          			<h2>{this.state.subtitle}</h2>
			          		</div>
				          		<div className={this.state.contentClassName}>
				          			{this.state.content}
				          		</div>
			          		{this.state.button.visible &&
				          		<div className="bottom">
									<div className="crop" onClick={this.onLeftClick.bind(this)}>{this.state.button.left}</div>
									<div className="cancel" onClick={this.onRightClick.bind(this)}>{this.state.button.right}</div>
								</div>
							}
		          		</div>
	          		</ModalDialog>
	          	</ModalContainer>
          		}
          	</div>
		);
	}
}