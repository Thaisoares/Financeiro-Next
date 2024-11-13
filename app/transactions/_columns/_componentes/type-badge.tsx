import { Badge } from "@/app/_components/ui/badge";
import { TransactionTypesMap } from "@/types/transactionType";
import { TransactionTypeColors } from "@/types/typesColors";
import { TransactionType } from "@prisma/client";
import { CircleIcon } from "lucide-react";

/* const TransactionTypeColors: { [key in TransactionType]: string } = {
  [TransactionType.DEPOSIT]: "green-600",
  [TransactionType.EXPENSE]: "red-700",
  [TransactionType.INVESTMENT]: "purple-800",
}; */

interface TransactionTypeBadgeProps {
  transactionType: TransactionType;
}

const TransactionTypeBadge = ({
  transactionType,
}: TransactionTypeBadgeProps) => {
  const backgroud = TransactionTypeColors[transactionType].bg;
  const fill = TransactionTypeColors[transactionType].fill;
  const text = TransactionTypeColors[transactionType].text;
  return (
    <Badge
      className={`hover:bg-muted ${backgroud} bg-opacity-10 font-bold ${text}`}
    >
      <CircleIcon className={`mr-2 ${fill}`} size={10} />
      {TransactionTypesMap[transactionType]}
    </Badge>
  );
  if (transactionType == TransactionType.DEPOSIT) {
    return (
      <Badge className="bg-green-600 bg-opacity-10 font-bold text-green-600 hover:bg-muted">
        <CircleIcon className="mr-2 fill-green-600" size={10} />
        {TransactionTypesMap[TransactionType.DEPOSIT]}
      </Badge>
    );
  }
  if (transactionType == TransactionType.EXPENSE) {
    return (
      <Badge className="bg-red-700 bg-opacity-10 font-bold text-red-700 hover:bg-muted">
        <CircleIcon className="mr-2 fill-red-700" size={10} />
        {TransactionTypesMap[TransactionType.EXPENSE]}
      </Badge>
    );
  }
  return (
    <Badge className="bg-purple-800 bg-opacity-10 font-bold text-purple-800 hover:bg-muted">
      <CircleIcon className="mr-2 fill-purple-800" size={10} />
      {TransactionTypesMap[TransactionType.INVESTMENT]}
    </Badge>
  );
};

export default TransactionTypeBadge;
