<?php
// REST API Endpoint: Fetch Subscription Plans
require_once '../config/db.php';

try {
    $stmt = $pdo->query("SELECT plan_code AS planCode, title, price_formatted AS priceFormatted, credits_per_month AS creditsPerMonth, features, is_popular AS isPopular FROM subscriptions ORDER BY id ASC");
    $plans = $stmt->fetchAll();

    foreach ($plans as &$p) {
        $p['isPopular'] = (bool)$p['isPopular'];
        $p['creditsPerMonth'] = (int)$p['creditsPerMonth'];
    }

    echo json_encode([
        "success" => true,
        "data" => $plans
    ], JSON_PRETTY_PRINT);

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error loading subscriptions."
    ]);
}
?>
