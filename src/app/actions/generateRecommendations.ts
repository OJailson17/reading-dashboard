'use server';

import { genAI } from '@/lib/gemini';
import { HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

import { getSession } from './getSession';
import { onSignOut } from './signOut';

type Book = {
  title: string;
  author: string;
};

type RecommendationsProps = {
  books: Book[];
};

const model = genAI.getGenerativeModel({
  model: 'gemini-1.0-pro-latest',
});

const generationConfig = {
  temperature: 0.5,
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

export const generateRecommendations = async ({
  books,
}: RecommendationsProps) => {
  const session = await getSession();

  if (!session || session?.database_id !== process.env.ADMIN_DATABASE_ID) {
    await onSignOut();
  }

  const chatSession = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  const prompt = `based on this list of books, recommend me a new book, but just one. The new book can't be one of the list. Return me an object on the same structure as the list objects, but adding the amount of pages, the genre(s) and the ISBN-10 code. If there is just one genre, keep it in a array. The ISBN code should be add in a property called isbn"
  
  ${JSON.stringify(books)}
  `;

  const result = await chatSession.sendMessage(prompt);

  return result.response.text();
};
