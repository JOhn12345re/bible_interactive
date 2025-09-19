# Guide d'intégration de l'API Bible locale

## 🚀 Démarrage rapide

### 1. Démarrer l'API Bible

**Option A - Script automatique (Windows) :**
```bash
# Double-cliquez sur le fichier ou exécutez :
scripts/start-bible-api.bat
```

**Option B - Manuel :**
```bash
# Ouvrir un terminal et naviguer vers l'API
cd "C:\Users\sheno\OneDrive\Bureau\bible-api"

# Installer les dépendances (si nécessaire)
npm install

# Démarrer l'API en mode développement
npm run dev
```

L'API sera accessible sur : `http://localhost:3000`

### 2. Démarrer votre site web

Dans un autre terminal :
```bash
# Dans le dossier de votre site
npm run dev
```

Votre site sera accessible sur : `http://localhost:5173`

## 📚 Fonctionnalités disponibles

### Livres de la Bible
- **Récupérer tous les livres** : `GET /api/bible/books`
- **Livres par testament** : `GET /api/bible/books/testament/ancien` ou `/nouveau`
- **Livre par ID** : `GET /api/bible/books/:id`

### Chapitres
- **Chapitres d'un livre** : `GET /api/bible/books/:bookId/chapters`
- **Chapitre spécifique** : `GET /api/bible/books/:bookId/chapters/:chapterNumber`

### Versets
- **Versets d'un chapitre** : `GET /api/bible/books/:bookId/chapters/:chapterNumber/verses`
- **Verset spécifique** : `GET /api/bible/books/:bookId/chapters/:chapterNumber/verses/:verseNumber`
- **Recherche textuelle** : `GET /api/bible/search?q=terme&limit=10`

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env.local` dans votre projet avec :

```env
# Configuration pour l'API Bible locale
VITE_BIBLE_API_URL=http://localhost:3000/api/bible
VITE_BIBLE_LANGUAGE=fra
```

### Utilisation dans le code

```typescript
import { bibleApi } from './services/bibleApi';

// Récupérer tous les livres
const books = await bibleApi.getBibles();

// Récupérer les livres de l'Ancien Testament
const oldTestament = await bibleApi.getBooksByTestament('ancien');

// Récupérer des versets par nom de livre
const verses = await bibleApi.getVersesByName('Genèse', 1, 1, 3);

// Rechercher des versets
const searchResults = await bibleApi.searchVerses('amour', 10);

// Récupérer un verset par référence
const verse = await bibleApi.getVerseByReference('Jean 3:16');
```

## 🎯 Exemples d'utilisation

### Dans un composant React

```typescript
import { useBibleApi } from '../hooks/useBibleApi';

function BibleComponent() {
  const { verses, loading, error, fetchVerses } = useBibleApi();

  const handleSearch = () => {
    fetchVerses('Jean 3:16');
  };

  return (
    <div>
      <button onClick={handleSearch}>Charger Jean 3:16</button>
      {loading && <p>Chargement...</p>}
      {error && <p>Erreur: {error}</p>}
      {verses.map(verse => (
        <p key={verse.id}>
          {verse.verse_number}. {verse.text}
        </p>
      ))}
    </div>
  );
}
```

### Recherche de versets

```typescript
import { useVerseSearch } from '../hooks/useBibleApi';

function VerseSearch() {
  const { verses, loading, searchVerse, searchHistory } = useVerseSearch();

  return (
    <div>
      <input 
        type="text" 
        placeholder="Rechercher un verset..."
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            searchVerse(e.target.value);
          }
        }}
      />
      {/* Affichage des résultats */}
    </div>
  );
}
```

## 🗄️ Structure de la base de données

L'API utilise une base de données MySQL avec les tables suivantes :

- **books** : Livres de la Bible (id, name, abbreviation, testament, chapter_count)
- **chapters** : Chapitres (id, book_id, chapter_number, verse_count)
- **verses** : Versets (id, book_id, chapter_id, verse_number, text)

## 🛠️ Dépannage

### L'API ne démarre pas
1. Vérifiez que Node.js est installé : `node --version`
2. Vérifiez que MySQL/XAMPP est démarré
3. Vérifiez les variables d'environnement dans `.env`

### Erreurs de connexion
1. Vérifiez que l'API Bible est démarrée sur le port 3000
2. Vérifiez l'URL dans `VITE_BIBLE_API_URL`
3. Vérifiez que CORS est configuré correctement

### Données manquantes
1. Exécutez le script de seed : `npm run seed` dans le dossier de l'API
2. Vérifiez que la base de données contient des données

## 📖 Documentation complète

Pour plus de détails sur l'API, consultez :
- `http://localhost:3000/api` - Documentation de l'API
- `C:\Users\sheno\OneDrive\Bureau\bible-api\README.md` - Documentation complète

## 🔄 Mise à jour

Pour mettre à jour l'intégration :

1. Arrêtez l'API Bible
2. Mettez à jour le code dans le dossier `bible-api`
3. Redémarrez l'API : `npm run dev`
4. Redémarrez votre site web si nécessaire
