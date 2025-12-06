// 高鐵搶票小幫手 - 模板處理器

async function loadPythonTemplate() {
  try {
    const response = await fetch('thsr_booking_template.py');
    return await response.text();
  } catch (error) {
    console.error('載入模板失敗:', error);
    return null;
  }
}

function generatePythonFromTemplate(template, config) {
  let code = template;

  // 替換所有佔位符
  code = code.replace(/\{\{START_STATION\}\}/g, config.startStation);
  code = code.replace(/\{\{END_STATION\}\}/g, config.endStation);
  code = code.replace(/\{\{DEPART_DATE\}\}/g, config.departDate);
  code = code.replace(/\{\{DEPART_TIME\}\}/g, config.departTime);
  code = code.replace(/\{\{TICKET_QTY\}\}/g, config.ticketQty);
  code = code.replace(/\{\{TRAIN_NO\}\}/g, config.trainNo);
  code = code.replace(/\{\{REFRESH_INTERVAL\}\}/g, config.refreshInterval);

  return code;
}
