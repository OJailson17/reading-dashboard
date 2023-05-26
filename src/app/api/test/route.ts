import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const { searchParams, search } = new URL(request.url);
	const db = searchParams.get('id');

	const databaseIdCookie = `${db}`;
	console.log({ db });

	return NextResponse.json({
		msg: 'Hello World',
	});
}
