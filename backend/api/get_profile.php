<?php
// REST API Endpoint: User Profile Information
require_once '../config/db.php';

$user = verifyAuthToken($pdo);

if (!$user) {
    echo json_encode([
        "success" => false,
        "message" => "Unauthorized access. Valid Bearer Token required."
    ]);
    exit();
}

echo json_encode([
    "success" => true,
    "user" => [
        "id" => $user['id'],
        "userToken" => $user['user_token'],
        "fullName" => $user['full_name'],
        "email" => $user['email'],
        "subscriptionPlan" => $user['subscription_plan'],
        "creditsRemaining" => (int)$user['credits_remaining'],
        "status" => $user['status'],
        "createdAt" => $user['created_at']
    ]
], JSON_PRETTY_PRINT);
?>
