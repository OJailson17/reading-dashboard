import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
	revalidateTag('fetch-books');
	revalidateTag('sign-in');

	return NextResponse.json(
		{
			revalidated: true,
		},
		{
			status: 200,
		},
	);
}
