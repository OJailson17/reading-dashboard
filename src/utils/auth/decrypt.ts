import { jwtVerify } from 'jose';

const secretKey = process.env.ENCRYPT_SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

export async function decrypt(input: string): Promise<any> {
	const { payload } = await jwtVerify(input, key, {
		algorithms: ['HS256'],
	});
	return payload;
}
