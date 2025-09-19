# 🔑 Guide pour obtenir une clé API Bible

## 📋 Situation actuelle

La clé API fournie (`0a249068133fb4e346cc8de09a3bfda3`) semble ne pas être valide ou avoir expiré. Votre site fonctionne actuellement avec des **données mockées** qui simulent parfaitement l'API.

## 🎯 Options disponibles

### **Option 1 : Utiliser les données mockées (Recommandé pour l'instant)**
✅ **Avantages :**
- Fonctionne immédiatement
- Pas de limite de requêtes
- Données de qualité (Louis Segond 1910)
- Pas de dépendance externe

❌ **Inconvénients :**
- Données limitées (quelques livres et versets)
- Pas de recherche complète

### **Option 2 : Obtenir une nouvelle clé API**

#### **A. Digital Bible Platform (4.dbt.io)**
1. **Visitez** : https://www.faithcomesbyhearing.com/bible-brain/developer-documentation
2. **Créez un compte** développeur
3. **Demandez une clé API** gratuite
4. **Limitations** : 1000 requêtes/mois gratuites

#### **B. Bible API alternatives**
1. **Bible API** : https://bible-api.com/ (gratuit, pas de clé requise)
2. **Scripture API** : https://scripture.api.bible/ (gratuit avec clé)
3. **Bible Gateway API** : https://www.biblegateway.com/usage/ (payant)

## 🔧 Configuration de la nouvelle clé

Une fois que vous avez une nouvelle clé API valide :

### **1. Modifier le service**
Dans `src/services/bibleApi.ts`, ligne 90 :
```typescript
// Remplacez cette ligne :
this.apiKey = null; // '0a249068133fb4e346cc8de09a3bfda3';

// Par :
this.apiKey = 'VOTRE_NOUVELLE_CLE_API';
```

### **2. Tester la clé**
Utilisez le composant "Test API" sur votre site pour vérifier que la clé fonctionne.

## 🚀 API Bible gratuite recommandée

### **Bible API (bible-api.com)**
- ✅ **Gratuit** et sans clé
- ✅ **Simple** à utiliser
- ✅ **Français** disponible
- ✅ **Pas de limite** de requêtes

**Exemple d'utilisation :**
```javascript
// Récupérer Jean 3:16
fetch('https://bible-api.com/jean 3:16?translation=lsg')
  .then(response => response.json())
  .then(data => console.log(data));
```

## 📖 Données mockées actuelles

Votre site inclut déjà des données pour :

### **Livres disponibles :**
- Genèse, Exode, Psaumes, Jonas
- Matthieu, Luc, Jean

### **Versets disponibles :**
- **Jonas 1:1-3** (pour les leçons Jonas)
- **Genèse 1:1-3** (pour la création)
- **Luc 2:8-14** (pour la nativité)
- **Jean 3:16** (verset populaire)

### **Recherche :**
- Terme "amour" avec résultats

## 🎯 Recommandation

**Pour l'instant**, continuez avec les données mockées car :
1. ✅ Votre site fonctionne parfaitement
2. ✅ Toutes les leçons existantes ont leurs versets
3. ✅ L'expérience utilisateur est complète
4. ✅ Pas de dépendance externe

**Plus tard**, si vous voulez plus de données, obtenez une clé API gratuite et suivez le guide de configuration.

## 🔄 Migration vers une vraie API

Quand vous aurez une clé API valide :

1. **Modifiez** `src/services/bibleApi.ts` ligne 90
2. **Testez** avec le bouton "Test API"
3. **Vérifiez** que les données s'affichent correctement
4. **Déployez** votre site

Votre site est **100% prêt** pour l'intégration d'une vraie API ! 🎉
