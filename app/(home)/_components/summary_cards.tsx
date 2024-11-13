import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";
import { TransactionTypeColors } from "@/types/typesColors";

interface props {
  depositsTotal: number;
  expensesTotal: number;
  investmentsTotal: number;
  balance: number;
}

const SummaryCards = async ({
  depositsTotal,
  expensesTotal,
  investmentsTotal,
  balance,
}: props) => {
  return (
    <div className="space-y-6">
      <SummaryCard
        icon={
          <PiggyBankIcon
            size={16}
            className={TransactionTypeColors.BALANCE.text}
          />
        }
        title="Saldo"
        amount={balance}
        size="large"
      />
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={
            <WalletIcon
              size={14}
              className={TransactionTypeColors.INVESTMENT.text}
            />
          }
          title="Investido"
          amount={investmentsTotal}
        />
        <SummaryCard
          icon={
            <TrendingUpIcon
              size={14}
              className={TransactionTypeColors.DEPOSIT.text}
            />
          }
          title="Receita"
          amount={depositsTotal}
        />
        <SummaryCard
          icon={
            <TrendingDownIcon
              size={14}
              className={TransactionTypeColors.EXPENSE.text}
            />
          }
          title="Gasto"
          amount={expensesTotal}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
