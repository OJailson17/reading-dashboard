import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

export async function POST(req: NextRequest, res: NextResponse) {
	const { password } = (await req.json()) as {
		password: string;
	};

	if (password === process.env.NOTION_USERS_DATABASE_ID) {
		console.log(process.env.API_REVALIDATE_PASSWORD_HASH);
	}

	// const doesPasswordMatch = await bcryptjs.compare(
	// 	password,
	// 	`${process.env.API_REVALIDATE_PASSWORD_HASH}`,
	// );

	// if (!doesPasswordMatch) {
	// 	return NextResponse.json(
	// 		{
	// 			error: 'Not allowed',
	// 		},
	// 		{
	// 			status: 401,
	// 		},
	// 	);
	// }

	// revalidateTag('fetch-books');
	// revalidateTag('sign-in');

	return NextResponse.json(
		{
			revalidated: true,
		},
		{
			status: 200,
		},
	);
}
