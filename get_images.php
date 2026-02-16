<?php
// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Clean up old files first
require_once __DIR__ . '/cleanup.php';
cleanupOldFiles();

$uploadDir = __DIR__ . '/uploads/';

if (!file_exists($uploadDir)) {
    echo json_encode(['success' => true, 'images' => []]);
    exit;
}

// Get the base URL
$protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
$host = $_SERVER['HTTP_HOST'];
$scriptPath = dirname($_SERVER['PHP_SELF']);
$baseUrl = $protocol . '://' . $host . $scriptPath;

// Get all PNG files
$files = glob($uploadDir . '*.png');
$images = [];

// Sort by modification time (newest first)
usort($files, function($a, $b) {
    return filemtime($b) - filemtime($a);
});

foreach ($files as $file) {
    if (is_file($file)) {
        $filename = basename($file);
        $mtime = filemtime($file);
        $expiresIn = (3 * 24 * 60 * 60) - (time() - $mtime); // Seconds until expiration
        
        $images[] = [
            'filename' => $filename,
            'url' => $baseUrl . '/uploads/' . $filename,
            'size' => filesize($file),
            'uploaded' => $mtime,
            'expiresIn' => max(0, $expiresIn)
        ];
    }
}

echo json_encode([
    'success' => true,
    'images' => $images
]);
