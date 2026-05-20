import PageSkeleton from "@/components/common/PageSkeleton";
import { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard,
  UsersRound,
  Package,
  ReceiptText,
  Wallet,
  Clock3,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  CalendarDays,
  ShieldCheck,
  ClipboardCheck,
} from "lucide-react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type User = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Staff" | "Accountant";
  status: "Active" | "Inactive";
  joined: string;
};

type Product = {
  sku: string;
  name: string;
  category: string;
  stock: string;
  price: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
};

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

const revenueData = [
  { month: "Jan", revenue: 180000, expense: 65000 },
  { month: "Feb", revenue: 240000, expense: 82000 },
  { month: "Mar", revenue: 320000, expense: 110000 },
  { month: "Apr", revenue: 290000, expense: 94000 },
  { month: "May", revenue: 410000, expense: 145000 },
  { month: "Jun", revenue: 380000, expense: 128000 },
  { month: "Jul", revenue: 460000, expense: 158000 },
];

function parseAmount(amount: string) {
  return Number(String(amount).replace(/[₹,]/g, "")) || 0;
}

function formatCurrency(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function StatusBadge({ status }: { status: string }) {
  const className =
    status === "Paid" || status === "Approved" || status === "Active" || status === "In Stock"
      ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
      : status === "Pending" || status === "Low Stock"
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
  color: "blue" | "green" | "orange" | "purple" | "red";
}) {
  const styles = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300",
    green: "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-300",
    orange: "bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-300",
    purple: "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-300",
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

export default function ManagerDashboard() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers(JSON.parse(localStorage.getItem("users") || "[]"));
      setProducts(JSON.parse(localStorage.getItem("products") || "[]"));
      setInvoices(JSON.parse(localStorage.getItem("invoices") || "[]"));
      setExpenses(JSON.parse(localStorage.getItem("expenses") || "[]"));
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const dashboard = useMemo(() => {
    const totalRevenue = invoices.reduce(
      (total, invoice) => total + parseAmount(invoice.amount),
      0
    );

    const totalExpenses = expenses.reduce(
      (total, expense) => total + parseAmount(expense.amount),
      0
    );

    const pendingInvoices = invoices.filter(
      (invoice) => invoice.status === "Pending"
    ).length;

    const pendingExpenses = expenses.filter(
      (expense) => expense.status === "Pending"
    ).length;

    const lowStockProducts = products.filter(
      (product) =>
        product.status === "Low Stock" ||
        product.status === "Out of Stock" ||
        Number(product.stock) <= 10
    ).length;

    const activeUsers = users.filter((user) => user.status === "Active").length;

    return {
      totalRevenue,
      totalExpenses,
      netValue: totalRevenue - totalExpenses,
      pendingInvoices,
      pendingExpenses,
      lowStockProducts,
      activeUsers,
    };
  }, [users, products, invoices, expenses]);

  const recentInvoices = invoices.slice(0, 5);
  const recentExpenses = expenses.slice(0, 5);
  const lowStockItems = products
    .filter(
      (product) =>
        product.status === "Low Stock" ||
        product.status === "Out of Stock" ||
        Number(product.stock) <= 10
    )
    .slice(0, 5);

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
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.13),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.12),transparent_32%)]" />

            <div className="relative flex flex-col gap-6 p-7 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
                  <LayoutDashboard className="h-7 w-7" />
                </div>

                <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
                  Manager Dashboard
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Monitor team operations, inventory health, invoice progress,
                  expense approvals and business performance from one manager
                  workspace.
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
            title="Total Revenue"
            value={formatCurrency(dashboard.totalRevenue)}
            note="Invoice value under management"
            icon={ReceiptText}
            color="purple"
          />

          <StatCard
            title="Total Expenses"
            value={formatCurrency(dashboard.totalExpenses)}
            note="Tracked operational spending"
            icon={Wallet}
            color="orange"
          />

          <StatCard
            title="Active Users"
            value={dashboard.activeUsers}
            note="Currently active team members"
            icon={UsersRound}
            color="blue"
          />

          <StatCard
            title="Inventory Alerts"
            value={dashboard.lowStockProducts}
            note="Low or out-of-stock items"
            icon={AlertTriangle}
            color="red"
          />
        </div>

        {/* Business performance */}
        <div className="grid gap-5 xl:grid-cols-[1.7fr_1fr]">
          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
                  Revenue vs Expenses
                </CardTitle>

                <div className="mt-5 flex items-center gap-6 text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-6 rounded-full bg-blue-600" />
                    Revenue
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-2 w-6 rounded-full bg-orange-500" />
                    Expenses
                  </div>
                </div>
              </div>

              <Button variant="outline" className="rounded-xl">
                Monthly
              </Button>
            </CardHeader>

            <CardContent className="h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="managerRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.16} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0.02} />
                    </linearGradient>

                    <linearGradient id="managerExpense" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.14} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} dy={10} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={formatCurrency}
                    width={90}
                  />
                  <Tooltip formatter={(value: any) => formatCurrency(Number(value))} />

                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    fill="url(#managerRevenue)"
                  />

                  <Line
                    type="monotone"
                    dataKey="expense"
                    stroke="#f97316"
                    strokeWidth={2.3}
                    dot={{ r: 3, fill: "#f97316" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
                Manager Summary
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Net Value
                    </p>
                    <h3 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-slate-50">
                      {formatCurrency(dashboard.netValue)}
                    </h3>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-300">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                <SummaryCard
                  icon={Clock3}
                  title="Pending Invoices"
                  value={dashboard.pendingInvoices}
                  color="orange"
                />

                <SummaryCard
                  icon={ClipboardCheck}
                  title="Pending Expenses"
                  value={dashboard.pendingExpenses}
                  color="blue"
                />

                <SummaryCard
                  icon={Package}
                  title="Products"
                  value={products.length}
                  color="green"
                />

                <SummaryCard
                  icon={ShieldCheck}
                  title="Manager Access"
                  value="Edit Only"
                  color="purple"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Operational grids */}
        <div className="grid gap-5 xl:grid-cols-3">
          <ManagerListCard
            title="Pending Invoices"
            emptyText="No recent invoices found."
            items={recentInvoices.map((invoice) => ({
              id: invoice.invoice,
              title: invoice.customer,
              meta: invoice.amount,
              status: invoice.status,
            }))}
          />

          <ManagerListCard
            title="Pending Expenses"
            emptyText="No recent expenses found."
            items={recentExpenses.map((expense) => ({
              id: expense.id,
              title: expense.category,
              meta: expense.amount,
              status: expense.status,
            }))}
          />

          <ManagerListCard
            title="Inventory Alerts"
            emptyText="No low-stock products."
            items={lowStockItems.map((product) => ({
              id: product.sku,
              title: product.name,
              meta: `${product.stock} units`,
              status: product.status,
            }))}
          />
        </div>

        {/* Access note */}
        <Card className="rounded-2xl border border-blue-100 bg-blue-50 shadow-sm dark:border-blue-900 dark:bg-blue-950/40">
          <CardContent className="flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-950 dark:text-blue-100">
                Manager Role Access
              </h3>
              <p className="mt-1 text-sm leading-6 text-blue-800/80 dark:text-blue-200/80">
                Managers can view operational modules and create/edit records,
                but delete actions, settings, and audit logs are restricted.
              </p>
            </div>

            <Button className="rounded-xl bg-blue-600 hover:bg-blue-700">
              Review Permissions
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function SummaryCard({
  icon: Icon,
  title,
  value,
  color,
}: {
  icon: React.ElementType;
  title: string;
  value: string | number;
  color: "blue" | "green" | "orange" | "purple";
}) {
  const styles = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300",
    green: "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-300",
    orange: "bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-300",
    purple: "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-300",
  };

  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${styles[color]}`}
        >
          <Icon className="h-5 w-5" />
        </div>

        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {title}
        </p>
      </div>

      <p className="font-semibold text-slate-950 dark:text-slate-50">{value}</p>
    </div>
  );
}

function ManagerListCard({
  title,
  items,
  emptyText,
}: {
  title: string;
  emptyText: string;
  items: {
    id: string;
    title: string;
    meta: string;
    status: string;
  }[];
}) {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-950 dark:text-slate-50">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {items.length === 0 && (
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
            {emptyText}
          </div>
        )}

        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
          >
            <div>
              <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">
                {item.title}
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {item.id} • {item.meta}
              </p>
            </div>

            <StatusBadge status={item.status} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}