// src/services/api.ts

import api from '../api/api'

// --- Auth types & functions ---

export interface LoginCredentials {
    username: string
    password: string
}

export interface RegisterData {
    email: string
    username: string
    password: string
}

export interface AuthResponse {
    token: string
    // add other fields here if your backend returns more
}

/**
 * POST /api/auth/login
 * body: { username, password }
 */
export function login(creds: LoginCredentials): Promise<AuthResponse> {
    return api
        .post<AuthResponse>('/api/auth/login', creds)
        .then(res => res.data)
}

/**
 * POST /api/auth/register
 * body: { email, username, password }
 */
export function register(data: RegisterData): Promise<AuthResponse> {
    return api
        .post<AuthResponse>('/api/auth/register', data)
        .then(res => res.data)
}


// --- URL shortener types & function ---

export interface ShortUrlRequest {
    originalUrl: string
}

export interface ShortUrlResponse {
    id: string
    originalUrl: string
    shortUrl: string
    // add other fields here if your backend returns more
}

/**
 * POST /api/urls
 * body: { originalUrl }
 */
export function createShortUrl(
    payload: ShortUrlRequest
): Promise<ShortUrlResponse> {
    return api
        .post<ShortUrlResponse>('/api/urls', payload)
        .then(res => res.data)
}
