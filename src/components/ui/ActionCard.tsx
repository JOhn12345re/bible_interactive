import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

type ActionCardProps = {
  to: LinkProps['to'];
  icon: string;
  title: string;
  description: string;
  colorClass: string;
  className?: string;
};

const ActionCard: React.FC<ActionCardProps> = ({
  to,
  icon,
  title,
  description,
  colorClass,
  className = '',
}) => {
  return (
    <Link
      to={to}
      className={`group relative block p-6 rounded-2xl overflow-hidden text-white transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl shine-effect action-card-hover ${colorClass} ${className}`}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Floating decoration */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"></div>

      <div className="relative z-10">
        {/* Icon with enhanced animation */}
        <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
          {icon}
        </div>
        <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-100 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300">
          {description}
        </p>

        {/* Arrow indicator */}
        <div className="mt-4 flex items-center text-white/80 group-hover:text-white transition-colors duration-300">
          <span className="text-sm font-medium mr-2">Explorer</span>
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      {/* Subtle background pattern with enhanced animation */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 opacity-10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-125">
        {icon}
      </div>

      {/* Ripple effect on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-white/20 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"></div>
    </Link>
  );
};

export default ActionCard;
