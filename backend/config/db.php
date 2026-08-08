<?php
// Website Backend Database Configuration (PHP + MySQL)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = 'localhost';
$db_name = 'ai_voice_studio';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8mb4", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection error: " . $e->getMessage()
    ]);
    exit();
}

/**
 * Verify Authorization Header Bearer Token against api_tokens & users tables
 */
function verifyAuthToken($pdo) {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    
    if (empty($authHeader) || !preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
        return null; // Guest or unauthenticated request
    }
    
    $token = trim($matches[1]);
    
    $stmt = $pdo->prepare("SELECT u.* FROM users u JOIN api_tokens t ON u.id = t.user_id WHERE t.token = ? AND t.expires_at > NOW() AND u.status = 'ACTIVE'");
    $stmt->execute([$token]);
    return $stmt->fetch();
}
?>
