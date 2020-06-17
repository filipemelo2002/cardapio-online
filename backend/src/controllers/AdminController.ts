import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import hashPass from '../utils/HashPassword';

const prisma = new PrismaClient();
class AdminController {
  async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      latitude = 0,
      longitude = 0,
      whatsapp = '',
    } = req.body;
    const hash_pass = hashPass(password);
    try {
      const admin = await prisma.admin.create({
        data: {
          name,
          email,
          password: hash_pass,
          latitude,
          longitude,
          whatsapp,
        },
      });

      return res.json(admin);
    } catch (err) {
      return res
        .status(400)
        .json({ message: 'Admin already exists' });
    }
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const admin = await prisma.admin.findOne({
      where: {
        id: Number(id),
      },
    });
    return res.json(admin);
  }

  async index(req: Request, res: Response): Promise<Response> {
    const admins = await prisma.admin.findMany();

    return res.json(admins);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {
      name,
      email,
      password,
      latitude = 0,
      longitude = 0,
      whatsapp = '',
    } = req.body;
    const hash_pass = hashPass(password);

    try {
      const admin = await prisma.admin.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          email,
          password: hash_pass,
          latitude,
          longitude,
          whatsapp,
        },
      });

      return res.json(admin);
    } catch (err) {
      return res
        .status(400)
        .json({ message: 'Operation not permited' });
    }
  }

  async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await prisma.admin.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(201).send();
  }
}

export default AdminController;
