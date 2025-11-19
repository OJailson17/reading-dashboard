import { GoogleGenAI } from '@google/genai';

const geminiApiKey = `${process.env.GEMINI_API_KEY}`;

export const genAI = new GoogleGenAI({
  apiKey: geminiApiKey,
});
