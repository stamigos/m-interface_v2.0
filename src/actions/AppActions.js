import AppDispatcher from '../dispatcher/AppDispatcher';

var actions = {
	getJobs() {
		var self = this;
		var headers = new Headers();
		headers.append("Authorization", "Token " + localStorage.token);
		var request = new Request(
			'http://dev.jobufo.com/api/v1/management/vacancy/?limit=100',
			{
				method: "GET",
				headers: headers
			})
		fetch(request)
				.then(function(r) {
					return r.json();
				})
				.then(function(objects) {
					console.log(objects)
	                AppDispatcher.dispatch({
	                    actionType: 'get-jobs',
	                    value: objects
	                });
		})
	},
	getSelectedJob(job) {
        AppDispatcher.dispatch({
            actionType: 'get-selected-job',
            value: job
        });
	},
	getCurrentUser() {
		var headers = new Headers();
		headers.append("Authorization", "Token " + localStorage.token);
		var request = new Request(
			'http://dev.jobufo.com/api/auth/user/',
			{
				method: "GET",
				headers: headers
			})
		fetch(request)
				.then(function(r) {
					return r.json();
				})
				.then(function(object) {
					if (object.hasOwnProperty("detail")) {
						if (localStorage.token) {
							delete localStorage.token;
							window.location.reload();
						}
					}
			        AppDispatcher.dispatch({
					    actionType: 'get-current-user',
					    value: object
					});
				})
	},
	getSubsidiaries() {
		var self = this;
		var headers = new Headers();
		headers.append("Authorization", "Token " + localStorage.token);
		var request = new Request(
			'http://dev.jobufo.com/api/v1/management/subsidiary/',
			{
				method: "GET",
				headers: headers
			})
		fetch(request)
				.then(function(r) {
					return r.json();
				})
				.then(function(objects) {
					console.log('subsidiaries:',objects)
			        AppDispatcher.dispatch({
					    actionType: 'get-subsidiaries',
					    value: objects
					});
				})

	},
	getCompanies() {
		var self = this;
		var headers = new Headers();
		headers.append("Authorization", "Token " + localStorage.token);
		var request = new Request(
			'http://dev.jobufo.com/api/v1/management/company/',
			{
				method: "GET",
				headers: headers
			})
		fetch(request)
				.then(function(r) {
					return r.json();
				})
				.then(function(objects) {
					console.log('companies:',objects);
			        AppDispatcher.dispatch({
					    actionType: 'get-companies',
					    value: objects
					});
				})
	}
}

export default actions;