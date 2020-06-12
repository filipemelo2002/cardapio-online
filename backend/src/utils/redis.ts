import Redis from 'ioredis';

const redis = new Redis();
export async function saveToken(
  id: number,
  token: string,
): Promise<void> {
  await redis.set(String(id), token);
}
export async function revokeToken(id: number): Promise<void> {
  await redis.del(String(id));
}
export async function restoreToken(
  id: number,
): Promise<string | boolean> {
  const restoredToken = await redis.get(String(id));
  if (!restoredToken) {
    return false;
  }
  return restoredToken;
}
