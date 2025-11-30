# 🔐 Système d'Authentification et Progression Utilisateur

Ce système permet aux utilisateurs de **s'inscrire, se connecter et sauvegarder leur progression** (XP, badges, leçons complétées) dans une base de données.

## 📋 Fonctionnalités

- ✅ **Inscription** : Créer un compte avec email/mot de passe
- ✅ **Connexion** : Se connecter avec email/mot de passe
- ✅ **Déconnexion** : Se déconnecter
- ✅ **Sauvegarde progression** : XP, niveau, pièces, badges, leçons complétées
- ✅ **Chargement progression** : Récupérer la progression au login
- ✅ **Mode invité** : Continuer sans compte (progression locale seulement)

## 🗄️ Base de Données

### Option 1 : Vercel Postgres (Recommandé pour production)

1. **Créer base de données sur Vercel** :
   ```bash
   # Sur le dashboard Vercel de votre projet
   - Allez dans "Storage" → "Create Database"
   - Choisissez "Postgres" → "Continue"
   - Nommez-la "bible-interactive-db" → "Create"
   ```

2. **Copier les variables d'environnement** :
   ```bash
   # Vercel vous donnera automatiquement ces variables :
   POSTGRES_URL="postgresql://..."
   POSTGRES_PRISMA_URL="postgresql://..."
   POSTGRES_URL_NON_POOLING="postgresql://..."
   POSTGRES_USER="..."
   POSTGRES_HOST="..."
   POSTGRES_PASSWORD="..."
   POSTGRES_DATABASE="..."
   ```

3. **Créer les tables** :
   ```bash
   # Dans le dashboard Vercel Postgres, onglet "Query"
   # Copiez et exécutez le contenu de db/schema.sql
   ```

4. **Installer le package Vercel Postgres** :
   ```bash
   npm install @vercel/postgres
   ```

### Option 2 : Base de données locale (Pour développement)

```bash
# Installer PostgreSQL localement
# Windows : https://www.postgresql.org/download/windows/
# Mac : brew install postgresql

# Créer la base de données
createdb bible_interactive

# Exécuter le schéma
psql bible_interactive < db/schema.sql

# Créer fichier .env.local
POSTGRES_URL="postgresql://localhost:5432/bible_interactive"
```

## 📦 Installation des packages

```bash
# Packages nécessaires pour l'authentification
npm install @vercel/postgres
npm install @vercel/node
npm install jsonwebtoken
npm install bcrypt
npm install @types/jsonwebtoken @types/bcrypt --save-dev
```

## 🔧 Configuration

### 1. Ajouter les routes dans App.tsx

Ouvrez `src/App.tsx` et ajoutez :

```tsx
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Dans votre composant App, wrappez tout dans AuthProvider :
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* ... autres routes ... */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}
```

### 2. Ajouter bouton connexion dans Menu

Dans `src/components/Menu.tsx`, ajoutez :

```tsx
import { useAuth } from '../context/AuthContext';

export default function Menu() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="menu">
      {isAuthenticated ? (
        <div className="flex items-center space-x-4">
          <span>👤 {user?.username}</span>
          <button onClick={logout} className="btn-logout">
            Déconnexion
          </button>
        </div>
      ) : (
        <Link to="/login" className="btn-login">
          Se connecter
        </Link>
      )}
    </div>
  );
}
```

### 3. Sauvegarder automatiquement la progression

Dans `src/state/progressStore.ts`, ajoutez la synchronisation :

```tsx
import { useAuth } from '../context/AuthContext';

// Dans votre store Zustand, ajoutez :
export const useProgressStore = create<ProgressState>((set, get) => ({
  // ... état existant ...

  // Fonction pour sync avec API
  syncWithServer: async () => {
    const { saveProgress } = useAuth();
    const state = get();
    
    await saveProgress({
      xp: state.xp,
      level: state.level,
      coins: state.coins,
      streakDays: state.streak
    });
  },

  // Modifier addXP pour sauvegarder automatiquement
  addXP: async (amount: number) => {
    set((state) => ({ xp: state.xp + amount }));
    
    // Sauvegarder sur le serveur
    const { saveProgress, isAuthenticated } = useAuth();
    if (isAuthenticated) {
      await saveProgress({ xp: get().xp });
    }
  }
}));
```

## 🚀 Utilisation

### Tester en local

```bash
# Démarrer le serveur de développement
npm run dev

# Naviguer vers http://localhost:5173/register
# Créer un compte et tester
```

### Déployer sur Vercel

```bash
# Pousser sur GitHub
git add .
git commit -m "feat: Ajout système authentification et progression utilisateur"
git push origin main

# Vercel déploie automatiquement
# Les API routes dans /api/* sont automatiquement déployées comme serverless functions
```

## 📊 Structure des fichiers

```
/db
  schema.sql                    # Schéma SQL (tables)

/api
  /lib
    db.ts                       # Helper base de données
  /auth
    register.ts                 # API inscription
    login.ts                    # API connexion
  /progress
    save.ts                     # API sauvegarde progression
    load.ts                     # API chargement progression

/src
  /context
    AuthContext.tsx             # Context React auth
  /pages
    LoginPage.tsx               # Page connexion
    RegisterPage.tsx            # Page inscription
  /types
    auth.ts                     # Types TypeScript
```

## 🔐 Sécurité

- ✅ Mots de passe hashés avec SHA-256 (à améliorer avec bcrypt)
- ✅ JWT tokens avec expiration 24h
- ✅ Validation email et password côté serveur
- ✅ Protection CORS sur toutes les API routes
- ✅ Requêtes authentifiées avec Authorization header

## ⚠️ À améliorer en production

1. **Hash de password** : Remplacer SHA-256 par `bcrypt`
2. **JWT** : Utiliser `jsonwebtoken` library
3. **Variables d'environnement** : Ajouter `JWT_SECRET` dans Vercel settings
4. **Rate limiting** : Limiter les tentatives de connexion
5. **Email verification** : Vérifier l'email lors de l'inscription
6. **Mot de passe oublié** : Ajouter reset password

## 🧪 Test

```bash
# Tester l'inscription
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123","username":"Test User"}'

# Tester la connexion
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

## 📞 Support

Si vous avez des questions, consultez :
- [Vercel Postgres Docs](https://vercel.com/docs/storage/vercel-postgres)
- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
