const http = require('http');

console.log('🧪 Test simple de l\'API Bible\n');

const options = {
  hostname: 'localhost',
  port: 3002,
  path: '/health',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers:`, res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', data);
    try {
      const json = JSON.parse(data);
      console.log('✅ API fonctionne !');
      console.log('Success:', json.success);
      console.log('Message:', json.message);
    } catch (error) {
      console.log('❌ Erreur de parsing JSON');
      console.log('Raw data:', data);
    }
  });
});

req.on('error', (error) => {
  console.log('❌ Erreur de connexion:', error.message);
  console.log('Vérifiez que le serveur est démarré sur le port 3002');
});

req.setTimeout(5000, () => {
  console.log('⏰ Timeout - Le serveur ne répond pas');
  req.destroy();
});

req.end();
