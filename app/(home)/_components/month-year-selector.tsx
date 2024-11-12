"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useState } from "react";

const MONTHS = [
  { value: "01", label: "Janeiro" },
  { value: "02", label: "Fevereiro" },
  { value: "03", label: "Março" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Maio" },
  { value: "06", label: "Junho" },
  { value: "07", label: "Julho" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
];

const MonthYearSelector = () => {
  const searchParams = useSearchParams();
  const monthUrl = searchParams.get("month");
  const yearUrl = searchParams.get("year");
  const [year, setYear] = useState(yearUrl);
  const [month, setMonth] = useState(monthUrl);

  const { push } = useRouter();

  const handleMonthChange = (m: string) => {
    push(`/?month=${m}&year=${year}`);
    setMonth(m);
  };

  const handleYearChange = (y: string) => {
    push(`/?month=${month}&year=${y}`);
    setYear(y);
  };

  const currentYear = new Date().getFullYear();
  const minYear = 2016; // Defina o menor ano possível
  const years = Array.from({ length: currentYear - minYear + 1 }, (_, i) =>
    (minYear + i).toString(),
  ); // Cria um array de anos como strings

  return (
    <div className="flex space-x-4">
      <Select
        onValueChange={(value) => handleMonthChange(value)}
        defaultValue={monthUrl ?? ""}
      >
        <SelectTrigger className="w-[120px] rounded-full">
          <SelectValue placeholder="Mês" />
        </SelectTrigger>
        <SelectContent>
          {MONTHS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => handleYearChange(value)}
        defaultValue={yearUrl ?? ""}
      >
        <SelectTrigger className="w-[85px] rounded-full">
          <SelectValue placeholder="Ano" />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default MonthYearSelector;
