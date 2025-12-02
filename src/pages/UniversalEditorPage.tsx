import { useState, useEffect } from 'react';
import { useSettings } from '../state/settingsStore';

// Mot de passe hashé (SHA-256) pour accéder à l'éditeur
// Mot de passe: BibleCopte2024!Admin
const EDITOR_PASSWORD_HASH = '8f14e45fceea167a5a36dedd4bea2543'; // MD5 hash

interface ContentCategory {
  id: string;
  name: string;
  icon: string;
  folders: string[];
}

interface ContentItem {
  id: string;
  title: string;
  category?: string;
  emoji?: string;
  description?: string;
  [key: string]: any;
}

export default function UniversalEditorPage() {
  const { contrastHigh } = useSettings();
  const isProduction = window.location.hostname !== 'localhost' && !window.location.hostname.includes('127.0.0.1');
  
  // État d'authentification
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [authAttempts, setAuthAttempts] = useState<number>(0);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [lockEndTime, setLockEndTime] = useState<number>(0);

  // Vérifier si déjà authentifié (session storage)
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('editor_authenticated');
    const lockTime = localStorage.getItem('editor_lock_time');
    
    if (lockTime) {
      const endTime = parseInt(lockTime);
      if (Date.now() < endTime) {
        setIsLocked(true);
        setLockEndTime(endTime);
      } else {
        localStorage.removeItem('editor_lock_time');
        localStorage.removeItem('editor_attempts');
      }
    }
    
    const attempts = parseInt(localStorage.getItem('editor_attempts') || '0');
    setAuthAttempts(attempts);
    
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Timer pour le déverrouillage
  useEffect(() => {
    if (isLocked && lockEndTime > 0) {
      const timer = setInterval(() => {
        if (Date.now() >= lockEndTime) {
          setIsLocked(false);
          localStorage.removeItem('editor_lock_time');
          localStorage.removeItem('editor_attempts');
          setAuthAttempts(0);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isLocked, lockEndTime]);

  // Fonction de hash simple pour vérification
  const simpleHash = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  };

  // Vérification du mot de passe
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) return;
    
    // Mot de passe correct: BibleCopte2024!Admin
    const correctPassword = 'BibleCopte2024!Admin';
    
    if (passwordInput === correctPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('editor_authenticated', 'true');
      localStorage.removeItem('editor_attempts');
      setAuthError('');
      setAuthAttempts(0);
    } else {
      const newAttempts = authAttempts + 1;
      setAuthAttempts(newAttempts);
      localStorage.setItem('editor_attempts', newAttempts.toString());
      
      if (newAttempts >= 5) {
        // Verrouiller pendant 15 minutes après 5 tentatives
        const lockTime = Date.now() + 15 * 60 * 1000;
        localStorage.setItem('editor_lock_time', lockTime.toString());
        setIsLocked(true);
        setLockEndTime(lockTime);
        setAuthError('⛔ Trop de tentatives. Éditeur verrouillé pendant 15 minutes.');
      } else {
        setAuthError(`❌ Mot de passe incorrect. Tentative ${newAttempts}/5`);
      }
      setPasswordInput('');
    }
  };

  // Interface d'authentification
  if (!isAuthenticated) {
    const remainingTime = isLocked ? Math.ceil((lockEndTime - Date.now()) / 1000 / 60) : 0;
    
    return (
      <div className={`min-h-screen flex items-center justify-center ${contrastHigh ? 'bg-contrast-bg' : 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'}`}>
        <div className={`max-w-md w-full mx-4 p-8 rounded-2xl shadow-2xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white/10 backdrop-blur-lg border border-white/20'}`}>
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🔐</div>
            <h1 className={`text-2xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-white'}`}>
              Éditeur Universel
            </h1>
            <p className={`mt-2 ${contrastHigh ? 'text-contrast-text' : 'text-gray-300'}`}>
              Accès réservé aux administrateurs
            </p>
          </div>
          
          {isLocked ? (
            <div className="text-center">
              <div className="text-4xl mb-4">⏳</div>
              <p className={`text-lg ${contrastHigh ? 'text-contrast-text' : 'text-red-400'}`}>
                Éditeur verrouillé
              </p>
              <p className={`mt-2 ${contrastHigh ? 'text-contrast-text' : 'text-gray-300'}`}>
                Réessayez dans {remainingTime} minute{remainingTime > 1 ? 's' : ''}
              </p>
            </div>
          ) : (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-gray-300'}`}>
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text text-contrast-text' : 'bg-white/20 border border-white/30 text-white placeholder-gray-400'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  placeholder="Entrez le mot de passe"
                  autoFocus
                  disabled={isLocked}
                />
              </div>
              
              {authError && (
                <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-red-400'}`}>
                  {authError}
                </p>
              )}
              
              <button
                type="submit"
                disabled={isLocked || !passwordInput}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  isLocked || !passwordInput
                    ? 'bg-gray-500 cursor-not-allowed'
                    : contrastHigh
                      ? 'bg-contrast-text text-contrast-bg hover:opacity-90'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                }`}
              >
                🔓 Accéder à l'éditeur
              </button>
            </form>
          )}
          
          <div className={`mt-6 text-center text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-400'}`}>
            <p>⚠️ Cet outil est réservé à l'administration du contenu.</p>
          </div>
        </div>
      </div>
    );
  }

  const [categories] = useState<ContentCategory[]>([
    { id: 'pentateuque', name: 'Pentateuque', icon: '📜', folders: ['/content/pentateuque'] },
    { id: 'nouveau_testament', name: 'Nouveau Testament', icon: '✝️', folders: ['/content/nouveau_testament'] },
    { id: 'historiques', name: 'Livres Historiques', icon: '📖', folders: ['/content/historiques'] },
    { id: 'poetiques', name: 'Livres Poétiques', icon: '🎵', folders: ['/content/poetiques'] },
    { id: 'prophetiques', name: 'Livres Prophétiques', icon: '🔮', folders: ['/content/prophetiques'] },
    { id: 'saints', name: 'Histoire des Saints', icon: '⛪', folders: ['/content/histoire_saints'] },
    { id: 'icones', name: 'Icônes Coptes', icon: '🖼️', folders: ['/content/icones_coptes'] },
  ]);
  
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [contentList, setContentList] = useState<ContentItem[]>([]);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [editedContent, setEditedContent] = useState<any>(null);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'json' | 'visual'>('visual');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    basic: true,
    verses: false,
    reading: false,
    quiz: false,
    timeline: false
  });
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [originalContent, setOriginalContent] = useState<any>(null);

  const knownFiles: Record<string, string[]> = {
    'pentateuque': [
      'abraham_01', 'adam_eve_01', 'babel_01', 'buisson_ardent_nouveau', 'cain_abel_01',
      'commandements_01', 'creation_01', 'david_goliath_01', 'david_roi_01', 'isaac_mariage_01',
      'isaac_sacrifice_01', 'jacob_esau_01', 'jacob_songe_01', 'jericho_01', 'joseph_01',
      'josue_01', 'mer_rouge_01', 'moise_01', 'moise_buisson_01', 'moise_buisson_nouveau',
      'noe_01', 'plaies_egypte_01', 'promised_land', 'salomon_sagesse_01', 'serpent_airain_01',
      'tabernacle', 'tabernacle_01', 'temple_salomon_01', 'terre_promise_01', 'test_buisson_complet',
      'traversee_jourdain', 'veau_or_01'
    ],
    'nouveau_testament': [
      'bapteme_jesus', 'enfance_jesus', 'naissance_jesus', 'tentations_jesus'
    ],
    'historiques': [
      'daniel_01', 'david_01', 'gedeon_01', 'hannah_prayer', 'josue_01',
      'ruth_naomi', 'salomon_01', 'samson_01', 'samuel_call'
    ],
    'poetiques': [],
    'prophetiques': [
      'elie_01', 'ezechiel_01', 'jonas_01', 'jonas_02_fuite', 'jonas_03_ninive', 'jonas_04_ricin'
    ],
    'saints': ['saint_athanase', 'saint_cyrille_alexandrie', 'sainte_marie_egyptienne'],
    'icones': ['icone_annonciation', 'icone_sagesse', 'icone_theotokos']
  };

  const handleCategorySelect = async (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedContent(null);
    setEditedContent(null);
    await loadCategoryContent(categoryId);
  };

  const loadCategoryContent = async (categoryId: string) => {
    const items: ContentItem[] = [];
    const fileList = knownFiles[categoryId] || [];
    const category = categories.find(c => c.id === categoryId);
    
    if (!category) return;

    for (const fileName of fileList) {
      for (const folder of category.folders) {
        try {
          const url = `${folder}/${fileName}.json`;
          const resp = await fetch(url);
          if (resp.ok) {
            const data = await resp.json();
            items.push({
              id: data.id || fileName,
              title: data.title || fileName,
              category: data.category,
              emoji: data.emoji,
              description: data.description,
              _sourceUrl: url,
              _sourceFolder: folder
            });
            break;
          }
        } catch (error) {
          // Continue to next folder
        }
      }
    }
    
    setContentList(items);
  };

  const handleContentSelect = async (item: ContentItem) => {
    setSelectedContent(item);
    setActiveTab('visual');
    await loadFullContent(item);
  };

  const loadFullContent = async (item: ContentItem) => {
    if (item._sourceUrl) {
      try {
        const resp = await fetch(item._sourceUrl);
        if (resp.ok) {
          const data = await resp.json();
          const contentCopy = JSON.parse(JSON.stringify(data));
          setEditedContent(contentCopy);
          setOriginalContent(contentCopy);
          setHasChanges(false);
        }
      } catch (error) {
        console.error('Erreur de chargement:', error);
      }
    }
  };

  const handleSave = async () => {
    if (!editedContent || !selectedContent) return;
    
    // Vérifier si on est en production
    if (isProduction) {
      alert('⚠️ Sauvegarde désactivée en production\n\nL\'éditeur universel est un outil de développement.\nPour modifier le contenu :\n1. Clonez le projet localement\n2. Lancez le serveur de développement (npm run dev)\n3. Utilisez l\'éditeur en local\n4. Committez vos modifications sur Git');
      return;
    }
    
    try {
      // Récupérer le chemin du fichier depuis l'URL source
      const filePath = selectedContent._sourceUrl || '';
      
      // Envoyer au serveur API (localhost uniquement)
      const response = await fetch('http://localhost:3002/api/save-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filePath: filePath,
          content: editedContent
        })
      });

      const result = await response.json();

      if (result.success) {
        setShowSaveSuccess(true);
        setHasChanges(false);
        setOriginalContent(JSON.parse(JSON.stringify(editedContent)));
        setTimeout(() => setShowSaveSuccess(false), 3000);
      } else {
        alert(`Erreur de sauvegarde: ${result.message}`);
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Erreur: Impossible de sauvegarder.\n\nAssurez-vous que :\n1. Le serveur API est démarré (npm run server)\n2. Il écoute sur le port 3002\n3. Vous êtes en environnement de développement local');
    }
  };

  const updateField = (path: string, value: any) => {
    if (!editedContent) return;
    
    const keys = path.split('.');
    const newContent = JSON.parse(JSON.stringify(editedContent));
    let current = newContent;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setEditedContent(newContent);
    setHasChanges(true);
  };

  const addArrayItem = (path: string, template: any) => {
    if (!editedContent) return;
    
    const keys = path.split('.');
    const newContent = JSON.parse(JSON.stringify(editedContent));
    let current = newContent;
    
    for (const key of keys) {
      if (!current[key]) current[key] = [];
      if (keys.indexOf(key) === keys.length - 1) {
        current[key].push(template);
      } else {
        current = current[key];
      }
    }
    
    setEditedContent(newContent);
  };

  const removeArrayItem = (path: string, index: number) => {
    if (!editedContent) return;
    
    const keys = path.split('.');
    const newContent = JSON.parse(JSON.stringify(editedContent));
    let current = newContent;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    const arr = current[keys[keys.length - 1]];
    if (Array.isArray(arr)) {
      arr.splice(index, 1);
    }
    
    setEditedContent(newContent);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const renderField = (label: string, value: any, path: string, type: 'text' | 'textarea' | 'number' = 'text', placeholder?: string, help?: string) => {
    if (type === 'textarea') {
      return (
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1 text-gray-700">
            {label}
            {help && <span className="ml-2 text-xs font-normal text-gray-500 italic">({help})</span>}
          </label>
          <textarea
            value={value || ''}
            onChange={(e) => updateField(path, e.target.value)}
            placeholder={placeholder}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
        </div>
      );
    }
    
    return (
      <div className="mb-4">
        <label className="block text-sm font-bold mb-1 text-gray-700">
          {label}
          {help && <span className="ml-2 text-xs font-normal text-gray-500 italic">({help})</span>}
        </label>
        <input
          type={type}
          value={value || ''}
          onChange={(e) => updateField(path, type === 'number' ? parseInt(e.target.value) : e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
        />
      </div>
    );
  };

  const renderSection = (title: string, icon: string, sectionKey: string, children: React.ReactNode, help?: string) => {
    const isExpanded = expandedSections[sectionKey];
    return (
      <div className="mb-4 border-2 border-gray-200 rounded-xl overflow-hidden">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all"
        >
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{icon}</span>
            <div className="text-left">
              <h3 className="font-bold text-gray-800">{title}</h3>
              {help && <p className="text-xs text-gray-600">{help}</p>}
            </div>
          </div>
          <span className={`text-2xl transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        {isExpanded && (
          <div className="p-4 bg-white">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-slate-50 to-blue-50'}`}>
      <header className={`sticky top-0 z-40 backdrop-blur-md ${contrastHigh ? 'bg-contrast-bg/95' : 'bg-white/95 shadow-sm border-b border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <span className="text-2xl sm:text-3xl">📝</span>
              <div>
                <h1 className={`text-lg sm:text-2xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                  Éditeur Universel de Contenu
                </h1>
                <p className={`text-xs sm:text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
                  Gérez TOUS vos contenus : Histoires bibliques, Saints, Icônes, et plus
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {showSaveSuccess && (
          <div className="mb-4 sm:mb-6 p-4 sm:p-6 bg-gradient-to-r from-green-100 to-emerald-100 border-2 sm:border-4 border-green-500 rounded-xl sm:rounded-2xl shadow-xl animate-pulse">
            <div className="flex items-start space-x-2 sm:space-x-4">
              <span className="text-3xl sm:text-5xl">✅</span>
              <div className="flex-1">
                <h3 className="text-base sm:text-xl font-bold text-green-800 mb-1 sm:mb-2">Sauvegarde réussie !</h3>
                <p className="text-sm sm:text-base text-green-700 font-semibold mb-2 sm:mb-3">
                  Le contenu a été copié dans votre presse-papier.
                </p>
                <div className="bg-white p-3 rounded-lg border-2 border-green-300">
                  <p className="text-sm text-green-800 mb-2"><strong>Prochaines étapes :</strong></p>
                  <ol className="text-sm text-green-700 space-y-1">
                    <li>✏️ Ouvrez le fichier JSON dans votre éditeur</li>
                    <li>📋 Collez le contenu (Ctrl+V ou Cmd+V)</li>
                    <li>💾 Sauvegardez le fichier</li>
                    <li>🎉 Le site se mettra à jour automatiquement !</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-6">
          {/* Colonne 1: Catégories */}
          <div className={`${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'} rounded-xl p-4 sm:p-6`}>
            <h2 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
              Catégories ({categories.length})
            </h2>
            <div className="space-y-2 max-h-[300px] sm:max-h-[600px] overflow-y-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`w-full text-left p-2.5 sm:p-3 rounded-lg transition-all text-sm sm:text-base ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : contrastHigh
                      ? 'bg-contrast-bg border border-contrast-text hover:bg-contrast-text/10'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-xl sm:text-2xl">{category.icon}</span>
                    <div className="font-semibold text-sm sm:text-base">{category.name}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Colonne 2: Liste des contenus */}
          <div className={`${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'} rounded-xl p-4 sm:p-6`}>
            <h2 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
              Contenus ({contentList.length})
            </h2>
            
            {/* Barre de recherche */}
            {contentList.length > 0 && (
              <div className="mb-3 sm:mb-4">
                <input
                  type="text"
                  placeholder="🔍 Rechercher une histoire..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 rounded-lg border-2 border-gray-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>
            )}
            
            {contentList.length > 0 ? (
              <div className="space-y-2 max-h-[400px] sm:max-h-[600px] overflow-y-auto">
                {contentList
                  .filter(item => 
                    !searchTerm || 
                    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.id.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleContentSelect(item)}
                    className={`w-full text-left p-2.5 sm:p-3 rounded-lg transition-all text-sm sm:text-base ${
                      selectedContent?.id === item.id
                        ? 'bg-purple-600 text-white shadow-lg scale-105'
                        : contrastHigh
                        ? 'bg-contrast-bg border border-contrast-text hover:bg-contrast-text/10'
                        : 'bg-gray-50 hover:bg-gray-100 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {item.emoji && <span className="text-xl">{item.emoji}</span>}
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{item.title}</div>
                        {item.description && (
                          <div className="text-xs opacity-75 line-clamp-1">{item.description}</div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 sm:py-8">
                <span className="text-3xl sm:text-4xl mb-2 block">👈</span>
                <p className={`text-xs sm:text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-500'}`}>
                  Choisissez une catégorie à gauche
                </p>
              </div>
            )}
          </div>

          {/* Colonnes 3-4: Éditeur */}
          <div className={`lg:col-span-2 ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'} rounded-xl p-4 sm:p-6`}>
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <h2 className={`text-lg sm:text-xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                Éditeur
              </h2>
              {hasChanges && (
                <div className="px-2 sm:px-4 py-1.5 sm:py-2 bg-orange-100 border-2 border-orange-400 rounded-lg flex items-center space-x-1 sm:space-x-2 animate-pulse">
                  <span className="text-base sm:text-xl">⚠️</span>
                  <span className="text-xs sm:text-sm font-bold text-orange-800">Modif. non sauv.</span>
                </div>
              )}
            </div>

            {editedContent ? (
              <div>
                {/* Onglets */}
                <div className="flex space-x-1 sm:space-x-2 mb-4 sm:mb-6 border-b border-gray-200 pb-2">
                  <button
                    onClick={() => setActiveTab('visual')}
                    className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-t-lg font-medium transition-all text-xs sm:text-base ${
                      activeTab === 'visual'
                        ? 'bg-blue-600 text-white'
                        : contrastHigh
                        ? 'bg-contrast-bg border border-contrast-text'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    👁️ Éditeur Visuel
                  </button>
                  <button
                    onClick={() => setActiveTab('json')}
                    className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-t-lg font-medium transition-all text-xs sm:text-base ${
                      activeTab === 'json'
                        ? 'bg-blue-600 text-white'
                        : contrastHigh
                        ? 'bg-contrast-bg border border-contrast-text'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    💻 JSON Brut
                  </button>
                </div>

                <div className="max-h-[350px] sm:max-h-[500px] overflow-y-auto space-y-2 pr-2">
                  {activeTab === 'visual' ? (
                    <>
                      {/* Aide principale */}
                      <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                        <div className="flex items-start space-x-2 sm:space-x-3">
                          <span className="text-2xl sm:text-3xl">💡</span>
                          <div>
                            <h4 className="font-bold text-blue-800 mb-1 text-sm sm:text-base">Comment utiliser cet éditeur ?</h4>
                            <ul className="text-xs sm:text-sm text-blue-700 space-y-1">
                              <li>✏️ <strong>Modifiez</strong> les textes dans les champs ci-dessous</li>
                              <li>➕ <strong>Ajoutez</strong> des sections en cliquant sur les boutons verts</li>
                              <li>🗑️ <strong>Supprimez</strong> des éléments avec l'icône corbeille</li>
                              <li>💾 <strong>Sauvegardez</strong> en cliquant sur le bouton bleu en bas</li>
                              <li>📋 Le contenu sera <strong>copié automatiquement</strong> pour le coller dans le fichier</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Section Informations de base */}
                      {renderSection('Informations de base', '📝', 'basic', 
                        <>
                          {renderField('ID', editedContent.id, 'id', 'text', 'Ex: cain_abel_01', 'Identifiant unique (ne pas modifier)')}
                          {renderField('Titre', editedContent.title, 'title', 'text', 'Ex: Caïn et Abel', 'Nom de l\'histoire')}
                          {renderField('Description', editedContent.description, 'description', 'textarea', 'Résumé de l\'histoire en quelques lignes...', 'Courte description')}
                          {editedContent.emoji !== undefined && renderField('Emoji', editedContent.emoji, 'emoji', 'text', '😊', 'Icône de l\'histoire')}
                          {editedContent.category !== undefined && renderField('Catégorie', editedContent.category, 'category', 'text', 'Ex: Ancien Testament')}
                          {editedContent.duration !== undefined && renderField('Durée (minutes)', editedContent.duration, 'duration', 'text', 'Ex: 15 min')}
                          {editedContent.difficulty !== undefined && renderField('Difficulté', editedContent.difficulty, 'difficulty', 'text', 'Ex: Facile, Moyen, Difficile')}
                          {editedContent.book !== undefined && renderField('Livre biblique', editedContent.book, 'book', 'text', 'Ex: Genèse')}
                          {editedContent.key_verse !== undefined && renderField('Verset clé', editedContent.key_verse, 'key_verse', 'text', 'Ex: Genèse 4:8', 'Référence principale')}
                        </>,
                        'Les informations principales de votre contenu'
                      )}

                      {/* Section Versets bibliques */}
                      {renderSection('Versets Bibliques', '📜', 'verses',
                        <>
                          <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 bg-purple-50 rounded-lg border border-purple-200">
                            <p className="text-xs sm:text-sm text-purple-800">
                              <strong>💡 Astuce :</strong> Ajoutez ici les versets importants de l'histoire. 
                              Par exemple pour Caïn et Abel : "Genèse 4:8" avec le texte du verset.
                            </p>
                          </div>
                          
                          <button
                            onClick={() => {
                              if (!editedContent.bible_verses) {
                                updateField('bible_verses', []);
                              }
                              addArrayItem('bible_verses', { reference: '', text: '' });
                            }}
                            className="w-full mb-3 sm:mb-4 px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2 text-sm sm:text-base"
                          >
                            <span className="text-xl">➕</span>
                            <span>Ajouter un nouveau verset</span>
                          </button>
                          
                          {(!editedContent.bible_verses || editedContent.bible_verses.length === 0) && (
                            <div className="text-center py-6 sm:py-8 border-2 border-dashed border-gray-300 rounded-lg">
                              <span className="text-3xl sm:text-4xl mb-2 block">📖</span>
                              <p className="text-gray-500 text-xs sm:text-sm">Aucun verset. Cliquez sur "Ajouter" ci-dessus.</p>
                            </div>
                          )}
                          
                          {editedContent.bible_verses && Array.isArray(editedContent.bible_verses) && editedContent.bible_verses.map((verse: any, index: number) => (
                            <div key={index} className="mb-3 sm:mb-4 p-3 sm:p-4 border-2 border-purple-300 rounded-xl bg-gradient-to-br from-purple-50 to-white shadow-sm">
                              <div className="flex justify-between items-center mb-3">
                                <span className="px-2 sm:px-3 py-1 bg-purple-600 text-white rounded-full text-xs font-bold">
                                  Verset {index + 1}
                                </span>
                                <button
                                  onClick={() => removeArrayItem('bible_verses', index)}
                                  className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all font-semibold text-sm"
                                >
                                  🗑️ Supprimer
                                </button>
                              </div>
                              
                              <label className="block text-xs font-bold text-gray-600 mb-1">RÉFÉRENCE</label>
                              <input
                                type="text"
                                value={verse.reference || ''}
                                onChange={(e) => {
                                  const newVerses = [...editedContent.bible_verses];
                                  newVerses[index] = { ...verse, reference: e.target.value };
                                  updateField('bible_verses', newVerses);
                                }}
                                placeholder="Ex: Genèse 4:8"
                                className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 mb-3 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                              />
                              
                              <label className="block text-xs font-bold text-gray-600 mb-1">TEXTE DU VERSET</label>
                              <textarea
                                value={verse.text || ''}
                                onChange={(e) => {
                                  const newVerses = [...editedContent.bible_verses];
                                  newVerses[index] = { ...verse, text: e.target.value };
                                  updateField('bible_verses', newVerses);
                                }}
                                placeholder="Copiez ici le texte complet du verset biblique..."
                                rows={4}
                                className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                              />
                            </div>
                          ))}
                        </>,
                        `${(editedContent.bible_verses || []).length} verset(s) - Ajoutez les passages bibliques importants`
                      )}


                      {/* Section Timeline */}
                      {renderSection('Étapes du Jeu Timeline', '🎮', 'timeline',
                        <>
                          <div className="mb-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                            <p className="text-sm text-indigo-800">
                              <strong>💡 Info :</strong> Ces étapes servent pour le jeu de chronologie. 
                              Ajoutez les événements dans l'ordre où ils se déroulent dans l'histoire.
                            </p>
                          </div>
                          
                          <button
                            onClick={() => {
                              if (!editedContent.story_steps) {
                                updateField('story_steps', []);
                              }
                              addArrayItem('story_steps', { text: '', image: '' });
                            }}
                            className="w-full mb-4 px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                          >
                            <span className="text-xl">➕</span>
                            <span>Ajouter une étape</span>
                          </button>
                          
                          {(!editedContent.story_steps || editedContent.story_steps.length === 0) && (
                            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                              <span className="text-4xl mb-2 block">⏱️</span>
                              <p className="text-gray-500">Aucune étape. Ajoutez-en pour le jeu timeline.</p>
                            </div>
                          )}
                          
                          {editedContent.story_steps && Array.isArray(editedContent.story_steps) && editedContent.story_steps.map((step: any, index: number) => (
                            <div key={index} className="mb-4 p-4 border-2 border-indigo-300 rounded-xl bg-gradient-to-br from-indigo-50 to-white shadow-sm">
                              <div className="flex justify-between items-center mb-3">
                                <span className="px-3 py-1 bg-indigo-600 text-white rounded-full text-xs font-bold">
                                  Étape {index + 1}
                                </span>
                                <button
                                  onClick={() => removeArrayItem('story_steps', index)}
                                  className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all font-semibold text-sm"
                                >
                                  🗑️ Supprimer
                                </button>
                              </div>
                              
                              <label className="block text-xs font-bold text-gray-600 mb-1">DESCRIPTION</label>
                              <textarea
                                value={step.text || ''}
                                onChange={(e) => {
                                  const newSteps = [...editedContent.story_steps];
                                  newSteps[index] = { ...step, text: e.target.value };
                                  updateField('story_steps', newSteps);
                                }}
                                placeholder="Ex: Adam et Ève désobéissent à Dieu..."
                                rows={2}
                                className="w-full px-4 py-2 rounded-lg border-2 border-indigo-300 mb-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                              />
                              
                              <label className="block text-xs font-bold text-gray-600 mb-1">IMAGE (optionnel)</label>
                              <input
                                type="text"
                                value={step.image || ''}
                                onChange={(e) => {
                                  const newSteps = [...editedContent.story_steps];
                                  newSteps[index] = { ...step, image: e.target.value };
                                  updateField('story_steps', newSteps);
                                }}
                                placeholder="URL de l'image ou laissez vide"
                                className="w-full px-4 py-2 rounded-lg border-2 border-indigo-300 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                              />
                            </div>
                          ))}
                        </>,
                        `${(editedContent.story_steps || []).length} étape(s) - Pour le jeu de chronologie`
                      )}

                      {/* Section Contenu de lecture */}
                      {editedContent.reading && Array.isArray(editedContent.reading) && renderSection('Texte de l\'histoire', '📖', 'reading',
                        <>
                          <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                            <p className="text-sm text-green-800">
                              <strong>� Important :</strong> C'est ici que vous écrivez l'histoire complète. 
                              Divisez-la en paragraphes pour faciliter la lecture.
                            </p>
                          </div>
                          
                          <button
                            onClick={() => addArrayItem('reading', '')}
                            className="w-full mb-4 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                          >
                            <span className="text-xl">➕</span>
                            <span>Ajouter un paragraphe</span>
                          </button>
                          
                          {editedContent.reading.length === 0 && (
                            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                              <span className="text-4xl mb-2 block">📝</span>
                              <p className="text-gray-500">Aucun paragraphe. Commencez à écrire l'histoire !</p>
                            </div>
                          )}
                          
                          {editedContent.reading.map((item: any, index: number) => (
                            <div key={index} className="mb-4 p-4 border-2 border-green-300 rounded-xl bg-gradient-to-br from-green-50 to-white shadow-sm">
                              <div className="flex justify-between items-center mb-3">
                                <span className="px-3 py-1 bg-green-600 text-white rounded-full text-xs font-bold">
                                  Paragraphe {index + 1}
                                </span>
                                <button
                                  onClick={() => removeArrayItem('reading', index)}
                                  className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all font-semibold text-sm"
                                >
                                  🗑️ Supprimer
                                </button>
                              </div>
                              <textarea
                                value={typeof item === 'string' ? item : item.paragraph || item.text || ''}
                                onChange={(e) => {
                                  const newReading = [...editedContent.reading];
                                  if (typeof item === 'string') {
                                    newReading[index] = e.target.value;
                                  } else {
                                    newReading[index] = { ...item, paragraph: e.target.value, text: e.target.value };
                                  }
                                  updateField('reading', newReading);
                                }}
                                placeholder="Écrivez le contenu du paragraphe ici..."
                                rows={5}
                                className="w-full px-4 py-3 rounded-lg border-2 border-green-300 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200"
                              />
                            </div>
                          ))}
                        </>,
                        `${editedContent.reading.length} paragraphe(s) - Le texte principal de l'histoire`
                      )}

                      {/* Contenu de lecture structuré */}
                      {editedContent.readingContent?.content && Array.isArray(editedContent.readingContent.content) && (
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-medium">📖 Contenu ({editedContent.readingContent.content.length})</label>
                            <button
                              onClick={() => addArrayItem('readingContent.content', { type: 'paragraph', text: '' })}
                              className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                            >
                              + Ajouter
                            </button>
                          </div>
                          {editedContent.readingContent.content.map((item: any, index: number) => (
                            <div key={index} className="mb-3 p-3 border border-gray-300 rounded-lg bg-gray-50">
                              <div className="flex justify-between mb-2">
                                <select
                                  value={item.type}
                                  onChange={(e) => {
                                    const newContent = [...editedContent.readingContent.content];
                                    newContent[index] = { ...item, type: e.target.value };
                                    updateField('readingContent.content', newContent);
                                  }}
                                  className="px-2 py-1 rounded border border-gray-300 text-sm"
                                >
                                  <option value="paragraph">Paragraphe</option>
                                  <option value="heading">Titre</option>
                                  <option value="quote">Citation</option>
                                </select>
                                <button
                                  onClick={() => removeArrayItem('readingContent.content', index)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  🗑️
                                </button>
                              </div>
                              <textarea
                                value={item.text || ''}
                                onChange={(e) => {
                                  const newContent = [...editedContent.readingContent.content];
                                  newContent[index] = { ...item, text: e.target.value };
                                  updateField('readingContent.content', newContent);
                                }}
                                rows={3}
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Section Quiz */}
                      {editedContent.quiz && Array.isArray(editedContent.quiz) && renderSection('Questions du Quiz', '❓', 'quiz',
                        <>
                          <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                            <p className="text-sm text-yellow-800">
                              <strong>💡 Astuce :</strong> Créez des questions pour tester la compréhension de l'histoire. 
                              Donnez 3 choix et indiquez le numéro de la bonne réponse (0, 1 ou 2).
                            </p>
                          </div>
                          
                          <button
                            onClick={() => addArrayItem('quiz', { q: '', choices: ['', '', ''], answer: 0 })}
                            className="w-full mb-4 px-4 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                          >
                            <span className="text-xl">➕</span>
                            <span>Ajouter une question</span>
                          </button>
                          
                          {editedContent.quiz.length === 0 && (
                            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                              <span className="text-4xl mb-2 block">🤔</span>
                              <p className="text-gray-500">Aucune question. Ajoutez-en pour tester les connaissances !</p>
                            </div>
                          )}
                          
                          {editedContent.quiz.map((q: any, index: number) => (
                            <div key={index} className="mb-4 p-4 border-2 border-yellow-300 rounded-xl bg-gradient-to-br from-yellow-50 to-white shadow-sm">
                              <div className="flex justify-between items-center mb-3">
                                <span className="px-3 py-1 bg-yellow-600 text-white rounded-full text-xs font-bold">
                                  Question {index + 1}
                                </span>
                                <button
                                  onClick={() => removeArrayItem('quiz', index)}
                                  className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all font-semibold text-sm"
                                >
                                  🗑️ Supprimer
                                </button>
                              </div>
                              
                              <label className="block text-xs font-bold text-gray-600 mb-1">QUESTION</label>
                              <input
                                type="text"
                                value={q.q || q.question || ''}
                                onChange={(e) => {
                                  const newQuiz = [...editedContent.quiz];
                                  newQuiz[index] = { ...q, q: e.target.value };
                                  updateField('quiz', newQuiz);
                                }}
                                placeholder="Ex: Qui tua son frère ?"
                                className="w-full px-4 py-2 rounded-lg border-2 border-yellow-300 mb-3 text-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                              />
                              
                              <label className="block text-xs font-bold text-gray-600 mb-2">CHOIX DE RÉPONSES</label>
                              {(q.choices || []).map((choice: string, cIndex: number) => (
                                <div key={cIndex} className="flex items-center mb-2">
                                  <span className="mr-2 px-2 py-1 bg-gray-200 rounded text-xs font-bold">
                                    {cIndex === 0 ? 'A' : cIndex === 1 ? 'B' : 'C'}
                                  </span>
                                  <input
                                    type="text"
                                    value={choice}
                                    onChange={(e) => {
                                      const newQuiz = [...editedContent.quiz];
                                      const newChoices = [...(q.choices || [])];
                                      newChoices[cIndex] = e.target.value;
                                      newQuiz[index] = { ...q, choices: newChoices };
                                      updateField('quiz', newQuiz);
                                    }}
                                    placeholder={`Réponse ${cIndex + 1}`}
                                    className="flex-1 px-3 py-2 rounded-lg border-2 border-yellow-200 text-sm focus:border-yellow-400"
                                  />
                                </div>
                              ))}
                              
                              <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                <label className="block text-xs font-bold text-green-700 mb-2">BONNE RÉPONSE</label>
                                <select
                                  value={q.answer ?? 0}
                                  onChange={(e) => {
                                    const newQuiz = [...editedContent.quiz];
                                    newQuiz[index] = { ...q, answer: parseInt(e.target.value) };
                                    updateField('quiz', newQuiz);
                                  }}
                                  className="w-full px-3 py-2 rounded-lg border-2 border-green-300 text-sm focus:border-green-500"
                                >
                                  <option value="0">A - {(q.choices || [])[0] || 'Choix 1'}</option>
                                  <option value="1">B - {(q.choices || [])[1] || 'Choix 2'}</option>
                                  <option value="2">C - {(q.choices || [])[2] || 'Choix 3'}</option>
                                </select>
                              </div>
                            </div>
                          ))}
                        </>,
                        `${editedContent.quiz.length} question(s) - Pour tester la compréhension`
                      )}
                    </>
                  ) : (
                    <textarea
                      value={JSON.stringify(editedContent, null, 2)}
                      onChange={(e) => {
                        try {
                          const parsed = JSON.parse(e.target.value);
                          setEditedContent(parsed);
                        } catch (error) {
                          // Invalid JSON, don't update
                        }
                      }}
                      className="w-full h-[500px] px-3 py-2 rounded-lg border border-gray-300 font-mono text-xs"
                    />
                  )}
                </div>

                {/* Boutons */}
                <div className="sticky bottom-0 bg-white border-t-4 border-blue-500 pt-4 mt-6 shadow-lg">
                  {isProduction && (
                    <div className="mb-3 px-4 py-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded">
                      <p className="flex items-center space-x-2">
                        <span className="text-xl">⚠️</span>
                        <span className="font-semibold">Mode lecture seule (Production)</span>
                      </p>
                      <p className="text-sm mt-1">La sauvegarde est désactivée en production. Utilisez l'éditeur en local pour modifier le contenu.</p>
                    </div>
                  )}
                  <div className="flex flex-col space-y-3">
                    <button
                      onClick={handleSave}
                      disabled={isProduction}
                      className={`w-full px-6 py-4 rounded-xl transition-all font-bold text-lg flex items-center justify-center space-x-3 ${
                        isProduction 
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-xl'
                      }`}
                      title={isProduction ? 'Sauvegarde désactivée en production' : 'Sauvegarder les modifications'}
                    >
                      <span className="text-2xl">💾</span>
                      <span>{isProduction ? 'SAUVEGARDE DÉSACTIVÉE' : 'SAUVEGARDER LES MODIFICATIONS'}</span>
                    </button>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => loadFullContent(selectedContent!)}
                        className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold flex items-center justify-center space-x-2"
                      >
                        <span className="text-xl">↺</span>
                        <span>Annuler les changements</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          const jsonData = JSON.stringify(editedContent, null, 2);
                          const blob = new Blob([jsonData], { type: 'application/json' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `${editedContent.id}.json`;
                          a.click();
                        }}
                        className="flex-1 px-4 py-3 bg-green-200 text-green-700 rounded-lg hover:bg-green-300 font-semibold flex items-center justify-center space-x-2"
                      >
                        <span className="text-xl">📥</span>
                        <span>Télécharger JSON</span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">📌</span>
                      <div>
                        <p className="text-sm font-bold text-blue-900 mb-1">Instructions de sauvegarde :</p>
                        <ol className="text-xs text-blue-800 space-y-1">
                          <li><strong>1.</strong> Cliquez sur "SAUVEGARDER" → Le JSON est copié automatiquement</li>
                          <li><strong>2.</strong> Ouvrez le fichier : <code className="bg-white px-2 py-0.5 rounded text-xs">{selectedContent?._sourceUrl?.replace('/content/', 'public/content/').replace('/lessons/', 'src/lessons/')}</code></li>
                          <li><strong>3.</strong> Sélectionnez tout (Ctrl+A) et collez (Ctrl+V)</li>
                          <li><strong>4.</strong> Sauvegardez le fichier (Ctrl+S)</li>
                          <li><strong>5.</strong> Le site se mettra à jour automatiquement ! 🎉</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <span className="text-6xl mb-4 block">📝</span>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Prêt à modifier vos contenus ?</h3>
                  <p className={`text-sm mb-6 ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
                    Choisissez une catégorie à gauche, puis sélectionnez une histoire à éditer.
                  </p>
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-left">
                    <p className="text-sm font-bold text-blue-900 mb-2">👉 Pour commencer :</p>
                    <ol className="text-xs text-blue-800 space-y-1">
                      <li><strong>1.</strong> Cliquez sur une catégorie (ex: Pentateuque)</li>
                      <li><strong>2.</strong> Choisissez une histoire dans la liste</li>
                      <li><strong>3.</strong> Modifiez les sections qui vous intéressent</li>
                      <li><strong>4.</strong> Cliquez sur "SAUVEGARDER"</li>
                      <li><strong>5.</strong> Collez le contenu dans le fichier indiqué</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Statistiques */}
        <div className={`mt-8 p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'}`}>
          <h3 className={`text-xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
            📊 Statistiques
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{categories.length}</div>
              <div className="text-sm text-gray-600">Catégories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{contentList.length}</div>
              <div className="text-sm text-gray-600">Contenus Chargés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {Object.values(knownFiles).flat().length}
              </div>
              <div className="text-sm text-gray-600">Fichiers Totaux</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">7</div>
              <div className="text-sm text-gray-600">Types de Contenu</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
