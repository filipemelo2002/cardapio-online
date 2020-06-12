import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import signToken from '../utils/signToken';
import { saveToken } from '../utils/redis';

const prisma = new PrismaClient();
class SessionController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const admin = await prisma.admin.findOne({
      where: {
        email,
      },
    });
    if (!admin) {
      return res.status(400).json({ message: 'User not found' });
    }

    const matching_passwords = bcrypt.compareSync(
      password,
      admin.password,
    );
    if (matching_passwords) {
      const response = { type: 'Bearer', token: signToken(admin.id) };
      saveToken(admin.id, response.token);
      return res.json(response);
    }
    return res.status(400).json({ message: 'wrong password' });
  }
}

export default SessionController;
