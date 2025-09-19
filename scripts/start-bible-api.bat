@echo off
echo Démarrage de l'API Bible...
cd "C:\Users\sheno\OneDrive\Bureau\bible-api"
echo Vérification de la présence de Node.js...
node --version
if %errorlevel% neq 0 (
    echo Erreur: Node.js n'est pas installé ou n'est pas dans le PATH
    pause
    exit /b 1
)

echo Installation des dépendances si nécessaire...
if not exist "node_modules" (
    echo Installation des dépendances...
    npm install
)

echo Démarrage de l'API Bible en mode développement...
npm run dev
