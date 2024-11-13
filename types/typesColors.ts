import { TransactionType } from "@prisma/client";

interface typesOfColors {
  bg: string;
  fill: string;
  text: string;
  hexa: string;
}

export const TransactionTypeColors: {
  [key in TransactionType | "BALANCE"]: typesOfColors;
} = {
  [TransactionType.DEPOSIT]: {
    bg: "bg-green-600",
    fill: "fill-green-600",
    text: "text-green-600",
    hexa: "#16a34a",
  },
  [TransactionType.EXPENSE]: {
    bg: "bg-red-700",
    fill: "fill-red-700",
    text: "text-red-700",
    hexa: "#b91c1c",
  },
  [TransactionType.INVESTMENT]: {
    bg: "bg-purple-800",
    fill: "fill-purple-800",
    text: "text-purple-800",
    hexa: "#6b21a8",
  },
  ["BALANCE"]: {
    bg: "bg-cyan-700",
    fill: "fill-cyan-700",
    text: "text-cyan-700",
    hexa: "#0e7490",
  },
};
