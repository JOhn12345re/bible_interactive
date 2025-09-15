# 🧪 Test de la Base de Données

## ✅ Vérifications à effectuer

### 1. Test de connexion
Ouvrez dans votre navigateur : `http://localhost/api/test_connection.php`

**Résultat attendu :**
```json
{
  "success": true,
  "message": "Connexion à la base de données réussie !",
  "database": "bible_interactive",
  "tables": ["profiles", "items", "favorites", "progress", "statistics"],
  "profiles_count": 2,
  "sample_profiles": [...]
}
```

### 2. Test d'initialisation
Ouvrez dans votre navigateur : `http://localhost/api/init_database.php`

**Résultat attendu :**
```json
{
  "success": true,
  "message": "Base de données initialisée avec succès !",
  "database": "bible_interactive",
  "tables": ["profiles", "items", "favorites", "progress", "statistics"],
  "source": "Fichier SQL existant utilisé"
}
```

### 3. Test de l'API de profil
Ouvrez dans votre navigateur : `http://localhost/api/profile.php`

**Résultat attendu :**
```json
{
  "success": true,
  "profile": {
    "id": 1,
    "firstName": "Jean",
    "lastName": "Dupont",
    "age": 29,
    "church": "Église A",
    "email": "jean.dupont@example.com",
    "isComplete": true,
    "createdAt": "2025-09-16 00:00:00",
    "updatedAt": "2025-09-16 00:00:00"
  }
}
```

### 4. Test dans l'application React
1. Ouvrez votre site : `http://localhost:3000`
2. Cliquez sur le bouton "Compléter profil" ou "👤 [Nom]"
3. Remplissez le formulaire
4. Cliquez "Sauvegarder"
5. Vérifiez que le profil est sauvegardé

## 🔧 Dépannage

### Erreur "Not Found"
- Vérifiez que Apache est démarré dans XAMPP
- Vérifiez que les fichiers sont dans `C:\xampp\htdocs\api\`

### Erreur de connexion MySQL
- Vérifiez que MySQL est démarré dans XAMPP
- Vérifiez que le port 3306 est libre

### Erreur "Base de données non trouvée"
- Exécutez d'abord `http://localhost/api/init_database.php`
- Vérifiez que le fichier SQL existe : `D:\XAMPP\htdocs\Bible interactive\data_base\-- databasesetup.sql.txt`

### Erreur CORS dans React
- Vérifiez que l'URL dans `profileStore.ts` pointe vers `http://localhost/api/profile.php`
- Vérifiez que les headers CORS sont présents dans l'API PHP

## 📊 Vérification dans phpMyAdmin

1. Ouvrez : `http://localhost/phpmyadmin`
2. Sélectionnez la base `bible_interactive`
3. Vérifiez les tables :
   - `profiles` (2 enregistrements de test)
   - `items` (2 enregistrements de test)
   - `favorites` (1 enregistrement de test)
   - `progress` (1 enregistrement de test)
   - `statistics` (2 enregistrements de test)

## 🎯 Test complet

1. **Initialisation** : `http://localhost/api/init_database.php`
2. **Connexion** : `http://localhost/api/test_connection.php`
3. **API Profil** : `http://localhost/api/profile.php`
4. **Application** : `http://localhost:3000` → Profil → Formulaire → Sauvegarder
5. **Vérification** : phpMyAdmin → Voir le nouveau profil créé

Si tous ces tests passent, votre base de données est correctement connectée ! 🎉
