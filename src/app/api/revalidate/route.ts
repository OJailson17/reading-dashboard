import bcryptjs from 'bcryptjs';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
	const { password } = (await req.json()) as {
		password: string;
	};

	const doesPasswordMatch = await bcryptjs.compare(
		password,
		`${process.env.API_REVALIDATE_PASSWORD_HASH}`,
	);

	if (!doesPasswordMatch) {
		return NextResponse.json(
			{
				error: 'Not allowed',
			},
			{
				status: 401,
			},
		);
	}

	revalidateTag('fetch-books');
	revalidateTag('fetch-book-stats');
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
