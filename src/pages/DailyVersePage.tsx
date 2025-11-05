import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';

interface DailyVerse {
  date: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
  theme: string;
  reflection: string;
  reference: string;
}

const DailyVersePage = () => {
  const { contrastHigh } = useSettings();
  const [todaysVerse, setTodaysVerse] = useState<DailyVerse | null>(null);
  const [savedVerses, setSavedVerses] = useState<DailyVerse[]>([]);
  const [showReflection, setShowReflection] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [showThemeSelection, setShowThemeSelection] = useState(false);

  // Collection élargie de versets organisés par thèmes spirituels
  const inspirationalVerses: Omit<DailyVerse, 'date'>[] = [
    // AMOUR DE DIEU
    {
      book: "Jean", chapter: 3, verse: 16,
      text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.",
      theme: "Amour", reflection: "L'amour de Dieu n'a pas de limites. Il a donné ce qu'Il avait de plus précieux pour nous sauver. Cet amour inconditionnel nous appelle à aimer les autres de la même manière.", reference: "Jean 3:16"
    },
    {
      book: "1 Jean", chapter: 4, verse: 19,
      text: "Pour nous, nous l'aimons, parce qu'il nous a aimés le premier.",
      theme: "Amour", reflection: "Notre capacité à aimer découle directement de l'amour que Dieu nous a montré en premier. C'est en recevant Son amour que nous apprenons à aimer véritablement.", reference: "1 Jean 4:19"
    },
    {
      book: "Romains", chapter: 8, verse: 38,
      text: "Car j'ai l'assurance que ni la mort ni la vie, ni les anges ni les dominations, ni les choses présentes ni les choses à venir, ni les puissances, ni la hauteur, ni la profondeur, ni aucune autre créature ne pourra nous séparer de l'amour de Dieu manifesté en Jésus Christ notre Seigneur.",
      theme: "Amour", reflection: "L'amour de Dieu pour nous est inébranlable et éternel. Rien dans toute la création ne peut nous séparer de cet amour qui nous enveloppe constamment.", reference: "Romains 8:38-39"
    },

    // CONFIANCE ET FOI
    {
      book: "Psaumes", chapter: 23, verse: 1,
      text: "L'Éternel est mon berger: je ne manquerai de rien.",
      theme: "Confiance", reflection: "Comme un berger prend soin de ses brebis, Dieu prend soin de nous. Dans toutes les circonstances, nous pouvons faire confiance à Sa provision et à Sa protection.", reference: "Psaume 23:1"
    },
    {
      book: "Proverbes", chapter: 3, verse: 5,
      text: "Confie-toi en l'Éternel de tout ton cœur, Et ne t'appuie pas sur ta sagesse;",
      theme: "Confiance", reflection: "Notre sagesse humaine est limitée, mais la sagesse de Dieu est parfaite. Nous sommes appelés à Lui faire confiance entièrement, même quand nous ne comprenons pas.", reference: "Proverbes 3:5"
    },
    {
      book: "Psaumes", chapter: 56, verse: 3,
      text: "Quand je suis dans la crainte, En toi je me confie.",
      theme: "Confiance", reflection: "Dans les moments d'incertitude et de peur, nous avons un refuge sûr en Dieu. La confiance en Lui chasse nos craintes et nous donne la paix.", reference: "Psaume 56:3"
    },

    // FORCE ET COURAGE
    {
      book: "Philippiens", chapter: 4, verse: 13,
      text: "Je puis tout par celui qui me fortifie.",
      theme: "Force", reflection: "Notre force ne vient pas de nous-mêmes, mais du Christ qui vit en nous. Avec Lui, nous pouvons surmonter tous les obstacles et relever tous les défis.", reference: "Philippiens 4:13"
    },
    {
      book: "Esaïe", chapter: 41, verse: 10,
      text: "Ne crains rien, car je suis avec toi; Ne promène pas des regards inquiets, car je suis ton Dieu; Je te fortifie, je viens à ton secours, Je te soutiens de ma droite triomphante.",
      theme: "Courage", reflection: "La peur n'a pas sa place dans la vie du croyant. Dieu nous assure de Sa présence constante et de Son soutien indéfectible dans toutes nos épreuves.", reference: "Esaïe 41:10"
    },
    {
      book: "Josué", chapter: 1, verse: 9,
      text: "Ne t'ai-je pas donné cet ordre: Fortifie-toi et prends courage? Ne t'effraie point et ne t'épouvante point, car l'Éternel, ton Dieu, est avec toi dans tout ce que tu entreprendras.",
      theme: "Courage", reflection: "Dieu nous commande d'être courageux non pas par nos propres forces, mais parce qu'Il est toujours avec nous. Sa présence nous donne l'audace nécessaire pour affronter tous les défis.", reference: "Josué 1:9"
    },

    // ESPÉRANCE
    {
      book: "Jérémie", chapter: 29, verse: 11,
      text: "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance.",
      theme: "Espérance", reflection: "Dieu a un plan parfait pour chacune de nos vies. Même dans les moments difficiles, nous pouvons avoir confiance que Ses plans sont toujours bons et remplis d'espérance.", reference: "Jérémie 29:11"
    },
    {
      book: "Romains", chapter: 15, verse: 13,
      text: "Que le Dieu de l'espérance vous remplisse de toute joie et de toute paix dans la foi, pour que vous abondiez en espérance, par la puissance du Saint Esprit!",
      theme: "Espérance", reflection: "L'espérance chrétienne n'est pas un simple optimisme, mais une certitude ancrée en Dieu. Cette espérance remplit notre cœur de joie et de paix durables.", reference: "Romains 15:13"
    },
    {
      book: "Lamentations", chapter: 3, verse: 22,
      text: "Les bontés de l'Éternel ne sont pas épuisées, Ses compassions ne sont pas à leur terme; Elles se renouvellent chaque matin. Oh! que ta fidélité est grande!",
      theme: "Espérance", reflection: "Chaque nouveau jour est une manifestation de la fidélité et de la miséricorde de Dieu. Ses bontés se renouvellent constamment, nous donnant toujours des raisons d'espérer.", reference: "Lamentations 3:22-23"
    },

    // PAIX ET REPOS
    {
      book: "Matthieu", chapter: 11, verse: 28,
      text: "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.",
      theme: "Paix", reflection: "Jésus nous invite à venir à Lui avec tous nos fardeaux. Il ne nous juge pas, mais nous offre le repos et la paix que notre âme recherche.", reference: "Matthieu 11:28"
    },
    {
      book: "Jean", chapter: 14, verse: 27,
      text: "Je vous laisse la paix, je vous donne ma paix. Je ne vous donne pas comme le monde donne. Que votre cœur ne se trouble point, et ne s'alarme point.",
      theme: "Paix", reflection: "La paix que Jésus nous donne est différente de celle que le monde offre. C'est une paix profonde qui demeure même au milieu des tempêtes de la vie.", reference: "Jean 14:27"
    },
    {
      book: "Philippiens", chapter: 4, verse: 7,
      text: "Et la paix de Dieu, qui surpasse toute intelligence, gardera vos cœurs et vos pensées en Jésus Christ.",
      theme: "Paix", reflection: "La paix de Dieu dépasse notre compréhension humaine. Elle garde notre cœur et nos pensées, nous protégeant de l'anxiété et des soucis qui voudraient nous troubler.", reference: "Philippiens 4:7"
    },

    // RÉCONFORT ET CONSOLATION
    {
      book: "2 Corinthiens", chapter: 1, verse: 3,
      text: "Béni soit Dieu, le Père de notre Seigneur Jésus Christ, le Père des miséricordes et le Dieu de toute consolation,",
      theme: "Réconfort", reflection: "Dieu est la source de toute consolation. Dans nos moments de peine et de souffrance, Il nous offre Son réconfort paternel et Sa miséricorde infinie.", reference: "2 Corinthiens 1:3"
    },
    {
      book: "Psaumes", chapter: 34, verse: 18,
      text: "L'Éternel est près de ceux qui ont le cœur brisé, Et il sauve ceux qui ont l'esprit dans l'abattement.",
      theme: "Réconfort", reflection: "Dans nos moments les plus sombres, quand notre cœur est brisé, Dieu se rapproche de nous. Il ne nous abandonne jamais dans notre douleur.", reference: "Psaume 34:18"
    },
    {
      book: "Esaïe", chapter: 61, verse: 3,
      text: "Pour accorder aux affligés de Sion, Pour leur donner un diadème au lieu de la cendre, Une huile de joie au lieu du deuil, Un vêtement de louange au lieu d'un esprit abattu.",
      theme: "Réconfort", reflection: "Dieu transforme notre douleur en joie et notre deuil en louange. Il prend nos cendres et nous donne une couronne de beauté.", reference: "Esaïe 61:3"
    },

    // SAGESSE ET GUIDANCE
    {
      book: "Proverbes", chapter: 27, verse: 5,
      text: "Si quelqu'un d'entre vous manque de sagesse, qu'il la demande à Dieu, qui donne à tous simplement et sans reproche, et elle lui sera donnée.",
      theme: "Sagesse", reflection: "Dieu ne refuse jamais de nous donner Sa sagesse quand nous la Lui demandons sincèrement. Il nous guide avec générosité dans toutes nos décisions.", reference: "Jacques 1:5"
    },
    {
      book: "Psaumes", chapter: 32, verse: 8,
      text: "Je t'instruirai et te montrerai la voie que tu dois suivre; Je te conseillerai, j'aurai le regard sur toi.",
      theme: "Sagesse", reflection: "Dieu promet de nous instruire et de nous guider personnellement. Son regard bienveillant est constamment sur nous pour nous diriger dans le bon chemin.", reference: "Psaume 32:8"
    },

    // PARDON ET GRÂCE
    {
      book: "1 Jean", chapter: 1, verse: 9,
      text: "Si nous confessons nos péchés, il est fidèle et juste pour nous les pardonner, et pour nous purifier de toute iniquité.",
      theme: "Pardon", reflection: "Le pardon de Dieu est certain et complet quand nous confessons nos fautes avec sincérité. Il nous purifie entièrement et nous restaure dans Sa grâce.", reference: "1 Jean 1:9"
    },
    {
      book: "Éphésiens", chapter: 2, verse: 8,
      text: "Car c'est par la grâce que vous êtes sauvés, par le moyen de la foi. Et cela ne vient pas de vous, c'est le don de Dieu.",
      theme: "Grâce", reflection: "Notre salut est entièrement un cadeau de la grâce divine, non le résultat de nos efforts. Cette grâce gratuite nous humilie et nous remplit de reconnaissance.", reference: "Éphésiens 2:8"
    },

    // JOIE
    {
      book: "Psaumes", chapter: 16, verse: 11,
      text: "Tu me feras connaître le sentier de la vie; Il y a d'abondantes joies devant ta face, Des délices éternelles à ta droite.",
      theme: "Joie", reflection: "La vraie joie se trouve en présence de Dieu. C'est une joie abondante et éternelle qui transcende les circonstances temporaires de la vie.", reference: "Psaume 16:11"
    },
    {
      book: "Néhémie", chapter: 8, verse: 10,
      text: "La joie de l'Éternel sera votre force.",
      theme: "Joie", reflection: "La joie que Dieu nous donne n'est pas seulement un sentiment, mais une source de force spirituelle qui nous soutient dans toutes les épreuves.", reference: "Néhémie 8:10"
    },

    // PROTECTION DIVINE
    {
      book: "Psaumes", chapter: 91, verse: 4,
      text: "Il te couvrira de ses plumes, Et tu trouveras un refuge sous ses ailes; Sa fidélité est un bouclier et une cuirasse.",
      theme: "Protection", reflection: "Dieu nous protège comme une mère oiseau protège ses petits. Sa fidélité nous entoure comme une armure impénétrable contre les dangers spirituels et physiques.", reference: "Psaume 91:4"
    },
    {
      book: "Psaumes", chapter: 121, verse: 7,
      text: "L'Éternel te gardera de tout mal, Il gardera ton âme;",
      theme: "Protection", reflection: "La protection de Dieu s'étend à tous les aspects de notre être. Il veille sur notre âme et notre vie avec un soin constant et vigilant.", reference: "Psaume 121:7"
    }
  ];

  // Thèmes disponibles pour la navigation
  const availableThemes = [
    { key: 'all', label: 'Tous les thèmes', icon: '🌟' },
    { key: 'Amour', label: 'Amour de Dieu', icon: '❤️' },
    { key: 'Confiance', label: 'Confiance & Foi', icon: '🙏' },
    { key: 'Force', label: 'Force & Courage', icon: '💪' },
    { key: 'Espérance', label: 'Espérance', icon: '🌅' },
    { key: 'Paix', label: 'Paix & Repos', icon: '🕊️' },
    { key: 'Réconfort', label: 'Réconfort', icon: '🤗' },
    { key: 'Sagesse', label: 'Sagesse & Guidance', icon: '🧭' },
    { key: 'Pardon', label: 'Pardon & Grâce', icon: '💝' },
    { key: 'Joie', label: 'Joie', icon: '😊' },
    { key: 'Protection', label: 'Protection Divine', icon: '🛡️' }
  ];

  useEffect(() => {
    // Charger les versets sauvegardés
    const saved = localStorage.getItem('savedVerses');
    if (saved) {
      setSavedVerses(JSON.parse(saved));
    }

    // Sélectionner le verset du jour basé sur la date ou le thème choisi
    selectVerseForDisplay();
  }, [selectedTheme]);

  const selectVerseForDisplay = () => {
    const today = new Date();
    let versesToChooseFrom = inspirationalVerses;

    // Filtrer par thème si un thème spécifique est sélectionné
    if (selectedTheme !== 'all') {
      versesToChooseFrom = inspirationalVerses.filter(v => v.theme === selectedTheme);
    }

    if (versesToChooseFrom.length === 0) {
      versesToChooseFrom = inspirationalVerses; // Fallback
    }

    // Sélection basée sur la date pour garantir la cohérence quotidienne
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 1).getTime()) / (1000 * 60 * 60 * 24));
    const verseIndex = dayOfYear % versesToChooseFrom.length;
    const selectedVerse = versesToChooseFrom[verseIndex];

    setTodaysVerse({
      ...selectedVerse,
      date: today.toLocaleDateString('fr-FR')
    });
  };

  const changeTheme = (newTheme: string) => {
    setSelectedTheme(newTheme);
  };

  const saveVerse = (verse: DailyVerse) => {
    const updatedSaved = [...savedVerses];
    const existingIndex = updatedSaved.findIndex(v => 
      v.book === verse.book && v.chapter === verse.chapter && v.verse === verse.verse
    );

    if (existingIndex === -1) {
      updatedSaved.push(verse);
      setSavedVerses(updatedSaved);
      localStorage.setItem('savedVerses', JSON.stringify(updatedSaved));
    }
  };

  const removeSavedVerse = (verse: DailyVerse) => {
    const updatedSaved = savedVerses.filter(v => 
      !(v.book === verse.book && v.chapter === verse.chapter && v.verse === verse.verse)
    );
    setSavedVerses(updatedSaved);
    localStorage.setItem('savedVerses', JSON.stringify(updatedSaved));
  };

  const shareVerse = async (verse: DailyVerse) => {
    const text = `"${verse.text}" - ${verse.reference}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Verset du Jour',
          text: text,
          url: window.location.href
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(text);
        alert('Verset copié dans le presse-papier !');
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(text);
      alert('Verset copié dans le presse-papier !');
    }
  };

  const isVerseSaved = (verse: DailyVerse) => {
    return savedVerses.some(v => 
      v.book === verse.book && v.chapter === verse.chapter && v.verse === verse.verse
    );
  };

  return (
    <div className={`min-h-screen ${contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
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
              ⭐ Verset du Jour
            </h1>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Verset du jour */}
        {todaysVerse && (
          <div className={`mb-8 p-8 rounded-2xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-gradient-to-br from-yellow-100 to-orange-100 shadow-xl'}`}>
            <div className="text-center">
              <div className={`mb-6 text-6xl ${contrastHigh ? 'text-contrast-text' : 'text-orange-600'}`}>
                📜
              </div>
              
              <h2 className={`text-sm font-medium mb-2 uppercase tracking-wide ${contrastHigh ? 'text-contrast-text' : 'text-orange-700'}`}>
                {todaysVerse.date} • {todaysVerse.theme} 
                {selectedTheme !== 'all' && (
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${contrastHigh ? 'bg-contrast-text/20' : 'bg-orange-200'}`}>
                    Thème: {availableThemes.find(t => t.key === selectedTheme)?.label}
                  </span>
                )}
              </h2>
              
              <blockquote className={`text-xl sm:text-2xl leading-relaxed mb-6 font-medium ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                "{todaysVerse.text}"
              </blockquote>
              
              <p className={`text-lg font-semibold mb-8 ${contrastHigh ? 'text-contrast-text' : 'text-orange-800'}`}>
                - {todaysVerse.reference}
              </p>

              {/* Actions */}
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <button
                  onClick={() => setShowReflection(!showReflection)}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    contrastHigh
                      ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  💭 {showReflection ? 'Masquer' : 'Réflexion'}
                </button>
                
                <button
                  onClick={() => shareVerse(todaysVerse)}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    contrastHigh
                      ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                      : 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  📤 Partager
                </button>
                
                <button
                  onClick={() => 
                    isVerseSaved(todaysVerse) 
                      ? removeSavedVerse(todaysVerse)
                      : saveVerse(todaysVerse)
                  }
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    isVerseSaved(todaysVerse)
                      ? contrastHigh
                        ? 'bg-contrast-text/20 text-contrast-text hover:bg-contrast-text/30'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                      : contrastHigh
                      ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                      : 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isVerseSaved(todaysVerse) ? '❤️ Sauvegardé' : '🤍 Sauvegarder'}
                </button>
                
                <Link
                  to={`/bible?book=${encodeURIComponent(todaysVerse.book)}&chapter=${todaysVerse.chapter}&verse=${todaysVerse.verse}`}
                  className={`px-6 py-3 rounded-full font-medium transition-all inline-block ${
                    contrastHigh
                      ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                      : 'bg-orange-600 text-white hover:bg-orange-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  📖 Lire le contexte
                </Link>
              </div>

              {/* Réflexion */}
              {showReflection && (
                <div className={`p-6 rounded-xl text-left ${contrastHigh ? 'bg-contrast-text/10' : 'bg-white/80 shadow-inner'}`}>
                  <h3 className={`text-lg font-bold mb-3 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                    💭 Réflexion du Jour
                  </h3>
                  <p className={`text-base leading-relaxed ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                    {todaysVerse.reflection}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Sélection par thème */}
        <div className={`mb-8 p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-gradient-to-br from-indigo-100 to-purple-100 shadow-lg'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
            🎨 Explorer par Thème Spirituel
          </h2>
          <p className={`mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
            Découvrez des versets inspirants organisés par thèmes spirituels. Chaque thème offre une méditation profonde sur un aspect de la foi.
          </p>
          
          {/* Boutons de thèmes */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {availableThemes.map((theme) => (
              <button
                key={theme.key}
                onClick={() => changeTheme(theme.key)}
                className={`p-3 rounded-lg text-left transition-all hover:scale-105 ${
                  selectedTheme === theme.key
                    ? contrastHigh
                      ? 'bg-contrast-text text-contrast-bg shadow-lg'
                      : 'bg-white shadow-lg ring-2 ring-purple-500 text-purple-700'
                    : contrastHigh
                    ? 'bg-contrast-text/20 text-contrast-text hover:bg-contrast-text/30'
                    : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'
                }`}
              >
                <div className="text-2xl mb-1">{theme.icon}</div>
                <div className={`text-sm font-medium ${
                  selectedTheme === theme.key ? 'font-bold' : ''
                }`}>
                  {theme.label}
                </div>
                {selectedTheme === theme.key && (
                  <div className={`text-xs mt-1 ${
                    contrastHigh ? 'text-contrast-bg/80' : 'text-purple-600'
                  }`}>
                    Sélectionné
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Compteur de versets par thème */}
          {selectedTheme !== 'all' && (
            <div className={`mt-4 p-3 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-white/60'}`}>
              <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
                📊 {inspirationalVerses.filter(v => v.theme === selectedTheme).length} verset(s) disponible(s) 
                sur le thème <span className="font-bold">"{availableThemes.find(t => t.key === selectedTheme)?.label}"</span>
              </p>
            </div>
          )}
        </div>

        {/* Navigation et statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className={`p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'}`}>
            <h3 className={`text-xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
              📊 Vos Statistiques
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className={contrastHigh ? 'text-contrast-text' : 'text-gray-600'}>Versets sauvegardés</span>
                <span className={`font-bold ${contrastHigh ? 'text-contrast-text' : 'text-blue-600'}`}>
                  {savedVerses.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={contrastHigh ? 'text-contrast-text' : 'text-gray-600'}>Thèmes explorés</span>
                <span className={`font-bold ${contrastHigh ? 'text-contrast-text' : 'text-purple-600'}`}>
                  {new Set(savedVerses.map(v => v.theme)).size} / {availableThemes.length - 1}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={contrastHigh ? 'text-contrast-text' : 'text-gray-600'}>Collection totale</span>
                <span className={`font-bold ${contrastHigh ? 'text-contrast-text' : 'text-green-600'}`}>
                  {inspirationalVerses.length} versets
                </span>
              </div>
            </div>
          </div>          <div className={`p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'}`}>
            <h3 className={`text-xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
              🎯 Actions Rapides
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => {
                  // Sélection aléatoire dans le thème actuel
                  const versesToChooseFrom = selectedTheme === 'all' 
                    ? inspirationalVerses 
                    : inspirationalVerses.filter(v => v.theme === selectedTheme);
                  
                  if (versesToChooseFrom.length > 0) {
                    const randomIndex = Math.floor(Math.random() * versesToChooseFrom.length);
                    const randomVerse = versesToChooseFrom[randomIndex];
                    setTodaysVerse({
                      ...randomVerse,
                      date: new Date().toLocaleDateString('fr-FR')
                    });
                  }
                }}
                className={`w-full px-4 py-2 rounded-lg font-medium transition-all ${
                  contrastHigh
                    ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
              >
                🎲 Verset aléatoire {selectedTheme !== 'all' ? `(${availableThemes.find(t => t.key === selectedTheme)?.label})` : ''}
              </button>
              
              <button
                onClick={() => setShowHistory(!showHistory)}
                className={`w-full px-4 py-2 rounded-lg font-medium transition-all ${
                  contrastHigh
                    ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                📚 Mes versets sauvés ({savedVerses.length})
              </button>
              
              <Link
                to="/bible"
                className={`block w-full px-4 py-2 rounded-lg font-medium text-center transition-all ${
                  contrastHigh
                    ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                📖 Explorer la Bible
              </Link>

              <Link
                to="/verse-memorization"
                className={`block w-full px-4 py-2 rounded-lg font-medium text-center transition-all ${
                  contrastHigh
                    ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                🧠 Mémoriser des versets
              </Link>
            </div>
          </div>
        </div>

        {/* Versets sauvegardés */}
        {showHistory && savedVerses.length > 0 && (
          <div className={`p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'}`}>
            <h3 className={`text-xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
              📚 Vos Versets Sauvegardés
            </h3>
            <div className="space-y-4">
              {savedVerses.map((verse, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${contrastHigh ? 'bg-contrast-text/10 border-contrast-text/20' : 'bg-gray-50 border-gray-200'}`}
                >
                  <p className={`text-sm mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
                    {verse.reference} • {verse.theme}
                  </p>
                  <blockquote className={`text-base mb-3 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                    "{verse.text}"
                  </blockquote>
                  <div className="flex gap-2">
                    <button
                      onClick={() => shareVerse(verse)}
                      className={`px-3 py-1 text-sm rounded font-medium ${
                        contrastHigh
                          ? 'bg-contrast-text text-contrast-bg'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      📤 Partager
                    </button>
                    <button
                      onClick={() => removeSavedVerse(verse)}
                      className={`px-3 py-1 text-sm rounded font-medium ${
                        contrastHigh
                          ? 'bg-contrast-text/20 text-contrast-text'
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                    >
                      🗑️ Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Encouragement */}
        <div className={`mt-8 p-6 rounded-xl text-center ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-gradient-to-r from-blue-100 to-purple-100 shadow-lg'}`}>
          <div className="text-4xl mb-3">🌅</div>
          <h3 className={`text-xl font-bold mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
            Commencez Chaque Jour avec la Parole
          </h3>
          <p className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
            "Ta parole est une lampe à mes pieds, et une lumière sur mon sentier." - Psaume 119:105
          </p>
        </div>
      </main>
    </div>
  );
};

export default DailyVersePage;