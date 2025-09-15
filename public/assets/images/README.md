# 🎨 Images du jeu Bible Interactive

## 📁 Structure des assets visuels

Ce dossier contient toutes les images utilisées dans les jeux Phaser.

### 🎮 Images des cartes (OrderEventsScene)

**Note importante :** Le jeu utilise maintenant des **cartes colorées générées automatiquement** par Phaser au lieu d'images statiques. Cela évite les erreurs de chargement et permet une meilleure performance.

#### 🌈 Cartes générées automatiquement :
- `card1` - Bleu (#3B82F6)
- `card2` - Vert (#10B981) 
- `card3` - Orange (#F59E0B)
- `card4` - Rouge (#EF4444)
- `card5` - Violet (#8B5CF6)
- `card6` - Cyan (#06B6D4)

### 🖼️ Ajout d'images personnalisées (optionnel)

Si vous souhaitez ajouter des vraies images :

1. **Nommage** : 
   - `jonas_1.png`, `jonas_2.png`, etc. pour les cartes Jonas
   - `david_1.png`, `david_2.png`, etc. pour David
   - `creation_1.png`, etc. pour la Création

2. **Taille recommandée** : 120x160 pixels

3. **Format** : PNG avec fond transparent ou JPG

4. **Modification du code** : Remplacer `createColorTextures()` par un chargement d'images classique dans `preload()`

### 🎨 Style visuel recommandé

- **Illustrations bibliques respectueuses**
- **Style adapté aux enfants** (6-12 ans)
- **Couleurs vives et attrayantes**
- **Pas de représentation de Dieu en personne** (tradition orthodoxe)
- **Focus sur les actions et les symboles**

### 🔄 Statut actuel

✅ **Fonctionnel** - Cartes colorées générées automatiquement  
🔄 **En développement** - Illustrations personnalisées à venir  
📝 **Besoin** - Artiste pour créer des images bibliques adaptées aux enfants
