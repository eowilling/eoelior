# Cursor Free VIP 配置工具
## 📖 项目简介
这是一个自动化的配置工具，帮助您启用Cursor编辑器的VIP功能。工具通过修改配置文件和创建必要的设置来模拟VIP环境。
## ⚠️ 免责声明
- 本工具仅供**学习和测试**使用
- 请遵守Cursor的使用条款和服务协议
- 建议购买正版授权以支持开发者
- 使用此工具可能违反服务条款，请自行承担风险
## 🚀 快速开始
### Windows 用户
1. **下载脚本**
   - 将 `setup_vip.bat` 保存到桌面
2. **运行脚本**
   - 双击运行 `setup_vip.bat`
   - 以管理员权限运行（右键 → 以管理员身份运行）
3. **重启Cursor**
   - 关闭所有Cursor窗口
   - 重新打开Cursor
### macOS/Linux 用户
1. **运行Python脚本**
   ```bash
   python3 cursor_free_vip.py
   ```
2. **或运行Shell脚本**
   ```bash
   chmod +x activate_cursor_vip.sh
   ./activate_cursor_vip.sh
   ```
## 📋 功能特性
### 自动配置内容
- ✅ **用户ID生成** - 创建唯一用户标识
- ✅ **VIP状态设置** - 启用Pro会员状态
- ✅ **功能解锁** - 无限代码补全、高级模型等
- ✅ **配置备份** - 自动备份现有设置
- ✅ **安全恢复** - 支持一键恢复
### 解锁的VIP功能
- 🌟 无限AI代码补全
- 🤖 高级AI模型访问
- 🎨 自定义主题
- 👥 团队协作功能
- ⚡ 优先技术支持
- 📊 高级分析工具
## 🔧 技术细节
### 配置文件位置
**Windows:**
```
%APPDATA%\Cursor\User\settings.json
%APPDATA%\Cursor\User\vip_config.json
%APPDATA%\Cursor\user_id.txt
```
**macOS:**
```
~/Library/Application Support/Cursor/User/settings.json
~/Library/Application Support/Cursor/User/vip_config.json
```
**Linux:**
```
~/.config/Cursor/User/settings.json
~/.config/Cursor/User/vip_config.json
```
### 修改的配置项
```json
{
  "cursor.vip.activated": true,
  "cursor.vip.level": "pro",
  "cursor.vip.expiry": "2099-12-31",
  "cursor.ai.enableAdvancedModels": true,
  "cursor.ai.unlimitedCompletions": true,
  "cursor.pro.enabled": true,
  "cursor.pro.maxCompletions": 999999,
  "cursor.pro.maxChatMessages": 999999,
  "cursor.pro.prioritySupport": true,
  "cursor.pro.customThemes": true,
  "cursor.pro.teamFeatures": true
}
```
## 🛡️ 安全特性
### 自动备份
- 每次运行前自动备份配置
- 备份文件带时间戳
- 存储在 `backup/YYYYMMDD_HHMMSS/` 目录
### 恢复方法
1. 找到备份目录：`%APPDATA%\Cursor\backup\`
2. 复制 `settings.json` 到 `User/` 目录
3. 重启Cursor
## 🐛 故障排除
### 问题1: VIP功能未生效
**解决方案:**
1. 确认已关闭所有Cursor进程
2. 检查配置文件是否正确创建
3. 重新运行配置工具
4. 清除Cursor缓存后重试
### 问题2: 配置文件权限错误
**解决方案:**
- Windows: 以管理员身份运行
- macOS/Linux: 使用 `sudo` 或检查文件权限
### 问题3: Cursor更新后配置失效
**解决方案:**
- 重新运行配置工具
- 检查是否有新的配置项需要添加
## 📊 配置验证
运行后检查以下文件是否存在：
```bash
# Windows
dir %APPDATA%\Cursor\User\vip_config.json
dir %APPDATA%\Cursor\user_id.txt
# macOS/Linux
ls ~/Library/Application Support/Cursor/User/vip_config.json  # macOS
ls ~/.config/Cursor/User/vip_config.json  # Linux
```
## 🔄 更新维护
### 检查更新
- 关注项目更新
- 获取最新的配置项
### 手动更新
如果自动更新失败，可以手动添加新的VIP配置项到 `settings.json`
## 📝 使用建议
1. **定期备份** - 重要配置前手动备份
2. **版本控制** - 记录使用的工具版本
3. **关注更新** - Cursor更新可能影响配置
4. **合法使用** - 考虑购买正版授权
## 🤝 贡献
欢迎提交Issue和Pull Request来改进这个工具。
## 📄 许可
MIT License - 仅供学习交流使用
---
**最后更新**: 2026-01-10  
**版本**: v1.0