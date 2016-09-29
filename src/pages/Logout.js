import React from 'react';

export default class Logout extends React.Component {
	constructor() {
		super();
		delete localStorage.token;
	}
	render() {
		window.location.reload();
		return null;
	}
}