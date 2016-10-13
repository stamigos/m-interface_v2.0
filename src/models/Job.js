import Backbone from 'backbone';
import AppDispatcher from '../dispatcher/AppDispatcher';

//Mixin
import mixins from 'es6-mixins';
import BackboneMixin from '../mixin/BackboneMixin';

function addDays(publication_date, days) {
        var newdate = new Date(publication_date);
        newdate.setDate(publication_date.getDate() + days);
        return newdate;
    }
function vacancyStatus(vacancy){
        var publication_date = new Date(vacancy.publication_date);
        var start_date       = new Date(vacancy.vacancy_start);
        var publication_end  = addDays(publication_date, vacancy.publication_duration);
        var today            = new Date();
        if (publication_end < today || vacancy.is_active == false)
            return 'closed';
        else if (publication_date <= today)
            return 'posted';
        else if (publication_date > start_date && publication_date > today)
            return 'scheduled';
};

/**
 * I prefer to use Backbone Models for stores because:
 *  + I get the Event Emitter for free.
 *  + Also in more complicated apps I can use the Router
 */

class Job extends Backbone.Model {

    constructor () {
        super();
        this.dispatchToken = AppDispatcher.register(this.dispatchCallback.bind(this));
        mixins(BackboneMixin, this);
    }

    defaults() {
        return {
            loading: true,
            currentUserLoading: true,
            subsidiaries: [],
            subsidiariesLoading: true,
            companies:[],
            companiesLoading: true,
            jobs: [],
            posted: [],
            scheduled: [],
            closed: [],
            filteredJobs: [],
            selectedJobPassed: true,
            currentUser: null,
            selectedJob: {
                company: {name: ''},
                title: '',
                description: '',
                kind: '',
                address: {
                    city: {name: ''}
                },
                payment: '',
                working_hours: '',
                vacancy_start: '',
                publication_date: false,
                publication_duration: '',
                is_active: '',
                video: '',
                payment: '',
                top_job: '',
                image_list: '',
                is_favored: '',
                created_at: '',
                last_modified: '',
                benefit_1: false,
                benefit_2: false,
                application_list: []
            }
        }
    }

    sync (method, model, options) {

        /**
         * We could do the API request here
         * but I have moved requests to the Actions
         */

        return;
    }

    dispatchCallback (payload) {
        switch (payload.actionType) {
            case 'get-jobs':
                var posted = []
                var scheduled = []
                var closed = []
                payload.value.map(function(job) {
                    if (vacancyStatus(job) == "posted") {
                        posted.push(job)
                    }
                    if (vacancyStatus(job) == "scheduled") {
                        scheduled.push(job)
                    }
                    if (vacancyStatus(job) == "closed") {
                        closed.push(job)
                    }
                })
                this.set("posted", posted)
                this.set("scheduled", scheduled)
                this.set("closed", closed)
                this.set("jobs", payload.value)
                this.set("loading", false)
                this.set("selectedJob", posted[0])
                break;
            case 'get-selected-job':
                this.set("selectedJob", payload.value)
                break;
            case 'get-current-user':
                this.set("currentUser", payload.value)
                this.set("currentUserLoading", false)
                break;
            case 'get-subsidiaries':
                this.set("subsidiaries", payload.value)
                this.set("subsidiariesLoading", false)
                break;
            case 'get-companies':
                this.set("companies", payload.value)
                this.set("companiesLoading", false)
                break;
        }
    }

};

export default Job;