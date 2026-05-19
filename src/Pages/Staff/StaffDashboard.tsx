import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  ReceiptText,
  Wallet,
  Clock3,
  CircleCheckBig,
  AlertCircle,
  CalendarDays,
  ArrowUpRight,
  FileText,
  IndianRupee,
} from "lucide-react";

import PageSkeleton from "@/components/common/PageSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Invoice = {
  invoice: string;
  customer: string;
  amount: string;
  status: "Paid" | "Pending" | "Overdue";
  date: string;
};

type Expense = {
  id: string;
  category: string;
  description: string;
  amount: string;
  date: string;
  status: "Approved" | "Pending" | "Rejected";
};

function StatusBadge({ status }: { status: string }) {
  const className =
    status === "Paid" || status === "Approved"
      ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
      : status === "Pending"
      ? "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300"
      : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300";

  return (
    <span className={`rounded-md px-3 py-1 text-xs font-medium ${className}`}>
      {status}
    </span>
  );
}

function StatCard({
  title,
  value,
  note,
  icon: Icon,
  color,
}: {
  title: string;
  value: string | number;
  note: string;
  icon: React.ElementType;
  color: "blue" | "green" | "orange" | "purple";
}) {
  const styles = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300",
    green: "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-300",
    orange:
      "bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-300",
    purple:
      "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-300",
  };

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>

          <h3 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-slate-50">
            {value}
          </h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {note}
          </p>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${styles[color]}`}
        >
          <Icon className="h-7 w-7" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function StaffDashboard() {
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedInvoices = localStorage.getItem("invoices");
      const savedExpenses = localStorage.getItem("expenses");

      setInvoices(savedInvoices ? JSON.parse(savedInvoices) : []);
      setExpenses(savedExpenses ? JSON.parse(savedExpenses) : []);

      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  if (loading) {
    return <PageSkeleton />;
  }

  const totalInvoices = invoices.length;
  const pendingInvoices = invoices.filter(
    (invoice) => invoice.status === "Pending"
  ).length;

  const totalExpenses = expenses.length;
  const pendingExpenses = expenses.filter(
    (expense) => expense.status === "Pending"
  ).length;

  const recentInvoices = invoices.slice(0, 4);
  const recentExpenses = expenses.slice(0, 4);

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 dark:bg-slate-950">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Header */}
        <Card className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <CardContent className="relative p-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.12),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.10),transparent_32%)]" />

            <div className="relative flex flex-col gap-6 p-7 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
                  <LayoutDashboard className="h-7 w-7" />
                </div>

                <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
                  Staff Dashboard
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                  View assigned invoices, submitted expenses, pending approvals,
                  and daily activity. Staff users have limited access to records
                  only.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  className="gap-2 rounded-xl bg-white dark:bg-slate-950"
                >
                  <CalendarDays className="h-4 w-4" />
                  This Month
                </Button>

                <Button className="gap-2 rounded-xl bg-blue-600 hover:bg-blue-700">
                  View Reports
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Visible Invoices"
            value={totalInvoices}
            note="Invoices available for review"
            icon={ReceiptText}
            color="purple"
          />

          <StatCard
            title="Pending Invoices"
            value={pendingInvoices}
            note="Awaiting payment status"
            icon={Clock3}
            color="orange"
          />

          <StatCard
            title="Expense Records"
            value={totalExpenses}
            note="Submitted expense entries"
            icon={Wallet}
            color="blue"
          />

          <StatCard
            title="Pending Expenses"
            value={pendingExpenses}
            note="Waiting for approval"
            icon={AlertCircle}
            color="green"
          />
        </div>

        {/* Main content */}
        <div className="grid gap-5 xl:grid-cols-[1.4fr_0.9fr]">
          {/* Recent invoices */}
          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
                Recent Invoices
              </CardTitle>

              <Button variant="outline" className="border-purple-200 text-purple-600">
                View All
              </Button>
            </CardHeader>

            <CardContent>
              <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800">
                <table className="w-full min-w-[720px] text-left">
                  <thead>
                    <tr className="bg-slate-50 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      <th className="px-4 py-4 font-medium">Invoice</th>
                      <th className="px-4 py-4 font-medium">Customer</th>
                      <th className="px-4 py-4 font-medium">Amount</th>
                      <th className="px-4 py-4 font-medium">Status</th>
                      <th className="px-4 py-4 font-medium">Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentInvoices.map((item) => (
                      <tr
                        key={item.invoice}
                        className="border-t border-slate-100 text-sm dark:border-slate-800"
                      >
                        <td className="px-4 py-4 font-medium text-slate-900 dark:text-slate-100">
                          {item.invoice}
                        </td>

                        <td className="px-4 py-4 text-slate-600 dark:text-slate-400">
                          {item.customer}
                        </td>

                        <td className="px-4 py-4 font-medium text-slate-900 dark:text-slate-100">
                          {item.amount}
                        </td>

                        <td className="px-4 py-4">
                          <StatusBadge status={item.status} />
                        </td>

                        <td className="px-4 py-4 text-slate-600 dark:text-slate-400">
                          {item.date}
                        </td>
                      </tr>
                    ))}

                    {recentInvoices.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400"
                        >
                          No invoices available yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Staff access card */}
          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
                Staff Access
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-300">
                    <CircleCheckBig className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-950 dark:text-slate-50">
                      Can View
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Dashboard, invoices, and expenses.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-300">
                    <AlertCircle className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-950 dark:text-slate-50">
                      Restricted
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Cannot create, edit, delete, or access users/products.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
                    <FileText className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-950 dark:text-slate-50">
                      Role Note
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      This is frontend role-based UI behavior for your project.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Expenses */}
        <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
              Recent Expenses
            </CardTitle>

            <Button variant="outline" className="border-blue-200 text-blue-600">
              View All
            </Button>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {recentExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
                      <IndianRupee className="h-5 w-5" />
                    </div>

                    <StatusBadge status={expense.status} />
                  </div>

                  <h3 className="font-semibold text-slate-950 dark:text-slate-50">
                    {expense.category}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                    {expense.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="font-semibold text-slate-950 dark:text-slate-50">
                      {expense.amount}
                    </span>

                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {expense.date}
                    </span>
                  </div>
                </div>
              ))}

              {recentExpenses.length === 0 && (
                <div className="col-span-full rounded-2xl border border-slate-100 bg-slate-50 p-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
                  No expenses available yet.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}