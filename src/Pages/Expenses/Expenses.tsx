import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ReceiptText,
  Wallet,
  LayoutGrid,
  CheckCircle2,
  Clock3,
  Plus,
  CalendarDays,
  ChevronDown,
  MoreVertical,
  Plane,
  Package,
  Megaphone,
  Utensils,
  Zap,
  CircleCheckBig,
  PencilLine,
  TimerReset,
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


const stats = [
  {
    title: "Total Expenses",
    value: "₹2,18,900",
    note: "+12.5%",
    noteText: "from last month",
    icon: Wallet,
    color: "orange",
    spark: [
      { value: 18 },
      { value: 22 },
      { value: 20 },
      { value: 30 },
      { value: 42 },
      { value: 36 },
      { value: 48 },
      { value: 55 },
      { value: 49 },
      { value: 63 },
      { value: 72 },
    ],
  },
  {
    title: "Total Categories",
    value: "8",
    note: "+1",
    noteText: "new category",
    icon: LayoutGrid,
    color: "blue",
    spark: [
      { value: 10 },
      { value: 14 },
      { value: 13 },
      { value: 18 },
      { value: 20 },
      { value: 17 },
      { value: 28 },
      { value: 35 },
      { value: 31 },
      { value: 42 },
      { value: 48 },
    ],
  },
  {
    title: "Approved",
    value: "₹1,76,400",
    note: "80.5%",
    noteText: "of total",
    icon: CheckCircle2,
    color: "green",
    spark: [
      { value: 12 },
      { value: 18 },
      { value: 16 },
      { value: 24 },
      { value: 35 },
      { value: 31 },
      { value: 41 },
      { value: 46 },
      { value: 42 },
      { value: 55 },
      { value: 63 },
    ],
  },
  {
    title: "Pending Approval",
    value: "₹42,500",
    note: "7",
    noteText: "expenses pending",
    icon: Clock3,
    color: "red",
    spark: [
      { value: 16 },
      { value: 20 },
      { value: 18 },
      { value: 28 },
      { value: 24 },
      { value: 36 },
      { value: 48 },
      { value: 43 },
      { value: 52 },
      { value: 66 },
      { value: 74 },
    ],
  },
];

const overviewData = [
  { month: "Jan", expenses: 15000, lastMonth: 8000 },
  { month: "Feb", expenses: 27000, lastMonth: 16000 },
  { month: "Mar", expenses: 30000, lastMonth: 22000 },
  { month: "Apr", expenses: 38000, lastMonth: 24000 },
  { month: "May", expenses: 56000, lastMonth: 41000 },
  { month: "Jun", expenses: 42000, lastMonth: 31000 },
  { month: "Jul", expenses: 49000, lastMonth: 39000 },
];

const categoryData = [
  { name: "Travel", value: 32, color: "#f97316" },
  { name: "Office Supplies", value: 22, color: "#3b82f6" },
  { name: "Marketing", value: 18, color: "#22c55e" },
  { name: "Utilities", value: 12, color: "#8b5cf6" },
  { name: "Meals & Entertainment", value: 8, color: "#f59e0b" },
  { name: "Others", value: 8, color: "#94a3b8" },
];
type Expense = {
  id: string;
  category: string;
  description: string;
  amount: string;
  date: string;
  status: "Approved" | "Pending" | "Rejected";
};
const expensesTable: Expense[] = [
  {
    id: "EXP-2024-0701",
    category: "Travel",
    description: "Flight ticket to Mumbai",
    amount: "₹18,750",
    date: "Jul 31, 2024",
    status: "Approved",
  },
];

const activityData = [
  {
    title: "Expense added",
    desc: "Travel expense for Mumbai trip",
    time: "12 min ago",
    icon: ReceiptText,
    color: "orange",
  },
  {
    title: "Expense approved",
    desc: "Office supplies expense approved",
    time: "35 min ago",
    icon: CircleCheckBig,
    color: "green",
  },
  {
    title: "Expense updated",
    desc: "Marketing budget updated",
    time: "1 hr ago",
    icon: PencilLine,
    color: "blue",
  },
  {
    title: "Approval requested",
    desc: "Team lunch expense submitted",
    time: "2 hrs ago",
    icon: TimerReset,
    color: "purple",
  },
];

const styles = {
  orange: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    line: "#f97316",
  },
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    line: "#3b82f6",
  },
  green: {
    bg: "bg-green-50",
    text: "text-green-600",
    line: "#22c55e",
  },
  red: {
    bg: "bg-red-50",
    text: "text-red-500",
    line: "#ef4444",
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    line: "#8b5cf6",
  },
};

