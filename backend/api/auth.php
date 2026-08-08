<?php
// REST API Endpoint: User Registration & Authentication (Login)
require_once '../config/db.php';

$input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
$action = $input['action'] ?? 'login';
$email = trim($input['email'] ?? '');
$password = trim($input['password'] ?? '');
$fullName = trim($input['full_name'] ?? 'App User');

if (empty($email) || empty($password)) {
    echo json_encode([
        "success" => false,
        "message" => "Email and password are required."
    ]);
    exit();
}

try {
    if ($action === 'register') {
        // Check if email exists
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            echo json_encode([
                "success" => false,
                "message" => "Account already exists with this email."
            ]);
            exit();
        }

        // Fetch free credits setting
        $stmtCredit = $pdo->prepare("SELECT setting_value FROM app_settings WHERE setting_key = 'free_credits_new_user'");
        $stmtCredit->execute();
        $freeCredits = (int)($stmtCredit->fetchColumn() ?: 50);

        $userToken = bin2hex(random_bytes(16));
        $passHash = password_hash($password, PASSWORD_BCRYPT);

        $stmt = $pdo->prepare("INSERT INTO users (user_token, full_name, email, password_hash, credits_remaining) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$userToken, $fullName, $email, $passHash, $freeCredits]);
        $userId = $pdo->lastInsertId();

        // Generate Bearer Token
        $authToken = bin2hex(random_bytes(32));
        $expiresAt = date('Y-m-d H:i:s', strtotime('+30 days'));
        
        $stmtToken = $pdo->prepare("INSERT INTO api_tokens (user_id, token, expires_at) VALUES (?, ?, ?)");
        $stmtToken->execute([$userId, $authToken, $expiresAt]);

        echo json_encode([
            "success" => true,
            "message" => "Registration successful!",
            "token" => $authToken,
            "user" => [
                "id" => $userId,
                "email" => $email,
                "fullName" => $fullName,
                "subscriptionPlan" => "FREE",
                "creditsRemaining" => $freeCredits
            ]
        ], JSON_PRETTY_PRINT);

    } else { // Login
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($password, $user['password_hash'])) {
            echo json_encode([
                "success" => false,
                "message" => "Invalid email or password."
            ]);
            exit();
        }

        if ($user['status'] === 'BLOCKED') {
            echo json_encode([
                "success" => false,
                "message" => "Account suspended. Please contact support."
            ]);
            exit();
        }

        // Generate or refresh token
        $authToken = bin2hex(random_bytes(32));
        $expiresAt = date('Y-m-d H:i:s', strtotime('+30 days'));

        $stmtToken = $pdo->prepare("INSERT INTO api_tokens (user_id, token, expires_at) VALUES (?, ?, ?)");
        $stmtToken->execute([$user['id'], $authToken, $expiresAt]);

        echo json_encode([
            "success" => true,
            "message" => "Login successful!",
            "token" => $authToken,
            "user" => [
                "id" => $user['id'],
                "email" => $user['email'],
                "fullName" => $user['full_name'],
                "subscriptionPlan" => $user['subscription_plan'],
                "creditsRemaining" => (int)$user['credits_remaining']
            ]
        ], JSON_PRETTY_PRINT);
    }

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Auth error: " . $e->getMessage()
    ]);
}
?>
