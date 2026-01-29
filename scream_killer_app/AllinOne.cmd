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
from moviepy.editor import VideoFileClip, AudioFileClip

st.set_page_config(page_title="ScreamKiller", page_icon="🎤", layout="centered")

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

def apply_smart_limiter(vocals_audio, ref_start, ref_end, sensitivity=1.0):
    start_ms = int(ref_start * 1000)
    end_ms = int(ref_end * 1000)
    if start_ms >= len(vocals_audio) or end_ms > len(vocals_audio) or start_ms >= end_ms:
        return vocals_audio
    
    reference_segment = vocals_audio[start_ms:end_ms]
    if len(reference_segment) == 0: return vocals_audio
    
    ref_max_db = reference_segment.max_dBFS
    threshold_db = ref_max_db - (2 * sensitivity)
    
    chunk_size = 50 
    chunks = []
    for i in range(0, len(vocals_audio), chunk_size):
        chunk = vocals_audio[i:i+chunk_size]
        if chunk.max_dBFS > threshold_db:
            excess_db = chunk.max_dBFS - threshold_db
            attenuation = excess_db * 1.2
            chunks.append(chunk - attenuation)
        else:
            chunks.append(chunk)
    return sum(chunks)

def process_video(uploaded_file, mode, vocal_volume, ref_times, progress_bar, status_text):
    temp_dir = Path(tempfile.mkdtemp())
    input_path = temp_dir / uploaded_file.name
    output_filename = f"{input_path.stem}_fixed.mp4"
    output_path = temp_dir / output_filename
    
    status_text.text("📂 讀取檔案中 (手機請勿鎖定螢幕)...")
    with open(input_path, "wb") as f:
        f.write(uploaded_file.getbuffer())
        
    try:
        status_text.markdown("🧠 **AI 分離音軌中...**")
        progress_bar.progress(10)
        # Force demucs to use CPU if GPU not found to avoid crash
        cmd = ["demucs", "-n", "htdemucs", "-d", "cpu", "-o", str(temp_dir), str(input_path)]
        process = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        stdout, stderr = process.communicate()
        if process.returncode != 0: raise Exception(f"Demucs Error: {stderr.decode()}")
        progress_bar.progress(50)
        
        track_dir = temp_dir / "htdemucs" / input_path.stem
        if not track_dir.exists(): raise Exception("無法找到音軌")

        vocals = AudioSegment.from_wav(track_dir / "vocals.wav")
        drums = AudioSegment.from_wav(track_dir / "drums.wav")
        bass = AudioSegment.from_wav(track_dir / "bass.wav")
        other = AudioSegment.from_wav(track_dir / "other.wav")

        status_text.text("🎚️ 智慧混音中...")
        if mode == "手動調整模式":
            gain_db = -100 if vocal_volume == 0 else 10 * math.log10(vocal_volume)
            vocals_processed = vocals + gain_db
        else:
            status_text.text(f"🤖 分析參考片段 ({ref_times[0]}s - {ref_times[1]}s)...")
            vocals_pre = vocals - 3
            vocals_processed = apply_smart_limiter(vocals_pre, ref_times[0], ref_times[1])

        instrumental = drums + bass + other + 1.5
        final_mix = vocals_processed.overlay(instrumental)
        mixed_audio_path = temp_dir / "final_mix.mp3"
        final_mix.export(mixed_audio_path, format="mp3", bitrate="320k")
        progress_bar.progress(75)

        status_text.text("🎬 合成影片中...")
        video_clip = VideoFileClip(str(input_path))
        new_audio = AudioFileClip(str(mixed_audio_path))
        final_video = video_clip.set_audio(new_audio)
        final_video.write_videofile(str(output_path), codec="libx264", audio_codec="aac", temp_audiofile=str(temp_dir/"temp.m4a"), remove_temp=True, logger=None)
        
        video_clip.close()
        new_audio.close()
        progress_bar.progress(100)
        status_text.text("✅ 完成！")
        
        with open(output_path, "rb") as f: return f.read(), output_filename
    except Exception as e:
        st.error(f"錯誤: {str(e)}")
        return None, None
    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)

st.title("🎤 ScreamKiller")
st.caption("演唱會尖叫聲消除神器")

mode = st.radio("選擇模式", ["手動調整模式", "智慧參考模式 (推薦)"])
vocal_vol = 0.2
ref_times = (0, 10)

if mode == "手動調整模式":
    vocal_vol = st.slider("人聲保留比例", 0.0, 1.0, 0.2)
else:
    st.info("💡 請輸入一段「只有歌手唱歌」的秒數範圍")
    c1, c2 = st.columns(2)
    ref_times = (c1.number_input("開始(秒)", 0, value=10), c2.number_input("結束(秒)", 0, value=15))

uploaded_file = st.file_uploader("上傳影片 (MP4)", type=["mp4", "mov"])
if uploaded_file and st.button("🚀 開始處理", type="primary"):
    if not check_dependencies(): st.error("❌ 系統缺少 FFmpeg")
    else:
        pb = st.progress(0)
        stt = st.empty()
        data, name = process_video(uploaded_file, mode, vocal_volume, ref_times, pb, stt)
        if data: st.download_button("⬇️ 下載影片", data, name, "video/mp4")
:: ---PYTHON_END---