import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
    duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
                                                message,
                                                type,
                                                onClose,
                                                duration = 5000,
                                            }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const baseClasses = 'fixed bottom-4 right-4 flex items-center p-4 rounded-lg shadow-lg z-50 animate-fadeIn';
    const typeClasses = type === 'success'
        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';

    return (
        <div className={`${baseClasses} ${typeClasses}`}>
            <span className="mr-3">{message}</span>
            <button
                onClick={onClose}
                className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};