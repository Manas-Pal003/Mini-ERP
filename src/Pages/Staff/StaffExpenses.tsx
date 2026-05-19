import PageSkeleton from "@/components/common/PageSkeleton";
import { useEffect, useMemo, useState } from "react";
import {
  Wallet,
  Search,
  Clock3,
  CircleCheckBig,
  XCircle,
  Eye,
  Download,
  CalendarDays,
  ReceiptText,
  IndianRupee,
  TrendingUp,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Expense = {
  id: string;
  category: string;
  description: string;
  amount: string;
  date: string;
  status: "Approved" | "Pending" | "Rejected";
};

const defaultExpenses: Expense[] = [
  {
    id: "EXP-2024-0701",
    category: "Travel",
    description: "Flight ticket to Mumbai",
    amount: "₹18,750",
    date: "2024-07-31",
    status: "Approved",
  },
  {
    id: "EXP-2024-0702",
    category: "Office Supplies",
    description: "Printer ink cartridges",
    amount: "₹2,850",
    date: "2024-07-30",
    status: "Approved",
  },
  {
    id: "EXP-2024-0703",
    category: "Marketing",
    description: "Google Ads - July Campaign",
    amount: "₹15,600",
    date: "2024-07-30",
    status: "Pending",
  },
  {
    id: "EXP-2024-0704",
    category: "Utilities",
    description: "Electricity bill - Office",
    amount: "₹6,420",
    date: "2024-07-29",
    status: "Rejected",
  },
];

function StatusBadge({ status }: { status: Expense["status"] }) {
  const className =
    status === "Approved"
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
  icon: Icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: "blue" | "green" | "orange" | "red";
}) {
  const styles = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300",
    green: "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-300",
    orange:
      "bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-300",
    red: "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-300",
  };

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>

          <h3 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-slate-50">
            {value}
          </h3>
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

function parseAmount(amount: string) {
  return Number(amount.replace(/[₹,]/g, "")) || 0;
}

function formatCurrency(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export default function StaffExpenses() {
  const [loading, setLoading] = useState(true);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedExpenses = localStorage.getItem("expenses");

      if (savedExpenses) {
        setExpenses(JSON.parse(savedExpenses));
      } else {
        setExpenses(defaultExpenses);
        localStorage.setItem("expenses", JSON.stringify(defaultExpenses));
      }

      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        expense.id.toLowerCase().includes(keyword) ||
        expense.category.toLowerCase().includes(keyword) ||
        expense.description.toLowerCase().includes(keyword) ||
        expense.amount.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "All" || expense.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [expenses, search, statusFilter]);

  const approvedExpenses = expenses.filter(
    (item) => item.status === "Approved"
  ).length;

  const pendingExpenses = expenses.filter(
    (item) => item.status === "Pending"
  ).length;

  const rejectedExpenses = expenses.filter(
    (item) => item.status === "Rejected"
  ).length;

  const totalAmount = expenses.reduce(
    (total, expense) => total + parseAmount(expense.amount),
    0
  );

  const handleExport = () => {
    if (filteredExpenses.length === 0) {
      alert("No expenses available to export");
      return;
    }

    const headers = [
      "Expense ID",
      "Category",
      "Description",
      "Amount",
      "Date",
      "Status",
    ];

    const rows = filteredExpenses.map((expense) => [
      expense.id,
      expense.category,
      expense.description,
      expense.amount,
      expense.date,
      expense.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "staff-expenses.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  if (loading) {
    return <PageSkeleton />;
  }

  
  return (
    <main className="min-h-screen bg-slate-50 p-6 lg:p-8 dark:bg-slate-950">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Header */}
        <Card className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <CardContent className="relative p-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.13),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.10),transparent_32%)]" />

            <div className="relative flex flex-col gap-6 p-7 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-300">
                  <Wallet className="h-7 w-7" />
                </div>

                <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
                  Staff Expenses
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                  View submitted expense records, track approval status, and
                  export expense summaries. Staff users have read-only access.
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

                <Button
                  onClick={handleExport}
                  className="gap-2 rounded-xl bg-orange-500 hover:bg-orange-600"
                >
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Expenses"
            value={expenses.length}
            icon={ReceiptText}
            color="blue"
          />

          <StatCard
            title="Approved"
            value={approvedExpenses}
            icon={CircleCheckBig}
            color="green"
          />

          <StatCard
            title="Pending"
            value={pendingExpenses}
            icon={Clock3}
            color="orange"
          />

          <StatCard
            title="Rejected"
            value={rejectedExpenses}
            icon={XCircle}
            color="red"
          />
        </div>

        {/* Amount summary */}
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Total Expense Value
                </p>

                <h2 className="mt-2 text-4xl font-semibold text-slate-950 dark:text-slate-50">
                  {formatCurrency(totalAmount)}
                </h2>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Calculated from visible expense records.
                </p>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-300">
                <IndianRupee className="h-8 w-8" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Staff Access Level
                </p>

                <h2 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-slate-50">
                  Read Only
                </h2>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Staff can view and export, but cannot create, edit or delete.
                </p>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
                <TrendingUp className="h-8 w-8" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters + Table */}
        <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <CardHeader className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <CardTitle className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
                Expense Records
              </CardTitle>

              <div className="flex flex-col gap-3 md:flex-row">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    placeholder="Search expenses..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 md:w-72 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                >
                  <option value="All">All Status</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800">
              <table className="w-full min-w-[900px] text-left">
                <thead>
                  <tr className="bg-slate-50 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    <th className="px-4 py-4 font-medium">Expense ID</th>
                    <th className="px-4 py-4 font-medium">Category</th>
                    <th className="px-4 py-4 font-medium">Description</th>
                    <th className="px-4 py-4 font-medium">Amount</th>
                    <th className="px-4 py-4 font-medium">Date</th>
                    <th className="px-4 py-4 font-medium">Status</th>
                    <th className="px-4 py-4 font-medium">Access</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredExpenses.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-slate-100 text-sm dark:border-slate-800"
                    >
                      <td className="px-4 py-4 font-medium text-slate-900 dark:text-slate-100">
                        {item.id}
                      </td>

                      <td className="px-4 py-4 text-slate-600 dark:text-slate-400">
                        {item.category}
                      </td>

                      <td className="max-w-[340px] px-4 py-4 text-slate-600 dark:text-slate-400">
                        {item.description}
                      </td>

                      <td className="px-4 py-4 font-medium text-slate-900 dark:text-slate-100">
                        {item.amount}
                      </td>

                      <td className="px-4 py-4 text-slate-600 dark:text-slate-400">
                        {item.date}
                      </td>

                      <td className="px-4 py-4">
                        <StatusBadge status={item.status} />
                      </td>

                      <td className="px-4 py-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 rounded-lg border-orange-200 px-3 text-orange-600 hover:bg-orange-50"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Only
                        </Button>
                      </td>
                    </tr>
                  ))}

                  {filteredExpenses.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400"
                      >
                        No expenses found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid gap-5 md:grid-cols-3">
          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <CardContent className="p-5">
              <h3 className="font-semibold text-slate-950 dark:text-slate-50">
                Read-only access
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Staff users can view expense records but cannot add, edit or
                delete expenses.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <CardContent className="p-5">
              <h3 className="font-semibold text-slate-950 dark:text-slate-50">
                Approval tracking
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Staff can monitor approved, pending, and rejected expense
                records from one place.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <CardContent className="p-5">
              <h3 className="font-semibold text-slate-950 dark:text-slate-50">
                Export enabled
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Staff can export visible expense records for reporting or
                review.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}