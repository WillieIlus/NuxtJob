import { defineStore } from 'pinia'

const BASE_URL = 'http://127.0.0.1:8000';

export const useAuthStore = defineStore({
    id: 'user',
    state: () => ({
        user: {
            isAuthenticated: false,
            username: null,
            token: null,
        },
        errors: []
    }), 
    actions: {
        initStore() {
            this.user.isAuthenticated = false

            if (localStorage.getItem('user.token')) {
                this.user.token = localStorage.getItem('user.token')
                this.user.username = localStorage.getItem('user.username')
                this.user.isAuthenticated = true

                console.log('Initalized user is:', this.user.username, this.user.token)
            }
        },
        setToken(token, username) {
            console.log('setToken', token, username)

            this.user.token = token
            this.user.username = username
            this.user.isAuthenticated = true

            localStorage.setItem('user.token', token)
            localStorage.setItem('user.username', username)
        },
        removeToken() {
            console.log('removeToken')

            this.user.token = null
            this.user.username = null
            this.user.isAuthenticated = false

            localStorage.setItem('user.token', '')
            localStorage.setItem('user.username', '')
        },
        async loginUser(email, password) {
            try {
                const response = await fetch(`${BASE_URL}/accounts/auth/jwt/create/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: email,
                        password: password
                    })
                })

                if (!response.ok) {
                    throw new Error('Invalid credentials')
                }
                const data = await response.json()
                this.setToken(data.auth_token, email)

                return true
            } catch (error) {
                console.error(error)

                this.errors.push('Invalid credentials')

                return false
            }
        }
    },
})
