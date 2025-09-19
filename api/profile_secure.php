<?php
// Headers de sécurité
header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
header('Referrer-Policy: strict-origin-when-cross-origin');

// CORS sécurisé - remplacer * par votre domaine
$allowed_origins = ['http://localhost:3000', 'https://votre-domaine.com'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
}
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Max-Age: 86400');

// Gérer les requêtes OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Rate limiting simple
session_start();
$ip = $_SERVER['REMOTE_ADDR'];
$key = 'rate_limit_' . $ip;
$requests = $_SESSION[$key] ?? 0;
$last_request = $_SESSION[$key . '_time'] ?? 0;

if (time() - $last_request < 60) { // 1 minute
    if ($requests > 10) { // Max 10 requêtes par minute
        http_response_code(429);
        echo json_encode(['success' => false, 'error' => 'Trop de requêtes']);
        exit();
    }
    $_SESSION[$key] = $requests + 1;
} else {
    $_SESSION[$key] = 1;
    $_SESSION[$key . '_time'] = time();
}

// Configuration sécurisée de la base de données
$host = $_ENV['DB_HOST'] ?? 'localhost';
$dbname = $_ENV['DB_NAME'] ?? 'bible_interactive';
$username = $_ENV['DB_USER'] ?? 'root';
$password = $_ENV['DB_PASS'] ?? '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ]);
} catch (PDOException $e) {
    error_log('Database connection error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Erreur de connexion à la base de données']);
    exit();
}

// Validation et sanitisation des données
function validateInput($data, $rules) {
    $errors = [];
    
    foreach ($rules as $field => $rule) {
        $value = $data[$field] ?? null;
        
        if ($rule['required'] && empty($value)) {
            $errors[] = "Le champ $field est obligatoire";
            continue;
        }
        
        if ($value) {
            // Sanitisation
            $value = trim($value);
            $value = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
            
            // Validation par type
            switch ($rule['type']) {
                case 'email':
                    if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
                        $errors[] = "Email invalide";
                    }
                    break;
                case 'int':
                    if (!is_numeric($value) || $value < 0) {
                        $errors[] = "Age invalide";
                    }
                    break;
                case 'string':
                    if (strlen($value) > ($rule['max_length'] ?? 255)) {
                        $errors[] = "Champ $field trop long";
                    }
                    break;
            }
        }
    }
    
    return $errors;
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
        // Validation de l'ID
        if (!is_numeric($id) || $id <= 0) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'ID invalide']);
            return;
        }
        
        $stmt = $pdo->prepare("SELECT id, first_name, last_name, age, church, email, created_at FROM user_profiles WHERE id = ?");
        $stmt->execute([$id]);
        $profile = $stmt->fetch();
        
        if ($profile) {
            echo json_encode(['success' => true, 'profile' => $profile]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Profil non trouvé']);
        }
    } else {
        $stmt = $pdo->prepare("SELECT id, first_name, last_name, age, church, email, created_at FROM user_profiles ORDER BY created_at DESC LIMIT 1");
        $stmt->execute();
        $profile = $stmt->fetch();
        
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
    
    // Règles de validation
    $rules = [
        'firstName' => ['required' => true, 'type' => 'string', 'max_length' => 50],
        'lastName' => ['required' => true, 'type' => 'string', 'max_length' => 50],
        'age' => ['required' => true, 'type' => 'int'],
        'church' => ['required' => true, 'type' => 'string', 'max_length' => 100],
        'email' => ['required' => false, 'type' => 'email', 'max_length' => 100]
    ];
    
    $errors = validateInput($input, $rules);
    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => implode(', ', $errors)]);
        return;
    }
    
    // Vérifier si le profil existe déjà
    $stmt = $pdo->prepare("SELECT id FROM user_profiles WHERE email = ? OR (first_name = ? AND last_name = ?)");
    $stmt->execute([$input['email'] ?? '', $input['firstName'], $input['lastName']]);
    $existing = $stmt->fetch();
    
    if ($existing) {
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
    
    if (!$id || !is_numeric($id) || $id <= 0) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'ID invalide']);
        return;
    }
    
    if (!$input) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Données JSON invalides']);
        return;
    }
    
    // Même validation que POST
    $rules = [
        'firstName' => ['required' => true, 'type' => 'string', 'max_length' => 50],
        'lastName' => ['required' => true, 'type' => 'string', 'max_length' => 50],
        'age' => ['required' => true, 'type' => 'int'],
        'church' => ['required' => true, 'type' => 'string', 'max_length' => 100],
        'email' => ['required' => false, 'type' => 'email', 'max_length' => 100]
    ];
    
    $errors = validateInput($input, $rules);
    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => implode(', ', $errors)]);
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
