import { ReactNode } from "react";

interface props {
  icon: ReactNode;
  type: string;
  percentage: number;
}

const TypePercentage = ({ icon, type, percentage }: props) => {
  return (
    <div className="intems-center flex justify-between">
      <div className="flex items-center gap-3">
        {icon}
        <p className="text-sm text-muted-foreground">{type}</p>
      </div>
      <p className="text-sm font-bold">{`${percentage}%`}</p>
    </div>
  );
};

export default TypePercentage;
