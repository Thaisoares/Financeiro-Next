"Use server";

import { db } from "@/app/_lib/prisma";
import { endOfMonth, startOfMonth } from "date-fns";

export const generateAiReport = async (
  month: string,
  year: string,
  userId: string,
) => {
  const transactions = await db.transaction.findMany({
    where: {
      userId,
      date: {
        gte: startOfMonth(new Date(`${year}-${month}-01`)),
        lte: endOfMonth(new Date(`${year}-${month}-31`)),
      },
    },
  });
  return transactions;
};
