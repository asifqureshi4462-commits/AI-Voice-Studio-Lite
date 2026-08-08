<?php
// REST API Endpoint: Loads dynamic Voice Characters for Android App
require_once '../config/db.php';

try {
    $category = $_GET['category'] ?? 'ALL';
    
    $query = "SELECT char_code AS id, name, gender, category, avatar, description, style_count AS styleCount, is_popular AS isPopular, is_premium AS isPremium, pitch_offset AS pitchOffset FROM characters WHERE status = 'ACTIVE'";
    $params = [];

    if ($category !== 'ALL' && !empty($category)) {
        $query .= " AND category = ?";
        $params[] = $category;
    }
    
    $query .= " ORDER BY id ASC";

    $stmt = $pdo->prepare($query);
    $stmt->execute($params);
    $characters = $stmt->fetchAll();

    foreach ($characters as &$char) {
        $char['isPopular'] = (bool)$char['isPopular'];
        $char['isPremium'] = (bool)$char['isPremium'];
        $char['pitchOffset'] = (float)$char['pitchOffset'];
        $char['styleCount'] = (int)$char['styleCount'];
    }

    echo json_encode([
        "success" => true,
        "message" => "Characters fetched successfully from website backend.",
        "count" => count($characters),
        "data" => $characters
    ], JSON_PRETTY_PRINT);

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error loading characters: " . $e->getMessage()
    ]);
}
?>
