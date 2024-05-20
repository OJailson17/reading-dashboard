'use server';

import { genAI } from '@/lib/gemini';
import { HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

import { getSession } from './getSession';
import { onSignOut } from './signOut';

type SummarizeProps = {
  bookTitle: string;
  bookAuthor: string;
};

const model = genAI.getGenerativeModel({
  model: 'gemini-1.0-pro-latest',
});

const generationConfig = {
  temperature: 0.5,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

export const createSummary = async ({
  bookAuthor,
  bookTitle,
}: SummarizeProps) => {
  const session = await getSession();

  if (!session || session?.database_id !== process.env.ADMIN_DATABASE_ID) {
    await onSignOut();
  }

  const chatSession = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  const prompt = `make a short, simple summary about the book "${bookTitle}" by ${bookAuthor}. Answer in the same language as the book title. The titles of the books will be in English or Portuguese, if it's in another language, answer in English. Don't need to put the title in the beginning and don't use markdown`;

  const result = await chatSession.sendMessage(prompt);

  return result.response.text();
};
