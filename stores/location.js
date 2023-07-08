import {defineStore} from 'pinia';
import {useAuthStore} from './auth';


const BASE_URL = 'http://127.0.0.1:8000';

export const useLocationsStore = defineStore({
    id: 'location',
    state: () => ({
        locations: [],
        location: null,
        totalLocations: 0,
        loading: false,
        error: null
    }),
    getters: {
        allLocations: state => state.locations,
        locationCount: state => state.locations.length,
        getLocation: state => state.location,
        getTotalLocations: state => state.totalLocations,
    },
    actions: {
        async fetchLocations() {
            this.loading = true;
            try {
                const authStore = useAuthStore();
                const response = await fetch(`${BASE_URL}/locations/`);
                const data = await response.json();
                this.locations = data;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async fetchLocation(slug) {
            this.loading = true;
            try {
                const authStore = useAuthStore();
                const response = await fetch(`${BASE_URL}/locations/${slug}/`);
                const data = await response.json();
                this.location = data;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async addLocation(location) {
            try {
                const authStore = useAuthStore();
                const response = await fetch(`${BASE_URL}/locations/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `token ${authStore.user.token}`
                    },
                    body: JSON.stringify(location),
                });
                const data = await response.json();
                this.locations.push(data);
            } catch (error) {
                console.error(error);
                this.error = error.message;
            }
        },
        async editLocation(locationId, updatedLocation) {
            try {
                const response = await fetch(`${BASE_URL}/locations/${locationId}/`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(updatedLocation),
                });
                const data = await response.json();
                const index = this.locations.findIndex(location => location.id === locationId);
                this.locations.splice(index, 1, data);
            } catch (error) {
                console.error(error);
            }
        },
        setPage(page) {
            this.page = page;
            this.fetchLocations();
            },
        setPerPage(perPage) {
            this.perPage = perPage;
            this.page = 1;
            this.fetchLocations();
            },
    },
});

