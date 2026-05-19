import PageSkeleton from "@/components/common/PageSkeleton";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ReceiptText,
  Search,
  Plus,
  Clock3,
  CircleCheckBig,
  TriangleAlert,
  Download,
  CalendarDays,
  PencilLine,
  Eye,
  FileText,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

const defaultInvoices: Invoice[] = [
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

function StatusBadge({ status }: { status: Invoice["status"] }) {
  const className =
    status === "Paid"
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

function parseAmount(amount: string) {
  return Number(String(amount).replace(/[₹,]/g, "")) || 0;
}

function formatCurrency(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
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
  color: "purple" | "green" | "orange" | "red";
}) {
  const styles = {
    purple:
      "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-300",
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

export default function ManagerInvoices() {
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const [editingInvoiceId, setEditingInvoiceId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    customer: "",
    amount: "",
    date: "",
    status: "Pending" as Invoice["status"],
    note: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedInvoices = localStorage.getItem("invoices");

      if (savedInvoices) {
        setInvoices(JSON.parse(savedInvoices));
      } else {
        setInvoices(defaultInvoices);
        localStorage.setItem("invoices", JSON.stringify(defaultInvoices));
      }

      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("invoices", JSON.stringify(invoices));
    }
  }, [invoices, loading]);

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        invoice.invoice.toLowerCase().includes(keyword) ||
        invoice.customer.toLowerCase().includes(keyword) ||
        invoice.amount.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "All" || invoice.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [invoices, search, statusFilter]);

  const totalValue = invoices.reduce(
    (total, invoice) => total + parseAmount(invoice.amount),
    0
  );

  const paidInvoices = invoices.filter((item) => item.status === "Paid").length;
  const pendingInvoices = invoices.filter(
    (item) => item.status === "Pending"
  ).length;
  const overdueInvoices = invoices.filter(
    (item) => item.status === "Overdue"
  ).length;

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
      toast.error("Please fill all required fields");
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

      toast.success("Invoice updated successfully");
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
      toast.success("Invoice created successfully");
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

  const handleExport = () => {
    if (filteredInvoices.length === 0) {
      toast.error("No invoices available to export");
      return;
    }

    const headers = ["Invoice", "Customer", "Amount", "Status", "Date"];

    const rows = filteredInvoices.map((invoice) => [
      invoice.invoice,
      invoice.customer,
      invoice.amount,
      invoice.status,
      invoice.date,
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
    link.download = "manager-invoices.csv";
    link.click();

    URL.revokeObjectURL(url);

    toast.success("Invoice report exported successfully");
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
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.13),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.10),transparent_32%)]" />

            <div className="relative flex flex-col gap-6 p-7 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-300">
                  <ReceiptText className="h-7 w-7" />
                </div>

                <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
                  Manager Invoices
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Create and update invoices, monitor payment status, track
                  overdue records, and export invoice reports. Managers cannot
                  delete invoice records.
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
                  variant="outline"
                  className="gap-2 rounded-xl border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>

                <Button
                  onClick={() => {
                    resetForm();
                    setOpen(true);
                  }}
                  className="gap-2 rounded-xl bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="h-4 w-4" />
                  Create Invoice
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Invoice Value"
            value={formatCurrency(totalValue)}
            icon={FileText}
            color="purple"
          />

          <StatCard
            title="Paid"
            value={paidInvoices}
            icon={CircleCheckBig}
            color="green"
          />

          <StatCard
            title="Pending"
            value={pendingInvoices}
            icon={Clock3}
            color="orange"
          />

          <StatCard
            title="Overdue"
            value={overdueInvoices}
            icon={TriangleAlert}
            color="red"
          />
        </div>

        {/* Filters + table */}
        <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <CardHeader className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <CardTitle className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
                Invoice Records
              </CardTitle>

              <div className="flex flex-col gap-3 md:flex-row">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    placeholder="Search invoice/customer..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 md:w-72 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-purple-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                >
                  <option value="All">All Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800">
              <table className="w-full min-w-[920px] text-left">
                <thead>
                  <tr className="bg-slate-50 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    <th className="px-4 py-4 font-medium">Invoice #</th>
                    <th className="px-4 py-4 font-medium">Customer</th>
                    <th className="px-4 py-4 font-medium">Amount</th>
                    <th className="px-4 py-4 font-medium">Status</th>
                    <th className="px-4 py-4 font-medium">Date</th>
                    <th className="px-4 py-4 font-medium">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredInvoices.map((item) => (
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

                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 rounded-lg border-slate-200 px-3 text-slate-600 hover:bg-slate-50"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditInvoice(item)}
                            className="h-8 rounded-lg border-blue-200 px-3 text-blue-600 hover:bg-blue-50"
                          >
                            <PencilLine className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredInvoices.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400"
                      >
                        No invoices found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Manager rules */}
        <div className="grid gap-5 md:grid-cols-3">
          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <CardContent className="p-5">
              <h3 className="font-semibold text-slate-950 dark:text-slate-50">
                Create invoices
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Managers can create invoice records and update payment status.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <CardContent className="p-5">
              <h3 className="font-semibold text-slate-950 dark:text-slate-50">
                Edit access
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Managers can edit customer, amount, status, date and notes.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <CardContent className="p-5">
              <h3 className="font-semibold text-slate-950 dark:text-slate-50">
                Delete restricted
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Delete actions are reserved for Admin only.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add/Edit Dialog */}
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
                className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-purple-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
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