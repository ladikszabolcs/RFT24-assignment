import { act } from '@testing-library/react';
import { authApi } from '../../api/auth';
import { useAuthStore } from '../../store/authStore';

// Mock the authApi
jest.mock('../../api/auth', () => ({
  authApi: {
    login: jest.fn(),
    logout: jest.fn(),
  },
}));

describe('authStore', () => {
  beforeEach(() => {
    // Clear the store before each test
    act(() => {
      useAuthStore.setState({
        user: null,
        token: null,
        isLoading: false,
        error: null,
      });
    });
  });

  it('initializes with null user and token', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isLoading).toBeFalsy();
    expect(state.error).toBeNull();
  });

  it('sets auth data correctly', () => {
    const testUser = {
      id: '1',
      username: 'testuser',
      email: 'test@example.com',
      role: 'student' as const,
    };
    const testToken = 'test-token';

    act(() => {
      useAuthStore.getState().setAuth(testUser, testToken);
    });

    const state = useAuthStore.getState();
    expect(state.user).toEqual(testUser);
    expect(state.token).toBe(testToken);
  });

  it('handles successful login', async () => {
    const testUser = {
      id: '1',
      username: 'testuser',
      email: 'test@example.com',
      role: 'student' as const,
    };
    const testToken = 'test-token';

    (authApi.login as jest.Mock).mockResolvedValueOnce({
      user: testUser,
      token: testToken,
    });

    await act(async () => {
      await useAuthStore.getState().login('testuser', 'password');
    });

    const state = useAuthStore.getState();
    expect(state.user).toEqual(testUser);
    expect(state.token).toBe(testToken);
    expect(state.isLoading).toBeFalsy();
    expect(state.error).toBeNull();
  });

  it('handles login failure', async () => {
    const error = new Error('Invalid credentials');
    (authApi.login as jest.Mock).mockRejectedValueOnce(error);

    try {
      await act(async () => {
        await useAuthStore.getState().login('testuser', 'wrong-password');
      });
    } catch (e) {
      // Expected error
    }

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isLoading).toBeFalsy();
    expect(state.error).toBe('Invalid credentials');
  });

  it('handles logout', async () => {
    // First set some auth data
    act(() => {
      useAuthStore.getState().setAuth(
        {
          id: '1',
          username: 'testuser',
          email: 'test@example.com',
          role: 'student',
        },
        'test-token'
      );
    });

    (authApi.logout as jest.Mock).mockResolvedValueOnce();

    await act(async () => {
      await useAuthStore.getState().logout();
    });

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isLoading).toBeFalsy();
  });
});