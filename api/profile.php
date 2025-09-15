<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Gérer les requêtes OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configuration de la base de données
$host = 'localhost';
$dbname = 'bible_interactive';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Erreur de connexion à la base de données']);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        handleGet($pdo);
        break;
    case 'POST':
        handlePost($pdo);
        break;
    case 'PUT':
        handlePut($pdo);
        break;
    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Méthode non autorisée']);
}

function handleGet($pdo) {
    $id = $_GET['id'] ?? null;
    
    if ($id) {
        // Récupérer un profil spécifique
        $stmt = $pdo->prepare("SELECT * FROM user_profiles WHERE id = ?");
        $stmt->execute([$id]);
        $profile = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($profile) {
            echo json_encode(['success' => true, 'profile' => $profile]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Profil non trouvé']);
        }
    } else {
        // Récupérer le dernier profil (pour la démo)
        $stmt = $pdo->prepare("SELECT * FROM user_profiles ORDER BY created_at DESC LIMIT 1");
        $stmt->execute();
        $profile = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($profile) {
            echo json_encode(['success' => true, 'profile' => $profile]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Aucun profil trouvé']);
        }
    }
}

function handlePost($pdo) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Données JSON invalides']);
        return;
    }
    
    // Validation des données
    $required = ['firstName', 'lastName', 'age', 'church'];
    foreach ($required as $field) {
        if (empty($input[$field])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => "Le champ $field est obligatoire"]);
            return;
        }
    }
    
    // Vérifier si le profil existe déjà (par email ou nom)
    $stmt = $pdo->prepare("SELECT id FROM user_profiles WHERE email = ? OR (first_name = ? AND last_name = ?)");
    $stmt->execute([$input['email'] ?? '', $input['firstName'], $input['lastName']]);
    $existing = $stmt->fetch();
    
    if ($existing) {
        // Mettre à jour le profil existant
        $stmt = $pdo->prepare("
            UPDATE user_profiles 
            SET first_name = ?, last_name = ?, age = ?, church = ?, email = ?, updated_at = NOW()
            WHERE id = ?
        ");
        $stmt->execute([
            $input['firstName'],
            $input['lastName'],
            $input['age'],
            $input['church'],
            $input['email'] ?? null,
            $existing['id']
        ]);
        
        echo json_encode(['success' => true, 'id' => $existing['id'], 'action' => 'updated']);
    } else {
        // Créer un nouveau profil
        $stmt = $pdo->prepare("
            INSERT INTO user_profiles (first_name, last_name, age, church, email, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, NOW(), NOW())
        ");
        $stmt->execute([
            $input['firstName'],
            $input['lastName'],
            $input['age'],
            $input['church'],
            $input['email'] ?? null
        ]);
        
        $id = $pdo->lastInsertId();
        echo json_encode(['success' => true, 'id' => $id, 'action' => 'created']);
    }
}

function handlePut($pdo) {
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $_GET['id'] ?? null;
    
    if (!$id || !$input) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'ID et données requis']);
        return;
    }
    
    $stmt = $pdo->prepare("
        UPDATE user_profiles 
        SET first_name = ?, last_name = ?, age = ?, church = ?, email = ?, updated_at = NOW()
        WHERE id = ?
    ");
    $stmt->execute([
        $input['firstName'],
        $input['lastName'],
        $input['age'],
        $input['church'],
        $input['email'] ?? null,
        $id
    ]);
    
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'id' => $id]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Profil non trouvé']);
    }
}
?>
