import { useState, useEffect } from 'react';
import { useSettings } from '../state/settingsStore';
import { TimelineService, type Period, type Story } from '../services/timelineService';

interface LessonData {
  id: string;
  title: string;
  description?: string;
  path?: string;
  book?: string;
  reading?: string[] | { paragraph: string }[];
  key_verse?: string;
  memoryVerse?: {
    reference: string;
    text: string;
  };
  vocab?: Array<{ word: string; hint: string }>;
  quiz?: Array<{
    q?: string;
    text?: string;
    question?: string;
    choices?: string[];
    options?: string[];
    answer?: number;
    correct?: number;
    correctAnswer?: number;
    explanation?: string;
  }>;
  mini_games?: string[];
  story_steps?: string[];
  theological_message?: string;
  life_application?: string;
  bible_verses?: Array<{ reference: string; text?: string }>;
  duration?: number;
  difficulty?: string;
}

export default function StoryEditorPage() {
  const { contrastHigh } = useSettings();
  const [periods, setPeriods] = useState<Period[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [lessonData, setLessonData] = useState<LessonData | null>(null);
  const [editedLessonData, setEditedLessonData] = useState<LessonData | null>(null);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'content' | 'quiz' | 'verses'>('basic');

  useEffect(() => {
    const timelineData = TimelineService.getTimeline();
    setPeriods(timelineData);
  }, []);

  const handlePeriodSelect = (periodId: string) => {
    setSelectedPeriod(periodId);
    setSelectedStory(null);
    setLessonData(null);
    setEditedLessonData(null);
  };

  const handleStorySelect = async (story: Story) => {
    setSelectedStory(story);
    setActiveTab('basic');
    await loadLessonContent(story.id);
  };

  const loadLessonContent = async (storyId: string) => {
    const possiblePaths = [
      `/content/pentateuque/${storyId}.json`,
      `/content/nouveau_testament/${storyId}.json`,
      `/content/poetiques/${storyId}.json`,
      `/content/prophetiques/${storyId}.json`,
      `/content/historiques/${storyId}.json`,
      `/content/${storyId}.json`
    ];

    for (const url of possiblePaths) {
      try {
        const resp = await fetch(url);
        if (resp.ok) {
          const data = await resp.json();
          setLessonData(data);
          setEditedLessonData(JSON.parse(JSON.stringify(data)));
          return;
        }
      } catch (error) {
        // Continue to next path
      }
    }
    
    const emptyLesson: LessonData = {
      id: storyId,
      title: selectedStory?.title || '',
      description: selectedStory?.description || '',
      book: selectedStory?.book || '',
      reading: [],
      quiz: [],
      story_steps: [],
      bible_verses: []
    };
    setLessonData(emptyLesson);
    setEditedLessonData(JSON.parse(JSON.stringify(emptyLesson)));
  };

  const handleSave = () => {
    if (editedLessonData) {
      const jsonData = JSON.stringify(editedLessonData, null, 2);
      navigator.clipboard.writeText(jsonData);
      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 3000);
    }
  };

  const handleLessonChange = (field: keyof LessonData, value: any) => {
    if (editedLessonData) {
      setEditedLessonData({ ...editedLessonData, [field]: value });
    }
  };

  const addReadingParagraph = () => {
    if (editedLessonData) {
      const reading = editedLessonData.reading || [];
      if (reading.length === 0 || typeof reading[0] === 'string') {
        handleLessonChange('reading', [...(reading as string[]), '']);
      } else {
        handleLessonChange('reading', [...(reading as { paragraph: string }[]), { paragraph: '' }]);
      }
    }
  };

  const updateReadingParagraph = (index: number, value: string) => {
    if (editedLessonData?.reading) {
      const reading = [...editedLessonData.reading];
      if (typeof reading[index] === 'string') {
        reading[index] = value;
      } else {
        (reading[index] as { paragraph: string }).paragraph = value;
      }
      handleLessonChange('reading', reading);
    }
  };

  const deleteReadingParagraph = (index: number) => {
    if (editedLessonData?.reading) {
      const reading = [...editedLessonData.reading];
      reading.splice(index, 1);
      handleLessonChange('reading', reading);
    }
  };

  const addQuizQuestion = () => {
    if (editedLessonData) {
      const quiz = editedLessonData.quiz || [];
      handleLessonChange('quiz', [...quiz, { q: '', choices: ['', '', ''], answer: 0, explanation: '' }]);
    }
  };

  const updateQuizQuestion = (index: number, field: string, value: any) => {
    if (editedLessonData?.quiz) {
      const quiz = [...editedLessonData.quiz];
      if (field === 'choices') {
        quiz[index] = { ...quiz[index], choices: value };
      } else {
        quiz[index] = { ...quiz[index], [field]: value };
      }
      handleLessonChange('quiz', quiz);
    }
  };

  const deleteQuizQuestion = (index: number) => {
    if (editedLessonData?.quiz) {
      const quiz = [...editedLessonData.quiz];
      quiz.splice(index, 1);
      handleLessonChange('quiz', quiz);
    }
  };

  const addStoryStep = () => {
    if (editedLessonData) {
      const steps = editedLessonData.story_steps || [];
      handleLessonChange('story_steps', [...steps, '']);
    }
  };

  const updateStoryStep = (index: number, value: string) => {
    if (editedLessonData?.story_steps) {
      const steps = [...editedLessonData.story_steps];
      steps[index] = value;
      handleLessonChange('story_steps', steps);
    }
  };

  const deleteStoryStep = (index: number) => {
    if (editedLessonData?.story_steps) {
      const steps = [...editedLessonData.story_steps];
      steps.splice(index, 1);
      handleLessonChange('story_steps', steps);
    }
  };

  const addBibleVerse = () => {
    if (editedLessonData) {
      const verses = editedLessonData.bible_verses || [];
      handleLessonChange('bible_verses', [...verses, { reference: '', text: '' }]);
    }
  };

  const updateBibleVerse = (index: number, field: 'reference' | 'text', value: string) => {
    if (editedLessonData?.bible_verses) {
      const verses = [...editedLessonData.bible_verses];
      verses[index] = { ...verses[index], [field]: value };
      handleLessonChange('bible_verses', verses);
    }
  };

  const deleteBibleVerse = (index: number) => {
    if (editedLessonData?.bible_verses) {
      const verses = [...editedLessonData.bible_verses];
      verses.splice(index, 1);
      handleLessonChange('bible_verses', verses);
    }
  };

  const handleExportAll = () => {
    const allData = TimelineService.getTimelineData();
    const jsonData = JSON.stringify(allData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'timeline_data_export.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const selectedPeriodData = periods.find(p => p.id === selectedPeriod);

  const getReadingText = (item: string | { paragraph: string }) => {
    return typeof item === 'string' ? item : item.paragraph;
  };

  return (
    <div className={`min-h-screen ${contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-slate-50 to-blue-50'}`}>
      <header className={`sticky top-0 z-40 backdrop-blur-md ${contrastHigh ? 'bg-contrast-bg/95' : 'bg-white/95 shadow-sm border-b border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">✏️</span>
              <div>
                <h1 className={`text-2xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                  Éditeur d'Histoires Complet
                </h1>
                <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
                  Gérez tout le contenu de vos histoires bibliques
                </p>
              </div>
            </div>
            <button onClick={handleExportAll} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              📥 Exporter Tout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {showSaveSuccess && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center space-x-2">
            <span className="text-2xl">✅</span>
            <span>Contenu complet copié dans le presse-papier ! Collez-le dans votre fichier JSON.</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Colonne 1: Périodes */}
          <div className={`${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'} rounded-xl p-6`}>
            <h2 className={`text-xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
              Périodes ({periods.length})
            </h2>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {periods.map((period) => (
                <button key={period.id} onClick={() => handlePeriodSelect(period.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedPeriod === period.id ? 'bg-blue-600 text-white' : 
                    contrastHigh ? 'bg-contrast-bg border border-contrast-text hover:bg-contrast-text/10' : 'bg-gray-50 hover:bg-gray-100'
                  }`}>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{period.icon}</span>
                    <div>
                      <div className="font-semibold">{period.title}</div>
                      <div className="text-xs opacity-75">{period.stories.length} histoires</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Colonne 2: Histoires */}
          <div className={`${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'} rounded-xl p-6`}>
            <h2 className={`text-xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
              Histoires {selectedPeriodData ? `- ${selectedPeriodData.title}` : ''}
            </h2>
            {selectedPeriodData ? (
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {selectedPeriodData.stories.map((story) => (
                  <button key={story.id} onClick={() => handleStorySelect(story)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedStory?.id === story.id ? 'bg-purple-600 text-white' :
                      contrastHigh ? 'bg-contrast-bg border border-contrast-text hover:bg-contrast-text/10' : 'bg-gray-50 hover:bg-gray-100'
                    }`}>
                    <div className="font-semibold">{story.title}</div>
                    <div className="text-xs opacity-75">{story.book}</div>
                    <div className="text-xs mt-1">
                      <span className={story.available ? 'text-green-500' : 'text-red-500'}>
                        {story.available ? '✅ Disponible' : '🔒 Indisponible'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <p className={`text-center ${contrastHigh ? 'text-contrast-text' : 'text-gray-500'}`}>
                Sélectionnez une période
              </p>
            )}
          </div>

          {/* Colonnes 3-4: Éditeur complet */}
          <div className={`lg:col-span-2 ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'} rounded-xl p-6`}>
            <h2 className={`text-xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
              Éditeur Complet
            </h2>
            
            {editedLessonData ? (
              <div>
                {/* Onglets */}
                <div className="flex space-x-2 mb-6 border-b border-gray-200 pb-2">
                  {['basic', 'content', 'quiz', 'verses'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as typeof activeTab)}
                      className={`px-4 py-2 rounded-t-lg font-medium transition-all ${
                        activeTab === tab
                          ? 'bg-blue-600 text-white'
                          : contrastHigh
                          ? 'bg-contrast-bg border border-contrast-text'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {tab === 'basic' && '📝 Informations'}
                      {tab === 'content' && '📖 Contenu'}
                      {tab === 'quiz' && '❓ Quiz'}
                      {tab === 'verses' && '📜 Versets'}
                    </button>
                  ))}
                </div>

                {/* Contenu des onglets */}
                <div className="max-h-[500px] overflow-y-auto space-y-4 pr-2">
                  {/* Onglet Basic */}
                  {activeTab === 'basic' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-1">Titre</label>
                        <input type="text" value={editedLessonData.title}
                          onChange={(e) => handleLessonChange('title', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea value={editedLessonData.description || ''}
                          onChange={(e) => handleLessonChange('description', e.target.value)}
                          rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-300" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Livre/Référence</label>
                        <input type="text" value={editedLessonData.book || ''}
                          onChange={(e) => handleLessonChange('book', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Verset Clé</label>
                        <input type="text" value={editedLessonData.key_verse || ''}
                          onChange={(e) => handleLessonChange('key_verse', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Message Théologique</label>
                        <textarea value={editedLessonData.theological_message || ''}
                          onChange={(e) => handleLessonChange('theological_message', e.target.value)}
                          rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-300" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Application Pratique</label>
                        <textarea value={editedLessonData.life_application || ''}
                          onChange={(e) => handleLessonChange('life_application', e.target.value)}
                          rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-300" />
                      </div>
                    </>
                  )}

                  {/* Onglet Contenu */}
                  {activeTab === 'content' && (
                    <>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-medium">📖 Paragraphes de Lecture ({editedLessonData.reading?.length || 0})</label>
                          <button onClick={addReadingParagraph} className="px-3 py-1 bg-green-600 text-white rounded text-sm">+ Ajouter</button>
                        </div>
                        {editedLessonData.reading?.map((item, index) => (
                          <div key={index} className="flex gap-2 mb-2">
                            <textarea value={getReadingText(item)}
                              onChange={(e) => updateReadingParagraph(index, e.target.value)}
                              rows={3} className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm" 
                              placeholder={`Paragraphe ${index + 1}`} />
                            <button onClick={() => deleteReadingParagraph(index)} className="px-2 text-red-600 hover:text-red-800">🗑️</button>
                          </div>
                        ))}
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-medium">📋 Étapes de l'Histoire ({editedLessonData.story_steps?.length || 0})</label>
                          <button onClick={addStoryStep} className="px-3 py-1 bg-green-600 text-white rounded text-sm">+ Ajouter</button>
                        </div>
                        {editedLessonData.story_steps?.map((step, index) => (
                          <div key={index} className="flex gap-2 mb-2">
                            <input type="text" value={step}
                              onChange={(e) => updateStoryStep(index, e.target.value)}
                              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm" 
                              placeholder={`Étape ${index + 1}`} />
                            <button onClick={() => deleteStoryStep(index)} className="px-2 text-red-600 hover:text-red-800">🗑️</button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Onglet Quiz */}
                  {activeTab === 'quiz' && (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <label className="text-sm font-medium">❓ Questions du Quiz ({editedLessonData.quiz?.length || 0})</label>
                        <button onClick={addQuizQuestion} className="px-3 py-1 bg-green-600 text-white rounded text-sm">+ Ajouter Question</button>
                      </div>
                      {editedLessonData.quiz?.map((question, index) => (
                        <div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-sm">Question {index + 1}</span>
                            <button onClick={() => deleteQuizQuestion(index)} className="text-red-600 hover:text-red-800">🗑️</button>
                          </div>
                          <input type="text" value={question.q || question.text || question.question || ''}
                            onChange={(e) => updateQuizQuestion(index, 'q', e.target.value)}
                            placeholder="Question" className="w-full px-3 py-2 rounded-lg border border-gray-300 mb-2 text-sm" />
                          
                          <label className="text-xs font-medium mb-1 block">Choix de réponses:</label>
                          {(question.choices || question.options || []).map((choice, choiceIndex) => (
                            <div key={choiceIndex} className="flex items-center gap-2 mb-1">
                              <span className="text-xs">{choiceIndex + 1}.</span>
                              <input type="text" value={choice}
                                onChange={(e) => {
                                  const choices = [...(question.choices || question.options || [])];
                                  choices[choiceIndex] = e.target.value;
                                  updateQuizQuestion(index, 'choices', choices);
                                }}
                                className="flex-1 px-2 py-1 rounded border border-gray-300 text-sm" />
                            </div>
                          ))}
                          
                          <div className="mt-2">
                            <label className="text-xs font-medium">Bonne réponse (index 0-based):</label>
                            <input type="number" value={question.answer ?? question.correct ?? question.correctAnswer ?? 0}
                              onChange={(e) => updateQuizQuestion(index, 'answer', parseInt(e.target.value))}
                              className="w-20 px-2 py-1 rounded border border-gray-300 ml-2 text-sm" min="0" />
                          </div>
                          
                          <div className="mt-2">
                            <label className="text-xs font-medium block mb-1">Explication:</label>
                            <textarea value={question.explanation || ''}
                              onChange={(e) => updateQuizQuestion(index, 'explanation', e.target.value)}
                              rows={2} className="w-full px-2 py-1 rounded border border-gray-300 text-sm" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Onglet Versets */}
                  {activeTab === 'verses' && (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <label className="text-sm font-medium">📜 Versets Bibliques ({editedLessonData.bible_verses?.length || 0})</label>
                        <button onClick={addBibleVerse} className="px-3 py-1 bg-green-600 text-white rounded text-sm">+ Ajouter Verset</button>
                      </div>
                      {editedLessonData.bible_verses?.map((verse, index) => (
                        <div key={index} className="mb-3 p-3 border border-gray-300 rounded-lg bg-gray-50">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-sm">Verset {index + 1}</span>
                            <button onClick={() => deleteBibleVerse(index)} className="text-red-600 hover:text-red-800">🗑️</button>
                          </div>
                          <input type="text" value={verse.reference}
                            onChange={(e) => updateBibleVerse(index, 'reference', e.target.value)}
                            placeholder="Référence (ex: Jean 3:16)" className="w-full px-3 py-2 rounded-lg border border-gray-300 mb-2 text-sm" />
                          <textarea value={verse.text || ''}
                            onChange={(e) => updateBibleVerse(index, 'text', e.target.value)}
                            placeholder="Texte du verset (optionnel)" rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Boutons d'action */}
                <div className="flex space-x-2 pt-4 mt-4 border-t border-gray-200">
                  <button onClick={handleSave}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
                    💾 Sauvegarder dans Presse-papier
                  </button>
                  <button onClick={() => setEditedLessonData(lessonData ? JSON.parse(JSON.stringify(lessonData)) : null)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold">
                    ↺ Annuler
                  </button>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-blue-50">
                  <p className="text-sm text-blue-800">
                    <strong>💡 Note :</strong> Cliquez sur "Sauvegarder" pour copier le JSON complet. 
                    Collez-le dans <code>/public/content/[dossier]/{editedLessonData.id}.json</code>
                  </p>
                </div>
              </div>
            ) : (
              <p className={`text-center ${contrastHigh ? 'text-contrast-text' : 'text-gray-500'}`}>
                Sélectionnez une histoire pour commencer l'édition complète
              </p>
            )}
          </div>
        </div>

        {/* Statistiques */}
        <div className={`mt-8 p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'}`}>
          <h3 className={`text-xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>📊 Statistiques</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{periods.length}</div>
              <div className="text-sm text-gray-600">Périodes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{periods.reduce((sum, p) => sum + p.stories.length, 0)}</div>
              <div className="text-sm text-gray-600">Histoires Totales</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{periods.reduce((sum, p) => sum + p.stories.filter(s => s.available).length, 0)}</div>
              <div className="text-sm text-gray-600">Disponibles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{periods.reduce((sum, p) => sum + p.stories.filter(s => !s.available).length, 0)}</div>
              <div className="text-sm text-gray-600">En Préparation</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
