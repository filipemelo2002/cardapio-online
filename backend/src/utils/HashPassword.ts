import bcrypt from 'bcrypt';

export default function hashPass(pass: string): string {
  return bcrypt.hashSync(pass, 10);
}
