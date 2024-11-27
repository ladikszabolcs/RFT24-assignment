import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '../../components/ThemeToggle';
import { useTheme } from '../../hooks/useTheme';

// Mock the useTheme hook
jest.mock('../../hooks/useTheme');

describe('ThemeToggle', () => {
  it('renders the theme toggle button', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: jest.fn(),
    });

    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('shows sun icon in dark mode', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      toggleTheme: jest.fn(),
    });

    render(<ThemeToggle />);
    const sunIcon = screen.getByLabelText('Toggle theme');
    expect(sunIcon).toBeInTheDocument();
  });

  it('shows moon icon in light mode', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: jest.fn(),
    });

    render(<ThemeToggle />);
    const moonIcon = screen.getByLabelText('Toggle theme');
    expect(moonIcon).toBeInTheDocument();
  });

  it('calls toggleTheme when clicked', () => {
    const toggleTheme = jest.fn();
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme,
    });

    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });
});