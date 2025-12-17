<?php

/**
 * 配置文件範例
 *
 * 使用方式：
 * 1. 複製此文件為 config.php
 * 2. 填入您的實際配置資訊
 * 3. 確保 config.php 在 .gitignore 中（不要提交到版本控制）
 */

return [
    // Firebase 配置
    'appId' => 'your-app-id',
    'firebaseConfig' => [
        'apiKey' => 'your-firebase-api-key',
        'authDomain' => 'your-project.firebaseapp.com',
        'projectId' => 'your-project-id',
        'storageBucket' => 'your-project.appspot.com',
        'messagingSenderId' => 'your-sender-id',
        'appId' => 'your-app-id'
    ],
    'initialAuthToken' => null, // 或您的自訂 token

    // Gemini API Key
    'geminiApiKey' => 'your-gemini-api-key'
];
