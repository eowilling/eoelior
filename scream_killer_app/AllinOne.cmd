@echo off
chcp 65001 >nul
setlocal EnableDelayedExpansion
title ScreamKiller 終極修復版 (v2.0)
color 0A

echo ========================================================
echo       🎤 ScreamKiller 演唱會尖叫消除器 - 修復版
echo ========================================================
echo.
echo [系統] 正在準備環境...

:: --- 步驟 0: 自動產生 requirements.txt ---
echo [初始化] 正在建立設定檔...
(
echo streamlit
echo demucs
echo pydub
echo moviepy
echo torch
echo torchaudio
echo audioop-lts
echo torchcodec
) > requirements.txt

:: --- 步驟 1: 自動產生 Python 主程式 ---
echo [初始化] 正在釋放核心程式碼...
:: 使用更穩定的方法提取 Python 代碼
powershell -Command "$c = Get-Content '%~f0' -Encoding UTF8 -Raw; $parts = $c -split ':: ---PYTHON_START---'; if ($parts.Length -gt 1) { $py = $parts[1] -split ':: ---PYTHON_END---'; [System.IO.File]::WriteAllText('scream_killer_web.py', $py[0].Trim(), [System.Text.Encoding]::UTF8) }"

if not exist "scream_killer_web.py" (
    echo [嚴重錯誤] 無法產生 Python 程式碼檔案。
    echo 請確認您儲存此檔案時編碼為 UTF-8。
    pause
    exit /b
)

:: --- 步驟 2: 檢查 Python ---
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [錯誤] 找不到 Python！
    echo 請先安裝 Python 3.9 以上版本。
    echo 下載網址: https://www.python.org/downloads/
    echo ⚠️ 安裝時務必勾選 "Add Python to PATH"
    pause
    exit /b
)

:: --- 步驟 3: 檢查與下載 FFmpeg (使用 curl + tar) ---
ffmpeg -version >nul 2>&1
if %errorlevel% neq 0 (
    if not exist "ffmpeg.exe" (
        echo [下載] 正在下載 FFmpeg 音訊元件 (使用 curl)...
        curl -L -o ffmpeg.zip "https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip"
        
        if not exist "ffmpeg.zip" (
            echo [失敗] 下載失敗，請檢查網路連線。
            pause
            exit /b
        )

        echo [解壓] 正在解壓縮...
        :: 使用 Windows 內建 tar 指令解壓
        tar -xf ffmpeg.zip
        
        echo [安裝] 正在配置檔案...
        :: 從解壓出來的資料夾中尋找 exe 並移動
        for /f "delims=" %%D in ('dir /b /ad ffmpeg-*') do (
            if exist "%%D\bin\ffmpeg.exe" (
                copy "%%D\bin\ffmpeg.exe" "." >nul
                copy "%%D\bin\ffprobe.exe" "." >nul
                rd /s /q "%%D"
            )
        )
        del "ffmpeg.zip"
    )
    :: 再次檢查是否成功
    if not exist "ffmpeg.exe" (
        echo [錯誤] FFmpeg 安裝失敗。
        echo 請手動下載 FFmpeg 並將 bin 資料夾內的 ffmpeg.exe 放入此目錄。
        pause
        exit /b
    )
    set PATH=%CD%;%PATH%
)

:: --- 步驟 4: 建立虛擬環境與安裝套件 ---
if not exist "venv" (
    echo [安裝] 首次執行正在建立環境...
    python -m venv venv
)

echo [啟動] 正在載入 AI 模組...
call venv\Scripts\activate

:: 檢查 pip 是否能運作
python -m pip --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [錯誤] Python 環境異常 (pip 無法執行)。
    pause
    exit /b
)

pip freeze | findstr "demucs" >nul
if %errorlevel% neq 0 (
    echo [安裝] 正在下載 AI 模型 (這可能需要 3-5 分鐘)...
    echo        如果卡住不動，請耐心等待，不要關閉。
    pip install -r requirements.txt
    if %errorlevel% neq 0 (
        echo [失敗] 套件安裝失敗。請檢查網路或 Python 版本。
        pause
        exit /b
    )
)

echo.
echo ========================================================
echo                🚀 準備發射！
echo ========================================================
echo [系統] 網頁即將開啟...
echo.

:: --- 步驟 5: 啟動 ---
set PATH=%CD%;%PATH%
streamlit run scream_killer_web.py

