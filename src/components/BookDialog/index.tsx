'use client';

import * as Dialog from '@radix-ui/react-dialog';

import {
	DialogClose,
	DialogContent,
	DialogOverlay,
	DialogTitle,
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

interface BookDialogProps {
	book: Book | null;
}

export const BookDialog = ({ book }: BookDialogProps) => {
	return (
		<Dialog.Portal>
			<DialogOverlay />

			<DialogContent>
				<DialogTitle>{book?.properties.Name.title[0].plain_text}</DialogTitle>
				<p>Book Content</p>
				<DialogClose>Close</DialogClose>
			</DialogContent>
		</Dialog.Portal>
	);
};
