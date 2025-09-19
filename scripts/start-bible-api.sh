#!/bin/bash

echo "Démarrage de l'API Bible..."
cd "C:\Users\sheno\OneDrive\Bureau\bible-api"

echo "Vérification de la présence de Node.js..."
if ! command -v node &> /dev/null; then
    echo "Erreur: Node.js n'est pas installé ou n'est pas dans le PATH"
    exit 1
fi

echo "Installation des dépendances si nécessaire..."
if [ ! -d "node_modules" ]; then
    echo "Installation des dépendances..."
    npm install
fi

echo "Démarrage de l'API Bible en mode développement..."
npm run dev
