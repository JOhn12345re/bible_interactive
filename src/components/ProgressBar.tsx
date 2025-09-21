import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  label,
  showPercentage = true,
  color = 'blue',
  size = 'md',
  animated = true,
  className = ''
}) => {
  const percentage = Math.min((current / total) * 100, 100);
  
  const colorClasses = {
    blue: 'from-blue-400 to-blue-600',
    green: 'from-green-400 to-green-600',
    purple: 'from-purple-400 to-purple-600',
    orange: 'from-orange-400 to-orange-600',
    red: 'from-red-400 to-red-600',
  };

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Label et pourcentage */}
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-gray-700">{label}</span>
          )}
          {showPercentage && (
            <span className="text-sm font-medium text-gray-600">
              {current}/{total} ({Math.round(percentage)}%)
            </span>
          )}
        </div>
      )}

      {/* Barre de progression */}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`
            h-full bg-gradient-to-r ${colorClasses[color]} rounded-full
            transition-all duration-1000 ease-out
            ${animated ? 'animate-pulse' : ''}
            ${percentage === 100 ? 'animate-bounce-slow' : ''}
          `}
          style={{ 
            width: `${percentage}%`,
            transition: animated ? 'width 1s ease-out' : 'none'
          }}
        >
          {/* Effet de brillance pour les barres complètes */}
          {percentage === 100 && (
            <div className="h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
          )}
        </div>
      </div>

      {/* Message de félicitations pour les barres complètes */}
      {percentage === 100 && (
        <div className="mt-2 text-center">
          <span className="text-sm font-semibold text-green-600 animate-bounce">
            🎉 Complété !
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
