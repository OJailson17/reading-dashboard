import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { notion } from '@/lib/notion';
import { encrypt } from '@/utils/auth/encrypt';

type TitleProperty = {
  plain_text: string;
};

type TextProperty = {
  plain_text: string;
};

type ResultResponse = {
  object: string;
  id: string;
  properties: {
    username: {
      title: TitleProperty[];
    };
    name: {
      rich_text: TextProperty[];
    };
    database_id: {
      rich_text: TextProperty[];
    };
    monthly_goal: {
      number: number;
    };
    yearly_goal: {
      number: number;
    };
  };
};

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  const databaseId = process.env.NOTION_USERS_DATABASE_ID;

  // Make a query to get the database data
  const response = await notion.databases.query({
    database_id: databaseId || '',
  });

  const database = response.results as ResultResponse[];

  const getUsername = database.find(
    (data) => data.properties.username.title[0].plain_text === username,
  );

  if (getUsername) {
    // Get the database id
    const user_database_id =
      getUsername.properties.database_id.rich_text[0].plain_text;

    const today = Date.now();
    const oneDay = 60 * 60 * 24 * 1000;

    const encryptedSession = await encrypt({
      database_id: user_database_id,
    });

    cookies().set({
      name: 'session',
      value: encryptedSession,
      httpOnly: true,
      path: '/',
      expires: today + oneDay * 7,
    });

    const user = {
      username,
      name: getUsername.properties.name.rich_text[0].plain_text,
      database_id: user_database_id,
      monthly_goal: getUsername.properties.monthly_goal.number,
      yearly_goal: getUsername.properties.yearly_goal.number,
      user_id: getUsername.id,
    };

    return NextResponse.json({
      user,
    });
  } else {
    return NextResponse.json(
      {
        error: 'User not found!',
      },
      {
        status: 404,
      },
    );
  }
}