pause
exit /b

:: ----------------------------------------------------------
:: 下方是 Python 程式碼區域，請勿修改
:: ----------------------------------------------------------
:: ---PYTHON_START---
import streamlit as st
import os
import subprocess
import sys
import tempfile
import shutil
import math
from pathlib import Path
from pydub import AudioSegment
from moviepy import VideoFileClip, AudioFileClip
from functools import reduce

# 設定 Favicon
page_icon = "🎤"
if os.path.exists("image.png"):
    page_icon = "image.png"

st.set_page_config(page_title="ScreamKiller", page_icon=page_icon, layout="centered")

# 顯示幸運符
if os.path.exists("lucky_charm.png"):
    st.sidebar.image("lucky_charm.png", caption="🙏 乖乖保佑，調音順利")

st.markdown("""
<style>
    .stButton>button { width: 100%; border-radius: 20px; height: 3em; font-weight: bold; }
    .stProgress > div > div > div > div { background-color: #FF4B4B; }
</style>
""", unsafe_allow_html=True)

def check_dependencies():
    try:
        subprocess.run(["ffmpeg", "-version"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        return True
    except FileNotFoundError:
        return False


from functools import reduce

def format_time_str(seconds):
    """將秒數轉為 MM:SS 或 HH:MM:SS"""
    m, s = divmod(int(seconds), 60)
    h, m = divmod(m, 60)
    if h > 0:
        return f"{h:02d}:{m:02d}:{s:02d}"
    return f"{m:02d}:{s:02d}"

def parse_time_str(time_str):
    """將 HH:MM:SS 或 MM:SS 轉為秒數"""
    try:
        parts = list(map(int, time_str.strip().split(':')))
        if len(parts) == 1: return parts[0] # SS
        if len(parts) == 2: return parts[0]*60 + parts[1] # MM:SS
        if len(parts) == 3: return parts[0]*3600 + parts[1]*60 + parts[2] # HH:MM:SS
        return 0.0
    except:
        return 0.0

def apply_smart_limiter(vocals_audio, ref_ranges, target_ranges=None, sensitivity=1.0):
    # 1. 計算參考基準 (串接所有參考片段)
    ref_segments = []
    for start, end in ref_ranges:
        s_ms, e_ms = int(start * 1000), int(end * 1000)
        # 邊界檢查
        if s_ms < 0: s_ms = 0
        if e_ms > len(vocals_audio): e_ms = len(vocals_audio)
        
        if s_ms < e_ms:
            ref_segments.append(vocals_audio[s_ms:e_ms])
    
    if not ref_segments: 
        # 如果沒有參考片段，回傳原音訊 (或依賴全域設定)
        return vocals_audio
        
    # FIX: 使用 reduce 避免 sum() 與 int 0 相加導致的 TypeError
    reference_audio = reduce(lambda a, b: a + b, ref_segments)
    ref_max_db = reference_audio.max_dBFS
    threshold_db = ref_max_db - (2 * sensitivity)

    # 2. 準備抑制區段查詢表
    target_zones = []
    if target_ranges:
        for start, end in target_ranges:
            target_zones.append((int(start * 1000), int(end * 1000)))

    # 準備參考區段查詢表 (用於保全)
    ref_zones_lookup = []
    for start, end in ref_ranges:
        s_ms, e_ms = int(start * 1000), int(end * 1000)
        if s_ms < e_ms:
            ref_zones_lookup.append((s_ms, e_ms))

    def is_in_target_zone(ms):
        for s, e in target_zones:
            if s <= ms < e: return True
        return False

    def is_in_ref_zone(ms):
        for s, e in ref_zones_lookup:
            if s <= ms < e: return True
        return False
    
    chunk_size = 50 
    chunks = []
    
    # 優化遍歷邏輯
    for i in range(0, len(vocals_audio), chunk_size):
        chunk = vocals_audio[i:i+chunk_size]
        
        # 優先檢查是否在「參考保全區」
        if is_in_ref_zone(i):
             # 絕對保全：不管多大聲都不抑制
             chunks.append(chunk)
             continue

        # 決定衰減倍率 與 強制衰減量
        if is_in_target_zone(i):
            aggression = 5.0  # 再提升 Limiter 強度
            chunk = chunk - 15 # 強制先砍 15dB (針對殺豬聲)
        else:
            aggression = 2.5
        
        if chunk.max_dBFS > threshold_db:
            excess_db = chunk.max_dBFS - threshold_db
            attenuation = excess_db * aggression
            chunks.append(chunk - attenuation)
        else:
            chunks.append(chunk)
            
    # FIX: 同樣使用 reduce 合併 chunks，比 sum(chunks) 更安全且高效
    if not chunks: return vocals_audio
    return reduce(lambda a, b: a + b, chunks)

import re

def get_video_duration(file_path):
    """使用 FFmpeg 直接讀取影片長度 (比 MoviePy 更穩健)"""
    try:
        # 使用 ffmpeg -i 讀取資訊 (輸出在 stderr)
        cmd = ["ffmpeg", "-i", str(file_path)]
        result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        
        # 尋找 "Duration: 00:00:00.00"
        match = re.search(r"Duration: (\d{2}):(\d{2}):(\d{2}\.\d+)", result.stderr)
        if match:
            h, m, s = map(float, match.groups())
            return h * 3600 + m * 60 + s
            
        clip = VideoFileClip(str(file_path))
        duration = clip.duration
        clip.close()
        return duration
    except:
        return 0

def process_video(uploaded_file, mode, vocal_vol, ref_ranges, target_ranges, progress_bar, status_text):
    temp_dir = Path(tempfile.mkdtemp())
    input_path = temp_dir / uploaded_file.name
    output_filename = f"{input_path.stem}_fixed.mp4"
    output_path = temp_dir / output_filename
    
    status_text.text("📂 讀取檔案中...")
    with open(input_path, "wb") as f:
        f.write(uploaded_file.getbuffer())
        
    try:
        status_text.markdown("🧠 **AI 分離音軌中...**")
        progress_bar.progress(10)
        cmd = ["demucs", "-n", "htdemucs", "--two-stems=vocals", "-o", str(temp_dir), str(input_path)]
        process = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        stdout, stderr = process.communicate()
        if process.returncode != 0: raise Exception(f"Demucs Error: {stderr.decode()}")
        progress_bar.progress(50)
        
        track_dir = temp_dir / "htdemucs" / input_path.stem
        if not track_dir.exists(): raise Exception("無法找到音軌")

        vocals = AudioSegment.from_wav(track_dir / "vocals.wav")
        no_vocals = AudioSegment.from_wav(track_dir / "no_vocals.wav") 

        status_text.text("🎚️ 智慧混音中...")
        if mode == "手動調整模式":
            gain_db = -100 if vocal_vol == 0 else 10 * math.log10(vocal_vol)
            vocals_processed = vocals + gain_db
        else:
            status_text.text(f"🤖 分析參考片段...")
            vocals_pre = vocals - 6
            vocals_processed = apply_smart_limiter(vocals_pre, ref_ranges, target_ranges)

        instrumental = no_vocals + 1.5
        final_mix = vocals_processed.overlay(instrumental)
        
        # 整體均值優化 (Normalization -1dB)
        final_mix = final_mix.normalize(headroom=1.0)
        
        mixed_audio_path = temp_dir / "final_mix.m4a"
        final_mix.export(mixed_audio_path, format="ipod", bitrate="320k")
        progress_bar.progress(75)

        status_text.text("🎬 合成影片中 (Remuxing)...")
        # 改用 FFmpeg 直接合成 (Copy Stream + Reverb)
        cmd_ffmpeg = [
            'ffmpeg', '-y',
            '-i', str(input_path),
            '-i', str(mixed_audio_path),
            '-filter_complex', '[1:a]aecho=0.8:0.88:30:0.3[reverb]',
            '-map', '0:v',
            '-map', '[reverb]',
            '-c:v', 'copy',
            '-c:a', 'aac',
            '-b:a', '256k',
            '-shortest',
            str(output_path)
        ]
        
        process_ffmpeg = subprocess.run(cmd_ffmpeg, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if process_ffmpeg.returncode != 0:
             cmd_fallback = [
                'ffmpeg', '-y',
                '-i', str(input_path),
                '-i', str(mixed_audio_path),
                '-map', '0:v',
                '-map', '1:a',
                '-c:v', 'copy',
                '-c:a', 'aac',
                '-b:a', '256k',
                '-shortest',
                str(output_path)
             ]
             subprocess.run(cmd_fallback, check=True)

        progress_bar.progress(100)
        status_text.text("✅ 完成！")
        
        with open(output_path, "rb") as f: return f.read(), output_filename
    except Exception as e:
        status_text.error(f"錯誤: {str(e)}")
        return None, None
    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)

st.title("🎤 ScreamKiller")
st.caption("演唱會尖叫聲消除神器 (v2.2 直覺操作版)")

# 1. 先上傳
uploaded_file = st.file_uploader("步驟 1: 請先上傳影片 (MP4/MOV)", type=["mp4", "mov"])

if uploaded_file:
    # 立即寫入暫存以取得資訊
    temp_dir = Path(tempfile.gettempdir()) / "scream_killer_uploads"
    temp_dir.mkdir(exist_ok=True)
    temp_file_path = temp_dir / uploaded_file.name
    
    with open(temp_file_path, "wb") as f:
        f.write(uploaded_file.getbuffer())
        
    duration = get_video_duration(temp_file_path)
    dur_str = format_time_str(duration)
    st.success(f"📂 已讀取影片: {uploaded_file.name} (長度: {dur_str})")

    st.markdown("---")
    st.subheader("步驟 2: 設定調音參數")
    
    mode = st.radio("選擇模式", ["手動調整模式", "智慧參考模式 (推薦)"])
    vocal_vol = 0.2
    ref_ranges = []
    target_ranges = []

    if mode == "手動調整模式":
        vocal_vol = st.slider("人聲保留比例", 0.0, 1.0, 0.2)
        if st.button("🚀 開始處理", type="primary"):
             if not check_dependencies(): st.error("❌ 系統缺少 FFmpeg")
             else:
                pb = st.progress(0)
                stt = st.empty()
                data, name = process_video(temp_file_path, mode, vocal_vol, [], [], pb, stt)
                if data: st.download_button("⬇️ 下載影片", data, name, "video/mp4")

    else:
        st.info(f"💡 請使用時間碼輸入範圍 (例如: 00:00 - {dur_str})")
        
        c1, c2 = st.columns(2)
        with c1:
            st.markdown("**1. 歌手聲音參考** (用於建立人聲模型)")
            if 'ref_count' not in st.session_state: st.session_state.ref_count = 1
            
            for i in range(st.session_state.ref_count):
                cols = st.columns([0.45, 0.1, 0.45])
                s_str = cols[0].text_input(f"開始", value="00:10", key=f"rs_{i}", placeholder="MM:SS")
                cols[1].markdown("<div style='text-align: center; padding-top: 10px;'>至</div>", unsafe_allow_html=True)
                e_str = cols[2].text_input(f"結束", value="00:15", key=f"re_{i}", placeholder="MM:SS")
                
                s_sec = parse_time_str(s_str)
                e_sec = parse_time_str(e_str)
                ref_ranges.append((s_sec, e_sec))
                
            if st.button("➕ 增加參考段"): st.session_state.ref_count += 1

        with c2:
            st.markdown("**2. 加強抑制區** (重點消除尖叫)")
            if 'target_count' not in st.session_state: st.session_state.target_count = 0
            
            for i in range(st.session_state.target_count):
                cols = st.columns([0.45, 0.1, 0.45])
                s_str = cols[0].text_input(f"開始", value="00:00", key=f"ts_{i}", placeholder="MM:SS")
                cols[1].markdown("<div style='text-align: center; padding-top: 10px;'>至</div>", unsafe_allow_html=True)
                e_str = cols[2].text_input(f"結束", value="00:05", key=f"te_{i}", placeholder="MM:SS")
                
                s_sec = parse_time_str(s_str)
                e_sec = parse_time_str(e_str)
                target_ranges.append((s_sec, e_sec))
                
            if st.button("➕ 增加抑制段"): st.session_state.target_count += 1
            
        st.markdown("---")
        if st.button("🚀 開始處理", type="primary"):
            if not check_dependencies(): st.error("❌ 系統缺少 FFmpeg")
            else:
                pb = st.progress(0)
                stt = st.empty()
                data, name = process_video(temp_file_path, mode, vocal_vol, ref_ranges, target_ranges, pb, stt)
                if data: st.download_button("⬇️ 下載影片", data, name, "video/mp4")
else:
    st.info("👋 請先上傳影片以開始使用")
:: ---PYTHON_END---