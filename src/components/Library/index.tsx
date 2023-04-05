'use client';

import { Book } from '@/types/bookTypes';
import { BookSlideComponent } from './BookSlide';
import { BookSlide, LibraryComponent, LibraryComponentWrapper } from './styles';

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
