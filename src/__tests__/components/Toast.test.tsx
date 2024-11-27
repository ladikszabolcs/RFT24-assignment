import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toast } from '../../components/Toast';

describe('Toast', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders the message correctly', () => {
    const message = 'Test message';
    render(
      <Toast message={message} type="success" onClose={() => {}} />
    );
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('applies success styles when type is success', () => {
    render(
      <Toast message="Success message" type="success" onClose={() => {}} />
    );
    const toast = screen.getByText('Success message').parentElement;
    expect(toast).toHaveClass('bg-green-100');
  });

  it('applies error styles when type is error', () => {
    render(
      <Toast message="Error message" type="error" onClose={() => {}} />
    );
    const toast = screen.getByText('Error message').parentElement;
    expect(toast).toHaveClass('bg-red-100');
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = jest.fn();
    render(
      <Toast message="Test message" type="success" onClose={onClose} />
    );
    
    await userEvent.click(screen.getByRole('button'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose after duration', () => {
    const onClose = jest.fn();
    render(
      <Toast
        message="Test message"
        type="success"
        onClose={onClose}
        duration={3000}
      />
    );

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});