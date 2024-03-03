export type BookStatus = 'To read' | 'Reading' | 'Finished';

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
};
