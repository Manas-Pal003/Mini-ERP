import PageSkeleton from "@/components/common/PageSkeleton";
import { useEffect, useMemo, useState } from "react";
import {
  ReceiptText,
  Search,
  Clock3,
  CircleCheckBig,
  TriangleAlert,
  Eye,
  Download,
  CalendarDays,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

export default function StaffInvoices() {
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

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

  const paidInvoices = invoices.filter((item) => item.status === "Paid").length;
  const pendingInvoices = invoices.filter(
    (item) => item.status === "Pending"
  ).length;
  const overdueInvoices = invoices.filter(
    (item) => item.status === "Overdue"
  ).length;

  const handleExport = () => {
    if (filteredInvoices.length === 0) {
      alert("No invoices available to export");
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
    link.download = "staff-invoices.csv";
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
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.12),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.10),transparent_32%)]" />

            <div className="relative flex flex-col gap-6 p-7 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-300">
                  <ReceiptText className="h-7 w-7" />
                </div>

                <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
                  Staff Invoices
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                  View assigned invoices, check payment status, and export
                  invoice records. Staff users have read-only access.
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
                  className="gap-2 rounded-xl bg-purple-600 hover:bg-purple-700"
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
            title="Total Invoices"
            value={invoices.length}
            icon={ReceiptText}
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
              <table className="w-full min-w-[850px] text-left">
                <thead>
                  <tr className="bg-slate-50 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    <th className="px-4 py-4 font-medium">Invoice #</th>
                    <th className="px-4 py-4 font-medium">Customer</th>
                    <th className="px-4 py-4 font-medium">Amount</th>
                    <th className="px-4 py-4 font-medium">Status</th>
                    <th className="px-4 py-4 font-medium">Date</th>
                    <th className="px-4 py-4 font-medium">Access</th>
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
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 rounded-lg border-purple-200 px-3 text-purple-600 hover:bg-purple-50"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Only
                        </Button>
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

        {/* Info cards */}
        <div className="grid gap-5 md:grid-cols-3">
          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <CardContent className="p-5">
              <h3 className="font-semibold text-slate-950 dark:text-slate-50">
                Read-only access
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Staff users can view invoice details but cannot create, edit, or
                delete invoice records.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <CardContent className="p-5">
              <h3 className="font-semibold text-slate-950 dark:text-slate-50">
                Payment tracking
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Staff can monitor paid, pending, and overdue invoice statuses
                from one place.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <CardContent className="p-5">
              <h3 className="font-semibold text-slate-950 dark:text-slate-50">
                Export enabled
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Staff can export visible invoice records for reporting or
                review.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}