import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSettings } from '../state/settingsStore'
import { bibleApi, type BibleVerse } from '../services/bibleApi'
import { useFavoritesStore } from '../state/favoritesStore'

const FRENCH_BOOKS: string[] = [
  // Ancien Testament
  'Genèse','Exode','Lévitique','Nombres','Deutéronome','Josué','Juges','Ruth',
  '1 Samuel','2 Samuel','1 Rois','2 Rois','1 Chroniques','2 Chroniques','Esdras','Néhémie','Esther','Job','Psaumes','Proverbes','Ecclésiaste','Cantique des Cantiques','Isaïe','Jérémie','Lamentations','Ézéchiel','Daniel','Osée','Joël','Amos','Abdias','Jonas','Michée','Nahum','Habacuc','Sophonie','Aggée','Zacharie','Malachie',
  // Nouveau Testament
  'Matthieu','Marc','Luc','Jean','Actes','Romains','1 Corinthiens','2 Corinthiens','Galates','Éphésiens','Philippiens','Colossiens','1 Thessaloniciens','2 Thessaloniciens','1 Timothée','2 Timothée','Tite','Philémon','Hébreux','Jacques','1 Pierre','2 Pierre','1 Jean','2 Jean','3 Jean','Jude','Apocalypse'
]

export default function BibleExplorer() {
  const { contrastHigh } = useSettings()
  const [book, setBook] = useState<string>('Genèse')
  const [chapter, setChapter] = useState<number>(1)
  const [start, setStart] = useState<number>(1)
  const [end, setEnd] = useState<number>(10)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [verses, setVerses] = useState<BibleVerse[]>([])
  const addFavorite = useFavoritesStore(s => s.addFavorite)
  const removeFavorite = useFavoritesStore(s => s.removeFavorite)
  const isFavorite = useFavoritesStore(s => s.isFavorite)

  const isDemo = !import.meta.env.VITE_BIBLE_API_KEY

  const chaptersList = useMemo(() => Array.from({ length: 150 }, (_, i) => i + 1), [])

  useEffect(() => {
    const fetchVerses = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await bibleApi.getVersesDefault(book, chapter, start, end)
        setVerses(data)
      } catch (err) {
        setError('Erreur de chargement des versets')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchVerses()
  }, [book, chapter, start, end])

  return (
    <div className="min-h-screen">
      {isDemo && (
        <div className="text-center text-sm py-2 px-4 bg-amber-50 text-amber-800 border-b border-amber-200">
          Mode démo: affichage basé sur données locales si l'API n'est pas configurée. Consultez docs/API_BIBLE_GUIDE.md
        </div>
      )}
      <header className={`sticky top-0 z-30 border-b ${
        contrastHigh ? 'bg-contrast-bg border-contrast-text' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to="/" className={contrastHigh ? 'text-contrast-text' : 'text-blue-600'}>← Accueil</Link>
            <h1 className={`text-xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>Explorateur de la Bible (LSG)</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Contrôles rapides */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <button onClick={() => setChapter(Math.max(1, chapter - 1))} className="px-3 py-1 rounded border bg-gray-50">⟨ Chapitre</button>
          <button onClick={() => setChapter(chapter + 1)} className="px-3 py-1 rounded border bg-gray-50">Chapitre ⟩</button>
          <span className="mx-2 text-gray-500">|</span>
          <button onClick={() => { const s = Math.max(1, (start - 5) || 1); setStart(s); setEnd(Math.max(s, end - 5)); }} className="px-3 py-1 rounded border bg-gray-50">−5 versets</button>
          <button onClick={() => { const s = start + 5; setStart(s); setEnd(end + 5); }} className="px-3 py-1 rounded border bg-gray-50">+5 versets</button>
          <span className="mx-2 text-gray-500">|</span>
          <button onClick={() => { setStart(1); setEnd(10); }} className="px-3 py-1 rounded border bg-gray-50">Réinitialiser</button>
        </div>
        <section className={`p-4 rounded-xl mb-6 ${
          contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white border border-gray-200'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm mb-1">Livre</label>
              <select value={book} onChange={(e) => setBook(e.target.value)}
                className={`w-full p-2 rounded border ${contrastHigh ? 'bg-contrast-bg border-contrast-text' : 'bg-white border-gray-300'}`}>
                {FRENCH_BOOKS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Chapitre</label>
              <select value={chapter} onChange={(e) => setChapter(parseInt(e.target.value))}
                className={`w-full p-2 rounded border ${contrastHigh ? 'bg-contrast-bg border-contrast-text' : 'bg-white border-gray-300'}`}>
                {chaptersList.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Verset début</label>
              <input type="number" min={1} value={start} onChange={(e) => setStart(parseInt(e.target.value) || 1)}
                className={`w-full p-2 rounded border ${contrastHigh ? 'bg-contrast-bg border-contrast-text' : 'bg-white border-gray-300'}`} />
            </div>
            <div>
              <label className="block text-sm mb-1">Verset fin</label>
              <input type="number" min={start} value={end} onChange={(e) => setEnd(parseInt(e.target.value) || start)}
                className={`w-full p-2 rounded border ${contrastHigh ? 'bg-contrast-bg border-contrast-text' : 'bg-white border-gray-300'}`} />
            </div>
          </div>
        </section>

        <section>
          {loading && (
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          )}
          {error && (
            <div className="p-4 rounded bg-red-50 text-red-700 border border-red-200">{error}</div>
          )}
          {!loading && !error && verses.length === 0 && (
            <div className="p-4 rounded bg-yellow-50 text-yellow-800 border border-yellow-200">Aucun verset trouvé.</div>
          )}
          <div className="space-y-4">
            {verses.map((v, idx) => {
              const fav = isFavorite(book, v.chapter, v.verse_start, v.verse_end)
              const id = `${book}|${v.chapter}|${v.verse_start ?? ''}-${v.verse_end ?? ''}`
              const handleCopy = async () => {
                const ref = `${book} ${v.chapter}:${v.verse_start}${v.verse_end ? `-${v.verse_end}` : ''}`
                const text = `${ref} — ${v.verse_text}`
                try { await navigator.clipboard.writeText(text) } catch {}
              }
              const handleShare = async () => {
                const ref = `${book} ${v.chapter}:${v.verse_start}${v.verse_end ? `-${v.verse_end}` : ''}`
                const title = `Bible LSG — ${ref}`
                const text = `${ref} — ${v.verse_text}`
                if (navigator.share) { try { await navigator.share({ title, text }) } catch {} }
                else { try { await navigator.clipboard.writeText(text) } catch {} }
              }
              const toggleFav = () => {
                if (fav) removeFavorite(id)
                else addFavorite({ book, chapter: v.chapter, verseStart: v.verse_start, verseEnd: v.verse_end, text: v.verse_text })
              }
              return (
                <div key={idx} className={`p-4 rounded ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white border border-gray-200'}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">{book} {v.chapter}:{v.verse_start}{v.verse_end ? `-${v.verse_end}` : ''}</div>
                      <div className="text-lg leading-relaxed">{v.verse_text}</div>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-2">
                      <button onClick={handleCopy} className="text-sm px-2 py-1 rounded border bg-gray-50">Copier</button>
                      <button onClick={handleShare} className="text-sm px-2 py-1 rounded border bg-gray-50">Partager</button>
                      <button onClick={toggleFav} className={`text-sm px-2 py-1 rounded border ${fav ? 'bg-yellow-100 border-yellow-300' : 'bg-gray-50'}`}>{fav ? '★ Favori' : '☆ Favori'}</button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}


