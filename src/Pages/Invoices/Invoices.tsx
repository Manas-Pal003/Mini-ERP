import { useEffect, useState } from "react";

import {
  FileText,
  CircleCheckBig,
  Clock3,
  TriangleAlert,
  Plus,
  CalendarDays,
  ChevronDown,
  MoreVertical,
  ReceiptText,
  Send,
  IndianRupee,
  PencilLine,
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

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Invoice = {
  invoice: string;
  customer: string;
  amount: string;
  status: "Paid" | "Pending" | "Overdue";
  date: string;
  note?: string;
};

const stats = [
  {
    title: "Total Invoices",
    value: "₹8,42,500",
    note: "+18.5%",
    noteText: "from last month",
    icon: FileText,
    color: "purple",
    spark: [
      { value: 20 },
      { value: 30 },
      { value: 45 },
      { value: 42 },
      { value: 58 },
      { value: 70 },
      { value: 88 },
    ],
  },
  {
    title: "Paid Invoices",
    value: "₹5,22,350",
    note: "62%",
    noteText: "payment completed",
    icon: CircleCheckBig,
    color: "green",
    spark: [
      { value: 22 },
      { value: 35 },
      { value: 42 },
      { value: 50 },
      { value: 62 },
      { value: 75 },
      { value: 90 },
    ],
  },
  {
    title: "Pending",
    value: "₹2,10,625",
    note: "25%",
    noteText: "awaiting payment",
    icon: Clock3,
    color: "orange",
    spark: [
      { value: 34 },
      { value: 40 },
      { value: 38 },
      { value: 46 },
      { value: 54 },
      { value: 50 },
      { value: 62 },
    ],
  },
  {
    title: "Overdue",
    value: "₹1,09,525",
    note: "13%",
    noteText: "requires follow-up",
    icon: TriangleAlert,
    color: "red",
    spark: [
      { value: 20 },
      { value: 25 },
      { value: 22 },
      { value: 36 },
      { value: 32 },
      { value: 44 },
      { value: 58 },
    ],
  },
];

const overviewData = [
  { month: "Jan", revenue: 190000, paid: 120000 },
  { month: "Feb", revenue: 260000, paid: 160000 },
  { month: "Mar", revenue: 315000, paid: 210000 },
  { month: "Apr", revenue: 350000, paid: 260000 },
  { month: "May", revenue: 465000, paid: 340000 },
  { month: "Jun", revenue: 370000, paid: 280000 },
  { month: "Jul", revenue: 400000, paid: 310000 },
];

const statusData = [
  { name: "Paid", value: 62, color: "#22c55e" },
  { name: "Pending", value: 25, color: "#f59e0b" },
  { name: "Overdue", value: 13, color: "#f43f5e" },
];

const invoicesTable: Invoice[] = [
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
  {
    invoice: "INV-1020",
    customer: "Urban Buildcon",
    amount: "₹42,600",
    status: "Pending",
    date: "10 May 2026",
  },
];

const activityData = [
  {
    title: "Invoice created",
    desc: "INV-1024 generated for Amit Enterprises",
    time: "12 min ago",
    icon: ReceiptText,
    color: "purple",
  },
  {
    title: "Invoice sent",
    desc: "INV-1023 sent to Nova Digital",
    time: "30 min ago",
    icon: Send,
    color: "blue",
  },
  {
    title: "Payment received",
    desc: "₹58,400 payment completed",
    time: "1 hr ago",
    icon: IndianRupee,
    color: "green",
  },
  {
    title: "Invoice updated",
    desc: "INV-1022 due date updated",
    time: "2 hrs ago",
    icon: PencilLine,
    color: "orange",
  },
];

const styles = {
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    line: "#8b5cf6",
  },
  green: {
    bg: "bg-green-50",
    text: "text-green-600",
    line: "#22c55e",
  },
  orange: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    line: "#f97316",
  },
  red: {
    bg: "bg-red-50",
    text: "text-red-500",
    line: "#ef4444",
  },
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    line: "#3b82f6",
  },
};

