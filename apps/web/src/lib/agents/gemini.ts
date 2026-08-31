/**
 * Google Gemini AI Integration for Lilita Keper Agent Portal
 * Supports Gemini 2.0 Flash & Gemini 1.5 Pro for autonomous booking workflows
 */

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models";

export type GeminiModel = "gemini-2.0-flash" | "gemini-1.5-pro" | "gemini-1.5-flash";

export interface GeminiMessage {
  role: "user" | "model";
  parts: Array<{ text: string }>;
}

export interface GeminiContent {
  role: "user" | "model";
  parts: Array<{ text: string }>;
}

export const GEMINI_MODELS = {
  FLASH_20: "gemini-2.0-flash" as GeminiModel,
  PRO_15: "gemini-1.5-pro" as GeminiModel,
  FLASH_15: "gemini-1.5-flash" as GeminiModel,
};

export const HAS_GEMINI = !!process.env.GOOGLE_GEMINI_API_KEY;
export const GEMINI_MODEL = (process.env.GEMINI_MODEL ?? GEMINI_MODELS.FLASH_20) as GeminiModel;

interface CallGeminiParams {
  systemPrompt: string;
  messages: Array<{ role: "user" | "model"; text: string }>;
  maxTokens?: number;
  temperature?: number;
  model?: GeminiModel;
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{ text: string }>;
    };
    finishReason: string;
  }>;
}

/**
 * Call Google Gemini AI for booking automation, payment tracking, email generation
 * Supports vision for document analysis and multi-turn conversations
 */
export async function callGemini({
  systemPrompt,
  messages,
  maxTokens = 1200,
  temperature = 0.7,
  model = GEMINI_MODEL,
}: CallGeminiParams): Promise<string> {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) throw new Error("GOOGLE_GEMINI_API_KEY is not configured");

  const contents: GeminiContent[] = [
    {
      role: "user",
      parts: [{ text: systemPrompt }],
    },
    ...messages.map((m) => ({
      role: m.role,
      parts: [{ text: m.text }],
    })),
  ];

  const requestUrl = `${GEMINI_API_URL}/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents,
      generationConfig: {
        maxOutputTokens: maxTokens,
        temperature,
        topP: 0.95,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_NONE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_NONE",
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Google Gemini API error: ${response.status} ${errorText}`
    );
  }

  const data = (await response.json()) as GeminiResponse;

  if (!data.candidates || data.candidates.length === 0) {
    throw new Error("No candidates returned from Gemini API");
  }

  return data.candidates[0].content.parts
    .filter((part) => part.text)
    .map((part) => part.text)
    .join("");
}

/**
 * Extract and parse JSON from Gemini responses
 */
export function extractGeminiJson<T = unknown>(text: string): T {
  const cleaned = text
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/, "")
    .trim();
  return JSON.parse(cleaned) as T;
}

/**
 * Use Gemini 2.0 Flash for real-time booking responses (faster)
 */
export async function callGeminiFast(params: CallGeminiParams): Promise<string> {
  return callGemini({
    ...params,
    model: GEMINI_MODELS.FLASH_20,
  });
}

/**
 * Use Gemini 1.5 Pro for complex analysis and multi-turn conversations (more capable)
 */
export async function callGeminiPro(params: CallGeminiParams): Promise<string> {
  return callGemini({
    ...params,
    model: GEMINI_MODELS.PRO_15,
  });
}
