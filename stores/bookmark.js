import {defineStore} from 'pinia';
import {useAuthStore} from './auth';


const BASE_URL = 'http://127.0.0.1:8000';

export const useBookmarkStore = defineStore({
    id: 'bookmark',
    state: () => ({
        bookmarks: [],
        bookmark: null,
        perPage: 10,
        page: 1,
        totalPages: 1,
        totalbookmarks: 0,
        loading: false,
        error: null
    }),
    getters: {
        allBookmarks: state => state.bookmarks,
        bookmarkCount: state => state.bookmarks.length,
        getBookmark: state => state.bookmark,
        getPerPage: state => state.perPage,
        getPage: state => state.page,
        getTotalPages: state => state.totalPages,
        getTotalBookmarks: state => state.totalbookmarks,
    },
    actions: {
        async fetchBookmarks() {
            this.loading = true;
            try {
                const authStore = useAuthStore();
                const response = await fetch(`${BASE_URL}/bookmark/`);
                const data = await response.json();
                this.bookmarks = data;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async fetchBookmark(slug) {
            this.loading = true;
            try {
                const authStore = useAuthStore();
                const response = await fetch(`${BASE_URL}/bookmark/${slug}/`);
                const data = await response.json();
                this.bookmark = data;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async addBookmark(bookmark) {
            try {
                const authStore = useAuthStore();
                const response = await fetch(`${BASE_URL}/bookmark/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `token ${authStore.user.token}`
                    },
                    body: JSON.stringify(bookmark),
                });
                const data = await response.json();
                this.bookmarks.push(data);
            } catch (error) {
                console.error(error);
                this.error = error.message;
            }
        },
        async editBookmark(bookmarkId, updatedbookmark) {
            try {
                const response = await fetch(`${BASE_URL}/bookmark/${bookmarkId}/`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(updatedbookmark),
                });
                const data = await response.json();
                const index = this.bookmarks.findIndex(bookmark => bookmark.id === bookmarkId);
                this.bookmarks.splice(index, 1, data);
            } catch (error) {
                console.error(error);
            }
        },
        setPage(page) {
            this.page = page;
            this.fetchbookmarks();
            },
        setPerPage(perPage) {
            this.perPage = perPage;
            this.page = 1;
            this.fetchbookmarks();
            },
    },
});

