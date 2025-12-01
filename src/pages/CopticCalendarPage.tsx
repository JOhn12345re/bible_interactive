import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';

interface CopticMonth {
  id: number;
  copticName: string;
  arabicName: string;
  meaning: string;
  gregorianDates: string;
  season: string;
  description: string;
  emoji: string;
  colorClass: string;
  festivals?: string[];
}

const CopticCalendarPage: React.FC = () => {
  const { contrastHigh } = useSettings();
  const [selectedMonth, setSelectedMonth] = useState<CopticMonth | null>(null);

  const months: CopticMonth[] = [
    {
      id: 1,
      copticName: 'Tout (Thout)',
      arabicName: 'توت',
      meaning: 'Dieu Thot - dieu égyptien de la sagesse et de l\'écriture',
      gregorianDates: '11 septembre - 10 octobre',
      season: 'Akhet (Inondation)',
      description: 'Premier mois de l\'année copte. Nommé d\'après Thot, le dieu égyptien de la sagesse. C\'est le début de l\'année copte (Nayrouz) célébré le 1er Tout.',
      emoji: '🎉',
      colorClass: 'bg-gradient-to-br from-red-500 to-orange-600',
      festivals: ['Nayrouz (Nouvel An copte)', 'Fête des Martyrs']
    },
    {
      id: 2,
      copticName: 'Baba (Paopi)',
      arabicName: 'بابه',
      meaning: 'Dieu Apis - le taureau sacré de Memphis',
      gregorianDates: '11 octobre - 9 novembre',
      season: 'Akhet (Inondation)',
      description: 'Mois de la récolte du coton. Nommé d\'après le dieu Apis, représenté sous forme de taureau sacré.',
      emoji: '🐂',
      colorClass: 'bg-gradient-to-br from-amber-500 to-yellow-600',
      festivals: []
    },
    {
      id: 3,
      copticName: 'Hatour (Athyr)',
      arabicName: 'هاتور',
      meaning: 'Déesse Hathor - déesse de l\'amour et de la joie',
      gregorianDates: '10 novembre - 9 décembre',
      season: 'Akhet (Inondation)',
      description: 'Mois des semailles. Nommé d\'après Hathor, déesse de l\'amour, de la beauté et de la joie. C\'est pendant ce mois que Saint Mina fut martyrisé (15 Hatour).',
      emoji: '💝',
      colorClass: 'bg-gradient-to-br from-pink-500 to-rose-600',
      festivals: ['Martyre de Saint Mina (15 Hatour)']
    },
    {
      id: 4,
      copticName: 'Kiahk (Koiak)',
      arabicName: 'كيهك',
      meaning: 'Consacré à l\'esprit du dieu Ka',
      gregorianDates: '10 décembre - 8 janvier',
      season: 'Peret (Croissance)',
      description: 'Mois de préparation à Noël. Les nuits sont longues et les veillées de louange (Tasbeha) sont pratiquées. C\'est le mois des hymnes à la Vierge Marie.',
      emoji: '🌙',
      colorClass: 'bg-gradient-to-br from-indigo-500 to-purple-600',
      festivals: ['Préparation de Noël', 'Veillées de Tasbeha']
    },
    {
      id: 5,
      copticName: 'Touba (Tybi)',
      arabicName: 'طوبه',
      meaning: 'Dieu Tobi - dieu des cavernes et du repos',
      gregorianDates: '9 janvier - 7 février',
      season: 'Peret (Croissance)',
      description: 'Mois le plus froid de l\'année. Noël copte est célébré le 29 Kiahk / 7 janvier. La fête de l\'Épiphanie (baptême du Christ) est le 11 Touba.',
      emoji: '❄️',
      colorClass: 'bg-gradient-to-br from-blue-400 to-cyan-600',
      festivals: ['Noël copte (29 Kiahk)', 'Épiphanie (11 Touba)']
    },
    {
      id: 6,
      copticName: 'Amshir (Mechir)',
      arabicName: 'أمشير',
      meaning: 'Dieu des tempêtes et du vent',
      gregorianDates: '8 février - 9 mars',
      season: 'Peret (Croissance)',
      description: 'Mois des vents violents et des tempêtes. Proverbe copte: "Amshir, père des orages et des tempêtes."',
      emoji: '💨',
      colorClass: 'bg-gradient-to-br from-gray-500 to-slate-600',
      festivals: []
    },
    {
      id: 7,
      copticName: 'Baramhat (Phamenoth)',
      arabicName: 'برمهات',
      meaning: 'Dieu des chaleurs et du soleil',
      gregorianDates: '10 mars - 8 avril',
      season: 'Peret (Croissance)',
      description: 'Le printemps commence. C\'est souvent le mois du Grand Carême et de la préparation à Pâques.',
      emoji: '🌸',
      colorClass: 'bg-gradient-to-br from-green-400 to-emerald-600',
      festivals: ['Grand Carême (variable)']
    },
    {
      id: 8,
      copticName: 'Baramoudah (Pharmuthi)',
      arabicName: 'برمودة',
      meaning: 'Dieu Renenutet - déesse des moissons',
      gregorianDates: '9 avril - 8 mai',
      season: 'Shemu (Récolte)',
      description: 'Mois de la moisson du blé. Pâques copte est généralement célébré durant ce mois.',
      emoji: '🌾',
      colorClass: 'bg-gradient-to-br from-yellow-400 to-amber-600',
      festivals: ['Pâques copte (variable)', 'Semaine Sainte']
    },
    {
      id: 9,
      copticName: 'Bashans (Pachon)',
      arabicName: 'بشنس',
      meaning: 'Dieu Khonsou - dieu de la lune',
      gregorianDates: '9 mai - 7 juin',
      season: 'Shemu (Récolte)',
      description: 'Mois de la récolte des fruits. L\'Ascension du Christ est souvent célébrée ce mois.',
      emoji: '🌕',
      colorClass: 'bg-gradient-to-br from-purple-400 to-violet-600',
      festivals: ['Ascension (variable)', 'Pentecôte (variable)']
    },
    {
      id: 10,
      copticName: 'Paoni (Payni)',
      arabicName: 'بؤونة',
      meaning: 'Dieu de la vallée et des métaux',
      gregorianDates: '8 juin - 7 juillet',
      season: 'Shemu (Récolte)',
      description: 'Mois chaud du début de l\'été. La fête des Apôtres Pierre et Paul est célébrée le 5 Paoni.',
      emoji: '☀️',
      colorClass: 'bg-gradient-to-br from-orange-400 to-red-600',
      festivals: ['Fête des Apôtres Pierre et Paul']
    },
    {
      id: 11,
      copticName: 'Épip (Epiphi)',
      arabicName: 'أبيب',
      meaning: 'Dieu Apepi - serpent géant de la mythologie',
      gregorianDates: '8 juillet - 6 août',
      season: 'Shemu (Récolte)',
      description: 'Mois le plus chaud. Le jeûne des Apôtres se termine ce mois. La fête de la Transfiguration est le 13 Épip.',
      emoji: '🔥',
      colorClass: 'bg-gradient-to-br from-red-400 to-orange-600',
      festivals: ['Transfiguration (13 Épip)']
    },
    {
      id: 12,
      copticName: 'Mesra (Mesori)',
      arabicName: 'مسرى',
      meaning: 'Naissance du soleil - Rê',
      gregorianDates: '7 août - 5 septembre',
      season: 'Shemu (Récolte)',
      description: 'Dernier mois complet de l\'année. Le jeûne de la Vierge Marie commence le 1er Mesra et se termine par la fête de l\'Assomption le 16 Mesra.',
      emoji: '🌅',
      colorClass: 'bg-gradient-to-br from-amber-400 to-orange-600',
      festivals: ['Jeûne de la Vierge', 'Assomption (16 Mesra)']
    },
    {
      id: 13,
      copticName: 'Nasie (Épagomènes)',
      arabicName: 'نسيء',
      meaning: 'Les petits jours - jours intercalaires',
      gregorianDates: '6 septembre - 10 septembre',
      season: 'Jours supplémentaires',
      description: 'Les 5 ou 6 jours intercalaires ajoutés pour compléter l\'année solaire (6 jours les années bissextiles). Ce sont des jours de jeûne et de prière intense.',
      emoji: '✨',
      colorClass: 'bg-gradient-to-br from-violet-500 to-purple-700',
      festivals: ['Jours de jeûne spéciaux']
    }
  ];

  return (
    <div
      className={`min-h-screen ${
        contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-green-50 via-white to-teal-50'
      }`}
    >
      {/* Header */}
      <header
        className={`py-4 sm:py-6 px-3 sm:px-6 lg:px-8 ${
          contrastHigh ? 'bg-contrast-bg border-b border-contrast-text' : 'bg-white shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/coptic-church"
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full transition-colors text-sm sm:text-base ${
                contrastHigh
                  ? 'hover:bg-contrast-text/20'
                  : 'hover:bg-gray-100'
              }`}
            >
              <span className="text-lg sm:text-2xl">←</span>
              <span>Retour</span>
            </Link>
          </div>
          
          <div className="text-center">
            <h1
              className={`text-2xl sm:text-4xl font-bold mb-2 ${
                contrastHigh ? 'text-contrast-text' : 'text-gray-800'
              }`}
            >
              📆 Le Calendrier Copte
            </h1>
            <p
              className={`text-sm sm:text-lg max-w-3xl mx-auto ${
                contrastHigh ? 'text-contrast-text' : 'text-gray-600'
              }`}
            >
              Découvrez les 13 mois du calendrier copte, héritier du calendrier de l'Égypte ancienne
            </p>
          </div>
        </div>
      </header>

      {/* Introduction */}
      <section className="max-w-7xl mx-auto py-6 px-3 sm:px-6 lg:px-8">
        <div className={`rounded-2xl p-4 sm:p-6 mb-6 ${
          contrastHigh ? 'bg-contrast-bg border border-contrast-text' : 'bg-white shadow-lg'
        }`}>
          <h2 className={`text-xl sm:text-2xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
            🏛️ Introduction au Calendrier Copte
          </h2>
          <div className={`space-y-3 text-sm sm:text-base ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
            <p>
              Le <strong>calendrier copte</strong> est l'un des plus anciens calendriers au monde, 
              directement hérité du calendrier de l'Égypte ancienne. Il fut réformé sous Auguste 
              en 25 av. J.-C. pour s'aligner sur le calendrier julien.
            </p>
            <p>
              L'année copte commence le <strong>1er Tout</strong> (11 septembre dans le calendrier grégorien, 
              ou le 12 septembre les années bissextiles). L'ère copte, appelée "Ère des Martyrs" (Anno Martyrum), 
              commence en 284 apr. J.-C., date de l'avènement de l'empereur Dioclétien et de ses persécutions.
            </p>
            <p>
              Le calendrier comprend <strong>12 mois de 30 jours</strong> chacun, plus un petit mois 
              de <strong>5 ou 6 jours</strong> (Nasie) pour compléter l'année solaire.
            </p>
          </div>
          
          {/* Saisons */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className={`p-4 rounded-xl ${contrastHigh ? 'border border-contrast-text' : 'bg-blue-50'}`}>
              <h3 className="font-bold text-lg mb-2">🌊 Akhet (Inondation)</h3>
              <p className="text-sm">Mois 1-4 : Période de la crue du Nil</p>
            </div>
            <div className={`p-4 rounded-xl ${contrastHigh ? 'border border-contrast-text' : 'bg-green-50'}`}>
              <h3 className="font-bold text-lg mb-2">🌱 Peret (Croissance)</h3>
              <p className="text-sm">Mois 5-8 : Période des semailles et de la croissance</p>
            </div>
            <div className={`p-4 rounded-xl ${contrastHigh ? 'border border-contrast-text' : 'bg-amber-50'}`}>
              <h3 className="font-bold text-lg mb-2">🌾 Shemu (Récolte)</h3>
              <p className="text-sm">Mois 9-12 : Période des récoltes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Grille des mois */}
      <main className="max-w-7xl mx-auto pb-8 px-3 sm:px-6 lg:px-8">
        <h2 className={`text-xl sm:text-2xl font-bold mb-6 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
          📅 Les 13 Mois de l'Année Copte
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {months.map((month) => (
            <div
              key={month.id}
              onClick={() => setSelectedMonth(selectedMonth?.id === month.id ? null : month)}
              className={`cursor-pointer group ${
                contrastHigh 
                  ? 'bg-contrast-bg border border-contrast-text hover:bg-contrast-text/10' 
                  : `${month.colorClass} hover:shadow-2xl`
              } rounded-2xl p-4 sm:p-5 text-white transition-all duration-300 transform hover:scale-105 relative overflow-hidden`}
            >
              {/* Numéro du mois */}
              <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                {month.id}
              </div>

              {/* Contenu */}
              <div className="relative z-10">
                <div className="text-3xl sm:text-4xl mb-2">
                  {month.emoji}
                </div>

                <h3 className="text-lg sm:text-xl font-bold mb-1">
                  {month.copticName}
                </h3>
                
                <p className="text-sm opacity-90 mb-2">
                  {month.arabicName}
                </p>

                <p className="text-xs opacity-80">
                  {month.gregorianDates}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal de détails */}
      {selectedMonth && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMonth(null)}
        >
          <div 
            className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-6 ${
              contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-4xl">{selectedMonth.emoji}</span>
                <div>
                  <h2 className={`text-2xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                    {selectedMonth.copticName}
                  </h2>
                  <p className={`text-lg ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
                    {selectedMonth.arabicName}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedMonth(null)}
                className={`text-2xl p-2 rounded-full hover:bg-gray-100 ${contrastHigh ? 'text-contrast-text' : 'text-gray-500'}`}
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className={`p-4 rounded-xl ${contrastHigh ? 'border border-contrast-text' : 'bg-gray-50'}`}>
                <h3 className="font-bold mb-2">📖 Signification</h3>
                <p className={contrastHigh ? 'text-contrast-text' : 'text-gray-700'}>{selectedMonth.meaning}</p>
              </div>

              <div className={`p-4 rounded-xl ${contrastHigh ? 'border border-contrast-text' : 'bg-blue-50'}`}>
                <h3 className="font-bold mb-2">📅 Dates grégoriennes</h3>
                <p className={contrastHigh ? 'text-contrast-text' : 'text-gray-700'}>{selectedMonth.gregorianDates}</p>
              </div>

              <div className={`p-4 rounded-xl ${contrastHigh ? 'border border-contrast-text' : 'bg-green-50'}`}>
                <h3 className="font-bold mb-2">🌿 Saison</h3>
                <p className={contrastHigh ? 'text-contrast-text' : 'text-gray-700'}>{selectedMonth.season}</p>
              </div>

              <div className={`p-4 rounded-xl ${contrastHigh ? 'border border-contrast-text' : 'bg-amber-50'}`}>
                <h3 className="font-bold mb-2">📜 Description</h3>
                <p className={contrastHigh ? 'text-contrast-text' : 'text-gray-700'}>{selectedMonth.description}</p>
              </div>

              {selectedMonth.festivals && selectedMonth.festivals.length > 0 && (
                <div className={`p-4 rounded-xl ${contrastHigh ? 'border border-contrast-text' : 'bg-purple-50'}`}>
                  <h3 className="font-bold mb-2">🎊 Fêtes importantes</h3>
                  <ul className="space-y-1">
                    {selectedMonth.festivals.map((festival, idx) => (
                      <li key={idx} className={`flex items-center ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                        <span className="mr-2">•</span>
                        {festival}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CopticCalendarPage;
