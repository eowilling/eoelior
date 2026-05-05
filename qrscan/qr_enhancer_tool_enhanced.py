"""
QR碼圖像增強工具 - 增強版
整合圖像預處理、透視校正、多引擎解碼、批量處理和性能優化功能
"""
import cv2
import numpy as np
import os
from PIL import Image, ImageTk
import tkinter as tk
from tkinter import ttk, filedialog, messagebox
import json
import threading
from concurrent.futures import ThreadPoolExecutor, as_completed
from queue import Queue
import time
from datetime import datetime
import hashlib
import webbrowser

# 可選依賴
try:
    import pandas as pd
    PANDAS_AVAILABLE = True
except ImportError:
    PANDAS_AVAILABLE = False

try:
    from pyzxing import BarCodeReader
    ZXING_AVAILABLE = True
except ImportError:
    ZXING_AVAILABLE = False

try:
    from qreader import QReader
    QREADER_AVAILABLE = True
except ImportError:
    QREADER_AVAILABLE = False


class ImageCache:
    """圖像緩存管理器"""
    
    def __init__(self, max_size=50):
        self.cache = {}
        self.max_size = max_size
        self.access_count = {}
    
    def get_hash(self, image_path):
        """計算圖像文件的哈希值"""
        with open(image_path, 'rb') as f:
            return hashlib.md5(f.read()).hexdigest()
    
    def get(self, image_path):
        """從緩存獲取圖像"""
        img_hash = self.get_hash(image_path)
        if img_hash in self.cache:
            self.access_count[img_hash] = self.access_count.get(img_hash, 0) + 1
            return self.cache[img_hash]
        return None
    
    def put(self, image_path, image):
        """將圖像放入緩存"""
        if len(self.cache) >= self.max_size:
            # 移除最少使用的圖像
            least_used = min(self.access_count.items(), key=lambda x: x[1])[0]
            del self.cache[least_used]
            del self.access_count[least_used]
        
        img_hash = self.get_hash(image_path)
        self.cache[img_hash] = image
        self.access_count[img_hash] = 1
    
    def clear(self):
        """清空緩存"""
        self.cache.clear()
        self.access_count.clear()


class ImagePreprocessor:
    """圖像預處理模塊 - 增強版"""
    
    def __init__(self):
        self.debug_mode = True
    
    def assess_quality(self, image):
        """評估圖像質量"""
        if len(image.shape) == 3:
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        else:
            gray = image.copy()
        
        # 計算清晰度 (拉普拉斯方差)
        laplacian_var = cv2.Laplacian(gray, cv2.CV_64F).var()
        
        # 計算對比度
        contrast = gray.std()
        
        # 計算亮度
        brightness = gray.mean()
        
        # 評估等級
        if laplacian_var < 50:
            clarity = "嚴重模糊"
            clarity_score = laplacian_var / 50 * 30
        elif laplacian_var < 100:
            clarity = "模糊"
            clarity_score = 30 + (laplacian_var - 50) / 50 * 20
        elif laplacian_var < 500:
            clarity = "一般"
            clarity_score = 50 + (laplacian_var - 100) / 400 * 30
        else:
            clarity = "清晰"
            clarity_score = min(100, 80 + (laplacian_var - 500) / 500 * 20)
        
        return {
            'clarity': clarity,
            'clarity_score': round(clarity_score, 2),
            'laplacian_var': round(laplacian_var, 2),
            'contrast': round(contrast, 2),
            'brightness': round(brightness, 2),
            'recommendation': self._get_recommendation(laplacian_var, contrast, brightness)
        }
    
    def _get_recommendation(self, laplacian_var, contrast, brightness):
        """根據圖像質量給出處理建議"""
        recommendations = []
        
        if laplacian_var < 100:
            recommendations.append("建議重新拍攝或使用銳化處理")
        
        if contrast < 30:
            recommendations.append("對比度過低,建議使用對比度增強")
        
        if brightness < 50:
            recommendations.append("亮度過低,建議增加亮度")
        elif brightness > 200:
            recommendations.append("亮度過高,建議降低亮度")
        
        if not recommendations:
            recommendations.append("圖像質量良好,可直接解碼")
        
        return " | ".join(recommendations)
    
    def smart_preprocess(self, image):
        """智能預處理 - 根據圖像質量自動選擇最佳方法"""
        quality = self.assess_quality(image)
        methods = ['grayscale']
        
        # 根據質量評估選擇處理方法
        if quality['laplacian_var'] < 100:
            methods.extend(['denoise', 'sharpen', 'contrast'])
        elif quality['laplacian_var'] < 500:
            methods.extend(['denoise', 'binarize'])
        
        if quality['contrast'] < 30:
            if 'contrast' not in methods:
                methods.append('contrast')
        
        if quality['brightness'] < 50 or quality['brightness'] > 200:
            methods.append('brightness_adjust')
        
        return self.preprocess_pipeline(image, methods), methods
    
    def to_grayscale(self, image):
        """轉換為灰階圖像"""
        if len(image.shape) == 3:
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        else:
            gray = image.copy()
        return gray
    
    def adaptive_binarization(self, image, block_size=11, C=2):
        """自適應二值化"""
        binary = cv2.adaptiveThreshold(
            image, 255, 
            cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
            cv2.THRESH_BINARY, 
            block_size, C
        )
        return binary
    
    def otsu_binarization(self, image):
        """Otsu自動閾值二值化"""
        _, binary = cv2.threshold(image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        return binary
    
    def gaussian_denoise(self, image, kernel_size=(5, 5)):
        """高斯濾波去噪"""
        denoised = cv2.GaussianBlur(image, kernel_size, 0)
        return denoised
    
    def median_denoise(self, image, kernel_size=5):
        """中值濾波去噪"""
        denoised = cv2.medianBlur(image, kernel_size)
        return denoised
    
    def sharpen_image(self, image):
        """圖像銳化"""
        kernel = np.array([[-1,-1,-1], 
                          [-1, 9,-1],
                          [-1,-1,-1]])
        sharpened = cv2.filter2D(image, -1, kernel)
        return sharpened
    
    def enhance_contrast(self, image, alpha=1.5, beta=0):
        """增強對比度"""
        enhanced = cv2.convertScaleAbs(image, alpha=alpha, beta=beta)
        return enhanced
    
    def adjust_brightness(self, image):
        """自動調整亮度"""
        if len(image.shape) == 2:
            mean_brightness = image.mean()
        else:
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            mean_brightness = gray.mean()
        
        target_brightness = 128
        adjustment = target_brightness - mean_brightness
        
        adjusted = cv2.convertScaleAbs(image, alpha=1.0, beta=adjustment)
        return adjusted
    
    def invert_image(self, image):
        """反轉圖像顏色 (處理黑底白碼)"""
        return cv2.bitwise_not(image)
    
    def upscale_image(self, image, factor=2.0):
        """放大圖像 (處理過小的QR碼)"""
        height, width = image.shape[:2]
        new_size = (int(width * factor), int(height * factor))
        return cv2.resize(image, new_size, interpolation=cv2.INTER_CUBIC)
    
    def perspective_correction(self, image):
        """透視校正"""
        try:
            gray = self.to_grayscale(image)
            _, binary = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY_INV)
            
            contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            
            if contours:
                contour = max(contours, key=cv2.contourArea)
                rect = cv2.minAreaRect(contour)
                box = cv2.boxPoints(rect)
                box = np.int0(box)
                
                width = int(rect[1][0])
                height = int(rect[1][1])
                
                src_points = box.astype(np.float32)
                dst_points = np.array([[0, 0], [width-1, 0], [width-1, height-1], [0, height-1]], np.float32)
                
                matrix = cv2.getPerspectiveTransform(src_points, dst_points)
                corrected = cv2.warpPerspective(image, matrix, (width, height))
                
                return corrected
            else:
                return image
        except:
            return image
    
    def preprocess_pipeline(self, image, methods):
        """完整預處理流水線"""
        processed = image.copy()
        
        for method in methods:
            if method == 'grayscale':
                processed = self.to_grayscale(processed)
            elif method == 'denoise':
                processed = self.gaussian_denoise(processed)
            elif method == 'median_denoise':
                processed = self.median_denoise(processed)
            elif method == 'binarize':
                processed = self.adaptive_binarization(processed)
            elif method == 'otsu':
                processed = self.otsu_binarization(processed)
            elif method == 'sharpen':
                processed = self.sharpen_image(processed)
            elif method == 'contrast':
                processed = self.enhance_contrast(processed)
            elif method == 'brightness_adjust':
                processed = self.adjust_brightness(processed)
            elif method == 'perspective':
                processed = self.perspective_correction(processed)
            elif method == 'invert':
                processed = self.invert_image(processed)
            elif method == 'upscale':
                processed = self.upscale_image(processed)
        
        return processed


