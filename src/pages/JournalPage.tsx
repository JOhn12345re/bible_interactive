import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  emoji: string;
  created: number;
}

const JournalPage = () => {
  const { contrastHigh } = useSettings();
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    content: '',
    emoji: '📝',
  });

  // Emojis disponibles pour les entrées
  const availableEmojis = [
    '📝',
    '💭',
    '🙏',
    '📖',
    '✨',
    '💖',
    '🌟',
    '🎯',
    '🔥',
    '💡',
    '🌈',
    '🕊️',
  ];

  // Charger les entrées depuis localStorage au démarrage
  useEffect(() => {
    const savedEntries = localStorage.getItem('journal-entries');
    if (savedEntries) {
      try {
        const parsed = JSON.parse(savedEntries);
        setEntries(parsed);
      } catch (error) {
        console.error('Erreur lors du chargement des entrées:', error);
      }
    } else {
      // Entrées d'exemple si aucune sauvegarde
      const defaultEntries: JournalEntry[] = [
        {
          id: '1',
          date: new Date().toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }),
          title: 'Première découverte',
          content:
            "Aujourd'hui j'ai commencé à explorer Bible Interactive. L'histoire de Jonas m'a beaucoup plu !",
          emoji: '🐋',
          created: Date.now() - 86400000,
        },
        {
          id: '2',
          date: new Date(Date.now() - 86400000).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }),
          title: 'Verset du jour',
          content:
            'J\'ai noté ce beau verset : "Car Dieu a tant aimé le monde..." - Jean 3:16',
          emoji: '💖',
          created: Date.now() - 172800000,
        },
      ];
      setEntries(defaultEntries);
      localStorage.setItem('journal-entries', JSON.stringify(defaultEntries));
    }
  }, []);

  // Sauvegarder les entrées dans localStorage
  const saveEntries = (newEntries: JournalEntry[]) => {
    setEntries(newEntries);
    localStorage.setItem('journal-entries', JSON.stringify(newEntries));
  };

  // Créer une nouvelle entrée
  const createEntry = () => {
    if (!editForm.title.trim() || !editForm.content.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      title: editForm.title.trim(),
      content: editForm.content.trim(),
      emoji: editForm.emoji,
      created: Date.now(),
    };

    const newEntries = [newEntry, ...entries];
    saveEntries(newEntries);
    setSelectedEntry(newEntry.id);
    setIsCreating(false);
    setEditForm({ title: '', content: '', emoji: '📝' });
  };

  // Modifier une entrée existante
  const updateEntry = () => {
    if (!selectedEntry || !editForm.title.trim() || !editForm.content.trim())
      return;

    const newEntries = entries.map((entry) =>
      entry.id === selectedEntry
        ? {
            ...entry,
            title: editForm.title.trim(),
            content: editForm.content.trim(),
            emoji: editForm.emoji,
          }
        : entry
    );
    saveEntries(newEntries);
    setIsEditing(false);
    setEditForm({ title: '', content: '', emoji: '📝' });
  };

  // Supprimer une entrée
  const deleteEntry = (entryId: string) => {
    if (confirm('Es-tu sûr de vouloir supprimer cette entrée ?')) {
      const newEntries = entries.filter((entry) => entry.id !== entryId);
      saveEntries(newEntries);
      if (selectedEntry === entryId) {
        setSelectedEntry(null);
      }
    }
  };

  // Commencer à créer une nouvelle entrée
  const startCreating = () => {
    setIsCreating(true);
    setIsEditing(false);
    setSelectedEntry(null);
    setEditForm({ title: '', content: '', emoji: '📝' });
  };

  // Commencer à modifier une entrée
  const startEditing = (entry: JournalEntry) => {
    setIsEditing(true);
    setIsCreating(false);
    setEditForm({
      title: entry.title,
      content: entry.content,
      emoji: entry.emoji,
    });
  };

  // Annuler la création/modification
  const cancelEdit = () => {
    setIsCreating(false);
    setIsEditing(false);
    setEditForm({ title: '', content: '', emoji: '📝' });
  };

  return (
    <div
      className={`min-h-screen ${contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-sky-50 via-white to-cyan-50'}`}
    >
      {/* Header */}
      <header
        className={`py-6 px-4 sm:px-6 lg:px-8 ${contrastHigh ? 'bg-contrast-bg' : 'bg-white shadow-sm'}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                  contrastHigh
                    ? 'hover:bg-contrast-text/20'
                    : 'hover:bg-gray-100'
                }`}
              >
                <span className="text-2xl">←</span>
                <span>Retour</span>
              </Link>
              <div>
                <h1
                  className={`text-2xl sm:text-3xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}
                >
                  ✍️ Mon Journal Secret
                </h1>
                <p
                  className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}
                >
                  Écris tes pensées et tes découvertes spirituelles
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Journal Entries List */}
          <div className="lg:col-span-1">
            <div
              className={`rounded-2xl overflow-hidden ${
                contrastHigh
                  ? 'bg-contrast-bg border-2 border-contrast-text'
                  : 'bg-white shadow-lg'
              }`}
            >
              <div
                className={`p-6 border-b ${
                  contrastHigh ? 'border-contrast-text/20' : 'border-gray-200'
                }`}
              >
                <h2
                  className={`text-xl font-bold ${
                    contrastHigh ? 'text-contrast-text' : 'text-gray-800'
                  }`}
                >
                  Mes Entrées
                </h2>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {entries.map((entry) => (
                  <button
                    key={entry.id}
                    onClick={() => setSelectedEntry(entry.id)}
                    className={`w-full p-4 text-left border-b transition-colors ${
                      selectedEntry === entry.id
                        ? contrastHigh
                          ? 'bg-contrast-text/20'
                          : 'bg-sky-50'
                        : contrastHigh
                          ? 'hover:bg-contrast-text/10'
                          : 'hover:bg-gray-50'
                    } ${
                      contrastHigh
                        ? 'border-contrast-text/20'
                        : 'border-gray-100'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{entry.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`font-semibold truncate ${
                            contrastHigh
                              ? 'text-contrast-text'
                              : 'text-gray-800'
                          }`}
                        >
                          {entry.title}
                        </h3>
                        <p
                          className={`text-sm ${
                            contrastHigh
                              ? 'text-contrast-text'
                              : 'text-gray-500'
                          }`}
                        >
                          {entry.date}
                        </p>
                        <p
                          className={`text-sm mt-1 truncate ${
                            contrastHigh
                              ? 'text-contrast-text'
                              : 'text-gray-600'
                          }`}
                        >
                          {entry.content}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-4">
                <button
                  onClick={startCreating}
                  className={`w-full py-3 px-4 rounded-xl font-medium transition-colors ${
                    contrastHigh
                      ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                      : 'bg-sky-500 text-white hover:bg-sky-600'
                  }`}
                >
                  ✨ Nouvelle Entrée
                </button>
              </div>
            </div>
          </div>

          {/* Journal Entry Content */}
          <div className="lg:col-span-2">
            {isCreating || isEditing ? (
              /* Formulaire de création/édition */
              <div
                className={`rounded-2xl p-8 ${
                  contrastHigh
                    ? 'bg-contrast-bg border-2 border-contrast-text'
                    : 'bg-white shadow-lg'
                }`}
              >
                <h2
                  className={`text-2xl font-bold mb-6 ${
                    contrastHigh ? 'text-contrast-text' : 'text-gray-800'
                  }`}
                >
                  {isCreating ? '✨ Nouvelle Entrée' : "✏️ Modifier l'entrée"}
                </h2>

                {/* Sélecteur d'emoji */}
                <div className="mb-6">
                  <label
                    className={`block text-sm font-medium mb-3 ${
                      contrastHigh ? 'text-contrast-text' : 'text-gray-700'
                    }`}
                  >
                    Choisis un emoji :
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableEmojis.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() =>
                          setEditForm((prev) => ({ ...prev, emoji }))
                        }
                        className={`w-12 h-12 text-2xl rounded-xl transition-all hover:scale-110 ${
                          editForm.emoji === emoji
                            ? contrastHigh
                              ? 'bg-contrast-text text-contrast-bg ring-2 ring-contrast-text'
                              : 'bg-sky-500 text-white ring-2 ring-sky-500'
                            : contrastHigh
                              ? 'bg-contrast-text/10 hover:bg-contrast-text/20'
                              : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Titre */}
                <div className="mb-6">
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      contrastHigh ? 'text-contrast-text' : 'text-gray-700'
                    }`}
                  >
                    Titre de ton entrée :
                  </label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="Ex: Ma découverte d'aujourd'hui"
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none ${
                      contrastHigh
                        ? 'bg-contrast-bg border-contrast-text text-contrast-text focus:border-contrast-text/60'
                        : 'bg-white border-gray-200 text-gray-800 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20'
                    }`}
                  />
                </div>

                {/* Contenu */}
                <div className="mb-8">
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      contrastHigh ? 'text-contrast-text' : 'text-gray-700'
                    }`}
                  >
                    Écris tes pensées :
                  </label>
                  <textarea
                    value={editForm.content}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    placeholder="Partage ce qui t'inspire, tes prières, tes découvertes..."
                    rows={8}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none resize-none ${
                      contrastHigh
                        ? 'bg-contrast-bg border-contrast-text text-contrast-text focus:border-contrast-text/60'
                        : 'bg-white border-gray-200 text-gray-800 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20'
                    }`}
                  />
                </div>

                {/* Boutons d'action */}
                <div className="flex space-x-4">
                  <button
                    onClick={isCreating ? createEntry : updateEntry}
                    disabled={
                      !editForm.title.trim() || !editForm.content.trim()
                    }
                    className={`px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                      contrastHigh
                        ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                        : 'bg-sky-500 text-white hover:bg-sky-600'
                    }`}
                  >
                    {isCreating ? '✨ Créer' : '💾 Sauvegarder'}
                  </button>
                  <button
                    onClick={cancelEdit}
                    className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                      contrastHigh
                        ? 'bg-contrast-text/20 hover:bg-contrast-text/30'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    🚫 Annuler
                  </button>
                </div>
              </div>
            ) : selectedEntry ? (
              /* Affichage d'une entrée */
              <div
                className={`rounded-2xl p-8 ${
                  contrastHigh
                    ? 'bg-contrast-bg border-2 border-contrast-text'
                    : 'bg-white shadow-lg'
                }`}
              >
                {(() => {
                  const entry = entries.find(
                    (e: JournalEntry) => e.id === selectedEntry
                  );
                  return entry ? (
                    <>
                      <div className="flex items-center space-x-4 mb-6">
                        <span className="text-4xl">{entry.emoji}</span>
                        <div>
                          <h2
                            className={`text-2xl font-bold ${
                              contrastHigh
                                ? 'text-contrast-text'
                                : 'text-gray-800'
                            }`}
                          >
                            {entry.title}
                          </h2>
                          <p
                            className={`${
                              contrastHigh
                                ? 'text-contrast-text'
                                : 'text-gray-500'
                            }`}
                          >
                            {entry.date}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`prose max-w-none mb-8 ${
                          contrastHigh ? 'text-contrast-text' : 'text-gray-700'
                        }`}
                      >
                        <div className="text-lg leading-relaxed whitespace-pre-wrap">
                          {entry.content}
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <button
                          onClick={() => startEditing(entry)}
                          className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                            contrastHigh
                              ? 'bg-contrast-text/20 hover:bg-contrast-text/30'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          ✏️ Modifier
                        </button>
                        <button
                          onClick={() => deleteEntry(entry.id)}
                          className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                            contrastHigh
                              ? 'bg-contrast-text/20 hover:bg-contrast-text/30'
                              : 'bg-red-100 hover:bg-red-200 text-red-700'
                          }`}
                        >
                          🗑️ Supprimer
                        </button>
                      </div>
                    </>
                  ) : null;
                })()}
              </div>
            ) : (
              /* Message de bienvenue */
              <div
                className={`rounded-2xl p-8 text-center ${
                  contrastHigh
                    ? 'bg-contrast-bg border-2 border-contrast-text'
                    : 'bg-white shadow-lg'
                }`}
              >
                <span className="text-6xl block mb-6">📝</span>
                <h2
                  className={`text-2xl font-bold mb-4 ${
                    contrastHigh ? 'text-contrast-text' : 'text-gray-800'
                  }`}
                >
                  Bienvenue dans ton Journal !
                </h2>
                <p
                  className={`text-lg mb-8 ${
                    contrastHigh ? 'text-contrast-text' : 'text-gray-600'
                  }`}
                >
                  C'est ton espace personnel pour noter tes pensées, tes prières
                  et tes découvertes. Sélectionne une entrée à gauche ou crée-en
                  une nouvelle !
                </p>

                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto ${
                    contrastHigh ? 'text-contrast-text' : 'text-sky-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">💭</span>
                    <span>Pensées</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🙏</span>
                    <span>Prières</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">📖</span>
                    <span>Versets préférés</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">✨</span>
                    <span>Découvertes</span>
                  </div>
                </div>

                <button
                  onClick={startCreating}
                  className={`mt-8 px-8 py-4 rounded-xl font-medium transition-all hover:scale-105 ${
                    contrastHigh
                      ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                      : 'bg-sky-500 text-white hover:bg-sky-600 shadow-lg'
                  }`}
                >
                  ✨ Créer ma première entrée
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Success Notice */}
        <div
          className={`mt-12 p-6 rounded-2xl ${
            contrastHigh
              ? 'bg-contrast-bg border-2 border-contrast-text'
              : 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200'
          }`}
        >
          <div className="flex items-start space-x-4">
            <span className="text-3xl">🎉</span>
            <div>
              <h3
                className={`font-bold mb-2 ${
                  contrastHigh ? 'text-contrast-text' : 'text-green-800'
                }`}
              >
                Ton journal est prêt !
              </h3>
              <p
                className={`${
                  contrastHigh ? 'text-contrast-text' : 'text-green-700'
                }`}
              >
                Tu peux maintenant écrire, modifier et supprimer tes entrées.
                Tes pensées sont automatiquement sauvegardées sur ton appareil !
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JournalPage;
