"use server";

import { db } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { upsertTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const upsertTransaction = async (
  params: Omit<Prisma.TransactionCreateInput, "userId">,
) => {
  upsertTransactionSchema.parse(params);

  const session = await getServerSession(authOptions);
  if (session) {
    const userId = session.user.id;

    await db.transaction.upsert({
      update: { ...params, userId },
      create: { ...params, userId },
      where: {
        id: params.id ?? "",
      },
    });

    revalidatePath("/transactions");
  } else {
    throw new Error("Unauthorized");
  }
};
