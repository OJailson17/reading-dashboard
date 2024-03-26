export type BookStatus = 'To read' | 'Reading' | 'Finished';

export type BookLanguages = 'Portuguese' | 'English' | 'Spanish';

export type Genre = {
	name: string;
	color: string;
};

export type Book = {
	id: string;
	title: string;
	author: string;
	total_pages: number;
	status: BookStatus;
	cover_url: string;
	current_page: number;
	started_date: string | null;
	finished_date: string | null;
	review?: string;
	goodreads?: string;
	genres: Genre[];
	qtd_days: number;
	book_price?: string | null;
	language: BookLanguages;
};
