import { validateISBN } from './validateISBN';
import { validateURL } from './validateUrl';

export const handleFormatCoverURL = (cover_url: string) => {
	const isCoverValidURL = validateURL(cover_url);

	const startsWithZero = cover_url.startsWith('0');

	const isCoverValidISBN =
		cover_url.trim() !== '' &&
		validateISBN({ isbn: Number(cover_url), startsWithZero });

	if (!isCoverValidURL && !isCoverValidISBN) cover_url = '';

	if (isCoverValidURL) cover_url = cover_url;
	if (isCoverValidISBN)
		cover_url = `https://covers.openlibrary.org/b/isbn/${cover_url.trim()}-M.jpg`;

	return cover_url;
};
