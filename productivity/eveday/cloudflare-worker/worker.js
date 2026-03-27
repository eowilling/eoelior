/**
 * eoElior — Gemini API Proxy (Cloudflare Worker)
 *
 * 部署步驟：
 * 1. 前往 https://workers.cloudflare.com 建立免費帳號
 * 2. 建立新 Worker，貼上此程式碼
 * 3. 在 Worker 設定 > Variables 加入：
 *    GEMINI_API_KEY = 你的 Gemini API Key
 * 4. 部署後複製 Worker URL
 * 5. 將 eveday/index.html 裡的 API_PROXY_URL 改為你的 Worker URL
 */

const ALLOWED_ORIGINS = [
  "https://eowilling.github.io",
  "http://localhost",
  "http://127.0.0.1",
];

const GEMINI_BASE = "https://generativelanguage.googleapis.com";

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const isAllowed = ALLOWED_ORIGINS.some((o) => origin.startsWith(o));

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders(isAllowed ? origin : ""),
      });
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405);
    }

    if (!env.GEMINI_API_KEY) {
      return json({ error: "GEMINI_API_KEY not configured" }, 500);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400);
    }

    const prompt = body.prompt;
    if (!prompt) {
      return json({ error: "prompt is required" }, 400);
    }

    const model = body.model || "gemini-2.0-flash-exp";
    const url = `${GEMINI_BASE}/v1beta/models/${model}:generateContent?key=${env.GEMINI_API_KEY}`;

    const geminiRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data = await geminiRes.json();

    return new Response(JSON.stringify(data), {
      status: geminiRes.status,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders(isAllowed ? origin : ""),
      },
    });
  },
};

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin || "https://eowilling.github.io",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
