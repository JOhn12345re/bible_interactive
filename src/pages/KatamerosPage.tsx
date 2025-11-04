import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';

interface Reading {
  title: string;
  reference: string;
  text: string;
}

interface KatamerosData {
  date: string;
  copticDate: string;
  readings: Reading[];
  feast?: string;
}

const KatamerosPage = () => {
  const { contrastHigh } = useSettings();
  const [katamerosData, setKatamerosData] = useState<KatamerosData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchKatamerosReadings(selectedDate);
  }, [selectedDate]);

  const fetchKatamerosReadings = async (date: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Formatter la date pour l'API (dd-mm-yyyy)
      const [year, month, day] = date.split('-');
      const formattedDate = `${day}-${month}-${year}`;
      
      // Appeler l'API Katameros (languageId=1 pour français)
      const response = await fetch(
        `https://api.katameros.app/readings/gregorian/${formattedDate}?languageId=1`
      );
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des lectures');
      }
      
      const data = await response.json();
      setKatamerosData(data);
    } catch (err) {
      setError('Impossible de charger les lectures du jour. Veuillez réessayer plus tard.');
      console.error('Erreur Katameros API:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
      {/* Header */}
      <header className={`py-6 px-4 sm:px-6 lg:px-8 ${contrastHigh ? 'bg-contrast-bg border-b-2 border-contrast-text' : 'bg-white shadow-sm'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                  contrastHigh ? 'hover:bg-contrast-text/20' : 'hover:bg-gray-100'
                }`}
              >
                <span className="text-2xl">←</span>
                <span className="font-medium">Retour</span>
              </Link>
            </div>
            <h1 className={`text-2xl sm:text-3xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
              📖 Ⲕⲁⲧⲁⲙⲉⲣⲟⲥ - Lectionnaire Copte
            </h1>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Introduction */}
        <div className={`mb-8 p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
            📚 Lectures Quotidiennes de l'Église Copte
          </h2>
          <p className={`text-lg leading-relaxed mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
            Le Katameros (Ⲕⲁⲧⲁⲙⲉⲣⲟⲥ) est le lectionnaire de l'Église Copte Orthodoxe qui contient 
            toutes les lectures bibliques pour chaque jour de l'année selon le calendrier liturgique copte.
          </p>
          <div className={`p-4 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-blue-50 border border-blue-200'}`}>
            <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-blue-800'}`}>
              ⚖️ <strong>Licence MIT</strong> - API open-source créée par Pierre Said
            </p>
            <p className={`text-sm mt-2 ${contrastHigh ? 'text-contrast-text' : 'text-blue-700'}`}>
              🔗 Source : <a 
                href="https://github.com/pierresaid/katameros-api" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:no-underline font-medium"
              >
                github.com/pierresaid/katameros-api
              </a>
            </p>
            <p className={`text-sm mt-2 ${contrastHigh ? 'text-contrast-text' : 'text-blue-700'}`}>
              🌐 Site web : <a 
                href="https://katameros.app/?lang=fr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:no-underline font-medium"
              >
                katameros.app
              </a>
            </p>
          </div>
        </div>

        {/* Sélecteur de date */}
        <div className={`mb-8 p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'}`}>
          <label className={`block text-lg font-bold mb-3 ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
            📅 Sélectionner une date :
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className={`w-full md:w-auto px-4 py-3 rounded-lg text-lg ${
              contrastHigh
                ? 'bg-contrast-text/10 text-contrast-text border-2 border-contrast-text'
                : 'border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
            }`}
          />
        </div>

        {/* Lectures du jour */}
        {loading && (
          <div className={`p-8 rounded-xl text-center ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'}`}>
            <div className="animate-spin text-6xl mb-4">⏳</div>
            <p className={`text-xl ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
              Chargement des lectures...
            </p>
          </div>
        )}

        {error && (
          <div className={`p-6 rounded-xl ${contrastHigh ? 'bg-contrast-text/10 border-2 border-contrast-text' : 'bg-red-50 border-2 border-red-300'}`}>
            <p className={`text-lg ${contrastHigh ? 'text-contrast-text' : 'text-red-800'}`}>
              ⚠️ {error}
            </p>
          </div>
        )}

        {!loading && !error && katamerosData && (
          <div className="space-y-6">
            {/* Information sur la date et la fête */}
            <div className={`p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-gradient-to-br from-purple-100 to-pink-100 border border-purple-300 shadow-lg'}`}>
              <div className="flex items-center space-x-4 mb-3">
                <span className="text-4xl">📅</span>
                <div>
                  <h3 className={`text-xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-purple-900'}`}>
                    {new Date(selectedDate).toLocaleDateString('fr-FR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h3>
                  {katamerosData.copticDate && (
                    <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-purple-700'}`}>
                      Date Copte : {katamerosData.copticDate}
                    </p>
                  )}
                </div>
              </div>
              {katamerosData.feast && (
                <div className={`mt-4 p-4 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-white/80'}`}>
                  <p className={`font-bold ${contrastHigh ? 'text-contrast-text' : 'text-purple-900'}`}>
                    🎉 Fête : {katamerosData.feast}
                  </p>
                </div>
              )}
            </div>

            {/* Lectures bibliques */}
            {katamerosData.readings && katamerosData.readings.length > 0 ? (
              katamerosData.readings.map((reading, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg hover:shadow-xl transition-shadow'}`}
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <span className="text-4xl flex-shrink-0">📜</span>
                    <div className="flex-1">
                      <h4 className={`text-xl font-bold mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
                        {reading.title || `Lecture ${index + 1}`}
                      </h4>
                      <p className={`text-lg font-medium ${contrastHigh ? 'text-contrast-text' : 'text-blue-600'}`}>
                        {reading.reference}
                      </p>
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-gray-50'}`}>
                    <p className={`text-lg leading-relaxed whitespace-pre-wrap ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                      {reading.text}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className={`p-6 rounded-xl text-center ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'}`}>
                <p className={`text-lg ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                  Aucune lecture disponible pour cette date.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Informations sur l'API */}
        <div className={`mt-8 p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'}`}>
          <h3 className={`text-xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
            ℹ️ À propos de l'API Katameros
          </h3>
          <div className="space-y-3">
            <p className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
              <strong>📖 Contenu :</strong> Lectures quotidiennes selon le calendrier liturgique copte
            </p>
            <p className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
              <strong>🌍 Langues disponibles :</strong> Français, Anglais, Arabe, Italien, Allemand, Polonais, Espagnol
            </p>
            <p className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
              <strong>📚 Versions bibliques :</strong> Louis Segond 1910, Bible de Jérusalem, et autres
            </p>
            <p className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
              <strong>🗓️ Calendriers :</strong> Grégorien et Copte
            </p>
          </div>
        </div>

        {/* Crédits */}
        <div className={`mt-8 p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200'}`}>
          <h3 className={`text-xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-orange-900'}`}>
            👨‍💻 Crédits et Remerciements
          </h3>
          <div className="space-y-3">
            <p className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
              <strong>Développeur :</strong> Pierre Said (<a 
                href="https://github.com/pierresaid" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                @pierresaid
              </a>)
            </p>
            <p className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
              <strong>Technologies :</strong> .NET Core API, SQLite, Entity Framework
            </p>
            <p className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
              <strong>Inspiration :</strong> Lectionnaire copte en ligne (st-takla.org)
            </p>
            <p className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
              <strong>Licence :</strong> MIT License (Libre et Open Source)
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <a
                href="https://github.com/pierresaid/katameros-api"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  contrastHigh
                    ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow'
                }`}
              >
                📂 Code Source (API)
              </a>
              <a
                href="https://github.com/pierresaid/katameros-web-app"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  contrastHigh
                    ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                    : 'bg-purple-600 text-white hover:bg-purple-700 shadow'
                }`}
              >
                🌐 Code Source (Web App)
              </a>
              <a
                href="https://katameros.app/?lang=fr"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  contrastHigh
                    ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                    : 'bg-green-600 text-white hover:bg-green-700 shadow'
                }`}
              >
                🚀 Application Complète
              </a>
            </div>
          </div>
        </div>

        {/* Note légale */}
        <div className={`mt-6 p-4 rounded-lg text-sm ${contrastHigh ? 'bg-contrast-text/10' : 'bg-gray-100 border border-gray-300'}`}>
          <p className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
            ⚖️ <strong>Note légale :</strong> L'API Katameros est un projet open-source sous licence MIT. 
            Nous utilisons cette API avec permission conformément aux termes de la licence, en maintenant 
            tous les crédits et mentions d'auteurs. Ce projet appartient à Pierre Said et ses contributeurs.
          </p>
        </div>
      </main>
    </div>
  );
};

export default KatamerosPage;