class QRDecoder:
    """多引擎QR碼解碼器 - 增強版"""
    
    def __init__(self):
        self.detection_engines = {}
        self.decode_cache = {}
        self.initialize_engines()
    
    def initialize_engines(self):
        """初始化所有可用的檢測引擎"""
        # OpenCV QRCodeDetector
        try:
            self.detection_engines['opencv'] = cv2.QRCodeDetector()
        except:
            self.detection_engines['opencv'] = None
        
        # pyzbar
        try:
            from pyzbar import pyzbar
            self.detection_engines['pyzbar'] = pyzbar
        except:
            self.detection_engines['pyzbar'] = None
        
        # ZXing
        if ZXING_AVAILABLE:
            try:
                self.detection_engines['zxing'] = BarCodeReader()
            except:
                self.detection_engines['zxing'] = None
        
        # QReader
        if QREADER_AVAILABLE:
            try:
                self.detection_engines['qreader'] = QReader()
            except:
                self.detection_engines['qreader'] = None
    
    def get_image_hash(self, image):
        """計算圖像哈希用於緩存"""
        return hashlib.md5(image.tobytes()).hexdigest()
    
    def decode_with_opencv(self, image):
        """使用OpenCV檢測QR碼"""
        results = []
        if self.detection_engines['opencv']:
            try:
                detector = self.detection_engines['opencv']
                data, points, _ = detector.detectAndDecode(image)
                if data:
                    results.append({
                        'engine': 'opencv',
                        'data': data,
                        'confidence': 1.0
                    })
            except:
                pass
        return results
    
    def decode_with_pyzbar(self, image):
        """使用pyzbar檢測QR碼"""
        results = []
        if self.detection_engines['pyzbar']:
            try:
                pyzbar = self.detection_engines['pyzbar']
                if len(image.shape) == 2:
                    pil_img = Image.fromarray(image)
                else:
                    pil_img = Image.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
                
                barcodes = pyzbar.decode(pil_img)
                for barcode in barcodes:
                    if barcode.type == 'QRCODE':
                        results.append({
                            'engine': 'pyzbar',
                            'data': barcode.data.decode('utf-8'),
                            'confidence': 0.9
                        })
            except:
                pass
        return results
    
    def decode_with_zxing(self, image):
        """使用ZXing檢測QR碼"""
        results = []
        if self.detection_engines.get('zxing'):
            try:
                # 保存臨時文件
                temp_path = 'temp_qr.png'
                cv2.imwrite(temp_path, image)
                
                reader = self.detection_engines['zxing']
                barcode = reader.decode(temp_path)
                
                if barcode and barcode.get('parsed'):
                    results.append({
                        'engine': 'zxing',
                        'data': barcode['parsed'],
                        'confidence': 0.85
                    })
                
                # 刪除臨時文件
                if os.path.exists(temp_path):
                    os.remove(temp_path)
            except:
                pass
        return results
    
    def decode_with_qreader(self, image):
        """使用QReader檢測QR碼"""
        results = []
        if self.detection_engines.get('qreader'):
            try:
                reader = self.detection_engines['qreader']
                
                # QReader需要RGB格式
                if len(image.shape) == 2:
                    rgb_image = cv2.cvtColor(image, cv2.COLOR_GRAY2RGB)
                else:
                    rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
                
                decoded = reader.detect_and_decode(image=rgb_image)
                
                if decoded:
                    for data in decoded:
                        if data:
                            results.append({
                                'engine': 'qreader',
                                'data': data,
                                'confidence': 0.95
                            })
            except:
                pass
        return results
    
    def decode_multi_strategy(self, image, early_stop=True):
        """多策略解碼 - 優化版"""
        # 檢查緩存
        img_hash = self.get_image_hash(image)
        if img_hash in self.decode_cache:
            return self.decode_cache[img_hash]
        
        results = []
        
        # 直接解碼 - 嘗試所有引擎
        engines = [
            self.decode_with_opencv,
            self.decode_with_pyzbar,
            self.decode_with_zxing,
            self.decode_with_qreader
        ]
        
        for engine_func in engines:
            engine_results = engine_func(image)
            results.extend(engine_results)
            
            # 早停機制
            if early_stop and results:
                break
        
        # 如果直接解碼成功,返回結果
        if results:
            self.decode_cache[img_hash] = results
            return self._deduplicate_results(results)
        
        # 嘗試不同預處理版本
        preprocessor = ImagePreprocessor()
        preprocess_methods = [
            ['grayscale'],
            ['grayscale', 'upscale'],
            ['grayscale', 'denoise', 'binarize'],
            ['grayscale', 'invert'],
            ['grayscale', 'invert', 'binarize'],
            ['grayscale', 'sharpen'],
            ['grayscale', 'upscale', 'sharpen'],
            ['grayscale', 'contrast'],
            ['grayscale', 'brightness_adjust', 'contrast'],
            ['grayscale', 'perspective'],
            ['grayscale', 'perspective', 'binarize']
        ]
        
        for methods in preprocess_methods:
            processed = preprocessor.preprocess_pipeline(image, methods)
            
            for engine_func in engines:
                engine_results = engine_func(processed)
                results.extend(engine_results)
                
                # 早停機制
                if early_stop and results:
                    self.decode_cache[img_hash] = results
                    return self._deduplicate_results(results)
        
        # 緩存結果
        unique_results = self._deduplicate_results(results)
        self.decode_cache[img_hash] = unique_results
        
        return unique_results
    
    def _deduplicate_results(self, results):
        """去重結果"""
        unique_results = []
        seen_data = set()
        for result in results:
            if result['data'] not in seen_data:
                unique_results.append(result)
                seen_data.add(result['data'])
        return unique_results