function formatCurrency(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function StatusBadge({ status }: { status: string }) {
  const statusClass =
    status === "Paid"
      ? "bg-green-100 text-green-700"
      : status === "Pending"
        ? "bg-orange-100 text-orange-700"
        : "bg-red-100 text-red-700";

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
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-2xl ${color.bg}`}
          >
            <Icon className={`h-8 w-8 ${color.text}`} />
          </div>

          <div>
            <p className="text-sm font-medium text-slate-700">{item.title}</p>
            <h3 className="mt-2 text-3xl font-semibold text-slate-950">
              {item.value}
            </h3>
            <p className="mt-3 text-sm text-slate-600">
              <span className={`font-semibold ${color.text}`}>
                {item.note}
              </span>{" "}
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

export default function Invoices() {
  const [open, setOpen] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem("invoices");
    return saved ? JSON.parse(saved) : invoicesTable;
  });
  const [editingInvoiceId, setEditingInvoiceId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    customer: "",
    amount: "",
    date: "",
    status: "Pending" as Invoice["status"],
    note: "",
  });



  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices]);

  const resetForm = () => {
    setFormData({
      customer: "",
      amount: "",
      date: "",
      status: "Pending",
      note: "",
    });

    setEditingInvoiceId(null);
  };

  const handleSaveInvoice = () => {
    if (!formData.customer || !formData.amount || !formData.date) {
      alert("Please fill all required fields");
      return;
    }

    if (editingInvoiceId) {
      setInvoices((prev) =>
        prev.map((invoice) =>
          invoice.invoice === editingInvoiceId
            ? {
              ...invoice,
              customer: formData.customer,
              amount: `₹${Number(formData.amount).toLocaleString("en-IN")}`,
              status: formData.status,
              date: formData.date,
              note: formData.note,
            }
            : invoice
        )
      );
    } else {
      const newInvoice: Invoice = {
        invoice: `INV-${Date.now()}`,
        customer: formData.customer,
        amount: `₹${Number(formData.amount).toLocaleString("en-IN")}`,
        status: formData.status,
        date: formData.date,
        note: formData.note,
      };

      setInvoices((prev) => [newInvoice, ...prev]);
    }

    resetForm();
    setOpen(false);
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setEditingInvoiceId(invoice.invoice);

    setFormData({
      customer: invoice.customer,
      amount: invoice.amount.replace(/[₹,]/g, ""),
      date: invoice.date,
      status: invoice.status,
      note: invoice.note || "",
    });

    setOpen(true);
  };

  const handleDeleteInvoice = (invoiceId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this invoice?"
    );

    if (!confirmDelete) return;

    setInvoices((prev) =>
      prev.filter((invoice) => invoice.invoice !== invoiceId)
    );
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <div className="flex items-center justify-between">
          <div>
            {/* <h1 className="text-3xl font-semibold text-slate-950">Invoices</h1>
            <p className="mt-1 text-sm text-slate-500">
              Create, track and manage customer invoices
            </p> */}
          </div>

          <Button
            onClick={() => {
              resetForm();
              setOpen(true);
            }}
            className="gap-2 rounded-xl bg-purple-600 px-5 hover:bg-purple-700"
          >
            <Plus className="h-4 w-4" />
            Create Invoice
          </Button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <StatCard key={item.title} item={item} />
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.75fr_1fr]">
          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-2xl font-semibold text-slate-950">
                  Invoice Revenue Overview
                </CardTitle>

                <div className="mt-5 flex items-center gap-6 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-6 rounded-full bg-purple-600" />
                    Total Invoice
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-6 rounded-full bg-green-500" />
                    Paid
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
                    <linearGradient id="invoiceFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.14} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.02} />
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
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />

                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8b5cf6"
                    strokeWidth={2.5}
                    fill="url(#invoiceFill)"
                  />

                  <Line
                    type="monotone"
                    dataKey="paid"
                    stroke="#22c55e"
                    strokeWidth={2.2}
                    dot={{ r: 3, fill: "#22c55e" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-slate-950">
                Invoice Status
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid items-center gap-6 md:grid-cols-2 xl:grid-cols-[220px_1fr]">
                <div className="relative h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        dataKey="value"
                        innerRadius={58}
                        outerRadius={96}
                        paddingAngle={2}
                        stroke="none"
                      >
                        {statusData.map((item) => (
                          <Cell key={item.name} fill={item.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-sm text-slate-600">Total</span>
                    <span className="text-3xl font-semibold text-slate-950">
                      100%
                    </span>
                  </div>
                </div>

                <div className="space-y-5">
                  {statusData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
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
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.75fr_1fr]">
          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-2xl font-semibold text-slate-950">
                Recent Invoices
              </CardTitle>

              <Button variant="outline" className="border-purple-200 text-purple-600">
                View All
              </Button>
            </CardHeader>

            <CardContent>
              <div className="overflow-hidden rounded-xl border border-slate-100">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 text-sm text-slate-600">
                      <th className="px-4 py-4 font-medium">Invoice #</th>
                      <th className="px-4 py-4 font-medium">Customer</th>
                      <th className="px-4 py-4 font-medium">Amount</th>
                      <th className="px-4 py-4 font-medium">Status</th>
                      <th className="px-4 py-4 font-medium">Date</th>
                      <th className="px-4 py-4 font-medium">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {invoices.map((item) => (
                      <tr key={item.invoice} className="border-t border-slate-100 text-sm">
                        <td className="px-4 py-4 font-medium text-slate-900">
                          {item.invoice}
                        </td>
                        <td className="px-4 py-4 text-slate-900">
                          {item.customer}
                        </td>
                        <td className="px-4 py-4 text-slate-900">
                          {item.amount}
                        </td>
                        <td className="px-4 py-4">
                          <StatusBadge status={item.status} />
                        </td>
                        <td className="px-4 py-4 text-slate-900">
                          {item.date}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditInvoice(item)}
                              className="h-8 rounded-lg border-blue-200 px-3 text-blue-600 hover:bg-blue-50"
                            >
                              Edit
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteInvoice(item.invoice)}
                              className="h-8 rounded-lg border-red-200 px-3 text-red-600 hover:bg-red-50"
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-slate-950">
                Recent Activity
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {activityData.map((item) => {
                const Icon = item.icon;
                const c = styles[item.color as keyof typeof styles];

                return (
                  <div key={item.title} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${c.bg}`}
                      >
                        <Icon className={`h-5 w-5 ${c.text}`} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-950">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {item.desc}
                        </p>
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
              {editingInvoiceId ? "Edit Invoice" : "Create New Invoice"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-5 py-4">
            <div className="grid gap-2">
              <Label>Customer Name</Label>
              <Input
                placeholder="Enter customer name"
                value={formData.customer}
                onChange={(e) =>
                  setFormData({ ...formData, customer: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label>Amount</Label>
              <Input
                type="number"
                placeholder="Enter invoice amount"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label>Invoice Date</Label>
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
                    status: e.target.value as Invoice["status"],
                  })
                }
                className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>

            <div className="grid gap-2">
              <Label>Note</Label>
              <Textarea
                placeholder="Optional invoice note"
                value={formData.note}
                onChange={(e) =>
                  setFormData({ ...formData, note: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <Button
                variant="outline"
                onClick={() => {
                  resetForm();
                  setOpen(false);
                }}
              >
                Cancel
              </Button>

              <Button
                onClick={handleSaveInvoice}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {editingInvoiceId ? "Update Invoice" : "Save Invoice"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}