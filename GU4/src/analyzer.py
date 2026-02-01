# -*- coding: utf-8 -*-
"""
AI 分析器模組 (Google Gemini)
"""
import logging
from typing import Optional, Dict, Any, List
import time

from src.config import get_config
from src.utils import format_number, format_percentage
import warnings

# 抑制 google.generativeai 的過時警告
warnings.filterwarnings("ignore", category=FutureWarning, module="google.generativeai")

try:
    import google.generativeai as genai
except ImportError:
    genai = None

logger = logging.getLogger(__name__)


class StockAnalyzer:
    """
    股票 AI 分析器
    
    使用 Google Gemini 進行深度分析
    """
    
    def __init__(self):
        config = get_config()
        
        if not config.gemini_api_key:
            raise ValueError("未配置 GEMINI_API_KEY")
        
        if genai is None:
            raise ImportError("請安裝 google-generativeai: pip install google-generativeai")
        
        # 配置 Gemini
        genai.configure(api_key=config.gemini_api_key)
        
        # 使用 gemini-2.0-flash 模型（穩定免費模型）
        self.model = genai.GenerativeModel('gemini-2.0-flash')
        
        logger.info("[AI] Gemini 分析器初始化成功")
    
    def analyze_stock(
        self, 
        stock_code: str,
        stock_name: str,
        technical_data: Dict[str, Any],
        news: Optional[str] = None
    ) -> str:
        """
        分析單隻股票
        
        Args:
            stock_code: 股票代碼
            stock_name: 股票名稱
            technical_data: 技術數據
            news: 新聞摘要 (可選)
            
        Returns:
            分析報告文本
        """
        try:
            prompt = self._build_analysis_prompt(
                stock_code, 
                stock_name, 
                technical_data, 
                news
            )
            
            logger.info(f"[AI] 開始分析 {stock_code} {stock_name}")
            
            # 調用 Gemini API
            response = self.model.generate_content(prompt)
            
            logger.info(f"[AI] {stock_code} 分析完成")
            return response.text
            
        except Exception as e:
            logger.error(f"[AI] 分析 {stock_code} 失敗: {e}")
            return f"❌ AI 分析失敗: {str(e)}"
    
    def _build_analysis_prompt(
        self,
        stock_code: str,
        stock_name: str,
        data: Dict[str, Any],
        news: Optional[List[Dict]] = None
    ) -> str:
        """
        構建分析提示詞 (針對台股優化)
        """
        # 提取數據
        quote = data.get('quote', {})
        latest = data.get('latest', {})
        ma_status = data.get('ma_status', {})
        indicators = data.get('indicators', {})
        
        prompt = f"""你是一位專業的台股技術分析師，請分析以下股票並給出投資建議。

# 📊 股票資訊
- 代碼: {stock_code}
- 名稱: {stock_name}

# 💹 當前行情
- 最新價: {quote.get('price', 'N/A')} 元
- 漲跌幅: {format_percentage(quote.get('change_pct', 0))}
- 成交量: {format_number(quote.get('volume', 0), 0)} 股
- 開盤: {quote.get('open', 'N/A')} 元
- 最高: {quote.get('high', 'N/A')} 元
- 最低: {quote.get('low', 'N/A')} 元

# 📈 技術指標
## 移動平均線
- MA5: {format_number(latest.get('ma5', 0))}
- MA10: {format_number(latest.get('ma10', 0))}
- MA20: {format_number(latest.get('ma20', 0))}
- MA60: {format_number(latest.get('ma60', 0))}

## 趨勢指標
- RSI(14): {format_number(latest.get('rsi', 0))}
- MACD: {format_number(latest.get('macd', 0))}
- MACD Signal: {format_number(latest.get('macd_signal', 0))}
- 量比: {format_number(latest.get('volume_ratio', 0))}

## 均線狀態
{ma_status.get('description', '未計算')}
- 乖離率: {format_percentage(ma_status.get('bias', 0))}

## 布林帶
- 上軌: {format_number(latest.get('bb_upper', 0))}
- 中軌: {format_number(latest.get('bb_mid', 0))}
- 下軌: {format_number(latest.get('bb_lower', 0))}

# 🇹🇼 台股交易規則
- **漲跌停限制**: ±10% (普通股票)
- **交割制度**: T+2 (買進後第2個營業日交割)
- **交易時間**: 
  - 盤中: 09:00-13:30
  - 盤後: 14:00-14:30
  - 零股: 13:40-14:30
- **當沖**: 允許，但需注意風險

# 📋 分析要求
請提供**繁體中文**分析，包含以下部分：

## 1. 🎯 一句話結論 (30字內)
明確給出操作建議: **買入**、**觀望**或**賣出**

## 2. 💡 核心理由 (50字內)
說明判斷的主要依據

## 3. 📊 技術面分析
- **趨勢判斷**: 多頭/空頭/盤整
- **均線系統**: 排列狀態與支撐壓力
- **量價關係**: 量能是否配合
- **技術指標**: RSI、MACD 等解讀
- **關鍵價位**: 
  - 支撐位: XX 元
  - 壓力位: XX 元

## 4. 💰 操作建議
- **操作方向**: 買入/觀望/賣出
- **進場價位**: XX 元 (若為買入)
- **停損價位**: XX 元
- **目標價位**: XX 元
- **持倉比例**: 輕倉(20%)/半倉(50%)/重倉(80%)

## 5. ⚠️ 風險提示
列出3-5個需要注意的風險點

## 6. ✅ 檢查清單
用 ✅ ⚠️ ❌ 標記以下項目:
- [ ] 趨勢向上 (MA5 > MA10 > MA20)
- [ ] 乖離率安全 (絕對值 < 5%)
- [ ] 量能配合 (量比 > 1.0)
- [ ] 未接近漲停 (漲幅 < 8%)
- [ ] RSI 健康 (30 < RSI < 70)
- [ ] MACD 金叉向上

# ⚠️ 重要提醒
1. 價格建議必須務實，不可過度樂觀
2. 強調風險管理，設定明確停損
3. 嚴禁追高，乖離率 > 5% 須警告
4. 考慮台股T+2交割制度的資金占用
"""

        # 如果有新聞，加入新聞分析
        if news and len(news) > 0:
            news_text = "\n".join([
                f"- [{item.get('source', '未知來源')}] {item.get('title', '無標題')}\n  連結: {item.get('link', '')}"
                for item in news[:5]
            ])
            prompt += f"""

# 📰 市場情報
{news_text}

請結合以上新聞進行綜合分析，評估對股價的影響。
"""
        
        return prompt
    
    def analyze_market(self, market_data: Dict[str, Any]) -> str:
        """
        分析大盤走勢
        
        Args:
            market_data: 大盤數據
            
        Returns:
            大盤分析報告
        """
        try:
            prompt = f"""你是台股分析專家，請分析今日大盤走勢。

# 加權指數
- 指數: {market_data.get('index', 'N/A')}
- 漲跌: {market_data.get('change', 'N/A')}
- 漲跌幅: {format_percentage(market_data.get('change_pct', 0))}
- 成交量: {format_number(market_data.get('volume', 0), 0)} 億

# 市場狀況
- 上漲家數: {market_data.get('up_count', 'N/A')}
- 下跌家數: {market_data.get('down_count', 'N/A')}
- 平盤家數: {market_data.get('flat_count', 'N/A')}
- 漲停: {market_data.get('limit_up', 'N/A')}
- 跌停: {market_data.get('limit_down', 'N/A')}

請用**繁體中文**提供:
1. 🎯 大盤趨勢判斷 (多頭/空頭/盤整)
2. 😊 市場情緒分析 (樂觀/中性/悲觀)
3. 🔮 後市展望 (短期1-3天)
4. 💡 操作建議

限制在 300 字內。
"""
            
            response = self.model.generate_content(prompt)
            return response.text
            
        except Exception as e:
            logger.error(f"[AI] 大盤分析失敗: {e}")
            return f"❌ 大盤分析失敗: {str(e)}"