class QRCodeEnhancerGUI:
    """QR碼增強工具圖形界面 - 增強版"""
    
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("QRscan Willing")
        self.root.geometry("1000x700")
        self.root.resizable(True, True)
        self.root.minsize(800, 600)
        
        # 初始化模塊
        self.preprocessor = ImagePreprocessor()
        self.decoder = QRDecoder()
        self.image_cache = ImageCache()
        
        # 變量
        self.input_image_path = tk.StringVar()
        self.output_dir = tk.StringVar(value="enhanced_results")
        self.batch_input_dir = tk.StringVar()
        self.preprocess_methods = {
            'grayscale': tk.BooleanVar(value=True),
            'denoise': tk.BooleanVar(value=True),
            'binarize': tk.BooleanVar(value=True),
            'sharpen': tk.BooleanVar(value=True),
            'perspective': tk.BooleanVar(value=False),
            'contrast': tk.BooleanVar(value=False)
        }
        self.use_smart_preprocess = tk.BooleanVar(value=True)
        self.early_stop = tk.BooleanVar(value=True)
        self.max_workers = tk.IntVar(value=4)
        
        # 批量處理結果
        self.batch_results = []
        
        # 檢查引擎狀態
        self.engine_status = self.check_engines()
        
        # 創建界面
        self.create_widgets()
        
        # 顯示引擎警告 (如果有)
        self.show_engine_warnings()

    def check_engines(self):
        """檢查解碼引擎可用性"""
        status = {
            'opencv': self.decoder.detection_engines.get('opencv') is not None,
            'pyzbar': self.decoder.detection_engines.get('pyzbar') is not None,
            'zxing': self.decoder.detection_engines.get('zxing') is not None,
            'qreader': self.decoder.detection_engines.get('qreader') is not None
        }
        return status
    
    def show_engine_warnings(self):
        """顯示引擎缺失警告"""
        missing = [name for name, available in self.engine_status.items() if not available]
        if missing:
            warning_msg = f"注意：以下解碼引擎未安裝或無法使用：\n{', '.join(missing)}\n\n這可能會降低破損或模糊 QR 碼的判讀成功率。"
            if 'pyzbar' in missing:
                warning_msg += "\n\npyzbar 失敗通常是因為缺少 Visual C++ Redistributable。"
            self.result_text.insert(tk.END, f"⚠️ {warning_msg}\n\n")
    
    def create_widgets(self):
        """創建用戶界面"""
        # 創建頂層容器以支援捲動
        self.main_container = ttk.Frame(self.root)
        self.main_container.pack(fill=tk.BOTH, expand=True)
        
        # 創建標籤頁
        self.notebook = ttk.Notebook(self.main_container)
        self.notebook.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)
        
        # 單張處理標籤頁
        self.single_tab = ttk.Frame(self.notebook)
        self.notebook.add(self.single_tab, text="單張判讀")
        self.create_scrollable_frame(self.single_tab, self.create_single_processing_ui)
        
        # 批量處理標籤頁
        self.batch_tab = ttk.Frame(self.notebook)
        self.notebook.add(self.batch_tab, text="批量判讀")
        self.create_scrollable_frame(self.batch_tab, self.create_batch_processing_ui)

    def create_scrollable_frame(self, parent, content_func):
        """為標籤頁創建可捲動的框架"""
        canvas = tk.Canvas(parent, highlightthickness=0)
        scrollbar = ttk.Scrollbar(parent, orient="vertical", command=canvas.yview)
        scrollable_frame = ttk.Frame(canvas)

        scrollable_frame.bind(
            "<Configure>",
            lambda e: canvas.configure(
                scrollregion=canvas.bbox("all")
            )
        )

        canvas.create_window((0, 0), window=scrollable_frame, anchor="nw", width=parent.winfo_width())
        
        def _on_canvas_configure(event):
            # 更新內部框架寬度以匹配畫布
            canvas.itemconfig(canvas.find_withtag("all")[0], width=event.width)

        canvas.bind("<Configure>", _on_canvas_configure)
        
        canvas.configure(yscrollcommand=scrollbar.set)

        canvas.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")
        
        # 支援滑鼠滾輪
        def _on_mousewheel(event):
            canvas.yview_scroll(int(-1*(event.delta/120)), "units")
        
        canvas.bind_all("<MouseWheel>", _on_mousewheel)

        content_func(scrollable_frame)

    def create_single_processing_ui(self, parent):
        """單張處理介面內容"""
        self.create_single_processing_tab(parent)

    def create_batch_processing_ui(self, parent):
        """批量處理介面內容"""
        self.create_batch_processing_tab(parent)
    
    def create_single_processing_tab(self, parent):
        """創建單張處理標籤頁"""
        # 文件操作
        file_frame = ttk.LabelFrame(parent, text="文件操作")
        file_frame.pack(fill=tk.X, padx=10, pady=5)
        
        ttk.Label(file_frame, text="輸入圖像:").grid(row=0, column=0, sticky=tk.W, padx=5, pady=5)
        ttk.Entry(file_frame, textvariable=self.input_image_path, width=50).grid(row=0, column=1, padx=5, pady=5)
        ttk.Button(file_frame, text="瀏覽", command=self.browse_input_image).grid(row=0, column=2, padx=5, pady=5)
        ttk.Button(file_frame, text="ROI選擇", command=self.select_roi).grid(row=0, column=3, padx=5, pady=5)
        
        ttk.Label(file_frame, text="輸出目錄:").grid(row=1, column=0, sticky=tk.W, padx=5, pady=5)
        ttk.Entry(file_frame, textvariable=self.output_dir, width=50).grid(row=1, column=1, padx=5, pady=5)
        ttk.Button(file_frame, text="瀏覽", command=self.browse_output_dir).grid(row=1, column=2, padx=5, pady=5)
        
        # 預處理選項
        preprocess_frame = ttk.LabelFrame(parent, text="圖像預處理選項")
        preprocess_frame.pack(fill=tk.X, padx=10, pady=5)
        
        ttk.Checkbutton(preprocess_frame, text="智能預處理(自動選擇最佳方法)", 
                       variable=self.use_smart_preprocess).grid(row=0, column=0, columnspan=3, sticky=tk.W, padx=10, pady=5)
        
        ttk.Checkbutton(preprocess_frame, text="灰階轉換", variable=self.preprocess_methods['grayscale']).grid(row=1, column=0, sticky=tk.W, padx=10, pady=5)
        ttk.Checkbutton(preprocess_frame, text="高斯去噪", variable=self.preprocess_methods['denoise']).grid(row=1, column=1, sticky=tk.W, padx=10, pady=5)
        ttk.Checkbutton(preprocess_frame, text="自適應二值化", variable=self.preprocess_methods['binarize']).grid(row=1, column=2, sticky=tk.W, padx=10, pady=5)
        ttk.Checkbutton(preprocess_frame, text="圖像銳化", variable=self.preprocess_methods['sharpen']).grid(row=2, column=0, sticky=tk.W, padx=10, pady=5)
        ttk.Checkbutton(preprocess_frame, text="透視校正", variable=self.preprocess_methods['perspective']).grid(row=2, column=1, sticky=tk.W, padx=10, pady=5)
        ttk.Checkbutton(preprocess_frame, text="對比度增強", variable=self.preprocess_methods['contrast']).grid(row=2, column=2, sticky=tk.W, padx=10, pady=5)
        
        # 性能選項
        perf_frame = ttk.LabelFrame(parent, text="性能選項")
        perf_frame.pack(fill=tk.X, padx=10, pady=5)
        
        ttk.Checkbutton(perf_frame, text="早停機制(解碼成功後立即停止)", 
                       variable=self.early_stop).grid(row=0, column=0, sticky=tk.W, padx=10, pady=5)
        
        # 圖像預覽
        image_frame = ttk.LabelFrame(parent, text="圖像預覽")
        image_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)
        
        # 原始圖像
        original_frame = ttk.LabelFrame(image_frame, text="原始圖像")
        original_frame.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=5, pady=5)
        
        self.original_canvas = tk.Canvas(original_frame, bg='gray', height=200)
        self.original_canvas.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)
        
        # 判讀後圖像
        processed_frame = ttk.LabelFrame(image_frame, text="判讀後圖像")
        processed_frame.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True, padx=5, pady=5)
        
        self.processed_canvas = tk.Canvas(processed_frame, bg='gray', height=200)
        self.processed_canvas.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)
        
        # 結果顯示
        result_frame = ttk.LabelFrame(parent, text="解碼結果日誌")
        result_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)
        
        self.result_text = tk.Text(result_frame, wrap=tk.WORD, height=5)
        scrollbar = ttk.Scrollbar(result_frame, orient=tk.VERTICAL, command=self.result_text.yview)
        self.result_text.configure(yscrollcommand=scrollbar.set)
        self.result_text.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
        # 按鈕
        button_frame = ttk.Frame(parent)
        button_frame.pack(fill=tk.X, padx=10, pady=10)
        
        ttk.Button(button_frame, text="評估圖像質量", command=self.assess_image_quality).pack(side=tk.LEFT, padx=5)
        ttk.Button(button_frame, text="開始判讀", command=self.start_processing).pack(side=tk.LEFT, padx=5)
        ttk.Button(button_frame, text="重置", command=self.reset_tool).pack(side=tk.LEFT, padx=5)
    
    def create_batch_processing_tab(self, parent):
        """創建批量處理標籤頁"""
        # 文件操作
        file_frame = ttk.LabelFrame(parent, text="批量處理設置")
        file_frame.pack(fill=tk.X, padx=10, pady=5)
        
        ttk.Label(file_frame, text="輸入目錄:").grid(row=0, column=0, sticky=tk.W, padx=5, pady=5)
        ttk.Entry(file_frame, textvariable=self.batch_input_dir, width=50).grid(row=0, column=1, padx=5, pady=5)
        ttk.Button(file_frame, text="瀏覽", command=self.browse_batch_input_dir).grid(row=0, column=2, padx=5, pady=5)
        
        ttk.Label(file_frame, text="輸出目錄:").grid(row=1, column=0, sticky=tk.W, padx=5, pady=5)
        ttk.Entry(file_frame, textvariable=self.output_dir, width=50).grid(row=1, column=1, padx=5, pady=5)
        ttk.Button(file_frame, text="瀏覽", command=self.browse_output_dir).grid(row=1, column=2, padx=5, pady=5)
        
        ttk.Label(file_frame, text="並行線程數:").grid(row=2, column=0, sticky=tk.W, padx=5, pady=5)
        ttk.Spinbox(file_frame, from_=1, to=16, textvariable=self.max_workers, width=10).grid(row=2, column=1, sticky=tk.W, padx=5, pady=5)
        
        # 進度顯示
        progress_frame = ttk.LabelFrame(parent, text="處理進度")
        progress_frame.pack(fill=tk.X, padx=10, pady=5)
        
        self.progress_var = tk.DoubleVar()
        self.progress_bar = ttk.Progressbar(progress_frame, variable=self.progress_var, maximum=100)
        self.progress_bar.pack(fill=tk.X, padx=10, pady=10)
        
        self.progress_label = ttk.Label(progress_frame, text="等待開始...")
        self.progress_label.pack(padx=10, pady=5)
        
        # 結果表格
        result_frame = ttk.LabelFrame(parent, text="批量處理結果")
        result_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)
        
        # 創建Treeview
        columns = ('文件名', '狀態', '解碼結果', '處理時間', '引擎')
        self.batch_tree = ttk.Treeview(result_frame, columns=columns, show='headings', height=15)
        
        for col in columns:
            self.batch_tree.heading(col, text=col)
            self.batch_tree.column(col, width=150)
        
        scrollbar = ttk.Scrollbar(result_frame, orient=tk.VERTICAL, command=self.batch_tree.yview)
        self.batch_tree.configure(yscrollcommand=scrollbar.set)
        
        self.batch_tree.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
        # 按鈕
        button_frame = ttk.Frame(parent)
        button_frame.pack(fill=tk.X, padx=10, pady=10)
        
        ttk.Button(button_frame, text="開始批量處理", command=self.start_batch_processing).pack(side=tk.LEFT, padx=5)
        ttk.Button(button_frame, text="導出結果(CSV)", command=self.export_results_csv).pack(side=tk.LEFT, padx=5)
        if PANDAS_AVAILABLE:
            ttk.Button(button_frame, text="導出結果(Excel)", command=self.export_results_excel).pack(side=tk.LEFT, padx=5)
        ttk.Button(button_frame, text="清空結果", command=self.clear_batch_results).pack(side=tk.LEFT, padx=5)
    
    def browse_input_image(self):
        """瀏覽選擇輸入圖像"""
        file_path = filedialog.askopenfilename(
            filetypes=[("圖像文件", "*.png;*.jpg;*.jpeg;*.bmp;*.tiff"), ("所有文件", "*.*")]
        )
        if file_path:
            self.input_image_path.set(file_path)
            self.display_image(file_path, canvas='original')
            
            # 自動評估並嘗試讀取
            quality = self.assess_image_quality()
            if quality and quality.get('laplacian_var', 0) >= 50:
                self.start_processing()
    
    def browse_output_dir(self):
        """瀏覽選擇輸出目錄"""
        dir_path = filedialog.askdirectory()
        if dir_path:
            self.output_dir.set(dir_path)
    
    def browse_batch_input_dir(self):
        """瀏覽選擇批量輸入目錄"""
        dir_path = filedialog.askdirectory()
        if dir_path:
            self.batch_input_dir.set(dir_path)
    
    def select_roi(self):
        """手動選擇ROI區域"""
        input_path = self.input_image_path.get()
        if not input_path or not os.path.exists(input_path):
            messagebox.showerror("錯誤", "請先選擇有效的輸入圖像")
            return
        
        image = cv2.imread(input_path)
        if image is None:
            messagebox.showerror("錯誤", "無法讀取圖像")
            return
        
        # 縮放過大的圖像以適應屏幕
        # 獲取屏幕尺寸 (這裡假設一個合理的預覽限制，例如 1280x800)
        # 用戶可能在小屏幕上，所以我們要確保預覽窗口不會太大
        max_preview_width = 1200
        max_preview_height = 800
        
        height, width = image.shape[:2]
        scale_factor = 1.0
        
        if width > max_preview_width or height > max_preview_height:
            scale_x = max_preview_width / width
            scale_y = max_preview_height / height
            scale_factor = min(scale_x, scale_y)
            
            # 計算新的尺寸
            new_width = int(width * scale_factor)
            new_height = int(height * scale_factor)
            
            # 縮放圖像用於顯示
            display_image = cv2.resize(image, (new_width, new_height), interpolation=cv2.INTER_AREA)
        else:
            display_image = image
        
        # 使用OpenCV的selectROI
        # showCrosshair=True, fromCenter=False
        roi = cv2.selectROI("選擇QR碼區域 (按SPACE確認, ESC取消)", display_image, showCrosshair=True)
        cv2.destroyAllWindows()
        
        # 檢查是否選擇了有效區域 (w>0 and h>0)
        if roi[2] > 0 and roi[3] > 0:
            # 將坐標還原回原始圖像比例
            x = int(roi[0] / scale_factor)
            y = int(roi[1] / scale_factor)
            w = int(roi[2] / scale_factor)
            h = int(roi[3] / scale_factor)
            
            # 確保邊界不超出原始圖像
            x = max(0, x)
            y = max(0, y)
            w = min(w, width - x)
            h = min(h, height - y)
            
            cropped = image[y:y+h, x:x+w]
            
            # 保存裁剪後的圖像
            base_name = os.path.splitext(os.path.basename(input_path))[0]
            output_dir = self.output_dir.get()
            os.makedirs(output_dir, exist_ok=True)
            
            cropped_path = os.path.join(output_dir, f"{base_name}_roi.png")
            cv2.imwrite(cropped_path, cropped)
            
            # 更新輸入路徑為裁剪後的圖像
            self.input_image_path.set(cropped_path)
            self.display_image(cropped_path, canvas='original')
            
            # 自動讀取裁剪後的內容
            self.start_processing()
            
            messagebox.showinfo("成功", f"ROI已保存到: {cropped_path}")
    
    def display_image(self, image_path, canvas='original'):
        """在畫布上顯示圖像"""
        try:
            image = Image.open(image_path)
            image.thumbnail((400, 250))
            photo = ImageTk.PhotoImage(image)
            
            if canvas == 'original':
                self.original_canvas.delete('all')
                self.original_canvas.create_image(200, 125, image=photo, anchor=tk.CENTER)
                self.original_canvas.photo = photo
            else:
                self.processed_canvas.delete('all')
                self.processed_canvas.create_image(200, 125, image=photo, anchor=tk.CENTER)
                self.processed_canvas.photo = photo
        except Exception as e:
            messagebox.showerror("錯誤", f"無法顯示圖像: {e}")
    
    def assess_image_quality(self):
        """評估圖像質量"""
        input_path = self.input_image_path.get()
        if not input_path or not os.path.exists(input_path):
            messagebox.showerror("錯誤", "請選擇有效的輸入圖像")
            return
        
        try:
            image = cv2.imread(input_path)
            if image is None:
                raise ValueError("無法讀取圖像")
            
            quality = self.preprocessor.assess_quality(image)
            
            self.result_text.delete(1.0, tk.END)
            self.result_text.insert(tk.END, "=== 圖像質量評估 ===\n\n")
            self.result_text.insert(tk.END, f"清晰度: {quality['clarity']} ({quality['clarity_score']}/100)\n")
            self.result_text.insert(tk.END, f"拉普拉斯方差: {quality['laplacian_var']}\n")
            self.result_text.insert(tk.END, f"對比度: {quality['contrast']}\n")
            self.result_text.insert(tk.END, f"亮度: {quality['brightness']}\n\n")
            self.result_text.insert(tk.END, f"建議: {quality['recommendation']}\n")
            
            return quality
        
        except Exception as e:
            messagebox.showerror("錯誤", f"評估失敗: {str(e)}")
            return None
    
    def start_processing(self):
        """開始處理圖像"""
        input_path = self.input_image_path.get()
        if not input_path or not os.path.exists(input_path):
            messagebox.showerror("錯誤", "請選擇有效的輸入圖像")
            return
        
        # 創建輸出目錄
        output_dir = self.output_dir.get()
        os.makedirs(output_dir, exist_ok=True)
        
        # 在後台線程中處理
        threading.Thread(
            target=self.process_single_image,
            args=(input_path, output_dir),
            daemon=True
        ).start()
    
    def process_single_image(self, input_path, output_dir):
        """處理單張圖像"""
        try:
            self.result_text.delete(1.0, tk.END)
            self.result_text.insert(tk.END, "開始處理圖像...\n")
            
            start_time = time.time()
            
            # 讀取圖像 (使用緩存)
            cached_image = self.image_cache.get(input_path)
            if cached_image is not None:
                image = cached_image
                self.result_text.insert(tk.END, "從緩存讀取圖像\n")
            else:
                image = cv2.imread(input_path)
                if image is None:
                    raise ValueError("無法讀取圖像")
                self.image_cache.put(input_path, image)
            
            # 評估質量
            quality = self.preprocessor.assess_quality(image)
            self.result_text.insert(tk.END, f"\n圖像質量: {quality['clarity']} ({quality['clarity_score']}/100)\n")
            self.result_text.insert(tk.END, f"建議: {quality['recommendation']}\n\n")
            
            # 預處理
            if self.use_smart_preprocess.get():
                self.result_text.insert(tk.END, "使用智能預處理...\n")
                processed, methods_used = self.preprocessor.smart_preprocess(image)
                self.result_text.insert(tk.END, f"自動選擇的方法: {', '.join(methods_used)}\n")
            else:
                selected_methods = [method for method, var in self.preprocess_methods.items() if var.get()]
                if not selected_methods:
                    messagebox.showwarning("警告", "請至少選擇一種預處理方法")
                    return
                processed = self.preprocessor.preprocess_pipeline(image, selected_methods)
                methods_used = selected_methods
            
            # 保存處理後的圖像
            base_name = os.path.splitext(os.path.basename(input_path))[0]
            processed_path = os.path.join(output_dir, f"{base_name}_enhanced.png")
            
            if len(processed.shape) == 2:
                cv2.imwrite(processed_path, processed)
            else:
                cv2.imwrite(processed_path, processed)
            
            self.result_text.insert(tk.END, f"預處理完成，保存到: {processed_path}\n")
            
            # 顯示處理後的圖像
            self.root.after(0, self.display_image, processed_path, 'processed')
            
            # 解碼QR碼
            self.result_text.insert(tk.END, "\n開始嘗試多策略判讀...\n")
            available_engines = [name for name, av in self.engine_status.items() if av]
            self.result_text.insert(tk.END, f"使用引擎: {', '.join(available_engines)}\n")
            
            results = self.decoder.decode_multi_strategy(processed, early_stop=self.early_stop.get())
            
            processing_time = time.time() - start_time
            
            if results:
                self.result_text.insert(tk.END, f"\n✅ 成功判讀 {len(results)} 個內容 (耗時: {processing_time:.2f}秒):\n")
                self.result_text.insert(tk.END, "已自動複製到剪貼簿！\n")
                
                # 自動複製到剪貼簿
                primary_data = results[0]['data']
                self.root.clipboard_clear()
                self.root.clipboard_append(primary_data)

                for i, result in enumerate(results):
                    self.result_text.insert(tk.END, f"\n內容 #{i+1}:\n")
                    self.result_text.insert(tk.END, f"  引擎: {result['engine']}\n")
                    self.result_text.insert(tk.END, f"  數據: {result['data']}\n")
                    self.result_text.insert(tk.END, f"  置信度: {result['confidence']}\n")
                
                # 保存解碼結果
                result_data = {
                    'input_image': input_path,
                    'processed_image': processed_path,
                    'quality_assessment': quality,
                    'preprocess_methods': methods_used,
                    'processing_time': processing_time,
                    'qr_codes': results
                }
                
                result_path = os.path.join(output_dir, f"{base_name}_results.json")
                with open(result_path, 'w', encoding='utf-8') as f:
                    json.dump(result_data, f, ensure_ascii=False, indent=2)
                
                self.result_text.insert(tk.END, f"\n結果已保存到: {result_path}")
            else:
                self.result_text.insert(tk.END, f"\n❌ 未檢測到QR碼 (耗時: {processing_time:.2f}秒)\n")
                self.result_text.insert(tk.END, "\n建議:\n")
                self.result_text.insert(tk.END, "1. 嘗試使用ROI選擇功能手動框選QR碼區域\n")
                self.result_text.insert(tk.END, "2. 檢查圖像質量,如果過於模糊建議重新拍攝\n")
                self.result_text.insert(tk.END, "3. 嘗試不同的預處理方法組合\n")
        
        except Exception as e:
            self.result_text.insert(tk.END, f"\n判讀失敗: {str(e)}")
            messagebox.showerror("錯誤", f"判讀失敗: {str(e)}")

    def start_batch_processing(self):
        """開始批量處理"""
        input_dir = self.batch_input_dir.get()
        if not input_dir or not os.path.exists(input_dir):
            messagebox.showerror("錯誤", "請選擇有效的輸入目錄")
            return
        
        output_dir = self.output_dir.get()
        os.makedirs(output_dir, exist_ok=True)
        
        # 清空之前的結果
        self.batch_results = []
        for item in self.batch_tree.get_children():
            self.batch_tree.delete(item)
        
        # 在後台線程中處理
        threading.Thread(
            target=self.process_batch_images,
            args=(input_dir, output_dir),
            daemon=True
        ).start()
    
    def process_batch_images(self, input_dir, output_dir):
        """批量處理圖像"""
        try:
            # 獲取所有圖像文件
            supported_formats = ['.png', '.jpg', '.jpeg', '.bmp', '.tiff']
            image_files = [
                os.path.join(input_dir, f) for f in os.listdir(input_dir)
                if any(f.lower().endswith(fmt) for fmt in supported_formats)
            ]
            
            if not image_files:
                messagebox.showwarning("警告", "目錄中沒有找到圖像文件")
                return
            
            total_files = len(image_files)
            self.progress_var.set(0)
            self.progress_label.config(text=f"準備處理 {total_files} 個文件...")
            
            # 使用線程池並行處理
            max_workers = self.max_workers.get()
            completed = 0
            
            with ThreadPoolExecutor(max_workers=max_workers) as executor:
                # 提交所有任務
                future_to_file = {
                    executor.submit(self.process_single_image_batch, file_path, output_dir): file_path
                    for file_path in image_files
                }
                
                # 處理完成的任務
                for future in as_completed(future_to_file):
                    file_path = future_to_file[future]
                    try:
                        result = future.result()
                        self.batch_results.append(result)
                        
                        # 更新表格
                        self.root.after(0, self.update_batch_tree, result)
                        
                        # 更新進度
                        completed += 1
                        progress = (completed / total_files) * 100
                        self.progress_var.set(progress)
                        self.progress_label.config(
                            text=f"已處理 {completed}/{total_files} ({progress:.1f}%)"
                        )
                    
                    except Exception as e:
                        print(f"處理 {file_path} 時出錯: {e}")
            
            # 完成
            self.progress_label.config(text=f"✅ 批量處理完成! 共處理 {total_files} 個文件")
            messagebox.showinfo("完成", f"批量處理完成!\n成功: {sum(1 for r in self.batch_results if r['success'])} 個\n失敗: {sum(1 for r in self.batch_results if not r['success'])} 個")
        
        except Exception as e:
            messagebox.showerror("錯誤", f"批量處理失敗: {str(e)}")
    
    def process_single_image_batch(self, input_path, output_dir):
        """處理單張圖像(批量模式)"""
        start_time = time.time()
        
        try:
            # 讀取圖像
            image = cv2.imread(input_path)
            if image is None:
                raise ValueError("無法讀取圖像")
            
            # 智能預處理
            processed, methods_used = self.preprocessor.smart_preprocess(image)
            
            # 保存處理後的圖像
            base_name = os.path.splitext(os.path.basename(input_path))[0]
            processed_path = os.path.join(output_dir, f"{base_name}_enhanced.png")
            cv2.imwrite(processed_path, processed)
            
            # 解碼
            results = self.decoder.decode_multi_strategy(processed, early_stop=True)
            
            processing_time = time.time() - start_time
            
            if results:
                return {
                    'filename': os.path.basename(input_path),
                    'success': True,
                    'status': '成功',
                    'data': results[0]['data'],
                    'engine': results[0]['engine'],
                    'processing_time': f"{processing_time:.2f}s"
                }
            else:
                return {
                    'filename': os.path.basename(input_path),
                    'success': False,
                    'status': '失敗',
                    'data': '未檢測到QR碼',
                    'engine': '-',
                    'processing_time': f"{processing_time:.2f}s"
                }
        
        except Exception as e:
            return {
                'filename': os.path.basename(input_path),
                'success': False,
                'status': '錯誤',
                'data': str(e),
                'engine': '-',
                'processing_time': f"{time.time() - start_time:.2f}s"
            }
    
    def update_batch_tree(self, result):
        """更新批量處理結果表格"""
        tag = 'success' if result['success'] else 'failure'
        self.batch_tree.insert('', tk.END, values=(
            result['filename'],
            result['status'],
            result['data'][:50] + '...' if len(result['data']) > 50 else result['data'],
            result['processing_time'],
            result['engine']
        ), tags=(tag,))
        
        # 設置顏色
        self.batch_tree.tag_configure('success', background='#d4edda')
        self.batch_tree.tag_configure('failure', background='#f8d7da')
    
    def export_results_csv(self):
        """導出結果為CSV"""
        if not self.batch_results:
            messagebox.showwarning("警告", "沒有可導出的結果")
            return
        
        file_path = filedialog.asksaveasfilename(
            defaultextension=".csv",
            filetypes=[("CSV文件", "*.csv"), ("所有文件", "*.*")]
        )
        
        if file_path:
            try:
                import csv
                with open(file_path, 'w', newline='', encoding='utf-8-sig') as f:
                    writer = csv.DictWriter(f, fieldnames=['filename', 'status', 'data', 'engine', 'processing_time'])
                    writer.writeheader()
                    writer.writerows(self.batch_results)
                
                messagebox.showinfo("成功", f"結果已導出到: {file_path}")
            except Exception as e:
                messagebox.showerror("錯誤", f"導出失敗: {str(e)}")
    
    def export_results_excel(self):
        """導出結果為Excel"""
        if not PANDAS_AVAILABLE:
            messagebox.showerror("錯誤", "需要安裝pandas和openpyxl庫")
            return
        
        if not self.batch_results:
            messagebox.showwarning("警告", "沒有可導出的結果")
            return
        
        file_path = filedialog.asksaveasfilename(
            defaultextension=".xlsx",
            filetypes=[("Excel文件", "*.xlsx"), ("所有文件", "*.*")]
        )
        
        if file_path:
            try:
                df = pd.DataFrame(self.batch_results)
                df.to_excel(file_path, index=False, engine='openpyxl')
                messagebox.showinfo("成功", f"結果已導出到: {file_path}")
            except Exception as e:
                messagebox.showerror("錯誤", f"導出失敗: {str(e)}")
    
    def clear_batch_results(self):
        """清空批量處理結果"""
        self.batch_results = []
        for item in self.batch_tree.get_children():
            self.batch_tree.delete(item)
        self.progress_var.set(0)
        self.progress_label.config(text="等待開始...")
    
    def reset_tool(self):
        """重置工具"""
        self.input_image_path.set("")
        self.original_canvas.delete('all')
        self.processed_canvas.delete('all')
        self.result_text.delete(1.0, tk.END)
    
    def run(self):
        """運行工具"""
        self.root.mainloop()


def main():
    """主函數"""
    try:
        app = QRCodeEnhancerGUI()
        app.run()
    except Exception as e:
        messagebox.showerror("錯誤", f"無法啟動工具: {str(e)}")


if __name__ == "__main__":
    main()
