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
