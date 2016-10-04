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
	// getFilteredJobs(jobs) {
 //        AppDispatcher.dispatch({
 //            actionType: 'get-filtered-jobs',
 //            value: jobs
 //        });
	// },
	getSelectedJob(job) {
        AppDispatcher.dispatch({
            actionType: 'get-selected-job',
            value: job
        });
	}
	// getFirstSelectedJob(job) {
	// 	AppDispatcher.dispatch({
 //            actionType: 'get-first-selected-job',
 //            value: job
	// 	})
	// }
}

export default actions;