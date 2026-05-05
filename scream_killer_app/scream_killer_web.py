import streamlit as st
import os
import subprocess
import sys
import tempfile
import shutil
import math
import re
from pathlib import Path
from pydub import AudioSegment
from functools import reduce
from typing import List, Tuple, Optional
import logging

# 設定日誌
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# 設定頁面配置（必須在最前面）
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

def parse_time_str(time_str: str) -> float:
    """將 HH:MM:SS 或 MM:SS 轉為秒數"""
    try:
        time_str = time_str.strip()
        if not time_str:
            return 0.0
        parts = list(map(int, time_str.split(':')))
        if len(parts) == 1: 
            return float(parts[0]) # SS
        if len(parts) == 2: 
            return float(parts[0]*60 + parts[1]) # MM:SS
        if len(parts) == 3: 
            return float(parts[0]*3600 + parts[1]*60 + parts[2]) # HH:MM:SS
        return 0.0
    except (ValueError, AttributeError) as e:
        logger.warning(f"時間解析錯誤: {time_str}, {e}")
        return 0.0

def apply_smart_limiter(vocals_audio: AudioSegment, ref_ranges: List[Tuple[float, float]], 
                        target_ranges: Optional[List[Tuple[float, float]]] = None, 
                        sensitivity: float = 1.0) -> AudioSegment:
    """智慧音頻限制器：基於參考片段動態調整音量
    
    Args:
        vocals_audio: 人聲音頻
        ref_ranges: 參考片段時間範圍列表 [(start, end), ...]
        target_ranges: 需要加強抑制的時間範圍列表
        sensitivity: 靈敏度參數
    """
    # 1. 提取並合併參考片段
    audio_duration_ms = len(vocals_audio)
    ref_segments = []
    
    for start, end in ref_ranges:
        s_ms = max(0, int(start * 1000))
        e_ms = min(audio_duration_ms, int(end * 1000))
        
        if s_ms < e_ms:
            ref_segments.append(vocals_audio[s_ms:e_ms])
    
    if not ref_segments:
        logger.warning("沒有有效的參考片段，返回原始音頻")
        return vocals_audio
    
    # 合併參考片段並計算閾值
    reference_audio = reduce(lambda a, b: a + b, ref_segments)
    ref_max_db = reference_audio.max_dBFS
    threshold_db = ref_max_db - (2 * sensitivity)

    # 2. 建立區段查詢表（優化查詢性能）
    target_zones = [(int(start * 1000), int(end * 1000)) 
                    for start, end in (target_ranges or [])]
    
    ref_zones_lookup = [(int(start * 1000), int(end * 1000)) 
                        for start, end in ref_ranges 
                        if int(start * 1000) < int(end * 1000)]
    
    def is_in_zone(ms: int, zones: List[Tuple[int, int]]) -> bool:
        """檢查毫秒位置是否在任意區段內"""
        return any(s <= ms < e for s, e in zones)
    
    is_in_ref_zone = lambda ms: is_in_zone(ms, ref_zones_lookup)
    is_in_target_zone = lambda ms: is_in_zone(ms, target_zones)
    
    # 3. 分塊處理音頻（動態限制）
    CHUNK_SIZE_MS = 50
    AGGRESSIVE_ATTENUATION = 15  # dB
    AGGRESSIVE_MULTIPLIER = 5.0
    NORMAL_MULTIPLIER = 2.5
    
    chunks = []
    total_length = len(vocals_audio)
    
    for i in range(0, total_length, CHUNK_SIZE_MS):
        chunk = vocals_audio[i:i+CHUNK_SIZE_MS]
        
        # 保護參考區段：完全保留人聲
        if is_in_ref_zone(i):
            chunks.append(chunk)
            continue
        
        # 根據區域決定處理強度
        if is_in_target_zone(i):
            # 強力抑制模式（針對尖叫聲）
            chunk = chunk - AGGRESSIVE_ATTENUATION
            aggression = AGGRESSIVE_MULTIPLIER
        else:
            # 一般抑制模式
            aggression = NORMAL_MULTIPLIER
        
        # 動態限制：超過閾值時按比例衰減
        if chunk.max_dBFS > threshold_db:
            excess_db = chunk.max_dBFS - threshold_db
            attenuation = excess_db * aggression
            chunks.append(chunk - attenuation)
        else:
            chunks.append(chunk)
    
    # 合併所有處理後的片段
    return reduce(lambda a, b: a + b, chunks) if chunks else vocals_audio

