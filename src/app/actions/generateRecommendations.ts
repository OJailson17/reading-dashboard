'use server';

import { genAI } from '@/lib/gemini';
import { HarmBlockThreshold, HarmCategory } from '@google/genai';

import { getSession } from './getSession';
import { onSignOut } from './signOut';

type Book = {
  title: string;
  author: string;
};

type RecommendationsProps = {
  books: Book[];
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
const pastRecommendations = new Set();

export const generateRecommendations = async ({
  books,
}: RecommendationsProps) => {
  const session = await getSession();

  if (!session || session?.database_id !== process.env.ADMIN_DATABASE_ID) {
    await onSignOut();
  }

  const prompt = `You will receive a list of books in the form of an object array (as a string). Your task is to recommend exactly one new book that is not already in the list or in the list of previously recommended books. The recommendation must still match the genres, themes, or style of the provided books.

Rules:

  - Never recommend a book that already appears in the input list.
  - Never recommend a book that has been given before. A list of previously recommended books is provided at the end.
  - Return only one book recommendation.
  - the book can be in Portuguese or English.

The output must be in the same object format as the input, but include additional properties:
  pages (number of pages)
  isbn (the ISBN-10 code of the book)
  genres (an array of genres for the book, even if there is only one)

Avoid the most common or obvious recommendations. Favor variety, including lesser-known or alternative works, while keeping them relevant.

Do not include explanations, just return the object.

Do not recommend any of these again.
Here are books that have already been recommended before:
${JSON.stringify(Array.from(pastRecommendations))}

The following is the list of books:
  
  ${JSON.stringify(books, null, 2)}
  `;

  const response = await getRecommendation(prompt);

  if (!wasBookRecommended(JSON.parse(response))) {
    return await getRecommendation(prompt);
  }

  return response;
};

const getRecommendation = async (prompt: string) => {
  const response = await genAI.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      safetySettings,
      temperature: 0.9,
      responseMimeType: 'text/plain',
    },
  });

  if (!response.text) {
    return '';
  }

  const formattedResponse = response.text.replace(/```json|```/g, '').trim();
  return formattedResponse;
};

const wasBookRecommended = (rec: Book) => {
  if (pastRecommendations.has(rec.title)) return false;

  pastRecommendations.add(rec.title);
  return true;
};
