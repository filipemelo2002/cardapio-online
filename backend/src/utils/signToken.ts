import jwt from 'jsonwebtoken';

export default function signToken(id: number): string {
  return jwt.sign({ id }, 'ajkOmWlymEhy', { expiresIn: '24h' });
}
