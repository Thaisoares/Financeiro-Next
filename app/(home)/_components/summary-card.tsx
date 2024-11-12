import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { ReactNode } from "react";
interface props {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
}
const SummaryCard = ({ icon, title, amount, size = "small" }: props) => {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-2">
        {icon}
        <p
          className={`${size === "small" ? "text-muted-foreground" : "text-white opacity-70"}`}
        >
          {title}
        </p>
      </CardHeader>
      <CardContent>
        <p
          className={`font-bold ${size === "small" ? "text-2xl" : "text-4xl"}`}
        >
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </p>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
