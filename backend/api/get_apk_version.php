<?php
// REST API Endpoint: Fetch Latest APK Release Version and Download URL
require_once '../config/db.php';

try {
    $stmt = $pdo->query("SELECT version_name AS versionName, version_code AS versionCode, download_url AS downloadUrl, release_notes AS releaseNotes, is_force_update AS isForceUpdate, released_at AS releasedAt FROM apk_releases ORDER BY version_code DESC LIMIT 1");
    $latest = $stmt->fetch();

    if ($latest) {
        $latest['versionCode'] = (int)$latest['versionCode'];
        $latest['isForceUpdate'] = (bool)$latest['isForceUpdate'];
    }

    echo json_encode([
        "success" => true,
        "data" => $latest
    ], JSON_PRETTY_PRINT);

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error loading APK version."
    ]);
}
?>
