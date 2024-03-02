import { Header } from '@/components/Header';
import Link from 'next/link';
import { IoIosSearch } from 'react-icons/io';
import { GiBookshelf } from 'react-icons/gi';
import { FinishedStatisticCard } from '@/components/FinishedStatisticsCard';
import { ReadingCard } from '@/components/ReadingCard';
import { TBRCard } from '@/components/TBRCard';
import { FinishedCard } from '@/components/FinishedCard';
import { GoalsCard } from '@/components/GoalsCard';
import { GenreStatisticsChart } from '@/components/Charts/GenreStatisticChart';
import { YearlyChart } from '@/components/Charts/YearlyChart';
import { Footer } from '@/components/Footer';

interface BookProperties {
	Author: {
		rich_text: [
			{
				plain_text: string;
			},
		];
	};
	Name: {
		title: [
			{
				plain_text: string;
			},
		];
	};
	'Qtd. Pages': {
		number: number;
	};
	'Current Page': {
		number: number;
	};
	Status: {
		select: {
			name: string;
		};
	};
}

interface NotionBookProps {
	id: string;
	icon: {
		external: {
			url: string;
		};
	};
	properties: BookProperties;
}
interface Book {
	id: string;
	author: string;
	title: string;
	current_page: number;
	total_pages: number;
	status: string;
}

export default async function Home() {
	const formatBooks = (books: NotionBookProps[]) => {
		const formattedBooks = books.map(book => {
			const properties = book.properties;

			return {
				id: book.id,
				author: properties.Author.rich_text[0].plain_text,
				title: properties.Name.title[0].plain_text,
				current_page: properties['Current Page'].number,
				total_pages: properties['Qtd. Pages'].number,
				status: properties.Status.select.name,
				cover_url: book.icon.external.url,
			};
		});

		return formattedBooks;
	};

	const fetchBooks = async () => {
		try {
			const response = await fetch('http://localhost:8082/books', {
				next: {
					revalidate: false,
					tags: ['fetch-books'],
				},
			});

			if (!response.ok) {
				throw new Error('Failed to fetch data');
			}

			const books = await response.json();

			return formatBooks(books);
		} catch (err) {
			console.log(err);
		}
	};

	const books = (await fetchBooks()) || [];

	return (
		<>
			<Header />

			<section className='w-full lg:w-2/3 max-w-[853px] mt-14 flex flex-col sm:flex-row items-end sm:justify-between'>
				<form className='w-full xs:max-[500px]:h-12 sm:w-96 h-10 bg-secondary-background flex items-center justify-center gap-3 pl-5 rounded-full'>
					<IoIosSearch size={25} />
					<input
						type='text'
						placeholder='Search books'
						className='w-full h-full bg-transparent rounded-tr-full rounded-br-full px-3 placeholder:text-placeholder placeholder:text-sm outline-none'
					/>
				</form>

				<Link href={'/'} className='flex gap-2 mt-8 sm:mt-0 hover:underline'>
					<GiBookshelf size={20} />
					<span className='font-medium text-lg'>Bookshelf</span>
				</Link>
			</section>

			<main className='w-full max-w-7xl my-14 flex flex-col lg:flex-row items-start gap-8 lg:max-[1200px]:gap-4 xl:gap-8'>
				<section className='w-full grid grid-cols-1 lg:w-[70%] sm:grid-cols-2 lg:max-[1200px]:gap-x-4 gap-x-8 lg:max-[1200px]:gap-y-4 gap-y-6'>
					<FinishedStatisticCard books={{ current: 8, total: 10 }} />
					<FinishedStatisticCard
						card='year'
						books={{ current: 28, total: 50 }}
					/>
					<ReadingCard books={books} />
					<TBRCard books={books} />
					<YearlyChart />
				</section>
				<section className='w-full gap-6 lg:max-[1200px]:gap-4 xs:flex xs:flex-col sm:max-[1023px]:grid sm:max-[1023px]:grid-cols-2 xl:w-max-max flex-1'>
					<FinishedCard books={books} />
					<GoalsCard />
					<GenreStatisticsChart />
				</section>
			</main>

			<Footer />
		</>
	);
}
