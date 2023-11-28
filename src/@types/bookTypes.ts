type TitleProperty = {
	plain_text: string;
};

export type Book = {
	object: string;
	id: string;
	icon: {
		external: {
			url: string;
		};
	};
	properties: {
		Author: {
			id: string;
			rich_text: TitleProperty[];
		};
		Rating: {
			id: string;
			type: string;
			select: {
				name: string;
			};
		};
		Status: {
			id: string;
			type: string;
			select: {
				id: string;
				name: 'To read' | 'Reading' | 'Finished';
				color: string;
			};
		};
		Name: {
			id: string;
			type: string;
			title: TitleProperty[];
		};
		'Current Page': {
			id: string;
			type: number;
			number: number;
		};
		'Qtd. Pages': {
			id: string;
			type: number;
			number: number;
		};
		'Finished Date': {
			id: string;
			type: string;
			date: {
				start: string;
			};
		};
		Goodreads: {
			id: string;
			type: string;
			select: {
				name: string;
			};
		};
	};
};

export type ReadingStatus = 'To read' | 'Reading' | 'Finished';

export type CreateBook = {
	icon_url?: string | undefined;
	started_date?: string;
	finished_date?: string;
	name: string;
	genres: string[];
	author: string;
	status: ReadingStatus;
	language: 'Portuguese' | 'English' | 'Spanish';
	qtd_page: number;
	current_page: number;
	goodreads_review: string;
	book_review: string;
	book_price?: string | null;
};
