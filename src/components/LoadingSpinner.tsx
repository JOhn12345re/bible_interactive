import { useSettings } from '../state/settingsStore';

type Props = {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
};

export default function LoadingSpinner({ size = 'md', message }: Props) {
  const { contrastHigh } = useSettings();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-8">
      {/* Spinner animé */}
      <div className="relative">
        <div
          className={`${sizeClasses[size]} ${
            contrastHigh
              ? 'border-contrast-text border-t-contrast-bg'
              : 'border-blue-200 border-t-blue-600'
          } border-4 rounded-full animate-spin`}
        ></div>

        {/* Particules flottantes autour du spinner */}
        {!contrastHigh && (
          <div className="absolute inset-0">
            <div
              className="absolute top-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full animate-ping"
              style={{ animationDelay: '0s' }}
            ></div>
            <div
              className="absolute top-1/2 right-0 w-1 h-1 bg-purple-400 rounded-full animate-ping"
              style={{ animationDelay: '0.5s' }}
            ></div>
            <div
              className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping"
              style={{ animationDelay: '1s' }}
            ></div>
            <div
              className="absolute top-1/2 left-0 w-1 h-1 bg-cyan-400 rounded-full animate-ping"
              style={{ animationDelay: '1.5s' }}
            ></div>
          </div>
        )}
      </div>

      {/* Message de chargement */}
      {message && (
        <div
          className={`text-center ${
            contrastHigh ? 'text-contrast-text' : 'text-gray-600'
          }`}
        >
          <p className="text-lg font-medium animate-pulse">{message}</p>
          <div className="flex items-center justify-center space-x-1 mt-2">
            <span
              className="w-2 h-2 bg-current rounded-full animate-bounce"
              style={{ animationDelay: '0s' }}
            ></span>
            <span
              className="w-2 h-2 bg-current rounded-full animate-bounce"
              style={{ animationDelay: '0.1s' }}
            ></span>
            <span
              className="w-2 h-2 bg-current rounded-full animate-bounce"
              style={{ animationDelay: '0.2s' }}
            ></span>
          </div>
        </div>
      )}

      {/* Animation de livres qui tournent */}
      {!contrastHigh && (
        <div className="flex items-center space-x-2 mt-4">
          <span
            className="text-2xl animate-bounce"
            style={{ animationDelay: '0s' }}
          >
            📖
          </span>
          <span
            className="text-2xl animate-bounce"
            style={{ animationDelay: '0.2s' }}
          >
            📚
          </span>
          <span
            className="text-2xl animate-bounce"
            style={{ animationDelay: '0.4s' }}
          >
            📜
          </span>
        </div>
      )}
    </div>
  );
}
