import { useEffect, useState } from 'react';
import { useSettings } from '../state/settingsStore';

type ToastType = 'success' | 'error' | 'info' | 'warning';

type Props = {
  type: ToastType;
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
};

export default function Toast({
  type,
  message,
  isVisible,
  onClose,
  duration = 4000,
}: Props) {
  const { contrastHigh } = useSettings();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(onClose, 300); // Attendre la fin de l'animation
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible && !isAnimating) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '📢';
    }
  };

  const getStyles = () => {
    if (contrastHigh) {
      return 'bg-contrast-text text-contrast-bg border-2 border-contrast-bg';
    }

    switch (type) {
      case 'success':
        return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg';
      case 'error':
        return 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg';
      case 'warning':
        return 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg';
      case 'info':
        return 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg';
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ${
        isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div
        className={`flex items-center space-x-3 px-6 py-4 rounded-xl max-w-sm ${getStyles()}`}
      >
        <span className="text-2xl animate-bounce">{getIcon()}</span>
        <p className="font-medium flex-1">{message}</p>
        <button
          onClick={() => {
            setIsAnimating(false);
            setTimeout(onClose, 300);
          }}
          className={`ml-3 text-xl hover:scale-110 transition-transform ${
            contrastHigh
              ? 'text-contrast-bg hover:text-contrast-bg'
              : 'text-white hover:text-gray-200'
          }`}
          aria-label="Fermer"
        >
          ×
        </button>
      </div>
    </div>
  );
}
