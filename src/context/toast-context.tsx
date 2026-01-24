'use client';

import React, { createContext, useContext, useCallback, useState, ReactNode } from 'react';

interface ToastState {
  show: boolean;
  type: 'success' | 'error' | 'warning';
  title: string;
  message: string;
}

interface ToastContextType {
  toast: ToastState;
  toastSuccess: (title: string, message: string, options?: { duration?: number }) => void;
  toastError: (title: string, message: string, options?: { duration?: number }) => void;
  toastWarning: (title: string, message: string, options?: { duration?: number }) => void;
  closeToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<ToastState>({
    show: false,
    type: 'success',
    title: '',
    message: '',
  });

  const showToast = useCallback((type: 'success' | 'error' | 'warning', options: { title: string; message: string; duration?: number }) => {
    setToast({
      show: true,
      type,
      title: options.title,
      message: options.message,
    });

    const duration = options.duration || 3000;
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, duration);
  }, []);

  const toastSuccess = useCallback((title: string, message: string, options?: { duration?: number }) => {
    showToast('success', { title, message, duration: options?.duration });
  }, [showToast]);

  const toastError = useCallback((title: string, message: string, options?: { duration?: number }) => {
    showToast('error', { title, message, duration: options?.duration });
  }, [showToast]);

  const toastWarning = useCallback((title: string, message: string, options?: { duration?: number }) => {
    showToast('warning', { title, message, duration: options?.duration });
  }, [showToast]);

  const closeToast = useCallback(() => {
    setToast(prev => ({ ...prev, show: false }));
  }, []);

  const value: ToastContextType = {
    toast,
    toastSuccess,
    toastError,
    toastWarning,
    closeToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
