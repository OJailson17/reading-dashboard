/* eslint-disable @next/next/no-img-element */
'use client';

import * as Dialog from '@radix-ui/react-dialog';

import {
	DialogClose,
	DialogContent,
	DialogContentBookInfo,
	DialogContentContainer,
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

interface BookDialogProps {
	book: Book | null;
}

export const BookDialog = ({ book }: BookDialogProps) => {
	return (
		<Dialog.Portal>
			<DialogOverlay />

			<DialogContent>
				<DialogTitle>{book?.properties.Name.title[0].plain_text}</DialogTitle>
				<DialogContentContainer>
					{/* If there is a book cover, show the image, if not, show the placeholder cover */}
					{book?.icon?.external?.url ? (
						<img src={book?.icon.external.url} alt='' />
					) : (
						<div
							className='placeholder-cover-dialog'
							data-title={book?.properties.Name.title[0].plain_text}
						>
							<p>{book?.properties.Name.title[0].plain_text}</p>
						</div>
					)}
					<DialogContentBookInfo>
						<div>
							<span>Author:</span>
							<span>{book?.properties.Author.rich_text[0].plain_text}</span>
						</div>
						<div>
							<span>Status:</span>
							<span className={book?.properties.Status.select.name}>
								{book?.properties.Status.select.name}
							</span>
						</div>
						<div>
							<span>Pages:</span>
							<span>{book?.properties['Qtd. Pages'].number}</span>
						</div>
						{/* Show the rating ig the book status is Finished */}
						{book?.properties.Status.select.name === 'Finished' && (
							<div>
								<span>Rating</span>
								<span>{book.properties.Rating.select.name}</span>
							</div>
						)}
					</DialogContentBookInfo>
				</DialogContentContainer>
				<DialogClose>Close</DialogClose>
			</DialogContent>
		</Dialog.Portal>
	);
};
