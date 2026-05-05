<?php
/**
 * Gemini API 代理
 * 用途: 隱藏 API Key,讓前端安全呼叫 Gemini API
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // 允許 GitHub Pages 呼叫
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// 處理 OPTIONS 請求 (CORS preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 只允許 POST 請求
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// 載入配置 (從 config.php 或環境變數)
if (file_exists(__DIR__ . '/config.php')) {
    $config = require __DIR__ . '/config.php';
    $GEMINI_API_KEY = $config['geminiApiKey'];
} else {
    $GEMINI_API_KEY = getenv('GEMINI_API_KEY');
}

if (empty($GEMINI_API_KEY)) {
    http_response_code(500);
    echo json_encode(['error' => 'API Key not configured']);
    exit;
}

// 接收前端請求
$input = json_decode(file_get_contents('php://input'), true);
$prompt = $input['prompt'] ?? '';

if (empty($prompt)) {
    http_response_code(400);
    echo json_encode(['error' => 'Prompt is required']);
    exit;
}

// 呼叫 Gemini API
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=" . $GEMINI_API_KEY;

$data = [
    'contents' => [
        [
            'parts' => [
                ['text' => $prompt]
            ]
        ]
    ]
];

$options = [
    'http' => [
        'method' => 'POST',
        'header' => 'Content-Type: application/json',
        'content' => json_encode($data),
        'timeout' => 30
    ]
];

$context = stream_context_create($options);
$result = @file_get_contents($url, false, $context);

if ($result === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to call Gemini API']);
    exit;
}

// 返回結果
echo $result;
?>
