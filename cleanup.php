<?php
/**
 * Cleanup old files (older than 3 days)
 */
function cleanupOldFiles() {
    $uploadDir = __DIR__ . '/uploads/';
    
    if (!file_exists($uploadDir)) {
        return;
    }
    
    // 3 days in seconds
    $maxAge = 3 * 24 * 60 * 60;
    $now = time();
    
    $files = glob($uploadDir . '*.png');
    
    foreach ($files as $file) {
        if (is_file($file)) {
            $fileAge = $now - filemtime($file);
            
            // Delete if older than 3 days
            if ($fileAge > $maxAge) {
                @unlink($file);
            }
        }
    }
}