function formatCurrency(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function StatusBadge({ status }: { status: string }) {
  const statusClass =
    status === "Approved"
      ? "bg-green-100 text-green-700"
      : "bg-orange-100 text-orange-700";

  return (
    <span className={`rounded-md px-3 py-1 text-xs font-medium ${statusClass}`}>
      {status}
    </span>
  );
}

function StatCard({ item }: { item: (typeof stats)[number] }) {
  const Icon = item.icon;
  const color = styles[item.color as keyof typeof styles];

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="flex items-center justify-between gap-4 p-5">
        <div className="flex items-center gap-5">
          <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${color.bg}`}>
            <Icon className={`h-8 w-8 ${color.text}`} />
          </div>

          <div>
            <p className="text-sm font-medium text-slate-700">{item.title}</p>
            <h3 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              {item.value}
            </h3>
            <p className="mt-3 text-sm text-slate-600">
              <span className={`font-semibold ${color.text}`}>{item.note}</span>{" "}
              {item.noteText}
            </p>
          </div>
        </div>

        <div className="h-16 w-28">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={item.spark}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={color.line}
                strokeWidth={2.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}


export default function Expenses() {
  const [open, setOpen] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : expensesTable;
  });
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    category: "",
    description: "",
    amount: "",
    date: "",
    status: "Pending" as Expense["status"],
  });



  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Travel":
        return Plane;
      case "Office Supplies":
        return Package;
      case "Marketing":
        return Megaphone;
      case "Meals & Entertainment":
        return Utensils;
      case "Utilities":
        return Zap;
      default:
        return ReceiptText;
    }
  };

  const getCategoryColor = (category: string): keyof typeof styles => {
    switch (category) {
      case "Travel":
        return "purple";
      case "Office Supplies":
        return "blue";
      case "Marketing":
        return "green";
      case "Meals & Entertainment":
        return "orange";
      case "Utilities":
        return "red";
      default:
        return "orange";
    }
  };

  const handleAddExpense = () => {
    if (
      !formData.category ||
      !formData.description ||
      !formData.amount ||
      !formData.date
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (editingExpenseId) {
      setExpenses((prev) =>
        prev.map((expense) =>
          expense.id === editingExpenseId
            ? {
              ...expense,
              category: formData.category,
              description: formData.description,
              amount: `₹${Number(formData.amount).toLocaleString("en-IN")}`,
              date: formData.date,
              status: formData.status,
            }
            : expense
        )
      );
    } else {
      const newExpense: Expense = {
        id: `EXP-${Date.now()}`,
        category: formData.category,
        description: formData.description,
        amount: `₹${Number(formData.amount).toLocaleString("en-IN")}`,
        date: formData.date,
        status: formData.status,
      };

      setExpenses((prev) => [newExpense, ...prev]);
    }

    setFormData({
      category: "",
      description: "",
      amount: "",
      date: "",
      status: "Pending",
    });

    setEditingExpenseId(null);
    setOpen(false);
  };
  const handleEditExpense = (expense: Expense) => {
    setEditingExpenseId(expense.id);

    setFormData({
      category: expense.category,
      description: expense.description,
      amount: expense.amount.replace(/[₹,]/g, ""),
      date: expense.date,
      status: expense.status,
    });

    setOpen(true);
  };

  const handleDeleteExpense = (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) return;

    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  return (
  <main className="min-h-screen bg-slate-50 p-6 lg:p-8">
    <div className="mx-auto max-w-[1600px] space-y-6">
      {/* Header */}
      {/* <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50">
                <ReceiptText className="h-8 w-8 text-orange-600" />
              </div>

              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
                  Expenses
                </h1>
                <p className="mt-1 text-lg text-slate-500">
                  Track and manage all your business expenses
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="gap-2 rounded-xl px-4">
                <CalendarDays className="h-4 w-4" />
                This Month
                <ChevronDown className="h-4 w-4" />
              </Button>

              <Button className="gap-2 rounded-xl bg-orange-500 px-5 hover:bg-orange-600">
                <Plus className="h-4 w-4" />
                Add Expense
              </Button>
            </div>
          </CardContent>
        </Card> */}

      <div className="flex items-center justify-between">
        <div>
          {/* <h1 className="text-3xl font-semibold text-slate-950">Expenses</h1>
            <p className="mt-1 text-sm text-slate-500">
              Track and manage all your business expenses
            </p> */}
        </div>

        <Button
          onClick={() => setOpen(true)}
          className="gap-2 rounded-xl bg-orange-500 px-5 hover:bg-orange-600"
        >
          <Plus className="h-4 w-4" />
          Add Expense
        </Button>
      </div>
      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.title} item={item} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-5 xl:grid-cols-[1.75fr_1fr]">
        <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-2xl font-semibold text-slate-950">
                Expenses Overview
              </CardTitle>

              <div className="mt-5 flex items-center gap-6 text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-6 rounded-full bg-orange-500" />
                  Expenses
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-6 rounded-full bg-slate-400" />
                  Last Month
                </div>
              </div>
            </div>

            <Button variant="outline" className="gap-2 rounded-xl">
              Monthly
              <ChevronDown className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={overviewData}>
                <defs>
                  <linearGradient id="expensesFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0.02} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#334155", fontSize: 13 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#334155", fontSize: 13 }}
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
                  dataKey="expenses"
                  stroke="#f97316"
                  strokeWidth={2.5}
                  fill="url(#expensesFill)"
                />

                <Line
                  type="monotone"
                  data={overviewData}
                  dataKey="lastMonth"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  strokeDasharray="6 6"
                  dot={{ r: 3, fill: "#94a3b8" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-slate-950">
              Expenses by Category
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid items-center gap-6 md:grid-cols-2 xl:grid-cols-[220px_1fr]">
              <div className="relative h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      innerRadius={52}
                      outerRadius={95}
                      paddingAngle={2}
                      stroke="none"
                    >
                      {categoryData.map((item) => (
                        <Cell key={item.name} fill={item.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-sm text-slate-600">Total</span>
                  <span className="mt-1 text-3xl font-semibold text-slate-950">
                    ₹2,18,900
                  </span>
                </div>
              </div>

              <div className="space-y-5">
                {categoryData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-3.5 w-3.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-slate-700">{item.name}</span>
                    </div>

                    <span className="text-sm font-semibold text-slate-950">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7 flex items-center justify-between">
              <button className="text-sm font-medium text-orange-600 hover:underline">
                View all categories
              </button>

              <Button variant="outline" className="border-orange-200 text-orange-600">
                View Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom section */}
      <div className="grid gap-5 xl:grid-cols-[1.75fr_1fr]">
        <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-2xl font-semibold text-slate-950">
              Recent Expenses
            </CardTitle>

            <Button variant="outline" className="border-orange-200 text-orange-600">
              View All
            </Button>
          </CardHeader>

          <CardContent>
            <div className="overflow-hidden rounded-xl border border-slate-100">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-sm text-slate-600">
                    <th className="px-4 py-4 font-medium">Expense ID</th>
                    <th className="px-4 py-4 font-medium">Category</th>
                    <th className="px-4 py-4 font-medium">Description</th>
                    <th className="px-4 py-4 font-medium">Amount</th>
                    <th className="px-4 py-4 font-medium">Date</th>
                    <th className="px-4 py-4 font-medium">Status</th>
                    <th className="px-4 py-4 font-medium">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {expenses.map((item) => {
                    const Icon = getCategoryIcon(item.category);
                    const c = styles[getCategoryColor(item.category)];

                    return (
                      <tr key={item.id} className="border-t border-slate-100 text-sm">
                        <td className="px-4 py-4 font-medium text-slate-900">
                          {item.id}
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-9 w-9 items-center justify-center rounded-full ${c.bg}`}
                            >
                              <Icon className={`h-4 w-4 ${c.text}`} />
                            </div>

                            <span className="text-slate-900">{item.category}</span>
                          </div>
                        </td>

                        <td className="px-4 py-4 text-slate-900">
                          {item.description}
                        </td>

                        <td className="px-4 py-4 text-slate-900">
                          {item.amount}
                        </td>

                        <td className="px-4 py-4 text-slate-900">
                          {item.date}
                        </td>

                        <td className="px-4 py-4">
                          <StatusBadge status={item.status} />
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditExpense(item)}
                              className="h-8 rounded-lg border-blue-200 px-3 text-blue-600 hover:bg-blue-50"
                            >
                              Edit
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteExpense(item.id)}
                              className="h-8 rounded-lg border-red-200 px-3 text-red-600 hover:bg-red-50"
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-2xl font-semibold text-slate-950">
              Recent Activity
            </CardTitle>

            <Button variant="outline" className="border-orange-200 text-orange-600">
              View All
            </Button>
          </CardHeader>

          <CardContent className="space-y-6">
            {activityData.map((item) => {
              const Icon = item.icon;
              const c = styles[item.color as keyof typeof styles];

              return (
                <div key={item.title} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${c.bg}`}>
                      <Icon className={`h-5 w-5 ${c.text}`} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>

                  <span className="whitespace-nowrap text-sm text-slate-500">
                    {item.time}
                  </span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>

    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>
            {editingExpenseId ? "Edit Expense" : "Add New Expense"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-5 py-4">
          <div className="grid gap-2">
            <Label>Category</Label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select category</option>
              <option value="Travel">Travel</option>
              <option value="Office Supplies">Office Supplies</option>
              <option value="Marketing">Marketing</option>
              <option value="Utilities">Utilities</option>
              <option value="Meals & Entertainment">
                Meals & Entertainment
              </option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Enter expense description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label>Amount</Label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label>Date</Label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label>Status</Label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as Expense["status"],
                })
              }
              className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                setEditingExpenseId(null);
                setFormData({
                  category: "",
                  description: "",
                  amount: "",
                  date: "",
                  status: "Pending",
                });
              }}
            >
              Cancel
            </Button>

            <Button
              onClick={() => {
                setEditingExpenseId(null);
                setFormData({
                  category: "",
                  description: "",
                  amount: "",
                  date: "",
                  status: "Pending",
                });
                setOpen(true);
              }}
              className="gap-2 rounded-xl bg-orange-500 px-5 hover:bg-orange-600"
            >
              {editingExpenseId ? "Update Expense" : "Save Expense"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </main>
);
}