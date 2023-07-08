import {defineStore} from 'pinia';
import {useAuthStore} from './auth';


const BASE_URL = 'http://127.0.0.1:8000';

export const useCompaniesStore = defineStore({
    id: 'company',
    state: () => ({
        companies: [],
        company: null,
        loading: false,
        error: null
    }),
    getters: {
        allCompanies: state => state.companies,
        companyCount: state => state.companies.length,
        getTotalCompanies: state => state.totalCompanies,
    },
    actions: {
        async fetchCompanies() {
            this.loading = true;
            try {
                const response = await fetch(`${BASE_URL}/company/`);
                const data = await response.json();
                this.companies = data;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async fetchCompany(slug) {
            this.loading = true;
            try {
                const authStore = useAuthStore();
                const response = await fetch(`${BASE_URL}/company/${slug}/`);
                const data = await response.json();
                this.company = data;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async addCompany(company) {
            try {
                const authStore = useAuthStore();
                const response = await fetch(`${BASE_URL}/company/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `token ${authStore.user.token}`
                    },
                    body: JSON.stringify(company),
                });
                const data = await response.json();
                this.companies.push(data);
            } catch (error) {
                console.error(error);
                this.error = error.message;
            }
        },
        async editCompany(companyId, updatedCompany) {
            try {
                const response = await fetch(`${BASE_URL}/company/${companyId}/`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(updatedCompany),
                });
                const data = await response.json();
                const index = this.companies.findIndex(company => company.id === companyId);
                this.companies.splice(index, 1, data);
            } catch (error) {
                console.error(error);
            }
        },
        setPage(page) {
            this.page = page;
            this.fetchCompanies();
            },
        setPerPage(perPage) {
            this.perPage = perPage;
            this.page = 1;
            this.fetchCompanies();
            },
    },
});

