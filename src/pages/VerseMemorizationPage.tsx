import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';

interface MemoryVerse {
  id: number;
  reference: string;
  text: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  learned: boolean;
  accuracy: number;
  attempts: number;
  lastReviewed?: string;
  dateAdded: string;
}

interface Quiz {
  verse: MemoryVerse;
  userInput: string;
  showHints: boolean;
  completed: boolean;
  score: number;
}

const VerseMemorizationPage = () => {
  const { contrastHigh } = useSettings();
  const [verses, setVerses] = useState<MemoryVerse[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newVerse, setNewVerse] = useState({
    reference: '',
    text: '',
    category: 'hope',
    difficulty: 'easy' as 'easy' | 'medium' | 'hard'
  });

  // Versets pré-définis pour commencer
  const defaultVerses: Omit<MemoryVerse, 'id' | 'learned' | 'accuracy' | 'attempts' | 'lastReviewed' | 'dateAdded'>[] = [
    {
      reference: "Jean 3:16",
      text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.",
      difficulty: "easy",
      category: "amour"
    },
    {
      reference: "Philippiens 4:13",
      text: "Je puis tout par celui qui me fortifie.",
      difficulty: "easy",
      category: "force"
    },
    {
      reference: "Psaume 23:1",
      text: "L'Éternel est mon berger: je ne manquerai de rien.",
      difficulty: "easy",
      category: "confiance"
    },
    {
      reference: "Romains 8:28",
      text: "Nous savons, du reste, que toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein.",
      difficulty: "medium",
      category: "espérance"
    },
    {
      reference: "Matthieu 11:28",
      text: "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.",
      difficulty: "medium",
      category: "paix"
    },
    {
      reference: "Jérémie 29:11",
      text: "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance.",
      difficulty: "hard",
      category: "espérance"
    },
    {
      reference: "1 Corinthiens 13:4-5",
      text: "La charité est patiente, elle est pleine de bonté; la charité n'est point envieuse; la charité ne se vante point, elle ne s'enfle point d'orgueil, elle ne fait rien de malhonnête, elle ne cherche point son intérêt, elle ne s'irrite point, elle ne soupçonne point le mal.",
      difficulty: "hard",
      category: "amour"
    },
    {
      reference: "Proverbes 3:5-6",
      text: "Confie-toi en l'Éternel de tout ton cœur, Et ne t'appuie pas sur ta sagesse; Reconnais-le dans toutes tes voies, Et il aplanira tes sentiers.",
      difficulty: "medium",
      category: "sagesse"
    }
  ];

  useEffect(() => {
    // Charger les versets sauvegardés
    const savedVerses = localStorage.getItem('memoryVerses');
    if (savedVerses) {
      setVerses(JSON.parse(savedVerses));
    } else {
      // Initialiser avec les versets par défaut
      const initialVerses = defaultVerses.map((verse, index) => ({
        ...verse,
        id: index + 1,
        learned: false,
        accuracy: 0,
        attempts: 0,
        dateAdded: new Date().toLocaleDateString('fr-FR')
      }));
      setVerses(initialVerses);
      localStorage.setItem('memoryVerses', JSON.stringify(initialVerses));
    }
  }, []);

  const startQuiz = (verse: MemoryVerse) => {
    setCurrentQuiz({
      verse,
      userInput: '',
      showHints: false,
      completed: false,
      score: 0
    });
  };

  const calculateSimilarity = (str1: string, str2: string): number => {
    // Normaliser les chaînes (supprimer ponctuation, convertir en minuscules)
    const normalize = (str: string) => 
      str.toLowerCase()
         .replace(/[.,;:!?"']/g, '')
         .replace(/\s+/g, ' ')
         .trim();

    const s1 = normalize(str1);
    const s2 = normalize(str2);

    if (s1 === s2) return 100;

    // Calcul de la distance de Levenshtein
    const matrix = Array(s2.length + 1).fill(null).map(() => Array(s1.length + 1).fill(null));

    for (let i = 0; i <= s1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= s2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= s2.length; j++) {
      for (let i = 1; i <= s1.length; i++) {
        const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + cost
        );
      }
    }

    const distance = matrix[s2.length][s1.length];
    const maxLength = Math.max(s1.length, s2.length);
    return Math.round(((maxLength - distance) / maxLength) * 100);
  };

  const submitQuiz = () => {
    if (!currentQuiz) return;

    const accuracy = calculateSimilarity(currentQuiz.userInput, currentQuiz.verse.text);
    const updatedVerses = verses.map(v => {
      if (v.id === currentQuiz.verse.id) {
        const newAttempts = v.attempts + 1;
        const newAccuracy = Math.round(((v.accuracy * v.attempts) + accuracy) / newAttempts);
        return {
          ...v,
          accuracy: newAccuracy,
          attempts: newAttempts,
          learned: newAccuracy >= 90 && newAttempts >= 3,
          lastReviewed: new Date().toLocaleDateString('fr-FR')
        };
      }
      return v;
    });

    setVerses(updatedVerses);
    localStorage.setItem('memoryVerses', JSON.stringify(updatedVerses));

    setCurrentQuiz({
      ...currentQuiz,
      completed: true,
      score: accuracy
    });
  };

  const addNewVerse = () => {
    if (!newVerse.reference.trim() || !newVerse.text.trim()) return;

    const verse: MemoryVerse = {
      id: Math.max(...verses.map(v => v.id), 0) + 1,
      reference: newVerse.reference.trim(),
      text: newVerse.text.trim(),
      category: newVerse.category,
      difficulty: newVerse.difficulty,
      learned: false,
      accuracy: 0,
      attempts: 0,
      dateAdded: new Date().toLocaleDateString('fr-FR')
    };

    const updatedVerses = [...verses, verse];
    setVerses(updatedVerses);
    localStorage.setItem('memoryVerses', JSON.stringify(updatedVerses));

    setNewVerse({ reference: '', text: '', category: 'hope', difficulty: 'easy' });
    setShowAddForm(false);
  };

  const getHint = (text: string, revealed: number = 3): string => {
    const words = text.split(' ');
    return words.map((word, index) => {
      if (index < revealed) return word;
      return word.charAt(0) + '_'.repeat(word.length - 1);
    }).join(' ');
  };

  const filteredVerses = verses.filter(v => {
    const categoryMatch = selectedCategory === 'all' || v.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || v.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const categories = [...new Set(verses.map(v => v.category))];
  const learnedCount = verses.filter(v => v.learned).length;
  const averageAccuracy = verses.length > 0 
    ? Math.round(verses.reduce((sum, v) => sum + v.accuracy, 0) / verses.length)
    : 0;

  return (
    <div className={`min-h-screen ${contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'}`}>
      {/* Header */}
      <header className={`py-6 px-4 sm:px-6 lg:px-8 ${contrastHigh ? 'bg-contrast-bg border-b-2 border-contrast-text' : 'bg-white shadow-sm'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                contrastHigh ? 'hover:bg-contrast-text/20' : 'hover:bg-gray-100'
              }`}
            >
              <span className="text-2xl">←</span>
              <span className="font-medium">Retour</span>
            </Link>
            <h1 className={`text-2xl sm:text-3xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
              🧠 Mémorisation de Versets
            </h1>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className={`p-6 rounded-xl text-center ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-gradient-to-br from-green-100 to-emerald-100 shadow-lg'}`}>
            <div className="text-4xl mb-2">📖</div>
            <div className={`text-2xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-green-700'}`}>
              {verses.length}
            </div>
            <div className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-green-600'}`}>
              Versets Total
            </div>
          </div>
          
          <div className={`p-6 rounded-xl text-center ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-gradient-to-br from-blue-100 to-indigo-100 shadow-lg'}`}>
            <div className="text-4xl mb-2">✅</div>
            <div className={`text-2xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-blue-700'}`}>
              {learnedCount}
            </div>
            <div className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-blue-600'}`}>
              Versets Appris
            </div>
          </div>
          
          <div className={`p-6 rounded-xl text-center ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-gradient-to-br from-purple-100 to-pink-100 shadow-lg'}`}>
            <div className="text-4xl mb-2">🎯</div>
            <div className={`text-2xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-purple-700'}`}>
              {averageAccuracy}%
            </div>
            <div className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-purple-600'}`}>
              Précision Moyenne
            </div>
          </div>
        </div>

        {/* Quiz en cours */}
        {currentQuiz && (
          <div className={`mb-8 p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-gradient-to-br from-yellow-100 to-orange-100 shadow-lg'}`}>
            <h2 className={`text-2xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
              🎯 Quiz en Cours
            </h2>
            
            <div className={`p-4 rounded-lg mb-4 ${contrastHigh ? 'bg-contrast-text/10' : 'bg-white'}`}>
              <p className={`font-bold mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-orange-800'}`}>
                {currentQuiz.verse.reference}
              </p>
              {currentQuiz.showHints && (
                <p className={`text-sm mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
                  Indice: {getHint(currentQuiz.verse.text, 5)}
                </p>
              )}
            </div>

            {!currentQuiz.completed ? (
              <div className="space-y-4">
                <textarea
                  value={currentQuiz.userInput}
                  onChange={(e) => setCurrentQuiz({
                    ...currentQuiz,
                    userInput: e.target.value
                  })}
                  placeholder="Tapez le verset ici..."
                  className={`w-full p-4 rounded-lg border-2 min-h-32 ${
                    contrastHigh
                      ? 'bg-contrast-bg border-contrast-text/20 text-contrast-text'
                      : 'bg-white border-gray-300 focus:border-blue-500'
                  } focus:outline-none`}
                />
                
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={submitQuiz}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      contrastHigh
                        ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                        : 'bg-green-600 text-white hover:bg-green-700 shadow-lg'
                    }`}
                  >
                    ✅ Vérifier
                  </button>
                  
                  <button
                    onClick={() => setCurrentQuiz({
                      ...currentQuiz,
                      showHints: !currentQuiz.showHints
                    })}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      contrastHigh
                        ? 'bg-contrast-text/20 text-contrast-text hover:bg-contrast-text/30'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    💡 {currentQuiz.showHints ? 'Masquer' : 'Indices'}
                  </button>
                  
                  <button
                    onClick={() => setCurrentQuiz(null)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      contrastHigh
                        ? 'bg-contrast-text/20 text-contrast-text hover:bg-contrast-text/30'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    ❌ Annuler
                  </button>
                </div>
              </div>
            ) : (
              <div className={`p-4 rounded-lg ${contrastHigh ? 'bg-contrast-text/20' : 'bg-white'}`}>
                <h3 className={`text-xl font-bold mb-3 ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
                  Résultat: {currentQuiz.score}%
                </h3>
                
                <div className="mb-4">
                  <p className={`font-medium mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                    Texte original:
                  </p>
                  <p className={`mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                    {currentQuiz.verse.text}
                  </p>
                  
                  <p className={`font-medium mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                    Votre saisie:
                  </p>
                  <p className={`mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                    {currentQuiz.userInput}
                  </p>
                </div>

                <div className={`p-3 rounded ${
                  currentQuiz.score >= 90 
                    ? contrastHigh ? 'bg-contrast-text/30' : 'bg-green-100 text-green-800'
                    : currentQuiz.score >= 70
                    ? contrastHigh ? 'bg-contrast-text/20' : 'bg-yellow-100 text-yellow-800'
                    : contrastHigh ? 'bg-contrast-text/10' : 'bg-red-100 text-red-800'
                }`}>
                  <p className="font-medium">
                    {currentQuiz.score >= 90 ? '🎉 Excellent! Verset maîtrisé!' :
                     currentQuiz.score >= 70 ? '👍 Bien! Continuez à pratiquer.' :
                     '💪 Continuez vos efforts!'}
                  </p>
                </div>
                
                <button
                  onClick={() => setCurrentQuiz(null)}
                  className={`mt-4 px-6 py-2 rounded-lg font-medium transition-all ${
                    contrastHigh
                      ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Fermer
                </button>
              </div>
            )}
          </div>
        )}

        {/* Filtres */}
        <div className={`mb-8 p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'}`}>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <h2 className={`text-xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
              🎛️ Filtres
            </h2>
            <button
              onClick={() => setShowAddForm(true)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                contrastHigh
                  ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow'
              }`}
            >
              ➕ Ajouter un verset
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                Catégorie
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`w-full p-2 rounded-lg border ${
                  contrastHigh
                    ? 'bg-contrast-bg border-contrast-text/20 text-contrast-text'
                    : 'bg-white border-gray-300'
                } focus:outline-none focus:border-blue-500`}
              >
                <option value="all">Toutes les catégories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                Difficulté
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className={`w-full p-2 rounded-lg border ${
                  contrastHigh
                    ? 'bg-contrast-bg border-contrast-text/20 text-contrast-text'
                    : 'bg-white border-gray-300'
                } focus:outline-none focus:border-blue-500`}
              >
                <option value="all">Toutes les difficultés</option>
                <option value="easy">Facile</option>
                <option value="medium">Moyen</option>
                <option value="hard">Difficile</option>
              </select>
            </div>
          </div>
        </div>

        {/* Formulaire d'ajout */}
        {showAddForm && (
          <div className={`mb-8 p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'}`}>
            <h3 className={`text-xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
              ➕ Ajouter un Nouveau Verset
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                  Référence (ex: Jean 3:16)
                </label>
                <input
                  type="text"
                  value={newVerse.reference}
                  onChange={(e) => setNewVerse({...newVerse, reference: e.target.value})}
                  className={`w-full p-2 rounded-lg border ${
                    contrastHigh
                      ? 'bg-contrast-bg border-contrast-text/20 text-contrast-text'
                      : 'bg-white border-gray-300'
                  } focus:outline-none focus:border-blue-500`}
                  placeholder="Livre chapitre:verset"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                  Catégorie
                </label>
                <select
                  value={newVerse.category}
                  onChange={(e) => setNewVerse({...newVerse, category: e.target.value})}
                  className={`w-full p-2 rounded-lg border ${
                    contrastHigh
                      ? 'bg-contrast-bg border-contrast-text/20 text-contrast-text'
                      : 'bg-white border-gray-300'
                  } focus:outline-none focus:border-blue-500`}
                >
                  <option value="espérance">Espérance</option>
                  <option value="amour">Amour</option>
                  <option value="paix">Paix</option>
                  <option value="force">Force</option>
                  <option value="sagesse">Sagesse</option>
                  <option value="confiance">Confiance</option>
                  <option value="pardon">Pardon</option>
                  <option value="joie">Joie</option>
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                Difficulté
              </label>
              <div className="flex gap-4">
                {(['easy', 'medium', 'hard'] as const).map(diff => (
                  <label key={diff} className="flex items-center">
                    <input
                      type="radio"
                      value={diff}
                      checked={newVerse.difficulty === diff}
                      onChange={(e) => setNewVerse({...newVerse, difficulty: e.target.value as any})}
                      className="mr-2"
                    />
                    <span className={contrastHigh ? 'text-contrast-text' : 'text-gray-700'}>
                      {diff === 'easy' ? 'Facile' : diff === 'medium' ? 'Moyen' : 'Difficile'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                Texte du verset
              </label>
              <textarea
                value={newVerse.text}
                onChange={(e) => setNewVerse({...newVerse, text: e.target.value})}
                className={`w-full p-3 rounded-lg border min-h-24 ${
                  contrastHigh
                    ? 'bg-contrast-bg border-contrast-text/20 text-contrast-text'
                    : 'bg-white border-gray-300'
                } focus:outline-none focus:border-blue-500`}
                placeholder="Saisissez le texte complet du verset..."
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={addNewVerse}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  contrastHigh
                    ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                ✅ Ajouter
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  contrastHigh
                    ? 'bg-contrast-text/20 text-contrast-text hover:bg-contrast-text/30'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ❌ Annuler
              </button>
            </div>
          </div>
        )}

        {/* Liste des versets */}
        <div className={`p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'}`}>
          <h2 className={`text-xl font-bold mb-6 ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
            📚 Mes Versets à Mémoriser
          </h2>
          
          {filteredVerses.length === 0 ? (
            <p className={`text-center py-8 ${contrastHigh ? 'text-contrast-text' : 'text-gray-500'}`}>
              Aucun verset trouvé pour cette catégorie/difficulté.
            </p>
          ) : (
            <div className="grid gap-4">
              {filteredVerses.map(verse => (
                <div
                  key={verse.id}
                  className={`p-4 rounded-lg border ${
                    verse.learned
                      ? contrastHigh
                        ? 'bg-contrast-text/20 border-contrast-text/30'
                        : 'bg-green-50 border-green-200'
                      : contrastHigh
                      ? 'bg-contrast-text/10 border-contrast-text/20'
                      : 'bg-gray-50 border-gray-200'
                  } transition-all hover:shadow-md`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className={`text-lg font-bold ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
                          {verse.reference}
                        </h3>
                        {verse.learned && <span className="text-green-500 text-xl">✅</span>}
                      </div>
                      
                      <p className={`mb-3 leading-relaxed ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                        {verse.text}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className={`px-2 py-1 text-xs rounded ${contrastHigh ? 'bg-contrast-text/20' : 'bg-blue-100 text-blue-800'}`}>
                          {verse.category}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded ${
                          verse.difficulty === 'easy'
                            ? contrastHigh ? 'bg-contrast-text/20' : 'bg-green-100 text-green-800'
                            : verse.difficulty === 'medium'
                            ? contrastHigh ? 'bg-contrast-text/20' : 'bg-yellow-100 text-yellow-800'
                            : contrastHigh ? 'bg-contrast-text/20' : 'bg-red-100 text-red-800'
                        }`}>
                          {verse.difficulty === 'easy' ? 'Facile' : verse.difficulty === 'medium' ? 'Moyen' : 'Difficile'}
                        </span>
                        {verse.attempts > 0 && (
                          <span className={`px-2 py-1 text-xs rounded ${contrastHigh ? 'bg-contrast-text/20' : 'bg-purple-100 text-purple-800'}`}>
                            {verse.accuracy}% précision
                          </span>
                        )}
                      </div>
                      
                      {verse.lastReviewed && (
                        <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-500'}`}>
                          Dernière révision: {verse.lastReviewed}
                        </p>
                      )}
                    </div>
                    
                    <div className="ml-4">
                      <button
                        onClick={() => startQuiz(verse)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          contrastHigh
                            ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                            : 'bg-blue-600 text-white hover:bg-blue-700 shadow'
                        }`}
                      >
                        🎯 Quiz
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default VerseMemorizationPage;