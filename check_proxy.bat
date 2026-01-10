@echo off
chcp 65001 >nul
echo ========================================
echo 代理配置诊断工具
echo ========================================
echo.

echo [1] 检查系统代理设置
echo ========================================
reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyEnable 2>nul
reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyServer 2>nul
echo.

echo [2] 检查环境变量
echo ========================================
echo HTTP_PROXY: %HTTP_PROXY%
echo HTTPS_PROXY: %HTTPS_PROXY%
echo ALL_PROXY: %ALL_PROXY%
echo NO_PROXY: %NO_PROXY%
echo.

echo [3] 检查常见代理端口
echo ========================================
echo 检查本地代理服务...
netstat -ano | findstr ":7890 :7897 :10809 :1080 :8080" | findstr "LISTENING"
echo.

echo [4] 测试网络连接
echo ========================================
echo 测试 Google...
ping -n 1 www.google.com
echo.
echo 测试 GitHub...
ping -n 1 github.com
echo.

echo [5] 检查 DNS
echo ========================================
nslookup www.google.com
echo.

echo ========================================
echo 诊断完成！
echo ========================================
echo.
echo 请将以上信息截图或复制，以便进一步诊断。
echo.
pause
