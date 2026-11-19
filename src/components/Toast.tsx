import { AlertCircle, CheckCircle2, X } from 'lucide-react';
import { ToastState } from '../types/profile';

interface ToastProps extends ToastState {
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  return (
    <div
      id="toast-notification"
      role="status"
      aria-live="polite"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border transition-all duration-200 ${
        type === 'success'
          ? 'bg-white border-green-100'
          : 'bg-white border-red-100'
      }`}
    >
      <div
        className={`p-1 rounded-full ${
          type === 'success'
            ? 'bg-green-100 text-green-600'
            : 'bg-red-100 text-red-600'
        }`}
      >
        {type === 'success' ? (
          <CheckCircle2 size={16} aria-hidden="true" />
        ) : (
          <AlertCircle size={16} aria-hidden="true" />
        )}
      </div>
      <p
        className={`text-sm font-medium ${
          type === 'success' ? 'text-green-800' : 'text-red-800'
        }`}
      >
        {message}
      </p>
      <button
        id="toast-close-btn"
        type="button"
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 ml-2 p-1 cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}
