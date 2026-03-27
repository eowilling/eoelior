
import os
import subprocess
from datetime import datetime

class GitHubSkill:
    """
    OpenClaw 的 GitHub 安全交互模組 (Open Source Model for Core Integration)
    
    這個 Class 封裝了與 GitHub 交互的核心邏輯，確保安全性：
    1. 使用 Token 進行驗證 (不儲存密碼)
    2. 限制操作的分支 (預設鎖定為測試分支)
    3. 執行基本的 Pull/Push 操作
    """

    def __init__(self, repo_url, token, target_branch='openclaw-test'):
        """
        初始化 GitHub Skill
        :param repo_url: 儲存庫 URL (例如: https://github.com/user/repo.git)
        :param token: GitHub Fine-grained Access Token
        :param target_branch: 目標操作分支 (預設為安全測試分支)
        """
        self.repo_url = repo_url
        self.token = token
        self.branch = target_branch
        # 組合帶有 Token 的 URL (注意：請勿將此 URL 輸出到 Log，以免洩漏 Token)
        self.auth_repo_url = repo_url.replace("https://", f"https://{token}@")

    def run_git_command(self, commands):
        """執行 Git 指令的通用函數"""
        try:
            result = subprocess.run(
                commands,
                check=True,
                capture_output=True,
                text=True,
                encoding='utf-8' # 確保中文顯示正常
            )
            return True, result.stdout
        except subprocess.CalledProcessError as e:
            return False, e.stderr

    def setup_safe_environment(self):
        """設定安全測試環境：切換到指定分支"""
        print(f"[*] 正在初始化安全環境，目標分支: {self.branch} ...")
        
        # 1. 檢查目前分支
        success, current_branch = self.run_git_command(['git', 'branch', '--show-current'])
        if success and current_branch.strip() == self.branch:
            print(f"[*] 已位於 {self.branch} 分支。")
            return True

        # 2. 嘗試切換分支，如果不存在則創建
        print(f"[*] 切換或創建分支...")
        success, _ = self.run_git_command(['git', 'checkout', self.branch])
        if not success:
            # 分支不存在，創建並切換
            success, msg = self.run_git_command(['git', 'checkout', '-b', self.branch])
            if success:
                print(f"[+] 成功創建並切換至測試分支: {self.branch}")
            else:
                print(f"[!] 無法創建分支: {msg}")
                return False
        return True

    def sync_updates(self):
        """從遠端安全的拉取更新 (Pull)"""
        print("[*] 正在從遠端拉取更新...")
        success, msg = self.run_git_command(['git', 'pull', self.auth_repo_url, self.branch])
        if success:
            print("[+] 更新成功！")
        else:
            print(f"[!] 更新失敗 (可能是權限問題或分支不存在): {msg}")
        return success

    def create_test_commit(self, file_name, content):
        """(測試用) 創建一個檔案並提交，測試寫入權限"""
        print(f"[*] 正在創建測試檔案: {file_name} ...")
        
        try:
            # 寫入檔案
            with open(file_name, 'w', encoding='utf-8') as f:
                f.write(content)
                f.write(f"\nCreated by OpenClaw at: {datetime.now()}")
            
            # Git Add
            self.run_git_command(['git', 'add', file_name])
            
            # Git Commit
            commit_msg = f"OpenClaw Auto-commit: Added {file_name}"
            success, msg = self.run_git_command(['git', 'commit', '-m', commit_msg])
            
            if success:
                print(f"[+] 本地提交成功: {commit_msg}")
                return True
            else:
                if "nothing to commit" in msg:
                    print("[!] 沒有變更需要提交。")
                else:
                    print(f"[!] 提交失敗: {msg}")
                return False
        except Exception as e:
            print(f"[!] 檔案操作錯誤: {e}")
            return False

    def push_changes(self):
        """將變更推送至遠端 (Push)"""
        print(f"[*] 正在推送變更至遠端 {self.branch} ...")
        success, msg = self.run_git_command(['git', 'push', self.auth_repo_url, self.branch])
        if success:
            print("[+] 推送成功！OpenClaw 已成功驗證寫入權限。")
            return True
        else:
            print(f"[!] 推送失敗 (請檢查 Token 權限): {msg}")
            return False

# =================用例示範=================
if __name__ == "__main__":
    # 這裡填入您的設定
    # 注意：實際使用時，Token 應從環境變數讀取，不應直接寫在代碼中
    REPO_URL = "https://github.com/eowilling/eoelior.git" # 假設的 Repo
    TOKEN = "github_pat_YOUR_TOKEN_HERE" # 請替換為您的 Fine-grained Token
    
    # 初始化 OpenClaw GitHub 技能模組
    claw_skill = GitHubSkill(REPO_URL, TOKEN)
    
    # 執行安全測試流程
    if claw_skill.setup_safe_environment():
        # 1. 嘗試拉取
        claw_skill.sync_updates()
        
        # 2. 嘗試寫入一個測試檔
        if claw_skill.create_test_commit("openclaw_signal.txt", "Hello from OpenClaw Core Model!"):
            # 3. 嘗試推送
            claw_skill.push_changes()
