import { defineStore } from 'pinia'
import { useFetch } from '#app'

export const usePreferintePilot = defineStore('preferintePilot', {
    state: () => ({
        preferinte: [],
        userData: {},
        loading: false,
        error: null
    }),
    actions: {
        async fetchUserData(userId) {
            this.loading = true
            this.error = null
            try {
                const { data, error } = await useFetch(`/api/proxy/profile/${userId}`)
                if (error.value) throw new Error(error.value.message)
                this.userData = data.value[0]
            } catch (err) {
                this.error = err.message || 'Eroare la preluarea datelor'
            } finally {
                this.loading = false
            }
        }
    }
})
