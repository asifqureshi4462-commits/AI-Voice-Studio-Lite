<?php
// REST API Endpoint: User Credits Remaining Check
require_once '../config/db.php';

$user = verifyAuthToken($pdo);

if (!$user) {
    echo json_encode([
        "success" => false,
        "message" => "Unauthorized access."
    ]);
    exit();
}

echo json_encode([
    "success" => true,
    "creditsRemaining" => (int)$user['credits_remaining'],
    "subscriptionPlan" => $user['subscription_plan']
], JSON_PRETTY_PRINT);
?>
