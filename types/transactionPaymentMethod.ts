import { TransactionPaymentMethod } from "@prisma/client";

export const TransactionPaymentMethodMap: {
  [key in TransactionPaymentMethod]: string;
} = {
  [TransactionPaymentMethod.BANK_SLIP]: "Boleto",
  [TransactionPaymentMethod.BANK_TRANSFER]: "Transferência",
  [TransactionPaymentMethod.CASH]: "Dinheiro",
  [TransactionPaymentMethod.CREDIT_CARD]: "Cartão de Crédito",
  [TransactionPaymentMethod.DEBIT_CARD]: "Cartão de Débito",
  [TransactionPaymentMethod.PIX]: "Pix",
  [TransactionPaymentMethod.OTHER]: "Outros",
};
