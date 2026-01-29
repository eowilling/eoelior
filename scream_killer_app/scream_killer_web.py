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

    def is_in_target_zone(ms):
        for s, e in target_zones:
            if s <= ms < e: return True
        return False
    
    chunk_size = 50 
    chunks = []
    
    # 優化遍歷邏輯
    for i in range(0, len(vocals_audio), chunk_size):
        chunk = vocals_audio[i:i+chunk_size]
        
        # 決定衰減倍率
        aggression = 4.0 if is_in_target_zone(i) else 2.5
        
        if chunk.max_dBFS > threshold_db:
            excess_db = chunk.max_dBFS - threshold_db
            attenuation = excess_db * aggression
            chunks.append(chunk - attenuation)
        else:
            chunks.append(chunk)
            
    # FIX: 同樣使用 reduce 合併 chunks，比 sum(chunks) 更安全且高效
    if not chunks: return vocals_audio
    return reduce(lambda a, b: a + b, chunks)

def process_video(uploaded_file, mode, vocal_vol, ref_ranges, target_ranges, progress_bar, status_text):
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
            # 全域預衰減 -6dB
            vocals_pre = vocals - 6
            
            # 針對強力抑制區，額外再降 -4dB (總共 -10dB)
            # 這裡為了簡單，我們先用演算法內的 aggression 控制動態，
            # 若要針對區段做靜態音量降低比較複雜，我們先專注於動態 Limiter 的雙層邏輯
            vocals_processed = apply_smart_limiter(vocals_pre, ref_ranges, target_ranges)

        instrumental = no_vocals + 1.5
        final_mix = vocals_processed.overlay(instrumental)
        mixed_audio_path = temp_dir / "final_mix.mp3"
        final_mix.export(mixed_audio_path, format="mp3", bitrate="320k")
        progress_bar.progress(75)

        status_text.text("🎬 合成影片中...")
        video_clip = VideoFileClip(str(input_path))
        new_audio = AudioFileClip(str(mixed_audio_path))
        final_video = video_clip.without_audio().with_audio(new_audio)
        # 優化輸出參數：preset='medium' 平衡速度與畫質，audio_bitrate='320k' 確保高音質
        final_video.write_videofile(
            str(output_path), 
            codec="libx264", 
            audio_codec="aac", 
            audio_bitrate="320k",
            preset="medium",
            temp_audiofile=str(temp_dir/"temp.m4a"), 
            remove_temp=True, 
            logger=None
        )
        
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
st.caption("演唱會尖叫聲消除神器 (v2.1 多段增強版)")

mode = st.radio("選擇模式", ["手動調整模式", "智慧參考模式 (推薦)"])
vocal_vol = 0.2
ref_ranges = []
target_ranges = []

if mode == "手動調整模式":
    vocal_vol = st.slider("人聲保留比例", 0.0, 1.0, 0.2)
else:
    st.info("💡 請設定參考與加強抑制區段")
    
    c1, c2 = st.columns(2)
    with c1:
        st.markdown("**1. 歌手聲音參考 (越多段越準)**")
        if 'ref_count' not in st.session_state: st.session_state.ref_count = 1
        
        for i in range(st.session_state.ref_count):
            fc1, fc2 = st.columns(2)
            s = fc1.number_input(f"參考{i+1} 開始", 0.0, value=10.0, key=f"rs_{i}")
            e = fc2.number_input(f"參考{i+1} 結束", 0.0, value=15.0, key=f"re_{i}")
            ref_ranges.append((s, e))
            
        if st.button("➕ 增加參考段"): st.session_state.ref_count += 1

    with c2:
        st.markdown("**2. 尖叫加強抑制區 (可選)**")
        if 'target_count' not in st.session_state: st.session_state.target_count = 0
        
        for i in range(st.session_state.target_count):
            tc1, tc2 = st.columns(2)
            s = tc1.number_input(f"抑制{i+1} 開始", 0.0, value=0.0, key=f"ts_{i}")
            e = tc2.number_input(f"抑制{i+1} 結束", 0.0, value=5.0, key=f"te_{i}")
            target_ranges.append((s, e))
            
        if st.button("➕ 增加抑制段"): st.session_state.target_count += 1

uploaded_file = st.file_uploader("上傳影片 (MP4)", type=["mp4", "mov"])
if uploaded_file and st.button("🚀 開始處理", type="primary"):
    if not check_dependencies(): st.error("❌ 系統缺少 FFmpeg")
    else:
        pb = st.progress(0)
        stt = st.empty()
        data, name = process_video(uploaded_file, mode, vocal_vol, ref_ranges, target_ranges, pb, stt)
        if data: st.download_button("⬇️ 下載影片", data, name, "video/mp4")