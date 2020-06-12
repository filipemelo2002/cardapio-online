import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import signToken from '../utils/signToken';
import { restoreToken, revokeToken, saveToken } from '../utils/redis';

export default async function handleSession(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({ message: 'Missing access token' });
  }

  if (authorization.indexOf('Bearer') < 0) {
    return res.status(400).json({ message: 'Token malformatted' });
  }
  const token = authorization.split(' ');
  if (token.length < 2) {
    return res.status(400).json({ message: 'Token malformatted' });
  }

  const incomingToken = token[1];
  try {
    const user = (await jwt.verify(
      incomingToken,
      'ajkOmWlymEhy',
    )) as {
      id: number;
    };
    const savedToken = await restoreToken(Number(user.id));
    if (!(incomingToken === savedToken)) {
      return res.status(400).json({ message: 'Token not valid' });
    }
    await revokeToken(user.id);
    const newToken = await signToken(user.id);
    await saveToken(user.id, newToken);
    res.set('refresh-token', newToken);
    return next();
  } catch (err) {
    return res.status(400).json({ message: 'Token not valid' });
  }
}
