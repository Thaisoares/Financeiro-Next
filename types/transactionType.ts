import { TransactionType } from "@prisma/client";

export const TransactionTypesMap: { [key in TransactionType]: string } = {
  [TransactionType.DEPOSIT]: "Depósito",
  [TransactionType.EXPENSE]: "Despesa",
  [TransactionType.INVESTMENT]: "Investimento",
};
