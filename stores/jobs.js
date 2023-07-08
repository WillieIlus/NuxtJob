import { defineStore } from 'pinia';
import { useAuthStore } from './auth';

export const useJobsStore = defineStore({
    id: 'job',
    state: () => ({
        jobs: [],
        job: null,
        totalJobs: 0,
    }),
    getters: {
        allJobs: (state) => state.jobs,
        jobCount: (state) => state.jobs.length,
        openJobCount: (state) => state.jobs.filter(job => job.state === 'open').length,
        closedJobCount: (state) => state.jobs.filter(job => job.state === 'closed').length,
        getJob: (state) => state.job,
        getTotalJobs: (state) => state.totalJobs,
    },
    actions: {
        async fetchJobs() {
            this.loading = true
            try {
                const response = await fetch('http://127.0.0.1:8000/jobs/', {
                })
                const data = await response.json()
                this.jobs = data
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async fetchJob(slug) {
            this.loading = true
            try {
                const response = await fetch(`http://127.0.0.1:8000/jobs/${slug}`)
                const data = await response.json()
                this.job = data
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async addJob(newJob) {
            try {
                const response = await fetch('http://127.0.0.1:8000/jobs/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newJob),
                });
                const data = await response.json();
                this.jobs.push(data);
            } catch (error) {
                console.error(error);
            }
        },
        async editJob(jobId, updatedJob) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/jobs/${jobId}/`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedJob),
                });
                const data = await response.json();
                const index = this.jobs.findIndex(job => job.id === jobId);
                this.jobs.splice(index, 1, data);
            } catch (error) {
                console.error(error);
            }
        },
    },
});
