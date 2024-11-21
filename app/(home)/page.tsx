import Navbar from "../_components/navbar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import SummaryCards from "./_components/summary_cards";
import MonthYearSelector from "./_components/month-year-selector";
import { isMatch } from "date-fns";
import { getDashboardData } from "../_data/get-dashboard";
import PieChartTransactions from "./_components/pie-chart-transactions";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import AiReportButton from "./_components/ai-report-button";

interface props {
  searchParams: {
    month: string;
    year: string;
  };
}

const SubscriptionPage = async ({ searchParams: { month, year } }: props) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/auth/login");
  }
  const monthIsInvalid = !month || !isMatch(month, "MM");
  const yearIsInvalid = !year || !isMatch(year, "yyyy");
  if (monthIsInvalid || yearIsInvalid) {
    redirect(
      `?month=${new Date().getMonth() + 1}&year=${new Date().getFullYear()}`,
    );
  }

  const data = await getDashboardData(month, year, session.user.id);

  return (
    <>
      <Navbar session={session} />
      <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="center-items-gap-3 flex">
            <AiReportButton />
            <MonthYearSelector />
          </div>
        </div>
        <div className="grid grid-cols-[2fr,1fr] gap-6 overflow-hidden">
          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards {...data} />
            <div className="grid grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
              <PieChartTransactions {...data} />
              <ExpensesPerCategory
                expensePerCategory={data.totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions transactions={data.lastTransactions} />
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;
