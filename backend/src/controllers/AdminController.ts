import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

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

    const admin = await prisma.admin.create({
      data: {
        name,
        email,
        password,
        latitude,
        longitude,
        whatsapp,
      },
    });

    return res.json(admin);
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
    const data = req.body;
    const admin = await prisma.admin.update({
      where: {
        id: Number(id),
      },
      data,
    });

    return res.json(admin);
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
