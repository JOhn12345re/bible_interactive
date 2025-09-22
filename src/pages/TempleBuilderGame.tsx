import React, { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';
import { useProgress } from '../state/progressStore';

interface TempleElement {
  id: string;
  name: string;
  emoji: string;
  description: string;
  category: 'foundation' | 'structure' | 'decoration' | 'sacred';
  size: { width: number; height: number };
  snapPoints: string[];
  educationalInfo: string;
  biblicalReference: string;
}

interface PlacedElement {
  elementId: string;
  x: number;
  y: number;
  placed: boolean;
}

interface GameState {
  placedElements: PlacedElement[];
  selectedElement: string | null;
  isDragging: boolean;
  dragOffset: { x: number; y: number };
  completedSections: string[];
  score: number;
  showInfo: string | null;
}

const TempleBuilderGame = () => {
  const { contrastHigh } = useSettings();
  const { markDone } = useProgress();
  
  // Éléments du temple disponibles
  const templeElements: TempleElement[] = [
    // Fondations
    {
      id: 'foundation-stone',
      name: 'Pierre de Fondation',
      emoji: '🧱',
      description: 'Pierres massives pour les fondations solides',
      category: 'foundation',
      size: { width: 100, height: 40 },
      snapPoints: ['foundation'],
      educationalInfo: 'Les fondations du temple étaient faites de pierres énormes taillées avec précision.',
      biblicalReference: '1 Rois 5:17 (Louis Segond 1910)'
    },
    {
      id: 'foundation-corner',
      name: 'Pierre d\'Angle',
      emoji: '⬜',
      description: 'Pierre angulaire pour maintenir la structure',
      category: 'foundation',
      size: { width: 60, height: 60 },
      snapPoints: ['corner'],
      educationalInfo: 'La pierre angulaire était la pierre la plus importante, symbolisant Jésus-Christ.',
      biblicalReference: 'Éphésiens 2:20 (Louis Segond 1910)'
    },
    // Structure
    {
      id: 'column',
      name: 'Colonne',
      emoji: '🏛️',
      description: 'Colonnes majestueuses pour soutenir le toit',
      category: 'structure',
      size: { width: 40, height: 120 },
      snapPoints: ['column-left', 'column-right'],
      educationalInfo: 'Les colonnes Jakin et Boaz encadraient l\'entrée du temple de Salomon.',
      biblicalReference: '1 Rois 7:21 (Louis Segond 1910)'
    },
    {
      id: 'roof',
      name: 'Toiture',
      emoji: '🏠',
      description: 'Toit pour protéger le lieu saint',
      category: 'structure',
      size: { width: 200, height: 60 },
      snapPoints: ['roof'],
      educationalInfo: 'Le toit du temple était fait de bois de cèdre recouvert d\'or.',
      biblicalReference: '1 Rois 6:9 (Louis Segond 1910)'
    },
    {
      id: 'door',
      name: 'Porte du Temple',
      emoji: '🚪',
      description: 'Entrée sacrée du temple',
      category: 'structure',
      size: { width: 80, height: 100 },
      snapPoints: ['entrance'],
      educationalInfo: 'Les portes étaient faites de bois d\'olivier sculpté et recouvertes d\'or.',
      biblicalReference: '1 Rois 6:31-32 (Louis Segond 1910)'
    },
    // Éléments sacrés
    {
      id: 'altar',
      name: 'Autel',
      emoji: '🔥',
      description: 'Autel pour les sacrifices',
      category: 'sacred',
      size: { width: 80, height: 60 },
      snapPoints: ['altar'],
      educationalInfo: 'L\'autel d\'airain était l\'endroit où les sacrifices étaient offerts à Dieu.',
      biblicalReference: '2 Chroniques 4:1 (Louis Segond 1910)'
    },
    {
      id: 'ark',
      name: 'Arche d\'Alliance',
      emoji: '📦',
      description: 'Le lieu très saint',
      category: 'sacred',
      size: { width: 100, height: 60 },
      snapPoints: ['holy-of-holies'],
      educationalInfo: 'L\'Arche contenait les tables de la loi et représentait la présence de Dieu.',
      biblicalReference: 'Exode 25:10-22 (Louis Segond 1910)'
    },
    // Décorations
    {
      id: 'menorah',
      name: 'Chandelier d\'Or',
      emoji: '🕎',
      description: 'Chandelier à sept branches',
      category: 'decoration',
      size: { width: 60, height: 80 },
      snapPoints: ['menorah'],
      educationalInfo: 'Le chandelier d\'or à sept branches éclairait le lieu saint.',
      biblicalReference: 'Exode 25:31-40 (Louis Segond 1910)'
    },
    {
      id: 'table',
      name: 'Table des Pains',
      emoji: '🍞',
      description: 'Table pour les pains de proposition',
      category: 'decoration',
      size: { width: 80, height: 40 },
      snapPoints: ['table'],
      educationalInfo: 'Douze pains étaient disposés sur cette table, représentant les douze tribus d\'Israël.',
      biblicalReference: 'Lévitique 24:5-9 (Louis Segond 1910)'
    }
  ];

  const [gameState, setGameState] = useState<GameState>({
    placedElements: [],
    selectedElement: null,
    isDragging: false,
    dragOffset: { x: 0, y: 0 },
    completedSections: [],
    score: 0,
    showInfo: null
  });

  const constructionAreaRef = useRef<HTMLDivElement>(null);

  // Zones de construction prédéfinies
  const snapZones = [
    { id: 'foundation', x: 50, y: 300, width: 300, height: 50, label: 'Fondations' },
    { id: 'corner', x: 350, y: 280, width: 80, height: 80, label: 'Angle' },
    { id: 'column-left', x: 80, y: 180, width: 50, height: 120, label: 'Colonne Gauche' },
    { id: 'column-right', x: 270, y: 180, width: 50, height: 120, label: 'Colonne Droite' },
    { id: 'roof', x: 50, y: 120, width: 300, height: 60, label: 'Toiture' },
    { id: 'entrance', x: 160, y: 200, width: 80, height: 100, label: 'Entrée' },
    { id: 'altar', x: 450, y: 240, width: 100, height: 80, label: 'Parvis' },
    { id: 'holy-of-holies', x: 120, y: 180, width: 120, height: 80, label: 'Saint des Saints' },
    { id: 'menorah', x: 80, y: 220, width: 80, height: 80, label: 'Lieu Saint' },
    { id: 'table', x: 220, y: 220, width: 100, height: 60, label: 'Lieu Saint' }
  ];

  // Commencer à traîner un élément
  const handleDragStart = useCallback((elementId: string, event: React.MouseEvent) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    setGameState(prev => ({
      ...prev,
      selectedElement: elementId,
      isDragging: true,
      dragOffset: { x: offsetX, y: offsetY }
    }));
  }, []);

  // Gérer le mouvement de la souris
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!gameState.isDragging || !gameState.selectedElement || !constructionAreaRef.current) return;

    const rect = constructionAreaRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left - gameState.dragOffset.x;
    const y = event.clientY - rect.top - gameState.dragOffset.y;

    // Mettre à jour la position de l'élément en cours de glissement
    setGameState(prev => ({
      ...prev,
      placedElements: prev.placedElements.map(elem =>
        elem.elementId === gameState.selectedElement
          ? { ...elem, x, y }
          : elem
      )
    }));
  }, [gameState.isDragging, gameState.selectedElement, gameState.dragOffset]);

  // Terminer le glissement
  const handleMouseUp = useCallback(() => {
    if (!gameState.isDragging || !gameState.selectedElement) return;

    const currentElement = gameState.placedElements.find(e => e.elementId === gameState.selectedElement);
    if (!currentElement) return;

    // Vérifier si l'élément est dans une zone de snap valide
    const element = templeElements.find(e => e.id === gameState.selectedElement);
    if (!element) return;

    let snapped = false;
    for (const zone of snapZones) {
      if (element.snapPoints.includes(zone.id)) {
        const isInZone = (
          currentElement.x >= zone.x - 20 &&
          currentElement.x <= zone.x + zone.width + 20 &&
          currentElement.y >= zone.y - 20 &&
          currentElement.y <= zone.y + zone.height + 20
        );

        if (isInZone) {
          // Snap à la zone
          setGameState(prev => ({
            ...prev,
            placedElements: prev.placedElements.map(elem =>
              elem.elementId === gameState.selectedElement
                ? { ...elem, x: zone.x, y: zone.y, placed: true }
                : elem
            ),
            score: prev.score + 10
          }));
          snapped = true;

          // Marquer la progression
          if (element) {
            markDone(`temple-${element.id}`, `${element.name} placé correctement`);
          }
          break;
        }
      }
    }

    // Si pas de snap, remettre dans la palette
    if (!snapped) {
      setGameState(prev => ({
        ...prev,
        placedElements: prev.placedElements.filter(e => e.elementId !== gameState.selectedElement)
      }));
    }

    setGameState(prev => ({
      ...prev,
      isDragging: false,
      selectedElement: null
    }));
  }, [gameState.isDragging, gameState.selectedElement, gameState.placedElements, templeElements, markDone]);

  // Ajouter un élément à la zone de construction
  const addElementToConstruction = (elementId: string) => {
    if (gameState.placedElements.some(e => e.elementId === elementId)) return;

    setGameState(prev => ({
      ...prev,
      placedElements: [
        ...prev.placedElements,
        { elementId, x: 200, y: 200, placed: false }
      ]
    }));
  };

  // Afficher les informations d'un élément
  const showElementInfo = (elementId: string) => {
    setGameState(prev => ({ ...prev, showInfo: elementId }));
  };

  // Effets pour les événements de souris globaux
  React.useEffect(() => {
    if (gameState.isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [gameState.isDragging, handleMouseMove, handleMouseUp]);

  // Vérifier si le temple est complet
  const isTempleComplete = () => {
    const requiredElements = ['foundation-stone', 'column', 'roof', 'door', 'altar'];
    return requiredElements.every(id => 
      gameState.placedElements.some(e => e.elementId === id && e.placed)
    );
  };

  return (
    <div className={`min-h-screen ${contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-amber-50 via-white to-yellow-50'}`}>
      {/* Header */}
      <header className={`py-6 px-4 sm:px-6 lg:px-8 ${contrastHigh ? 'bg-contrast-bg' : 'bg-white shadow-sm'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/games" 
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                  contrastHigh ? 'hover:bg-contrast-text/20' : 'hover:bg-gray-100'
                }`}
              >
                <span className="text-2xl">←</span>
                <span>Retour aux jeux</span>
              </Link>
              <div>
                <h1 className={`text-2xl sm:text-3xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                  🏛️ Constructeur de Temple
                </h1>
                <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
                  Construis le temple de Salomon étape par étape
                </p>
                <p className={`text-xs mt-1 ${contrastHigh ? 'text-contrast-text/70' : 'text-gray-500'}`}>
                  📖 Version Louis Segond 1910
                </p>
              </div>
            </div>
            
            {/* Score */}
            <div className={`flex items-center space-x-4 ${
              contrastHigh ? 'text-contrast-text' : 'text-amber-600'
            }`}>
              <div className="text-center">
                <div className="text-2xl font-bold">{gameState.score}</div>
                <div className="text-xs">Points</div>
              </div>
              {isTempleComplete() && (
                <div className="text-center">
                  <div className="text-2xl">🏆</div>
                  <div className="text-xs">Complet!</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Palette d'éléments */}
          <div className="lg:col-span-1">
            <div className={`rounded-2xl overflow-hidden ${
              contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'
            }`}>
              <div className={`p-4 border-b ${
                contrastHigh ? 'border-contrast-text/20' : 'border-gray-200'
              }`}>
                <h2 className={`text-lg font-bold ${
                  contrastHigh ? 'text-contrast-text' : 'text-gray-800'
                }`}>
                  🧱 Éléments du Temple
                </h2>
              </div>
              
              <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                {templeElements.map((element) => {
                  const isUsed = gameState.placedElements.some(e => e.elementId === element.id);
                  return (
                    <div
                      key={element.id}
                      className={`p-3 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
                        isUsed
                          ? contrastHigh
                            ? 'border-contrast-text/20 opacity-50'
                            : 'border-gray-200 opacity-50'
                          : contrastHigh
                            ? 'border-contrast-text/40 hover:border-contrast-text hover:bg-contrast-text/10'
                            : 'border-amber-300 hover:border-amber-500 hover:bg-amber-50'
                      }`}
                      onClick={() => !isUsed && addElementToConstruction(element.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{element.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-medium text-sm ${
                            contrastHigh ? 'text-contrast-text' : 'text-gray-800'
                          }`}>
                            {element.name}
                          </h3>
                          <p className={`text-xs ${
                            contrastHigh ? 'text-contrast-text' : 'text-gray-500'
                          }`}>
                            {element.description}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            showElementInfo(element.id);
                          }}
                          className={`text-xs px-2 py-1 rounded ${
                            contrastHigh
                              ? 'bg-contrast-text/20 hover:bg-contrast-text/30'
                              : 'bg-blue-100 hover:bg-blue-200 text-blue-600'
                          }`}
                        >
                          ℹ️
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Instructions */}
            <div className={`mt-6 p-4 rounded-2xl ${
              contrastHigh 
                ? 'bg-contrast-bg border-2 border-contrast-text'
                : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200'
            }`}>
              <h3 className={`font-bold mb-2 ${
                contrastHigh ? 'text-contrast-text' : 'text-blue-800'
              }`}>
                📋 Instructions
              </h3>
              <ul className={`text-sm space-y-1 ${
                contrastHigh ? 'text-contrast-text' : 'text-blue-700'
              }`}>
                <li>• Clique sur un élément pour l'ajouter</li>
                <li>• Glisse-le vers sa zone appropriée</li>
                <li>• Les zones s'illuminent quand disponibles</li>
                <li>• Apprends l'histoire de chaque élément</li>
              </ul>
            </div>
          </div>

          {/* Zone de construction */}
          <div className="lg:col-span-3">
            <div className={`rounded-2xl p-6 relative overflow-hidden ${
              contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'
            }`}>
              <h2 className={`text-lg font-bold mb-4 ${
                contrastHigh ? 'text-contrast-text' : 'text-gray-800'
              }`}>
                🏗️ Zone de Construction
              </h2>
              
              <div
                ref={constructionAreaRef}
                className={`relative w-full h-96 rounded-xl border-2 border-dashed ${
                  contrastHigh ? 'border-contrast-text/30 bg-contrast-text/5' : 'border-amber-300 bg-amber-50'
                }`}
                style={{ minHeight: '400px' }}
              >
                {/* Zones de snap */}
                {snapZones.map((zone) => (
                  <div
                    key={zone.id}
                    className={`absolute border-2 border-dashed transition-all ${
                      contrastHigh 
                        ? 'border-contrast-text/20 hover:border-contrast-text/40'
                        : 'border-amber-200 hover:border-amber-400'
                    }`}
                    style={{
                      left: zone.x,
                      top: zone.y,
                      width: zone.width,
                      height: zone.height
                    }}
                  >
                    <div className={`text-xs p-1 ${
                      contrastHigh ? 'text-contrast-text' : 'text-amber-600'
                    }`}>
                      {zone.label}
                    </div>
                  </div>
                ))}

                {/* Éléments placés */}
                {gameState.placedElements.map((placedElement) => {
                  const element = templeElements.find(e => e.id === placedElement.elementId);
                  if (!element) return null;

                  return (
                    <div
                      key={placedElement.elementId}
                      className={`absolute cursor-move transition-all ${
                        placedElement.placed 
                          ? 'shadow-lg ring-2 ring-green-400' 
                          : 'shadow-md hover:shadow-lg'
                      }`}
                      style={{
                        left: placedElement.x,
                        top: placedElement.y,
                        width: element.size.width,
                        height: element.size.height,
                        zIndex: gameState.selectedElement === element.id ? 1000 : 1
                      }}
                      onMouseDown={(e) => handleDragStart(element.id, e)}
                    >
                      <div className={`w-full h-full rounded-lg flex items-center justify-center text-2xl font-bold ${
                        contrastHigh 
                          ? 'bg-contrast-text text-contrast-bg'
                          : placedElement.placed
                            ? 'bg-green-500 text-white'
                            : 'bg-amber-400 text-amber-900'
                      }`}>
                        {element.emoji}
                      </div>
                      <div className={`absolute -bottom-6 left-0 text-xs font-medium ${
                        contrastHigh ? 'text-contrast-text' : 'text-gray-600'
                      }`}>
                        {element.name}
                      </div>
                    </div>
                  );
                })}

                {/* Message de complétion */}
                {isTempleComplete() && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
                    <div className={`text-center p-8 rounded-2xl ${
                      contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-xl'
                    }`}>
                      <div className="text-6xl mb-4">🎉</div>
                      <h3 className={`text-2xl font-bold mb-2 ${
                        contrastHigh ? 'text-contrast-text' : 'text-gray-800'
                      }`}>
                        Temple Terminé !
                      </h3>
                      <p className={`${
                        contrastHigh ? 'text-contrast-text' : 'text-gray-600'
                      }`}>
                        Félicitations ! Tu as reconstruit le temple de Salomon !
                      </p>
                      <div className="mt-4 text-2xl font-bold text-yellow-500">
                        Score: {gameState.score} points
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modale d'information */}
        {gameState.showInfo && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className={`max-w-md w-full rounded-2xl p-6 ${
              contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-xl'
            }`}>
              {(() => {
                const element = templeElements.find(e => e.id === gameState.showInfo);
                return element ? (
                  <>
                    <div className="text-center mb-4">
                      <span className="text-4xl">{element.emoji}</span>
                      <h3 className={`text-xl font-bold mt-2 ${
                        contrastHigh ? 'text-contrast-text' : 'text-gray-800'
                      }`}>
                        {element.name}
                      </h3>
                    </div>
                    
                    <div className={`space-y-4 ${
                      contrastHigh ? 'text-contrast-text' : 'text-gray-600'
                    }`}>
                      <p>{element.educationalInfo}</p>
                      
                      <div className={`p-3 rounded-xl ${
                        contrastHigh ? 'bg-contrast-text/10' : 'bg-blue-50'
                      }`}>
                        <div className="text-sm font-medium mb-1">📖 Référence biblique :</div>
                        <div className={`text-sm ${
                          contrastHigh ? 'text-contrast-text' : 'text-blue-800'
                        }`}>
                          {element.biblicalReference}
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setGameState(prev => ({ ...prev, showInfo: null }))}
                      className={`w-full mt-6 py-3 px-4 rounded-xl font-medium transition-colors ${
                        contrastHigh 
                          ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                          : 'bg-amber-500 text-white hover:bg-amber-600'
                      }`}
                    >
                      Fermer
                    </button>
                  </>
                ) : null;
              })()}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TempleBuilderGame;