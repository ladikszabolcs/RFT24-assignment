import { apiClient } from './client';
import type { User } from '../types';

interface CreateUserDTO {
    username: string;
    email: string;
    password: string;
    role: string;
}

export const usersApi = {
    getAll: async (): Promise<User[]> => {
        const { data } = await apiClient.get<User[]>('/api/users/');
        return data;
    },

    create: async (userData: CreateUserDTO): Promise<User> => {
        const { data } = await apiClient.post<User>('/api/users/', userData);
        return data;
    },

    update: async (id: string, userData: Partial<User>): Promise<User> => {
        const { data } = await apiClient.patch<User>(`/api/users/${id}/`, userData);
        return data;
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/api/users/${id}/`);
    },
};