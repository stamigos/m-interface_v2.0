import React from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

export default class ModalProfile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		   isShowingModal: false,
		}
		this.handleClick = this.handleClick.bind(this);
		this.handleClose = this.handleClose.bind(this)
	}
	componentWillReceiveProps(nextProps) {
		console.log("componentWillReceiveProps")
		this.setState({isShowingModal: nextProps.isShowingModal})
	}
	handleClick() {
		this.setState({isShowingModal: true})
	}
	handleClose() {
		this.setState({isShowingModal: false})
	}
	render() {
		return (
			<a onClick={this.handleClick}>View full profile
		      {
		        this.state.isShowingModal &&
		        <ModalContainer onClose={this.handleClose}>
		          <ModalDialog onClose={this.handleClose}>
		            <div className="modal-profile-info"></div>
		            <p>More Content. Anything goes here</p>
		          </ModalDialog>
		        </ModalContainer>
		      }
		    </a>
		);
	}
}