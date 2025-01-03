'use client';

import {
  Legend,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from 'recharts';

import { Book } from '@/@types/book';

const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '1.5',
};

interface GenreStatisticsChartProps {
  books: Book[];
}

interface GenreFrequency {
  name: string;
  color: string;
  frequency: number;
}

function genreFrequencyList(
  arr: { name: string; color?: string }[],
): GenreFrequency[] {
  let frequency: Record<string, number> = {};

  // Count genre frequencies
  for (let i = 0; i < arr.length; i++) {
    let currentName = arr[i].name;
    frequency[currentName] = (frequency[currentName] || 0) + 1;
  }

  // Convert to an array of objects with name, color, and frequency
  const genreFrequencyList: GenreFrequency[] = Object.keys(frequency).map(
    (name) => ({
      name: name,
      color: arr.find((genre) => genre.name === name)?.color || '', // Get color corresponding to the genre name
      frequency: frequency[name],
    }),
  );

  // Sort by genre frequency
  genreFrequencyList.sort((a, b) => b.frequency - a.frequency);

  return genreFrequencyList;
}

export const GenreStatisticsChart = ({ books }: GenreStatisticsChartProps) => {
  const genres = books.flatMap((book) => book.genres);

  const mostFrequentGenres = genreFrequencyList(genres)
    .slice(0, 4)
    .map((genre) => ({
      name: genre.name,
      fill: genre.color === 'default' ? '#739DDC' : genre.color,
      frequency: genre.frequency,
    }));

  const itHasBooks = books.length > 0;

  return (
    <div className="min-h-64 w-full rounded-2xl bg-secondary-background pt-6 xs:px-4 sm:px-7">
      <h2 className="text-xl font-bold">Most Reading Genres</h2>

      {/* chart */}
      <div className="relative mx-auto flex h-64 w-full">
        {!itHasBooks && (
          <div className="absolute z-10 flex h-full w-full items-center justify-center">
            <p className="text-center text-lg font-medium text-white">
              Not enough data!
            </p>
          </div>
        )}

        <ResponsiveContainer
          width="100%"
          height="100%"
          style={{ opacity: !itHasBooks ? '20%' : '100%' }}
        >
          <RadialBarChart
            cx="25%"
            cy="50%"
            innerRadius="10%"
            outerRadius="50%"
            barSize={5}
            data={mostFrequentGenres}
          >
            <RadialBar background={{ fill: '#0E102E' }} dataKey="frequency" />
            <Legend
              iconSize={10}
              layout="vertical"
              verticalAlign="middle"
              wrapperStyle={style}
              iconType="circle"
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
