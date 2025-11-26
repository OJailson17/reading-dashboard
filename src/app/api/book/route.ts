import { NextRequest, NextResponse } from 'next/server';

import { notion } from '@/lib/notion';
import {
  APIErrorCode,
  ClientErrorCode,
  isNotionClientError,
} from '@notionhq/client';

const fetchFilter = {
  this_year: {
    and: [
      {
        property: 'Status',
        select: {
          does_not_equal: 'Abandoned',
        },
      },
      {
        property: 'Is From This Year',
        checkbox: {
          equals: true,
        },
      },
    ],
  },
  any_time: {
    property: 'Status',
    select: {
      does_not_equal: 'Abandoned',
    },
  },
};

type FilterPeriod = 'any_time' | 'this_year';

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const db = searchParams.get('db');
  const period = searchParams.get('period') as FilterPeriod;

  if (!db) {
    return NextResponse.json(
      { error: 'Missing database id (db)' },
      { status: 400 },
    );
  }

  const databaseIdCookie = `${db}`;
  const filterPeriod: FilterPeriod = period || 'this_year';

  try {
    const allResults: any[] = [];
    let start_cursor: string | undefined;
    let has_more = true;
    let iterations = 0;
    const MAX_ITERATIONS = 10; // safety limit

    while (has_more && iterations < MAX_ITERATIONS) {
      iterations++;

      const response = await notion.databases.query({
        database_id: databaseIdCookie,
        filter: fetchFilter[filterPeriod],
        start_cursor,
        sorts: [
          {
            property: 'Finished Date',
            direction: 'descending',
          },
          {
            property: 'Started Date',
            direction: 'ascending',
          },
          {
            property: 'Name',
            direction: 'ascending',
          },
        ],
      });

      allResults.push(...response.results);

      has_more = response.has_more;
      start_cursor = response.next_cursor ?? undefined;

      if (!start_cursor) {
        has_more = false;
      }
    }

    return NextResponse.json(allResults);
  } catch (error) {
    if (isNotionClientError(error)) {
      switch (error.code) {
        case ClientErrorCode.RequestTimeout:
          return NextResponse.json({
            error: 'Request Timeout',
          });

        case APIErrorCode.ObjectNotFound:
          return NextResponse.json({
            error: 'Object not found',
          });

        case APIErrorCode.Unauthorized:
          return NextResponse.json({
            error: 'Unauthorized',
          });

        default:
          console.log(error);
          return NextResponse.json(error, {
            status: 400,
          });
      }
    }
  }
}
