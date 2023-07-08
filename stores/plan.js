import {defineStore} from 'pinia';
import {useAuthStore} from './auth';


const BASE_URL = 'http://127.0.0.1:8000';

export const usePlanStore = defineStore({
    id: 'Plan',
    state: () => ({
        Plans: [],
        Plan: null,
        perPage: 10,
        page: 1,
        totalPages: 1,
        totalPlans: 0,
        loading: false,
        error: null
    }),
    getters: {
        allPlans: state => state.Plans,
        PlanCount: state => state.Plans.length,
        getPlan: state => state.Plan,
        getPerPage: state => state.perPage,
        getPage: state => state.page,
        getTotalPages: state => state.totalPages,
        getTotalPlans: state => state.totalPlans,
    },
    actions: {
        async fetchPlans() {
            this.loading = true;
            try {
                const authStore = useAuthStore();
                const response = await fetch(`${BASE_URL}/Plan/`);
                const data = await response.json();
                this.Plans = data;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async fetchPlan(slug) {
            this.loading = true;
            try {
                const authStore = useAuthStore();
                const response = await fetch(`${BASE_URL}/Plan/${slug}/`);
                const data = await response.json();
                this.Plan = data;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async addPlan(Plan) {
            try {
                const authStore = useAuthStore();
                const response = await fetch(`${BASE_URL}/Plan/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `token ${authStore.user.token}`
                    },
                    body: JSON.stringify(Plan),
                });
                const data = await response.json();
                this.Plans.push(data);
            } catch (error) {
                console.error(error);
                this.error = error.message;
            }
        },
        async editPlan(PlanId, updatedPlan) {
            try {
                const response = await fetch(`${BASE_URL}/Plan/${PlanId}/`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(updatedPlan),
                });
                const data = await response.json();
                const index = this.Plans.findIndex(Plan => Plan.id === PlanId);
                this.Plans.splice(index, 1, data);
            } catch (error) {
                console.error(error);
            }
        },
        setPage(page) {
            this.page = page;
            this.fetchPlans();
            },
        setPerPage(perPage) {
            this.perPage = perPage;
            this.page = 1;
            this.fetchPlans();
            },
    },
});