def get_video_duration(file_path: Path) -> float:
    """使用 FFmpeg 直接讀取影片長度（比 MoviePy 更穩健）"""
    try:
        cmd = ["ffmpeg", "-i", str(file_path)]
        result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, 
                              text=True, timeout=30)
        
        # 解析 Duration 資訊
        match = re.search(r"Duration: (\d{2}):(\d{2}):(\d{2}\.\d+)", result.stderr)
        if match:
            h, m, s = map(float, match.groups())
            duration = h * 3600 + m * 60 + s
            logger.info(f"影片長度: {duration:.2f}秒")
            return duration
        
        logger.warning("無法從FFmpeg解析影片長度")
        return 0
    except subprocess.TimeoutExpired:
        logger.error("獲取影片長度超時")
        return 0
    except Exception as e:
        logger.error(f"獲取影片長度錯誤: {e}")
        return 0

def process_video(input_path: Path, mode: str, vocal_vol: float, 
                 ref_ranges: List[Tuple[float, float]], 
                 target_ranges: List[Tuple[float, float]], 
                 progress_bar, status_text) -> Tuple[Optional[bytes], Optional[str]]:
    """處理影片：分離音軌、調整音量、合成影片"""
    temp_dir = Path(tempfile.mkdtemp())
    output_filename = f"{input_path.stem}_fixed.mp4"
    output_path = temp_dir / output_filename
    
    try:
        # 步驟1: AI音軌分離
        status_text.markdown("🧠 **AI 分離音軌中...**")
        progress_bar.progress(10)
        
        cmd = ["demucs", "-n", "htdemucs", "--two-stems=vocals", 
               "-o", str(temp_dir), str(input_path)]
        logger.info(f"執行Demucs: {' '.join(cmd)}")
        
        process = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        stdout, stderr = process.communicate(timeout=600)  # 10分鐘超時
        
        if process.returncode != 0:
            error_msg = stderr.decode('utf-8', errors='ignore')
            logger.error(f"Demucs 錯誤: {error_msg}")
            raise Exception(f"音軌分離失敗: {error_msg[:200]}")
        
        progress_bar.progress(50)
        
        # 步驟2: 載入分離的音軌
        track_dir = temp_dir / "htdemucs" / input_path.stem
        vocals_path = track_dir / "vocals.wav"
        no_vocals_path = track_dir / "no_vocals.wav"
        
        if not track_dir.exists():
            raise Exception("音軌分離目錄不存在")
        if not vocals_path.exists() or not no_vocals_path.exists():
            raise Exception(f"找不到音軌檔案: {vocals_path.exists()=}, {no_vocals_path.exists()=}")
        
        logger.info(f"載入音軌: {vocals_path}")
        vocals = AudioSegment.from_wav(str(vocals_path))
        no_vocals = AudioSegment.from_wav(str(no_vocals_path))
        
        # 步驟3: 音頻處理
        status_text.text("🎚️ 智慧混音中...")
        
        if mode == "手動調整模式":
            # 手動模式：簡單音量調整
            gain_db = -100 if vocal_vol == 0 else 10 * math.log10(vocal_vol)
            vocals_processed = vocals + gain_db
            logger.info(f"手動模式: gain={gain_db:.2f}dB")
        else:
            # 智慧模式：基於參考片段動態調整
            status_text.text("🤖 分析參考片段...")
            vocals_pre = vocals - 6  # 全域預衰減
            vocals_processed = apply_smart_limiter(vocals_pre, ref_ranges, target_ranges)
            logger.info(f"智慧模式: {len(ref_ranges)} 個參考片段, {len(target_ranges)} 個抑制區")

        # 步驟4: 混音與標準化
        instrumental = no_vocals + 1.5  # 背景音樂增益
        final_mix = vocals_processed.overlay(instrumental)
        final_mix = final_mix.normalize(headroom=1.0)  # 標準化至 -1dB
        
        mixed_audio_path = temp_dir / "final_mix.m4a"
        logger.info(f"導出混音: {mixed_audio_path}")
        final_mix.export(str(mixed_audio_path), format="ipod", bitrate="320k")
        progress_bar.progress(75)
        
        # 步驟5: 視頻合成
        status_text.text("🎬 合成影片中 (Remuxing)...")
        
        # 嘗試添加混響效果的高級合成
        cmd_ffmpeg = [
            'ffmpeg', '-y', '-hide_banner', '-loglevel', 'error',
            '-i', str(input_path),
            '-i', str(mixed_audio_path),
            '-filter_complex', '[1:a]aecho=0.8:0.88:30:0.3[reverb]',
            '-map', '0:v',
            '-map', '[reverb]',
            '-c:v', 'copy',  # 視頻不重新編碼（極速）
            '-c:a', 'aac',
            '-b:a', '256k',
            '-shortest',
            str(output_path)
        ]
        
        logger.info("執行FFmpeg合成（帶混響）")
        process_ffmpeg = subprocess.run(cmd_ffmpeg, stdout=subprocess.PIPE, 
                                       stderr=subprocess.PIPE, timeout=300)
        
        # Fallback: 如果混響失敗，使用簡單合成
        if process_ffmpeg.returncode != 0:
            logger.warning(f"混響合成失敗，使用標準合成: {process_ffmpeg.stderr.decode('utf-8', errors='ignore')[:200]}")
            cmd_fallback = [
                'ffmpeg', '-y', '-hide_banner', '-loglevel', 'error',
                '-i', str(input_path),
                '-i', str(mixed_audio_path),
                '-map', '0:v', '-map', '1:a',
                '-c:v', 'copy',
                '-c:a', 'aac', '-b:a', '256k',
                '-shortest',
                str(output_path)
            ]
            subprocess.run(cmd_fallback, check=True, timeout=300)

        # 步驟6: 讀取結果
        if not output_path.exists():
            raise Exception("輸出影片檔案不存在")
        
        file_size = output_path.stat().st_size
        logger.info(f"輸出影片大小: {file_size / 1024 / 1024:.2f} MB")
        
        progress_bar.progress(100)
        status_text.text("✅ 完成！")
        
        with open(output_path, "rb") as f:
            return f.read(), output_filename
            
    except subprocess.TimeoutExpired:
        error_msg = "處理超時，請嘗試較短的影片或調整參數"
        logger.error(error_msg)
        st.error(f"❌ {error_msg}")
        return None, None
    except Exception as e:
        error_msg = f"處理錯誤: {str(e)}"
        logger.error(error_msg, exc_info=True)
        st.error(f"❌ {error_msg}")
        return None, None
    finally:
        # 清理臨時檔案
        try:
            shutil.rmtree(temp_dir, ignore_errors=True)
            logger.info("臨時檔案已清理")
        except Exception as e:
            logger.warning(f"清理臨時檔案失敗: {e}")

