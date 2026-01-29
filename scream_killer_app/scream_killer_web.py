import streamlit as st
import os
import subprocess
import sys
import tempfile
import shutil
import math
from pathlib import Path
from pydub import AudioSegment
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

    # 準備參考區段查詢表 (用於人聲保全)
    ref_zones_lookup = []
    for start, end in ref_ranges:
        s_ms, e_ms = int(start * 1000), int(end * 1000)
        if s_ms < e_ms:
            ref_zones_lookup.append((s_ms, e_ms))

    def is_in_ref_zone(ms):
        for s, e in ref_zones_lookup:
            if s <= ms < e: return True
        return False

    def is_in_target_zone(ms):
        for s, e in target_zones:
            if s <= ms < e: return True
        return False
    
    chunk_size = 50 
    chunks = []
    
    # 優化遍歷邏輯
    for i in range(0, len(vocals_audio), chunk_size):
        chunk = vocals_audio[i:i+chunk_size]
        
        # [優化] 人聲保全模式：若在參考區段內，強制跳過抑制
        if is_in_ref_zone(i):
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

def get_video_duration(file_path):
    try:
        clip = VideoFileClip(str(file_path))
        duration = clip.duration
        clip.close()
        return duration
    except:
        return 0

def process_video(input_path, mode, vocal_vol, ref_ranges, target_ranges, progress_bar, status_text):
    temp_dir = Path(tempfile.mkdtemp())
    # input_path 已經是暫存好的檔案路徑
    
    output_filename = f"{input_path.stem}_fixed.mp4"
    output_path = temp_dir / output_filename
    
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
        
        # [優化] 整體均值標準化: 提升整體響度至 -1dB，確保音量飽滿一致
        final_mix = final_mix.normalize(headroom=1.0)
        
        mixed_audio_path = temp_dir / "final_mix.m4a"
        # 使用最高音質輸出中間檔 (ipod format = m4a/aac)
        final_mix.export(mixed_audio_path, format="ipod", bitrate="320k")
        progress_bar.progress(75)

        status_text.text("🎬 合成影片中 (Remuxing)...")
        
        # [優化] 使用 FFmpeg 極速合成指令
        # 1. -c:v copy: 影像不轉檔直接複製 (速度快10倍，畫質無損)
        # 2. aecho: 加入微量混響 (0.8:0.88:30:0.3) 讓 AI 音色更自然
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
        
        # 執行 FFmpeg
        process_ffmpeg = subprocess.run(cmd_ffmpeg, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
        # 如果 Filter 失敗 (極少見)，Fallback 到簡單合成
        if process_ffmpeg.returncode != 0:
             print(f"FFmpeg Reverb Warning: {process_ffmpeg.stderr.decode()}")
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
        st.error(f"錯誤: {str(e)}")
        return None, None
    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)

st.title("🎤 ScreamKiller")
st.caption("演唱會尖叫聲消除神器 (v2.2 直覺操作版)")

# 1. 先上傳
uploaded_file = st.file_uploader("步驟 1: 請先上傳影片 (MP4/MOV)", type=["mp4", "mov"])

if uploaded_file:
    # 立即寫入暫存以取得資訊
    # 使用 session_state 避免重複寫入? 簡單起見先直接寫
    temp_dir_upload = Path(tempfile.gettempdir()) / "scream_killer_uploads"
    temp_dir_upload.mkdir(exist_ok=True)
    temp_file_path = temp_dir_upload / uploaded_file.name
    
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
                shutil.rmtree(temp_dir_upload, ignore_errors=True) # Clean up uploaded temp file

    else:
        st.info(f"💡 請使用時間碼輸入範圍 (例如: 00:00 - {dur_str})")
        
        c1, c2 = st.columns(2)
        with c1:
            st.markdown("**1. 歌手聲音參考** (用於建立人聲模型)")
            if 'ref_count' not in st.session_state: st.session_state.ref_count = 1
            
            for i in range(st.session_state.ref_count):
                cols = st.columns([0.45, 0.1, 0.45])
                s_str = cols[0].text_input(f"參考{i+1} 開始", value="00:10", key=f"rs_{i}", placeholder="MM:SS")
                cols[1].markdown("<div style='text-align: center; padding-top: 10px;'>至</div>", unsafe_allow_html=True)
                e_str = cols[2].text_input(f"參考{i+1} 結束", value="00:15", key=f"re_{i}", placeholder="MM:SS")
                
                s_sec = parse_time_str(s_str)
                e_sec = parse_time_str(e_str)
                ref_ranges.append((s_sec, e_sec))
                
            if st.button("➕ 增加參考段"): st.session_state.ref_count += 1

        with c2:
            st.markdown("**2. 加強抑制區** (重點消除尖叫)")
            if 'target_count' not in st.session_state: st.session_state.target_count = 0
            
            for i in range(st.session_state.target_count):
                cols = st.columns([0.45, 0.1, 0.45])
                s_str = cols[0].text_input(f"抑制{i+1} 開始", value="00:00", key=f"ts_{i}", placeholder="MM:SS")
                cols[1].markdown("<div style='text-align: center; padding-top: 10px;'>至</div>", unsafe_allow_html=True)
                e_str = cols[2].text_input(f"抑制{i+1} 結束", value="00:05", key=f"te_{i}", placeholder="MM:SS")
                
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
                shutil.rmtree(temp_dir_upload, ignore_errors=True) # Clean up uploaded temp file
else:
    st.info("👋 請先上傳影片以開始使用")