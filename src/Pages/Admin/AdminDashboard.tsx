// src/pages/Admin/AdminDashboard.tsx

import {
  Users,
  Package,
  FileText,
  ReceiptText,
  MoreVertical,
  ChevronDown,
} from "lucide-react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const kpiCards = [
  {
    title: "Total Users",
    value: "124",
    highlight: "+12",
    description: "new users this month",
    icon: Users,
    color: "blue",
    data: [
      { value: 20 },
      { value: 22 },
      { value: 48 },
      { value: 60 },
      { value: 55 },
      { value: 72 },
      { value: 58 },
      { value: 88 },
      { value: 100 },
      { value: 92 },
    ],
  },
  {
    title: "Total Products",
    value: "568",
    highlight: "32",
    description: "products low in stock",
    icon: Package,
    color: "green",
    data: [
      { value: 18 },
      { value: 28 },
      { value: 55 },
      { value: 50 },
      { value: 48 },
      { value: 65 },
      { value: 58 },
      { value: 82 },
      { value: 75 },
      { value: 98 },
    ],
  },
  {
    title: "Total Invoices",
    value: "₹8,42,500",
    highlight: "+18.5%",
    description: "from last month",
    icon: FileText,
    color: "purple",
    data: [
      { value: 18 },
      { value: 24 },
      { value: 45 },
      { value: 38 },
      { value: 35 },
      { value: 52 },
      { value: 70 },
      { value: 62 },
      { value: 86 },
      { value: 100 },
    ],
  },
  {
    title: "Total Expenses",
    value: "₹2,18,900",
    highlight: "7",
    description: "pending approvals",
    icon: ReceiptText,
    color: "orange",
    data: [
      { value: 18 },
      { value: 32 },
      { value: 30 },
      { value: 50 },
      { value: 42 },
      { value: 60 },
      { value: 52 },
      { value: 68 },
      { value: 88 },
      { value: 100 },
    ],
  },
];

const overviewData = [
  { month: "Jan", revenue: 190000, expenses: 80000 },
  { month: "Feb", revenue: 260000, expenses: 135000 },
  { month: "Mar", revenue: 315000, expenses: 150000 },
  { month: "Apr", revenue: 350000, expenses: 185000 },
  { month: "May", revenue: 465000, expenses: 255000 },
  { month: "Jun", revenue: 370000, expenses: 190000 },
  { month: "Jul", revenue: 400000, expenses: 215000 },
];

const invoiceStatus = [
  { name: "Paid", value: 62, color: "#22c55e" },
  { name: "Pending", value: 25, color: "#f59e0b" },
  { name: "Overdue", value: 13, color: "#f43f5e" },
];

const invoices = [
  {
    invoice: "INV-1024",
    customer: "Amit Enterprises",
    amount: "₹58,400",
    status: "Paid",
    date: "14 May 2026",
  },
  {
    invoice: "INV-1023",
    customer: "Nova Digital",
    amount: "₹34,800",
    status: "Pending",
    date: "13 May 2026",
  },
  {
    invoice: "INV-1022",
    customer: "Greenline Traders",
    amount: "₹76,250",
    status: "Overdue",
    date: "12 May 2026",
  },
  {
    invoice: "INV-1021",
    customer: "Bright Solutions",
    amount: "₹19,999",
    status: "Paid",
    date: "11 May 2026",
  },
];

const activities = [
  {
    title: "New user added",
    text: "Rohit Sharma was added as Manager",
    time: "12 min ago",
    icon: Users,
    color: "blue",
  },
  {
    title: "Invoice marked as paid",
    text: "INV-1024 payment completed",
    time: "36 min ago",
    icon: FileText,
    color: "green",
  },
  {
    title: "Product stock updated",
    text: "Wireless Mouse stock updated to 84",
    time: "1 hr ago",
    icon: Package,
    color: "orange",
  },
  {
    title: "Expense submitted",
    text: "Travel expense request submitted",
    time: "2 hrs ago",
    icon: ReceiptText,
    color: "purple",
  },
];

const theme = {
  blue: {
    bg: "bg-blue-500/10 dark:bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    line: "#3b82f6",
  },
  green: {
    bg: "bg-emerald-500/10 dark:bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    line: "#10b981",
  },
  purple: {
    bg: "bg-violet-500/10 dark:bg-violet-500/10",
    text: "text-violet-600 dark:text-violet-400",
    line: "#8b5cf6",
  },
  orange: {
    bg: "bg-amber-500/10 dark:bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    line: "#f59e0b",
  },
};

