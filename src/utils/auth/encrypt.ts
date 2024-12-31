import { SignJWT } from 'jose';

const secretKey = process.env.ENCRYPT_SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

type Payload = {
  database_id: string;
};

export async function encrypt(payload: Payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('31 days')
    .sign(key);
}
