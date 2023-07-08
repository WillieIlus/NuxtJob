import {defineStore} from 'pinia';
// import {useAuthStore} from './auth';


const BASE_URL = 'http://127.0.0.1:8000';

export const useCategoriesStore = defineStore({
    id: 'category',
    state: () => ({
        categories: [],
        category: null,
        loading: false,
        error: null
    }),
    getters: {
        allCategories: state => state.categories,
        categoryCount: state => state.categories.length,
        getCategory: state => state.category,
        getTotalCategories: state => state.totalCategories,
    },
    actions: {
        async fetchCategories() {
            this.loading = true;
            try {
                // const authStore = useAuthStore();
                const response = await fetch(`${BASE_URL}/categories/`);
                const data = await response.json();
                this.categories = data;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async fetchCategory(slug) {
            this.loading = true;
            try {
                const response = await fetch(`${BASE_URL}/categories/${slug}/`);
                const data = await response.json();
                this.category = data;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async addCategory(category) {
            try {
                // const authStore = useAuthStore();
                const response = await fetch(`${BASE_URL}/categories/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `token ${authStore.user.token}`
                    },
                    body: JSON.stringify(category),
                });
                const data = await response.json();
                this.categories.push(data);
            } catch (error) {
                console.error(error);
                this.error = error.message;
            }
        },
        async editCategory(slug, updatedCategory) {
            try {
                const response = await fetch(`${BASE_URL}/categories/${slug}/`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(updatedCategory),
                });
                const data = await response.json();
                const index = this.categories.findIndex(category => category.slug === slug);
                this.categories.splice(index, 1, data);
            } catch (error) {
                console.error(error);
            }
        },
    },
});

