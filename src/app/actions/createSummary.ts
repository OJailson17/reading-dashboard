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
  model: 'gemini-2.5-flash',
});

const generationConfig = {
  temperature: 0.9,
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

  const prompt = `Write a short and simple summary of the book "${bookTitle}" by ${bookAuthor}. Respond in the same language as the book title. If the title is in English or Portuguese, use that language. If the title is in any other language, respond in English. Do not repeat the book title in the answer, and do not use markdown or extra formatting.`;

  const result = await chatSession.sendMessage(prompt);

  return result.response.text();
};
