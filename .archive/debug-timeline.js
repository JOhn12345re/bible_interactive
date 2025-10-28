// Script de debug pour vérifier les données de la timeline
const fs = require('fs');
const path = require('path');

// Lire le fichier service
const serviceFile = fs.readFileSync(path.join(__dirname, 'src/services/completeTimelineService.ts'), 'utf-8');

// Rechercher les événements problématiques
const lines = serviceFile.split('\n');
let foundEvents = [];

lines.forEach((line, index) => {
  if (line.includes('Le Veau d\'or') || line.includes('Le Serpent d\'airain')) {
    foundEvents.push({
      lineNumber: index + 1,
      content: line.trim()
    });
  }
});

console.log('=== ÉVÉNEMENTS TROUVÉS ===');
foundEvents.forEach(event => {
  console.log(`Ligne ${event.lineNumber}: ${event.content}`);
});

// Vérifier l'encodage des caractères spéciaux
console.log('\n=== VÉRIFICATION ENCODAGE ===');
const testStrings = [
  'Le Veau d\'or',
  'Le Serpent d\'airain'
];

testStrings.forEach(str => {
  console.log(`"${str}" → Encodage: ${Buffer.from(str, 'utf8').toString('hex')}`);
});