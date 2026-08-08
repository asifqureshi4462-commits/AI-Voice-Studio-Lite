<?php
// REST API Endpoint: Handles Voice Generation Request, deducts user credits, logs generation history
require_once '../config/db.php';

$user = verifyAuthToken($pdo);

if (!$user) {
    echo json_encode([
        "success" => false,
        "message" => "Authentication required to generate voice audio."
    ]);
    exit();
}

if ($user['credits_remaining'] <= 0) {
    echo json_encode([
        "success" => false,
        "message" => "Insufficient credits! Please upgrade subscription or purchase credits."
    ]);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true) ?? $_POST;

$promptText = trim($input['prompt'] ?? $input['text'] ?? '');
$charCode = trim($input['character_code'] ?? 'narrator_deep');
$languageCode = trim($input['language'] ?? 'en-US');
$styleId = trim($input['style'] ?? 'default');

if (empty($promptText)) {
    echo json_encode([
        "success" => false,
        "message" => "Prompt text cannot be empty."
    ]);
    exit();
}

try {
    // Deduct 1 credit from user
    $newCredits = $user['credits_remaining'] - 1;
    $stmtUpdate = $pdo->prepare("UPDATE users SET credits_remaining = ? WHERE id = ?");
    $stmtUpdate->execute([$newCredits, $user['id']]);

    // Sample audio URL generation
    $audioFileName = "speech_" . time() . "_" . rand(1000, 9999) . ".mp3";
    $audioUrl = "https://yourwebsite.com/storage/audio/" . $audioFileName;
    $duration = round(strlen($promptText) * 0.08 + 1.2, 1);

    // Insert into generations table
    $stmtGen = $pdo->prepare("INSERT INTO generations (user_id, prompt_text, char_code, language_code, style_id, audio_url, duration_seconds) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmtGen->execute([$user['id'], $promptText, $charCode, $languageCode, $styleId, $audioUrl, $duration]);
    $generationId = $pdo->lastInsertId();

    echo json_encode([
        "success" => true,
        "message" => "Audio generated successfully!",
        "data" => [
            "id" => $generationId,
            "textPrompt" => $promptText,
            "characterName" => $charCode,
            "language" => $languageCode,
            "voiceStyle" => $styleId,
            "audioUrl" => $audioUrl,
            "durationSeconds" => $duration,
            "creditsRemaining" => $newCredits,
            "createdAt" => date('Y-m-d H:i:s')
        ]
    ], JSON_PRETTY_PRINT);

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Generation error: " . $e->getMessage()
    ]);
}
?>
