'use client';

import { BookSlideComponent } from './BookSlide';

import { Book } from '@/types/bookTypes';
import { BookSlide, LibraryComponent, LibraryComponentWrapper } from './styles';
import Link from 'next/link';

interface LibraryBooks {
	reading_books: Book[];
	finished_books: Book[];
	to_read_books?: Book[];
}

export const Library = ({
	reading_books,
	finished_books,
	to_read_books,
}: LibraryBooks) => {
	return (
		<LibraryComponentWrapper>
			<LibraryComponent>
				<header>
					<p className='library-component-title'>Library</p>

					{!to_read_books ? (
						<Link href={'/library'}>more</Link>
					) : (
						<Link href={'/'}>home</Link>
					)}
				</header>

				{to_read_books && (
					<div>
						<p className='library-component-subtitle'>
							TBR ({to_read_books.length || 0})
						</p>
						<BookSlide>
							<BookSlideComponent books={to_read_books} />
						</BookSlide>
					</div>
				)}

				<div>
					<p className='library-component-subtitle'>
						Reading ({reading_books.length || 0})
					</p>
					<BookSlide>
						<BookSlideComponent books={reading_books} />
					</BookSlide>
				</div>
				<div>
					<p className='library-component-subtitle'>
						Finished ({finished_books.length || 0})
					</p>
					<BookSlide>
						<BookSlideComponent books={finished_books} />
					</BookSlide>
				</div>
			</LibraryComponent>
		</LibraryComponentWrapper>
	);
};
