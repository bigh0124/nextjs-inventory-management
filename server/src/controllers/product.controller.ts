import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  const search = req.query.search?.toString();

  try {
    const products = await prisma.products.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    });

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error get products" });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  const { productId, name, price, rating, stockQuantity } = req.body;

  try {
    const product = await prisma.products.create({
      data: {
        productId,
        price,
        name,
        rating,
        stockQuantity,
      },
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error create product " });
  }
};
