// Test simple de l'API Bible
const http = require('http');

const testEndpoint = (path, description) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3002,
      path: path,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          console.log(`✅ ${description}`);
          console.log(`   Status: ${res.statusCode}`);
          console.log(`   Success: ${jsonData.success}`);
          if (jsonData.message) {
            console.log(`   Message: ${jsonData.message}`);
          }
          console.log('');
          resolve(jsonData);
        } catch (error) {
          console.log(`❌ ${description} - Erreur de parsing JSON`);
          console.log(`   Status: ${res.statusCode}`);
          console.log(`   Data: ${data.substring(0, 200)}...`);
          console.log('');
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.log(`❌ ${description} - Erreur de connexion`);
      console.log(`   Error: ${error.message}`);
      console.log('');
      reject(error);
    });

    req.setTimeout(5000, () => {
      console.log(`⏰ ${description} - Timeout`);
      console.log('');
      req.destroy();
      reject(new Error('Timeout'));
    });

    req.end();
  });
};

const runTests = async () => {
  console.log('🧪 Test de l\'API Bible\n');
  
  try {
    // Test de santé
    await testEndpoint('/health', 'Test de santé de l\'API');
    
    // Test de la documentation
    await testEndpoint('/api', 'Test de la documentation API');
    
    // Test des livres
    await testEndpoint('/api/books', 'Test de la liste des livres');
    
    // Test d'un livre spécifique
    await testEndpoint('/api/books/genese', 'Test d\'un livre spécifique (Genèse)');
    
    // Test des thèmes
    await testEndpoint('/api/topics', 'Test de la liste des thèmes');
    
    // Test d'un thème spécifique
    await testEndpoint('/api/topics/foi', 'Test d\'un thème spécifique (foi)');
    
    // Test du verset du jour
    await testEndpoint('/api/verse-of-the-day', 'Test du verset du jour');
    
    // Test de recherche
    await testEndpoint('/api/search?q=amour', 'Test de recherche (amour)');
    
    console.log('🎉 Tous les tests sont passés avec succès !');
    
  } catch (error) {
    console.log('❌ Certains tests ont échoué');
    console.log('   Assurez-vous que l\'API est démarrée sur le port 3002');
    console.log('   Commande: npm run dev');
  }
};

// Attendre un peu avant de lancer les tests
setTimeout(runTests, 2000);
