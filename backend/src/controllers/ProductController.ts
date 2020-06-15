import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Ingredient {
  id: number;
  title: string;
  price: number | null;
}
interface Size {
  id: number;
  title: string;
  price: number;
}
class ProductController {
  async create(req: Request, res: Response): Promise<Response> {
    const {
      title,
      image = 'imagem.jpg',
      price,
      ingredients,
      sizes,
      category,
    } = req.body;
    const product = await prisma.product.create({
      data: {
        title,
        image,
        price,
        Ingredient: { create: ingredients },
        Size: { create: sizes },
        Category: {
          connect: {
            id: category,
          },
        },
      },
      include: {
        Ingredient: true,
        Size: true,
      },
    });
    return res.json(product);
  }

  async index(re: Request, res: Response): Promise<Response> {
    const products = await prisma.product.findMany({
      include: {
        Ingredient: true,
        Size: true,
      },
    });
    return res.json(products);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const product = await prisma.product.findOne({
      where: {
        id: Number(id),
      },
      include: {
        Ingredient: true,
        Size: true,
      },
    });
    return res.json(product);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {
      title,
      image = 'imagem.jpg',
      price,
      ingredients,
      sizes,
      category,
    } = req.body;
    const sequelizedIngredients = ingredients.map(
      (ingredient: Ingredient) => ({
        where: { id: ingredient.id },
        data: {
          title: ingredient.title,
          price: ingredient.price,
        },
      }),
    );
    const sequelizedSizes = sizes.map((size: Size) => ({
      where: { id: size.id },
      data: {
        title: size.title,
        price: size.price,
      },
    }));
    const product = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        image,
        price,
        Category: {
          connect: {
            id: category,
          },
        },
        Ingredient: {
          updateMany: sequelizedIngredients,
        },
        Size: {
          updateMany: sequelizedSizes,
        },
      },
      include: {
        Ingredient: true,
        Size: true,
      },
    });
    return res.json(product);
  }

  async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await prisma.product.delete({ where: { id: Number(id) } });
    return res.status(201).send();
  }
}

export default ProductController;
