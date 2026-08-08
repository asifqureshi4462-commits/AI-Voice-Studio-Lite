<?php
// REST API Endpoint: Returns active AI API Keys & Provider configurations to Android App
require_once '../config/db.php';

try {
    $stmt = $pdo->prepare("SELECT provider_id AS providerId, provider_name AS providerName, base_url AS baseUrl, api_key AS apiKey, is_enabled AS isEnabled, is_default AS isDefault, max_text_length AS maxTextLength FROM providers WHERE is_enabled = 1");
    $stmt->execute();
    $providers = $stmt->fetchAll();

    foreach ($providers as &$p) {
        $p['isEnabled'] = (bool)$p['isEnabled'];
        $p['isDefault'] = (bool)$p['isDefault'];
        $p['maxTextLength'] = (int)$p['maxTextLength'];
    }

    echo json_encode([
        "success" => true,
        "message" => "API Providers configuration loaded.",
        "data" => $providers
    ], JSON_PRETTY_PRINT);

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Failed to fetch providers: " . $e->getMessage()
    ]);
}
?>
