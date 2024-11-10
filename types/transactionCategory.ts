import { TransactionCategory } from "@prisma/client";

export const TransactionCategoryMap: { [key in TransactionCategory]: string } =
  {
    [TransactionCategory.EDUCATION]: "Educação",
    [TransactionCategory.ENTERTAINMENT]: "Entretenimento",
    [TransactionCategory.FOOD]: "Alimetação",
    [TransactionCategory.HEALTH]: "Saúde",
    [TransactionCategory.HOUSING]: "Moradia",
    [TransactionCategory.SALARY]: "Salário",
    [TransactionCategory.TRANSPORTATION]: "Transporte",
    [TransactionCategory.UTILITY]: "Utilidade",
    [TransactionCategory.OTHER]: "Outros",
  };
