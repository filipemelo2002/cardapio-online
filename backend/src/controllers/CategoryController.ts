import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class CategoryController {
  async create(req: Request, res: Response): Promise<Response> {
    const { title } = req.body;
    const category = await prisma.category.create({
      data: {
        title,
      },
    });
    return res.json(category);
  }

  async index(req: Request, res: Response): Promise<Response> {
    const categories = await prisma.category.findMany();

    return res.json(categories);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const categories = await prisma.category.findOne({
      where: {
        id: Number(id),
      },
      include: {
        Product: {
          include: {
            Ingredient: true,
            Size: true,
          },
        },
      },
    });
    return res.json(categories);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title } = req.body;
    const category = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
      },
    });
    return res.json(category);
  }

  async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });
    return res.status(201).send();
  }
}

export default CategoryController;
