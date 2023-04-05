'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useState, SyntheticEvent } from 'react';
import { BookDialog } from '../BookDialog';
import { BookSlideComponent } from './BookSlide';
import {
	BookComponent,
	BookSlide,
	LibraryComponent,
	LibraryComponentWrapper,
} from './styles';

interface TitleProperty {
	plain_text: string;
}

interface Book {
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
				name: string;
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
	};
}

interface LibraryBooks {
	reading_books: Book[];
	finished_books: Book[];
}

export const Library = ({ reading_books, finished_books }: LibraryBooks) => {
	return (
		<LibraryComponentWrapper>
			<LibraryComponent>
				<p className='library-component-title'>Library</p>

				<div>
					<p className='library-component-subtitle'>Reading</p>
					<BookSlide>
						<BookSlideComponent books={reading_books} />
					</BookSlide>
				</div>
				<div>
					<p className='library-component-subtitle'>Finished</p>
					<BookSlide>
						<BookSlideComponent books={finished_books} />
					</BookSlide>
				</div>
			</LibraryComponent>
		</LibraryComponentWrapper>
	);
};
