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
    } = req.body;
    const product = await prisma.product.create({
      data: {
        title,
        image,
        price,
        ingredients: { create: ingredients },
        sizes: { create: sizes },
      },
      include: {
        ingredients: true,
        sizes: true,
      },
    });
    return res.json(product);
  }

  async index(re: Request, res: Response): Promise<Response> {
    const products = await prisma.product.findMany({
      include: {
        ingredients: true,
        sizes: true,
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
        ingredients: true,
        sizes: true,
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
        ingredients: {
          updateMany: sequelizedIngredients,
        },
        sizes: {
          updateMany: sequelizedSizes,
        },
      },
      include: {
        ingredients: true,
        sizes: true,
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
