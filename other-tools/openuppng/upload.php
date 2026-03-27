<?php
// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Create uploads directory if it doesn't exist
$uploadDir = __DIR__ . '/uploads/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Clean up old files (older than 3 days)
require_once __DIR__ . '/cleanup.php';
cleanupOldFiles();

// Check if file was uploaded
if (!isset($_FILES['image'])) {
    echo json_encode(['success' => false, 'error' => '沒有上傳檔案']);
    exit;
}

$file = $_FILES['image'];

// Check for upload errors
if ($file['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(['success' => false, 'error' => '上傳失敗: ' . $file['error']]);
    exit;
}

// Validate file size (max 10MB)
$maxSize = 10 * 1024 * 1024;
if ($file['size'] > $maxSize) {
    echo json_encode(['success' => false, 'error' => '檔案太大，最大限制為 10MB']);
    exit;
}

// Get image info
$imageInfo = @getimagesize($file['tmp_name']);
if ($imageInfo === false) {
    echo json_encode(['success' => false, 'error' => '無效的圖片檔案']);
    exit;
}

// Create image resource based on type
$sourceImage = null;
switch ($imageInfo[2]) {
    case IMAGETYPE_JPEG:
        $sourceImage = @imagecreatefromjpeg($file['tmp_name']);
        break;
    case IMAGETYPE_PNG:
        $sourceImage = @imagecreatefrompng($file['tmp_name']);
        break;
    case IMAGETYPE_GIF:
        $sourceImage = @imagecreatefromgif($file['tmp_name']);
        break;
    case IMAGETYPE_BMP:
        $sourceImage = @imagecreatefrombmp($file['tmp_name']);
        break;
    case IMAGETYPE_WEBP:
        $sourceImage = @imagecreatefromwebp($file['tmp_name']);
        break;
    default:
        echo json_encode(['success' => false, 'error' => '不支援的圖片格式']);
        exit;
}

if ($sourceImage === false) {
    echo json_encode(['success' => false, 'error' => '無法處理圖片']);
    exit;
}

// Generate unique filename
$filename = uniqid('img_', true) . '.png';
$filepath = $uploadDir . $filename;

// Convert to PNG and save
$success = imagepng($sourceImage, $filepath, 9);
imagedestroy($sourceImage);

if (!$success) {
    echo json_encode(['success' => false, 'error' => '儲存圖片失敗']);
    exit;
}

// Get the base URL
$protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
$host = $_SERVER['HTTP_HOST'];
$scriptPath = dirname($_SERVER['PHP_SELF']);
$baseUrl = $protocol . '://' . $host . $scriptPath;

// Return success response
echo json_encode([
    'success' => true,
    'filename' => $filename,
    'url' => $baseUrl . '/uploads/' . $filename,
    'size' => filesize($filepath),
    'timestamp' => time()
]);
