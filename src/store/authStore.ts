import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';
import { authApi } from '../api/auth';

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    setAuth: (user: User, token: string) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isLoading: false,
            error: null,
            login: async (username: string, password: string) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await authApi.login({ username, password });
                    set({
                        user: response.user,
                        token: response.token,
                        isLoading: false
                    });
                } catch (error) {
                    set({
                        error: 'Invalid credentials',
                        isLoading: false
                    });
                    throw error;
                }
            },
            logout: async () => {
                set({ isLoading: true });
                try {
                    await authApi.logout();
                } finally {
                    set({ user: null, token: null, isLoading: false });
                }
            },
            setAuth: (user, token) => set({ user, token }),
        }),
        {
            name: 'auth-storage',
        }
    )
);