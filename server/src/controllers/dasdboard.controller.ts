import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDasdboardMetrics = async (req: Request, res: Response): Promise<void> => {
  try {
    const popularProducts = await prisma.products.findMany({
      take: 15,
      orderBy: {
        stockQuantity: "desc",
      },
    });

    const saleSummary = await prisma.salesSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });

    const purchaseSummary = await prisma.purchaseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });

    const expenseSummary = await prisma.expenseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });

    const expenseByCategoryRaw = await prisma.expenseByCategory.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    const expenseByCategory = expenseByCategoryRaw.map((item) => ({ ...item, amount: item.amount.toString() }));

    res.status(200).json({ expenseByCategory, expenseSummary, purchaseSummary, popularProducts, saleSummary });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving dasdboard metrics" });
  }
};
