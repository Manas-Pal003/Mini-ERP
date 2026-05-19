import PageSkeleton from "@/components/common/PageSkeleton";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getCurrentPermissions } from "@/lib/permissions";
import { useSearchParams } from "react-router-dom";

import {
  FileText,
  CircleCheckBig,
  Clock3,
  TriangleAlert,
  Plus,
  ChevronDown,
  MoreVertical,
  ReceiptText,
  Send,
  IndianRupee,
  PencilLine,
  ArrowLeft,
  Download,
  Building2,
  Calendar,
  Coins,
  Activity,
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
    spark: [{ value: 20 }, { value: 30 }, { value: 45 }, { value: 42 }, { value: 58 }, { value: 70 }, { value: 88 }],
  },
  {
    title: "Paid Invoices",
    value: "₹5,22,350",
    note: "62%",
    noteText: "payment completed",
    icon: CircleCheckBig,
    color: "green",
    spark: [{ value: 22 }, { value: 35 }, { value: 42 }, { value: 50 }, { value: 62 }, { value: 75 }, { value: 90 }],
  },
  {
    title: "Pending",
    value: "₹2,10,625",
    note: "25%",
    noteText: "awaiting payment",
    icon: Clock3,
    color: "orange",
    spark: [{ value: 34 }, { value: 40 }, { value: 38 }, { value: 46 }, { value: 54 }, { value: 50 }, { value: 62 }],
  },
  {
    title: "Overdue",
    value: "₹1,09,525",
    note: "13%",
    noteText: "requires follow-up",
    icon: TriangleAlert,
    color: "red",
    spark: [{ value: 20 }, { value: 25 }, { value: 22 }, { value: 36 }, { value: 32 }, { value: 44 }, { value: 58 }],
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
    bg: "bg-violet-500/10 dark:bg-violet-500/10",
    text: "text-violet-600 dark:text-violet-400",
    line: "#8b5cf6",
  },
  green: {
    bg: "bg-emerald-500/10 dark:bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    line: "#10b981",
  },
  orange: {
    bg: "bg-amber-500/10 dark:bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    line: "#f59e0b",
  },
  red: {
    bg: "bg-rose-500/10 dark:bg-rose-500/10",
    text: "text-rose-600 dark:text-rose-400",
    line: "#f43f5e",
  },
  blue: {
    bg: "bg-blue-500/10 dark:bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    line: "#3b82f6",
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

function StatCard({ item }: { item: (typeof stats)[number] }) {
  const Icon = item.icon;
  const color = styles[item.color as keyof typeof styles];

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-zinc-900/50">
      <CardContent className="flex items-center justify-between gap-4 p-5">
        <div className="flex items-center gap-5">
          <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${color.bg}`}>
            <Icon className={`h-8 w-8 ${color.text}`} />
          </div>

          <div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {item.title}
            </p>

            <h3 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-slate-50">
              {item.value}
            </h3>

            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
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

export default function Invoices() {
  const userPermissions = getCurrentPermissions();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [editingInvoiceId, setEditingInvoiceId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const viewInvoiceId = searchParams.get("view");
  const selectedInvoice = invoices.find((inv) => inv.invoice === viewInvoiceId) || null;
  const isViewOpen = !!selectedInvoice;

  const handleViewInvoice = (invoice: Invoice) => {
    setSearchParams({ view: invoice.invoice });
  };

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
        setInvoices(invoicesTable);
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [viewInvoiceId]);

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

  const handleDeleteInvoice = (invoiceId: string) => {
    setInvoiceToDelete(invoiceId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteInvoice = () => {
    if (!invoiceToDelete) return;

    setInvoices((prev) =>
      prev.filter((invoice) => invoice.invoice !== invoiceToDelete)
    );

    toast.success("Invoice deleted successfully");
    setInvoiceToDelete(null);
  };

  if (loading) {
    return <PageSkeleton />;
  }

  if (selectedInvoice && isViewOpen) {
    const parseAmount = (amtStr: string) => {
      const num = parseFloat(amtStr.replace(/[₹,]/g, ""));
      return isNaN(num) ? 0 : num;
    };

    const totalAmt = parseAmount(selectedInvoice.amount);
    const basicAmt = totalAmt / 1.28;
    const gstAmt = totalAmt - basicAmt;

    const formattedBasic = formatCurrency(Math.round(basicAmt));
    const formattedGst = formatCurrency(Math.round(gstAmt));
    const formattedTotal = selectedInvoice.amount;

    return (
      <main className="min-h-screen bg-[#f8fafc] p-6 lg:p-8 dark:bg-black">
        <div className="mx-auto max-w-[1600px] space-y-6">
          
          {/* Header Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <button
              onClick={() => {
                setSearchParams({});
              }}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-bold transition-colors cursor-pointer text-sm bg-transparent border-none p-0"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            <Button
              onClick={() => {
                toast.success("Downloading Invoice PDF...");
              }}
              className="gap-2 rounded-xl border border-blue-200 bg-white text-blue-600 hover:bg-blue-50/50 dark:border-white/5 dark:bg-zinc-900/50 dark:text-blue-400 dark:hover:bg-zinc-800/50 px-5 shadow-sm"
            >
              <Download className="h-4 w-4" />
              Download Invoice PDF
            </Button>
          </div>

          {/* Balance Card */}
          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-zinc-900/50">
            <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6">
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 dark:bg-blue-500/10">
                  <FileText className="h-8 w-8 text-blue-500" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-950 dark:text-slate-50">
                    Balance
                  </h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    CREATED ON {selectedInvoice.date.toUpperCase()}, 01:36 PM
                  </p>
                  <div className="mt-2.5">
                    <span className="rounded-full bg-amber-500/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      UNDER PROCESS
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Card */}
              <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-white/5 dark:bg-zinc-900/40">
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-950 dark:text-slate-50 uppercase tracking-tight">
                    System Admin
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    admin
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full border-2 border-red-500 p-0.5">
                  <img
                    src="https://i.pravatar.cc/100?img=12"
                    alt="System Admin"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Details Grid */}
          <div className="grid gap-6 xl:grid-cols-[1.75fr_1fr]">
            
            {/* Left Column */}
            <div className="space-y-6">
              {/* Project & Classification Card */}
              <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-zinc-900/50 p-6">
                <CardHeader className="p-0 pb-6 border-b border-slate-100 dark:border-white/5">
                  <CardTitle className="text-lg font-bold text-slate-950 dark:text-slate-50 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-slate-400" />
                    Project & Classification
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-0 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Project Name
                      </span>
                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {selectedInvoice.customer.toUpperCase()}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        State
                      </span>
                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                        Delhi
                      </p>
                    </div>

                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Bill Category
                      </span>
                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                        Restoration Supply
                      </p>
                    </div>

                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Milestone
                      </span>
                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                        90%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Invoice Dates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-zinc-900/50 p-5 text-center flex flex-col items-center justify-center">
                  <Calendar className="mx-auto h-5 w-5 text-slate-400" />
                  <span className="mt-3 block text-xs font-bold uppercase tracking-wider text-slate-400">
                    Invoice Date
                  </span>
                  <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {selectedInvoice.date}
                  </p>
                </Card>

                <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-zinc-900/50 p-5 text-center flex flex-col items-center justify-center">
                  <Send className="mx-auto h-5 w-5 text-slate-400" />
                  <span className="mt-3 block text-xs font-bold uppercase tracking-wider text-slate-400">
                    Submission
                  </span>
                  <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {selectedInvoice.date}
                  </p>
                </Card>

                <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-zinc-900/50 p-5 text-center flex flex-col items-center justify-center">
                  <Clock3 className="mx-auto h-5 w-5 text-slate-400" />
                  <span className="mt-3 block text-xs font-bold uppercase tracking-wider text-slate-400">
                    Payment Date
                  </span>
                  <p className="mt-1 text-sm font-semibold text-slate-400 dark:text-slate-500">
                    -
                  </p>
                </Card>
              </div>

              {/* Deductions & Adjustments Card */}
              <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-zinc-900/50 p-6">
                <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-white/5">
                  <h3 className="text-lg font-bold text-slate-950 dark:text-slate-50 flex items-center gap-2">
                    <Coins className="h-5 w-5 text-slate-400" />
                    Deductions & Adjustments
                  </h3>
                  <span className="rounded-full bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-600 dark:text-rose-400">
                    TOTAL: ₹0.00
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
                  <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-white/5 dark:bg-zinc-900/40 text-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Retention
                    </span>
                    <p className="mt-1.5 text-sm font-bold text-rose-600 dark:text-rose-400">
                      ₹0.00
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-white/5 dark:bg-zinc-900/40 text-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      TDS
                    </span>
                    <p className="mt-1.5 text-sm font-bold text-rose-600 dark:text-rose-400">
                      ₹0.00
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-white/5 dark:bg-zinc-900/40 text-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      GST TDS
                    </span>
                    <p className="mt-1.5 text-sm font-bold text-rose-600 dark:text-rose-400">
                      ₹0.00
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Financial Summary Card */}
              <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-zinc-900/50 p-6">
                <CardHeader className="p-0 pb-6 border-b border-slate-100 dark:border-white/5">
                  <CardTitle className="text-lg font-bold text-slate-950 dark:text-slate-50 flex items-center gap-2">
                    <IndianRupee className="h-5 w-5 text-slate-400" />
                    Financial Summary
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-0 pt-6 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">
                      Basic Amount
                    </span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">
                      {formattedBasic}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">
                      GST (28.00%)
                    </span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">
                      {formattedGst}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
                    <span className="text-base font-bold text-slate-900 dark:text-slate-100">
                      Total Amount
                    </span>
                    <span className="text-xl font-black text-blue-600 dark:text-blue-400">
                      {formattedTotal}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Status Card */}
              <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-zinc-900/50 p-6">
                <CardHeader className="p-0 pb-6 border-b border-slate-100 dark:border-white/5">
                  <CardTitle className="text-lg font-bold text-slate-950 dark:text-slate-50 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-slate-400" />
                    Payment Status
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-0 pt-6 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">
                      Passed Amount
                    </span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">
                      ₹0.00
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">
                      Total Deductions
                    </span>
                    <span className="font-bold text-rose-600 dark:text-rose-400">
                      ₹0.00
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
                    <span className="text-base font-bold text-slate-900 dark:text-slate-100">
                      Net Payable
                    </span>
                    <span className="text-lg font-black text-slate-900 dark:text-slate-100">
                      {formattedTotal}
                    </span>
                  </div>

                  {/* Payment Badges (Received/Pending) */}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="rounded-xl bg-emerald-500/10 p-3 text-center border border-emerald-500/10">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        Received
                      </span>
                      <p className="mt-1 text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                        {selectedInvoice.status === "Paid" ? formattedTotal : "₹0.00"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-blue-500/10 p-3 text-center border border-blue-500/10">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        Pending
                      </span>
                      <p className="mt-1 text-sm font-extrabold text-blue-600 dark:text-blue-400">
                        {selectedInvoice.status === "Paid" ? "₹0.00" : formattedTotal}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] p-6 lg:p-8 dark:bg-black">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            {/* <h1 className="text-3xl font-semibold text-slate-950 dark:text-slate-50">
              Invoices
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Create, track and manage customer invoices
            </p> */}
          </div>

          {/* Create Button only show when user has permission */}
          {userPermissions.canCreate && (
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
        )}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <StatCard key={item.title} item={item} />
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.75fr_1fr]">
          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-zinc-900/50">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
                  Invoice Revenue Overview
                </CardTitle>

                <div className="mt-5 flex items-center gap-6 text-sm text-slate-700 dark:text-slate-300">
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

          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
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
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Total
                    </span>

                    <span className="text-3xl font-semibold text-slate-950 dark:text-slate-50">
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
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.75fr_1fr]">
          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-zinc-900/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
                Recent Invoices
              </CardTitle>

              <Button variant="outline" className="border-purple-200 text-purple-600">
                View All
              </Button>
            </CardHeader>

            <CardContent>
              <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-white/5">
                <table className="w-full min-w-[900px] text-left">
                  <thead>
                    <tr className="border-b border-slate-200/60 bg-slate-50/50 text-xs font-bold uppercase tracking-wider text-slate-500 dark:border-white/10 dark:bg-zinc-900/50 dark:text-slate-400">
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
                      <tr
                        key={item.invoice}
                        className="group border-t border-slate-100 text-sm transition-colors hover:bg-slate-50/50 dark:border-white/5 dark:hover:bg-slate-800/30"
                      >
                        <td className="px-4 py-4 font-medium text-slate-900 dark:text-slate-100">
                          <button
                            onClick={() => handleViewInvoice(item)}
                            className="font-semibold text-purple-600 hover:text-purple-700 hover:underline dark:text-purple-400 dark:hover:text-purple-300 transition-all cursor-pointer bg-transparent border-none p-0 text-left outline-none"
                          >
                            {item.invoice}
                          </button>
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

                        <td className="px-4 py-4">
                          <div className="flex justify-end gap-2">
                            {/* Edit Button only show when user has permission */}
                            {userPermissions.canEdit && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditInvoice(item)}
                              className="h-8 rounded-lg border-blue-200 px-3 text-blue-600 hover:bg-blue-50"
                            >
                              Edit
                            </Button>
                            )}

                            {/* Delete Button only show when user has permission */}
                            {userPermissions.canDelete && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteInvoice(item.invoice)}
                              className="h-8 rounded-lg border-red-200 px-3 text-red-600 hover:bg-red-50"
                            >
                              Delete
                            </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}

                    {invoices.length === 0 && (
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

          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
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
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${c.bg}`}>
                        <Icon className={`h-5 w-5 ${c.text}`} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">
                          {item.title}
                        </p>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <span className="whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
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



      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDeleteInvoice}
        title="Confirm Deletion"
        description="Are you sure you want to delete this invoice? This action cannot be undone."
      />
    </main>
  );
}