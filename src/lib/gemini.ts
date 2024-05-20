import { GoogleGenerativeAI } from '@google/generative-ai';

const geminiApiKey = `${process.env.GEMINI_API_KEY}`;

export const genAI = new GoogleGenerativeAI(geminiApiKey);
