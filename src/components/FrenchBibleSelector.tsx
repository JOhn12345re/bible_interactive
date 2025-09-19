import React from 'react';
import { frenchBibleService } from '../services/frenchBibleService';

const FrenchBibleSelector: React.FC = () => {
  const bibles = frenchBibleService.getAvailableBibles();

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-2">🇫🇷</span>
        <h3 className="text-lg font-bold text-gray-800">Bible Louis Segond 1910</h3>
      </div>
      
      <div className="p-4 rounded-lg border-2 border-blue-500 bg-blue-50">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800">{bibles[0].name}</h4>
            <p className="text-sm text-gray-600">{bibles[0].description}</p>
            <p className="text-xs text-gray-500">Année: {bibles[0].year}</p>
          </div>
          <div className="ml-4">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">✓</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Traduction active :</strong> Louis Segond 1910
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Traduction classique et respectée de la Bible en français.
        </p>
      </div>
    </div>
  );
};

export default FrenchBibleSelector;
