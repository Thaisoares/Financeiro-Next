"use client";

import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionType } from "@prisma/client";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { TransactionTypeColors } from "@/types/typesColors";
import TypePercentage from "./type-percentage";
import { TransactionPercentagePerType } from "@/app/_data/get-dashboard/types";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investido",
    color: TransactionTypeColors.INVESTMENT.hexa,
  },
  [TransactionType.DEPOSIT]: {
    label: "Receita",
    color: TransactionTypeColors.DEPOSIT.hexa,
  },
  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: TransactionTypeColors.EXPENSE.hexa,
  },
} satisfies ChartConfig;

interface props {
  typesPercentage: TransactionPercentagePerType;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
}

const PieChartTransactions = ({
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  typesPercentage,
}: props) => {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: TransactionTypeColors.DEPOSIT.hexa,
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: TransactionTypeColors.EXPENSE.hexa,
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: TransactionTypeColors.INVESTMENT.hexa,
    },
  ];
  return (
    <Card className="flex flex-col p-6">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>

        <div className="space-y-3">
          <TypePercentage
            icon={
              <TrendingUpIcon
                size={16}
                className={TransactionTypeColors.DEPOSIT.text}
              />
            }
            type="Receita"
            percentage={typesPercentage[TransactionType.DEPOSIT]}
          />
          <TypePercentage
            icon={
              <TrendingDownIcon
                size={16}
                className={TransactionTypeColors.EXPENSE.text}
              />
            }
            type="Despesas"
            percentage={typesPercentage[TransactionType.EXPENSE]}
          />
          <TypePercentage
            icon={
              <PiggyBankIcon
                size={16}
                className={TransactionTypeColors.INVESTMENT.text}
              />
            }
            type="Investido"
            percentage={typesPercentage[TransactionType.INVESTMENT]}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PieChartTransactions;
