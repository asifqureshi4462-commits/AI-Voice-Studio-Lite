<?php
// REST API Endpoint: Global App Settings (Maintenance Mode, Free Credits, Min App Version, Banner Ads)
require_once '../config/db.php';

try {
    $stmt = $pdo->query("SELECT setting_key, setting_value FROM app_settings");
    $settings = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);

    // Get latest version release
    $stmtVer = $pdo->query("SELECT * FROM apk_releases ORDER BY version_code DESC LIMIT 1");
    $latestRelease = $stmtVer->fetch();

    echo json_encode([
        "success" => true,
        "data" => [
            "appName" => $settings['app_name'] ?? 'AI Voice Studio',
            "maintenanceMode" => ($settings['maintenance_mode'] ?? '0') === '1',
            "minAppVersion" => $settings['min_app_version'] ?? '1.0.0',
            "freeCreditsNewUser" => (int)($settings['free_credits_new_user'] ?? 50),
            "bannerAdUnitId" => $settings['banner_ad_unit_id'] ?? '',
            "interstitialAdUnitId" => $settings['interstitial_ad_unit_id'] ?? '',
            "latestRelease" => $latestRelease ? [
                "versionName" => $latestRelease['version_name'],
                "versionCode" => (int)$latestRelease['version_code'],
                "downloadUrl" => $latestRelease['download_url'],
                "releaseNotes" => $latestRelease['release_notes'],
                "isForceUpdate" => (bool)$latestRelease['is_force_update']
            ] : null
        ]
    ], JSON_PRETTY_PRINT);

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error fetching app settings: " . $e->getMessage()
    ]);
}
?>