function formatCurrency(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function StatusBadge({ status }: { status: string }) {
  const statusClass =
    status === "Paid"
      ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
      : status === "Pending"
      ? "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300"
      : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300";

  return (
    <span className={`rounded-md px-3 py-1 text-xs font-medium ${statusClass}`}>
      {status}
    </span>
  );
}

function KpiCard({ item }: { item: (typeof kpiCards)[number] }) {
  const Icon = item.icon;
  const colors = theme[item.color as keyof typeof theme];

  return (
    <Card className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-zinc-900/50">
      <CardContent className="flex items-center justify-between gap-4 p-5">
        <div className="flex items-center gap-5">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-2xl ${colors.bg}`}
          >
            <Icon className={`h-8 w-8 ${colors.text}`} />
          </div>

          <div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.title}</p>

            <h3 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
              {item.value}
            </h3>

            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              <span className={`font-semibold ${colors.text}`}>
                {item.highlight}
              </span>{" "}
              {item.description}
            </p>
          </div>
        </div>

        <div className="h-16 w-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={item.data}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={colors.line}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-[#f8fafc] p-6 lg:p-8 dark:bg-black">
      <div className="mx-auto max-w-[1600px] space-y-4">
        {/* Page heading only, no navbar */}
        {/* <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <div className="grid grid-cols-2 gap-1">
              <span className="h-2 w-2 rounded-sm border-2 border-current" />
              <span className="h-2 w-2 rounded-sm border-2 border-current" />
              <span className="h-2 w-2 rounded-sm border-2 border-current" />
              <span className="h-2 w-2 rounded-sm border-2 border-current" />
            </div>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
            Dashboard
          </h1>
        </div> */}

        {/* KPI cards */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {kpiCards.map((item) => (
            <KpiCard key={item.title} item={item} />
          ))}
        </div>

        {/* Main analytics section */}
        <div className="grid gap-5 xl:grid-cols-[1.7fr_1fr]">
          <Card className="rounded-2xl border border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-zinc-900/50">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-xl font-semibold text-slate-950 dark:text-slate-50">
                  Revenue & Expenses Overview
                </CardTitle>

                <div className="mt-5 flex items-center gap-6 text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-5 rounded-full bg-blue-600" />
                    Revenue
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-5 rounded-full bg-red-500" />
                    Expenses
                  </div>
                </div>
              </div>

              <Button variant="outline" className="gap-2 rounded-lg">
                This Year
                <ChevronDown className="h-4 w-4" />
              </Button>
            </CardHeader>

            <CardContent className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={overviewData}>
                  <defs>
                    <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0.02} />
                    </linearGradient>

                    <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.14} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "currentColor", fontSize: 13 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "currentColor", fontSize: 13 }}
                    tickFormatter={formatCurrency}
                    width={90}
                  />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2563eb"
                    strokeWidth={2}
                    fill="url(#revenueFill)"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#ef4444"
                    strokeWidth={2}
                    fill="url(#expenseFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-950 dark:text-slate-50">
                Invoice Status
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid items-center gap-6 md:grid-cols-2 xl:grid-cols-[220px_1fr]">
                <div className="relative h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={invoiceStatus}
                        dataKey="value"
                        innerRadius={70}
                        outerRadius={100}
                        stroke="none"
                      >
                        {invoiceStatus.map((item) => (
                          <Cell key={item.name} fill={item.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Total</span>
                    <span className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
                      100%
                    </span>
                  </div>
                </div>

                <div className="space-y-7">
                  {invoiceStatus.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between gap-6"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="h-3.5 w-3.5 rounded-md"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {item.name}
                        </span>
                      </div>

                      <span className="text-sm font-semibold text-slate-950 dark:text-slate-50">
                        {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-7 flex items-center justify-between gap-4">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  More invoice analytics in reports
                </p>

                <Button variant="outline" className="border-blue-200 text-blue-600">
                  View Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom cards */}
        <div className="grid gap-5 xl:grid-cols-[1.7fr_1fr]">
          <Card className="rounded-2xl border border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-xl font-semibold text-slate-950 dark:text-slate-50">
                Recent Invoices
              </CardTitle>

              <Button variant="outline" className="border-blue-200 text-blue-600">
                View All
              </Button>
            </CardHeader>

            <CardContent>
              <div className="overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-200/60 bg-slate-50/50 text-xs font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800/60 dark:bg-slate-900/50 dark:text-slate-400">
                      <th className="px-4 py-4 font-medium">Invoice #</th>
                      <th className="px-4 py-4 font-medium">Customer</th>
                      <th className="px-4 py-4 font-medium">Amount</th>
                      <th className="px-4 py-4 font-medium">Status</th>
                      <th className="px-4 py-4 font-medium">Date</th>
                      <th className="px-4 py-4" />
                    </tr>
                  </thead>

                  <tbody>
                    {invoices.map((item) => (
                      <tr
                        key={item.invoice}
                        className="group border-t border-slate-100 text-sm transition-colors hover:bg-slate-50/50 dark:border-slate-800/60 dark:hover:bg-slate-800/30"
                      >
                        <td className="px-4 py-4 font-medium text-slate-900 dark:text-slate-100">
                          {item.invoice}
                        </td>
                        <td className="px-4 py-4 text-slate-900 dark:text-slate-100">
                          {item.customer}
                        </td>
                        <td className="px-4 py-4 text-slate-900 dark:text-slate-100">
                          {item.amount}
                        </td>
                        <td className="px-4 py-4">
                          <StatusBadge status={item.status} />
                        </td>
                        <td className="px-4 py-4 text-slate-900 dark:text-slate-100">
                          {item.date}
                        </td>
                        <td className="px-4 py-4 text-right">
                          <MoreVertical className="ml-auto h-4 w-4 text-slate-500" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-zinc-900/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-xl font-semibold text-slate-950 dark:text-slate-50">
                Recent Activity
              </CardTitle>

              <Button variant="outline" className="border-blue-200 text-blue-600">
                View All
              </Button>
            </CardHeader>

            <CardContent className="space-y-6">
              {activities.map((activity) => {
                const Icon = activity.icon;
                const colors = theme[activity.color as keyof typeof theme];

                return (
                  <div
                    key={activity.title}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${colors.bg}`}
                      >
                        <Icon className={`h-5 w-5 ${colors.text}`} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">
                          {activity.title}
                        </p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          {activity.text}
                        </p>
                      </div>
                    </div>

                    <span className="whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                      {activity.time}
                    </span>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}