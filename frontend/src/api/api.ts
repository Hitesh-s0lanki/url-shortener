import axios from 'axios'
import { store } from '../store'

const baseURL = import.meta.env.VITE_BACKEND_URL as string

const api = axios.create({
    baseURL,
})

api.interceptors.request.use((config) => {
    const token = store.getState().auth.token
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api
