# Cursor 网络问题完整解决方案

## 🎯 您的情况分析

根据诊断结果：
- ✅ 网络直连正常（可以访问 Google、GitHub）
- ✅ 不需要代理服务器
- ⚠️ Cursor 可能有其他配置问题

---

## 🔧 解决方案清单

### ✅ 方案 1：清理代理设置（推荐）

**操作步骤：**

1. 打开 Cursor
2. 按 `Ctrl + ,` 打开设置
3. 搜索 "proxy"
4. 确保以下设置：
   ```
   HTTP: Proxy = （留空）
   HTTP: Proxy Support = off
   HTTP: Proxy Strict SSL = 启用
   ```

5. 或在 `settings.json` 中添加：
   ```json
   {
     "http.proxy": "",
     "http.proxySupport": "off",
     "http.proxyStrictSSL": true
   }
   ```

6. 重启 Cursor

---

### ✅ 方案 2：重置 Cursor 网络设置

**Windows 操作：**

1. 关闭 Cursor
2. 按 `Win + R`，输入 `%APPDATA%`
3. 找到 `Cursor` 文件夹
4. 备份后删除以下文件/文件夹：
   - `Cursor/User/settings.json`（备份后编辑）
   - `Cursor/Cache/`
   - `Cursor/CachedData/`
   - `Cursor/GPUCache/`

5. 重新启动 Cursor

---

### ✅ 方案 3：使用系统代理模式

```json
{
  "http.proxySupport": "on"
}
```

这样 Cursor 会自动使用 Windows 系统代理设置（目前您的系统没有启用代理，所以是直连）

---

### ✅ 方案 4：检查 DNS

如果连接慢或不稳定，尝试更换 DNS：

**推荐 DNS：**
- Google DNS: `8.8.8.8` / `8.8.4.4`
- Cloudflare DNS: `1.1.1.1` / `1.0.0.1`
- HiNet DNS: `168.95.1.1` / `168.95.192.1`（台湾用户）

**更换步骤：**
1. 控制面板 → 网络和共享中心
2. 更改适配器设置
3. 右键您的网络连接 → 属性
4. 双击 "Internet 协议版本 4 (TCP/IPv4)"
5. 选择 "使用下面的 DNS 服务器地址"
6. 输入首选和备用 DNS
7. 确定并重启网络

---

### ✅ 方案 5：检查防火墙/杀毒软件

**常见问题：**
- Windows Defender 防火墙阻止 Cursor
- 第三方杀毒软件（如卡巴斯基、360）拦截

**解决方法：**
1. 打开 Windows 安全中心
2. 防火墙和网络保护 → 允许应用通过防火墙
3. 找到 Cursor 并允许专用和公用网络
4. 如有第三方杀毒软件，添加 Cursor 到白名单

---

### ✅ 方案 6：使用 Cursor 的离线模式

如果网络问题持续，可以尝试：

1. **使用本地代码补全**（不需要网络）
2. **下载模型到本地**（如支持）
3. **使用 Copilot 替代方案**

---

### ✅ 方案 7：检查 Cursor 更新

```bash
# 检查 Cursor 版本
# 帮助 → 关于
```

确保使用最新版本的 Cursor，旧版本可能有网络 bug。

---

## 🔍 进阶诊断

### 检查 Cursor 日志

1. 在 Cursor 中按 `Ctrl + Shift + P`
2. 输入 "Developer: Toggle Developer Tools"
3. 切换到 "Console" 选项卡
4. 查看是否有网络相关错误

### 常见错误及解决方法

| 错误信息 | 原因 | 解决方法 |
|---------|------|---------|
| `ECONNREFUSED` | 连接被拒绝 | 检查防火墙、代理设置 |
| `ETIMEDOUT` | 连接超时 | 增加超时时间、检查网络 |
| `CERT_ERROR` | SSL 证书错误 | 设置 `http.proxyStrictSSL: false` |
| `DNS_PROBE_FAILED` | DNS 解析失败 | 更换 DNS 服务器 |
| `PROXY_ERROR` | 代理错误 | 禁用代理 `http.proxySupport: off` |

---

## 🆘 如果以上都不行

### 最后的备用方案

**选项 A: 使用 GitHub Copilot**
```json
{
  "github.copilot.enable": true
}
```

**选项 B: 使用本地 AI 模型**
- Ollama + Continue 插件
- TabNine 本地版
- Codeium

**选项 C: 临时使用免费代理（不推荐）**

仅用于测试，不要长期使用：
```json
{
  "http.proxy": "http://免费代理地址:端口"
}
```

免费代理来源（不稳定、不安全）：
- https://www.freeproxy.world/
- https://www.proxyscrape.com/
- https://free-proxy-list.net/

---

## 📞 联系支持

如果问题仍未解决：

1. **Cursor 官方支持**
   - Discord: https://discord.gg/cursor
   - Email: support@cursor.sh

2. **社区论坛**
   - GitHub Discussions
   - Stack Overflow

3. **提供以下信息**
   - Cursor 版本
   - 操作系统版本
   - 网络环境（直连/代理）
   - 错误日志截图

---

## ✨ 快速测试

运行以下命令测试 Cursor 的网络连接：

```powershell
# 在 Cursor 的内置终端运行
curl https://api.cursor.sh/health
```

如果返回正常响应，说明网络连接正常。

---

## 📝 总结

**对于您的情况，建议：**

1. ✅ **首先尝试**：清理代理设置（方案 1）
2. ✅ **如果不行**：重置缓存（方案 2）
3. ✅ **再不行**：检查防火墙（方案 5）
4. ✅ **最后**：联系官方支持

**您的网络环境很好，不需要代理！** 问题很可能是 Cursor 配置或缓存问题。
