#!/bin/bash

# Script de déploiement pour l'API Bible
echo "🚀 Déploiement de l'API Bible..."

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: package.json non trouvé. Assurez-vous d'être dans le répertoire bible-api"
    exit 1
fi

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

# Compiler TypeScript
echo "🔨 Compilation TypeScript..."
npm run build

# Tester l'API localement
echo "🧪 Test de l'API..."
npm run test

# Déployer sur Vercel
echo "🌐 Déploiement sur Vercel..."
npx vercel --prod

echo "✅ Déploiement terminé!"
echo "🔗 Votre API est maintenant disponible en production"
