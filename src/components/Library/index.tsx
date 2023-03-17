import Image from 'next/image';
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
	books: Book[];
}

export const Library = ({ books }: LibraryBooks) => {
	return (
		<LibraryComponentWrapper>
			<LibraryComponent>
				<p className='library-component-title'>Library</p>

				<BookSlide>
					{books.map(book => (
						<BookComponent key={book.id}>
							{book.icon?.external?.url ? (
								/* eslint-disable-next-line @next/next/no-img-element */
								<img
									src={book?.icon?.external?.url}
									alt=''
									style={{
										borderRadius: '10px',
									}}
								/>
							) : (
								<div className='placeholder-cover'>
									<p>{book.properties.Name.title[0].plain_text}</p>
								</div>
							)}
						</BookComponent>
					))}
				</BookSlide>
			</LibraryComponent>
		</LibraryComponentWrapper>
	);
};
