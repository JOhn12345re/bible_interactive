# 🗄️ Configuration de la Base de Données

## Prérequis

1. **XAMPP installé** sur votre système
2. **Apache et MySQL démarrés** dans le panneau de contrôle XAMPP

## Étapes d'installation

### 1. Démarrer XAMPP
- Ouvrez le panneau de contrôle XAMPP
- Démarrez **Apache** et **MySQL**
- Vérifiez que les ports 80 (Apache) et 3306 (MySQL) sont actifs

### 2. Accéder à phpMyAdmin
- Ouvrez votre navigateur
- Allez sur `http://localhost/phpmyadmin`
- Connectez-vous (par défaut: utilisateur `root`, mot de passe vide)

### 3. Créer la base de données
- Cliquez sur "Nouvelle base de données"
- Nom: `bible_interactive`
- Interclassement: `utf8mb4_unicode_ci`
- Cliquez "Créer"

### 4. Importer le schéma
- Sélectionnez la base `bible_interactive`
- Cliquez sur l'onglet "Importer"
- Choisissez le fichier `database/setup.sql`
- Cliquez "Exécuter"

### 5. Vérifier l'installation
Vous devriez voir ces tables créées:
- `user_profiles` - Profils utilisateurs
- `user_favorites` - Favoris des utilisateurs
- `lesson_progress` - Progrès des leçons
- `usage_stats` - Statistiques d'usage

## Configuration de l'API

### Structure des dossiers
```
votre-projet/
├── api/
│   └── profile.php          # API pour les profils
├── database/
│   └── setup.sql           # Script de création
└── src/                    # Code React
```

### Test de l'API
1. Placez le fichier `api/profile.php` dans le dossier `htdocs` de XAMPP
2. Testez l'API: `http://localhost/api/profile.php`

## Utilisation

### Créer un profil
```javascript
const profile = {
  firstName: "Jean",
  lastName: "Dupont", 
  age: 25,
  church: "Église Orthodoxe",
  email: "jean@example.com"
}

// Sauvegarder
await saveProfileToServer(profile)
```

### Récupérer un profil
```javascript
// Récupérer le dernier profil
const success = await loadProfileFromServer()

// Récupérer un profil spécifique
const success = await loadProfileFromServer("123")
```

## Sécurité

⚠️ **Important**: En production, changez:
- Le mot de passe MySQL par défaut
- Les paramètres de connexion dans `api/profile.php`
- Activez HTTPS
- Ajoutez une authentification appropriée

## Dépannage

### Erreur de connexion
- Vérifiez que MySQL est démarré dans XAMPP
- Vérifiez les paramètres dans `api/profile.php`
- Testez la connexion: `http://localhost/api/profile.php`

### Erreur de permissions
- Vérifiez que le dossier `api/` est dans `htdocs`
- Vérifiez les permissions de lecture/écriture

### Base de données non trouvée
- Vérifiez que la base `bible_interactive` existe
- Réimportez le fichier `setup.sql`

## Données de test

Le script `setup.sql` inclut des utilisateurs de test:
- Jean Dupont (Église Orthodoxe)
- Marie Martin (Église Catholique)  
- Pierre Durand (Église Protestante)

Vous pouvez les utiliser pour tester l'application.
