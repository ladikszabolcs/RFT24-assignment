import { apiClient } from './client';
import type { User } from '../types';

interface LoginResponse {
    token: string;
    user: User;
}

interface LoginCredentials {
    username: string;
    password: string;
}

export const authApi = {
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        const { data } = await apiClient.post<{ token: string }>('/auth/token/', credentials);

        // Store the token for future requests
        localStorage.setItem('auth-token', data.token);

        // Configure axios for subsequent requests
        apiClient.defaults.headers.common['Authorization'] = `Token ${data.token}`;

        // After setting up the token, fetch user data
        const userResponse = await apiClient.get<User>('/auth/me/');
        return {
            token: data.token,
            user: userResponse.data,
        };
    },

    logout: async (): Promise<void> => {
        try {
            await apiClient.post('/auth/logout/');
        } finally {
            localStorage.removeItem('auth-token');
            delete apiClient.defaults.headers.common['Authorization'];
        }
    },

    getCurrentUser: async (): Promise<User> => {
        const { data } = await apiClient.get<User>('/auth/me/');
        return data;
    },
};