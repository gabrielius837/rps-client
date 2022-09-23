import { ReactNode } from 'react';
import Toast from './Toast';

export const types = {
  SUCCESS: 'success',
  DANGER: 'danger',
  WARNING: 'warning',
  INFO: 'info',
};

export type Types = typeof types[keyof typeof types];

export interface Toast {
  id: string
  type: Types
  title: string
  description?: ReactNode
};

export interface ToastContainerProps {
  toasts: Toast[]
  stackSpacing?: number
  ttl?: number
  onRemove: (id: string) => void
};

export interface ToastProps {
  toast: Toast
  onRemove: ToastContainerProps['onRemove']
  ttl: number
  style: Partial<CSSStyleDeclaration>
};

export type ToastSignature = (title: Toast['title'], description?: Toast['description']) => void

export interface ToastContextApi {
    toasts: Toast[]
    clear: () => void
    remove: (id: string) => void
    toastError: ToastSignature
    toastInfo: ToastSignature
    toastSuccess: ToastSignature
    toastWarning: ToastSignature
}

export const defaultToastContext: ToastContextApi = {
    toasts: [],
    clear: () => { },
    remove: x => { },
    toastError: (x, y) => { },
    toastInfo: (x, y) => { },
    toastSuccess: (x, y) => { },
    toastWarning: (x, y) => { },
}
