<?php
// REST API Endpoint: Fetch User Voice Generation History
require_once '../config/db.php';

$user = verifyAuthToken($pdo);

if (!$user) {
    echo json_encode([
        "success" => false,
        "message" => "Unauthorized access."
    ]);
    exit();
}

try {
    $stmt = $pdo->prepare("SELECT id, prompt_text AS textPrompt, char_code AS characterName, language_code AS language, style_id AS voiceStyle, audio_url AS audioPath, duration_seconds AS durationSeconds, file_size_formatted AS fileSizeFormatted, created_at AS createdAt FROM generations WHERE user_id = ? ORDER BY id DESC LIMIT 50");
    $stmt->execute([$user['id']]);
    $history = $stmt->fetchAll();

    foreach ($history as &$item) {
        $item['durationSeconds'] = (float)$item['durationSeconds'];
    }

    echo json_encode([
        "success" => true,
        "count" => count($history),
        "data" => $history
    ], JSON_PRETTY_PRINT);

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error loading history: " . $e->getMessage()
    ]);
}
?>
