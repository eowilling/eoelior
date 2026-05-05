# -*- coding: utf-8 -*-
"""
AI 分析器模組 (使用 Google Gemini)
"""
import logging
from typing import Optional, Dict, Any
import google.generativeai as genai
from src.config import get_config

logger = logging.getLogger(__name__)


class StockAnalyzer:
    """
    股票 AI 分析器
    
    使用 Google Gemini 進行智能分析
    """
    
    def __init__(self):
        config = get_config()
        
        if not config.gemini_api_key:
            raise ValueError("未配置 GEMINI_API_KEY")
        
        # 配置 Gemini
        genai.configure(api_key=config.gemini_api_key)
        self.model = genai.GenerativeModel('gemini-pro')
        
        logger.info("AI 分析器初始化成功")
    
    def analyze_stock(
        self, 
        stock_code: str,
        stock_name: str,
        data: Dict[str, Any],
        news: Optional[str] = None
    ) -> str:
        """
        分析單隻股票
        
        Args:
            stock_code: 股票代碼
            stock_name: 股票名稱
            data: 技術數據字典
            news: 新聞摘要 (可選)
            
        Returns:
            分析報告文本
        """
        try:
            prompt = self._build_prompt(stock_code, stock_name, data, news)
            
            logger.info(f"開始分析 {stock_code} {stock_name}")
            response = self.model.generate_content(prompt)
            
            return response.text
            
        except Exception as e:
            logger.error(f"分析 {stock_code} 失敗: {e}")
            return f"❌ 分析失敗: {str(e)}"
    
    def _build_prompt(
        self,
        stock_code: str,
        stock_name: str,
        data: Dict[str, Any],
        news: Optional[str] = None
    ) -> str:
        """
        構建分析提示詞
        
        針對台股市場特性優化
        """
        # 提取數據
        current = data.get('current', {})
        latest = data.get('latest', {})
        ma_status = data.get('ma_status', {})
        
        prompt = f"""你是一位專業的台股分析師，請分析以下股票並給出投資建議。

# 股票資訊
- 代碼: {stock_code}
- 名稱: {stock_name}

# 技術面數據
## 當前行情
- 最新價: {current.get('price', 'N/A')} 元
- 漲跌幅: {current.get('change_pct', 'N/A')}%
- 成交量: {current.get('volume', 'N/A')} 張

## 技術指標
- MA5: {latest.get('ma5', 'N/A')}
- MA10: {latest.get('ma10', 'N/A')}
- MA20: {latest.get('ma20', 'N/A')}
- MA60: {latest.get('ma60', 'N/A')}
- 量比: {latest.get('volume_ratio', 'N/A')}

## 均線排列
{ma_status.get('description', '未計算')}

# 台股交易規則提醒
- 漲跌停限制: ±10%
- 交割制度: T+2 (買進後第2個營業日交割)
- 交易時間: 09:00-13:30
- 零股交易: 盤後 14:30-15:00

# 分析要求
請提供以下內容（使用繁體中文）:

1. **一句話結論** (30字內，包含明確操作建議：買入/觀望/賣出)

2. **核心理由** (50字內，說明主要判斷依據)

3. **技術面分析**
   - 趨勢判斷 (多頭/空頭/盤整)
   - 均線系統評估
   - 量價關係分析
   - 支撐/壓力位

4. **操作建議**
   - 操作方向: 買入/觀望/賣出
   - 建議買入價: XX 元 (若為買入)
   - 停損價: XX 元
   - 目標價: XX 元
   - 持倉建議: 輕倉/半倉/重倉

5. **風險提示**
   - 主要風險點
   - 需要關注的指標

6. **檢查清單** (使用 ✅ ⚠️ ❌ 標記)
   - [ ] 趨勢向上 (MA5 > MA10 > MA20)
   - [ ] 乖離率安全 (< 5%)
   - [ ] 量能配合 (量比 > 1)
   - [ ] 未接近漲停 (< 8%)
   - [ ] 技術面健康

請確保建議價格務實可行，避免追高。
"""

        # 如果有新聞，加入新聞分析
        if news:
            prompt += f"""

# 市場情報
{news}

請結合新聞內容進行綜合分析。
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

# 大盤數據
- 加權指數: {market_data.get('taiex', 'N/A')}
- 漲跌幅: {market_data.get('change_pct', 'N/A')}%
- 成交量: {market_data.get('volume', 'N/A')} 億
- 漲家數: {market_data.get('up_count', 'N/A')}
- 跌家數: {market_data.get('down_count', 'N/A')}

請提供:
1. 大盤走勢判斷 (多頭/空頭/盤整)
2. 市場情緒分析
3. 後市展望
4. 操作建議

使用繁體中文，200字內。
"""
            
            response = self.model.generate_content(prompt)
            return response.text
            
        except Exception as e:
            logger.error(f"分析大盤失敗: {e}")
            return f"❌ 大盤分析失敗: {str(e)}"