st.title("🎤 ScreamKiller")
st.caption("演唱會尖叫聲消除神器 (v2.2 直覺操作版)")

# 1. 先上傳
uploaded_file = st.file_uploader("步驟 1: 請先上傳影片 (MP4/MOV)", type=["mp4", "mov"])

if uploaded_file:
    # 使用 session_state 避免重複處理
    if 'uploaded_file_name' not in st.session_state or st.session_state.uploaded_file_name != uploaded_file.name:
        st.session_state.uploaded_file_name = uploaded_file.name
        st.session_state.video_processed = False
    
    # 準備暫存目錄
    temp_dir_upload = Path(tempfile.gettempdir()) / "scream_killer_uploads"
    temp_dir_upload.mkdir(exist_ok=True)
    temp_file_path = temp_dir_upload / uploaded_file.name
    
    # 寫入暫存檔案
    if not temp_file_path.exists() or temp_file_path.stat().st_size != uploaded_file.size:
        with open(temp_file_path, "wb") as f:
            f.write(uploaded_file.getbuffer())
        logger.info(f"影片已儲存: {temp_file_path}")
    
    # 獲取影片資訊
    duration = get_video_duration(temp_file_path)
    if duration > 0:
        dur_str = format_time_str(duration)
        file_size_mb = uploaded_file.size / 1024 / 1024
        st.success(f"📂 已讀取影片: {uploaded_file.name} (長度: {dur_str}, 大小: {file_size_mb:.1f} MB)")
    else:
        st.warning("⚠️ 無法讀取影片長度，請確認檔案格式正確")

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
            st.caption("💡 選擇歌手清唱或主唱的片段")
            
            if 'ref_count' not in st.session_state:
                st.session_state.ref_count = 1
            
            for i in range(st.session_state.ref_count):
                cols = st.columns([0.45, 0.1, 0.45])
                # 第一個提供建議值，後續新增的讓用戶自己填
                default_start = "00:10" if i == 0 else "00:00"
                default_end = "00:15" if i == 0 else "00:00"
                
                s_str = cols[0].text_input(
                    f"參考{i+1} 開始", 
                    value=default_start, 
                    key=f"rs_{i}", 
                    placeholder="MM:SS"
                )
                cols[1].markdown(
                    "<div style='text-align: center; padding-top: 10px;'>至</div>", 
                    unsafe_allow_html=True
                )
                e_str = cols[2].text_input(
                    f"參考{i+1} 結束", 
                    value=default_end, 
                    key=f"re_{i}", 
                    placeholder="MM:SS"
                )
                
                s_sec = parse_time_str(s_str)
                e_sec = parse_time_str(e_str)
                
                # 驗證時間範圍
                if s_sec >= e_sec:
                    st.warning(f"⚠️ 參考{i+1}: 開始時間需小於結束時間")
                elif e_sec > duration:
                    st.warning(f"⚠️ 參考{i+1}: 結束時間超過影片長度")
                else:
                    ref_ranges.append((s_sec, e_sec))
            
            col_add, col_remove = st.columns(2)
            with col_add:
                if st.button("➕ 增加參考段", key="btn_add_ref", use_container_width=True):
                    st.session_state.ref_count += 1
                    st.rerun()
            with col_remove:
                if st.session_state.ref_count > 1 and st.button("➖ 移除最後", key="btn_remove_ref", use_container_width=True):
                    st.session_state.ref_count -= 1
                    st.rerun()

        with c2:
            st.markdown("**2. 加強抑制區** (重點消除尖叫)")
            st.caption("💡 標記尖叫聲特別大聲的時段（選填）")
            
            if 'target_count' not in st.session_state:
                st.session_state.target_count = 0
            
            if st.session_state.target_count == 0:
                st.info("未設定抑制區，將使用一般強度處理全片")
            
            for i in range(st.session_state.target_count):
                cols = st.columns([0.45, 0.1, 0.45])
                # 抑制區是選填，所有預設都是 00:00 讓用戶自己填
                s_str = cols[0].text_input(
                    f"抑制{i+1} 開始", 
                    value="00:00", 
                    key=f"ts_{i}", 
                    placeholder="MM:SS"
                )
                cols[1].markdown(
                    "<div style='text-align: center; padding-top: 10px;'>至</div>", 
                    unsafe_allow_html=True
                )
                e_str = cols[2].text_input(
                    f"抑制{i+1} 結束", 
                    value="00:00", 
                    key=f"te_{i}", 
                    placeholder="MM:SS"
                )
                
                s_sec = parse_time_str(s_str)
                e_sec = parse_time_str(e_str)
                
                # 驗證時間範圍
                if s_sec >= e_sec:
                    st.warning(f"⚠️ 抑制{i+1}: 開始時間需小於結束時間")
                elif e_sec > duration:
                    st.warning(f"⚠️ 抑制{i+1}: 結束時間超過影片長度")
                else:
                    target_ranges.append((s_sec, e_sec))
            
            col_add2, col_remove2 = st.columns(2)
            with col_add2:
                if st.button("➕ 增加抑制段", key="btn_add_target", use_container_width=True):
                    st.session_state.target_count += 1
                    st.rerun()
            with col_remove2:
                if st.session_state.target_count > 0 and st.button("➖ 移除最後", key="btn_remove_target", use_container_width=True):
                    st.session_state.target_count -= 1
                    st.rerun()
            
        st.markdown("---")
        
        # 顯示設定摘要
        if ref_ranges:
            st.info(f"📋 已設定 {len(ref_ranges)} 個參考片段, {len(target_ranges)} 個抑制區")
        
        if st.button("🚀 開始處理", type="primary", use_container_width=True):
            if not check_dependencies():
                st.error("❌ 系統缺少 FFmpeg，請先安裝")
            elif not ref_ranges:
                st.error("❌ 請至少設定一個參考片段")
            else:
                with st.spinner("處理中，請稍候..."):
                    pb = st.progress(0)
                    stt = st.empty()
                    
                    start_time = st.session_state.get('process_start_time', None)
                    if not start_time:
                        import time
                        st.session_state.process_start_time = time.time()
                    
                    data, name = process_video(
                        temp_file_path, mode, vocal_vol, 
                        ref_ranges, target_ranges, pb, stt
                    )
                    
                    if data:
                        elapsed = time.time() - st.session_state.process_start_time
                        st.success(f"✅ 處理完成！耗時 {elapsed:.1f} 秒")
                        st.download_button(
                            "⬇️ 下載處理後的影片", 
                            data, name, "video/mp4",
                            use_container_width=True
                        )
                        st.session_state.video_processed = True
                    else:
                        st.error("❌ 處理失敗，請檢查錯誤訊息")
                    
                    # 清理暫存檔案
                    try:
                        shutil.rmtree(temp_dir_upload, ignore_errors=True)
                    except:
                        pass
else:
    st.info("👋 請先上傳影片以開始使用")