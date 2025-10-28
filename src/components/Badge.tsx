import React from 'react';

interface BadgeProps {
  icon: string;
  title: string;
  description: string;
  earned: boolean;
  progress?: number;
  onClick?: () => void;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  icon,
  title,
  description,
  earned,
  progress = 0,
  onClick,
  className = '',
}) => {
  return (
    <div
      className={`
        relative group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg
        ${earned ? 'animate-pulse' : 'opacity-60'}
        ${className}
      `}
      onClick={onClick}
    >
      {/* Badge principal */}
      <div
        className={`
        w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-3xl sm:text-4xl
        border-4 transition-all duration-300
        ${
          earned
            ? 'bg-gradient-to-br from-yellow-400 to-orange-500 border-yellow-300 shadow-lg animate-bounce-slow'
            : 'bg-gray-200 border-gray-300'
        }
        group-hover:shadow-xl group-hover:scale-110
      `}
      >
        {icon}
      </div>

      {/* Effet de brillance pour les badges gagnés */}
      {earned && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
      )}

      {/* Barre de progression pour les badges non gagnés */}
      {!earned && progress > 0 && (
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-500 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
      )}

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
        <div className="font-semibold">{title}</div>
        <div className="text-gray-300">{description}</div>
        {!earned && progress > 0 && (
          <div className="text-blue-300 mt-1">{progress}% complété</div>
        )}
      </div>
    </div>
  );
};

export default Badge;
